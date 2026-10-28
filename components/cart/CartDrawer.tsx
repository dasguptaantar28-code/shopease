"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { X, ShoppingBag, Trash2, Plus, Minus, ArrowRight, Tag } from "lucide-react";
import { useCart } from "@/lib/store/cart-context";
import { formatPrice } from "@/lib/formatters";

export function CartDrawer() {
  const {
    items,
    itemCount,
    subtotalCents,
    discountCents,
    shippingCents,
    totalCents,
    appliedCoupon,
    isCartOpen,
    setIsCartOpen,
    updateQuantity,
    removeFromCart,
    applyCoupon,
    removeCoupon,
  } = useCart();

  const [couponInput, setCouponInput] = useState("");
  const [isApplying, setIsApplying] = useState(false);

  if (!isCartOpen) return null;

  const handleApplyCoupon = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponInput.trim()) return;
    setIsApplying(true);
    await applyCoupon(couponInput);
    setIsApplying(false);
    setCouponInput("");
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-slate-900/40 backdrop-blur-xs transition-opacity duration-300"
        onClick={() => setIsCartOpen(false)}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col">
          {/* Header */}
          <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-brand-blue" />
              <h2 className="text-lg font-bold text-brand-navy">Your Cart</h2>
              <span className="text-xs bg-brand-blue/10 text-brand-blue font-semibold px-2 py-0.5 rounded-full">
                {itemCount} {itemCount === 1 ? "item" : "items"}
              </span>
            </div>
            <button
              onClick={() => setIsCartOpen(false)}
              className="p-2 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100 transition"
              aria-label="Close cart"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-5 divide-y divide-slate-100">
            {items.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-6 text-slate-500">
                <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center text-slate-400 mb-4">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <h3 className="font-semibold text-brand-navy text-lg">Your cart is empty</h3>
                <p className="text-sm text-slate-500 mt-1 mb-6">
                  Looks like you haven&apos;t added any items to your cart yet.
                </p>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="inline-flex items-center gap-2 bg-brand-blue text-white px-5 py-2.5 rounded-xl font-medium text-sm hover:bg-blue-600 transition shadow-sm"
                >
                  Start Shopping
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            ) : (
              items.map((item) => (
                <div key={item.id} className="py-4 first:pt-0 last:pb-0 flex gap-4">
                  {/* Image */}
                  <div className="relative w-20 h-20 bg-slate-50 rounded-xl border border-slate-100 overflow-hidden shrink-0">
                    <img
                      src={item.image_url}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0 flex flex-col justify-between">
                    <div>
                      <h4 className="font-semibold text-sm text-brand-navy line-clamp-1 hover:text-brand-blue">
                        <Link href={`/product/${item.slug}`} onClick={() => setIsCartOpen(false)}>
                          {item.name}
                        </Link>
                      </h4>
                      {item.variant_title && (
                        <p className="text-xs text-slate-500 mt-0.5">{item.variant_title}</p>
                      )}
                      <p className="font-bold text-sm text-brand-navy mt-1">
                        {formatPrice(item.price_in_cents)}
                      </p>
                    </div>

                    {/* Quantity controls */}
                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center border border-slate-200 rounded-lg overflow-hidden bg-slate-50">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="px-2 py-1 text-slate-500 hover:text-brand-navy hover:bg-slate-200 transition"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="px-2 text-xs font-semibold text-slate-700 min-w-5 text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="px-2 py-1 text-slate-500 hover:text-brand-navy hover:bg-slate-200 transition"
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-slate-400 hover:text-rose-500 p-1 rounded transition"
                        title="Remove item"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer calculation & checkout */}
          {items.length > 0 && (
            <div className="p-5 border-t border-slate-100 bg-slate-50/80 space-y-3">
              {/* Coupon Form */}
              {appliedCoupon ? (
                <div className="flex items-center justify-between bg-emerald-50 border border-emerald-200 px-3 py-2 rounded-xl text-xs text-emerald-800">
                  <div className="flex items-center gap-1.5 font-medium">
                    <Tag className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Coupon <strong>{appliedCoupon.code}</strong> applied</span>
                  </div>
                  <button
                    onClick={removeCoupon}
                    className="text-emerald-700 hover:text-rose-600 font-semibold text-xs ml-2"
                  >
                    Remove
                  </button>
                </div>
              ) : (
                <form onSubmit={handleApplyCoupon} className="flex gap-2">
                  <input
                    type="text"
                    value={couponInput}
                    onChange={(e) => setCouponInput(e.target.value)}
                    placeholder="Discount code (e.g. WELCOME10)"
                    className="flex-1 bg-white border border-slate-200 px-3 py-1.5 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-brand-blue"
                  />
                  <button
                    type="submit"
                    disabled={isApplying || !couponInput.trim()}
                    className="bg-brand-navy text-white px-3 py-1.5 rounded-xl text-xs font-semibold hover:bg-slate-800 disabled:opacity-50 transition"
                  >
                    {isApplying ? "Applying..." : "Apply"}
                  </button>
                </form>
              )}

              {/* Subtotal breakdowns */}
              <div className="space-y-1.5 text-xs text-slate-600 pt-1">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-semibold text-slate-900">{formatPrice(subtotalCents)}</span>
                </div>
                {discountCents > 0 && (
                  <div className="flex justify-between text-emerald-600">
                    <span>Discount</span>
                    <span>-{formatPrice(discountCents)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span>{shippingCents === 0 ? "FREE" : formatPrice(shippingCents)}</span>
                </div>
                <div className="flex justify-between border-t border-slate-200 pt-2 text-sm font-bold text-brand-navy">
                  <span>Estimated Total</span>
                  <span className="text-brand-blue">{formatPrice(totalCents)}</span>
                </div>
              </div>

              {/* Checkout & View Cart buttons */}
              <div className="space-y-2 pt-2">
                <Link
                  href="/checkout"
                  onClick={() => setIsCartOpen(false)}
                  className="w-full flex items-center justify-center gap-2 bg-brand-blue text-white py-3 rounded-xl font-bold text-sm hover:bg-blue-600 transition shadow-sm"
                >
                  Proceed to Checkout
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href="/cart"
                  onClick={() => setIsCartOpen(false)}
                  className="w-full flex items-center justify-center text-xs font-semibold text-slate-600 hover:text-brand-navy py-1.5 transition"
                >
                  View Full Cart & Details
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
