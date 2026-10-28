"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { PackageCheck, Heart, MapPin, User, LogOut, LayoutDashboard } from "lucide-react";
import { useAuth } from "@/lib/store/auth-context";

export function AccountNav() {
  const pathname = usePathname();
  const { user, isAdmin, logout } = useAuth();

  const links = [
    { href: "/account/orders", label: "My Orders", icon: PackageCheck },
    { href: "/account/wishlist", label: "Wishlist", icon: Heart },
    { href: "/account/addresses", label: "Saved Addresses", icon: MapPin },
    { href: "/account/profile", label: "Profile Settings", icon: User },
  ];

  return (
    <div className="bg-white rounded-3xl border border-slate-100 p-6 shadow-xs space-y-6">
      {/* User Card */}
      <div className="flex items-center gap-3 pb-4 border-b border-slate-100">
        <div className="w-12 h-12 rounded-2xl bg-blue-100 text-[#1677FF] font-black flex items-center justify-center text-base">
          {user?.full_name?.[0]?.toUpperCase() || user?.email?.[0]?.toUpperCase() || "U"}
        </div>
        <div className="min-w-0">
          <p className="font-bold text-sm text-[#0B1739] truncate">{user?.full_name || "Customer"}</p>
          <p className="text-xs text-slate-400 truncate">{user?.email}</p>
          <span className="inline-block mt-0.5 px-2 py-0.5 text-[9px] font-extrabold uppercase bg-slate-100 text-slate-700 rounded-full">
            {user?.role || "Customer"}
          </span>
        </div>
      </div>

      {/* Nav items */}
      <nav className="space-y-1 text-xs font-semibold">
        {isAdmin && (
          <Link
            href="/admin"
            className="flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-blue-700 bg-blue-50 hover:bg-blue-100 transition mb-2"
          >
            <LayoutDashboard className="w-4 h-4 text-blue-600" />
            <span>Admin Dashboard</span>
          </Link>
        )}

        {links.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href || (item.href === "/account/orders" && pathname === "/account");
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl transition ${
                isActive
                  ? "bg-[#1677FF] text-white font-bold shadow-xs"
                  : "text-slate-700 hover:bg-slate-50 hover:text-brand-blue"
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{item.label}</span>
            </Link>
          );
        })}

        <button
          onClick={logout}
          className="w-full flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-rose-600 hover:bg-rose-50 transition mt-4 pt-4 border-t border-slate-100 text-left"
        >
          <LogOut className="w-4 h-4" />
          <span>Sign Out</span>
        </button>
      </nav>
    </div>
  );
}
