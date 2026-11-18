import { google } from "googleapis";
import { BookingRecord } from "@/lib/types/booking";

const TIMEZONE = "Asia/Kolkata";
const CALENDAR_ID =
  process.env.GOOGLE_CALENDAR_ID ||
  process.env.GOOGLE_CALENDAR_ACCOUNT ||
  "rajgadhospitalkk@gmail.com";

/**
 * Parses time slots like "06:30 AM - 08:30 AM" on date "YYYY-MM-DD" into ISO strings
 */
export function parseSlotToIso(
  dateStr: string,
  timeSlotStr: string
): { startIso: string; endIso: string } {
  // Fallback defaults: full day or 9 AM - 11 AM if unparseable
  let startHour = 9;
  let startMin = 0;
  let endHour = 11;
  let endMin = 0;

  try {
    const parts = timeSlotStr.split("-").map((p) => p.trim());
    if (parts.length === 2) {
      const parseTime = (t: string) => {
        const [timePart, meridiem] = t.split(" ");
        const [hStr, mStr] = timePart.split(":");
        let h = parseInt(hStr, 10);
        const m = parseInt(mStr, 10) || 0;
        if (meridiem && meridiem.toUpperCase() === "PM" && h < 12) h += 12;
        if (meridiem && meridiem.toUpperCase() === "AM" && h === 12) h = 0;
        return { h, m };
      };

      const s = parseTime(parts[0]);
      const e = parseTime(parts[1]);
      startHour = s.h;
      startMin = s.m;
      endHour = e.h;
      endMin = e.m;
    }
  } catch (err) {
    console.warn("Time slot parsing fallback for:", timeSlotStr, err);
  }

  const pad = (n: number) => String(n).padStart(2, "0");
  const startIso = `${dateStr}T${pad(startHour)}:${pad(startMin)}:00+05:30`;
  const endIso = `${dateStr}T${pad(endHour)}:${pad(endMin)}:00+05:30`;

  return { startIso, endIso };
}

/**
 * Creates authenticated Google Calendar client using Service Account or OAuth credentials
 */
export function getCalendarClient() {
  const serviceAccountEmail = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
  const privateKey = (process.env.GOOGLE_PRIVATE_KEY || "").replace(/\\n/g, "\n");

  const clientId = process.env.GOOGLE_CLIENT_ID;
  const clientSecret = process.env.GOOGLE_CLIENT_SECRET;
  const refreshToken = process.env.GOOGLE_REFRESH_TOKEN;

  if (serviceAccountEmail && privateKey) {
    const auth = new google.auth.JWT({
      email: serviceAccountEmail,
      key: privateKey,
      scopes: ["https://www.googleapis.com/auth/calendar"],
    });
    return google.calendar({ version: "v3", auth });
  }

  if (clientId && clientSecret && refreshToken) {
    const oauth2Client = new google.auth.OAuth2(clientId, clientSecret);
    oauth2Client.setCredentials({ refresh_token: refreshToken });
    return google.calendar({ version: "v3", auth: oauth2Client });
  }

  return null;
}

/**
 * Builds Google Calendar Event payload according to clinical appointment specs
 */
