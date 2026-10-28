import React from "react";
import Link from "next/link";
import { RotateCcw, ShieldCheck, CheckCircle2 } from "lucide-react";

export default function ReturnsPolicyPage() {
  return (
    <div className="py-10 max-w-3xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-black text-[#0B1739]">Returns & Refunds Policy</h1>
        <p className="text-xs text-slate-500 mt-1">Last updated: October 2026</p>
      </div>

      <div className="bg-amber-50 border border-amber-200 p-4 rounded-2xl text-xs text-amber-800">
        <p className="font-bold">Notice to Store Administrators:</p>
        <p className="mt-0.5">
          This policy template is provided for application completeness. Please consult qualified legal counsel
          before deploying for commercial retail in your specific jurisdiction.
        </p>
      </div>

      <div className="prose prose-slate max-w-none text-xs sm:text-sm text-slate-600 space-y-6 leading-relaxed bg-white p-6 sm:p-8 rounded-3xl border border-slate-100 shadow-xs">
        <section className="space-y-2">
          <h2 className="text-base font-bold text-[#0B1739]">1. 30-Day Return Window</h2>
          <p>
            Customers have 30 calendar days from the date of delivery receipt to request a return.
            Returned merchandise must be in original unworn, unopened condition with all tags and
            protective packaging intact.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-[#0B1739]">2. Return Initiation Process</h2>
          <p>
            To initiate a return, visit your <Link href="/account/orders" className="text-[#1677FF] font-semibold">Account Orders</Link> page
            or contact <Link href="/contact" className="text-[#1677FF] font-semibold">Support</Link> with your order number
            and reason for return.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-[#0B1739]">3. Inspection & Refund Timeline</h2>
          <p>
            Once our warehouse receives the returned item, an inspection is performed within 48 hours.
            Approved refunds are remitted to your original payment method within 3 to 5 business days.
          </p>
        </section>
      </div>
    </div>
  );
}
