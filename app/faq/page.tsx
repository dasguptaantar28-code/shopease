"use client";

import React, { useState } from "react";
import { ChevronDown, Search, HelpCircle } from "lucide-react";

interface FAQItem {
  question: string;
  answer: string;
  category: string;
}

const FAQ_DATA: FAQItem[] = [
  {
    category: "Orders & Shipping",
    question: "How long does shipping take?",
    answer:
      "Standard orders are processed within 24 hours. Domestic delivery takes between 2 to 4 business days. Free shipping is automatically applied on all orders exceeding $50.",
  },
  {
    category: "Orders & Shipping",
    question: "Can I pay using Cash on Delivery (COD)?",
    answer:
      "Yes! ShopEase supports Cash on Delivery across supported regional zones. Simply choose 'Cash on Delivery' during checkout, and pay our delivery courier upon arrival.",
  },
  {
    category: "Orders & Shipping",
    question: "How can I track my order status?",
    answer:
      "Once your package is dispatched, we send you an email confirmation with an active carrier tracking number. You can also view live delivery timelines anytime in your Customer Account portal.",
  },
  {
    category: "Returns & Refunds",
    question: "What is your return policy?",
    answer:
      "We offer a 30-day money-back guarantee for items in their original packaging and unused condition. Return shipping labels are generated free of charge for defective items.",
  },
  {
    category: "Returns & Refunds",
    question: "When will I receive my refund?",
    answer:
      "Once our inspection center receives and verifies your returned package, your refund is processed within 3 business days back to your original payment method.",
  },
  {
    category: "Coupons & Discounts",
    question: "How do I apply coupon codes?",
    answer:
      "You can enter promotional discount codes (like WELCOME10 or SAVE20) directly in your cart drawer or on the checkout page. The system calculates the discount instantly.",
  },
  {
    category: "Authenticity & Warranty",
    question: "Are your products 100% genuine?",
    answer:
      "Yes, ShopEase partners directly with verified brand distributors and authorized manufacturers. All products include original serial numbers and official manufacturer warranties.",
  },
];

export default function FAQPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [openIndices, setOpenIndices] = useState<number[]>([0]);

  const toggleIndex = (idx: number) => {
    setOpenIndices((prev) =>
      prev.includes(idx) ? prev.filter((i) => i !== idx) : [...prev, idx]
    );
  };

  const filteredFaqs = FAQ_DATA.filter(
    (faq) =>
      faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="py-10 max-w-3xl mx-auto space-y-8">
      <div className="text-center space-y-3">
        <h1 className="text-3xl font-black text-[#0B1739]">Frequently Asked Questions</h1>
        <p className="text-xs sm:text-sm text-slate-500 max-w-md mx-auto">
          Quick answers to common questions about shipping, payment methods, returns, and warranties.
        </p>
      </div>

      {/* Search Input */}
      <div className="relative">
        <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search questions (e.g. shipping, refund, coupon)..."
          className="w-full bg-white border border-slate-200 rounded-2xl pl-10 pr-4 py-3 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#1677FF] shadow-xs"
        />
      </div>

      {/* FAQ Accordions */}
      <div className="space-y-3">
        {filteredFaqs.length === 0 ? (
          <p className="text-center text-xs text-slate-400 py-8">
            No questions matched your search query. Try searching for different keywords.
          </p>
        ) : (
          filteredFaqs.map((faq, idx) => {
            const isOpen = openIndices.includes(idx);
            return (
              <div
                key={idx}
                className="bg-white rounded-2xl border border-slate-100 shadow-xs overflow-hidden transition"
              >
                <button
                  onClick={() => toggleIndex(idx)}
                  className="w-full flex items-center justify-between p-4 sm:p-5 text-left text-xs sm:text-sm font-bold text-[#0B1739] hover:text-[#1677FF] transition"
                >
                  <span>{faq.question}</span>
                  <ChevronDown
                    className={`w-4 h-4 text-slate-400 transition-transform duration-200 shrink-0 ml-2 ${
                      isOpen ? "rotate-180 text-[#1677FF]" : ""
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="px-4 sm:px-5 pb-5 text-xs text-slate-600 leading-relaxed border-t border-slate-50 pt-2 animate-fade-in">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
