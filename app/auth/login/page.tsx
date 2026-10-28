"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Mail, Lock, ArrowRight, ShieldCheck, UserCheck } from "lucide-react";
import { Logo } from "@/components/brand/Logo";
import { useAuth } from "@/lib/store/auth-context";

export default function LoginPage() {
  const router = useRouter();
  const { login, isLoading } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await login(email, password);
    if (res.success) {
      if (email.toLowerCase().includes("admin")) {
        router.push("/admin");
      } else {
        router.push("/account");
      }
    }
  };

  const handleQuickDemo = (demoType: "customer" | "admin") => {
    if (demoType === "admin") {
      setEmail("admin@shopease.store");
      setPassword("AdminPass123!");
    } else {
      setEmail("shopper@shopease.store");
      setPassword("ShopperPass123!");
    }
  };

  return (
    <div className="py-12 max-w-md mx-auto">
      <div className="bg-white rounded-3xl border border-slate-100 p-8 shadow-xs space-y-6">
        <div className="text-center space-y-2">
          <div className="inline-block mb-1">
            <Logo size="md" />
          </div>
          <h1 className="text-2xl font-black text-[#0B1739]">Welcome Back</h1>
          <p className="text-xs text-slate-500">Sign in to your ShopEase account</p>
        </div>

        {/* Quick Demo Credentials helper buttons */}
        <div className="bg-blue-50/70 border border-blue-100 p-3.5 rounded-2xl text-xs space-y-2">
          <p className="font-bold text-blue-900 flex items-center gap-1.5">
            <UserCheck className="w-4 h-4 text-[#1677FF]" />
            <span>Reviewer / QA Quick-Fill:</span>
          </p>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => handleQuickDemo("customer")}
              className="flex-1 bg-white hover:bg-blue-100 text-blue-700 font-semibold py-1.5 px-2.5 rounded-xl border border-blue-200 transition text-center"
            >
              Customer Demo
            </button>
            <button
              type="button"
              onClick={() => handleQuickDemo("admin")}
              className="flex-1 bg-white hover:bg-blue-100 text-[#0B1739] font-bold py-1.5 px-2.5 rounded-xl border border-blue-200 transition text-center"
            >
              Admin Demo
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div>
            <label className="block font-semibold text-slate-700 mb-1">Email Address</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full border border-slate-200 rounded-xl pl-9 pr-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-[#1677FF]"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="font-semibold text-slate-700">Password</label>
              <Link href="/auth/forgot-password" className="text-[#1677FF] hover:underline">
                Forgot password?
              </Link>
            </div>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full border border-slate-200 rounded-xl pl-9 pr-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-[#1677FF]"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-[#1677FF] hover:bg-blue-600 disabled:opacity-50 text-white font-bold text-sm py-3 rounded-xl shadow-md transition flex items-center justify-center gap-2"
          >
            {isLoading ? <span>Signing In...</span> : <span>Sign In</span>}
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="text-center text-xs text-slate-500 pt-2 border-t border-slate-100">
          Don&apos;t have an account?{" "}
          <Link href="/auth/register" className="font-bold text-[#1677FF] hover:underline">
            Create an Account
          </Link>
        </div>
      </div>
    </div>
  );
}
