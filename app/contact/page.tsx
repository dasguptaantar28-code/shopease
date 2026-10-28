"use client";

import React, { useState } from "react";
import { Mail, Phone, MapPin, Clock, Send, CheckCircle2 } from "lucide-react";
import { useToast } from "@/lib/store/toast-context";

export default function ContactPage() {
  const { toast } = useToast();
  const [submitted, setSubmitted] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    toast({
      title: "Inquiry Sent!",
      description: "Our support specialists will reply to your email within 24 hours.",
      type: "success",
    });
  };

  return (
    <div className="py-10 max-w-4xl mx-auto space-y-10">
      <div className="text-center space-y-3">
        <h1 className="text-3xl font-black text-[#0B1739]">Contact Support</h1>
        <p className="text-xs sm:text-sm text-slate-500 max-w-md mx-auto">
          Have a question about an order, shipping status, or product details? We are here to help.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
        {/* Contact Info */}
        <div className="md:col-span-5 bg-white p-6 rounded-3xl border border-slate-100 shadow-xs space-y-6">
          <h2 className="text-base font-bold text-[#0B1739]">Store Contact Details</h2>

          <div className="space-y-4 text-xs">
            <div className="flex items-start gap-3 text-slate-600">
              <Mail className="w-4 h-4 text-[#1677FF] shrink-0 mt-0.5" />
              <div>
                <p className="font-bold text-slate-800">Email Address</p>
                <p>support@shopease.store</p>
              </div>
            </div>

            <div className="flex items-start gap-3 text-slate-600">
              <Phone className="w-4 h-4 text-[#1677FF] shrink-0 mt-0.5" />
              <div>
                <p className="font-bold text-slate-800">Customer Helpline</p>
                <p>+1 (800) 555-EASE (Mon - Sat, 9am - 6pm EST)</p>
              </div>
            </div>

            <div className="flex items-start gap-3 text-slate-600">
              <MapPin className="w-4 h-4 text-[#1677FF] shrink-0 mt-0.5" />
              <div>
                <p className="font-bold text-slate-800">Fulfillment Hub</p>
                <p>ShopEase Headquarters, 100 Commerce Way, San Francisco, CA 94105</p>
              </div>
            </div>

            <div className="flex items-start gap-3 text-slate-600">
              <Clock className="w-4 h-4 text-[#1677FF] shrink-0 mt-0.5" />
              <div>
                <p className="font-bold text-slate-800">Response Speed</p>
                <p>Average response time &lt; 2 hours during active business hours</p>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="md:col-span-7 bg-white p-6 sm:p-8 rounded-3xl border border-slate-100 shadow-xs">
          {submitted ? (
            <div className="text-center py-12 space-y-3">
              <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-base text-[#0B1739]">Message Received!</h3>
              <p className="text-xs text-slate-500 max-w-xs mx-auto">
                Thank you for reaching out, {name}. A ticket has been logged and we will respond to {email} shortly.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="text-xs text-[#1677FF] font-bold hover:underline"
              >
                Send another message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Your Name *</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Alex Taylor"
                    className="w-full border border-slate-200 rounded-xl p-2.5 focus:outline-none focus:ring-2 focus:ring-[#1677FF]"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Email Address *</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="alex@example.com"
                    className="w-full border border-slate-200 rounded-xl p-2.5 focus:outline-none focus:ring-2 focus:ring-[#1677FF]"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Subject</label>
                <input
                  type="text"
                  required
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  placeholder="Order inquiry, product question, or feedback"
                  className="w-full border border-slate-200 rounded-xl p-2.5 focus:outline-none focus:ring-2 focus:ring-[#1677FF]"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Message *</label>
                <textarea
                  rows={4}
                  required
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Provide any details such as order number or item name..."
                  className="w-full border border-slate-200 rounded-xl p-2.5 focus:outline-none focus:ring-2 focus:ring-[#1677FF]"
                />
              </div>

              <button
                type="submit"
                className="inline-flex items-center gap-2 bg-[#1677FF] hover:bg-blue-600 text-white font-bold text-xs px-6 py-3 rounded-xl transition shadow-xs"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Send Message</span>
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
