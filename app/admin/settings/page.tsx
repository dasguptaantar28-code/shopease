"use client";

import React, { useState } from "react";
import { Settings, Save, Store, Mail, Phone, DollarSign, Truck } from "lucide-react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { DEFAULT_STORE_SETTINGS } from "@/lib/store/demo-data";
import { StoreSettings } from "@/lib/types";
import { useToast } from "@/lib/store/toast-context";

export default function AdminSettingsPage() {
  const { toast } = useToast();
  const [settings, setSettings] = useState<StoreSettings>({ ...DEFAULT_STORE_SETTINGS });
  const [shippingDollars, setShippingDollars] = useState(
    (DEFAULT_STORE_SETTINGS.standard_shipping_cents / 100).toFixed(2)
  );
  const [freeThresholdDollars, setFreeThresholdDollars] = useState(
    (DEFAULT_STORE_SETTINGS.free_shipping_threshold_cents / 100).toFixed(2)
  );

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSettings({
      ...settings,
      standard_shipping_cents: Math.round(parseFloat(shippingDollars) * 100),
      free_shipping_threshold_cents: Math.round(parseFloat(freeThresholdDollars) * 100),
    });
    toast({
      title: "Store Settings Saved",
      description: "Currency and shipping rules have been updated.",
      type: "success",
    });
  };

  return (
    <AdminLayout>
      <div className="space-y-6 max-w-3xl">
        <div>
          <h1 className="text-2xl font-black text-[#0B1739]">Store Settings</h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Configure currency format, shipping rates, and customer support contact info
          </p>
        </div>

        <form onSubmit={handleSave} className="space-y-6 text-xs">
          {/* Brand Info */}
          <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-xs space-y-4">
            <h2 className="text-sm font-bold text-[#0B1739] flex items-center gap-2">
              <Store className="w-4 h-4 text-[#1677FF]" />
              <span>Brand Identity & Contact</span>
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Store Name</label>
                <input
                  type="text"
                  required
                  value={settings.store_name}
                  onChange={(e) => setSettings({ ...settings, store_name: e.target.value })}
                  className="w-full border border-slate-200 rounded-xl p-2.5 focus:outline-none focus:ring-2 focus:ring-[#1677FF]"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Brand Tagline</label>
                <input
                  type="text"
                  required
                  value={settings.tagline}
                  onChange={(e) => setSettings({ ...settings, tagline: e.target.value })}
                  className="w-full border border-slate-200 rounded-xl p-2.5 focus:outline-none focus:ring-2 focus:ring-[#1677FF]"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Support Email</label>
                <input
                  type="email"
                  required
                  value={settings.support_email}
                  onChange={(e) => setSettings({ ...settings, support_email: e.target.value })}
                  className="w-full border border-slate-200 rounded-xl p-2.5 focus:outline-none focus:ring-2 focus:ring-[#1677FF]"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Support Phone</label>
                <input
                  type="tel"
                  required
                  value={settings.support_phone}
                  onChange={(e) => setSettings({ ...settings, support_phone: e.target.value })}
                  className="w-full border border-slate-200 rounded-xl p-2.5 focus:outline-none focus:ring-2 focus:ring-[#1677FF]"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block font-semibold text-slate-700 mb-1">Physical Fulfillment Address</label>
                <input
                  type="text"
                  required
                  value={settings.address}
                  onChange={(e) => setSettings({ ...settings, address: e.target.value })}
                  className="w-full border border-slate-200 rounded-xl p-2.5 focus:outline-none focus:ring-2 focus:ring-[#1677FF]"
                />
              </div>
            </div>
          </div>

          {/* Currency & Logistics */}
          <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-xs space-y-4">
            <h2 className="text-sm font-bold text-[#0B1739] flex items-center gap-2">
              <DollarSign className="w-4 h-4 text-emerald-600" />
              <span>Currency & Delivery Rates</span>
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Currency Code</label>
                <input
                  type="text"
                  required
                  value={settings.currency}
                  onChange={(e) => setSettings({ ...settings, currency: e.target.value.toUpperCase() })}
                  className="w-full border border-slate-200 rounded-xl p-2.5 font-bold uppercase"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Currency Symbol</label>
                <input
                  type="text"
                  required
                  value={settings.currency_symbol}
                  onChange={(e) => setSettings({ ...settings, currency_symbol: e.target.value })}
                  className="w-full border border-slate-200 rounded-xl p-2.5 font-bold"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Standard Shipping Fee ($)</label>
                <input
                  type="number"
                  step="0.01"
                  required
                  value={shippingDollars}
                  onChange={(e) => setShippingDollars(e.target.value)}
                  className="w-full border border-slate-200 rounded-xl p-2.5"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Free Shipping Threshold ($)</label>
                <input
                  type="number"
                  step="0.01"
                  required
                  value={freeThresholdDollars}
                  onChange={(e) => setFreeThresholdDollars(e.target.value)}
                  className="w-full border border-slate-200 rounded-xl p-2.5"
                />
              </div>
            </div>
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              className="inline-flex items-center gap-2 bg-[#1677FF] hover:bg-blue-600 text-white font-bold text-xs px-6 py-3 rounded-xl shadow-xs transition"
            >
              <Save className="w-4 h-4" />
              <span>Save Settings</span>
            </button>
          </div>
        </form>
      </div>
    </AdminLayout>
  );
}
