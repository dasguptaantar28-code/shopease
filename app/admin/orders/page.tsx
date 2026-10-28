"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  ShoppingBag,
  Search,
  Filter,
  CheckCircle2,
  Truck,
  Eye,
  Clock,
  MapPin,
  ExternalLink,
} from "lucide-react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { getAllOrders, updateOrderStatus } from "@/lib/store/repository";
import { Order, FulfillmentStatus, PaymentStatus } from "@/lib/types";
import { formatPrice, formatDate } from "@/lib/formatters";
import { useToast } from "@/lib/store/toast-context";

export default function AdminOrdersPage() {
  const { toast } = useToast();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  // Selected Order for quick management modal
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [newFulfillment, setNewFulfillment] = useState<FulfillmentStatus>("processing");
  const [newPayment, setNewPayment] = useState<PaymentStatus>("pending");
  const [newTracking, setNewTracking] = useState("");
  const [newCarrier, setNewCarrier] = useState("");

  const loadOrders = async () => {
    const list = await getAllOrders();
    setOrders(list);
    setLoading(false);
  };

  useEffect(() => {
    loadOrders();
  }, []);

  const openOrderManager = (ord: Order) => {
    setSelectedOrder(ord);
    setNewFulfillment(ord.fulfillment_status);
    setNewPayment(ord.payment_status);
    setNewTracking(ord.tracking_number || "");
    setNewCarrier(ord.tracking_carrier || "FedEx Ground");
  };

  const handleSaveStatus = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedOrder) return;

    await updateOrderStatus(selectedOrder.id, {
      fulfillment_status: newFulfillment,
      payment_status: newPayment,
      tracking_number: newTracking.trim() || null,
      tracking_carrier: newCarrier.trim() || null,
    });

    toast({
      title: "Order status updated",
      description: `Order ${selectedOrder.order_number} status set to ${newFulfillment}.`,
      type: "success",
    });

    setSelectedOrder(null);
    loadOrders();
  };

  const filteredOrders = orders.filter((o) => {
    if (statusFilter !== "all" && o.fulfillment_status !== statusFilter) {
      return false;
    }
    if (search.trim()) {
      const q = search.toLowerCase();
      return (
        o.order_number.toLowerCase().includes(q) ||
        o.customer_email.toLowerCase().includes(q) ||
        o.shipping_name.toLowerCase().includes(q)
      );
    }
    return true;
  });

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-black text-[#0B1739]">Orders Management</h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Process incoming purchases, assign tracking numbers, and fulfill orders
          </p>
        </div>

        {/* Filter bar */}
        <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-xs flex flex-col sm:flex-row gap-3 items-center justify-between">
          <div className="relative w-full sm:max-w-xs">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by order #, email, customer..."
              className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-[#1677FF]"
            />
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold text-slate-700 focus:outline-none focus:ring-2 focus:ring-[#1677FF]"
            >
              <option value="all">All Fulfillment States</option>
              <option value="processing">Processing</option>
              <option value="shipped">Shipped</option>
              <option value="delivered">Delivered</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>
        </div>

        {/* Orders Table */}
        <div className="bg-white rounded-3xl border border-slate-100 shadow-xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-500 font-bold uppercase tracking-wider text-[10px] border-b border-slate-100">
                <tr>
                  <th className="py-3 px-4">Order #</th>
                  <th className="py-3 px-4">Customer</th>
                  <th className="py-3 px-4">Date</th>
                  <th className="py-3 px-4">Items</th>
                  <th className="py-3 px-4">Payment</th>
                  <th className="py-3 px-4">Fulfillment</th>
                  <th className="py-3 px-4">Total</th>
                  <th className="py-3 px-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredOrders.map((ord) => (
                  <tr key={ord.id} className="hover:bg-slate-50/50 transition">
                    <td className="py-3 px-4 font-bold text-[#0B1739]">{ord.order_number}</td>
                    <td className="py-3 px-4">
                      <p className="font-semibold text-slate-800">{ord.shipping_name}</p>
                      <p className="text-[10px] text-slate-400">{ord.customer_email}</p>
                    </td>
                    <td className="py-3 px-4 text-slate-500">{formatDate(ord.created_at)}</td>
                    <td className="py-3 px-4 text-slate-600">
                      {ord.items.length} {ord.items.length === 1 ? "item" : "items"}
                    </td>
                    <td className="py-3 px-4">
                      <span
                        className={`px-2 py-0.5 rounded-full font-bold uppercase text-[9px] ${
                          ord.payment_status === "paid"
                            ? "bg-emerald-50 text-emerald-700"
                            : "bg-amber-50 text-amber-700"
                        }`}
                      >
                        {ord.payment_status}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <span
                        className={`px-2 py-0.5 rounded-full font-bold uppercase text-[9px] ${
                          ord.fulfillment_status === "delivered"
                            ? "bg-emerald-50 text-emerald-700"
                            : ord.fulfillment_status === "shipped"
                            ? "bg-blue-50 text-blue-700"
                            : "bg-amber-50 text-amber-700"
                        }`}
                      >
                        {ord.fulfillment_status}
                      </span>
                    </td>
                    <td className="py-3 px-4 font-black text-[#0B1739]">
                      {formatPrice(ord.total_cents)}
                    </td>
                    <td className="py-3 px-4 text-right">
                      <button
                        onClick={() => openOrderManager(ord)}
                        className="bg-slate-100 hover:bg-[#1677FF] hover:text-white text-slate-700 font-bold px-3 py-1.5 rounded-xl transition"
                      >
                        Manage
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Modal: Update Order Status & Tracking */}
        {selectedOrder && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs">
            <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl space-y-4 animate-fade-in">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div>
                  <h3 className="font-bold text-base text-[#0B1739]">
                    Manage Order {selectedOrder.order_number}
                  </h3>
                  <p className="text-xs text-slate-500">
                    {selectedOrder.shipping_name} ({selectedOrder.customer_email})
                  </p>
                </div>
                <span className="font-black text-sm text-[#1677FF]">
                  {formatPrice(selectedOrder.total_cents)}
                </span>
              </div>

              {/* Items in order */}
              <div className="space-y-1.5 text-xs text-slate-600 bg-slate-50 p-3 rounded-2xl max-h-36 overflow-y-auto">
                {selectedOrder.items.map((it) => (
                  <div key={it.id} className="flex justify-between">
                    <span>
                      {it.quantity}x {it.product_name}
                    </span>
                    <span className="font-bold">{formatPrice(it.total_cents)}</span>
                  </div>
                ))}
              </div>

              <form onSubmit={handleSaveStatus} className="space-y-4 text-xs">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">
                      Fulfillment State
                    </label>
                    <select
                      value={newFulfillment}
                      onChange={(e) => setNewFulfillment(e.target.value as FulfillmentStatus)}
                      className="w-full border border-slate-200 rounded-xl p-2.5 bg-white font-semibold text-slate-800"
                    >
                      <option value="processing">Processing</option>
                      <option value="shipped">Shipped</option>
                      <option value="delivered">Delivered</option>
                      <option value="cancelled">Cancelled</option>
                    </select>
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">
                      Payment Status
                    </label>
                    <select
                      value={newPayment}
                      onChange={(e) => setNewPayment(e.target.value as PaymentStatus)}
                      className="w-full border border-slate-200 rounded-xl p-2.5 bg-white font-semibold text-slate-800"
                    >
                      <option value="pending">Pending</option>
                      <option value="paid">Paid</option>
                      <option value="refunded">Refunded</option>
                      <option value="failed">Failed</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Carrier</label>
                    <input
                      type="text"
                      value={newCarrier}
                      onChange={(e) => setNewCarrier(e.target.value)}
                      placeholder="e.g. FedEx Ground or USPS"
                      className="w-full border border-slate-200 rounded-xl p-2.5"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">
                      Tracking Number
                    </label>
                    <input
                      type="text"
                      value={newTracking}
                      onChange={(e) => setNewTracking(e.target.value)}
                      placeholder="e.g. TRK-987123"
                      className="w-full border border-slate-200 rounded-xl p-2.5 font-mono"
                    />
                  </div>
                </div>

                <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
                  <button
                    type="button"
                    onClick={() => setSelectedOrder(null)}
                    className="px-4 py-2 text-slate-600 rounded-xl hover:bg-slate-100 font-semibold"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 bg-[#1677FF] hover:bg-blue-600 text-white font-bold rounded-xl shadow-xs"
                  >
                    Save Changes
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
