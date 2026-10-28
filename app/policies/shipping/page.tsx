import React from "react";
import Link from "next/link";
import { Truck, ShieldCheck, Clock, MapPin } from "lucide-react";

export default function ShippingPolicyPage() {
  return (
    <div className="py-10 max-w-3xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-black text-[#0B1739]">Shipping & Delivery Policy</h1>
        <p className="text-xs text-slate-500 mt-1">Last updated: October 2026</p>
      </div>

      <div className="bg-amber-50 border border-amber-200 p-4 rounded-2xl text-xs text-amber-800">
        <p className="font-bold">Template & Customization Notice:</p>
        <p className="mt-0.5">
          These terms represent the default operational guidelines for ShopEase demo storefront.
          Shipping fees, courier options, and threshold values are editable by store owners in{" "}
          <Link href="/admin/settings" className="underline font-bold text-amber-900">
            Admin Settings
          </Link>
          .
        </p>
      </div>

      <div className="prose prose-slate max-w-none text-xs sm:text-sm text-slate-600 space-y-6 leading-relaxed bg-white p-6 sm:p-8 rounded-3xl border border-slate-100 shadow-xs">
        <section className="space-y-2">
          <h2 className="text-base font-bold text-[#0B1739]">1. Processing & Handling Time</h2>
          <p>
            All standard orders placed Monday through Friday are processed within 24 to 48 hours. Orders
            placed on weekends or recognized public holidays are processed the following business day.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-[#0B1739]">2. Shipping Rates & Free Delivery</h2>
          <ul className="list-disc pl-5 space-y-1">
            <li>
              <strong>Standard Domestic Shipping:</strong> $4.99 flat rate for orders under $50.00.
            </li>
            <li>
              <strong>Free Shipping Tier:</strong> Complimentary standard shipping on all orders
              totaling $50.00 or higher (after discounts have been applied).
            </li>
          </ul>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-[#0B1739]">3. Cash on Delivery (COD)</h2>
          <p>
            Cash on Delivery is supported across designated regional zones. When choosing COD, please
            ensure the exact cash total or supported mobile payment is available upon driver delivery.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-[#0B1739]">4. Damaged or Lost Shipments</h2>
          <p>
            If your parcel arrives damaged or fails to deliver within 7 business days of shipment,
            please notify <Link href="/contact" className="text-[#1677FF] font-semibold">Customer Support</Link> immediately
            with your order reference number.
          </p>
        </section>
      </div>
    </div>
  );
}
