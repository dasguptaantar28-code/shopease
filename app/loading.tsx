import React from "react";

export default function Loading() {
  return (
    <div className="py-12 space-y-6 animate-pulse">
      <div className="h-44 sm:h-64 bg-slate-200 rounded-3xl w-full" />
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="h-24 bg-slate-200 rounded-2xl" />
        ))}
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-5 gap-4">
        {[1, 2, 3, 4, 5].map((i) => (
          <div key={i} className="h-64 bg-slate-200 rounded-2xl" />
        ))}
      </div>
    </div>
  );
}
