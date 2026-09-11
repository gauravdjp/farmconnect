"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Building2,
  FileText,
  Truck,
  TrendingDown,
  CheckCircle2,
  Download,
  Plus,
  ArrowRight,
  Receipt,
  Scale,
} from "lucide-react";
import { formatCurrency } from "@/lib/utils";

export default function BulkBuyerDashboard() {
  const [showRfqModal, setShowRfqModal] = useState(false);
  const [rfqCrop, setRfqCrop] = useState("Nashik Red Onions");
  const [rfqQty, setRfqQty] = useState("5000");
  const [rfqTargetPrice, setRfqTargetPrice] = useState("25");
  const [quotes, setQuotes] = useState([
    {
      id: "rfq-1",
      crop: "Sharbati Wheat (Grade A)",
      quantity: "10,000 kg (100 qtl)",
      targetPrice: 40,
      offeredBy: "Green Harvest Punjab FPO",
      offeredPrice: 41,
      status: "Accepted & Booked",
    },
    {
      id: "rfq-2",
      crop: "Red Onions (Garwa)",
      quantity: "5,000 kg",
      targetPrice: 25,
      offeredBy: "Sahyadri Agro FPO",
      offeredPrice: 26,
      status: "Under Review",
    },
  ]);

  const handleCreateRfq = (e: React.FormEvent) => {
    e.preventDefault();
    setQuotes([
      {
        id: "rfq-" + Date.now(),
        crop: rfqCrop,
        quantity: `${rfqQty} kg`,
        targetPrice: parseFloat(rfqTargetPrice) || 25,
        offeredBy: "Broadcasting to 14 verified FPOs",
        offeredPrice: parseFloat(rfqTargetPrice) || 25,
        status: "Open for Bids",
      },
      ...quotes,
    ]);
    setShowRfqModal(false);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-amber-900 to-stone-900 text-white p-6 sm:p-8 rounded-3xl shadow-lg flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2 text-xs font-semibold text-amber-300 mb-1">
            <Building2 className="w-4 h-4" />
            <span>FreshBite Cloud Kitchens & Retail Pvt Ltd • GSTIN: 27AABCF1234F1Z9</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Institutional Procurement Portal
          </h1>
          <p className="text-xs sm:text-sm text-stone-300 mt-1">
            Wholesale farm-gate sourcing • B2B volume pricing & GST invoicing
          </p>
        </div>

        <button
          onClick={() => setShowRfqModal(true)}
          className="inline-flex items-center px-4 py-2.5 bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold rounded-xl text-xs transition-all shadow-md self-start sm:self-auto"
        >
          <Plus className="w-4 h-4 mr-1.5" />
          Request New Quote (RFQ)
        </button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white rounded-2xl border border-stone-200 p-5 shadow-xs">
          <div className="text-xs text-stone-500 font-semibold uppercase">Total Procured This Month</div>
          <div className="text-2xl font-black text-stone-900 mt-1">32.5 Metric Tonnes</div>
          <div className="text-[11px] text-emerald-600 font-bold mt-1">
            Saved ₹1.82 Lakhs vs wholesale market markups
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-stone-200 p-5 shadow-xs">
          <div className="text-xs text-stone-500 font-semibold uppercase">Active Contracts</div>
          <div className="text-2xl font-black text-stone-900 mt-1">4 FPOs Contracted</div>
          <div className="text-[11px] text-stone-500 mt-1">Nashik, Ludhiana, Guntur, Karnal</div>
        </div>

        <div className="bg-white rounded-2xl border border-stone-200 p-5 shadow-xs">
          <div className="text-xs text-stone-500 font-semibold uppercase">GST Input Tax Credit</div>
          <div className="text-2xl font-black text-stone-900 mt-1">₹46,200</div>
          <div className="text-[11px] text-amber-600 font-bold mt-1">Invoices automatically synced</div>
        </div>
      </div>

      {/* RFQ and Quotes Management */}
      <div className="bg-white rounded-3xl border border-stone-200 p-6 shadow-xs space-y-4">
        <div className="flex items-center justify-between border-b border-stone-100 pb-3">
          <h2 className="text-base font-bold text-stone-900 flex items-center">
            <Scale className="w-4 h-4 mr-2 text-amber-600" />
            Active Volume RFQs & Price Negotiations
          </h2>
          <span className="text-xs text-stone-400">Direct FPO Bids</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-stone-100 text-stone-400 uppercase tracking-wider font-semibold">
                <th className="py-2.5">Crop / Variety</th>
                <th className="py-2.5">Required Quantity</th>
                <th className="py-2.5">Target Price</th>
                <th className="py-2.5">FPO Bidding Partner</th>
                <th className="py-2.5">Offered Price</th>
                <th className="py-2.5">Status</th>
                <th className="py-2.5 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              {quotes.map((q) => (
                <tr key={q.id} className="hover:bg-stone-50/50">
                  <td className="py-3.5 font-bold text-stone-900">{q.crop}</td>
                  <td className="py-3.5 text-stone-700">{q.quantity}</td>
                  <td className="py-3.5 text-stone-600">₹{q.targetPrice}/kg</td>
                  <td className="py-3.5 text-stone-800 font-medium">{q.offeredBy}</td>
                  <td className="py-3.5 font-extrabold text-stone-900">₹{q.offeredPrice}/kg</td>
                  <td className="py-3.5">
                    <span
                      className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                        q.status.includes("Accepted")
                          ? "bg-emerald-100 text-emerald-800"
                          : "bg-amber-100 text-amber-800"
                      }`}
                    >
                      {q.status}
                    </span>
                  </td>
                  <td className="py-3.5 text-right">
                    <button className="px-3 py-1 bg-stone-100 hover:bg-stone-200 text-stone-800 font-bold rounded-lg transition-colors">
                      View Terms
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* GST Invoices Section */}
      <div className="bg-white rounded-3xl border border-stone-200 p-6 shadow-xs space-y-4">
        <div className="flex items-center justify-between border-b border-stone-100 pb-3">
          <h2 className="text-base font-bold text-stone-900 flex items-center">
            <Receipt className="w-4 h-4 mr-2 text-emerald-600" />
            Downloadable GST Invoices
          </h2>
          <span className="text-xs text-stone-400">Past 30 Days</span>
        </div>

        <div className="divide-y divide-stone-100 text-xs">
          <div className="py-3 flex items-center justify-between">
            <div>
              <div className="font-bold text-stone-900">INV-2026-09-082 • Sahyadri Agro FPO</div>
              <div className="text-stone-500">5,000 kg Onions • ₹1,30,000 + GST</div>
            </div>
            <button className="inline-flex items-center px-3 py-1.5 bg-stone-100 hover:bg-stone-200 text-stone-800 font-bold rounded-lg">
              <Download className="w-3.5 h-3.5 mr-1" /> PDF Invoice
            </button>
          </div>

          <div className="py-3 flex items-center justify-between">
            <div>
              <div className="font-bold text-stone-900">INV-2026-08-941 • Green Harvest FPO</div>
              <div className="text-stone-500">10,000 kg Wheat • ₹4,20,000 + GST</div>
            </div>
            <button className="inline-flex items-center px-3 py-1.5 bg-stone-100 hover:bg-stone-200 text-stone-800 font-bold rounded-lg">
              <Download className="w-3.5 h-3.5 mr-1" /> PDF Invoice
            </button>
          </div>
        </div>
      </div>

      {/* RFQ Modal */}
      {showRfqModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between border-b border-stone-100 pb-3">
              <h3 className="font-bold text-base text-stone-900">Submit Wholesale Procurement RFQ</h3>
              <button onClick={() => setShowRfqModal(false)} className="text-stone-400 font-bold">
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateRfq} className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-stone-700 uppercase mb-1">Crop / Commodity</label>
                <input
                  type="text"
                  required
                  value={rfqCrop}
                  onChange={(e) => setRfqCrop(e.target.value)}
                  className="w-full px-3 py-2 border rounded-xl"
                />
              </div>

              <div>
                <label className="block font-bold text-stone-700 uppercase mb-1">Quantity Needed (kg)</label>
                <input
                  type="number"
                  required
                  value={rfqQty}
                  onChange={(e) => setRfqQty(e.target.value)}
                  className="w-full px-3 py-2 border rounded-xl"
                />
              </div>

              <div>
                <label className="block font-bold text-stone-700 uppercase mb-1">Target Price (₹/kg)</label>
                <input
                  type="number"
                  required
                  value={rfqTargetPrice}
                  onChange={(e) => setRfqTargetPrice(e.target.value)}
                  className="w-full px-3 py-2 border rounded-xl font-bold"
                />
              </div>

              <div className="pt-2 flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setShowRfqModal(false)}
                  className="px-3 py-2 font-bold text-stone-500"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white font-bold rounded-xl"
                >
                  Broadcast RFQ to FPOs
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
