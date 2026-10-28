"use client";

import React, { Suspense } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, LayoutGrid, Heart, ShoppingBag, User } from "lucide-react";
import { useCart } from "@/lib/store/cart-context";
import { useWishlist } from "@/lib/store/wishlist-context";
import { useAuth } from "@/lib/store/auth-context";

function MobileBottomNavContent() {
  const pathname = usePathname();
  const { itemCount, setIsCartOpen } = useCart();
  const { wishlistCount } = useWishlist();
  const { user } = useAuth();

  // Hide on admin routes for clean dashboard view
  if (pathname.startsWith("/admin")) return null;

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-slate-200 px-2 py-2 flex items-center justify-around shadow-lg">
      <Link
        href="/"
        className={`flex flex-col items-center gap-1 text-[11px] font-medium transition ${
          pathname === "/" ? "text-[#1677FF] font-bold" : "text-slate-500 hover:text-slate-900"
        }`}
      >
        <Home className="w-5 h-5" />
        <span>Home</span>
      </Link>

      <Link
        href="/shop"
        className={`flex flex-col items-center gap-1 text-[11px] font-medium transition ${
          pathname.startsWith("/shop") ? "text-[#1677FF] font-bold" : "text-slate-500 hover:text-slate-900"
        }`}
      >
        <LayoutGrid className="w-5 h-5" />
        <span>Categories</span>
      </Link>

      <Link
        href="/account/wishlist"
        className={`relative flex flex-col items-center gap-1 text-[11px] font-medium transition ${
          pathname === "/account/wishlist" ? "text-[#1677FF] font-bold" : "text-slate-500 hover:text-slate-900"
        }`}
      >
        <div className="relative">
          <Heart className="w-5 h-5" />
          {wishlistCount > 0 && (
            <span className="absolute -top-1 -right-2 bg-[#1677FF] text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
              {wishlistCount}
            </span>
          )}
        </div>
        <span>Wishlist</span>
      </Link>

      <button
        onClick={() => setIsCartOpen(true)}
        className="relative flex flex-col items-center gap-1 text-[11px] font-medium text-slate-500 hover:text-slate-900 transition"
      >
        <div className="relative">
          <ShoppingBag className="w-5 h-5" />
          {itemCount > 0 && (
            <span className="absolute -top-1 -right-2 bg-[#1677FF] text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
              {itemCount}
            </span>
          )}
        </div>
        <span>Cart</span>
      </button>

      <Link
        href={user ? "/account" : "/auth/login"}
        className={`flex flex-col items-center gap-1 text-[11px] font-medium transition ${
          pathname.startsWith("/account") || pathname.startsWith("/auth")
            ? "text-[#1677FF] font-bold"
            : "text-slate-500 hover:text-slate-900"
        }`}
      >
        <User className="w-5 h-5" />
        <span>Account</span>
      </Link>
    </nav>
  );
}

export function MobileBottomNav() {
  return (
    <Suspense fallback={null}>
      <MobileBottomNavContent />
    </Suspense>
  );
}
