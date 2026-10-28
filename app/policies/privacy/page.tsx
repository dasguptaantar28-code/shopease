import React from "react";
import Link from "next/link";
import { ShieldCheck, Lock } from "lucide-react";

export default function PrivacyPolicyPage() {
  return (
    <div className="py-10 max-w-3xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-black text-[#0B1739]">Privacy Policy</h1>
        <p className="text-xs text-slate-500 mt-1">Last updated: October 2026</p>
      </div>

      <div className="bg-amber-50 border border-amber-200 p-4 rounded-2xl text-xs text-amber-800">
        <p className="font-bold">Notice:</p>
        <p className="mt-0.5">
          This document is a starter template. Review with legal advisors to adapt for GDPR, CCPA, or regional data compliance.
        </p>
      </div>

      <div className="prose prose-slate max-w-none text-xs sm:text-sm text-slate-600 space-y-6 leading-relaxed bg-white p-6 sm:p-8 rounded-3xl border border-slate-100 shadow-xs">
        <section className="space-y-2">
          <h2 className="text-base font-bold text-[#0B1739]">1. Information We Collect</h2>
          <p>
            When you register, place orders, or browse ShopEase, we collect necessary contact information
            (name, shipping address, email, phone number) strictly to fulfill transactions and provide order updates.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-[#0B1739]">2. Security & Payment Data</h2>
          <p>
            We never store plaintext passwords or full credit card numbers on our servers. Authentication
            and encrypted database records are managed securely via Supabase and compliant payment gateways.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-[#0B1739]">3. No Sale of Personal Data</h2>
          <p>
            ShopEase does not sell, lease, or monetize customer personal information to third parties.
          </p>
        </section>
      </div>
    </div>
  );
}
