"use client";

import React, { useState, useEffect } from "react";
import { Users, Search, Mail, Phone, Calendar } from "lucide-react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { getAllOrders } from "@/lib/store/repository";
import { formatPrice, formatDate } from "@/lib/formatters";

interface CustomerRecord {
  email: string;
  name: string;
  phone: string;
  totalOrders: number;
  totalSpentCents: number;
  lastOrderDate: string;
}

export default function AdminCustomersPage() {
  const [customers, setCustomers] = useState<CustomerRecord[]>([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    async function aggregateCustomers() {
      const orders = await getAllOrders();
      const map = new Map<string, CustomerRecord>();

      for (const ord of orders) {
        const key = ord.customer_email.toLowerCase();
        const existing = map.get(key);
        if (existing) {
          existing.totalOrders += 1;
          existing.totalSpentCents += ord.total_cents;
          if (new Date(ord.created_at) > new Date(existing.lastOrderDate)) {
            existing.lastOrderDate = ord.created_at;
          }
        } else {
          map.set(key, {
            email: ord.customer_email,
            name: ord.shipping_name,
            phone: ord.customer_phone,
            totalOrders: 1,
            totalSpentCents: ord.total_cents,
            lastOrderDate: ord.created_at,
          });
        }
      }

      setCustomers(Array.from(map.values()));
    }
    aggregateCustomers();
  }, []);

  const filtered = customers.filter(
    (c) =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-black text-[#0B1739]">Customer Directory</h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Registered accounts, purchase history, and buyer lifetime value
          </p>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-xs max-w-sm">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by name or email..."
              className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-[#1677FF]"
            />
          </div>
        </div>

        <div className="bg-white rounded-3xl border border-slate-100 shadow-xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-500 font-bold uppercase tracking-wider text-[10px] border-b border-slate-100">
                <tr>
                  <th className="py-3 px-4">Customer</th>
                  <th className="py-3 px-4">Phone</th>
                  <th className="py-3 px-4">Orders Placed</th>
                  <th className="py-3 px-4">Total Spent</th>
                  <th className="py-3 px-4 text-right">Last Purchase</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filtered.map((c, i) => (
                  <tr key={i} className="hover:bg-slate-50/50 transition">
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-blue-100 text-[#1677FF] font-bold flex items-center justify-center text-xs shrink-0">
                          {c.name[0]?.toUpperCase() || "C"}
                        </div>
                        <div>
                          <p className="font-bold text-[#0B1739]">{c.name}</p>
                          <p className="text-[10px] text-slate-400">{c.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-slate-600">{c.phone}</td>
                    <td className="py-3 px-4 font-bold text-slate-800">{c.totalOrders}</td>
                    <td className="py-3 px-4 font-black text-[#0B1739]">
                      {formatPrice(c.totalSpentCents)}
                    </td>
                    <td className="py-3 px-4 text-right text-slate-500">
                      {formatDate(c.lastOrderDate)}
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
