"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Logo } from "@/components/brand/Logo";
import { Mail, ArrowRight, ShieldCheck, HeartHandshake, CheckCircle2 } from "lucide-react";
import { useToast } from "@/lib/store/toast-context";

export function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const { toast } = useToast();

  const handleNewsletter = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes("@")) {
      toast({ title: "Please enter a valid email", type: "error" });
      return;
    }
    setSubscribed(true);
    toast({
      title: "Subscribed to ShopEase newsletter!",
      description: "Welcome gift: Use code WELCOME10 on your first order.",
      type: "success",
    });
    setEmail("");
  };

  return (
    <footer className="bg-[#0B1739] text-white pt-14 pb-20 md:pb-8 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top 4 Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 pb-12 border-b border-slate-800/80">
          {/* Col 1: Brand & Bio (Spans 2 cols on lg) */}
          <div className="lg:col-span-2 space-y-4">
            <div className="bg-white p-2.5 rounded-xl inline-block shadow-sm">
              <Logo size="sm" />
            </div>
            <p className="text-slate-400 text-xs sm:text-sm leading-relaxed max-w-sm">
              ShopEase is your one-stop online shopping destination. Curating premium electronics,
              modern fashion, home essentials, and lifestyle accessories at unbeatable prices.
            </p>
            <div className="flex items-center gap-3 text-xs text-slate-400 pt-1">
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>SSL Encrypted Checkout</span>
              </span>
              <span>•</span>
              <span className="flex items-center gap-1.5">
                <HeartHandshake className="w-4 h-4 text-[#1677FF]" />
                <span>30-Day Returns</span>
              </span>
            </div>
          </div>

          {/* Col 2: Categories */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4">
              Categories
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li>
                <Link href="/shop?category=electronics" className="hover:text-white transition">
                  Electronics
                </Link>
              </li>
              <li>
                <Link href="/shop?category=fashion" className="hover:text-white transition">
                  Fashion & Apparel
                </Link>
              </li>
              <li>
                <Link href="/shop?category=home-and-living" className="hover:text-white transition">
                  Home & Living
                </Link>
              </li>
              <li>
                <Link href="/shop?category=beauty-and-health" className="hover:text-white transition">
                  Beauty & Health
                </Link>
              </li>
              <li>
                <Link href="/shop?category=sports" className="hover:text-white transition">
                  Sports & Outdoors
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Customer Care & Info */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4">
              Customer Care
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li>
                <Link href="/about" className="hover:text-white transition">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white transition">
                  Contact Support
                </Link>
              </li>
              <li>
                <Link href="/faq" className="hover:text-white transition">
                  Help & FAQs
                </Link>
              </li>
              <li>
                <Link href="/policies/shipping" className="hover:text-white transition">
                  Shipping Policy
                </Link>
              </li>
              <li>
                <Link href="/policies/returns" className="hover:text-white transition">
                  Returns & Refunds
                </Link>
              </li>
              <li>
                <Link href="/policies/privacy" className="hover:text-white transition">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/policies/terms" className="hover:text-white transition">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Newsletter */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4">
              Stay in the Loop
            </h4>
            <p className="text-xs text-slate-400 mb-3 leading-relaxed">
              Subscribe for exclusive flash sales, new product drops, and insider discount coupons.
            </p>
            {subscribed ? (
              <div className="flex items-center gap-2 text-emerald-400 bg-emerald-950/50 border border-emerald-800 p-3 rounded-xl text-xs">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                <span>You&apos;re subscribed! Check your inbox soon.</span>
              </div>
            ) : (
              <form onSubmit={handleNewsletter} className="space-y-2">
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="w-full bg-slate-900 border border-slate-700 text-xs rounded-xl pl-9 pr-3 py-2.5 text-white placeholder-slate-500 focus:outline-none focus:border-[#1677FF]"
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-[#1677FF] hover:bg-blue-600 text-white font-bold text-xs py-2.5 rounded-xl transition flex items-center justify-center gap-1.5"
                >
                  <span>Subscribe</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Tech Stack Showcase Banner - Matching Mockup */}
        <div className="py-6 border-b border-slate-800/80 flex flex-wrap items-center justify-between gap-4 text-xs text-slate-300">
          <div className="flex items-center gap-2 font-bold text-white text-xs uppercase tracking-wider">
            <span>Built With</span>
          </div>

          <div className="flex flex-wrap items-center gap-6 text-xs text-slate-400">
            {/* Antigravity */}
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 rounded-md bg-purple-600/30 text-purple-400 border border-purple-500/30 flex items-center justify-center font-black text-[10px]">
                ✦
              </div>
              <div>
                <p className="font-semibold text-white leading-tight">Antigravity</p>
                <p className="text-[10px] text-slate-400">AI IDE for faster development</p>
              </div>
            </div>

            {/* Supabase */}
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 rounded-md bg-emerald-600/30 text-emerald-400 border border-emerald-500/30 flex items-center justify-center font-black text-[10px]">
                ⚡
              </div>
              <div>
                <p className="font-semibold text-white leading-tight">Supabase</p>
                <p className="text-[10px] text-slate-400">PostgreSQL, Auth & Storage</p>
              </div>
            </div>

            {/* Vercel */}
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 rounded-md bg-slate-800 text-white border border-slate-700 flex items-center justify-center font-black text-[10px]">
                ▲
              </div>
              <div>
                <p className="font-semibold text-white leading-tight">Vercel</p>
                <p className="text-[10px] text-slate-400">Fast & reliable hosting</p>
              </div>
            </div>

            {/* GitHub */}
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 rounded-md bg-slate-800 text-white border border-slate-700 flex items-center justify-center font-black text-[10px]">
                🐙
              </div>
              <div>
                <p className="font-semibold text-white leading-tight">GitHub</p>
                <p className="text-[10px] text-slate-400">Version control & CI/CD</p>
              </div>
            </div>
          </div>

          <Link
            href="/shop"
            className="inline-flex items-center gap-1.5 bg-[#1677FF] hover:bg-blue-600 text-white font-bold text-xs px-4 py-2 rounded-xl transition"
          >
            <span>Start Shopping</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Bottom Copyright & Disclaimer */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-500 gap-2">
          <p>© 2026 ShopEase Inc. All rights reserved. Shop More • Live Better.</p>
          <div className="flex items-center gap-4">
            <Link href="/policies/privacy" className="hover:text-slate-400">
              Privacy
            </Link>
            <span>•</span>
            <Link href="/policies/terms" className="hover:text-slate-400">
              Terms
            </Link>
            <span>•</span>
            <Link href="/policies/shipping" className="hover:text-slate-400">
              Shipping
            </Link>
            <span>•</span>
            <Link href="/admin" className="hover:text-brand-blue font-semibold">
              Admin Portal
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
