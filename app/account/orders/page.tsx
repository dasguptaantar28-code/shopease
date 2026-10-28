"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Package, ArrowRight, Eye, Clock, CheckCircle2, Truck } from "lucide-react";
import { AccountNav } from "@/components/account/AccountNav";
import { useAuth } from "@/lib/store/auth-context";
import { Order } from "@/lib/types";
import { getOrdersByUser } from "@/lib/store/repository";
import { formatPrice, formatDate } from "@/lib/formatters";

export default function AccountOrdersPage() {
  const { user } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadOrders() {
      if (user?.email) {
        const data = await getOrdersByUser(user.email);
        setOrders(data);
      }
      setLoading(false);
    }
    loadOrders();
  }, [user]);

  return (
    <div className="py-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-4">
          <AccountNav />
        </div>

        <div className="lg:col-span-8 space-y-6">
          <div className="bg-white rounded-3xl border border-slate-100 p-6 sm:p-8 shadow-xs space-y-6">
            <div>
              <h1 className="text-xl sm:text-2xl font-black text-[#0B1739]">Order History</h1>
              <p className="text-xs text-slate-500 mt-0.5">
                Review your current deliveries and past purchases
              </p>
            </div>

            {loading ? (
              <p className="text-xs text-slate-400 py-6 text-center">Loading your orders...</p>
            ) : orders.length === 0 ? (
              <div className="text-center py-12 space-y-3">
                <div className="w-14 h-14 bg-blue-50 text-[#1677FF] rounded-full flex items-center justify-center mx-auto">
                  <Package className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-sm text-[#0B1739]">No orders found</h3>
                <p className="text-xs text-slate-500 max-w-sm mx-auto">
                  You haven&apos;t placed any orders with this email yet.
                </p>
                <Link
                  href="/shop"
                  className="inline-flex items-center gap-1.5 bg-[#1677FF] text-white font-bold text-xs px-4 py-2 rounded-xl"
                >
                  Start Shopping
                </Link>
              </div>
            ) : (
              <div className="space-y-4">
                {orders.map((order) => (
                  <div
                    key={order.id}
                    className="border border-slate-100 rounded-2xl p-5 hover:border-blue-100 transition shadow-xs space-y-4 bg-slate-50/30"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-3 text-xs">
                      <div>
                        <span className="font-bold text-[#0B1739] text-sm">
                          {order.order_number}
                        </span>
                        <span className="text-slate-400 ml-2">Placed on {formatDate(order.created_at)}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span
                          className={`px-2.5 py-0.5 rounded-full font-bold uppercase text-[10px] ${
                            order.fulfillment_status === "delivered"
                              ? "bg-emerald-50 text-emerald-700"
                              : order.fulfillment_status === "shipped"
                              ? "bg-blue-50 text-blue-700"
                              : "bg-amber-50 text-amber-700"
                          }`}
                        >
                          {order.fulfillment_status}
                        </span>
                        <span className="font-extrabold text-[#0B1739] text-sm">
                          {formatPrice(order.total_cents)}
                        </span>
                      </div>
                    </div>

                    {/* Order items snapshot */}
                    <div className="space-y-2">
                      {order.items.map((item) => (
                        <div key={item.id} className="flex items-center justify-between text-xs">
                          <span className="text-slate-700 font-medium">
                            {item.quantity}x {item.product_name}{" "}
                            {item.variant_title ? `(${item.variant_title})` : ""}
                          </span>
                          <span className="text-slate-500">{formatPrice(item.total_cents)}</span>
                        </div>
                      ))}
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-xs">
                      <span className="text-slate-500">
                        Payment: <strong className="capitalize text-slate-700">{order.payment_method === "cod" ? "Cash on Delivery" : "Card"}</strong>
                      </span>
                      <Link
                        href={`/order-success/${order.id}`}
                        className="inline-flex items-center gap-1 text-[#1677FF] font-bold hover:underline"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>View Order Details</span>
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
