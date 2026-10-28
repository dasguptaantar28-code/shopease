import React from "react";
import { Star, CheckCircle, Quote } from "lucide-react";

export function Testimonials() {
  const reviews = [
    {
      name: "Sophia Martinez",
      role: "Verified Buyer",
      location: "Austin, TX",
      rating: 5,
      comment:
        "ShopEase delivered my iPhone 15 Pro in pristine condition within 48 hours. The checkout was seamless, and the tracking updates were spot-on!",
      product: "iPhone 15 Pro",
    },
    {
      name: "Liam Henderson",
      role: "Verified Buyer",
      location: "Seattle, WA",
      rating: 5,
      comment:
        "The Sony WH-1000XM5 headphones are 100% authentic with active factory warranty. The WELCOME10 coupon gave me a genuine deal.",
      product: "Sony WH-1000XM5",
    },
    {
      name: "Chloe Chen",
      role: "Verified Buyer",
      location: "Chicago, IL",
      rating: 5,
      comment:
        "Customer support answered my shipping inquiry in under 5 minutes. Top-tier shopping experience, crisp UI, and hassle-free returns policy.",
      product: "Ergonomic Office Chair",
    },
  ];

  return (
    <section className="my-14">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-2">
        <div>
          <div className="inline-flex items-center gap-1.5 text-[11px] font-bold text-slate-500 uppercase tracking-wider bg-slate-100 px-2.5 py-1 rounded-full mb-2">
            <span>Customer Experiences</span>
            <span className="text-slate-400 font-normal">• (Demo content until production reviews)</span>
          </div>
          <h2 className="text-2xl font-bold text-[#0B1739] tracking-tight">
            Loved By Over 25,000+ Happy Shoppers
          </h2>
        </div>
        <p className="text-xs text-slate-500 max-w-xs">
          Real feedback from shoppers who experience our fast shipping and guaranteed authenticity.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {reviews.map((r, i) => (
          <div
            key={i}
            className="p-6 rounded-2xl bg-white border border-slate-100 shadow-xs flex flex-col justify-between hover:shadow-md transition"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-1 text-amber-400">
                  {[...Array(r.rating)].map((_, idx) => (
                    <Star key={idx} className="w-4 h-4 fill-current" />
                  ))}
                </div>
                <Quote className="w-6 h-6 text-slate-200" />
              </div>
              <p className="text-slate-700 text-sm leading-relaxed italic mb-4">
                &ldquo;{r.comment}&rdquo;
              </p>
            </div>

            <div className="border-t border-slate-100 pt-4 flex items-center justify-between">
              <div>
                <h4 className="font-bold text-sm text-[#0B1739]">{r.name}</h4>
                <p className="text-[11px] text-slate-500">
                  {r.location} • <span className="text-[#1677FF] font-medium">{r.product}</span>
                </p>
              </div>
              <div className="flex items-center gap-1 text-[11px] font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                <CheckCircle className="w-3 h-3" />
                <span>Verified</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