export function buildCalendarEventPayload(booking: BookingRecord) {
  const { startIso, endIso } = parseSlotToIso(
    booking.preferredDate,
    booking.preferredTime
  );

  const modeLabel =
    booking.collectionType === "home" ? "Home Collection" : "Central Lab Walk-in";

  // Event title format: Mode – Patient Name – Booking ID
  const summary = `${modeLabel} – ${booking.patientName} – [${booking.id}]`;

  const description = [
    `🏥 SHREE DIAGNOSTIC CENTER – APPOINTMENT DETAILS`,
    `--------------------------------------------------`,
    `📋 Booking Reference ID: ${booking.id}`,
    `👤 Patient Full Name: ${booking.patientName}`,
    `📞 Mobile Contact: ${booking.phone}`,
    `✉️ Email Address: ${booking.email || "Not provided"}`,
    `🔬 Investigation / Package: ${booking.itemName}`,
    `💰 Estimated Amount: ₹${booking.itemPrice}`,
    `📍 Collection Mode: ${modeLabel}`,
    booking.collectionType === "home" ? `🏠 Doorstep Address: ${booking.address || "N/A"}` : null,
    `📮 Locality Pincode: ${booking.pincode}`,
    `🗓️ Scheduled Date: ${booking.preferredDate}`,
    `⏰ Time Slot: ${booking.preferredTime}`,
    `💳 Payment Mode: ${booking.paymentMethod === "upi" ? "Advance UPI" : "Pay on Collection (Cash/Card)"}`,
    `📝 Special Instructions: ${booking.specialInstructions || "None"}`,
    `⚡ Status: ${booking.status.toUpperCase()}`,
    `--------------------------------------------------`,
    `Direct Clinic Contact: +91 98765 43210 / care@shreediagnostic.com`,
  ]
    .filter(Boolean)
    .join("\n");

  const location =
    booking.collectionType === "home"
      ? `${booking.address || ""}, Pincode: ${booking.pincode}`
      : "Shree Diagnostic Center Central Reference Lab, Medical Enclave, 110001";

  return {
    summary,
    description,
    location,
    start: {
      dateTime: startIso,
      timeZone: TIMEZONE,
    },
    end: {
      dateTime: endIso,
      timeZone: TIMEZONE,
    },
    reminders: {
      useDefault: false,
      overrides: [
        { method: "email", minutes: 24 * 60 }, // 1 day before
        { method: "popup", minutes: 60 }, // 1 hour before
        { method: "popup", minutes: 15 }, // 15 mins before
      ],
    },
  };
}

/**
 * Creates an event in Google Calendar
 */
export async function createCalendarEvent(
  booking: BookingRecord
): Promise<{ success: boolean; eventId?: string; htmlLink?: string; error?: string }> {
  try {
    const calendar = getCalendarClient();
    if (!calendar) {
      return {
        success: false,
        error: "Google Calendar credentials not configured in environment.",
      };
    }

    const eventPayload = buildCalendarEventPayload(booking);
    const res = await calendar.events.insert({
      calendarId: CALENDAR_ID,
      requestBody: eventPayload,
    });

    return {
      success: true,
      eventId: res.data.id || undefined,
      htmlLink: res.data.htmlLink || undefined,
    };
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Unknown Calendar API error";
    console.error("Google Calendar insertion error:", msg);
    return {
      success: false,
      error: msg,
    };
  }
}

/**
 * Updates an existing Google Calendar event
 */
export async function updateCalendarEvent(
  eventId: string,
  booking: BookingRecord
): Promise<{ success: boolean; error?: string }> {
  try {
    const calendar = getCalendarClient();
    if (!calendar) {
      return {
        success: false,
        error: "Google Calendar credentials not configured in environment.",
      };
    }

    const eventPayload = buildCalendarEventPayload(booking);
    await calendar.events.update({
      calendarId: CALENDAR_ID,
      eventId,
      requestBody: eventPayload,
    });

    return { success: true };
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Unknown Calendar API error";
    console.error("Google Calendar update error:", msg);
    return { success: false, error: msg };
  }
}

/**
 * Deletes / cancels an event from Google Calendar
 */
export async function deleteCalendarEvent(
  eventId: string
): Promise<{ success: boolean; error?: string }> {
  try {
    const calendar = getCalendarClient();
    if (!calendar) {
      return {
        success: false,
        error: "Google Calendar credentials not configured in environment.",
      };
    }

    await calendar.events.delete({
      calendarId: CALENDAR_ID,
      eventId,
    });

    return { success: true };
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Unknown Calendar API error";
    console.error("Google Calendar deletion error:", msg);
    return { success: false, error: msg };
  }
}
