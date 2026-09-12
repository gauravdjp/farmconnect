"use client";

import React, { useState } from "react";
import { 
  Sliders, 
  Plus, 
  Building2, 
  CheckCircle2, 
  AlertCircle, 
  Scale, 
  Cpu, 
  Zap 
} from "lucide-react";
import { Card } from "@/components/ui/Card";
import { MetroButton } from "@/components/ui/MetroButton";
import { MetroInput } from "@/components/ui/MetroInput";
import { getInstrumentModels } from "@/lib/db/metrology-db";
import { validateInstrumentClass, AccuracyClass } from "@/lib/calc-engine/mpe";

export default function InstrumentsPage() {
  const [models, setModels] = useState(getInstrumentModels());
  const [isModalOpen, setIsModalOpen] = useState(false);

  // New Model Form State
  const [modelName, setModelName] = useState("");
  const [category, setCategory] = useState("Electronic Platform Scale");
  const [accuracyClass, setAccuracyClass] = useState<AccuracyClass>("III");
  const [maxCapacity, setMaxCapacity] = useState<number>(30.0);
  const [minCapacity, setMinCapacity] = useState<number>(0.2);
  const [verificationInterval, setVerificationInterval] = useState<number>(0.01);
  const [capacityUnit, setCapacityUnit] = useState("kg");
  const [powerSource, setPowerSource] = useState("230V AC mains 50Hz and rechargeable battery 6V");
  const [indicatorModel, setIndicatorModel] = useState("DI-166 Indicator");
  const [loadCellModel, setLoadCellModel] = useState("Zemic L6D Aluminum Transducer");

  // Live OIML R-76 Table 3 Interval Count Validation
  const validation = validateInstrumentClass(accuracyClass, maxCapacity, verificationInterval);

  const handleCreateModel = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validation.isValid) return;

    const newModel = {
      id: `model-${Date.now()}`,
      manufacturer_id: "bbbb1111-0000-0000-0000-000000000001",
      model_name: modelName,
      category,
      accuracy_class: accuracyClass,
      max_capacity: maxCapacity,
      min_capacity: minCapacity,
      verification_interval: verificationInterval,
      display_interval: verificationInterval,
      capacity_unit: capacityUnit,
      verification_interval_count: validation.n.toNumber(),
      power_source: powerSource,
      indicator_model: indicatorModel,
      load_cell_model: loadCellModel,
      created_at: new Date().toISOString(),
      manufacturer: {
        id: "bbbb1111-0000-0000-0000-000000000001",
        name: "Essae-Teraoka Private Limited",
        legal_address: "377/22, 6th Cross, Wilson Garden, Bengaluru - 560027",
        country: "India",
        contact_email: "compliance@essae.com",
        created_at: new Date().toISOString(),
      },
    };

    setModels([...models, newModel]);
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-graphite-950 dark:text-graphite-50 tracking-tight flex items-center gap-2">
            <Sliders className="w-5 h-5 text-brass-500" />
            <span>Instrument Models & Technical Specifications Master</span>
          </h1>
          <p className="text-xs text-graphite-500 dark:text-graphite-400 mt-0.5">
            Registry of manufacturer models submitted for OIML R-76 type approval with automatic metrological verification interval checking.
          </p>
        </div>

        <MetroButton
          variant="primary"
          icon={<Plus className="w-4 h-4" />}
          onClick={() => setIsModalOpen(true)}
        >
          Register New Model
        </MetroButton>
      </div>

      {/* Models List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {models.map((m) => (
          <Card key={m.id} accent className="flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-bold text-sm text-graphite-900 dark:text-graphite-100">
                    {m.model_name}
                  </h3>
                  <span className="text-[11px] text-graphite-500">{m.category}</span>
                </div>
                <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-brass-100 dark:bg-brass-900/50 text-brass-800 dark:text-brass-300 border border-brass-500/30">
                  Class {m.accuracy_class}
                </span>
              </div>

              {/* Technical Specifications Grid */}
              <div className="grid grid-cols-3 gap-2 bg-graphite-50 dark:bg-graphite-950/60 p-2.5 rounded border border-graphite-200 dark:border-graphite-800 font-mono text-xs">
                <div>
                  <span className="text-[10px] text-graphite-500 font-sans block">Max</span>
                  <span className="font-bold text-graphite-900 dark:text-graphite-100">
                    {m.max_capacity} {m.capacity_unit}
                  </span>
                </div>
                <div>
                  <span className="text-[10px] text-graphite-500 font-sans block">Interval (e)</span>
                  <span className="font-bold text-graphite-900 dark:text-graphite-100">
                    {m.verification_interval} {m.capacity_unit}
                  </span>
                </div>
                <div>
                  <span className="text-[10px] text-graphite-500 font-sans block">Intervals (n)</span>
                  <span className="font-bold text-brass-700 dark:text-brass-400">
                    {m.verification_interval_count.toLocaleString()}
                  </span>
                </div>
              </div>

              {/* Component Traceability */}
              <div className="space-y-1 text-xs text-graphite-600 dark:text-graphite-400">
                <div className="flex items-center gap-1.5 truncate">
                  <Building2 className="w-3.5 h-3.5 text-graphite-500 shrink-0" />
                  <span className="font-medium text-graphite-800 dark:text-graphite-200">
                    {m.manufacturer?.name}
                  </span>
                </div>
                <div className="flex items-center gap-1.5 truncate">
                  <Cpu className="w-3.5 h-3.5 text-graphite-500 shrink-0" />
                  <span>Indicator: {m.indicator_model}</span>
                </div>
                <div className="flex items-center gap-1.5 truncate">
                  <Scale className="w-3.5 h-3.5 text-graphite-500 shrink-0" />
                  <span>Load Cell: {m.load_cell_model}</span>
                </div>
                <div className="flex items-center gap-1.5 truncate">
                  <Zap className="w-3.5 h-3.5 text-graphite-500 shrink-0" />
                  <span>Power: {m.power_source}</span>
                </div>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-graphite-200 dark:border-graphite-800 flex items-center justify-between text-xs">
              <span className="text-verified-600 font-medium flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" /> OIML R-76 Compliant Specs
              </span>
              <span className="text-graphite-400 font-mono text-[10px]">
                {m.load_cell_cert_ref || "R-60 Certified"}
              </span>
            </div>
          </Card>
        ))}
      </div>

      {/* Registration Modal with Live Validation */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-paper dark:bg-graphite-900 border border-graphite-300 dark:border-graphite-700 rounded-sm shadow-metro-lg max-w-xl w-full p-6 space-y-4 my-8">
            <h2 className="text-base font-bold text-graphite-900 dark:text-graphite-100 flex items-center gap-2">
              <Sliders className="w-4 h-4 text-brass-500" />
              <span>Register NAWI Instrument Model</span>
            </h2>

            <form onSubmit={handleCreateModel} className="space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <MetroInput
                  label="Model Designation / Name"
                  placeholder="e.g. DS-215 Platform Scale"
                  value={modelName}
                  onChange={(e) => setModelName(e.target.value)}
                  required
                />
                <div>
                  <label className="font-semibold text-graphite-700 dark:text-graphite-300 block mb-1">
                    Instrument Category
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full bg-paper dark:bg-graphite-950 border border-graphite-300 dark:border-graphite-700 p-2 rounded text-xs"
                  >
                    <option value="Electronic Platform Scale">Electronic Platform Scale</option>
                    <option value="Precision Balance">Precision Balance</option>
                    <option value="Counter Scale">Counter Scale</option>
                    <option value="Weighbridge">Weighbridge</option>
                  </select>
                </div>
              </div>

              {/* Metrological Accuracy Parameters */}
              <div className="p-3 bg-graphite-50 dark:bg-graphite-950 rounded border border-graphite-200 dark:border-graphite-800 space-y-3">
                <h4 className="font-semibold text-graphite-900 dark:text-graphite-100 text-xs uppercase tracking-wider">
                  Metrological Ratings (OIML R-76 Table 3)
                </h4>

                <div className="grid grid-cols-4 gap-2">
                  <div>
                    <label className="text-[10px] text-graphite-500 font-semibold block mb-1">
                      Accuracy Class
                    </label>
                    <select
                      value={accuracyClass}
                      onChange={(e) => setAccuracyClass(e.target.value as AccuracyClass)}
                      className="w-full bg-paper dark:bg-graphite-900 border border-graphite-300 dark:border-graphite-700 p-1.5 rounded text-xs font-mono font-bold"
                    >
                      <option value="I">Class I</option>
                      <option value="II">Class II</option>
                      <option value="III">Class III</option>
                      <option value="IIII">Class IIII</option>
                    </select>
                  </div>

                  <MetroInput
                    label="Max Capacity"
                    type="number"
                    step="any"
                    value={maxCapacity}
                    onChange={(e) => setMaxCapacity(parseFloat(e.target.value) || 0)}
                  />

                  <MetroInput
                    label="Interval (e)"
                    type="number"
                    step="any"
                    value={verificationInterval}
                    onChange={(e) => setVerificationInterval(parseFloat(e.target.value) || 0.001)}
                  />

                  <div>
                    <label className="text-[10px] text-graphite-500 font-semibold block mb-1">
                      Unit
                    </label>
                    <select
                      value={capacityUnit}
                      onChange={(e) => setCapacityUnit(e.target.value)}
                      className="w-full bg-paper dark:bg-graphite-900 border border-graphite-300 dark:border-graphite-700 p-1.5 rounded text-xs font-mono"
                    >
                      <option value="kg">kg</option>
                      <option value="g">g</option>
                      <option value="t">t</option>
                    </select>
                  </div>
                </div>

                {/* Live Interval Count Verification Feedback */}
                <div className={`p-2.5 rounded border text-xs flex items-center justify-between ${
                  validation.isValid
                    ? "bg-verified-50 dark:bg-verified-950/40 border-verified-500/30 text-verified-800 dark:text-verified-200"
                    : "bg-fail-50 dark:bg-fail-950/40 border-fail-500/30 text-fail-800 dark:text-fail-200"
                }`}>
                  <div className="flex items-center gap-2">
                    {validation.isValid ? (
                      <CheckCircle2 className="w-4 h-4 text-verified-600 shrink-0" />
                    ) : (
                      <AlertCircle className="w-4 h-4 text-fail-600 shrink-0" />
                    )}
                    <div>
                      <span className="font-semibold font-mono">
                        n = {validation.n.toFixed(0)} scale intervals
                      </span>
                      <p className="text-[11px] opacity-90">
                        {validation.isValid
                          ? `Legal for Class ${accuracyClass} (${validation.minN} ≤ n ≤ ${validation.maxN === Infinity ? "∞" : validation.maxN})`
                          : validation.reason}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Hardware Specifications */}
              <div className="grid grid-cols-2 gap-3">
                <MetroInput
                  label="Digital Indicator Unit"
                  value={indicatorModel}
                  onChange={(e) => setIndicatorModel(e.target.value)}
                />
                <MetroInput
                  label="Load Cell Model & Cert"
                  value={loadCellModel}
                  onChange={(e) => setLoadCellModel(e.target.value)}
                />
              </div>

              <MetroInput
                label="Power Supply"
                value={powerSource}
                onChange={(e) => setPowerSource(e.target.value)}
              />

              <div className="flex justify-end gap-2 pt-2">
                <MetroButton
                  type="button"
                  variant="secondary"
                  onClick={() => setIsModalOpen(false)}
                >
                  Cancel
                </MetroButton>
                <MetroButton
                  type="submit"
                  variant="primary"
                  disabled={!validation.isValid || !modelName}
                >
                  Register Model
                </MetroButton>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
