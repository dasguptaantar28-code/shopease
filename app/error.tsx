"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { AlertCircle, RotateCcw } from "lucide-react";

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log safe error telemetry without exposing secrets
    console.error("ShopEase Error Boundary caught:", error.message);
  }, [error]);

  return (
    <div className="py-20 text-center max-w-md mx-auto space-y-5">
      <div className="w-16 h-16 bg-rose-50 text-rose-600 rounded-3xl flex items-center justify-center mx-auto shadow-xs">
        <AlertCircle className="w-8 h-8" />
      </div>
      <h1 className="text-2xl font-black text-[#0B1739]">Something went wrong</h1>
      <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
        We encountered a temporary processing issue. Please try refreshing or return to the main store.
      </p>
      <div className="pt-2 flex items-center justify-center gap-3">
        <button
          onClick={() => reset()}
          className="inline-flex items-center gap-2 bg-[#1677FF] hover:bg-blue-600 text-white font-bold text-xs px-5 py-2.5 rounded-xl transition shadow-xs"
        >
          <RotateCcw className="w-4 h-4" />
          <span>Try Again</span>
        </button>
        <Link
          href="/"
          className="inline-flex items-center gap-2 bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 font-bold text-xs px-5 py-2.5 rounded-xl transition"
        >
          Return Home
        </Link>
      </div>
    </div>
  );
}
