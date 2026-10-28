import Link from "next/link";
import { ArrowLeft, Search } from "lucide-react";

export default function NotFound() {
  return (
    <div className="py-20 text-center max-w-md mx-auto space-y-5">
      <div className="w-16 h-16 bg-blue-50 text-[#1677FF] rounded-3xl flex items-center justify-center mx-auto text-2xl font-black">
        404
      </div>
      <h1 className="text-3xl font-black text-[#0B1739]">Page Not Found</h1>
      <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
        We couldn&apos;t find the product or page you are looking for. It may have been moved,
        renamed, or archived.
      </p>
      <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
        <Link
          href="/"
          className="inline-flex items-center gap-2 bg-[#1677FF] hover:bg-blue-600 text-white font-bold text-xs px-6 py-3 rounded-xl shadow-xs transition"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Home</span>
        </Link>
        <Link
          href="/shop"
          className="inline-flex items-center gap-2 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 font-bold text-xs px-6 py-3 rounded-xl transition"
        >
          <Search className="w-4 h-4" />
          <span>Browse Catalog</span>
        </Link>
      </div>
    </div>
  );
}
