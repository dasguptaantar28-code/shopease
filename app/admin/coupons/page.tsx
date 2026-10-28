"use client";

import React, { useState } from "react";
import { Plus, Tag, Trash2, CheckCircle2, Copy } from "lucide-react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { DEMO_COUPONS } from "@/lib/store/demo-data";
import { Coupon, DiscountType } from "@/lib/types";
import { formatPrice } from "@/lib/formatters";
import { useToast } from "@/lib/store/toast-context";

export default function AdminCouponsPage() {
  const { toast } = useToast();
  const [coupons, setCoupons] = useState<Coupon[]>([...DEMO_COUPONS]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [code, setCode] = useState("");
  const [discountType, setDiscountType] = useState<DiscountType>("percentage");
  const [discountValue, setDiscountValue] = useState("15");
  const [minOrderDollars, setMinOrderDollars] = useState("30");

  const handleCreateCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    const val = parseFloat(discountValue);
    const minCents = Math.round(parseFloat(minOrderDollars || "0") * 100);

    const newCoupon: Coupon = {
      id: `coup-${Date.now()}`,
      code: code.trim().toUpperCase(),
      discount_type: discountType,
      discount_value: discountType === "percentage" ? val : Math.round(val * 100),
      min_order_cents: minCents,
      times_used: 0,
      is_active: true,
    };

    setCoupons([newCoupon, ...coupons]);
    setIsModalOpen(false);
    setCode("");
    toast({
      title: "Coupon created",
      description: `Promo code "${newCoupon.code}" is now active.`,
      type: "success",
    });
  };

  const handleToggleActive = (id: string) => {
    setCoupons((prev) =>
      prev.map((c) => (c.id === id ? { ...c, is_active: !c.is_active } : c))
    );
    toast({ title: "Coupon status toggled", type: "info" });
  };

  const handleDelete = (id: string, cCode: string) => {
    if (confirm(`Delete coupon code "${cCode}"?`)) {
      setCoupons(coupons.filter((c) => c.id !== id));
      toast({ title: "Coupon deleted", type: "info" });
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-black text-[#0B1739]">Coupons & Discounts</h1>
            <p className="text-xs text-slate-500 mt-0.5">
              Create promotional discount vouchers, set minimum order rules, and track usage
            </p>
          </div>

          <button
            onClick={() => setIsModalOpen(true)}
            className="inline-flex items-center gap-1.5 bg-[#1677FF] hover:bg-blue-600 text-white font-bold text-xs px-4 py-2.5 rounded-xl shadow-xs transition"
          >
            <Plus className="w-4 h-4" />
            <span>Create Coupon</span>
          </button>
        </div>

        {/* Coupons Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {coupons.map((c) => (
            <div
              key={c.id}
              className={`bg-white rounded-3xl border p-5 shadow-xs flex flex-col justify-between space-y-4 transition ${
                c.is_active ? "border-slate-100" : "border-slate-200 opacity-60 bg-slate-50/50"
              }`}
            >
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-black text-base text-[#0B1739] tracking-wider">
                      {c.code}
                    </span>
                    <button
                      onClick={() => {
                        navigator.clipboard?.writeText(c.code);
                        toast({ title: `Copied ${c.code}`, type: "info" });
                      }}
                      className="text-slate-400 hover:text-slate-600 p-1"
                      title="Copy code"
                    >
                      <Copy className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <p className="text-xs font-bold text-[#1677FF] mt-1">
                    {c.discount_type === "percentage"
                      ? `${c.discount_value}% OFF`
                      : `${formatPrice(c.discount_value)} OFF`}
                  </p>
                </div>

                <button
                  onClick={() => handleToggleActive(c.id)}
                  className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase transition ${
                    c.is_active
                      ? "bg-emerald-50 text-emerald-700"
                      : "bg-slate-200 text-slate-600"
                  }`}
                >
                  {c.is_active ? "Active" : "Inactive"}
                </button>
              </div>

              <div className="text-xs text-slate-500 space-y-1 border-t border-slate-100 pt-3">
                <p>
                  Min. Order: <strong>{formatPrice(c.min_order_cents)}</strong>
                </p>
                <p>
                  Times Redeemed: <strong>{c.times_used || 0}</strong>
                </p>
              </div>

              <div className="pt-2 flex justify-end">
                <button
                  onClick={() => handleDelete(c.id, c.code)}
                  className="text-xs text-slate-400 hover:text-rose-600 p-1 flex items-center gap-1"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Remove</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl space-y-4 animate-fade-in">
            <h3 className="font-bold text-base text-[#0B1739]">Create Promo Discount Code</h3>
            <form onSubmit={handleCreateCoupon} className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Coupon Code *</label>
                <input
                  type="text"
                  required
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  placeholder="e.g. FLASH25"
                  className="w-full border border-slate-200 rounded-xl p-2.5 font-mono uppercase font-bold focus:outline-none focus:ring-2 focus:ring-[#1677FF]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Discount Type</label>
                  <select
                    value={discountType}
                    onChange={(e) => setDiscountType(e.target.value as DiscountType)}
                    className="w-full border border-slate-200 rounded-xl p-2.5 bg-white font-medium"
                  >
                    <option value="percentage">Percentage (%)</option>
                    <option value="fixed">Fixed Dollar ($)</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Value {discountType === "percentage" ? "(%)" : "($)"} *
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    required
                    value={discountValue}
                    onChange={(e) => setDiscountValue(e.target.value)}
                    placeholder="15"
                    className="w-full border border-slate-200 rounded-xl p-2.5"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Minimum Order ($ USD)</label>
                <input
                  type="number"
                  step="0.01"
                  required
                  value={minOrderDollars}
                  onChange={(e) => setMinOrderDollars(e.target.value)}
                  placeholder="30.00"
                  className="w-full border border-slate-200 rounded-xl p-2.5"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 text-slate-600 rounded-xl hover:bg-slate-100 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#1677FF] hover:bg-blue-600 text-white font-bold rounded-xl shadow-xs"
                >
                  Create Code
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}
