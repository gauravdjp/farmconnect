"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  Scale, 
  ClipboardCheck, 
  FileText, 
  ShieldCheck, 
  Sliders, 
  Building2, 
  ArrowRight,
  Gauge,
  CheckCircle2,
  AlertTriangle,
  FileCheck2
} from "lucide-react";
import { ComplianceDial } from "@/components/ui/ComplianceDial";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { Card } from "@/components/ui/Card";
import { MetroButton } from "@/components/ui/MetroButton";
import { MetroInput } from "@/components/ui/MetroInput";
import { getTestCases, getInstrumentModels, getReferenceStandards } from "@/lib/db/metrology-db";
import { evaluateReading } from "@/lib/calc-engine/mpe";

export default function MetrologyDashboard() {
  const testCases = getTestCases();
  const models = getInstrumentModels();
  const standards = getReferenceStandards();

  // Interactive Live Calibration Bench State
  const [selectedModelId, setSelectedModelId] = useState<string>(models[0].id);
  const [testLoad, setTestLoad] = useState<number>(10.0); // 10 kg
  const [indicatedValue, setIndicatedValue] = useState<number>(10.008); // 10.008 kg (error = +8g)

  const selectedModel = models.find((m) => m.id === selectedModelId) || models[0];

  // Evaluate reading using authoritative OIML R-76 calculation engine
  const evaluation = evaluateReading(
    indicatedValue,
    testLoad,
    selectedModel.accuracy_class,
    selectedModel.verification_interval
  );

  return (
    <div className="space-y-6 pb-12">
      {/* Legal Metrology Government Banner */}
      <div className="bg-paper dark:bg-graphite-900 border-b-2 border-brass-500 border border-graphite-200 dark:border-graphite-800 rounded-sm p-6 shadow-metro">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded bg-graphite-100 dark:bg-graphite-800 text-graphite-700 dark:text-graphite-300 text-[11px] font-mono uppercase tracking-wider">
              <span>Department of Consumer Affairs (DoCA)</span>
              <span>•</span>
              <span className="text-brass-600 dark:text-brass-400 font-semibold">Legal Metrology Division</span>
            </div>
            <h1 className="text-2xl font-bold text-graphite-950 dark:text-graphite-50 tracking-tight">
              OIML R-76 NAWI Type Evaluation & Verification Portal
            </h1>
            <p className="text-xs text-graphite-600 dark:text-graphite-400 max-w-3xl leading-relaxed">
              Standardized digital testing framework for Non-Automatic Weighing Instruments in compliance with the
              Legal Metrology Act, 2009 and OIML Recommendation R-76-1/2/3. Automated Maximum Permissible Error (MPE)
              determination and tamper-evident test report generation.
            </p>
          </div>

          <div className="flex items-center gap-2.5 shrink-0">
            <Link href="/test-studio">
              <MetroButton variant="primary" icon={<Scale className="w-4 h-4" />}>
                Open Test Studio
              </MetroButton>
            </Link>
            <Link href="/reports">
              <MetroButton variant="secondary" icon={<FileText className="w-4 h-4" />}>
                Reports Repository
              </MetroButton>
            </Link>
          </div>
        </div>
      </div>

      {/* Laboratory Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="border-l-4 border-l-brass-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-graphite-500 dark:text-graphite-400">
                Active Dossiers
              </p>
              <p className="text-2xl font-bold font-mono text-graphite-900 dark:text-graphite-100 mt-1">
                {testCases.length}
              </p>
              <p className="text-[11px] text-graphite-500 mt-0.5">
                Under metrological evaluation
              </p>
            </div>
            <div className="w-10 h-10 rounded bg-brass-100 dark:bg-brass-950 text-brass-700 dark:text-brass-400 flex items-center justify-center">
              <ClipboardCheck className="w-5 h-5" />
            </div>
          </div>
        </Card>

        <Card className="border-l-4 border-l-verified-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-graphite-500 dark:text-graphite-400">
                Certified Models
              </p>
              <p className="text-2xl font-bold font-mono text-graphite-900 dark:text-graphite-100 mt-1">
                {models.length}
              </p>
              <p className="text-[11px] text-verified-600 font-medium mt-0.5">
                Full compliance achieved
              </p>
            </div>
            <div className="w-10 h-10 rounded bg-verified-50 dark:bg-verified-950 text-verified-700 dark:text-verified-300 flex items-center justify-center">
              <CheckCircle2 className="w-5 h-5" />
            </div>
          </div>
        </Card>

        <Card className="border-l-4 border-l-tolerance-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-graphite-500 dark:text-graphite-400">
                Traceable Standards
              </p>
              <p className="text-2xl font-bold font-mono text-graphite-900 dark:text-graphite-100 mt-1">
                {standards.length}
              </p>
              <p className="text-[11px] text-graphite-500 mt-0.5">
                NPL calibrated weights (E2/F1/M1)
              </p>
            </div>
            <div className="w-10 h-10 rounded bg-tolerance-50 dark:bg-tolerance-950 text-tolerance-700 dark:text-tolerance-300 flex items-center justify-center">
              <Building2 className="w-5 h-5" />
            </div>
          </div>
        </Card>

        <Card className="border-l-4 border-l-graphite-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-graphite-500 dark:text-graphite-400">
                Standard Revision
              </p>
              <p className="text-lg font-bold font-mono text-graphite-900 dark:text-graphite-100 mt-1">
                OIML R-76:2006
              </p>
              <p className="text-[11px] text-graphite-500 mt-0.5">
                12 test templates active
              </p>
            </div>
            <div className="w-10 h-10 rounded bg-graphite-100 dark:bg-graphite-800 text-graphite-700 dark:text-graphite-300 flex items-center justify-center">
              <ShieldCheck className="w-5 h-5" />
            </div>
          </div>
        </Card>
      </div>

      {/* Real-Time Interactive Metrology Workbench & Compliance Engine */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left: Interactive Test Bench Form */}
        <div className="lg:col-span-7 space-y-4">
          <Card 
            title="Live Metrology Observation Bench" 
            subtitle="Test real-time load observations against the authoritative OIML R-76 MPE Engine."
            accent
          >
            <div className="space-y-4">
              {/* Instrument Selection */}
              <div>
                <label className="text-xs font-semibold text-graphite-700 dark:text-graphite-300 mb-1 block">
                  Select Instrument Model Under Evaluation
                </label>
                <select
                  value={selectedModelId}
                  onChange={(e) => setSelectedModelId(e.target.value)}
                  className="w-full bg-paper dark:bg-graphite-900 border border-graphite-300 dark:border-graphite-700 rounded-sm px-3 py-2 text-xs font-medium text-graphite-900 dark:text-graphite-100 focus:outline-none focus:ring-1 focus:ring-brass-500"
                >
                  {models.map((m) => (
                    <option key={m.id} value={m.id}>
                      {m.model_name} (Class {m.accuracy_class}, Max = {m.max_capacity}{m.capacity_unit}, e = {m.verification_interval}{m.capacity_unit})
                    </option>
                  ))}
                </select>
              </div>

              {/* Technical Specifications Strip */}
              <div className="grid grid-cols-4 gap-2 bg-graphite-50 dark:bg-graphite-950/60 p-2.5 rounded border border-graphite-200 dark:border-graphite-800 text-xs">
                <div>
                  <span className="text-[10px] text-graphite-500 block">Class</span>
                  <span className="font-mono font-bold text-graphite-900 dark:text-graphite-100">
                    Class {selectedModel.accuracy_class}
                  </span>
                </div>
                <div>
                  <span className="text-[10px] text-graphite-500 block">Max Capacity</span>
                  <span className="font-mono font-bold text-graphite-900 dark:text-graphite-100">
                    {selectedModel.max_capacity} {selectedModel.capacity_unit}
                  </span>
                </div>
                <div>
                  <span className="text-[10px] text-graphite-500 block">Interval (e)</span>
                  <span className="font-mono font-bold text-graphite-900 dark:text-graphite-100">
                    {selectedModel.verification_interval} {selectedModel.capacity_unit}
                  </span>
                </div>
                <div>
                  <span className="text-[10px] text-graphite-500 block">Intervals (n)</span>
                  <span className="font-mono font-bold text-brass-700 dark:text-brass-400">
                    {selectedModel.verification_interval_count.toLocaleString()}
                  </span>
                </div>
              </div>

              {/* Numeric Inputs for Load & Indicated Reading */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <MetroInput
                  label="Applied Reference Load (L)"
                  unit={selectedModel.capacity_unit}
                  clauseRef="OIML A.4.4"
                  type="number"
                  step="any"
                  value={testLoad}
                  onChange={(e) => setTestLoad(parseFloat(e.target.value) || 0)}
                  helperText={`Load between Min (${selectedModel.min_capacity}) and Max (${selectedModel.max_capacity})`}
                />

                <MetroInput
                  label="Indicated Reading (I)"
                  unit={selectedModel.capacity_unit}
                  clauseRef="OIML A.4.6"
                  type="number"
                  step="any"
                  value={indicatedValue}
                  onChange={(e) => setIndicatedValue(parseFloat(e.target.value) || 0)}
                  helperText="Displayed weight on digital indicator"
                />
              </div>

              {/* Real-Time Calculation Audit Box */}
              <div className="bg-graphite-50 dark:bg-graphite-950 p-3 rounded border border-graphite-200 dark:border-graphite-800 space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-graphite-600 dark:text-graphite-400">Load in verification scale intervals (m/e):</span>
                  <span className="font-mono font-semibold text-graphite-900 dark:text-graphite-100">
                    {(testLoad / selectedModel.verification_interval).toFixed(1)} e
                  </span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-graphite-600 dark:text-graphite-400">Applicable MPE Tier (OIML R-76-1 Table 6):</span>
                  <span className="font-mono text-brass-700 dark:text-brass-400 font-semibold">
                    ±{evaluation.mpe.toString()} {selectedModel.capacity_unit}
                  </span>
                </div>
                <div className="flex items-center justify-between text-xs pt-1 border-t border-graphite-200 dark:border-graphite-800">
                  <span className="font-medium text-graphite-700 dark:text-graphite-300">Observed Error E = (I - L):</span>
                  <span className={`font-mono font-bold ${
                    evaluation.isCompliant ? "text-verified-600" : "text-fail-600"
                  }`}>
                    {evaluation.error.gt(0) ? `+${evaluation.error.toFixed(4)}` : evaluation.error.toFixed(4)} {selectedModel.capacity_unit}
                  </span>
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Right: Signature MetroSense Compliance Dial */}
        <div className="lg:col-span-5 space-y-4">
          <Card 
            title="Compliance Dial Readout" 
            subtitle="Dynamic angular deflection relative to legal tolerance limits."
            accent
          >
            <div className="flex flex-col items-center justify-center py-2">
              <ComplianceDial
                error={evaluation.error.toNumber()}
                mpe={evaluation.mpe.toNumber()}
                unit={selectedModel.capacity_unit}
                label={`Load: ${testLoad} ${selectedModel.capacity_unit} (${(testLoad / selectedModel.verification_interval).toFixed(0)}e)`}
                size="lg"
              />
            </div>
          </Card>
        </div>
      </div>

      {/* Active Evaluation Dossiers Table */}
      <Card
        title="Active Type Evaluation Dossiers (Designated Laboratories)"
        subtitle="National Legal Metrology monitoring registry under OIML R-76 verification."
        action={
          <Link href="/test-cases">
            <MetroButton variant="secondary" size="sm">
              View All Dossiers
            </MetroButton>
          </Link>
        }
      >
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-graphite-200 dark:border-graphite-800 text-graphite-500 dark:text-graphite-400 uppercase tracking-wider font-semibold">
                <th className="pb-2.5 px-3">Dossier Number</th>
                <th className="pb-2.5 px-3">Instrument Model</th>
                <th className="pb-2.5 px-3">Manufacturer</th>
                <th className="pb-2.5 px-3 text-center">Class</th>
                <th className="pb-2.5 px-3">Laboratory</th>
                <th className="pb-2.5 px-3">Status</th>
                <th className="pb-2.5 px-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-graphite-200 dark:divide-graphite-800">
              {testCases.map((tc) => (
                <tr key={tc.id} className="hover:bg-graphite-50 dark:hover:bg-graphite-800/40 transition-colors">
                  <td className="py-3 px-3 font-mono font-semibold text-graphite-900 dark:text-graphite-100">
                    {tc.case_number}
                  </td>
                  <td className="py-3 px-3 font-medium text-graphite-800 dark:text-graphite-200">
                    {tc.instrument_model?.model_name}
                  </td>
                  <td className="py-3 px-3 text-graphite-600 dark:text-graphite-400">
                    {tc.instrument_model?.manufacturer?.name}
                  </td>
                  <td className="py-3 px-3 text-center font-mono font-bold text-brass-700 dark:text-brass-400">
                    Class {tc.instrument_model?.accuracy_class}
                  </td>
                  <td className="py-3 px-3 text-graphite-600 dark:text-graphite-400">
                    {tc.organization?.name.replace("Regional Reference Standard Laboratory", "RRSL")}
                  </td>
                  <td className="py-3 px-3">
                    <StatusBadge status={tc.status} size="sm" />
                  </td>
                  <td className="py-3 px-3 text-right">
                    <Link href={`/test-studio?caseId=${tc.id}`}>
                      <MetroButton variant="secondary" size="sm">
                        Enter Observations
                      </MetroButton>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
