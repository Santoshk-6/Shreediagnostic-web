import { NextRequest, NextResponse } from "next/server";
import { validateSlotCapacity } from "@/lib/bookingStore";

/**
 * GET /api/bookings/capacity?date=YYYY-MM-DD&time=...&mode=home|lab
 */
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const date = searchParams.get("date");
  const time = searchParams.get("time");
  const mode = (searchParams.get("mode") || "home") as "home" | "lab";

  if (!date || !time) {
    return NextResponse.json(
      { success: false, error: "Date and time parameters are required." },
      { status: 400 }
    );
  }

  const result = validateSlotCapacity(date, time, mode);
  return NextResponse.json({
    success: true,
    allowed: result.allowed,
    currentCount: result.currentCount,
    maxAllowed: result.maxAllowed,
    remainingSlots: Math.max(0, result.maxAllowed - result.currentCount),
  });
}
