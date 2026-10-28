"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Plus, Search, Edit, Trash2, Eye, Tag, Sparkles } from "lucide-react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { DEMO_PRODUCTS, DEMO_CATEGORIES } from "@/lib/store/demo-data";
import { Product } from "@/lib/types";
import { formatPrice } from "@/lib/formatters";
import { useToast } from "@/lib/store/toast-context";

export default function AdminProductsPage() {
  const { toast } = useToast();
  const [products, setProducts] = useState<Product[]>([...DEMO_PRODUCTS]);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const filteredProducts = products.filter((p) => {
    if (selectedCategory !== "all" && p.category?.slug !== selectedCategory && p.category_id !== selectedCategory) {
      return false;
    }
    if (search.trim()) {
      const q = search.toLowerCase();
      return p.name.toLowerCase().includes(q) || p.sku.toLowerCase().includes(q);
    }
    return true;
  });

  const handleDeleteProduct = (id: string, name: string) => {
    if (confirm(`Are you sure you want to archive or delete "${name}"?`)) {
      setProducts(products.filter((p) => p.id !== id));
      toast({
        title: "Product removed",
        description: `"${name}" has been safely archived.`,
        type: "info",
      });
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-black text-[#0B1739]">Product Catalog</h1>
            <p className="text-xs text-slate-500 mt-0.5">
              Manage inventory, pricing, variants, and product images
            </p>
          </div>

          <Link
            href="/admin/products/new"
            className="inline-flex items-center gap-1.5 bg-[#1677FF] hover:bg-blue-600 text-white font-bold text-xs px-4 py-2.5 rounded-xl shadow-xs transition"
          >
            <Plus className="w-4 h-4" />
            <span>Add New Product</span>
          </Link>
        </div>

        {/* Filter / Search Bar */}
        <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-xs flex flex-col sm:flex-row gap-3 items-center justify-between">
          <div className="relative w-full sm:max-w-xs">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by name or SKU..."
              className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-[#1677FF]"
            />
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold text-slate-700 focus:outline-none focus:ring-2 focus:ring-[#1677FF]"
            >
              <option value="all">All Categories</option>
              {DEMO_CATEGORIES.map((c) => (
                <option key={c.id} value={c.slug}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Products Table */}
        <div className="bg-white rounded-3xl border border-slate-100 shadow-xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-500 font-bold uppercase tracking-wider text-[10px] border-b border-slate-100">
                <tr>
                  <th className="py-3 px-4">Product</th>
                  <th className="py-3 px-4">SKU</th>
                  <th className="py-3 px-4">Category</th>
                  <th className="py-3 px-4">Price</th>
                  <th className="py-3 px-4">Stock</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredProducts.map((p) => (
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
                          <p className="font-bold text-[#0B1739] line-clamp-1">{p.name}</p>
                          {p.is_featured && (
                            <span className="inline-flex items-center gap-1 text-[10px] text-amber-600 font-bold">
                              <Sparkles className="w-3 h-3" />
                              <span>Featured</span>
                            </span>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4 font-mono text-slate-600">{p.sku}</td>
                    <td className="py-3 px-4 text-slate-600">{p.category?.name || "General"}</td>
                    <td className="py-3 px-4 font-black text-[#0B1739]">
                      {formatPrice(p.price_in_cents)}
                    </td>
                    <td className="py-3 px-4">
                      <span
                        className={`font-bold ${
                          p.stock_quantity <= 10 ? "text-amber-600 font-black" : "text-slate-700"
                        }`}
                      >
                        {p.stock_quantity} units
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <span className="bg-emerald-50 text-emerald-700 font-bold px-2 py-0.5 rounded-full text-[10px] uppercase">
                        Published
                      </span>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <Link
                          href={`/product/${p.slug}`}
                          target="_blank"
                          className="p-1.5 text-slate-400 hover:text-[#1677FF] rounded"
                          title="View on store"
                        >
                          <Eye className="w-4 h-4" />
                        </Link>
                        <button
                          onClick={() => handleDeleteProduct(p.id, p.name)}
                          className="p-1.5 text-slate-400 hover:text-rose-600 rounded"
                          title="Archive / Delete"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
