"use client";

import React, { useState } from "react";
import { 
  Building2, 
  Scale, 
  Award, 
  Calendar, 
  CheckCircle2, 
  AlertTriangle, 
  Plus, 
  ShieldCheck, 
  Mail, 
  Phone 
} from "lucide-react";
import { Card } from "@/components/ui/Card";
import { MetroButton } from "@/components/ui/MetroButton";
import { MetroInput } from "@/components/ui/MetroInput";
import { getReferenceStandards, AUTHENTIC_ORGANIZATIONS } from "@/lib/db/metrology-db";

export default function LaboratoryPage() {
  const organizations = AUTHENTIC_ORGANIZATIONS;
  const [standards, setStandards] = useState(getReferenceStandards());
  const [isModalOpen, setIsModalOpen] = useState(false);

  // New Standard Form
  const [name, setName] = useState("");
  const [serialNo, setSerialNo] = useState("");
  const [accuracyGrade, setAccuracyGrade] = useState("OIML Class F1");
  const [certificateNo, setCertificateNo] = useState("");
  const [calibrationDate, setCalibrationDate] = useState("2026-01-10");
  const [calibrationDueDate, setCalibrationDueDate] = useState("2027-01-09");
  const [calibratedBy, setCalibratedBy] = useState("National Physical Laboratory (CSIR-NPL), New Delhi");

  const handleCreateStandard = (e: React.FormEvent) => {
    e.preventDefault();
    const newStd = {
      id: `std-${Date.now()}`,
      organization_id: organizations[0].id,
      name,
      serial_no: serialNo,
      accuracy_grade: accuracyGrade,
      certificate_no: certificateNo,
      calibration_date: calibrationDate,
      calibration_due_date: calibrationDueDate,
      calibrated_by: calibratedBy,
    };
    setStandards([...standards, newStd]);
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-graphite-950 dark:text-graphite-50 tracking-tight flex items-center gap-2">
            <Building2 className="w-5 h-5 text-brass-500" />
            <span>Designated Laboratories & Reference Standards Register</span>
          </h1>
          <p className="text-xs text-graphite-500 dark:text-graphite-400 mt-0.5">
            Accreditation management and calibration traceability for reference test weights used in OIML R-76 evaluations.
          </p>
        </div>

        <MetroButton
          variant="primary"
          icon={<Plus className="w-4 h-4" />}
          onClick={() => setIsModalOpen(true)}
        >
          Register Reference Standard
        </MetroButton>
      </div>

      {/* Designated Laboratories Cards */}
      <div className="space-y-3">
        <h2 className="text-xs font-semibold uppercase tracking-wider text-graphite-500">
          Designated Central Testing Laboratories
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {organizations.map((org) => (
            <Card key={org.id} accent className="flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-bold text-xs text-graphite-900 dark:text-graphite-100">
                      {org.name}
                    </h3>
                    <span className="font-mono text-[10px] text-brass-700 dark:text-brass-400 font-semibold block mt-0.5">
                      {org.nabl_code}
                    </span>
                  </div>
                  <Award className="w-5 h-5 text-brass-500 shrink-0" />
                </div>

                <p className="text-[11px] text-graphite-600 dark:text-graphite-400">
                  {org.address}
                </p>

                <div className="pt-2 border-t border-graphite-200 dark:border-graphite-800 space-y-1 text-xs text-graphite-500 font-mono">
                  <div className="flex items-center gap-1.5">
                    <Mail className="w-3.5 h-3.5 text-graphite-400" />
                    <span className="text-[11px]">{org.contact_email}</span>
                  </div>
                  {org.contact_phone && (
                    <div className="flex items-center gap-1.5">
                      <Phone className="w-3.5 h-3.5 text-graphite-400" />
                      <span className="text-[11px]">{org.contact_phone}</span>
                    </div>
                  )}
                </div>
              </div>

              <div className="mt-3 pt-2 border-t border-graphite-200 dark:border-graphite-800 flex items-center justify-between text-[11px]">
                <span className="text-verified-600 font-semibold flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5" /> NABL Accredited
                </span>
                <span className="text-graphite-500">Scope: NAWI Classes I - IV</span>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Reference Test Weights Register */}
      <div className="space-y-3">
        <h2 className="text-xs font-semibold uppercase tracking-wider text-graphite-500">
          Traceable Reference Test Weights & Mass Standards
        </h2>

        <div className="overflow-x-auto border border-graphite-200 dark:border-graphite-800 rounded-sm bg-paper dark:bg-graphite-900 shadow-metro">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-graphite-200 dark:border-graphite-800 text-graphite-500 uppercase font-semibold text-[11px] bg-graphite-50 dark:bg-graphite-950/60">
                <th className="py-2.5 px-3">Serial / ID</th>
                <th className="py-2.5 px-3">Standard Description</th>
                <th className="py-2.5 px-3">Accuracy Grade</th>
                <th className="py-2.5 px-3">Calibration Certificate</th>
                <th className="py-2.5 px-3">Calibrated By</th>
                <th className="py-2.5 px-3">Calibration Due Date</th>
                <th className="py-2.5 px-3 text-center">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-graphite-200 dark:divide-graphite-800 font-mono">
              {standards.map((st) => {
                const dueDate = new Date(st.calibration_due_date);
                const isExpired = dueDate < new Date();
                const isDueSoon = !isExpired && (dueDate.getTime() - Date.now()) < (30 * 24 * 60 * 60 * 1000);

                return (
                  <tr key={st.id} className="hover:bg-graphite-50 dark:hover:bg-graphite-800/40 transition-colors">
                    <td className="py-3 px-3 font-bold text-graphite-900 dark:text-graphite-100">
                      {st.serial_no}
                    </td>
                    <td className="py-3 px-3 font-sans text-graphite-800 dark:text-graphite-200">
                      {st.name}
                    </td>
                    <td className="py-3 px-3 text-brass-700 dark:text-brass-400 font-semibold">
                      {st.accuracy_grade}
                    </td>
                    <td className="py-3 px-3 text-graphite-600 dark:text-graphite-400">
                      {st.certificate_no}
                    </td>
                    <td className="py-3 px-3 font-sans text-graphite-600 dark:text-graphite-400 text-[11px]">
                      {st.calibrated_by}
                    </td>
                    <td className="py-3 px-3">
                      {dueDate.toLocaleDateString("en-IN")}
                    </td>
                    <td className="py-3 px-3 text-center">
                      {isExpired ? (
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-fail-100 text-fail-800 border border-fail-300">
                          CALIBRATION EXPIRED
                        </span>
                      ) : isDueSoon ? (
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-tolerance-100 text-tolerance-800 border border-tolerance-300">
                          DUE SOON
                        </span>
                      ) : (
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-verified-100 text-verified-800 border border-verified-300">
                          VALID & TRACEABLE
                        </span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Register Standard Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-paper dark:bg-graphite-900 border border-graphite-300 dark:border-graphite-700 rounded-sm shadow-metro-lg max-w-lg w-full p-6 space-y-4">
            <h2 className="text-base font-bold text-graphite-900 dark:text-graphite-100 flex items-center gap-2">
              <Scale className="w-4 h-4 text-brass-500" />
              <span>Register Reference Mass Standard</span>
            </h2>

            <form onSubmit={handleCreateStandard} className="space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <MetroInput
                  label="Standard Serial / Tag"
                  placeholder="e.g. RRSLB-WT-F1-09"
                  value={serialNo}
                  onChange={(e) => setSerialNo(e.target.value)}
                  required
                />
                <div>
                  <label className="font-semibold text-graphite-700 dark:text-graphite-300 block mb-1">
                    Accuracy Grade
                  </label>
                  <select
                    value={accuracyGrade}
                    onChange={(e) => setAccuracyGrade(e.target.value)}
                    className="w-full bg-paper dark:bg-graphite-950 border border-graphite-300 dark:border-graphite-700 p-2 rounded text-xs"
                  >
                    <option value="OIML Class E1">OIML Class E1</option>
                    <option value="OIML Class E2">OIML Class E2</option>
                    <option value="OIML Class F1">OIML Class F1</option>
                    <option value="OIML Class F2">OIML Class F2</option>
                    <option value="OIML Class M1">OIML Class M1</option>
                  </select>
                </div>
              </div>

              <MetroInput
                label="Standard Name / Description"
                placeholder="e.g. Stainless Steel Precision Weights (1g to 10kg)"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />

              <div className="grid grid-cols-2 gap-3">
                <MetroInput
                  label="Calibration Certificate No."
                  placeholder="e.g. NPL/MASS/2026/0501"
                  value={certificateNo}
                  onChange={(e) => setCertificateNo(e.target.value)}
                  required
                />
                <MetroInput
                  label="Calibration Due Date"
                  type="date"
                  value={calibrationDueDate}
                  onChange={(e) => setCalibrationDueDate(e.target.value)}
                  required
                />
              </div>

              <MetroInput
                label="Calibrated By / Traceability Authority"
                value={calibratedBy}
                onChange={(e) => setCalibratedBy(e.target.value)}
              />

              <div className="flex justify-end gap-2 pt-2">
                <MetroButton
                  type="button"
                  variant="secondary"
                  onClick={() => setIsModalOpen(false)}
                >
                  Cancel
                </MetroButton>
                <MetroButton type="submit" variant="primary">
                  Save Reference Standard
                </MetroButton>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
