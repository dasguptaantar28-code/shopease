"use client";

import React from "react";
import Link from "next/link";
import { Sparkles, Phone, ShieldCheck, UserCheck } from "lucide-react";
import { useAuth } from "@/lib/store/auth-context";

export function AnnouncementBar() {
  const { user, role, switchDemoRole, isConfigured } = useAuth();

  return (
    <div className="bg-[#0B1739] text-white text-xs border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2 flex flex-col md:flex-row items-center justify-between gap-2">
        {/* Left message */}
        <div className="flex items-center gap-2 text-slate-300 text-center md:text-left">
          <Sparkles className="w-3.5 h-3.5 text-[#1677FF] shrink-0" />
          <span>
            Free shipping on orders over <strong>$50</strong> • Use code{" "}
            <span className="font-bold text-white bg-blue-600/30 px-1.5 py-0.5 rounded border border-blue-500/40">
              WELCOME10
            </span>{" "}
            for 10% off
          </span>
        </div>

        {/* Right utility links */}
        <div className="flex items-center gap-4 text-slate-400 text-[11px]">
          <Link href="/contact" className="hover:text-white transition flex items-center gap-1">
            <Phone className="w-3 h-3" />
            <span>24/7 Support</span>
          </Link>
          <span className="text-slate-600">|</span>
          <Link href="/policies/shipping" className="hover:text-white transition">
            Track Order
          </Link>
          <span className="text-slate-600">|</span>

          {/* Quick Demo Mode Switcher for Reviewers & QA */}
          <div className="flex items-center gap-1.5 bg-slate-800/80 px-2 py-0.5 rounded-full border border-slate-700">
            <UserCheck className="w-3 h-3 text-emerald-400" />
            <span className="text-slate-300">Mode:</span>
            <button
              onClick={() => switchDemoRole?.(role === "admin" ? "customer" : "admin")}
              className="font-semibold text-brand-blue hover:text-blue-300 underline cursor-pointer"
              title="Click to toggle between Customer and Admin view"
            >
              {role.toUpperCase()}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
