"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ShieldCheck, Sparkles } from "lucide-react";

export function HeroBanner() {
  return (
    <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-blue-50/90 via-white to-blue-100/60 border border-blue-100/80 shadow-xs my-6">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 py-10 sm:py-16 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Left Copy */}
        <div className="lg:col-span-7 space-y-6 text-left z-10">
          <div className="inline-flex items-center gap-2 bg-blue-100/80 text-[#1677FF] px-3.5 py-1.5 rounded-full text-xs font-bold tracking-wide">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Spring Tech & Lifestyle Drops 2026</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#0B1739] tracking-tight leading-[1.15]">
            Better Products <br />
            <span className="text-[#1677FF] bg-gradient-to-r from-[#1677FF] to-blue-600 bg-clip-text text-transparent">
              For A Brighter You
            </span>
          </h1>

          <p className="text-slate-600 text-sm sm:text-base leading-relaxed max-w-lg">
            Discover top-quality products, unbeatable prices, and a seamless shopping experience.
            Explore authentic electronics, trending apparel, home essentials, and more.
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-2">
            <Link
              href="/shop"
              className="inline-flex items-center gap-2.5 bg-[#1677FF] hover:bg-blue-600 text-white font-bold text-sm px-6 py-3.5 rounded-xl shadow-md hover:shadow-lg transition-all duration-200 transform hover:-translate-y-0.5"
            >
              <span>Shop Now</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <Link
              href="/shop?category=electronics"
              className="inline-flex items-center gap-2 bg-white hover:bg-slate-50 text-[#0B1739] font-bold text-sm px-5 py-3.5 rounded-xl border border-slate-200 transition shadow-xs"
            >
              <span>Explore Electronics</span>
            </Link>
          </div>

          <div className="pt-4 flex items-center gap-6 text-xs text-slate-500 font-medium">
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
              <span>Fast Doorstep Delivery</span>
            </div>
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-[#1677FF]" />
              <span>Safe & Secure Payments</span>
            </div>
          </div>
        </div>

        {/* Right Product Showcase Collage matching the mockup */}
        <div className="lg:col-span-5 relative flex items-center justify-center">
          {/* Decorative soft glowing backdrops */}
          <div className="absolute -inset-4 bg-gradient-to-tr from-blue-400/20 to-indigo-400/20 rounded-full blur-2xl" />

          <div className="relative w-full max-w-md aspect-4/3 rounded-2xl overflow-hidden shadow-lg border border-white/60 bg-white/70 backdrop-blur-xs flex items-center justify-center p-2">
            <img
              src="/shopease-banner-preview.jpg"
              alt="ShopEase Products Showcase"
              className="w-full h-full object-cover rounded-xl"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
