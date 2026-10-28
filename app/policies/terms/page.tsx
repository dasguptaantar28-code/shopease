import React from "react";
import Link from "next/link";

export default function TermsPage() {
  return (
    <div className="py-10 max-w-3xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-black text-[#0B1739]">Terms of Service</h1>
        <p className="text-xs text-slate-500 mt-1">Last updated: October 2026</p>
      </div>

      <div className="bg-amber-50 border border-amber-200 p-4 rounded-2xl text-xs text-amber-800">
        <p className="font-bold">Notice:</p>
        <p className="mt-0.5">
          Standard e-commerce terms template. Review prior to commercial public operation.
        </p>
      </div>

      <div className="prose prose-slate max-w-none text-xs sm:text-sm text-slate-600 space-y-6 leading-relaxed bg-white p-6 sm:p-8 rounded-3xl border border-slate-100 shadow-xs">
        <section className="space-y-2">
          <h2 className="text-base font-bold text-[#0B1739]">1. Agreement to Terms</h2>
          <p>
            By accessing or placing an order through ShopEase, you agree to comply with these terms,
            all applicable consumer regulations, and our posted policies.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-[#0B1739]">2. Pricing & Catalog Accuracy</h2>
          <p>
            We strive to display accurate pricing and stock levels. In the rare event of a pricing or
            inventory typographical error, we reserve the right to cancel or amend unfulfilled orders prior to shipment.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-[#0B1739]">3. User Conduct</h2>
          <p>
            Unauthorized catalog scraping, fraudulent payment attempts, or vulnerability probing will result
            in immediate account termination.
          </p>
        </section>
      </div>
    </div>
  );
}
