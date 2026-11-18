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
  CalendarEventResult,
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

    // 2. Prevent duplicate calendar events if booking ID already registered with an active event
    const existing = getBookingById(id);
    if (existing && existing.calendarEventId) {
      return NextResponse.json({
        success: true,
        booking: existing,
        calendarCreated: true,
        calendarEventId: existing.calendarEventId,
        calendarHtmlLink: existing.calendarHtmlLink,
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

    // 3. Attempt Google Calendar Event Creation
    let calendarResult: CalendarEventResult = { success: false };
    try {
      calendarResult = await createCalendarEvent(bookingRecord);
      if (calendarResult.success && calendarResult.eventId) {
        attachCalendarEvent(id, calendarResult.eventId, calendarResult.htmlLink);
        bookingRecord.calendarEventId = calendarResult.eventId;
        bookingRecord.calendarHtmlLink = calendarResult.htmlLink;
      }
    } catch (calErr: unknown) {
      const msg = calErr instanceof Error ? calErr.message : String(calErr);
      calendarResult = { success: false, error: msg };
      console.error("[Booking API] Calendar creation exception:", msg);
    }

    // Explicitly report status: calendarCreated is TRUE ONLY if event creation actually succeeded
    return NextResponse.json({
      success: true,
      booking: bookingRecord,
      calendarCreated: Boolean(calendarResult.success && calendarResult.eventId),
      calendarEventId: calendarResult.eventId || null,
      calendarHtmlLink: calendarResult.htmlLink || null,
      calendarError: calendarResult.success ? null : (calendarResult.error || "Calendar sync failed"),
      calendarIdUsed: calendarResult.calendarIdUsed || null,
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
          error: "Selected slot is fully booked.",
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
    let calendarUpdated = false;
    let calendarError: string | null = null;

    if (updatedBooking.calendarEventId) {
      const updateRes = await updateCalendarEvent(
        updatedBooking.calendarEventId,
        updatedBooking
      );
      calendarUpdated = updateRes.success;
      if (!updateRes.success) {
        calendarError = updateRes.error || "Calendar update failed";
      }
    } else {
      // If no calendar event exists yet, create one now
      const createRes = await createCalendarEvent(updatedBooking);
      if (createRes.success && createRes.eventId) {
        attachCalendarEvent(id, createRes.eventId, createRes.htmlLink);
        updatedBooking.calendarEventId = createRes.eventId;
        updatedBooking.calendarHtmlLink = createRes.htmlLink;
        calendarUpdated = true;
      } else {
        calendarError = createRes.error || "Calendar creation failed";
      }
    }

    return NextResponse.json({
      success: true,
      booking: updatedBooking,
      calendarUpdated,
      calendarError,
    });
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
    let calendarDeleted = false;
    let calendarError: string | null = null;
    if (existing.calendarEventId) {
      const delRes = await deleteCalendarEvent(existing.calendarEventId);
      calendarDeleted = delRes.success;
      if (!delRes.success) {
        calendarError = delRes.error || "Calendar event deletion failed";
      }
    }

    return NextResponse.json({
      success: true,
      message: `Booking ${id} cancelled.`,
      calendarDeleted,
      calendarError,
    });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Internal error";
    return NextResponse.json({ success: false, error: msg }, { status: 500 });
  }
}
