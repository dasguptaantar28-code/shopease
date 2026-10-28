"use client";

import React, { useState } from "react";
import { Boxes, AlertTriangle, Plus, Minus, Search, CheckCircle2 } from "lucide-react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { DEMO_PRODUCTS } from "@/lib/store/demo-data";
import { Product } from "@/lib/types";
import { formatPrice } from "@/lib/formatters";
import { useToast } from "@/lib/store/toast-context";

export default function AdminInventoryPage() {
  const { toast } = useToast();
  const [products, setProducts] = useState<Product[]>([...DEMO_PRODUCTS]);
  const [search, setSearch] = useState("");

  const handleAdjustStock = (productId: string, delta: number) => {
    setProducts((prev) =>
      prev.map((p) => {
        if (p.id === productId) {
          const newQty = Math.max(0, p.stock_quantity + delta);
          return { ...p, stock_quantity: newQty };
        }
        return p;
      })
    );
    toast({ title: "Inventory updated", type: "info" });
  };

  const filtered = products.filter(
    (p) =>
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.sku.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-black text-[#0B1739]">Inventory Management</h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Monitor real-time warehouse stock, replenishment alerts, and quick count adjustments
          </p>
        </div>

        {/* Search */}
        <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-xs max-w-sm">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search product or SKU..."
              className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-[#1677FF]"
            />
          </div>
        </div>

        {/* Inventory List */}
        <div className="bg-white rounded-3xl border border-slate-100 shadow-xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-500 font-bold uppercase tracking-wider text-[10px] border-b border-slate-100">
                <tr>
                  <th className="py-3 px-4">Product Name</th>
                  <th className="py-3 px-4">SKU</th>
                  <th className="py-3 px-4">Retail Price</th>
                  <th className="py-3 px-4">Stock Level</th>
                  <th className="py-3 px-4 text-right">Quick Adjust</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filtered.map((p) => {
                  const isLow = p.stock_quantity <= 15;
                  return (
                    <tr key={p.id} className="hover:bg-slate-50/50 transition">
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-xl bg-slate-100 border border-slate-200 overflow-hidden shrink-0">
                            <img
                              src={p.images?.[0]?.image_url}
                              alt={p.name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div>
                            <p className="font-bold text-[#0B1739]">{p.name}</p>
                            <p className="text-[10px] text-slate-400">{p.category?.name}</p>
                          </div>
                        </div>
                      </td>
                      <td className="py-3 px-4 font-mono text-slate-600">{p.sku}</td>
                      <td className="py-3 px-4 font-bold text-[#0B1739]">
                        {formatPrice(p.price_in_cents)}
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2">
                          <span
                            className={`font-black text-sm ${
                              isLow ? "text-amber-600" : "text-emerald-700"
                            }`}
                          >
                            {p.stock_quantity}
                          </span>
                          {isLow && (
                            <span className="flex items-center gap-1 bg-amber-50 text-amber-700 text-[10px] font-bold px-2 py-0.5 rounded-full">
                              <AlertTriangle className="w-3 h-3" />
                              <span>Low Stock</span>
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="py-3 px-4 text-right">
                        <div className="inline-flex items-center gap-1.5 border border-slate-200 rounded-xl bg-slate-50 p-1">
                          <button
                            onClick={() => handleAdjustStock(p.id, -5)}
                            className="px-2 py-1 text-slate-600 hover:bg-slate-200 rounded-lg text-xs font-bold transition"
                            title="Subtract 5"
                          >
                            -5
                          </button>
                          <button
                            onClick={() => handleAdjustStock(p.id, -1)}
                            className="p-1 text-slate-600 hover:bg-slate-200 rounded-lg transition"
                            title="Subtract 1"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="px-1 text-slate-400 text-[10px]">|</span>
                          <button
                            onClick={() => handleAdjustStock(p.id, 1)}
                            className="p-1 text-slate-600 hover:bg-slate-200 rounded-lg transition"
                            title="Add 1"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                          <button
                            onClick={() => handleAdjustStock(p.id, 10)}
                            className="px-2 py-1 text-slate-600 hover:bg-slate-200 rounded-lg text-xs font-bold transition"
                            title="Add 10"
                          >
                            +10
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
