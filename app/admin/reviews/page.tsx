"use client";

import React, { useState } from "react";
import { Star, CheckCircle2, XCircle, Trash2, MessageSquare } from "lucide-react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { DEMO_REVIEWS, DEMO_PRODUCTS } from "@/lib/store/demo-data";
import { Review } from "@/lib/types";
import { formatDate } from "@/lib/formatters";
import { useToast } from "@/lib/store/toast-context";

export default function AdminReviewsPage() {
  const { toast } = useToast();
  const [reviews, setReviews] = useState<Review[]>([...DEMO_REVIEWS]);

  const handleToggleApprove = (id: string) => {
    setReviews((prev) =>
      prev.map((r) => (r.id === id ? { ...r, is_approved: !r.is_approved } : r))
    );
    toast({ title: "Review status updated", type: "info" });
  };

  const handleDelete = (id: string) => {
    if (confirm("Delete this review?")) {
      setReviews((prev) => prev.filter((r) => r.id !== id));
      toast({ title: "Review deleted", type: "info" });
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-black text-[#0B1739]">Review Moderation</h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Approve, inspect, and moderate buyer feedback and ratings
          </p>
        </div>

        <div className="space-y-4">
          {reviews.map((r) => {
            const prod = DEMO_PRODUCTS.find((p) => p.id === r.product_id);
            return (
              <div
                key={r.id}
                className="bg-white rounded-3xl border border-slate-100 p-5 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs"
              >
                <div className="space-y-1.5 flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <div className="flex text-amber-400">
                      {[...Array(r.rating)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-current" />
                      ))}
                    </div>
                    <span className="font-bold text-[#0B1739]">{r.title}</span>
                    <span className="text-slate-400 text-[10px]">
                      • {formatDate(r.created_at)}
                    </span>
                  </div>

                  <p className="text-slate-600 italic leading-relaxed">&ldquo;{r.comment}&rdquo;</p>

                  <div className="flex items-center gap-2 text-[11px] text-slate-500 pt-1">
                    <span>By: <strong className="text-slate-700">{r.author_name}</strong></span>
                    <span>•</span>
                    <span>Product: <strong className="text-[#1677FF]">{prod?.name || r.product_id}</strong></span>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0 border-t sm:border-t-0 sm:border-l border-slate-100 pt-3 sm:pt-0 sm:pl-4">
                  <button
                    onClick={() => handleToggleApprove(r.id)}
                    className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-xl font-bold text-xs transition ${
                      r.is_approved
                        ? "bg-emerald-50 text-emerald-700 hover:bg-emerald-100"
                        : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                    }`}
                  >
                    {r.is_approved ? (
                      <>
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>Approved</span>
                      </>
                    ) : (
                      <>
                        <XCircle className="w-3.5 h-3.5" />
                        <span>Pending</span>
                      </>
                    )}
                  </button>

                  <button
                    onClick={() => handleDelete(r.id)}
                    className="p-1.5 text-slate-400 hover:text-rose-600 rounded-lg"
                    title="Delete review"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </AdminLayout>
  );
}
