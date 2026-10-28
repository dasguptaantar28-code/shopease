import React from "react";
import Link from "next/link";
import { ArrowRight, Sparkles, Flame, Tag } from "lucide-react";
import { HeroBanner } from "@/components/storefront/HeroBanner";
import { ValueProps } from "@/components/storefront/ValueProps";
import { CategoryGrid } from "@/components/storefront/CategoryGrid";
import { ProductCard } from "@/components/storefront/ProductCard";
import { DealsBanner } from "@/components/storefront/DealsBanner";
import { Testimonials } from "@/components/storefront/Testimonials";
import { getCategories, getProducts } from "@/lib/store/repository";

export default async function HomePage() {
  const categories = await getCategories();
  const { products: featuredProducts } = await getProducts({ featuredOnly: true, limit: 5 });
  const { products: newArrivals } = await getProducts({ limit: 8 });

  return (
    <div className="space-y-4">
      {/* Hero Banner */}
      <HeroBanner />

      {/* 4 Value Propositions: Wide Range, Secure Payment, Fast Delivery, 24/7 Support */}
      <ValueProps />

      {/* Popular Categories Grid */}
      <CategoryGrid categories={categories} />

      {/* Featured Products Section */}
      <section className="my-10">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-blue-50 text-[#1677FF] flex items-center justify-center">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-black text-[#0B1739] tracking-tight">
                Featured Products
              </h2>
              <p className="text-xs text-slate-500">Hand-selected best sellers for you</p>
            </div>
          </div>

          <Link
            href="/shop?featured=true"
            className="group inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[#1677FF] hover:text-blue-700 transition"
          >
            <span>View All</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-5">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Limited Time Deals Callout */}
      <DealsBanner />

      {/* Trending & New Arrivals Section */}
      <section className="my-10">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-orange-50 text-orange-500 flex items-center justify-center">
              <Flame className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-black text-[#0B1739] tracking-tight">
                Trending New Arrivals
              </h2>
              <p className="text-xs text-slate-500">Fresh stock just landed in store</p>
            </div>
          </div>

          <Link
            href="/shop?sort=newest"
            className="group inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[#1677FF] hover:text-blue-700 transition"
          >
            <span>Explore All</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-5">
          {newArrivals.slice(0, 8).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Customer Testimonials & Social Proof */}
      <Testimonials />
    </div>
  );
}
