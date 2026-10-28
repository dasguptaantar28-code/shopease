"use client";

import React from "react";
import Link from "next/link";
import { Heart, ShoppingBag, Trash2, ArrowLeft } from "lucide-react";
import { AccountNav } from "@/components/account/AccountNav";
import { useWishlist } from "@/lib/store/wishlist-context";
import { useCart } from "@/lib/store/cart-context";
import { formatPrice } from "@/lib/formatters";

export default function WishlistPage() {
  const { wishlist, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();

  return (
    <div className="py-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-4">
          <AccountNav />
        </div>

        <div className="lg:col-span-8 space-y-6">
          <div className="bg-white rounded-3xl border border-slate-100 p-6 sm:p-8 shadow-xs space-y-6">
            <div>
              <h1 className="text-xl sm:text-2xl font-black text-[#0B1739]">My Wishlist</h1>
              <p className="text-xs text-slate-500 mt-0.5">
                {wishlist.length} {wishlist.length === 1 ? "item" : "items"} saved for later
              </p>
            </div>

            {wishlist.length === 0 ? (
              <div className="text-center py-12 space-y-3">
                <div className="w-14 h-14 bg-rose-50 text-rose-500 rounded-full flex items-center justify-center mx-auto">
                  <Heart className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-sm text-[#0B1739]">Your wishlist is empty</h3>
                <p className="text-xs text-slate-500 max-w-sm mx-auto">
                  Save items you love by tapping the heart icon on any product card.
                </p>
                <Link
                  href="/shop"
                  className="inline-flex items-center gap-1.5 bg-[#1677FF] text-white font-bold text-xs px-4 py-2 rounded-xl"
                >
                  Explore Products
                </Link>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {wishlist.map((item) => (
                  <div
                    key={item.id}
                    className="border border-slate-100 rounded-2xl p-4 flex gap-4 bg-slate-50/40 hover:border-blue-100 transition shadow-xs"
                  >
                    <div className="w-20 h-20 rounded-xl bg-white border border-slate-100 overflow-hidden shrink-0">
                      <img
                        src={item.images?.[0]?.image_url}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    <div className="flex-1 min-w-0 flex flex-col justify-between text-xs">
                      <div>
                        <h4 className="font-bold text-[#0B1739] truncate hover:text-[#1677FF]">
                          <Link href={`/product/${item.slug}`}>{item.name}</Link>
                        </h4>
                        <p className="font-extrabold text-[#0B1739] mt-0.5">
                          {formatPrice(item.price_in_cents)}
                        </p>
                      </div>

                      <div className="flex items-center gap-2 pt-2">
                        <button
                          onClick={() => addToCart(item, 1)}
                          className="flex-1 inline-flex items-center justify-center gap-1.5 bg-[#1677FF] text-white font-bold text-[11px] py-1.5 rounded-lg hover:bg-blue-600 transition"
                        >
                          <ShoppingBag className="w-3.5 h-3.5" />
                          <span>Add to Cart</span>
                        </button>
                        <button
                          onClick={() => removeFromWishlist(item.id)}
                          className="p-1.5 text-slate-400 hover:text-rose-600 rounded-lg"
                          title="Remove from wishlist"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
