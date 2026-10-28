"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Search,
  Heart,
  ShoppingBag,
  User,
  Menu,
  X,
  ChevronDown,
  LayoutDashboard,
  LogOut,
  PackageCheck,
  MapPin,
  Sparkles,
} from "lucide-react";
import { Logo } from "@/components/brand/Logo";
import { useCart } from "@/lib/store/cart-context";
import { useWishlist } from "@/lib/store/wishlist-context";
import { useAuth } from "@/lib/store/auth-context";
import { DEMO_CATEGORIES } from "@/lib/store/demo-data";

export function Header() {
  const router = useRouter();
  const { itemCount, setIsCartOpen } = useCart();
  const { wishlistCount } = useWishlist();
  const { user, isAdmin, logout } = useAuth();

  const [searchQuery, setSearchQuery] = useState("");
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const categoryRef = useRef<HTMLDivElement>(null);
  const userMenuRef = useRef<HTMLDivElement>(null);

  // Close dropdowns on click outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (categoryRef.current && !categoryRef.current.contains(event.target as Node)) {
        setIsCategoryOpen(false);
      }
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setIsUserMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/shop?search=${encodeURIComponent(searchQuery.trim())}`);
    } else {
      router.push("/shop");
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-slate-100 shadow-xs">
      {/* Main Header Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between gap-4 md:gap-8">
        {/* Mobile menu toggle & Logo */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 text-slate-700 hover:text-brand-blue rounded-lg"
            aria-label="Toggle navigation menu"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
          <Logo size="md" />
        </div>

        {/* Search Bar - Mockup layout with embedded blue button */}
        <form
          onSubmit={handleSearchSubmit}
          className="flex-1 max-w-xl hidden md:flex items-center relative"
        >
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search for products, brands and more..."
            className="w-full bg-slate-50 border border-slate-200 text-sm rounded-full pl-5 pr-12 py-2.5 text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#1677FF] focus:bg-white transition"
          />
          <button
            type="submit"
            className="absolute right-1.5 w-8 h-8 rounded-full bg-[#1677FF] text-white flex items-center justify-center hover:bg-blue-600 transition shadow-xs"
            aria-label="Search"
          >
            <Search className="w-4 h-4" />
          </button>
        </form>

        {/* Right Action Icons: Auth, Wishlist, Cart */}
        <div className="flex items-center gap-3 sm:gap-6">
          {/* User Account / Login */}
          <div className="relative" ref={userMenuRef}>
            {user ? (
              <div>
                <button
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="flex items-center gap-2 text-slate-700 hover:text-[#1677FF] font-medium text-sm p-1.5 rounded-lg transition"
                >
                  <div className="w-8 h-8 rounded-full bg-blue-100 text-[#1677FF] font-bold flex items-center justify-center text-xs">
                    {user.full_name?.[0]?.toUpperCase() || user.email[0].toUpperCase()}
                  </div>
                  <span className="hidden lg:inline text-xs truncate max-w-[120px]">
                    {user.full_name || user.email.split("@")[0]}
                  </span>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                </button>

                {isUserMenuOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-slate-100 py-2 z-50 animate-fade-in">
                    <div className="px-4 py-2 border-b border-slate-100">
                      <p className="text-xs text-slate-400 font-medium">Signed in as</p>
                      <p className="text-sm font-bold text-slate-900 truncate">{user.email}</p>
                      <span className="inline-block mt-1 px-2 py-0.5 text-[10px] font-bold rounded-full bg-slate-100 text-slate-700 uppercase">
                        {user.role}
                      </span>
                    </div>

                    {isAdmin && (
                      <Link
                        href="/admin"
                        onClick={() => setIsUserMenuOpen(false)}
                        className="flex items-center gap-2 px-4 py-2.5 text-xs font-semibold text-blue-600 hover:bg-blue-50 transition"
                      >
                        <LayoutDashboard className="w-4 h-4" />
                        Admin Dashboard
                      </Link>
                    )}

                    <Link
                      href="/account/orders"
                      onClick={() => setIsUserMenuOpen(false)}
                      className="flex items-center gap-2 px-4 py-2.5 text-xs text-slate-700 hover:bg-slate-50 transition"
                    >
                      <PackageCheck className="w-4 h-4 text-slate-400" />
                      My Orders
                    </Link>

                    <Link
                      href="/account/addresses"
                      onClick={() => setIsUserMenuOpen(false)}
                      className="flex items-center gap-2 px-4 py-2.5 text-xs text-slate-700 hover:bg-slate-50 transition"
                    >
                      <MapPin className="w-4 h-4 text-slate-400" />
                      Saved Addresses
                    </Link>

                    <Link
                      href="/account/profile"
                      onClick={() => setIsUserMenuOpen(false)}
                      className="flex items-center gap-2 px-4 py-2.5 text-xs text-slate-700 hover:bg-slate-50 transition"
                    >
                      <User className="w-4 h-4 text-slate-400" />
                      Account Settings
                    </Link>

                    <div className="border-t border-slate-100 mt-1 pt-1">
                      <button
                        onClick={() => {
                          setIsUserMenuOpen(false);
                          logout();
                        }}
                        className="w-full flex items-center gap-2 px-4 py-2 text-xs text-rose-600 hover:bg-rose-50 transition"
                      >
                        <LogOut className="w-4 h-4" />
                        Sign Out
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <Link
                href="/auth/login"
                className="flex items-center gap-1.5 text-slate-700 hover:text-[#1677FF] font-semibold text-xs sm:text-sm transition"
              >
                <User className="w-4 h-4" />
                <span className="hidden sm:inline">Login / Register</span>
              </Link>
            )}
          </div>

          {/* Wishlist Link */}
          <Link
            href="/account/wishlist"
            className="relative p-2 text-slate-700 hover:text-[#1677FF] rounded-lg transition"
            aria-label={`Wishlist with ${wishlistCount} items`}
          >
            <Heart className="w-5 h-5" />
            {wishlistCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 bg-[#1677FF] text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                {wishlistCount}
              </span>
            )}
          </Link>

          {/* Cart Icon / Drawer trigger */}
          <button
            onClick={() => setIsCartOpen(true)}
            className="relative p-2 text-slate-700 hover:text-[#1677FF] rounded-lg transition cursor-pointer"
            aria-label={`Shopping cart with ${itemCount} items`}
          >
            <ShoppingBag className="w-5 h-5" />
            {itemCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 bg-[#1677FF] text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                {itemCount}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Search input bar */}
      <div className="md:hidden px-4 pb-3">
        <form onSubmit={handleSearchSubmit} className="flex items-center relative">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search products..."
            className="w-full bg-slate-50 border border-slate-200 text-sm rounded-full pl-4 pr-10 py-2 text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#1677FF]"
          />
          <button
            type="submit"
            className="absolute right-1.5 w-7 h-7 rounded-full bg-[#1677FF] text-white flex items-center justify-center"
            aria-label="Search"
          >
            <Search className="w-3.5 h-3.5" />
          </button>
        </form>
      </div>

      {/* Secondary Navigation Bar (Desktop) */}
      <div className="hidden md:block bg-white border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center gap-6">
          {/* "All Categories" button with dropdown */}
          <div className="relative" ref={categoryRef}>
            <button
              onClick={() => setIsCategoryOpen(!isCategoryOpen)}
              className="flex items-center gap-2.5 bg-[#1677FF] text-white font-bold text-xs uppercase tracking-wider px-5 py-3 rounded-none hover:bg-blue-600 transition"
            >
              <Menu className="w-4 h-4" />
              <span>All Categories</span>
              <ChevronDown className="w-3.5 h-3.5 ml-1" />
            </button>

            {isCategoryOpen && (
              <div className="absolute left-0 top-full mt-0 w-64 bg-white rounded-b-xl shadow-xl border border-slate-100 py-2 z-50 animate-fade-in">
                {DEMO_CATEGORIES.map((cat) => (
                  <Link
                    key={cat.id}
                    href={`/shop?category=${cat.slug}`}
                    onClick={() => setIsCategoryOpen(false)}
                    className="flex items-center justify-between px-4 py-2.5 text-xs font-medium text-slate-700 hover:bg-blue-50 hover:text-brand-blue transition"
                  >
                    <span>{cat.name}</span>
                    <span className="text-[10px] text-slate-400">→</span>
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Nav links */}
          <nav className="flex items-center gap-8 text-sm font-semibold text-slate-700">
            <Link href="/" className="hover:text-[#1677FF] transition py-3">
              Home
            </Link>
            <Link href="/shop" className="hover:text-[#1677FF] transition py-3">
              Shop
            </Link>
            <Link href="/shop?featured=true" className="hover:text-[#1677FF] transition py-3 flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              <span>Deals</span>
            </Link>
            <Link href="/about" className="hover:text-[#1677FF] transition py-3">
              About
            </Link>
            <Link href="/contact" className="hover:text-[#1677FF] transition py-3">
              Contact
            </Link>
          </nav>

          {/* Right quick badge */}
          <div className="ml-auto flex items-center gap-2 text-xs text-slate-500">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span>Over 1,000+ items in stock</span>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Navigation Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-slate-100 bg-white px-4 py-4 space-y-4 animate-fade-in">
          <nav className="flex flex-col space-y-2 text-sm font-semibold text-slate-800">
            <Link
              href="/"
              onClick={() => setIsMobileMenuOpen(false)}
              className="py-2 px-3 rounded-lg hover:bg-slate-50"
            >
              Home
            </Link>
            <Link
              href="/shop"
              onClick={() => setIsMobileMenuOpen(false)}
              className="py-2 px-3 rounded-lg hover:bg-slate-50"
            >
              Shop All Products
            </Link>
            <Link
              href="/shop?featured=true"
              onClick={() => setIsMobileMenuOpen(false)}
              className="py-2 px-3 rounded-lg hover:bg-slate-50 text-brand-blue"
            >
              Special Deals & Offers
            </Link>
            <Link
              href="/about"
              onClick={() => setIsMobileMenuOpen(false)}
              className="py-2 px-3 rounded-lg hover:bg-slate-50"
            >
              About ShopEase
            </Link>
            <Link
              href="/contact"
              onClick={() => setIsMobileMenuOpen(false)}
              className="py-2 px-3 rounded-lg hover:bg-slate-50"
            >
              Contact Support
            </Link>
            {isAdmin && (
              <Link
                href="/admin"
                onClick={() => setIsMobileMenuOpen(false)}
                className="py-2 px-3 rounded-lg bg-blue-50 text-brand-blue font-bold"
              >
                Admin Dashboard
              </Link>
            )}
          </nav>

          <div className="border-t border-slate-100 pt-3">
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Categories</p>
            <div className="grid grid-cols-2 gap-2 text-xs">
              {DEMO_CATEGORIES.map((c) => (
                <Link
                  key={c.id}
                  href={`/shop?category=${c.slug}`}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-2 rounded-md bg-slate-50 text-slate-700 hover:text-brand-blue"
                >
                  {c.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
