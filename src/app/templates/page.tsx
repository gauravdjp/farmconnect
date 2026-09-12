"use client";

import React, { useState } from "react";
import { 
  Database, 
  Plus, 
  Edit3, 
  Layers, 
  CheckCircle2, 
  ShieldCheck, 
  Sliders, 
  FileCode,
  Sparkles,
  GitBranch
} from "lucide-react";
import { Card } from "@/components/ui/Card";
import { MetroButton } from "@/components/ui/MetroButton";
import { MetroInput } from "@/components/ui/MetroInput";
import { getTestTemplates } from "@/lib/db/metrology-db";

export default function TemplatesPage() {
  const [templates, setTemplates] = useState(getTestTemplates());
  const [selectedTemplate, setSelectedTemplate] = useState(templates[0]);
  const [isPublishModalOpen, setIsPublishModalOpen] = useState(false);
  const [newVersionTag, setNewVersionTag] = useState("R76-revised-v2");

  const handlePublishVersion = (e: React.FormEvent) => {
    e.preventDefault();
    const updated = {
      ...selectedTemplate,
      version: newVersionTag,
    };
    setTemplates((prev) => [updated, ...prev]);
    setSelectedTemplate(updated);
    setIsPublishModalOpen(false);
    alert(`Successfully published test template version: ${newVersionTag}`);
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-graphite-950 dark:text-graphite-50 tracking-tight flex items-center gap-2">
            <Database className="w-5 h-5 text-brass-500" />
            <span>Configurable OIML Test Template Engine</span>
          </h1>
          <p className="text-xs text-graphite-500 dark:text-graphite-400 mt-0.5">
            Architecture for future OIML recommendation revisions. Add or modify test types, input schemas, and tolerance rules via configuration without code redeployment.
          </p>
        </div>

        <MetroButton
          variant="primary"
          icon={<GitBranch className="w-4 h-4" />}
          onClick={() => setIsPublishModalOpen(true)}
        >
          Publish New Version
        </MetroButton>
      </div>

      {/* Main Grid: Template Selector + Editor */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left: Template Catalog List */}
        <div className="lg:col-span-5 space-y-3">
          <h2 className="text-xs font-semibold uppercase tracking-wider text-graphite-500">
            Active OIML Test Catalog ({templates.length} Templates)
          </h2>

          <div className="space-y-2">
            {templates.map((tpl) => {
              const isSelected = selectedTemplate.id === tpl.id;
              return (
                <div
                  key={`${tpl.code}-${tpl.version}`}
                  onClick={() => setSelectedTemplate(tpl)}
                  className={`p-3 rounded-sm border cursor-pointer transition-all ${
                    isSelected
                      ? "border-brass-500 bg-brass-50/70 dark:bg-brass-950/40 shadow-metro"
                      : "border-graphite-200 dark:border-graphite-800 bg-paper dark:bg-graphite-900 hover:bg-graphite-50 dark:hover:bg-graphite-800/50"
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <span className="font-mono text-[10px] font-bold text-brass-700 dark:text-brass-400 bg-brass-100 dark:bg-brass-900/60 px-1.5 py-0.5 rounded">
                        {tpl.code}
                      </span>
                      <h3 className="font-semibold text-xs text-graphite-900 dark:text-graphite-100 mt-1">
                        {tpl.name}
                      </h3>
                    </div>
                    <span className="font-mono text-[10px] text-graphite-500 border border-graphite-300 dark:border-graphite-700 px-1.5 py-0.5 rounded">
                      {tpl.version}
                    </span>
                  </div>

                  <p className="text-[11px] text-graphite-600 dark:text-graphite-400 mt-1.5 line-clamp-2">
                    {tpl.description}
                  </p>

                  <div className="mt-2.5 pt-2 border-t border-graphite-200 dark:border-graphite-800 flex items-center justify-between text-[10px] font-mono">
                    <span className="text-graphite-500">{tpl.clause_ref}</span>
                    <span className="text-verified-600 font-semibold">
                      {tpl.is_mandatory ? "Mandatory" : "Conditional"}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right: Template Schema & Parameter Editor */}
        <div className="lg:col-span-7 space-y-4">
          <Card
            title={`Template Configuration: ${selectedTemplate.name}`}
            subtitle={`Version: ${selectedTemplate.version} • Clause: ${selectedTemplate.clause_ref}`}
            accent
          >
            <div className="space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <MetroInput
                  label="Test Code Identifier"
                  value={selectedTemplate.code}
                  disabled
                />
                <MetroInput
                  label="Standard Clause Citation"
                  value={selectedTemplate.clause_ref || ""}
                  onChange={(e) => setSelectedTemplate({ ...selectedTemplate, clause_ref: e.target.value })}
                />
              </div>

              <div>
                <label className="font-semibold text-graphite-700 dark:text-graphite-300 block mb-1">
                  Applicable Accuracy Classes
                </label>
                <div className="flex items-center gap-3">
                  {["I", "II", "III", "IIII"].map((cls) => (
                    <label key={cls} className="flex items-center gap-1.5 font-mono">
                      <input
                        type="checkbox"
                        checked={selectedTemplate.applicable_classes.includes(cls as any)}
                        onChange={() => {}}
                        className="rounded border-graphite-300 text-brass-600 focus:ring-brass-500"
                      />
                      <span>Class {cls}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="font-semibold text-graphite-700 dark:text-graphite-300 block mb-1">
                  Metrological Procedure Description
                </label>
                <textarea
                  rows={3}
                  value={selectedTemplate.description}
                  onChange={(e) => setSelectedTemplate({ ...selectedTemplate, description: e.target.value })}
                  className="w-full bg-paper dark:bg-graphite-950 border border-graphite-300 dark:border-graphite-700 p-2.5 rounded text-xs text-graphite-900 dark:text-graphite-100"
                />
              </div>

              {/* Dynamic Field Schema Definition */}
              <div className="space-y-2 pt-2 border-t border-graphite-200 dark:border-graphite-800">
                <div className="flex items-center justify-between">
                  <h4 className="font-semibold uppercase tracking-wider text-graphite-700 dark:text-graphite-300 text-[11px]">
                    Configured Observation Fields
                  </h4>
                  <span className="font-mono text-[10px] text-brass-700">Dynamic Renderer Enabled</span>
                </div>

                <div className="bg-graphite-50 dark:bg-graphite-950 p-3 rounded border border-graphite-200 dark:border-graphite-800 space-y-2 font-mono text-[11px]">
                  <div className="flex justify-between border-b border-graphite-200 dark:border-graphite-800 pb-1 font-bold text-graphite-600">
                    <span>Field Code</span>
                    <span>Type</span>
                    <span>Feeds MPE</span>
                  </div>
                  <div className="flex justify-between">
                    <span>applied_load</span>
                    <span className="text-brass-600 font-bold">NUMERIC (kg)</span>
                    <span className="text-verified-600 font-bold">YES</span>
                  </div>
                  <div className="flex justify-between">
                    <span>indicated_value_inc</span>
                    <span className="text-brass-600 font-bold">NUMERIC (kg)</span>
                    <span className="text-verified-600 font-bold">YES</span>
                  </div>
                  <div className="flex justify-between">
                    <span>indicated_value_dec</span>
                    <span className="text-brass-600 font-bold">NUMERIC (kg)</span>
                    <span className="text-verified-600 font-bold">YES</span>
                  </div>
                </div>
              </div>

              <div className="pt-2 flex justify-end">
                <MetroButton variant="primary" size="sm">
                  Save Template Draft
                </MetroButton>
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* Publish Version Modal */}
      {isPublishModalOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-paper dark:bg-graphite-900 border border-graphite-300 dark:border-graphite-700 rounded-sm shadow-metro-lg max-w-md w-full p-6 space-y-4">
            <h2 className="text-base font-bold text-graphite-900 dark:text-graphite-100 flex items-center gap-2">
              <GitBranch className="w-4 h-4 text-brass-500" />
              <span>Publish OIML Revision Version</span>
            </h2>

            <form onSubmit={handlePublishVersion} className="space-y-4 text-xs">
              <MetroInput
                label="New Version Tag"
                value={newVersionTag}
                onChange={(e) => setNewVersionTag(e.target.value)}
                helperText="e.g. R76-revised-v2 (Creates immutable new template version without altering historical cases)"
                required
              />

              <div className="p-3 bg-brass-50 dark:bg-brass-950/40 border border-brass-500/30 rounded text-[11px] text-brass-800 dark:text-brass-300">
                Rule 6 & Rule 8 Compliance: Prior evaluation dossiers remain linked to their original template version to preserve legal defensibility.
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <MetroButton
                  type="button"
                  variant="secondary"
                  onClick={() => setIsPublishModalOpen(false)}
                >
                  Cancel
                </MetroButton>
                <MetroButton type="submit" variant="primary">
                  Publish Version
                </MetroButton>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
