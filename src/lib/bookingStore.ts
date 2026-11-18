import fs from "fs";
import path from "path";
import { BookingRecord, SlotCapacityConfig } from "@/lib/types/booking";

// Default booking capacity per time slot
export const SLOT_CAPACITY: SlotCapacityConfig = {
  maxHomePerSlot: 5, // Up to 5 simultaneous home collections per 2-hour window
  maxLabPerSlot: 15, // Up to 15 walk-ins per window
};

const DATA_DIR = path.join(process.cwd(), "src", "data");
const BOOKINGS_FILE = path.join(DATA_DIR, "bookings-store.json");

function ensureStoreExists(): void {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
  if (!fs.existsSync(BOOKINGS_FILE)) {
    fs.writeFileSync(BOOKINGS_FILE, JSON.stringify([]), "utf-8");
  }
}

export function getAllBookings(): BookingRecord[] {
  ensureStoreExists();
  try {
    const raw = fs.readFileSync(BOOKINGS_FILE, "utf-8");
    return JSON.parse(raw);
  } catch (err) {
    console.error("Failed to read bookings store:", err);
    return [];
  }
}

function saveAllBookings(bookings: BookingRecord[]): void {
  ensureStoreExists();
  fs.writeFileSync(BOOKINGS_FILE, JSON.stringify(bookings, null, 2), "utf-8");
}

export function getBookingById(id: string): BookingRecord | null {
  const all = getAllBookings();
  return all.find((b) => b.id === id) || null;
}

/**
 * Validates capacity for preferred date, time slot, and collection mode
 */
export function validateSlotCapacity(
  date: string,
  timeSlot: string,
  collectionType: "home" | "lab",
  excludeBookingId?: string
): { allowed: boolean; currentCount: number; maxAllowed: number } {
  const all = getAllBookings();
  const maxAllowed =
    collectionType === "home"
      ? SLOT_CAPACITY.maxHomePerSlot
      : SLOT_CAPACITY.maxLabPerSlot;

  const activeInSlot = all.filter(
    (b) =>
      b.preferredDate === date &&
      b.preferredTime === timeSlot &&
      b.collectionType === collectionType &&
      b.status !== "cancelled" &&
      b.id !== excludeBookingId
  );

  return {
    allowed: activeInSlot.length < maxAllowed,
    currentCount: activeInSlot.length,
    maxAllowed,
  };
}

/**
 * Atomic save / update of a booking record
 */
export function saveBooking(record: BookingRecord): BookingRecord {
  const all = getAllBookings();
  const index = all.findIndex((b) => b.id === record.id);

  if (index >= 0) {
    all[index] = { ...record, updatedAt: new Date().toISOString() };
  } else {
    all.push(record);
  }

  saveAllBookings(all);
  return record;
}

/**
 * Updates booking status (e.g. cancelled)
 */
export function updateBookingStatus(
  id: string,
  status: "confirmed" | "cancelled" | "pending"
): BookingRecord | null {
  const all = getAllBookings();
  const index = all.findIndex((b) => b.id === id);
  if (index === -1) return null;

  all[index].status = status;
  all[index].updatedAt = new Date().toISOString();
  saveAllBookings(all);
  return all[index];
}

/**
 * Attach Google Calendar event info to booking
 */
export function attachCalendarEvent(
  id: string,
  eventId: string,
  htmlLink?: string
): BookingRecord | null {
  const all = getAllBookings();
  const index = all.findIndex((b) => b.id === id);
  if (index === -1) return null;

  all[index].calendarEventId = eventId;
  if (htmlLink) all[index].calendarHtmlLink = htmlLink;
  all[index].updatedAt = new Date().toISOString();
  saveAllBookings(all);
  return all[index];
}
