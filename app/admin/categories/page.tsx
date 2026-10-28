"use client";

import React, { useState } from "react";
import { Plus, Layers, Trash2, Edit, Check } from "lucide-react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { DEMO_CATEGORIES, DEMO_PRODUCTS } from "@/lib/store/demo-data";
import { Category } from "@/lib/types";
import { slugify } from "@/lib/formatters";
import { useToast } from "@/lib/store/toast-context";

export default function AdminCategoriesPage() {
  const { toast } = useToast();
  const [categories, setCategories] = useState<Category[]>([...DEMO_CATEGORIES]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    const newCat: Category = {
      id: `cat-${Date.now()}`,
      name: name.trim(),
      slug: slugify(name),
      description: description.trim(),
      image_url: imageUrl.trim() || "https://images.unsplash.com/photo-1498049794561-7780e7231661?w=500",
      display_order: categories.length + 1,
      is_active: true,
    };
    setCategories([...categories, newCat]);
    setIsModalOpen(false);
    setName("");
    setDescription("");
    setImageUrl("");
    toast({
      title: "Category Created",
      description: `"${newCat.name}" is now active in the catalog.`,
      type: "success",
    });
  };

  const handleDelete = (id: string, catName: string) => {
    if (confirm(`Remove category "${catName}"?`)) {
      setCategories(categories.filter((c) => c.id !== id));
      toast({ title: "Category removed", type: "info" });
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-black text-[#0B1739]">Store Categories</h1>
            <p className="text-xs text-slate-500 mt-0.5">
              Organize storefront collections, hierarchy, and navigation menus
            </p>
          </div>

          <button
            onClick={() => setIsModalOpen(true)}
            className="inline-flex items-center gap-1.5 bg-[#1677FF] hover:bg-blue-600 text-white font-bold text-xs px-4 py-2.5 rounded-xl shadow-xs transition"
          >
            <Plus className="w-4 h-4" />
            <span>Add New Category</span>
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {categories.map((cat) => {
            const productCount = DEMO_PRODUCTS.filter(
              (p) => p.category?.slug === cat.slug || p.category_id === cat.id
            ).length;

            return (
              <div
                key={cat.id}
                className="bg-white rounded-3xl border border-slate-100 p-5 shadow-xs flex flex-col justify-between space-y-4 hover:border-blue-100 transition"
              >
                <div className="flex items-start gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-slate-50 border border-slate-100 overflow-hidden shrink-0">
                    <img
                      src={cat.image_url || "https://images.unsplash.com/photo-1498049794561-7780e7231661?w=500"}
                      alt={cat.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-sm text-[#0B1739] truncate">{cat.name}</h3>
                    <p className="text-[11px] font-mono text-slate-400">/{cat.slug}</p>
                    <p className="text-xs text-slate-500 line-clamp-2 mt-1">
                      {cat.description || "No description provided."}
                    </p>
                  </div>
                </div>

                <div className="border-t border-slate-100 pt-3 flex items-center justify-between text-xs">
                  <span className="font-semibold text-slate-600">
                    {productCount} {productCount === 1 ? "product" : "products"}
                  </span>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleDelete(cat.id, cat.name)}
                      className="text-slate-400 hover:text-rose-600 p-1"
                      title="Delete category"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Add Category Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl space-y-4 animate-fade-in">
            <h3 className="font-bold text-base text-[#0B1739]">Add Store Category</h3>
            <form onSubmit={handleCreate} className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Category Name *</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Smart Watches"
                  className="w-full border border-slate-200 rounded-xl p-2.5 focus:outline-none focus:ring-2 focus:ring-[#1677FF]"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Description</label>
                <textarea
                  rows={2}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Summary for category page..."
                  className="w-full border border-slate-200 rounded-xl p-2.5 focus:outline-none focus:ring-2 focus:ring-[#1677FF]"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Cover Image URL</label>
                <input
                  type="url"
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  placeholder="https://images.unsplash.com/photo-..."
                  className="w-full border border-slate-200 rounded-xl p-2.5 focus:outline-none focus:ring-2 focus:ring-[#1677FF]"
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
                  Create Category
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}
