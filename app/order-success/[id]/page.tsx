"use client";

import React, { use, useEffect, useState } from "react";
import Link from "next/link";
import {
  CheckCircle2,
  Package,
  Truck,
  Printer,
  ArrowRight,
  Clock,
  MapPin,
  CreditCard,
  Banknote,
} from "lucide-react";
import { Order } from "@/lib/types";
import { getOrderById } from "@/lib/store/repository";
import { formatPrice, formatDateTime } from "@/lib/formatters";

interface OrderSuccessProps {
  params: Promise<{ id: string }>;
}

export default function OrderSuccessPage({ params }: OrderSuccessProps) {
  const resolvedParams = use(params);
  const orderId = resolvedParams.id;

  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadOrder() {
      const data = await getOrderById(orderId);
      setOrder(data);
      setLoading(false);
    }
    loadOrder();
  }, [orderId]);

  if (loading) {
    return (
      <div className="py-20 text-center text-slate-400 text-sm">
        Retrieving order confirmation...
      </div>
    );
  }

  if (!order) {
    return (
      <div className="py-16 text-center max-w-md mx-auto space-y-4">
        <h1 className="text-2xl font-black text-[#0B1739]">Order Not Found</h1>
        <p className="text-xs text-slate-500">We could not locate this order reference.</p>
        <Link
          href="/shop"
          className="inline-flex items-center gap-2 bg-[#1677FF] text-white font-bold text-xs px-6 py-3 rounded-xl"
        >
          Return to Store
        </Link>
      </div>
    );
  }

  return (
    <div className="py-10 max-w-3xl mx-auto space-y-8">
      {/* Top Success Banner */}
      <div className="bg-white rounded-3xl border border-slate-100 p-8 shadow-xs text-center space-y-3">
        <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-2">
          <CheckCircle2 className="w-10 h-10" />
        </div>
        <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full uppercase tracking-wider">
          Order Confirmed
        </span>
        <h1 className="text-2xl sm:text-3xl font-black text-[#0B1739]">Thank You For Your Order!</h1>
        <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto">
          We&apos;ve sent a confirmation email to <strong>{order.customer_email}</strong>. Your items are being prepared for fulfillment.
        </p>
        <div className="pt-2 text-xs text-slate-500">
          Order Reference: <strong className="text-[#0B1739] text-sm">{order.order_number}</strong>
        </div>
      </div>

      {/* Delivery Tracking Timeline */}
      <div className="bg-white rounded-3xl border border-slate-100 p-6 sm:p-8 shadow-xs space-y-6">
        <h2 className="text-base font-bold text-[#0B1739]">Fulfillment Timeline</h2>

        <div className="grid grid-cols-4 gap-2 text-center text-xs">
          <div className="space-y-1.5">
            <div className="w-8 h-8 rounded-full bg-emerald-600 text-white flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-4 h-4" />
            </div>
            <p className="font-bold text-[#0B1739]">Order Placed</p>
            <p className="text-[10px] text-slate-400">Verified</p>
          </div>

          <div className="space-y-1.5">
            <div className="w-8 h-8 rounded-full bg-[#1677FF] text-white flex items-center justify-center mx-auto">
              <Package className="w-4 h-4" />
            </div>
            <p className="font-bold text-[#0B1739]">Processing</p>
            <p className="text-[10px] text-slate-400">Warehouse Prep</p>
          </div>

          <div className="space-y-1.5 opacity-40">
            <div className="w-8 h-8 rounded-full bg-slate-200 text-slate-600 flex items-center justify-center mx-auto">
              <Truck className="w-4 h-4" />
            </div>
            <p className="font-semibold text-slate-600">Shipped</p>
            <p className="text-[10px] text-slate-400">In Transit</p>
          </div>

          <div className="space-y-1.5 opacity-40">
            <div className="w-8 h-8 rounded-full bg-slate-200 text-slate-600 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-4 h-4" />
            </div>
            <p className="font-semibold text-slate-600">Delivered</p>
            <p className="text-[10px] text-slate-400">Doorstep</p>
          </div>
        </div>
      </div>

      {/* Order Items & Breakdown */}
      <div className="bg-white rounded-3xl border border-slate-100 p-6 sm:p-8 shadow-xs space-y-6">
        <h2 className="text-base font-bold text-[#0B1739]">Order Items</h2>

        <div className="divide-y divide-slate-100">
          {order.items.map((item) => (
            <div key={item.id} className="py-3.5 first:pt-0 last:pb-0 flex items-center justify-between text-xs">
              <div className="flex items-center gap-3">
                {item.image_url && (
                  <div className="w-12 h-12 rounded-xl bg-slate-50 border border-slate-100 overflow-hidden shrink-0">
                    <img src={item.image_url} alt={item.product_name} className="w-full h-full object-cover" />
                  </div>
                )}
                <div>
                  <p className="font-bold text-[#0B1739]">{item.product_name}</p>
                  {item.variant_title && (
                    <p className="text-slate-400 text-[11px]">{item.variant_title}</p>
                  )}
                  <p className="text-slate-500">Qty: {item.quantity}</p>
                </div>
              </div>
              <p className="font-bold text-[#0B1739]">{formatPrice(item.total_cents)}</p>
            </div>
          ))}
        </div>

        {/* Pricing Summary */}
        <div className="border-t border-slate-100 pt-4 space-y-2 text-xs text-slate-600">
          <div className="flex justify-between">
            <span>Subtotal</span>
            <span>{formatPrice(order.subtotal_cents)}</span>
          </div>
          {order.discount_cents > 0 && (
            <div className="flex justify-between text-emerald-600 font-semibold">
              <span>Coupon Discount ({order.coupon_code})</span>
              <span>-{formatPrice(order.discount_cents)}</span>
            </div>
          )}
          <div className="flex justify-between">
            <span>Shipping</span>
            <span>{order.shipping_cents === 0 ? "FREE" : formatPrice(order.shipping_cents)}</span>
          </div>
          <div className="flex justify-between">
            <span>Sales Tax (5%)</span>
            <span>{formatPrice(order.tax_cents)}</span>
          </div>
          <div className="flex justify-between border-t border-slate-200 pt-3 text-base font-black text-[#0B1739]">
            <span>Total Paid</span>
            <span className="text-[#1677FF]">{formatPrice(order.total_cents)}</span>
          </div>
        </div>
      </div>

      {/* Shipping & Payment Meta */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="bg-white rounded-2xl border border-slate-100 p-5 text-xs space-y-2 shadow-xs">
          <div className="flex items-center gap-2 font-bold text-[#0B1739]">
            <MapPin className="w-4 h-4 text-[#1677FF]" />
            <span>Shipping Destination</span>
          </div>
          <p className="text-slate-700 font-semibold">{order.shipping_name}</p>
          <p className="text-slate-500">
            {order.shipping_address.line1}
            {order.shipping_address.line2 ? `, ${order.shipping_address.line2}` : ""}
          </p>
          <p className="text-slate-500">
            {order.shipping_address.city}, {order.shipping_address.state}{" "}
            {order.shipping_address.postal_code}
          </p>
          <p className="text-slate-500">{order.customer_phone}</p>
        </div>

        <div className="bg-white rounded-2xl border border-slate-100 p-5 text-xs space-y-2 shadow-xs">
          <div className="flex items-center gap-2 font-bold text-[#0B1739]">
            {order.payment_method === "cod" ? (
              <Banknote className="w-4 h-4 text-emerald-600" />
            ) : (
              <CreditCard className="w-4 h-4 text-[#1677FF]" />
            )}
            <span>Payment Method</span>
          </div>
          <p className="text-slate-700 font-semibold">
            {order.payment_method === "cod" ? "Cash on Delivery (COD)" : "Credit / Debit Card"}
          </p>
          <p className="text-slate-500">
            Status:{" "}
            <span className="font-bold uppercase text-emerald-600">
              {order.payment_status}
            </span>
          </p>
          <p className="text-slate-400 text-[11px] pt-1">
            Order Time: {formatDateTime(order.created_at)}
          </p>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4">
        <button
          onClick={() => window.print()}
          className="inline-flex items-center gap-2 bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 font-bold text-xs px-5 py-3 rounded-xl transition shadow-xs"
        >
          <Printer className="w-4 h-4" />
          <span>Print Receipt</span>
        </button>

        <Link
          href="/shop"
          className="inline-flex items-center gap-2 bg-[#1677FF] hover:bg-blue-600 text-white font-bold text-xs px-6 py-3 rounded-xl shadow-md transition"
        >
          <span>Continue Shopping</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}
