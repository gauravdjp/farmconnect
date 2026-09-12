"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  ClipboardCheck, 
  Plus, 
  Search, 
  Filter, 
  ArrowUpRight, 
  Scale, 
  Building2,
  Calendar,
  CheckCircle2
} from "lucide-react";
import { Card } from "@/components/ui/Card";
import { MetroButton } from "@/components/ui/MetroButton";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { getTestCases, getInstrumentModels } from "@/lib/db/metrology-db";

export default function TestCasesPage() {
  const [testCases, setTestCases] = useState(getTestCases());
  const models = getInstrumentModels();
  const [searchQuery, setSearchQuery] = useState("");
  const [classFilter, setClassFilter] = useState("ALL");
  const [statusFilter, setStatusFilter] = useState("ALL");

  // New Dossier Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedModelId, setSelectedModelId] = useState(models[0].id);

  const filteredCases = testCases.filter((tc) => {
    const matchesSearch = 
      tc.case_number.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tc.instrument_model?.model_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tc.instrument_model?.manufacturer?.name.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesClass = classFilter === "ALL" || tc.instrument_model?.accuracy_class === classFilter;
    const matchesStatus = statusFilter === "ALL" || tc.status === statusFilter;

    return matchesSearch && matchesClass && matchesStatus;
  });

  const handleCreateDossier = (e: React.FormEvent) => {
    e.preventDefault();
    const model = models.find((m) => m.id === selectedModelId)!;
    const newCaseNumber = `NAWI/2026/RRSLB/00${105 + testCases.length}`;

    const newCase = {
      id: `case-2026-${Date.now()}`,
      case_number: newCaseNumber,
      organization_id: "11111111-1111-1111-1111-111111111111",
      instrument_model_id: model.id,
      status: "IN_PROGRESS" as const,
      initiated_at: new Date().toISOString(),
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      instrument_model: model,
      organization: {
        id: "11111111-1111-1111-1111-111111111111",
        name: "Regional Reference Standard Laboratory (RRSL), Bengaluru",
        nabl_code: "NABL-CC-2144",
        address: "Bengaluru, Karnataka",
        state: "Karnataka",
        contact_email: "rrsl-bangalore@gov.in",
        is_active: true,
        created_at: new Date().toISOString(),
      },
    };

    setTestCases([newCase, ...testCases]);
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-graphite-950 dark:text-graphite-50 tracking-tight flex items-center gap-2">
            <ClipboardCheck className="w-5 h-5 text-brass-500" />
            <span>Type Evaluation Dossiers (NAWI)</span>
          </h1>
          <p className="text-xs text-graphite-500 dark:text-graphite-400 mt-0.5">
            Central repository of legal metrology model approval cases initiated across designated testing laboratories.
          </p>
        </div>

        <MetroButton
          variant="primary"
          icon={<Plus className="w-4 h-4" />}
          onClick={() => setIsModalOpen(true)}
        >
          Open New Test Dossier
        </MetroButton>
      </div>

      {/* Filter & Search Bar */}
      <Card>
        <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-center">
          <div className="sm:col-span-6 relative">
            <Search className="w-4 h-4 absolute left-3 top-2.5 text-graphite-400" />
            <input
              type="text"
              placeholder="Search by dossier number, model name, or manufacturer..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-paper dark:bg-graphite-900 border border-graphite-300 dark:border-graphite-700 pl-9 pr-3 py-1.5 text-xs text-graphite-900 dark:text-graphite-100 rounded-sm focus:outline-none focus:ring-1 focus:ring-brass-500"
            />
          </div>

          <div className="sm:col-span-3">
            <select
              value={classFilter}
              onChange={(e) => setClassFilter(e.target.value)}
              className="w-full bg-paper dark:bg-graphite-900 border border-graphite-300 dark:border-graphite-700 px-3 py-1.5 text-xs text-graphite-800 dark:text-graphite-200 rounded-sm focus:outline-none focus:ring-1 focus:ring-brass-500"
            >
              <option value="ALL">All Accuracy Classes</option>
              <option value="I">Class I (Special Accuracy)</option>
              <option value="II">Class II (High Accuracy)</option>
              <option value="III">Class III (Medium Accuracy)</option>
              <option value="IIII">Class IIII (Ordinary Accuracy)</option>
            </select>
          </div>

          <div className="sm:col-span-3">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full bg-paper dark:bg-graphite-900 border border-graphite-300 dark:border-graphite-700 px-3 py-1.5 text-xs text-graphite-800 dark:text-graphite-200 rounded-sm focus:outline-none focus:ring-1 focus:ring-brass-500"
            >
              <option value="ALL">All Statuses</option>
              <option value="IN_PROGRESS">In Progress</option>
              <option value="REVIEW">Awaiting Review</option>
              <option value="APPROVED">Approved & Certified</option>
              <option value="DRAFT">Draft</option>
            </select>
          </div>
        </div>
      </Card>

      {/* Dossiers Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredCases.map((tc) => (
          <Card key={tc.id} className="hover:border-brass-500 transition-colors flex flex-col justify-between">
            <div className="space-y-3">
              {/* Header */}
              <div className="flex items-start justify-between">
                <div>
                  <span className="font-mono text-xs font-bold text-brass-700 dark:text-brass-400 block">
                    {tc.case_number}
                  </span>
                  <span className="text-[11px] text-graphite-500">
                    Initiated: {new Date(tc.initiated_at).toLocaleDateString("en-IN")}
                  </span>
                </div>
                <StatusBadge status={tc.status} size="sm" />
              </div>

              {/* Model Info */}
              <div className="p-2.5 bg-graphite-50 dark:bg-graphite-950/60 rounded border border-graphite-200 dark:border-graphite-800 space-y-1">
                <div className="font-semibold text-xs text-graphite-900 dark:text-graphite-100 flex items-center justify-between">
                  <span>{tc.instrument_model?.model_name}</span>
                  <span className="font-mono text-[10px] px-1.5 py-0.5 rounded bg-brass-100 dark:bg-brass-900/40 text-brass-800 dark:text-brass-300">
                    Class {tc.instrument_model?.accuracy_class}
                  </span>
                </div>
                <p className="text-[11px] text-graphite-500 truncate">
                  {tc.instrument_model?.manufacturer?.name}
                </p>
                <div className="flex items-center justify-between text-[11px] font-mono text-graphite-600 dark:text-graphite-400 pt-1 border-t border-graphite-200 dark:border-graphite-800">
                  <span>Max: {tc.instrument_model?.max_capacity} {tc.instrument_model?.capacity_unit}</span>
                  <span>e: {tc.instrument_model?.verification_interval} {tc.instrument_model?.capacity_unit}</span>
                  <span>n: {tc.instrument_model?.verification_interval_count}</span>
                </div>
              </div>

              {/* Laboratory Attribution */}
              <div className="flex items-center gap-2 text-xs text-graphite-600 dark:text-graphite-400">
                <Building2 className="w-3.5 h-3.5 text-brass-600 shrink-0" />
                <span className="truncate">{tc.organization?.name}</span>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="mt-4 pt-3 border-t border-graphite-200 dark:border-graphite-800 flex items-center justify-between">
              <Link href={`/reports?caseId=${tc.id}`} className="text-xs text-graphite-500 hover:text-brass-600 font-medium">
                View Report Draft
              </Link>
              <Link href={`/test-studio?caseId=${tc.id}`}>
                <MetroButton variant="primary" size="sm">
                  Record Observations
                </MetroButton>
              </Link>
            </div>
          </Card>
        ))}
      </div>

      {/* Create New Dossier Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-paper dark:bg-graphite-900 border border-graphite-300 dark:border-graphite-700 rounded-sm shadow-metro-lg max-w-lg w-full p-6 space-y-4">
            <h2 className="text-base font-bold text-graphite-900 dark:text-graphite-100 flex items-center gap-2">
              <Plus className="w-4 h-4 text-brass-500" />
              <span>Initiate OIML R-76 Type Evaluation Dossier</span>
            </h2>

            <form onSubmit={handleCreateDossier} className="space-y-4 text-xs">
              <div>
                <label className="font-semibold text-graphite-700 dark:text-graphite-300 block mb-1">
                  Select Registered Instrument Model
                </label>
                <select
                  value={selectedModelId}
                  onChange={(e) => setSelectedModelId(e.target.value)}
                  className="w-full bg-paper dark:bg-graphite-950 border border-graphite-300 dark:border-graphite-700 p-2 rounded text-xs"
                >
                  {models.map((m) => (
                    <option key={m.id} value={m.id}>
                      {m.model_name} — {m.manufacturer?.name} (Class {m.accuracy_class}, Max={m.max_capacity}{m.capacity_unit})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="font-semibold text-graphite-700 dark:text-graphite-300 block mb-1">
                  Designated Evaluating Laboratory
                </label>
                <input
                  type="text"
                  value="Regional Reference Standard Laboratory (RRSL), Bengaluru [NABL-CC-2144]"
                  disabled
                  className="w-full bg-graphite-100 dark:bg-graphite-950 border border-graphite-300 dark:border-graphite-700 p-2 rounded text-xs text-graphite-600"
                />
              </div>

              <div className="p-3 bg-brass-50 dark:bg-brass-950/40 rounded border border-brass-500/30 text-[11px] text-brass-800 dark:text-brass-300">
                Opening this dossier assigns standard OIML R-76 evaluation checklist and binds future test observations to this legal entity.
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <MetroButton
                  type="button"
                  variant="secondary"
                  onClick={() => setIsModalOpen(false)}
                >
                  Cancel
                </MetroButton>
                <MetroButton type="submit" variant="primary">
                  Create Dossier
                </MetroButton>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
