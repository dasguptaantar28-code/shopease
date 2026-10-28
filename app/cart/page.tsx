"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  ShoppingBag,
  Trash2,
  Plus,
  Minus,
  ArrowRight,
  ShieldCheck,
  Tag,
  Truck,
  ArrowLeft,
} from "lucide-react";
import { useCart } from "@/lib/store/cart-context";
import { formatPrice } from "@/lib/formatters";

export default function CartPage() {
  const {
    items,
    itemCount,
    subtotalCents,
    discountCents,
    shippingCents,
    taxCents,
    totalCents,
    appliedCoupon,
    updateQuantity,
    removeFromCart,
    clearCart,
    applyCoupon,
    removeCoupon,
  } = useCart();

  const [couponCode, setCouponCode] = useState("");
  const [isApplying, setIsApplying] = useState(false);

  // Free shipping threshold ($50 = 5000 cents)
  const freeShippingThreshold = 5000;
  const progressPercent = Math.min(100, Math.round((subtotalCents / freeShippingThreshold) * 100));
  const amountNeededForFreeShipping = Math.max(0, freeShippingThreshold - subtotalCents);

  const handleApplyCoupon = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponCode.trim()) return;
    setIsApplying(true);
    await applyCoupon(couponCode);
    setIsApplying(false);
    setCouponCode("");
  };

  if (items.length === 0) {
    return (
      <div className="py-16 text-center max-w-md mx-auto space-y-4">
        <div className="w-20 h-20 bg-blue-50 text-[#1677FF] rounded-full flex items-center justify-center mx-auto mb-4">
          <ShoppingBag className="w-10 h-10" />
        </div>
        <h1 className="text-2xl font-black text-[#0B1739]">Your Shopping Cart is Empty</h1>
        <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
          Looks like you haven&apos;t added anything to your cart yet. Explore our featured
          products and find something you love!
        </p>
        <div className="pt-4">
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 bg-[#1677FF] hover:bg-blue-600 text-white font-bold text-xs sm:text-sm px-6 py-3 rounded-xl shadow-md transition"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Explore All Products</span>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="py-8 space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-200 pb-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-[#0B1739]">Shopping Cart</h1>
          <p className="text-xs text-slate-500 mt-0.5">
            You have {itemCount} {itemCount === 1 ? "item" : "items"} in your cart
          </p>
        </div>
        <button
          onClick={clearCart}
          className="text-xs font-semibold text-rose-600 hover:text-rose-700 hover:underline flex items-center gap-1"
        >
          <Trash2 className="w-3.5 h-3.5" />
          <span>Clear Cart</span>
        </button>
      </div>

      {/* Free Shipping Progress Indicator */}
      <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-xs space-y-2">
        <div className="flex items-center justify-between text-xs">
          <span className="flex items-center gap-1.5 font-bold text-[#0B1739]">
            <Truck className="w-4 h-4 text-[#1677FF]" />
            {amountNeededForFreeShipping === 0 ? (
              <span className="text-emerald-600">🎉 Congratulations! You have unlocked FREE Shipping!</span>
            ) : (
              <span>
                Add <strong>{formatPrice(amountNeededForFreeShipping)}</strong> more to get{" "}
                <span className="text-[#1677FF]">FREE Shipping</span>!
              </span>
            )}
          </span>
          <span className="font-semibold text-slate-500">{progressPercent}%</span>
        </div>
        <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
          <div
            className="bg-[#1677FF] h-2 rounded-full transition-all duration-300"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left: Items Table */}
        <div className="lg:col-span-8 bg-white rounded-3xl border border-slate-100 p-6 shadow-xs divide-y divide-slate-100">
          {items.map((item) => (
            <div key={item.id} className="py-4 first:pt-0 last:pb-0 flex gap-4 sm:gap-6 items-center">
              {/* Product Thumbnail */}
              <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-slate-50 border border-slate-100 overflow-hidden shrink-0">
                <img
                  src={item.image_url}
                  alt={item.name}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Title & Info */}
              <div className="flex-1 min-w-0">
                <Link
                  href={`/product/${item.slug}`}
                  className="font-bold text-sm sm:text-base text-[#0B1739] hover:text-[#1677FF] line-clamp-1"
                >
                  {item.name}
                </Link>
                {item.variant_title && (
                  <p className="text-xs text-slate-500 mt-0.5">{item.variant_title}</p>
                )}
                <p className="font-extrabold text-sm text-[#0B1739] mt-1 sm:hidden">
                  {formatPrice(item.price_in_cents)}
                </p>

                {/* Mobile quantity controls */}
                <div className="flex items-center gap-3 mt-3 sm:hidden">
                  <div className="flex items-center border border-slate-200 rounded-lg bg-slate-50">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="px-2 py-1 text-slate-500 hover:text-black"
                    >
                      <Minus className="w-3 h-3" />
                    </button>
                    <span className="px-2 text-xs font-bold">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="px-2 py-1 text-slate-500 hover:text-black"
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="text-xs text-rose-500"
                  >
                    Remove
                  </button>
                </div>
              </div>

              {/* Desktop Price & Quantity */}
              <div className="hidden sm:flex items-center gap-8">
                <div className="text-right">
                  <p className="font-extrabold text-sm text-[#0B1739]">
                    {formatPrice(item.price_in_cents)}
                  </p>
                  <p className="text-[10px] text-slate-400">each</p>
                </div>

                {/* Quantity Stepper */}
                <div className="flex items-center border border-slate-200 rounded-xl bg-slate-50 overflow-hidden">
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    className="px-2.5 py-1.5 text-slate-500 hover:bg-slate-200 transition"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="px-3 text-xs font-bold text-slate-800 min-w-8 text-center">
                    {item.quantity}
                  </span>
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    className="px-2.5 py-1.5 text-slate-500 hover:bg-slate-200 transition"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="text-right min-w-[70px]">
                  <p className="font-black text-sm text-[#0B1739]">
                    {formatPrice(item.price_in_cents * item.quantity)}
                  </p>
                </div>

                <button
                  onClick={() => removeFromCart(item.id)}
                  className="p-1.5 text-slate-400 hover:text-rose-600 rounded-lg transition"
                  title="Remove item"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}

          <div className="pt-4 flex justify-between items-center text-xs">
            <Link
              href="/shop"
              className="inline-flex items-center gap-1.5 text-[#1677FF] font-bold hover:underline"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Continue Shopping</span>
            </Link>
          </div>
        </div>

        {/* Right: Order Summary */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-white rounded-3xl border border-slate-100 p-6 shadow-xs space-y-4">
            <h2 className="font-black text-base text-[#0B1739]">Order Summary</h2>

            {/* Coupon input */}
            {appliedCoupon ? (
              <div className="flex items-center justify-between bg-emerald-50 border border-emerald-200 px-3 py-2 rounded-xl text-xs text-emerald-800">
                <div className="flex items-center gap-1.5 font-bold">
                  <Tag className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Coupon {appliedCoupon.code} applied</span>
                </div>
                <button
                  onClick={removeCoupon}
                  className="text-xs text-emerald-700 hover:text-rose-600 font-bold ml-2"
                >
                  Remove
                </button>
              </div>
            ) : (
              <form onSubmit={handleApplyCoupon} className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-600">Have a coupon code?</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    placeholder="Try WELCOME10 or SAVE20"
                    className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-[#1677FF]"
                  />
                  <button
                    type="submit"
                    disabled={isApplying || !couponCode.trim()}
                    className="bg-[#0B1739] text-white px-4 py-2 rounded-xl text-xs font-bold hover:bg-slate-800 disabled:opacity-50 transition"
                  >
                    {isApplying ? "..." : "Apply"}
                  </button>
                </div>
              </form>
            )}

            {/* Breakdown */}
            <div className="space-y-2.5 text-xs text-slate-600 border-t border-slate-100 pt-3">
              <div className="flex justify-between">
                <span>Items Subtotal</span>
                <span className="font-semibold text-slate-900">{formatPrice(subtotalCents)}</span>
              </div>
              {discountCents > 0 && (
                <div className="flex justify-between text-emerald-600 font-semibold">
                  <span>Discount</span>
                  <span>-{formatPrice(discountCents)}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Shipping Estimate</span>
                <span>{shippingCents === 0 ? "FREE" : formatPrice(shippingCents)}</span>
              </div>
              <div className="flex justify-between">
                <span>Estimated Sales Tax (5%)</span>
                <span>{formatPrice(taxCents)}</span>
              </div>
              <div className="flex justify-between border-t border-slate-200 pt-3 text-base font-black text-[#0B1739]">
                <span>Total</span>
                <span className="text-[#1677FF]">{formatPrice(totalCents)}</span>
              </div>
            </div>

            {/* Checkout Button */}
            <div className="pt-2">
              <Link
                href="/checkout"
                className="w-full flex items-center justify-center gap-2 bg-[#1677FF] hover:bg-blue-600 text-white font-bold text-sm py-3.5 rounded-xl shadow-md transition"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Guarantee badge */}
            <div className="flex items-center justify-center gap-2 text-[11px] text-slate-400 pt-2">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Safe & 256-Bit SSL Encrypted Checkout</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
