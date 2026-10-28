"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Upload, Check, Sparkles, Image as ImageIcon } from "lucide-react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { DEMO_CATEGORIES, DEMO_PRODUCTS } from "@/lib/store/demo-data";
import { slugify } from "@/lib/formatters";
import { useToast } from "@/lib/store/toast-context";
import { Product } from "@/lib/types";

export default function NewProductPage() {
  const router = useRouter();
  const { toast } = useToast();

  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [sku, setSku] = useState("");
  const [categoryId, setCategoryId] = useState(DEMO_CATEGORIES[0].id);
  const [priceDollars, setPriceDollars] = useState("");
  const [compareAtDollars, setCompareAtDollars] = useState("");
  const [stockQuantity, setStockQuantity] = useState("50");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [isFeatured, setIsFeatured] = useState(false);
  const [isPublished, setIsPublished] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleNameChange = (val: string) => {
    setName(val);
    setSlug(slugify(val));
    if (!sku) {
      setSku(`SE-${Math.random().toString(36).substring(2, 7).toUpperCase()}`);
    }
  };

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const priceCents = Math.round(parseFloat(priceDollars || "0") * 100);
    const compareCents = compareAtDollars
      ? Math.round(parseFloat(compareAtDollars) * 100)
      : null;

    const newProd: Product = {
      id: `prod-${Date.now()}`,
      name: name.trim(),
      slug: slug || slugify(name),
      sku: sku.trim() || `SE-${Date.now().toString().slice(-4)}`,
      category_id: categoryId,
      category: DEMO_CATEGORIES.find((c) => c.id === categoryId),
      price_in_cents: priceCents,
      compare_at_price_in_cents: compareCents,
      stock_quantity: parseInt(stockQuantity || "0", 10),
      description: description.trim(),
      is_featured: isFeatured,
      is_published: isPublished,
      rating: 5.0,
      review_count: 1,
      images: [
        {
          id: `img-${Date.now()}`,
          image_url:
            imageUrl.trim() ||
            "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800",
          alt_text: name,
          display_order: 1,
          is_primary: true,
        },
      ],
      created_at: new Date().toISOString(),
    };

    DEMO_PRODUCTS.unshift(newProd);

    toast({
      title: "Product Created!",
      description: `"${newProd.name}" added to the active catalog.`,
      type: "success",
    });

    setIsSubmitting(false);
    router.push("/admin/products");
  };

  return (
    <AdminLayout>
      <div className="space-y-6 max-w-4xl">
        <div className="flex items-center gap-3">
          <Link
            href="/admin/products"
            className="p-2 rounded-xl bg-white border border-slate-200 text-slate-600 hover:text-black transition"
          >
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <div>
            <h1 className="text-2xl font-black text-[#0B1739]">Create New Product</h1>
            <p className="text-xs text-slate-500 mt-0.5">
              Enter product specification, imagery, SKU, and retail inventory levels
            </p>
          </div>
        </div>

        <form onSubmit={handleCreate} className="space-y-6 text-xs">
          {/* General Information */}
          <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-xs space-y-4">
            <h2 className="text-sm font-bold text-[#0B1739]">General Information</h2>

            <div className="space-y-3">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Product Title *</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => handleNameChange(e.target.value)}
                  placeholder="e.g. Sony WH-1000XM5 Wireless Headphones"
                  className="w-full border border-slate-200 rounded-xl p-2.5 focus:outline-none focus:ring-2 focus:ring-[#1677FF]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">URL Slug</label>
                  <input
                    type="text"
                    required
                    value={slug}
                    onChange={(e) => setSlug(e.target.value)}
                    className="w-full border border-slate-200 rounded-xl p-2.5 font-mono text-slate-600"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">SKU (Stock Keeping Unit) *</label>
                  <input
                    type="text"
                    required
                    value={sku}
                    onChange={(e) => setSku(e.target.value)}
                    placeholder="e.g. SNY-WH1000"
                    className="w-full border border-slate-200 rounded-xl p-2.5 font-mono text-slate-600"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Category *</label>
                <select
                  value={categoryId}
                  onChange={(e) => setCategoryId(e.target.value)}
                  className="w-full border border-slate-200 rounded-xl p-2.5 bg-white font-medium text-slate-800"
                >
                  {DEMO_CATEGORIES.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Full Description *</label>
                <textarea
                  rows={4}
                  required
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Describe features, material quality, specs, and packaging..."
                  className="w-full border border-slate-200 rounded-xl p-2.5 focus:outline-none focus:ring-2 focus:ring-[#1677FF]"
                />
              </div>
            </div>
          </div>

          {/* Pricing & Stock */}
          <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-xs space-y-4">
            <h2 className="text-sm font-bold text-[#0B1739]">Pricing & Inventory</h2>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Selling Price ($ USD) *</label>
                <input
                  type="number"
                  step="0.01"
                  required
                  value={priceDollars}
                  onChange={(e) => setPriceDollars(e.target.value)}
                  placeholder="129.00"
                  className="w-full border border-slate-200 rounded-xl p-2.5 focus:outline-none focus:ring-2 focus:ring-[#1677FF]"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Compare-at Price ($ USD)</label>
                <input
                  type="number"
                  step="0.01"
                  value={compareAtDollars}
                  onChange={(e) => setCompareAtDollars(e.target.value)}
                  placeholder="149.00"
                  className="w-full border border-slate-200 rounded-xl p-2.5"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Stock Quantity *</label>
                <input
                  type="number"
                  required
                  value={stockQuantity}
                  onChange={(e) => setStockQuantity(e.target.value)}
                  placeholder="50"
                  className="w-full border border-slate-200 rounded-xl p-2.5"
                />
              </div>
            </div>
          </div>

          {/* Imagery */}
          <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-xs space-y-4">
            <h2 className="text-sm font-bold text-[#0B1739]">Product Media</h2>
            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                Image URL (or Supabase Storage public path)
              </label>
              <input
                type="url"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                placeholder="https://images.unsplash.com/photo-..."
                className="w-full border border-slate-200 rounded-xl p-2.5 focus:outline-none focus:ring-2 focus:ring-[#1677FF]"
              />
              <p className="text-[10px] text-slate-400 mt-1">
                In Supabase production mode, images upload directly into the `product-images` storage bucket.
              </p>
            </div>
          </div>

          {/* Visibility Flags */}
          <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-xs flex flex-wrap gap-6 items-center">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={isFeatured}
                onChange={(e) => setIsFeatured(e.target.checked)}
                className="rounded accent-[#1677FF]"
              />
              <span className="font-semibold text-slate-700">Feature on Home Page Deals</span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={isPublished}
                onChange={(e) => setIsPublished(e.target.checked)}
                className="rounded accent-[#1677FF]"
              />
              <span className="font-semibold text-slate-700">Published (Visible to Storefront Shoppers)</span>
            </label>
          </div>

          {/* Submit */}
          <div className="flex justify-end gap-3">
            <Link
              href="/admin/products"
              className="px-5 py-2.5 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 font-bold transition"
            >
              Cancel
            </Link>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-6 py-2.5 rounded-xl bg-[#1677FF] hover:bg-blue-600 text-white font-bold shadow-xs transition"
            >
              {isSubmitting ? "Saving..." : "Create Product"}
            </button>
          </div>
        </form>
      </div>
    </AdminLayout>
  );
}
