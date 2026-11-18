export interface BookingRecord {
  id: string; // e.g. "SHREE-123456" or "HOME-654321"
  patientName: string;
  phone: string;
  email?: string;
  itemName: string;
  itemPrice: number;
  collectionType: "home" | "lab";
  pincode: string;
  address?: string;
  preferredDate: string; // YYYY-MM-DD
  preferredTime: string; // e.g. "06:30 AM - 08:30 AM"
  paymentMethod: "upi" | "pay_on_collection";
  status: "confirmed" | "cancelled" | "pending";
  specialInstructions?: string;
  calendarEventId?: string;
  calendarHtmlLink?: string;
  createdAt: string;
  updatedAt: string;
}

export interface SlotCapacityConfig {
  maxHomePerSlot: number;
  maxLabPerSlot: number;
}
