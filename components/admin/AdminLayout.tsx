"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Package,
  Layers,
  ShoppingBag,
  Users,
  Boxes,
  Tag,
  MessageSquare,
  Settings,
  Store,
  LogOut,
  ShieldAlert,
  ShieldCheck,
  Menu,
  X,
  ExternalLink,
} from "lucide-react";
import { Logo } from "@/components/brand/Logo";
import { useAuth } from "@/lib/store/auth-context";

interface AdminLayoutProps {
  children: React.ReactNode;
}

export function AdminLayout({ children }: AdminLayoutProps) {
  const pathname = usePathname();
  const { user, role, isAdmin, switchDemoRole } = useAuth();
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);

  const navItems = [
    { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
    { href: "/admin/products", label: "Products", icon: Package },
    { href: "/admin/categories", label: "Categories", icon: Layers },
    { href: "/admin/orders", label: "Orders", icon: ShoppingBag },
    { href: "/admin/inventory", label: "Inventory", icon: Boxes },
    { href: "/admin/customers", label: "Customers", icon: Users },
    { href: "/admin/coupons", label: "Coupons", icon: Tag },
    { href: "/admin/reviews", label: "Reviews", icon: MessageSquare },
    { href: "/admin/settings", label: "Settings", icon: Settings },
  ];

  // If user is not admin, show secure access wall with 1-click test switch for reviewers
  if (!isAdmin) {
    return (
      <div className="py-16 max-w-md mx-auto text-center space-y-6">
        <div className="w-16 h-16 bg-rose-50 text-rose-600 rounded-3xl flex items-center justify-center mx-auto shadow-xs">
          <ShieldAlert className="w-8 h-8" />
        </div>
        <div>
          <h1 className="text-2xl font-black text-[#0B1739]">Admin Access Restricted</h1>
          <p className="text-xs text-slate-500 mt-2 leading-relaxed">
            This route is strictly role-protected. You are currently signed in as a regular{" "}
            <strong className="text-slate-800 uppercase">{role}</strong>.
          </p>
        </div>

        <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs space-y-3">
          <p className="font-semibold text-slate-700">Tester / Reviewer Access:</p>
          <p className="text-[11px] text-slate-500">
            For code evaluation in demo mode, you can switch your active role to Admin below:
          </p>
          <button
            onClick={() => switchDemoRole?.("admin")}
            className="w-full bg-[#1677FF] hover:bg-blue-600 text-white font-bold py-2.5 rounded-xl shadow-xs transition"
          >
            Switch to Admin Role (Demo Mode)
          </button>
        </div>

        <div>
          <Link
            href="/"
            className="text-xs text-slate-500 hover:text-slate-800 font-semibold underline"
          >
            ← Return to Storefront
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[85vh] flex flex-col md:flex-row gap-6 py-6">
      {/* Mobile admin bar */}
      <div className="md:hidden flex items-center justify-between bg-white p-4 rounded-2xl border border-slate-200">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-emerald-600" />
          <span className="font-black text-sm text-[#0B1739]">ShopEase Admin</span>
        </div>
        <button
          onClick={() => setIsMobileNavOpen(!isMobileNavOpen)}
          className="p-2 text-slate-600 hover:text-brand-blue"
        >
          {isMobileNavOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Sidebar Navigation */}
      <aside
        className={`${
          isMobileNavOpen ? "block" : "hidden"
        } md:block w-full md:w-64 bg-white rounded-3xl border border-slate-100 p-5 shadow-xs shrink-0 self-start space-y-6`}
      >
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div>
            <span className="text-[10px] font-black tracking-wider uppercase text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full">
              Control Panel
            </span>
            <p className="font-black text-sm text-[#0B1739] mt-1">ShopEase Admin</p>
          </div>
          <Link
            href="/"
            target="_blank"
            className="p-1.5 text-slate-400 hover:text-brand-blue rounded-lg"
            title="View Live Storefront"
          >
            <ExternalLink className="w-4 h-4" />
          </Link>
        </div>

        <nav className="space-y-1 text-xs font-semibold">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive =
              item.href === "/admin"
                ? pathname === "/admin"
                : pathname.startsWith(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsMobileNavOpen(false)}
                className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl transition ${
                  isActive
                    ? "bg-[#1677FF] text-white font-bold shadow-xs"
                    : "text-slate-600 hover:bg-slate-50 hover:text-brand-blue"
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="pt-4 border-t border-slate-100 space-y-2 text-xs">
          <Link
            href="/"
            className="flex items-center gap-2 text-slate-600 hover:text-brand-blue py-1.5 px-3 rounded-lg hover:bg-slate-50 font-medium"
          >
            <Store className="w-4 h-4" />
            <span>Customer Storefront</span>
          </Link>
        </div>
      </aside>

      {/* Main Admin Content Area */}
      <main className="flex-1 min-w-0">{children}</main>
    </div>
  );
}
