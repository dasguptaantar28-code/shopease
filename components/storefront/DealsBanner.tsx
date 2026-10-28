import React from "react";
import Link from "next/link";
import { Sparkles, ArrowRight, Clock, ShieldCheck } from "lucide-react";

export function DealsBanner() {
  return (
    <section className="my-12 rounded-3xl bg-[#0B1739] text-white p-8 sm:p-12 relative overflow-hidden">
      {/* Background glowing ambient orbs */}
      <div className="absolute -right-20 -bottom-20 w-80 h-80 rounded-full bg-[#1677FF]/20 blur-3xl pointer-events-none" />
      <div className="absolute -left-20 -top-20 w-60 h-60 rounded-full bg-indigo-600/20 blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-3xl space-y-4">
        <div className="inline-flex items-center gap-2 bg-[#1677FF]/20 text-[#1677FF] border border-[#1677FF]/30 px-3 py-1 rounded-full text-xs font-bold">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Limited Time Flash Promotion</span>
        </div>

        <h2 className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tight leading-tight">
          Save Up To 40% On Top Brands & Daily Essentials
        </h2>

        <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-xl">
          Upgrade your workspace, elevate your wardrobe, and grab the season&apos;s most requested
          gadgets with free expedited shipping and official warranty.
        </p>

        <div className="flex flex-wrap items-center gap-4 pt-4">
          <Link
            href="/shop?featured=true"
            className="inline-flex items-center gap-2 bg-[#1677FF] hover:bg-blue-600 text-white font-bold text-sm px-6 py-3.5 rounded-xl shadow-lg transition"
          >
            <span>Claim Discount</span>
            <ArrowRight className="w-4 h-4" />
          </Link>

          <div className="flex items-center gap-2 text-xs text-slate-400 bg-slate-900/60 px-4 py-3 rounded-xl border border-slate-800">
            <Clock className="w-4 h-4 text-amber-400" />
            <span>Use coupon code <strong>SAVE20</strong> at checkout</span>
          </div>
        </div>
      </div>
    </section>
  );
}
