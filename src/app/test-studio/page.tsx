"use client";

import React, { useState } from "react";
import { 
  Scale, 
  CheckCircle2, 
  AlertTriangle, 
  Save, 
  RotateCcw, 
  FileText, 
  Thermometer, 
  Droplets,
  Calendar,
  Sparkles,
  Info
} from "lucide-react";
import { Card } from "@/components/ui/Card";
import { MetroButton } from "@/components/ui/MetroButton";
import { MetroInput } from "@/components/ui/MetroInput";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { ComplianceDial } from "@/components/ui/ComplianceDial";
import { PlatformVisualizer, PlatformPositionCode, PositionStatus } from "@/components/ui/PlatformVisualizer";
import { getTestCases, getReferenceStandards } from "@/lib/db/metrology-db";
import { computeMPE, evaluateReading, computeRepeatability } from "@/lib/calc-engine/mpe";

export default function TestObservationStudio() {
  const testCases = getTestCases();
  const standards = getReferenceStandards();

  const [selectedCaseId, setSelectedCaseId] = useState<string>(testCases[0].id);
  const selectedCase = testCases.find((tc) => tc.id === selectedCaseId) || testCases[0];
  const model = selectedCase.instrument_model!;

  // Active Tab / Test Module
  const [activeTest, setActiveTest] = useState<
    "ACCURACY" | "ECCENTRICITY" | "REPEATABILITY" | "DISCRIMINATION" | "TARE"
  >("ACCURACY");

  // Environmental Conditions State
  const [temp, setTemp] = useState<number>(21.4);
  const [humidity, setHumidity] = useState<number>(54.2);
  const [standardId, setStandardId] = useState<string>(standards[0].id);

  // --- Accuracy Test State (5 Load Points from Min to Max) ---
  const initialLoadPoints = [
    { load: 0.2, inc: 0.200, dec: 0.200 },  // Min load (200g)
    { load: 5.0, inc: 5.002, dec: 5.003 },  // 5 kg (500e - Tier 1 boundary)
    { load: 10.0, inc: 10.007, dec: 10.008 }, // 10 kg (1000e - Tier 2)
    { load: 20.0, inc: 20.008, dec: 20.009 }, // 20 kg (2000e - Tier 2 boundary)
    { load: 30.0, inc: 30.012, dec: 30.012 }, // Max load (3000e - Tier 3)
  ];
  const [accuracyRows, setAccuracyRows] = useState(initialLoadPoints);
  const [activeDialIndex, setActiveDialIndex] = useState<number>(2);

  // --- Eccentricity Test State ---
  const [selectedEccPos, setSelectedEccPos] = useState<PlatformPositionCode>("POS_CENTER");
  const testEccLoad = (model.max_capacity / 3).toFixed(2); // 1/3 Max
  const [eccPositions, setEccPositions] = useState<Record<PlatformPositionCode, PositionStatus>>({
    POS_CENTER: { position: "POS_CENTER", label: "Center", indicated: 10.002, error: 0.002, mpe: 0.01, verdict: "PASS" },
    POS_1: { position: "POS_1", label: "Corner 1 (Top-Left)", indicated: 10.004, error: 0.004, mpe: 0.01, verdict: "PASS" },
    POS_2: { position: "POS_2", label: "Corner 2 (Top-Right)", indicated: 10.006, error: 0.006, mpe: 0.01, verdict: "PASS" },
    POS_3: { position: "POS_3", label: "Corner 3 (Bottom-Left)", indicated: 10.005, error: 0.005, mpe: 0.01, verdict: "PASS" },
    POS_4: { position: "POS_4", label: "Corner 4 (Bottom-Right)", indicated: 10.007, error: 0.007, mpe: 0.01, verdict: "PASS" },
  });

  // --- Repeatability State (6 loadings at 20 kg) ---
  const [repeatabilityReadings, setRepeatabilityReadings] = useState<number[]>([
    20.004, 20.002, 20.006, 20.003, 20.005, 20.004
  ]);

  const repeatabilityEval = computeRepeatability(
    repeatabilityReadings,
    20.0,
    model.accuracy_class,
    model.verification_interval
  );

  // Active Accuracy Row Calculation
  const activeRow = accuracyRows[activeDialIndex] || accuracyRows[0];
  const activeEval = evaluateReading(
    activeRow.inc,
    activeRow.load,
    model.accuracy_class,
    model.verification_interval
  );

  return (
    <div className="space-y-6 pb-12">
      {/* Dossier Selector & Environmental Header */}
      <div className="bg-paper dark:bg-graphite-900 border border-graphite-200 dark:border-graphite-800 rounded-sm p-4 shadow-metro">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
          <div className="md:col-span-5">
            <label className="text-xs font-semibold uppercase tracking-wider text-graphite-500 block mb-1">
              Active Evaluation Dossier
            </label>
            <select
              value={selectedCaseId}
              onChange={(e) => setSelectedCaseId(e.target.value)}
              className="w-full bg-paper dark:bg-graphite-950 border border-graphite-300 dark:border-graphite-700 rounded-sm px-3 py-1.5 text-xs font-semibold text-graphite-900 dark:text-graphite-100"
            >
              {testCases.map((tc) => (
                <option key={tc.id} value={tc.id}>
                  {tc.case_number} — {tc.instrument_model?.model_name} (Class {tc.instrument_model?.accuracy_class})
                </option>
              ))}
            </select>
          </div>

          {/* Environmental Conditions Live Strip */}
          <div className="md:col-span-7 flex flex-wrap items-center justify-end gap-3 text-xs">
            <div className="flex items-center gap-1.5 bg-graphite-100 dark:bg-graphite-950 px-2.5 py-1 rounded border border-graphite-200 dark:border-graphite-800">
              <Thermometer className="w-3.5 h-3.5 text-brass-500" />
              <span className="text-graphite-500">Temp:</span>
              <input
                type="number"
                value={temp}
                onChange={(e) => setTemp(parseFloat(e.target.value) || 0)}
                className="w-12 font-mono font-bold bg-transparent text-graphite-900 dark:text-graphite-100 border-b border-graphite-400 text-center"
              />
              <span className="font-mono text-graphite-500">°C</span>
            </div>

            <div className="flex items-center gap-1.5 bg-graphite-100 dark:bg-graphite-950 px-2.5 py-1 rounded border border-graphite-200 dark:border-graphite-800">
              <Droplets className="w-3.5 h-3.5 text-blue-500" />
              <span className="text-graphite-500">Humidity:</span>
              <input
                type="number"
                value={humidity}
                onChange={(e) => setHumidity(parseFloat(e.target.value) || 0)}
                className="w-12 font-mono font-bold bg-transparent text-graphite-900 dark:text-graphite-100 border-b border-graphite-400 text-center"
              />
              <span className="font-mono text-graphite-500">% RH</span>
            </div>

            <div className="flex items-center gap-1.5 bg-graphite-100 dark:bg-graphite-950 px-2.5 py-1 rounded border border-graphite-200 dark:border-graphite-800">
              <Scale className="w-3.5 h-3.5 text-verified-500" />
              <span className="text-graphite-500">Standard:</span>
              <select
                value={standardId}
                onChange={(e) => setStandardId(e.target.value)}
                className="bg-transparent font-mono text-[11px] font-semibold text-graphite-800 dark:text-graphite-200"
              >
                {standards.map((st) => (
                  <option key={st.id} value={st.id}>
                    {st.serial_no} ({st.accuracy_grade})
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Test Module Navigation Tabs */}
      <div className="flex items-center gap-2 border-b border-graphite-200 dark:border-graphite-800 pb-1 overflow-x-auto">
        {[
          { id: "ACCURACY", label: "1. Weighing Performance (Accuracy)", clause: "A.4.4" },
          { id: "ECCENTRICITY", label: "2. Eccentricity / Off-Centre", clause: "A.4.7" },
          { id: "REPEATABILITY", label: "3. Repeatability", clause: "A.4.10" },
          { id: "DISCRIMINATION", label: "4. Discrimination (1.4d)", clause: "A.4.8" },
          { id: "TARE", label: "5. Tare Setting", clause: "A.4.11" },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTest(tab.id as typeof activeTest)}
            className={`px-3 py-2 text-xs font-semibold rounded-t flex items-center gap-2 transition-colors shrink-0 ${
              activeTest === tab.id
                ? "bg-brass-500 text-white shadow-sm border-t-2 border-brass-600"
                : "text-graphite-600 dark:text-graphite-400 hover:bg-graphite-100 dark:hover:bg-graphite-800"
            }`}
          >
            <span>{tab.label}</span>
            <span className={`text-[10px] font-mono px-1 rounded ${
              activeTest === tab.id ? "bg-brass-700 text-white" : "bg-graphite-200 dark:bg-graphite-700 text-graphite-600"
            }`}>
              {tab.clause}
            </span>
          </button>
        ))}
      </div>

      {/* TAB 1: WEIGHING PERFORMANCE / ACCURACY TEST */}
      {activeTest === "ACCURACY" && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          <div className="lg:col-span-8 space-y-4">
            <Card
              title="Weighing Performance Observation Sheet (Increasing & Decreasing Loads)"
              subtitle={`OIML R-76-1 Clause A.4.4 & A.4.6 — Max = ${model.max_capacity} ${model.capacity_unit}, e = ${model.verification_interval} ${model.capacity_unit}`}
              accent
            >
              <div className="overflow-x-auto">
                <table className="w-full text-xs text-left">
                  <thead>
                    <tr className="border-b border-graphite-200 dark:border-graphite-800 text-graphite-500 uppercase font-semibold text-[11px]">
                      <th className="py-2 px-2">#</th>
                      <th className="py-2 px-2">Applied Load (L)</th>
                      <th className="py-2 px-2">Intervals (m/e)</th>
                      <th className="py-2 px-2">Indicated (I_inc)</th>
                      <th className="py-2 px-2">Error (E_inc)</th>
                      <th className="py-2 px-2">Indicated (I_dec)</th>
                      <th className="py-2 px-2">Hysteresis</th>
                      <th className="py-2 px-2">MPE (±)</th>
                      <th className="py-2 px-2 text-center">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-graphite-200 dark:divide-graphite-800 font-mono">
                    {accuracyRows.map((row, idx) => {
                      const loadInE = row.load / model.verification_interval;
                      const mpeVal = computeMPE(model.accuracy_class, model.verification_interval, row.load);
                      const errorInc = row.inc - row.load;
                      const hysteresis = Math.abs(row.dec - row.inc);
                      const isRowPass = Math.abs(errorInc) <= mpeVal.toNumber();
                      const isSelected = activeDialIndex === idx;

                      return (
                        <tr
                          key={idx}
                          onClick={() => setActiveDialIndex(idx)}
                          className={`cursor-pointer transition-colors ${
                            isSelected
                              ? "bg-brass-50 dark:bg-brass-950/30"
                              : "hover:bg-graphite-50 dark:hover:bg-graphite-800/40"
                          }`}
                        >
                          <td className="py-2.5 px-2 font-sans font-medium text-graphite-500">
                            {idx + 1}
                          </td>
                          <td className="py-2.5 px-2 font-bold text-graphite-900 dark:text-graphite-100">
                            {row.load.toFixed(model.capacity_unit === "g" ? 2 : 3)} {model.capacity_unit}
                          </td>
                          <td className="py-2.5 px-2 text-graphite-600 dark:text-graphite-400">
                            {loadInE.toFixed(0)} e
                          </td>
                          <td className="py-2.5 px-2">
                            <input
                              type="number"
                              step="any"
                              value={row.inc}
                              onChange={(e) => {
                                const val = parseFloat(e.target.value) || 0;
                                setAccuracyRows((prev) => {
                                  const updated = [...prev];
                                  updated[idx] = { ...updated[idx], inc: val };
                                  return updated;
                                });
                              }}
                              className="w-20 bg-paper dark:bg-graphite-900 border border-graphite-300 dark:border-graphite-700 px-1.5 py-0.5 rounded text-xs"
                            />
                          </td>
                          <td className={`py-2.5 px-2 font-bold ${
                            isRowPass ? "text-verified-600" : "text-fail-600"
                          }`}>
                            {errorInc > 0 ? `+${errorInc.toFixed(4)}` : errorInc.toFixed(4)}
                          </td>
                          <td className="py-2.5 px-2">
                            <input
                              type="number"
                              step="any"
                              value={row.dec}
                              onChange={(e) => {
                                const val = parseFloat(e.target.value) || 0;
                                setAccuracyRows((prev) => {
                                  const updated = [...prev];
                                  updated[idx] = { ...updated[idx], dec: val };
                                  return updated;
                                });
                              }}
                              className="w-20 bg-paper dark:bg-graphite-900 border border-graphite-300 dark:border-graphite-700 px-1.5 py-0.5 rounded text-xs"
                            />
                          </td>
                          <td className="py-2.5 px-2 text-graphite-600 dark:text-graphite-400">
                            {hysteresis.toFixed(4)}
                          </td>
                          <td className="py-2.5 px-2 text-brass-700 dark:text-brass-400 font-semibold">
                            ±{mpeVal.toFixed(4)}
                          </td>
                          <td className="py-2.5 px-2 text-center">
                            <span className={`px-1.5 py-0.5 rounded text-[10px] font-bold ${
                              isRowPass ? "bg-verified-100 text-verified-800" : "bg-fail-100 text-fail-800"
                            }`}>
                              {isRowPass ? "PASS" : "FAIL"}
                            </span>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              <div className="mt-4 pt-3 border-t border-graphite-200 dark:border-graphite-800 flex items-center justify-between">
                <span className="text-xs text-graphite-500 italic">
                  * Click any row to inspect its live tolerance envelope on the Compliance Dial.
                </span>
                <MetroButton variant="primary" size="sm" icon={<Save className="w-3.5 h-3.5" />}>
                  Save Accuracy Record
                </MetroButton>
              </div>
            </Card>
          </div>

          {/* Right Dial Inspection */}
          <div className="lg:col-span-4 space-y-4">
            <Card
              title="Point Tolerance Envelope"
              subtitle={`Point ${activeDialIndex + 1}: Load = ${activeRow.load} ${model.capacity_unit}`}
              accent
            >
              <ComplianceDial
                error={activeEval.error.toNumber()}
                mpe={activeEval.mpe.toNumber()}
                unit={model.capacity_unit}
                label={`E = ${activeEval.error.toFixed(4)} ${model.capacity_unit}`}
                size="md"
              />
            </Card>
          </div>
        </div>
      )}

      {/* TAB 2: ECCENTRICITY TEST */}
      {activeTest === "ECCENTRICITY" && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          <div className="lg:col-span-6 space-y-4">
            <PlatformVisualizer
              selectedPosition={selectedEccPos}
              onSelectPosition={(pos) => setSelectedEccPos(pos)}
              positions={eccPositions}
              testLoadDisplay={`${testEccLoad} ${model.capacity_unit} (1/3 Max)`}
            />
          </div>

          <div className="lg:col-span-6 space-y-4">
            <Card
              title={`Eccentricity Loading at ${eccPositions[selectedEccPos].label}`}
              subtitle="OIML R-76-1 Clause A.4.7 — 1/3 Max load applied across 4 corners and center."
              accent
            >
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  <MetroInput
                    label="Test Load Applied (L)"
                    unit={model.capacity_unit}
                    value={testEccLoad}
                    disabled
                  />
                  <MetroInput
                    label="Indicated Reading (I)"
                    unit={model.capacity_unit}
                    value={eccPositions[selectedEccPos].indicated || 0}
                    type="number"
                    step="any"
                    onChange={(e) => {
                      const val = parseFloat(e.target.value) || 0;
                      const err = val - parseFloat(testEccLoad);
                      const mpe = computeMPE(model.accuracy_class, model.verification_interval, testEccLoad).toNumber();
                      const verdict = Math.abs(err) <= mpe ? "PASS" : "FAIL";

                      setEccPositions((prev) => ({
                        ...prev,
                        [selectedEccPos]: {
                          ...prev[selectedEccPos],
                          indicated: val,
                          error: err,
                          mpe,
                          verdict,
                        },
                      }));
                    }}
                  />
                </div>

                <div className="bg-graphite-50 dark:bg-graphite-950 p-3 rounded border border-graphite-200 dark:border-graphite-800 space-y-1.5 text-xs">
                  <div className="flex justify-between">
                    <span className="text-graphite-600">Position Observed Error:</span>
                    <span className="font-mono font-bold text-graphite-900 dark:text-graphite-100">
                      {eccPositions[selectedEccPos].error !== undefined
                        ? `${eccPositions[selectedEccPos].error! > 0 ? "+" : ""}${eccPositions[selectedEccPos].error!.toFixed(4)} ${model.capacity_unit}`
                        : "--"}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-graphite-600">Permissible MPE:</span>
                    <span className="font-mono text-brass-700 font-semibold">
                      ±{eccPositions[selectedEccPos].mpe?.toFixed(4)} {model.capacity_unit}
                    </span>
                  </div>
                  <div className="flex justify-between pt-1 border-t border-graphite-200 dark:border-graphite-800">
                    <span className="font-semibold text-graphite-700">Position Compliance:</span>
                    <span className={`font-mono font-bold ${
                      eccPositions[selectedEccPos].verdict === "PASS" ? "text-verified-600" : "text-fail-600"
                    }`}>
                      {eccPositions[selectedEccPos].verdict}
                    </span>
                  </div>
                </div>

                <div className="pt-2">
                  <MetroButton variant="primary" size="sm" icon={<Save className="w-3.5 h-3.5" />}>
                    Save Eccentricity Results
                  </MetroButton>
                </div>
              </div>
            </Card>
          </div>
        </div>
      )}

      {/* TAB 3: REPEATABILITY TEST */}
      {activeTest === "REPEATABILITY" && (
        <Card
          title="Repeatability Test (Successive Loadings at 2/3 Max / Nominal Load)"
          subtitle="OIML R-76-1 Clause A.4.10 — 6 successive loadings under identical conditions."
          accent
        >
          <div className="space-y-4">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
              {repeatabilityReadings.map((r, idx) => (
                <div key={idx} className="space-y-1">
                  <label className="text-[11px] font-semibold text-graphite-500 uppercase">
                    Run #{idx + 1}
                  </label>
                  <input
                    type="number"
                    step="any"
                    value={r}
                    onChange={(e) => {
                      const val = parseFloat(e.target.value) || 0;
                      setRepeatabilityReadings((prev) => {
                        const next = [...prev];
                        next[idx] = val;
                        return next;
                      });
                    }}
                    className="w-full bg-paper dark:bg-graphite-900 border border-graphite-300 dark:border-graphite-700 px-2 py-1 text-xs font-mono font-bold text-graphite-900 dark:text-graphite-100 rounded"
                  />
                </div>
              ))}
            </div>

            {/* Repeatability Statistical Synthesis */}
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 bg-graphite-50 dark:bg-graphite-950 p-4 rounded border border-graphite-200 dark:border-graphite-800 text-xs">
              <div>
                <span className="text-graphite-500 block">Mean Reading</span>
                <span className="font-mono font-bold text-sm text-graphite-900 dark:text-graphite-100">
                  {repeatabilityEval.mean.toFixed(4)} {model.capacity_unit}
                </span>
              </div>
              <div>
                <span className="text-graphite-500 block">Spread / Range (Max - Min)</span>
                <span className="font-mono font-bold text-sm text-graphite-900 dark:text-graphite-100">
                  {repeatabilityEval.range.toFixed(4)} {model.capacity_unit}
                </span>
              </div>
              <div>
                <span className="text-graphite-500 block">Allowable MPE at 20kg</span>
                <span className="font-mono font-bold text-sm text-brass-700 dark:text-brass-400">
                  {repeatabilityEval.mpeAtLoad.toFixed(4)} {model.capacity_unit}
                </span>
              </div>
              <div>
                <span className="text-graphite-500 block">Legal Verdict</span>
                <span className={`font-mono font-bold text-sm ${
                  repeatabilityEval.isCompliant ? "text-verified-600" : "text-fail-600"
                }`}>
                  {repeatabilityEval.verdict} (Range ≤ MPE)
                </span>
              </div>
            </div>

            <div className="flex justify-end">
              <MetroButton variant="primary" size="sm" icon={<Save className="w-3.5 h-3.5" />}>
                Record Repeatability Series
              </MetroButton>
            </div>
          </div>
        </Card>
      )}

      {/* TAB 4: DISCRIMINATION TEST */}
      {activeTest === "DISCRIMINATION" && (
        <Card
          title="Discrimination (Sensitivity) Test"
          subtitle="OIML R-76-1 Clause A.4.8 — Addition of extra 1.4d load to verify display equilibrium response."
          accent
        >
          <div className="space-y-4 max-w-2xl text-xs">
            <p className="text-graphite-600 dark:text-graphite-400">
              An extra weight equal to <strong className="font-mono text-graphite-900 dark:text-graphite-100">1.4d = {(1.4 * (model.display_interval || model.verification_interval)).toFixed(3)} {model.capacity_unit}</strong> is
              gently deposited upon the loaded scale at Min, 1/2 Max, and Max. The scale display must deterministically advance by at least 1 scale division.
            </p>

            <div className="grid grid-cols-3 gap-3">
              <div className="p-3 bg-graphite-50 dark:bg-graphite-950 rounded border border-graphite-200 dark:border-graphite-800 space-y-2">
                <span className="font-bold text-graphite-900 dark:text-graphite-100 block">At Min (0.2 kg)</span>
                <div className="text-verified-600 font-semibold flex items-center gap-1">
                  <CheckCircle2 className="w-4 h-4" /> 1d Advance Verified
                </div>
              </div>
              <div className="p-3 bg-graphite-50 dark:bg-graphite-950 rounded border border-graphite-200 dark:border-graphite-800 space-y-2">
                <span className="font-bold text-graphite-900 dark:text-graphite-100 block">At 1/2 Max (15 kg)</span>
                <div className="text-verified-600 font-semibold flex items-center gap-1">
                  <CheckCircle2 className="w-4 h-4" /> 1d Advance Verified
                </div>
              </div>
              <div className="p-3 bg-graphite-50 dark:bg-graphite-950 rounded border border-graphite-200 dark:border-graphite-800 space-y-2">
                <span className="font-bold text-graphite-900 dark:text-graphite-100 block">At Max (30 kg)</span>
                <div className="text-verified-600 font-semibold flex items-center gap-1">
                  <CheckCircle2 className="w-4 h-4" /> 1d Advance Verified
                </div>
              </div>
            </div>

            <div className="pt-2">
              <MetroButton variant="primary" size="sm" icon={<Save className="w-3.5 h-3.5" />}>
                Confirm Discrimination Results
              </MetroButton>
            </div>
          </div>
        </Card>
      )}

      {/* TAB 5: TARE TEST */}
      {activeTest === "TARE" && (
        <Card
          title="Tare Device & Net Weighing Performance"
          subtitle="OIML R-76-1 Clause A.4.11 — Verification that net load errors do not exceed net-basis MPE."
          accent
        >
          <div className="space-y-4 text-xs">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <MetroInput
                label="Tare Container Weight"
                unit={model.capacity_unit}
                defaultValue="5.000"
                helperText="Subtractive tare set on instrument"
              />
              <MetroInput
                label="Net Test Load"
                unit={model.capacity_unit}
                defaultValue="10.000"
                helperText="Net weights applied inside container"
              />
              <MetroInput
                label="Indicated Net Reading"
                unit={model.capacity_unit}
                defaultValue="10.006"
                helperText="Net display value"
              />
            </div>

            <div className="p-3 bg-verified-50 dark:bg-verified-950/40 border border-verified-500/30 rounded flex items-center justify-between">
              <div>
                <span className="font-bold text-verified-800 dark:text-verified-200 block">
                  Tare Subtraction Compliant
                </span>
                <span className="text-verified-700 dark:text-verified-400 text-[11px]">
                  Observed Error (+0.006 kg) is strictly within allowable MPE on Net Basis (±0.010 kg).
                </span>
              </div>
              <StatusBadge status="PASS" size="sm" />
            </div>

            <div className="flex justify-end">
              <MetroButton variant="primary" size="sm" icon={<Save className="w-3.5 h-3.5" />}>
                Record Tare Test
              </MetroButton>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
}
