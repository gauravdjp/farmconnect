"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  ShieldCheck,
  Users,
  TrendingUp,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  Truck,
  Activity,
  FileCheck,
} from "lucide-react";
import { formatCurrency } from "@/lib/utils";

export default function AdminPage() {
  const [kycQueue, setKycQueue] = useState([
    {
      id: "kyc-1",
      name: "Suresh Chavan",
      location: "Nashik, Maharashtra",
      crops: "Pomegranate, Grapes",
      landSize: "18 Acres",
      docType: "Aadhaar + 7/12 Land Extract",
      status: "pending",
    },
    {
      id: "kyc-2",
      name: "Devendra Rao",
      location: "Guntur, Andhra Pradesh",
      crops: "Teja Chilli, Turmeric",
      landSize: "12 Acres",
      docType: "Aadhaar + Pattadar Passbook",
      status: "pending",
    },
  ]);

  const handleVerify = (id: string, action: "approve" | "reject") => {
    setKycQueue((prev) =>
      prev.map((k) => (k.id === id ? { ...k, status: action === "approve" ? "verified" : "rejected" } : k))
    );
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-stone-900 to-emerald-950 text-white p-6 sm:p-8 rounded-3xl shadow-lg flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2 text-xs font-semibold text-emerald-400 mb-1">
            <ShieldCheck className="w-4 h-4" />
            <span>FarmConnect Operations Command Center</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            National Administrative Portal
          </h1>
          <p className="text-xs sm:text-sm text-stone-300 mt-1">
            Platform Governance • KYC Approvals • Escrow Audits • AI Logistics Health
          </p>
        </div>
      </div>

      {/* Admin KPIs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-2xl border border-stone-200 p-5 shadow-xs">
          <div className="text-xs text-stone-500 font-semibold uppercase">Platform GMV</div>
          <div className="text-2xl font-black text-stone-900 mt-1">₹4,82,40,000</div>
          <div className="text-[11px] text-emerald-600 font-bold mt-1">+24% month-on-month</div>
        </div>

        <div className="bg-white rounded-2xl border border-stone-200 p-5 shadow-xs">
          <div className="text-xs text-stone-500 font-semibold uppercase">Registered Farmers & FPOs</div>
          <div className="text-2xl font-black text-stone-900 mt-1">12,450</div>
          <div className="text-[11px] text-stone-500 mt-1">Across 8 agricultural states</div>
        </div>

        <div className="bg-white rounded-2xl border border-stone-200 p-5 shadow-xs">
          <div className="text-xs text-stone-500 font-semibold uppercase">Escrow Held</div>
          <div className="text-2xl font-black text-stone-900 mt-1">₹14,92,300</div>
          <div className="text-[11px] text-purple-600 font-bold mt-1">100% solvency maintained</div>
        </div>

        <div className="bg-white rounded-2xl border border-stone-200 p-5 shadow-xs">
          <div className="text-xs text-stone-500 font-semibold uppercase">Transit Mileage Saved</div>
          <div className="text-2xl font-black text-stone-900 mt-1">34.8%</div>
          <div className="text-[11px] text-blue-600 font-bold mt-1">Via OR-Tools VRP route bundling</div>
        </div>
      </div>

      {/* KYC Verification Queue */}
      <div className="bg-white rounded-3xl border border-stone-200 p-6 shadow-xs space-y-4">
        <div className="flex items-center justify-between border-b border-stone-100 pb-3">
          <h2 className="text-base font-bold text-stone-900 flex items-center">
            <FileCheck className="w-4 h-4 mr-2 text-emerald-600" />
            Farmer & FPO KYC Verification Queue
          </h2>
          <span className="text-xs text-stone-400">Requires 7/12 Land Document Review</span>
        </div>

        <div className="divide-y divide-stone-100 text-xs">
          {kycQueue.map((k) => (
            <div key={k.id} className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="space-y-1">
                <div className="font-bold text-stone-900 text-sm">{k.name}</div>
                <div className="text-stone-500">
                  {k.location} • Land: {k.landSize} • Crops: {k.crops}
                </div>
                <div className="text-[11px] text-stone-400">
                  Submitted Documentation: <span className="text-stone-700 font-medium">{k.docType}</span>
                </div>
              </div>

              <div className="flex items-center space-x-2 self-end sm:self-center">
                {k.status === "verified" ? (
                  <span className="px-3 py-1 bg-emerald-100 text-emerald-800 rounded-full font-bold flex items-center">
                    <CheckCircle2 className="w-3.5 h-3.5 mr-1" /> Verified Farmer
                  </span>
                ) : k.status === "rejected" ? (
                  <span className="px-3 py-1 bg-red-100 text-red-800 rounded-full font-bold flex items-center">
                    <XCircle className="w-3.5 h-3.5 mr-1" /> Rejected
                  </span>
                ) : (
                  <>
                    <button
                      onClick={() => handleVerify(k.id, "approve")}
                      className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-bold"
                    >
                      Approve KYC
                    </button>
                    <button
                      onClick={() => handleVerify(k.id, "reject")}
                      className="px-3 py-1.5 bg-stone-100 hover:bg-red-50 text-stone-700 hover:text-red-700 rounded-lg font-bold"
                    >
                      Reject
                    </button>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Regional Logistics Hubs Status */}
      <div className="bg-white rounded-3xl border border-stone-200 p-6 shadow-xs space-y-4">
        <div className="flex items-center justify-between border-b border-stone-100 pb-3">
          <h2 className="text-base font-bold text-stone-900 flex items-center">
            <Truck className="w-4 h-4 mr-2 text-blue-600" />
            Regional Aggregation Hubs
          </h2>
          <span className="text-xs text-stone-400">Active IoT Nodes</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
          <div className="p-4 bg-stone-50 rounded-2xl border border-stone-200/80 space-y-2">
            <div className="font-bold text-stone-900">Nashik Hub (Central Agri-Corridor)</div>
            <div className="text-stone-500">22 Cold storage vans active</div>
            <div className="flex items-center text-emerald-600 font-bold">
              <Activity className="w-3 h-3 mr-1" /> 98.4% On-time dispatch
            </div>
          </div>

          <div className="p-4 bg-stone-50 rounded-2xl border border-stone-200/80 space-y-2">
            <div className="font-bold text-stone-900">Ludhiana Hub (Grain & Pulses)</div>
            <div className="text-stone-500">14 Heavy freight trucks active</div>
            <div className="flex items-center text-emerald-600 font-bold">
              <Activity className="w-3 h-3 mr-1" /> 99.1% On-time dispatch
            </div>
          </div>

          <div className="p-4 bg-stone-50 rounded-2xl border border-stone-200/80 space-y-2">
            <div className="font-bold text-stone-900">Bengaluru South Hub (Urban Spoke)</div>
            <div className="text-stone-500">38 EV Last-mile delivery units</div>
            <div className="flex items-center text-emerald-600 font-bold">
              <Activity className="w-3 h-3 mr-1" /> 97.8% On-time dispatch
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
