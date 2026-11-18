import { google, calendar_v3 } from "googleapis";
import { BookingRecord } from "@/lib/types/booking";

const TIMEZONE = process.env.TZ || "Asia/Kolkata";

/**
 * Returns the effective Google Calendar ID.
 * Defaults to GOOGLE_CALENDAR_ID, falling back to GOOGLE_CALENDAR_ACCOUNT.
 */
export function getCalendarId(): string {
  const envId = (process.env.GOOGLE_CALENDAR_ID || "").trim();
  if (envId && envId !== "YOUR_ACTUAL_CALENDAR_ID") {
    return envId;
  }
  const account = (process.env.GOOGLE_CALENDAR_ACCOUNT || "").trim();
  if (account) {
    return account;
  }
  return "rajgadhospitalkk@gmail.com";
}

/**
 * Normalizes private key string to properly handle escaped newlines (\n),
 * double quotes, and CRLF / LF line endings.
 */
export function normalizePrivateKey(rawKey?: string): string {
  if (!rawKey) return "";
  let key = rawKey.trim();
  // Strip surrounding quotes if present
  if (
    (key.startsWith('"') && key.endsWith('"')) ||
    (key.startsWith("'") && key.endsWith("'"))
  ) {
    key = key.slice(1, -1);
  }
  // Replace literal '\n' sequences with real newline characters
  key = key.replace(/\\n/g, "\n");
  // Normalize Windows CRLF to LF
  key = key.replace(/\r\n/g, "\n");
  return key.trim();
}

/**
 * Parses time slots like "06:00 PM - 08:00 PM" or "06:30 AM - 08:30 AM"
 * on date "YYYY-MM-DD" into ISO strings with Asia/Kolkata (+05:30) offset.
 */
