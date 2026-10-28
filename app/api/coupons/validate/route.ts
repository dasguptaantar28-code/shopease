import { NextRequest, NextResponse } from "next/server";
import { validateCoupon } from "@/lib/store/repository";

export async function POST(req: NextRequest) {
  try {
    const { code, subtotal_cents } = await req.json();
    if (!code) {
      return NextResponse.json({ valid: false, error: "Coupon code is required" }, { status: 400 });
    }

    const result = await validateCoupon(code, subtotal_cents || 0);
    return NextResponse.json(result);
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : "Error validating coupon";
    return NextResponse.json({ valid: false, error: msg }, { status: 500 });
  }
}
