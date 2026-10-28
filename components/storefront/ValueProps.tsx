import React from "react";
import { ShoppingBag, ShieldCheck, Truck, Headphones } from "lucide-react";

export function ValueProps() {
  const features = [
    {
      icon: ShoppingBag,
      title: "Wide Range",
      description: "Thousands of products in one place",
      color: "bg-blue-50 text-[#1677FF] border-blue-200",
    },
    {
      icon: ShieldCheck,
      title: "Secure Payment",
      description: "100% safe & trusted transactions",
      color: "bg-blue-50 text-[#1677FF] border-blue-200",
    },
    {
      icon: Truck,
      title: "Fast Delivery",
      description: "Get your orders at your doorstep",
      color: "bg-blue-50 text-[#1677FF] border-blue-200",
    },
    {
      icon: Headphones,
      title: "24/7 Support",
      description: "We're always here to help you",
      color: "bg-blue-50 text-[#1677FF] border-blue-200",
    },
  ];

  return (
    <section className="my-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {features.map((f, i) => {
          const Icon = f.icon;
          return (
            <div
              key={i}
              className="flex items-center gap-4 p-4 rounded-2xl bg-white border border-slate-100 shadow-xs hover:shadow-md transition-all duration-200"
            >
              <div
                className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 border ${f.color}`}
              >
                <Icon className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-bold text-sm text-[#0B1739]">{f.title}</h4>
                <p className="text-xs text-slate-500 mt-0.5 leading-snug">{f.description}</p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
