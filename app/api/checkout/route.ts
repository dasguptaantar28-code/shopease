import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { getProductBySlug, validateCoupon, saveOrder } from "@/lib/store/repository";
import { generateOrderNumber } from "@/lib/formatters";
import { Order, OrderItem, PaymentMethod } from "@/lib/types";

const CheckoutSchema = z.object({
  customer_email: z.string().email(),
  customer_phone: z.string().min(5),
  shipping_name: z.string().min(2),
  shipping_address: z.object({
    name: z.string().min(2),
    phone: z.string().min(5),
    line1: z.string().min(3),
    line2: z.string().optional(),
    city: z.string().min(2),
    state: z.string().min(2),
    postal_code: z.string().min(3),
    country: z.string().default("United States"),
  }),
  items: z.array(
    z.object({
      product_id: z.string(),
      variant_id: z.string().optional(),
      slug: z.string(),
      quantity: z.number().int().positive(),
    })
  ).min(1),
  coupon_code: z.string().optional().nullable(),
  payment_method: z.enum(["cod", "card_manual", "stripe_test"]),
  notes: z.string().optional(),
  user_id: z.string().optional().nullable(),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = CheckoutSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid checkout submission", details: parsed.error.format() },
        { status: 400 }
      );
    }

    const { customer_email, customer_phone, shipping_name, shipping_address, items, coupon_code, payment_method, notes, user_id } = parsed.data;

    // Recalculate everything from database/server records to prevent tampering
    let subtotalCents = 0;
    const orderItems: OrderItem[] = [];

    for (const item of items) {
      const product = await getProductBySlug(item.slug);
      if (!product) {
        return NextResponse.json(
          { error: `Product not found: ${item.slug}` },
          { status: 400 }
        );
      }

      // Check stock
      if (product.stock_quantity < item.quantity) {
        return NextResponse.json(
          { error: `Insufficient stock for "${product.name}". Available: ${product.stock_quantity}` },
          { status: 400 }
        );
      }

      // Determine price
      let unitPrice = product.price_in_cents;
      let variantTitle: string | undefined = undefined;

      if (item.variant_id && product.variants) {
        const v = product.variants.find((v) => v.id === item.variant_id);
        if (v) {
          unitPrice = v.price_in_cents;
          variantTitle = v.title;
        }
      }

      const itemTotal = unitPrice * item.quantity;
      subtotalCents += itemTotal;

      orderItems.push({
        id: `oi-${Math.random().toString(36).slice(2, 9)}`,
        order_id: "", // Will be assigned below
        product_id: product.id,
        product_name: product.name,
        variant_title: variantTitle,
        price_in_cents: unitPrice,
        quantity: item.quantity,
        total_cents: itemTotal,
        image_url: product.images?.[0]?.image_url,
      });
    }

    // Server-side coupon verification
    let discountCents = 0;
    let validatedCouponCode: string | null = null;

    if (coupon_code) {
      const couponCheck = await validateCoupon(coupon_code, subtotalCents);
      if (couponCheck.valid && couponCheck.coupon) {
        validatedCouponCode = couponCheck.coupon.code;
        if (couponCheck.coupon.discount_type === "percentage") {
          discountCents = Math.round(subtotalCents * (couponCheck.coupon.discount_value / 100));
        } else {
          discountCents = Math.min(couponCheck.coupon.discount_value, subtotalCents);
        }
      }
    }

    // Shipping calculation
    const isFreeShipping = subtotalCents >= 5000 || validatedCouponCode === "FREESHIP";
    const shippingCents = subtotalCents > 0 ? (isFreeShipping ? 0 : 499) : 0;

    // Tax (5%)
    const taxableAmount = Math.max(0, subtotalCents - discountCents);
    const taxCents = Math.round(taxableAmount * 0.05);

    const totalCents = taxableAmount + shippingCents + taxCents;

    const orderId = `ord-${Date.now()}`;
    const orderNumber = generateOrderNumber();

    // Attach order ID to items
    const finalOrderItems = orderItems.map((item) => ({
      ...item,
      order_id: orderId,
    }));

    const newOrder: Order = {
      id: orderId,
      order_number: orderNumber,
      user_id: user_id || null,
      customer_email,
      customer_phone,
      shipping_name,
      shipping_address,
      subtotal_cents: subtotalCents,
      discount_cents: discountCents,
      shipping_cents: shippingCents,
      tax_cents: taxCents,
      total_cents: totalCents,
      coupon_code: validatedCouponCode,
      payment_method: payment_method as PaymentMethod,
      payment_status: payment_method === "cod" ? "pending" : "paid", // Real test mode
      fulfillment_status: "processing",
      notes: notes || null,
      items: finalOrderItems,
      created_at: new Date().toISOString(),
    };

    await saveOrder(newOrder);

    return NextResponse.json({
      success: true,
      order: newOrder,
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Checkout processing error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
