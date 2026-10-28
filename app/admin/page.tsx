import React from "react";
import Link from "next/link";
import {
  DollarSign,
  ShoppingBag,
  Users,
  Package,
  AlertTriangle,
  ArrowUpRight,
  Plus,
  Eye,
  CheckCircle2,
} from "lucide-react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { getAdminMetrics } from "@/lib/store/repository";
import { formatPrice, formatDate } from "@/lib/formatters";

export default async function AdminDashboardPage() {
  const metrics = await getAdminMetrics();

  const statCards = [
    {
      title: "Total Revenue",
      value: formatPrice(metrics.totalRevenueCents),
      subtext: "From paid orders",
      icon: DollarSign,
      color: "bg-emerald-50 text-emerald-600 border-emerald-100",
    },
    {
      title: "Total Orders",
      value: metrics.totalOrders.toString(),
      subtext: "Across all fulfillment states",
      icon: ShoppingBag,
      color: "bg-blue-50 text-[#1677FF] border-blue-100",
    },
    {
      title: "Active Customers",
      value: metrics.totalCustomers.toString(),
      subtext: "Verified buyers",
      icon: Users,
      color: "bg-purple-50 text-purple-600 border-purple-100",
    },
    {
      title: "Products in Catalog",
      value: metrics.totalProducts.toString(),
      subtext: `${metrics.lowStockCount} low stock alerts`,
      icon: Package,
      color: metrics.lowStockCount > 0 ? "bg-amber-50 text-amber-600 border-amber-100" : "bg-sky-50 text-sky-600 border-sky-100",
    },
  ];

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Top Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-black text-[#0B1739]">Store Overview</h1>
            <p className="text-xs text-slate-500 mt-0.5">
              Live statistics, order fulfillment status, and catalog performance
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Link
              href="/admin/products/new"
              className="inline-flex items-center gap-1.5 bg-[#1677FF] hover:bg-blue-600 text-white font-bold text-xs px-4 py-2.5 rounded-xl shadow-xs transition"
            >
              <Plus className="w-4 h-4" />
              <span>Add New Product</span>
            </Link>
          </div>
        </div>

        {/* 4 Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {statCards.map((card, i) => {
            const Icon = card.icon;
            return (
              <div
                key={i}
                className="bg-white p-5 rounded-3xl border border-slate-100 shadow-xs flex items-center justify-between"
              >
                <div>
                  <p className="text-xs font-semibold text-slate-500">{card.title}</p>
                  <p className="text-2xl font-black text-[#0B1739] mt-1">{card.value}</p>
                  <p className="text-[11px] text-slate-400 mt-0.5">{card.subtext}</p>
                </div>
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center border ${card.color}`}>
                  <Icon className="w-6 h-6" />
                </div>
              </div>
            );
          })}
        </div>

        {/* Low Stock Warning Banner if applicable */}
        {metrics.lowStockCount > 0 && (
          <div className="flex items-center justify-between p-4 bg-amber-50 border border-amber-200 rounded-2xl text-xs text-amber-900">
            <div className="flex items-center gap-2.5">
              <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
              <span>
                <strong>Inventory Alert:</strong> {metrics.lowStockCount} items have 10 or fewer units remaining in stock.
              </span>
            </div>
            <Link
              href="/admin/inventory"
              className="font-bold underline hover:text-amber-700"
            >
              Manage Inventory →
            </Link>
          </div>
        )}

        {/* Recent Orders Section */}
        <div className="bg-white rounded-3xl border border-slate-100 p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-base font-bold text-[#0B1739]">Recent Orders</h2>
              <p className="text-xs text-slate-500">Latest customer purchases across the storefront</p>
            </div>
            <Link
              href="/admin/orders"
              className="text-xs font-bold text-[#1677FF] hover:underline"
            >
              View All Orders →
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-500 font-bold uppercase tracking-wider text-[10px] border-b border-slate-100">
                <tr>
                  <th className="py-3 px-4 rounded-l-xl">Order #</th>
                  <th className="py-3 px-4">Customer</th>
                  <th className="py-3 px-4">Date</th>
                  <th className="py-3 px-4">Payment</th>
                  <th className="py-3 px-4">Fulfillment</th>
                  <th className="py-3 px-4">Total</th>
                  <th className="py-3 px-4 text-right rounded-r-xl">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {metrics.recentOrders.map((ord) => (
                  <tr key={ord.id} className="hover:bg-slate-50/50 transition">
                    <td className="py-3 px-4 font-bold text-[#0B1739]">{ord.order_number}</td>
                    <td className="py-3 px-4">
                      <p className="font-semibold text-slate-800">{ord.shipping_name}</p>
                      <p className="text-[10px] text-slate-400">{ord.customer_email}</p>
                    </td>
                    <td className="py-3 px-4 text-slate-500">{formatDate(ord.created_at)}</td>
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
                            : "bg-slate-100 text-slate-700"
                        }`}
                      >
                        {ord.fulfillment_status}
                      </span>
                    </td>
                    <td className="py-3 px-4 font-black text-[#0B1739]">
                      {formatPrice(ord.total_cents)}
                    </td>
                    <td className="py-3 px-4 text-right">
                      <Link
                        href={`/admin/orders/${ord.id}`}
                        className="p-1.5 text-slate-400 hover:text-[#1677FF] inline-block"
                        title="Manage Order"
                      >
                        <Eye className="w-4 h-4" />
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
