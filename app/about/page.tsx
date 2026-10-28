import React from "react";
import Link from "next/link";
import { ShieldCheck, Truck, Sparkles, HeartHandshake, CheckCircle2, ArrowRight } from "lucide-react";
import { Logo } from "@/components/brand/Logo";

export default function AboutPage() {
  return (
    <div className="py-10 max-w-4xl mx-auto space-y-12">
      {/* Hero */}
      <div className="text-center space-y-4">
        <div className="inline-flex items-center gap-2 bg-blue-50 text-[#1677FF] px-3.5 py-1 rounded-full text-xs font-bold">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Our Story & Mission</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-[#0B1739] tracking-tight">
          Shop More • Live Better
        </h1>
        <p className="text-sm sm:text-base text-slate-600 max-w-2xl mx-auto leading-relaxed">
          ShopEase was founded with a straightforward goal: create a reliable, friction-free online
          retail destination that blends exceptional craftsmanship, verified authentic products,
          and transparent pricing.
        </p>
      </div>

      {/* Pillars */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-xs space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-blue-50 text-[#1677FF] flex items-center justify-center">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <h3 className="font-bold text-base text-[#0B1739]">100% Genuine Authenticity</h3>
          <p className="text-xs text-slate-500 leading-relaxed">
            Every product in our catalog is vetted and backed by official manufacturer warranties.
            No counterfeit or unauthorized inventory.
          </p>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-xs space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-blue-50 text-[#1677FF] flex items-center justify-center">
            <Truck className="w-6 h-6" />
          </div>
          <h3 className="font-bold text-base text-[#0B1739]">Express Doorstep Delivery</h3>
          <p className="text-xs text-slate-500 leading-relaxed">
            With integrated carrier logistics, we ship orders within 24 hours and offer real-time
            tracking updates directly to your inbox.
          </p>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-xs space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-blue-50 text-[#1677FF] flex items-center justify-center">
            <HeartHandshake className="w-6 h-6" />
          </div>
          <h3 className="font-bold text-base text-[#0B1739]">Customer First Guarantee</h3>
          <p className="text-xs text-slate-500 leading-relaxed">
            Enjoy 30 days of risk-free returns, responsive human support, and Cash on Delivery
            flexibility across all our serviceable locations.
          </p>
        </div>
      </div>

      {/* Editable Business Notice */}
      <div className="p-4 rounded-2xl bg-slate-100 border border-slate-200 text-xs text-slate-600 space-y-1">
        <p className="font-bold text-[#0B1739]">Store Administration Note:</p>
        <p>
          Store details, company name, address, and policies can be configured dynamically in the{" "}
          <Link href="/admin/settings" className="text-[#1677FF] underline font-semibold">
            Admin Store Settings
          </Link>
          .
        </p>
      </div>
    </div>
  );
}
