import { NextRequest, NextResponse } from "next/server";
import {
  saveBooking,
  getBookingById,
  validateSlotCapacity,
  attachCalendarEvent,
  updateBookingStatus,
} from "@/lib/bookingStore";
import {
  createCalendarEvent,
  updateCalendarEvent,
  deleteCalendarEvent,
} from "@/lib/googleCalendar";
import { BookingRecord } from "@/lib/types/booking";

/**
 * POST /api/bookings
 * Creates/confirms a booking, checks capacity atomically, and registers a Google Calendar event.
 */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      id,
      patientName,
      phone,
      email,
      itemName,
      itemPrice,
      collectionType,
      pincode,
      address,
      preferredDate,
      preferredTime,
      paymentMethod,
      specialInstructions,
    } = body;

    if (!id || !patientName || !phone || !itemName || !preferredDate || !preferredTime) {
      return NextResponse.json(
        { success: false, error: "Missing required booking details." },
        { status: 400 }
      );
    }

    // 1. Capacity Validation
    const capacityCheck = validateSlotCapacity(
      preferredDate,
      preferredTime,
      collectionType || "home",
      id
    );

    if (!capacityCheck.allowed) {
      return NextResponse.json(
        {
          success: false,
          error: `Selected slot (${preferredTime}) on ${preferredDate} is fully booked. Please select another slot.`,
          capacityExceeded: true,
          currentCount: capacityCheck.currentCount,
          maxAllowed: capacityCheck.maxAllowed,
        },
        { status: 409 }
      );
    }

    // 2. Prevent duplicate creation if booking ID already registered with an active calendar event
    const existing = getBookingById(id);
    if (existing && existing.calendarEventId) {
      return NextResponse.json({
        success: true,
        booking: existing,
        message: "Booking already registered with calendar event.",
      });
    }

    const now = new Date().toISOString();
    const bookingRecord: BookingRecord = {
      id,
      patientName,
      phone,
      email: email || undefined,
      itemName,
      itemPrice: Number(itemPrice) || 0,
      collectionType: collectionType || "home",
      pincode: pincode || "",
      address: address || undefined,
      preferredDate,
      preferredTime,
      paymentMethod: paymentMethod || "pay_on_collection",
      status: "confirmed",
      specialInstructions: specialInstructions || undefined,
      createdAt: existing ? existing.createdAt : now,
      updatedAt: now,
    };

    // Save record to backend store
    saveBooking(bookingRecord);

    // 3. Create Google Calendar event (graceful if credentials not yet configured)
    let calendarResult: { success: boolean; eventId?: string; htmlLink?: string } = { success: false };
    try {
      calendarResult = await createCalendarEvent(bookingRecord);
      if (calendarResult.success && calendarResult.eventId) {
        attachCalendarEvent(id, calendarResult.eventId, calendarResult.htmlLink);
        bookingRecord.calendarEventId = calendarResult.eventId;
        bookingRecord.calendarHtmlLink = calendarResult.htmlLink;
      }
    } catch (calErr) {
      console.error("Google Calendar background creation warning:", calErr);
    }

    return NextResponse.json({
      success: true,
      booking: bookingRecord,
      calendarCreated: !!calendarResult.success,
      calendarHtmlLink: calendarResult.htmlLink,
    });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Internal server error";
    console.error("API /api/bookings error:", msg);
    return NextResponse.json({ success: false, error: msg }, { status: 500 });
  }
}

/**
 * PUT /api/bookings
 * Updates appointment details and synchronizes with Google Calendar
 */
export async function PUT(req: NextRequest) {
  try {
    const body = await req.json();
    const { id, ...updates } = body;

    if (!id) {
      return NextResponse.json(
        { success: false, error: "Booking ID is required." },
        { status: 400 }
      );
    }

    const existing = getBookingById(id);
    if (!existing) {
      return NextResponse.json(
        { success: false, error: "Booking not found." },
        { status: 404 }
      );
    }

    // Capacity validation if date/time/collectionType changed
    const targetDate = updates.preferredDate || existing.preferredDate;
    const targetTime = updates.preferredTime || existing.preferredTime;
    const targetMode = updates.collectionType || existing.collectionType;

    const capacityCheck = validateSlotCapacity(targetDate, targetTime, targetMode, id);
    if (!capacityCheck.allowed) {
      return NextResponse.json(
        {
          success: false,
          error: `Selected slot is fully booked.`,
          capacityExceeded: true,
        },
        { status: 409 }
      );
    }

    const updatedBooking: BookingRecord = {
      ...existing,
      ...updates,
      updatedAt: new Date().toISOString(),
    };

    saveBooking(updatedBooking);

    // Synchronize to Google Calendar if event exists
    if (updatedBooking.calendarEventId) {
      await updateCalendarEvent(updatedBooking.calendarEventId, updatedBooking);
    }

    return NextResponse.json({ success: true, booking: updatedBooking });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Internal error";
    return NextResponse.json({ success: false, error: msg }, { status: 500 });
  }
}

/**
 * DELETE /api/bookings?id=...
 * Cancels booking and removes/updates calendar event
 */
export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { success: false, error: "Booking ID is required." },
        { status: 400 }
      );
    }

    const existing = getBookingById(id);
    if (!existing) {
      return NextResponse.json(
        { success: false, error: "Booking not found." },
        { status: 404 }
      );
    }

    updateBookingStatus(id, "cancelled");

    // Remove from Google Calendar if event exists
    if (existing.calendarEventId) {
      await deleteCalendarEvent(existing.calendarEventId);
    }

    return NextResponse.json({
      success: true,
      message: `Booking ${id} cancelled and calendar event removed.`,
    });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Internal error";
    return NextResponse.json({ success: false, error: msg }, { status: 500 });
  }
}
