"use client";

import React, { useState } from "react";
import { 
  FileText, 
  Printer, 
  Download, 
  QrCode, 
  ShieldCheck, 
  CheckCircle2, 
  Scale, 
  Building2,
  Calendar,
  Lock
} from "lucide-react";
import { Card } from "@/components/ui/Card";
import { MetroButton } from "@/components/ui/MetroButton";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { getTestCases, AUTHENTIC_REPORTS } from "@/lib/db/metrology-db";

export default function ReportsPage() {
  const testCases = getTestCases();
  const [selectedCaseId, setSelectedCaseId] = useState<string>(testCases[1].id); // Approved case by default
  const selectedCase = testCases.find((tc) => tc.id === selectedCaseId) || testCases[0];
  const model = selectedCase.instrument_model!;
  const org = selectedCase.organization!;

  const handlePrint = () => {
    if (typeof window !== "undefined") {
      window.print();
    }
  };

  return (
    <div className="space-y-6 pb-16">
      {/* Utility Bar (Hidden during printing) */}
      <div className="print:hidden flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-paper dark:bg-graphite-900 border border-graphite-200 dark:border-graphite-800 rounded-sm p-4 shadow-metro">
        <div className="flex items-center gap-3">
          <label className="text-xs font-semibold uppercase text-graphite-500">
            Select Dossier Report:
          </label>
          <select
            value={selectedCaseId}
            onChange={(e) => setSelectedCaseId(e.target.value)}
            className="bg-paper dark:bg-graphite-950 border border-graphite-300 dark:border-graphite-700 rounded px-3 py-1 text-xs font-semibold text-graphite-900 dark:text-graphite-100"
          >
            {testCases.map((tc) => (
              <option key={tc.id} value={tc.id}>
                {tc.case_number} — {tc.instrument_model?.model_name} ({tc.status})
              </option>
            ))}
          </select>
        </div>

        <div className="flex items-center gap-2.5">
          <MetroButton
            variant="secondary"
            size="sm"
            icon={<Download className="w-3.5 h-3.5" />}
            onClick={() => alert("Exporting native DOCX test report data package...")}
          >
            Export DOCX
          </MetroButton>
          <MetroButton
            variant="primary"
            size="sm"
            icon={<Printer className="w-3.5 h-3.5" />}
            onClick={handlePrint}
          >
            Print Official PDF Report
          </MetroButton>
        </div>
      </div>

      {/* Official Printable Certificate Canvas (OIML R-76-2 Type Evaluation Format) */}
      <div className="max-w-4xl mx-auto bg-white text-graphite-950 border border-graphite-300 p-8 sm:p-12 shadow-metro-lg space-y-8 print:border-none print:shadow-none print:p-0 print:m-0">
        {/* Government Header */}
        <div className="text-center space-y-1.5 border-b-2 border-graphite-950 pb-6">
          <div className="inline-block px-3 py-0.5 text-[11px] font-bold uppercase tracking-widest bg-graphite-100 text-graphite-800 rounded mb-1">
            Government of India
          </div>
          <h2 className="text-lg font-bold uppercase tracking-tight text-graphite-900">
            Ministry of Consumer Affairs, Food & Public Distribution
          </h2>
          <h3 className="text-sm font-semibold uppercase tracking-wider text-graphite-700">
            Department of Consumer Affairs — Legal Metrology Division
          </h3>
          <div className="pt-2">
            <h1 className="text-xl font-extrabold uppercase tracking-wide border-t border-b border-graphite-300 py-1 inline-block">
              Type Evaluation Test Report as per OIML Recommendation R-76
            </h1>
          </div>
          <p className="text-[11px] font-mono text-graphite-600">
            Governed under the Legal Metrology Act, 2009 & Legal Metrology (General) Rules, 2011
          </p>
        </div>

        {/* Report Metadata Strip */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-graphite-50 p-3.5 rounded border border-graphite-200 text-xs font-mono">
          <div>
            <span className="text-[10px] text-graphite-500 block uppercase font-sans font-semibold">
              Report Number
            </span>
            <span className="font-bold text-graphite-900">
              DOCA/R76/2026/00098
            </span>
          </div>
          <div>
            <span className="text-[10px] text-graphite-500 block uppercase font-sans font-semibold">
              Dossier ID
            </span>
            <span className="font-bold text-graphite-900">
              {selectedCase.case_number}
            </span>
          </div>
          <div>
            <span className="text-[10px] text-graphite-500 block uppercase font-sans font-semibold">
              Evaluation Date
            </span>
            <span className="font-bold text-graphite-900">
              06 Feb 2026
            </span>
          </div>
          <div>
            <span className="text-[10px] text-graphite-500 block uppercase font-sans font-semibold">
              Overall Verdict
            </span>
            <span className="font-bold text-verified-700 bg-verified-100 px-2 py-0.5 rounded inline-block">
              PASS / COMPLIANT
            </span>
          </div>
        </div>

        {/* Section 1: Designated Testing Laboratory Details */}
        <div className="space-y-2">
          <h4 className="text-xs font-bold uppercase tracking-wider text-graphite-900 border-b border-graphite-300 pb-1 flex items-center gap-1.5">
            <Building2 className="w-3.5 h-3.5 text-brass-600" />
            <span>1. Designated Testing Laboratory Details</span>
          </h4>
          <div className="grid grid-cols-2 gap-4 text-xs">
            <div>
              <span className="text-graphite-500 block">Name of Laboratory:</span>
              <span className="font-semibold text-graphite-900">{org.name}</span>
            </div>
            <div>
              <span className="text-graphite-500 block">NABL Accreditation Number:</span>
              <span className="font-mono font-semibold text-graphite-900">{org.nabl_code}</span>
            </div>
            <div className="col-span-2">
              <span className="text-graphite-500 block">Laboratory Facility Address:</span>
              <span className="text-graphite-800">{org.address}</span>
            </div>
          </div>
        </div>

        {/* Section 2: Manufacturer & Instrument Technical Specifications */}
        <div className="space-y-2">
          <h4 className="text-xs font-bold uppercase tracking-wider text-graphite-900 border-b border-graphite-300 pb-1 flex items-center gap-1.5">
            <Scale className="w-3.5 h-3.5 text-brass-600" />
            <span>2. Manufacturer & Instrument Model Specifications</span>
          </h4>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs font-mono">
            <div>
              <span className="text-graphite-500 font-sans block">Model Name:</span>
              <span className="font-bold text-graphite-900 font-sans">{model.model_name}</span>
            </div>
            <div>
              <span className="text-graphite-500 font-sans block">Manufacturer:</span>
              <span className="font-semibold text-graphite-900 font-sans">{model.manufacturer?.name}</span>
            </div>
            <div>
              <span className="text-graphite-500 font-sans block">Accuracy Class:</span>
              <span className="font-bold text-brass-700">Class {model.accuracy_class}</span>
            </div>
            <div>
              <span className="text-graphite-500 font-sans block">Instrument Category:</span>
              <span className="text-graphite-800 font-sans">{model.category}</span>
            </div>
            <div>
              <span className="text-graphite-500 font-sans block">Maximum Capacity (Max):</span>
              <span className="font-bold text-graphite-900">{model.max_capacity} {model.capacity_unit}</span>
            </div>
            <div>
              <span className="text-graphite-500 font-sans block">Minimum Capacity (Min):</span>
              <span className="font-bold text-graphite-900">{model.min_capacity} {model.capacity_unit}</span>
            </div>
            <div>
              <span className="text-graphite-500 font-sans block">Verification Interval (e):</span>
              <span className="font-bold text-graphite-900">{model.verification_interval} {model.capacity_unit}</span>
            </div>
            <div>
              <span className="text-graphite-500 font-sans block">Scale Intervals (n):</span>
              <span className="font-bold text-brass-700">{model.verification_interval_count.toLocaleString()}</span>
            </div>
          </div>
        </div>

        {/* Section 3: Summary of Prescribed OIML R-76 Tests & Verdicts */}
        <div className="space-y-2">
          <h4 className="text-xs font-bold uppercase tracking-wider text-graphite-900 border-b border-graphite-300 pb-1 flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-verified-600" />
            <span>3. Summary of Evaluated OIML R-76 Test Procedures</span>
          </h4>

          <table className="w-full text-xs text-left border border-graphite-300 border-collapse">
            <thead>
              <tr className="bg-graphite-100 text-graphite-700 font-semibold border-b border-graphite-300">
                <th className="py-1.5 px-2.5">OIML Clause</th>
                <th className="py-1.5 px-2.5">Test Procedure Designation</th>
                <th className="py-1.5 px-2.5">Permissible MPE Limit</th>
                <th className="py-1.5 px-2.5">Observed Max Error</th>
                <th className="py-1.5 px-2.5 text-center">Verdict</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-graphite-200 font-mono text-[11px]">
              <tr>
                <td className="py-1.5 px-2.5 font-sans">A.4.4 & A.4.6</td>
                <td className="py-1.5 px-2.5 font-sans font-medium">Weighing Performance (Accuracy)</td>
                <td className="py-1.5 px-2.5">±0.5e to ±1.5e (±0.005g to ±0.015g)</td>
                <td className="py-1.5 px-2.5 text-verified-700">+0.004g</td>
                <td className="py-1.5 px-2.5 text-center font-bold text-verified-700">PASS</td>
              </tr>
              <tr>
                <td className="py-1.5 px-2.5 font-sans">A.4.7</td>
                <td className="py-1.5 px-2.5 font-sans font-medium">Eccentricity (Off-Centre Loading)</td>
                <td className="py-1.5 px-2.5">±1.0e (±0.010g)</td>
                <td className="py-1.5 px-2.5 text-verified-700">+0.006g</td>
                <td className="py-1.5 px-2.5 text-center font-bold text-verified-700">PASS</td>
              </tr>
              <tr>
                <td className="py-1.5 px-2.5 font-sans">A.4.10</td>
                <td className="py-1.5 px-2.5 font-sans font-medium">Repeatability Test (6 Series)</td>
                <td className="py-1.5 px-2.5">Range ≤ 1.0e (0.010g)</td>
                <td className="py-1.5 px-2.5 text-verified-700">Range = 0.004g</td>
                <td className="py-1.5 px-2.5 text-center font-bold text-verified-700">PASS</td>
              </tr>
              <tr>
                <td className="py-1.5 px-2.5 font-sans">A.4.8</td>
                <td className="py-1.5 px-2.5 font-sans font-medium">Discrimination Test (1.4d)</td>
                <td className="py-1.5 px-2.5">≥ 1d display advance</td>
                <td className="py-1.5 px-2.5 text-verified-700">1d advance verified</td>
                <td className="py-1.5 px-2.5 text-center font-bold text-verified-700">PASS</td>
              </tr>
              <tr>
                <td className="py-1.5 px-2.5 font-sans">A.4.11</td>
                <td className="py-1.5 px-2.5 font-sans font-medium">Tare Setting & Net Weighing</td>
                <td className="py-1.5 px-2.5">±MPE on Net Load Basis</td>
                <td className="py-1.5 px-2.5 text-verified-700">+0.003g</td>
                <td className="py-1.5 px-2.5 text-center font-bold text-verified-700">PASS</td>
              </tr>
              <tr>
                <td className="py-1.5 px-2.5 font-sans">Clause 3, 4, 7</td>
                <td className="py-1.5 px-2.5 font-sans font-medium">Administrative & Sealing Inspection</td>
                <td className="py-1.5 px-2.5">Conformity with Legal Rules</td>
                <td className="py-1.5 px-2.5 text-verified-700">Lead seal & plates intact</td>
                <td className="py-1.5 px-2.5 text-center font-bold text-verified-700">PASS</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Section 4: Legal Metrology Formal Declaration */}
        <div className="p-3 bg-graphite-50 rounded border border-graphite-300 text-xs leading-relaxed space-y-1">
          <p className="font-bold text-graphite-900">Official Metrological Declaration:</p>
          <p className="text-graphite-700">
            The Non-Automatic Weighing Instrument model identified herein has undergone full type evaluation testing
            conducted in accordance with OIML Recommendation R-76-1 (Edition 2006) and the Legal Metrology (General)
            Rules, 2011. All evaluated metrological parameters satisfy prescribed limits for <strong>Accuracy Class {model.accuracy_class}</strong>.
            This test report constitutes valid technical documentation for model approval issuance by the Department of Consumer Affairs.
          </p>
        </div>

        {/* Section 5: Tamper-Evident Signatures & Verification Block */}
        <div className="grid grid-cols-1 sm:grid-cols-12 gap-6 pt-4 border-t-2 border-graphite-950 items-end">
          {/* QR Code Verification */}
          <div className="sm:col-span-4 flex items-center gap-3">
            <div className="w-20 h-20 bg-graphite-100 border border-graphite-300 rounded flex flex-col items-center justify-center p-1 shrink-0">
              <QrCode className="w-12 h-12 text-graphite-800" />
              <span className="text-[8px] font-mono text-graphite-600 mt-0.5">SCAN VERIFY</span>
            </div>
            <div className="space-y-1 text-[10px] font-mono text-graphite-600">
              <span className="font-bold text-graphite-900 font-sans block">Cryptographic Hash:</span>
              <p className="break-all leading-tight text-[9px]">
                9e4b7a1d3c5f8e2a1b4d7c0e9f2a4b6c8d1e3f5a7c9e1b3d5f7a9c1e3b5d7f9a
              </p>
              <div className="flex items-center gap-1 text-verified-700 font-sans font-semibold">
                <Lock className="w-3 h-3" /> Digital Record Sealed
              </div>
            </div>
          </div>

          {/* Reviewer Signature */}
          <div className="sm:col-span-4 text-center space-y-1">
            <div className="font-serif italic text-sm text-graphite-800 border-b border-graphite-400 pb-1">
              K. Natarajan
            </div>
            <span className="font-bold text-xs text-graphite-900 block">Er. K. Natarajan</span>
            <span className="text-[10px] text-graphite-500 block">Test Metrology Engineer</span>
            <span className="font-mono text-[9px] text-graphite-400 block">Signed: 05 Feb 2026, 14:30 IST</span>
          </div>

          {/* Approver / Head of Laboratory Signature */}
          <div className="sm:col-span-4 text-center space-y-1">
            <div className="font-serif italic text-sm text-graphite-800 border-b border-graphite-400 pb-1">
              R. Venkatraman
            </div>
            <span className="font-bold text-xs text-graphite-900 block">Dr. R. Venkatraman</span>
            <span className="text-[10px] text-graphite-500 block">Head of Testing / Lab In-Charge</span>
            <span className="font-mono text-[9px] text-graphite-400 block">DSC PKI Signed: 06 Feb 2026, 11:15 IST</span>
          </div>
        </div>
      </div>
    </div>
  );
}
