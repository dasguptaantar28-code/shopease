import React from "react";
import Link from "next/link";
import {
  Laptop,
  Shirt,
  Armchair,
  Sparkles,
  Trophy,
  Gamepad2,
  ShoppingBasket,
  BookOpen,
} from "lucide-react";
import { Category } from "@/lib/types";

interface CategoryGridProps {
  categories: Category[];
}

// Icon mapping matching the preview mockup
const ICON_MAP: Record<string, React.ElementType> = {
  electronics: Laptop,
  fashion: Shirt,
  "home-and-living": Armchair,
  "beauty-and-health": Sparkles,
  sports: Trophy,
  "toys-and-games": Gamepad2,
  groceries: ShoppingBasket,
  books: BookOpen,
};

const COLOR_MAP: Record<string, { bg: string; text: string }> = {
  electronics: { bg: "bg-blue-50 hover:bg-blue-100", text: "text-blue-600" },
  fashion: { bg: "bg-indigo-50 hover:bg-indigo-100", text: "text-indigo-600" },
  "home-and-living": { bg: "bg-sky-50 hover:bg-sky-100", text: "text-sky-600" },
  "beauty-and-health": { bg: "bg-pink-50 hover:bg-pink-100", text: "text-pink-600" },
  sports: { bg: "bg-amber-50 hover:bg-amber-100", text: "text-amber-600" },
  "toys-and-games": { bg: "bg-purple-50 hover:bg-purple-100", text: "text-purple-600" },
  groceries: { bg: "bg-emerald-50 hover:bg-emerald-100", text: "text-emerald-600" },
  books: { bg: "bg-teal-50 hover:bg-teal-100", text: "text-teal-600" },
};

export function CategoryGrid({ categories }: CategoryGridProps) {
  return (
    <section className="my-10">
      <div className="flex items-center justify-between mb-5">
        <div>
          <h2 className="text-xl font-bold text-[#0B1739] tracking-tight">Popular Categories</h2>
          <p className="text-xs text-slate-500 mt-0.5">Explore by what you need most</p>
        </div>
        <Link
          href="/shop"
          className="text-xs font-bold text-[#1677FF] hover:text-blue-700 transition"
        >
          View All Categories →
        </Link>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3 sm:gap-4">
        {categories.map((cat) => {
          const Icon = ICON_MAP[cat.slug] || Laptop;
          const colors = COLOR_MAP[cat.slug] || { bg: "bg-slate-50 hover:bg-slate-100", text: "text-slate-600" };

          return (
            <Link
              key={cat.id}
              href={`/shop?category=${cat.slug}`}
              className={`flex flex-col items-center justify-center p-4 rounded-2xl border border-slate-100 text-center transition-all duration-200 transform hover:-translate-y-1 shadow-xs hover:shadow-md ${colors.bg}`}
            >
              <div
                className={`w-12 h-12 rounded-xl flex items-center justify-center mb-2.5 bg-white shadow-xs ${colors.text}`}
              >
                <Icon className="w-6 h-6" />
              </div>
              <span className="text-xs font-bold text-[#0B1739] line-clamp-1">{cat.name}</span>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