export function parseSlotToIso(
  dateStr: string,
  timeSlotStr: string
): { startIso: string; endIso: string } {
  let startHour = 9;
  let startMin = 0;
  let endHour = 11;
  let endMin = 0;

  try {
    const parts = (timeSlotStr || "").split("-").map((p) => p.trim());
    if (parts.length === 2) {
      const parseTime = (t: string) => {
        const cleaned = t.trim();
        const [timePart, meridiem] = cleaned.split(/\s+/);
        const [hStr, mStr] = timePart.split(":");
        let h = parseInt(hStr, 10);
        const m = parseInt(mStr, 10) || 0;
        if (meridiem && meridiem.toUpperCase() === "PM" && h < 12) h += 12;
        if (meridiem && meridiem.toUpperCase() === "AM" && h === 12) h = 0;
        return { h, m };
      };

      const s = parseTime(parts[0]);
      const e = parseTime(parts[1]);
      if (!isNaN(s.h) && !isNaN(e.h)) {
        startHour = s.h;
        startMin = s.m;
        endHour = e.h;
        endMin = e.m;
      }
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
 * Creates authenticated Google Calendar client using Service Account or OAuth credentials.
 */
export function getCalendarClient(): calendar_v3.Calendar | null {
  const serviceAccountEmail = (process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL || "").trim();
  const privateKey = normalizePrivateKey(process.env.GOOGLE_PRIVATE_KEY);

  const clientId = (process.env.GOOGLE_CLIENT_ID || "").trim();
  const clientSecret = (process.env.GOOGLE_CLIENT_SECRET || "").trim();
  const refreshToken = (process.env.GOOGLE_REFRESH_TOKEN || "").trim();

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
 * Builds Google Calendar Event payload according to clinical appointment specs.
 */
export function buildCalendarEventPayload(booking: BookingRecord): calendar_v3.Schema$Event {
  const { startIso, endIso } = parseSlotToIso(
    booking.preferredDate,
    booking.preferredTime
  );

  const modeLabel =
    booking.collectionType === "home" ? "Home Collection" : "Central Lab Walk-in";

  // Event title format: Mode – Patient Name – [Booking ID]
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
    booking.collectionType === "home"
      ? `🏠 Doorstep Address: ${booking.address || "N/A"}`
      : null,
    `📮 Locality Pincode: ${booking.pincode}`,
    `🗓️ Scheduled Date: ${booking.preferredDate}`,
    `⏰ Time Slot: ${booking.preferredTime}`,
    `💳 Payment Mode: ${
      booking.paymentMethod === "upi"
        ? "Advance UPI"
        : "Pay on Collection (Cash/Card)"
    }`,
    `📝 Special Instructions: ${booking.specialInstructions || "None"}`,
    `⚡ Status: ${booking.status.toUpperCase()}`,
    `--------------------------------------------------`,
    `Direct Clinic Contact: +91 98765 43210 / care@shreediagnostic.com`,
  ]
    .filter(Boolean)
    .join("\n");

  const location =
    booking.collectionType === "home"
      ? `${booking.address || ""}, Pincode: ${booking.pincode}`.trim()
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

export interface CalendarEventResult {
  success: boolean;
  eventId?: string;
  htmlLink?: string;
  error?: string;
  calendarIdUsed?: string;
}

/**
 * Creates an event in Google Calendar with retry handling and detailed diagnostics.
 */
export async function createCalendarEvent(
  booking: BookingRecord
): Promise<CalendarEventResult> {
  const calendarId = getCalendarId();

  if (!calendarId || calendarId === "YOUR_ACTUAL_CALENDAR_ID") {
    const err =
      "GOOGLE_CALENDAR_ID is not configured in .env.local. Please provide the calendar ID from Google Calendar Settings -> Integrate Calendar.";
    console.error("[Google Calendar]", err);
    return { success: false, error: err, calendarIdUsed: calendarId };
  }

  const calendar = getCalendarClient();
  if (!calendar) {
    const err =
      "Google Calendar client could not be initialized. Missing GOOGLE_SERVICE_ACCOUNT_EMAIL or GOOGLE_PRIVATE_KEY.";
    console.error("[Google Calendar]", err);
    return { success: false, error: err, calendarIdUsed: calendarId };
  }

  const eventPayload = buildCalendarEventPayload(booking);

  // Retry up to 2 times for transient network/rate issues
  let lastError = "";
  for (let attempt = 1; attempt <= 2; attempt++) {
    try {
      const res = await calendar.events.insert({
        calendarId,
        requestBody: eventPayload,
      });

      return {
        success: true,
        eventId: res.data.id || undefined,
        htmlLink: res.data.htmlLink || undefined,
        calendarIdUsed: calendarId,
      };
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err);
      lastError = msg;
      console.error(
        `[Google Calendar] Attempt ${attempt} failed inserting into calendar "${calendarId}":`,
        msg
      );

      // If error is 404 (calendar not found / not shared) or 403 (permission denied), no point retrying
      if (
        msg.includes("Not Found") ||
        msg.includes("notFound") ||
        msg.includes("forbidden") ||
        msg.includes("Permission denied")
      ) {
        break;
      }

      // Small backoff before retry
      if (attempt < 2) {
        await new Promise((r) => setTimeout(r, 600));
      }
    }
  }

  return {
    success: false,
    error: lastError || "Failed to create Google Calendar event after retry.",
    calendarIdUsed: calendarId,
  };
}

/**
 * Updates an existing Google Calendar event.
 */
export async function updateCalendarEvent(
  eventId: string,
  booking: BookingRecord
): Promise<{ success: boolean; error?: string }> {
  const calendarId = getCalendarId();
  const calendar = getCalendarClient();
  if (!calendar) {
    return {
      success: false,
      error: "Google Calendar credentials not configured.",
    };
  }

  const eventPayload = buildCalendarEventPayload(booking);

  try {
    await calendar.events.update({
      calendarId,
      eventId,
      requestBody: eventPayload,
    });
    return { success: true };
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err);
    console.error(`[Google Calendar] Update failed for event "${eventId}":`, msg);
    return { success: false, error: msg };
  }
}

/**
 * Deletes / cancels an event from Google Calendar.
 */
export async function deleteCalendarEvent(
  eventId: string
): Promise<{ success: boolean; error?: string }> {
  const calendarId = getCalendarId();
  const calendar = getCalendarClient();
  if (!calendar) {
    return {
      success: false,
      error: "Google Calendar credentials not configured.",
    };
  }

  try {
    await calendar.events.delete({
      calendarId,
      eventId,
    });
    return { success: true };
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err);
    console.error(`[Google Calendar] Delete failed for event "${eventId}":`, msg);
    return { success: false, error: msg };
  }
}
