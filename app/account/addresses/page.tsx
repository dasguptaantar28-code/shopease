"use client";

import React, { useState } from "react";
import { MapPin, Plus, Check, Trash2, Edit } from "lucide-react";
import { AccountNav } from "@/components/account/AccountNav";
import { useToast } from "@/lib/store/toast-context";
import { Address } from "@/lib/types";

export default function SavedAddressesPage() {
  const { toast } = useToast();
  const [addresses, setAddresses] = useState<Address[]>([
    {
      id: "addr-1",
      name: "Alex Taylor (Home)",
      phone: "+1 (555) 234-5678",
      line1: "742 Evergreen Terrace",
      city: "Springfield",
      state: "OR",
      postal_code: "97477",
      country: "United States",
      is_default: true,
    },
    {
      id: "addr-2",
      name: "Alex Taylor (Office)",
      phone: "+1 (555) 876-5432",
      line1: "100 Innovation Way, Suite 400",
      city: "Portland",
      state: "OR",
      postal_code: "97201",
      country: "United States",
      is_default: false,
    },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newName, setNewName] = useState("");
  const [newLine1, setNewLine1] = useState("");
  const [newCity, setNewCity] = useState("");
  const [newState, setNewState] = useState("");
  const [newZip, setNewZip] = useState("");
  const [newPhone, setNewPhone] = useState("");

  const handleAddAddress = (e: React.FormEvent) => {
    e.preventDefault();
    const newAddr: Address = {
      id: `addr-${Date.now()}`,
      name: newName,
      phone: newPhone,
      line1: newLine1,
      city: newCity,
      state: newState,
      postal_code: newZip,
      country: "United States",
      is_default: addresses.length === 0,
    };
    setAddresses([...addresses, newAddr]);
    setIsModalOpen(false);
    setNewName("");
    setNewLine1("");
    setNewCity("");
    setNewState("");
    setNewZip("");
    setNewPhone("");
    toast({ title: "Address saved", description: "New delivery address added.", type: "success" });
  };

  const handleSetDefault = (id: string | undefined) => {
    setAddresses(addresses.map((a) => ({ ...a, is_default: a.id === id })));
    toast({ title: "Default address updated", type: "info" });
  };

  const handleDelete = (id: string | undefined) => {
    setAddresses(addresses.filter((a) => a.id !== id));
    toast({ title: "Address removed", type: "info" });
  };

  return (
    <div className="py-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-4">
          <AccountNav />
        </div>

        <div className="lg:col-span-8 space-y-6">
          <div className="bg-white rounded-3xl border border-slate-100 p-6 sm:p-8 shadow-xs space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-xl sm:text-2xl font-black text-[#0B1739]">Saved Addresses</h1>
                <p className="text-xs text-slate-500 mt-0.5">Manage delivery destinations for rapid checkout</p>
              </div>
              <button
                onClick={() => setIsModalOpen(true)}
                className="inline-flex items-center gap-1.5 bg-[#1677FF] text-white font-bold text-xs px-4 py-2.5 rounded-xl hover:bg-blue-600 transition shadow-xs"
              >
                <Plus className="w-4 h-4" />
                <span>Add Address</span>
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {addresses.map((addr) => (
                <div
                  key={addr.id}
                  className={`p-5 rounded-2xl border text-xs space-y-2 relative transition ${
                    addr.is_default
                      ? "border-[#1677FF] bg-blue-50/20 ring-1 ring-blue-100"
                      : "border-slate-100 bg-white"
                  }`}
                >
                  {addr.is_default && (
                    <span className="inline-block bg-blue-100 text-[#1677FF] font-bold text-[10px] px-2 py-0.5 rounded-full mb-1">
                      Default Address
                    </span>
                  )}
                  <h3 className="font-bold text-sm text-[#0B1739]">{addr.name}</h3>
                  <p className="text-slate-600">{addr.line1}</p>
                  <p className="text-slate-600">
                    {addr.city}, {addr.state} {addr.postal_code}
                  </p>
                  <p className="text-slate-500">{addr.phone}</p>

                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                    {!addr.is_default ? (
                      <button
                        onClick={() => handleSetDefault(addr.id)}
                        className="text-[#1677FF] hover:underline font-semibold text-[11px]"
                      >
                        Set as Default
                      </button>
                    ) : (
                      <span className="text-slate-400 text-[11px]">Primary destination</span>
                    )}

                    <button
                      onClick={() => handleDelete(addr.id)}
                      className="text-slate-400 hover:text-rose-600 p-1"
                      title="Delete address"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Add Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl space-y-4 animate-fade-in">
            <h3 className="font-bold text-base text-[#0B1739]">Add New Delivery Address</h3>
            <form onSubmit={handleAddAddress} className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Label / Recipient Name</label>
                <input
                  type="text"
                  required
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  placeholder="e.g. Home or Alex Taylor"
                  className="w-full border border-slate-200 rounded-xl p-2.5 focus:outline-none focus:ring-2 focus:ring-[#1677FF]"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Street Address</label>
                <input
                  type="text"
                  required
                  value={newLine1}
                  onChange={(e) => setNewLine1(e.target.value)}
                  placeholder="Street and house number"
                  className="w-full border border-slate-200 rounded-xl p-2.5 focus:outline-none focus:ring-2 focus:ring-[#1677FF]"
                />
              </div>

              <div className="grid grid-cols-3 gap-2">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">City</label>
                  <input
                    type="text"
                    required
                    value={newCity}
                    onChange={(e) => setNewCity(e.target.value)}
                    className="w-full border border-slate-200 rounded-xl p-2.5"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">State</label>
                  <input
                    type="text"
                    required
                    value={newState}
                    onChange={(e) => setNewState(e.target.value)}
                    className="w-full border border-slate-200 rounded-xl p-2.5"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">ZIP</label>
                  <input
                    type="text"
                    required
                    value={newZip}
                    onChange={(e) => setNewZip(e.target.value)}
                    className="w-full border border-slate-200 rounded-xl p-2.5"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Phone Number</label>
                <input
                  type="tel"
                  required
                  value={newPhone}
                  onChange={(e) => setNewPhone(e.target.value)}
                  placeholder="+1 (555) 000-0000"
                  className="w-full border border-slate-200 rounded-xl p-2.5"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 text-slate-600 font-semibold rounded-xl hover:bg-slate-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#1677FF] text-white font-bold rounded-xl hover:bg-blue-600"
                >
                  Save Address
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
