"use client";

import React from "react";

export type PlatformPositionCode = "POS_CENTER" | "POS_1" | "POS_2" | "POS_3" | "POS_4";

export interface PositionStatus {
  position: PlatformPositionCode;
  label: string;
  indicated?: number;
  error?: number;
  mpe?: number;
  verdict?: "PASS" | "FAIL" | "PENDING";
}

interface PlatformVisualizerProps {
  selectedPosition?: PlatformPositionCode;
  onSelectPosition?: (pos: PlatformPositionCode) => void;
  positions: Record<PlatformPositionCode, PositionStatus>;
  platformShape?: "RECTANGULAR" | "CIRCULAR";
  testLoadDisplay?: string; // e.g. "10.00 kg (1/3 Max)"
}

export const PlatformVisualizer: React.FC<PlatformVisualizerProps> = ({
  selectedPosition = "POS_CENTER",
  onSelectPosition,
  positions,
  platformShape = "RECTANGULAR",
  testLoadDisplay = "1/3 Max",
}) => {
  const getStatusColor = (verdict?: "PASS" | "FAIL" | "PENDING") => {
    if (verdict === "PASS") return "#1E7A4C";
    if (verdict === "FAIL") return "#B23A34";
    return "#8B95A2";
  };

  return (
    <div className="flex flex-col items-center bg-paper dark:bg-graphite-900 border border-graphite-200 dark:border-graphite-800 rounded-sm p-4 shadow-metro">
      <div className="flex items-center justify-between w-full mb-3">
        <span className="text-xs font-semibold uppercase tracking-wider text-graphite-700 dark:text-graphite-300">
          Load-Receiving Surface (Eccentricity)
        </span>
        <span className="text-xs font-mono px-2 py-0.5 bg-brass-100 dark:bg-brass-900/40 text-brass-700 dark:text-brass-400 rounded">
          Test Load: {testLoadDisplay}
        </span>
      </div>

      {/* Visual Platform SVG Diagram */}
      <div className="relative w-64 h-64 my-2">
        <svg viewBox="0 0 240 240" className="w-full h-full">
          {/* Platform Outer Rim */}
          {platformShape === "RECTANGULAR" ? (
            <rect
              x="20"
              y="20"
              width="200"
              height="200"
              rx="6"
              fill="#FAF9F6"
              stroke="#B8C0CA"
              strokeWidth="2"
              className="dark:fill-graphite-950 dark:stroke-graphite-700"
            />
          ) : (
            <circle
              cx="120"
              cy="120"
              r="100"
              fill="#FAF9F6"
              stroke="#B8C0CA"
              strokeWidth="2"
              className="dark:fill-graphite-950 dark:stroke-graphite-700"
            />
          )}

          {/* Quadrant dividing guidelines (engineering crosshair) */}
          <line x1="120" y1="20" x2="120" y2="220" stroke="#D8DCE2" strokeWidth="1" strokeDasharray="3,3" className="dark:stroke-graphite-800" />
          <line x1="20" y1="120" x2="220" y2="120" stroke="#D8DCE2" strokeWidth="1" strokeDasharray="3,3" className="dark:stroke-graphite-800" />

          {/* Interactive Touch Target Nodes */}
          {/* Position 1: Top-Left (Quadrant 1) */}
          <g
            className="cursor-pointer transition-transform hover:scale-105"
            onClick={() => onSelectPosition?.("POS_1")}
          >
            <circle
              cx="70"
              cy="70"
              r={selectedPosition === "POS_1" ? "22" : "18"}
              fill={selectedPosition === "POS_1" ? "#F5ECD8" : "#EDEFF2"}
              stroke={selectedPosition === "POS_1" ? "#B8862E" : "#8B95A2"}
              strokeWidth={selectedPosition === "POS_1" ? "2.5" : "1.5"}
              className="dark:fill-graphite-800"
            />
            <circle cx="70" cy="70" r="6" fill={getStatusColor(positions.POS_1?.verdict)} />
            <text x="70" y="74" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#252D37" className="dark:fill-graphite-200">
              1
            </text>
          </g>

          {/* Position 2: Top-Right (Quadrant 2) */}
          <g
            className="cursor-pointer transition-transform hover:scale-105"
            onClick={() => onSelectPosition?.("POS_2")}
          >
            <circle
              cx="170"
              cy="70"
              r={selectedPosition === "POS_2" ? "22" : "18"}
              fill={selectedPosition === "POS_2" ? "#F5ECD8" : "#EDEFF2"}
              stroke={selectedPosition === "POS_2" ? "#B8862E" : "#8B95A2"}
              strokeWidth={selectedPosition === "POS_2" ? "2.5" : "1.5"}
              className="dark:fill-graphite-800"
            />
            <circle cx="170" cy="70" r="6" fill={getStatusColor(positions.POS_2?.verdict)} />
            <text x="170" y="74" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#252D37" className="dark:fill-graphite-200">
              2
            </text>
          </g>

          {/* Position 3: Bottom-Left (Quadrant 3) */}
          <g
            className="cursor-pointer transition-transform hover:scale-105"
            onClick={() => onSelectPosition?.("POS_3")}
          >
            <circle
              cx="70"
              cy="170"
              r={selectedPosition === "POS_3" ? "22" : "18"}
              fill={selectedPosition === "POS_3" ? "#F5ECD8" : "#EDEFF2"}
              stroke={selectedPosition === "POS_3" ? "#B8862E" : "#8B95A2"}
              strokeWidth={selectedPosition === "POS_3" ? "2.5" : "1.5"}
              className="dark:fill-graphite-800"
            />
            <circle cx="70" cy="170" r="6" fill={getStatusColor(positions.POS_3?.verdict)} />
            <text x="70" y="174" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#252D37" className="dark:fill-graphite-200">
              3
            </text>
          </g>

          {/* Position 4: Bottom-Right (Quadrant 4) */}
          <g
            className="cursor-pointer transition-transform hover:scale-105"
            onClick={() => onSelectPosition?.("POS_4")}
          >
            <circle
              cx="170"
              cy="170"
              r={selectedPosition === "POS_4" ? "22" : "18"}
              fill={selectedPosition === "POS_4" ? "#F5ECD8" : "#EDEFF2"}
              stroke={selectedPosition === "POS_4" ? "#B8862E" : "#8B95A2"}
              strokeWidth={selectedPosition === "POS_4" ? "2.5" : "1.5"}
              className="dark:fill-graphite-800"
            />
            <circle cx="170" cy="170" r="6" fill={getStatusColor(positions.POS_4?.verdict)} />
            <text x="170" y="174" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#252D37" className="dark:fill-graphite-200">
              4
            </text>
          </g>

          {/* Position Center (Reference Center) */}
          <g
            className="cursor-pointer transition-transform hover:scale-105"
            onClick={() => onSelectPosition?.("POS_CENTER")}
          >
            <circle
              cx="120"
              cy="120"
              r={selectedPosition === "POS_CENTER" ? "24" : "20"}
              fill={selectedPosition === "POS_CENTER" ? "#F5ECD8" : "#EDEFF2"}
              stroke={selectedPosition === "POS_CENTER" ? "#B8862E" : "#8B95A2"}
              strokeWidth={selectedPosition === "POS_CENTER" ? "2.5" : "1.5"}
              className="dark:fill-graphite-800"
            />
            <circle cx="120" cy="120" r="6" fill={getStatusColor(positions.POS_CENTER?.verdict)} />
            <text x="120" y="124" textAnchor="middle" fontSize="9" fontWeight="bold" fill="#252D37" className="dark:fill-graphite-200">
              CTR
            </text>
          </g>
        </svg>
      </div>

      {/* Position Status Table */}
      <div className="w-full mt-2 grid grid-cols-5 gap-1 text-center">
        {(["POS_CENTER", "POS_1", "POS_2", "POS_3", "POS_4"] as PlatformPositionCode[]).map((code) => {
          const item = positions[code];
          const isSelected = selectedPosition === code;
          return (
            <button
              key={code}
              type="button"
              onClick={() => onSelectPosition?.(code)}
              className={`p-1.5 rounded border text-[11px] transition-colors ${
                isSelected
                  ? "border-brass-500 bg-brass-50 dark:bg-brass-900/30 text-brass-800 dark:text-brass-300 font-semibold"
                  : "border-graphite-200 dark:border-graphite-800 hover:bg-graphite-50 dark:hover:bg-graphite-800 text-graphite-600 dark:text-graphite-400"
              }`}
            >
              <div className="flex items-center justify-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: getStatusColor(item?.verdict) }} />
                <span>{code === "POS_CENTER" ? "Center" : `Pos ${code.replace("POS_", "")}`}</span>
              </div>
              <div className="font-mono text-[10px] mt-0.5 text-graphite-500">
                {item?.error !== undefined ? `${item.error > 0 ? "+" : ""}${item.error.toFixed(2)}` : "--"}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};
