"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  ShieldCheck,
  Truck,
  CreditCard,
  Banknote,
  CheckCircle2,
  Lock,
  ArrowLeft,
  AlertCircle,
  Tag,
} from "lucide-react";
import confetti from "canvas-confetti";
import { useCart } from "@/lib/store/cart-context";
import { useAuth } from "@/lib/store/auth-context";
import { useToast } from "@/lib/store/toast-context";
import { formatPrice } from "@/lib/formatters";
import { PaymentMethod } from "@/lib/types";

export default function CheckoutPage() {
  const router = useRouter();
  const { items, subtotalCents, discountCents, shippingCents, taxCents, totalCents, appliedCoupon, clearCart } = useCart();
  const { user } = useAuth();
  const { toast } = useToast();

  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Form Fields
  const [email, setEmail] = useState(user?.email || "");
  const [phone, setPhone] = useState(user?.phone || "+1 (555) 019-2834");
  const [fullName, setFullName] = useState(user?.full_name || "Alex Taylor");
  const [addressLine1, setAddressLine1] = useState("742 Evergreen Terrace");
  const [addressLine2, setAddressLine2] = useState("");
  const [city, setCity] = useState("Springfield");
  const [state, setState] = useState("OR");
  const [postalCode, setPostalCode] = useState("97477");
  const [country, setCountry] = useState("United States");
  const [notes, setNotes] = useState("");
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("cod");

  if (items.length === 0) {
    return (
      <div className="py-16 text-center max-w-md mx-auto space-y-4">
        <h1 className="text-2xl font-black text-[#0B1739]">No items in cart</h1>
        <p className="text-xs text-slate-500">Please add products to your cart before proceeding to checkout.</p>
        <Link
          href="/shop"
          className="inline-flex items-center gap-2 bg-[#1677FF] text-white font-bold text-xs px-6 py-3 rounded-xl"
        >
          Return to Store
        </Link>
      </div>
    );
  }

  const handleSubmitOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setIsLoading(true);

    try {
      const payload = {
        customer_email: email.trim(),
        customer_phone: phone.trim(),
        shipping_name: fullName.trim(),
        shipping_address: {
          name: fullName.trim(),
          phone: phone.trim(),
          line1: addressLine1.trim(),
          line2: addressLine2.trim() || undefined,
          city: city.trim(),
          state: state.trim(),
          postal_code: postalCode.trim(),
          country: country.trim(),
        },
        items: items.map((i) => ({
          product_id: i.product_id,
          variant_id: i.variant_id,
          slug: i.slug,
          quantity: i.quantity,
        })),
        coupon_code: appliedCoupon?.code || null,
        payment_method: paymentMethod,
        notes: notes.trim() || undefined,
        user_id: user?.id || null,
      };

      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.error || "Failed to process order.");
      }

      // Order created successfully!
      try {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
        });
      } catch {
        // Ignore if confetti not supported
      }

      toast({
        title: "Order Placed Successfully!",
        description: `Order ${data.order.order_number} has been confirmed.`,
        type: "success",
      });

      clearCart();
      router.push(`/order-success/${data.order.id}`);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "An error occurred during checkout";
      setErrorMessage(msg);
      toast({ title: "Checkout Error", description: msg, type: "error" });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="py-8 space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-200 pb-4">
        <div>
          <Link
            href="/cart"
            className="inline-flex items-center gap-1.5 text-xs text-[#1677FF] font-semibold hover:underline mb-2"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Return to Shopping Cart</span>
          </Link>
          <h1 className="text-2xl sm:text-3xl font-black text-[#0B1739]">Secure Checkout</h1>
        </div>
        <div className="flex items-center gap-2 text-xs font-semibold text-emerald-600 bg-emerald-50 px-3 py-1.5 rounded-full border border-emerald-200">
          <Lock className="w-3.5 h-3.5" />
          <span>256-Bit SSL Encrypted</span>
        </div>
      </div>

      {errorMessage && (
        <div className="flex items-start gap-3 p-4 bg-rose-50 border border-rose-200 rounded-2xl text-rose-800 text-xs">
          <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
          <div>
            <p className="font-bold">Unable to complete checkout</p>
            <p className="mt-0.5">{errorMessage}</p>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmitOrder}>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left: Customer & Shipping Details */}
          <div className="lg:col-span-7 space-y-6">
            {/* Contact Information */}
            <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-xs space-y-4">
              <h2 className="text-base font-bold text-[#0B1739] flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-blue-100 text-[#1677FF] text-xs flex items-center justify-center font-black">
                  1
                </span>
                <span>Contact Details</span>
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Email Address *</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    className="w-full border border-slate-200 rounded-xl p-2.5 focus:outline-none focus:ring-2 focus:ring-[#1677FF]"
                  />
                  <p className="text-[10px] text-slate-400 mt-1">We send order confirmation and tracking here.</p>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Phone Number *</label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+1 (555) 000-0000"
                    className="w-full border border-slate-200 rounded-xl p-2.5 focus:outline-none focus:ring-2 focus:ring-[#1677FF]"
                  />
                  <p className="text-[10px] text-slate-400 mt-1">For delivery driver courier contact.</p>
                </div>
              </div>
            </div>

            {/* Shipping Address */}
            <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-xs space-y-4">
              <h2 className="text-base font-bold text-[#0B1739] flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-blue-100 text-[#1677FF] text-xs flex items-center justify-center font-black">
                  2
                </span>
                <span>Shipping Address</span>
              </h2>

              <div className="space-y-4 text-xs">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Recipient Full Name *</label>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="First and last name"
                    className="w-full border border-slate-200 rounded-xl p-2.5 focus:outline-none focus:ring-2 focus:ring-[#1677FF]"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Street Address *</label>
                  <input
                    type="text"
                    required
                    value={addressLine1}
                    onChange={(e) => setAddressLine1(e.target.value)}
                    placeholder="House number and street name"
                    className="w-full border border-slate-200 rounded-xl p-2.5 focus:outline-none focus:ring-2 focus:ring-[#1677FF]"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Apartment, suite, unit (optional)</label>
                  <input
                    type="text"
                    value={addressLine2}
                    onChange={(e) => setAddressLine2(e.target.value)}
                    placeholder="Apt, Suite, Building, Floor"
                    className="w-full border border-slate-200 rounded-xl p-2.5 focus:outline-none focus:ring-2 focus:ring-[#1677FF]"
                  />
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">City *</label>
                    <input
                      type="text"
                      required
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      className="w-full border border-slate-200 rounded-xl p-2.5 focus:outline-none focus:ring-2 focus:ring-[#1677FF]"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">State / Province *</label>
                    <input
                      type="text"
                      required
                      value={state}
                      onChange={(e) => setState(e.target.value)}
                      className="w-full border border-slate-200 rounded-xl p-2.5 focus:outline-none focus:ring-2 focus:ring-[#1677FF]"
                    />
                  </div>

                  <div className="col-span-2 sm:col-span-1">
                    <label className="block font-semibold text-slate-700 mb-1">Postal / ZIP Code *</label>
                    <input
                      type="text"
                      required
                      value={postalCode}
                      onChange={(e) => setPostalCode(e.target.value)}
                      className="w-full border border-slate-200 rounded-xl p-2.5 focus:outline-none focus:ring-2 focus:ring-[#1677FF]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Country / Region</label>
                  <input
                    type="text"
                    disabled
                    value={country}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-slate-500 cursor-not-allowed"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Delivery Notes / Instructions</label>
                  <textarea
                    rows={2}
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="e.g. Leave package on front porch, call upon arrival"
                    className="w-full border border-slate-200 rounded-xl p-2.5 focus:outline-none focus:ring-2 focus:ring-[#1677FF]"
                  />
                </div>
              </div>
            </div>

            {/* Payment Method */}
            <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-xs space-y-4">
              <h2 className="text-base font-bold text-[#0B1739] flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-blue-100 text-[#1677FF] text-xs flex items-center justify-center font-black">
                  3
                </span>
                <span>Payment Method</span>
              </h2>

              <div className="space-y-3 text-xs">
                {/* Cash on Delivery (COD) */}
                <label
                  className={`flex items-start gap-3 p-4 rounded-2xl border cursor-pointer transition ${
                    paymentMethod === "cod"
                      ? "border-[#1677FF] bg-blue-50/40 ring-2 ring-blue-100"
                      : "border-slate-200 hover:border-slate-300"
                  }`}
                >
                  <input
                    type="radio"
                    name="payment"
                    value="cod"
                    checked={paymentMethod === "cod"}
                    onChange={() => setPaymentMethod("cod")}
                    className="mt-0.5 accent-[#1677FF]"
                  />
                  <div className="flex-1">
                    <div className="flex items-center justify-between font-bold text-[#0B1739]">
                      <span className="flex items-center gap-1.5">
                        <Banknote className="w-4 h-4 text-emerald-600" />
                        <span>Cash on Delivery (COD)</span>
                      </span>
                      <span className="text-[10px] text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full font-bold">
                        Zero Prepayment Required
                      </span>
                    </div>
                    <p className="text-slate-500 text-[11px] mt-1 leading-relaxed">
                      Pay with cash or local payment method upon doorstep delivery by courier.
                    </p>
                  </div>
                </label>

                {/* Test Mode Card / Gateway notice */}
                <label
                  className={`flex items-start gap-3 p-4 rounded-2xl border cursor-pointer transition ${
                    paymentMethod === "card_manual"
                      ? "border-[#1677FF] bg-blue-50/40 ring-2 ring-blue-100"
                      : "border-slate-200 hover:border-slate-300"
                  }`}
                >
                  <input
                    type="radio"
                    name="payment"
                    value="card_manual"
                    checked={paymentMethod === "card_manual"}
                    onChange={() => setPaymentMethod("card_manual")}
                    className="mt-0.5 accent-[#1677FF]"
                  />
                  <div className="flex-1">
                    <div className="flex items-center justify-between font-bold text-[#0B1739]">
                      <span className="flex items-center gap-1.5">
                        <CreditCard className="w-4 h-4 text-[#1677FF]" />
                        <span>Credit / Debit Card (Real Test Sandbox)</span>
                      </span>
                      <span className="text-[10px] text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full font-bold">
                        Test Sandbox Mode
                      </span>
                    </div>
                    <p className="text-slate-500 text-[11px] mt-1 leading-relaxed">
                      Server-verified test order simulation. No real credit card charge occurs in developer preview mode.
                    </p>
                  </div>
                </label>
              </div>
            </div>
          </div>

          {/* Right: Order Summary Breakdown */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-xs space-y-4">
              <h2 className="font-black text-base text-[#0B1739]">Order Review</h2>

              {/* Items List snippet */}
              <div className="divide-y divide-slate-100 max-h-60 overflow-y-auto pr-1">
                {items.map((item) => (
                  <div key={item.id} className="py-2.5 first:pt-0 last:pb-0 flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-slate-50 border border-slate-100 overflow-hidden shrink-0">
                      <img
                        src={item.image_url}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0 text-xs">
                      <p className="font-bold text-[#0B1739] truncate">{item.name}</p>
                      <p className="text-slate-400 text-[11px]">Qty: {item.quantity}</p>
                    </div>
                    <p className="font-extrabold text-xs text-[#0B1739]">
                      {formatPrice(item.price_in_cents * item.quantity)}
                    </p>
                  </div>
                ))}
              </div>

              {/* Breakdown */}
              <div className="space-y-2 text-xs text-slate-600 border-t border-slate-100 pt-3">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-semibold text-slate-900">{formatPrice(subtotalCents)}</span>
                </div>
                {discountCents > 0 && (
                  <div className="flex justify-between text-emerald-600 font-semibold">
                    <span>Discount ({appliedCoupon?.code})</span>
                    <span>-{formatPrice(discountCents)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span>{shippingCents === 0 ? "FREE" : formatPrice(shippingCents)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Sales Tax (5%)</span>
                  <span>{formatPrice(taxCents)}</span>
                </div>
                <div className="flex justify-between border-t border-slate-200 pt-3 text-base font-black text-[#0B1739]">
                  <span>Total Amount</span>
                  <span className="text-[#1677FF]">{formatPrice(totalCents)}</span>
                </div>
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-[#1677FF] hover:bg-blue-600 disabled:opacity-50 text-white font-bold text-sm py-3.5 rounded-xl shadow-md transition flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <span>Processing Order...</span>
                ) : (
                  <>
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Place Order • {formatPrice(totalCents)}</span>
                  </>
                )}
              </button>

              <div className="text-[11px] text-slate-400 text-center space-y-1 pt-1">
                <p>By placing this order, you agree to ShopEase&apos;s Terms of Service and Privacy Policy.</p>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
