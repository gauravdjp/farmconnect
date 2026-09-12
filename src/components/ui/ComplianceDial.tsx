"use client";

import React from "react";

export interface ComplianceDialProps {
  error: number;         // Observed Error = Indicated - Applied (in units, e.g. g or kg)
  mpe: number;           // Maximum Permissible Error (absolute positive value, e.g. 0.5e)
  unit?: string;         // e.g. "g", "kg", "e"
  label?: string;        // e.g. "Load: 10 kg (1000e)"
  showDetails?: boolean;
  size?: "sm" | "md" | "lg";
}

export const ComplianceDial: React.FC<ComplianceDialProps> = ({
  error,
  mpe,
  unit = "g",
  label,
  showDetails = true,
  size = "md",
}) => {
  // Safe math bounds
  const safeMpe = mpe > 0 ? mpe : 0.0001;
  const errorRatio = error / safeMpe; // -1 to +1 is within MPE
  const clampedRatio = Math.max(-2, Math.min(2, errorRatio)); // clamp between -200% and +200%

  // Angle: 0 error is 0 deg (pointing straight up), -1 MPE is -45 deg, -2 MPE is -90 deg.
  // 1 MPE is +45 deg, 2 MPE is +90 deg.
  // Total span is 180 degrees (-90 to +90)
  const angle = (clampedRatio / 2) * 90;

  // Determine compliance verdict
  const absRatio = Math.abs(errorRatio);
  let status: "PASS" | "WARNING" | "FAIL" = "PASS";
  let statusLabel = "COMPLIANT";
  let strokeColor = "#1E7A4C"; // verified-600
  let badgeBg = "bg-verified-50 text-verified-700 border-verified-500/30";

  if (absRatio > 1.0001) {
    status = "FAIL";
    statusLabel = "OUT OF TOLERANCE";
    strokeColor = "#B23A34"; // fail-600
    badgeBg = "bg-fail-50 text-fail-700 border-fail-500/30";
  } else if (absRatio >= 0.85) {
    status = "WARNING";
    statusLabel = "NEAR LIMIT (≥85% MPE)";
    strokeColor = "#B8862E"; // tolerance brass
    badgeBg = "bg-tolerance-50 text-tolerance-700 border-tolerance-500/30";
  }

  // Dimensions based on size
  const dim = size === "sm" ? 140 : size === "lg" ? 220 : 180;

  return (
    <div className="flex flex-col items-center bg-paper dark:bg-graphite-900 border border-graphite-200 dark:border-graphite-800 rounded-sm p-3 shadow-metro">
      {label && (
        <span className="text-xs font-medium text-graphite-600 dark:text-graphite-400 mb-1 tracking-wide">
          {label}
        </span>
      )}

      {/* SVG Semicircular Dial */}
      <div className="relative" style={{ width: dim, height: dim * 0.65 }}>
        <svg
          viewBox="0 0 200 120"
          className="w-full h-full overflow-visible"
        >
          {/* Background Outer Ring Arc */}
          <path
            d="M 20 100 A 80 80 0 0 1 180 100"
            fill="none"
            stroke="#D8DCE2"
            strokeWidth="12"
            strokeLinecap="round"
            className="dark:stroke-graphite-800"
          />

          {/* Fail Zones: Left (< -1 MPE) and Right (> +1 MPE) */}
          <path
            d="M 20 100 A 80 80 0 0 1 43.4 43.4"
            fill="none"
            stroke="#B23A34"
            strokeWidth="12"
            opacity="0.35"
          />
          <path
            d="M 156.6 43.4 A 80 80 0 0 1 180 100"
            fill="none"
            stroke="#B23A34"
            strokeWidth="12"
            opacity="0.35"
          />

          {/* Warning Tolerance Zones: 85% to 100% of MPE */}
          <path
            d="M 43.4 43.4 A 80 80 0 0 1 54.2 32.5"
            fill="none"
            stroke="#B8862E"
            strokeWidth="12"
            opacity="0.6"
          />
          <path
            d="M 145.8 32.5 A 80 80 0 0 1 156.6 43.4"
            fill="none"
            stroke="#B8862E"
            strokeWidth="12"
            opacity="0.6"
          />

          {/* Compliant Center Arc: -85% to +85% */}
          <path
            d="M 54.2 32.5 A 80 80 0 0 1 145.8 32.5"
            fill="none"
            stroke="#1E7A4C"
            strokeWidth="12"
            opacity="0.8"
          />

          {/* Boundary Tick Marks at -MPE, 0, +MPE */}
          {/* -MPE tick (at 45 deg left of vertical) */}
          <line
            x1="100"
            y1="100"
            x2="57.5"
            y2="57.5"
            stroke="#5B6470"
            strokeWidth="1"
            strokeDasharray="2,2"
          />
          {/* +MPE tick (at 45 deg right of vertical) */}
          <line
            x1="100"
            y1="100"
            x2="142.5"
            y2="57.5"
            stroke="#5B6470"
            strokeWidth="1"
            strokeDasharray="2,2"
          />
          {/* 0 tick (straight up) */}
          <line
            x1="100"
            y1="20"
            x2="100"
            y2="10"
            stroke="#252D37"
            strokeWidth="2"
            className="dark:stroke-graphite-300"
          />

          {/* Boundary Labels */}
          <text x="32" y="112" fontSize="9" fill="#5B6470" textAnchor="middle" className="font-mono">
            -MPE
          </text>
          <text x="100" y="8" fontSize="9" fill="#5B6470" textAnchor="middle" className="font-mono">
            0
          </text>
          <text x="168" y="112" fontSize="9" fill="#5B6470" textAnchor="middle" className="font-mono">
            +MPE
          </text>

          {/* Precision Needle with Pivot Center */}
          <g transform={`rotate(${angle}, 100, 100)`} className="transition-transform duration-300 ease-out">
            <polygon
              points="97,100 100,22 103,100"
              fill={strokeColor}
            />
            <circle cx="100" cy="100" r="7" fill="#252D37" />
            <circle cx="100" cy="100" r="3" fill="#B8862E" />
          </g>
        </svg>
      </div>

      {/* Numeric Readout Block */}
      {showDetails && (
        <div className="w-full mt-2 pt-2 border-t border-graphite-200 dark:border-graphite-800 flex flex-col items-center">
          <div className="flex items-center justify-between w-full text-xs">
            <span className="text-graphite-500 dark:text-graphite-400">Observed Error:</span>
            <span className="font-mono font-semibold text-graphite-900 dark:text-graphite-100">
              {error > 0 ? `+${error.toFixed(4)}` : error.toFixed(4)} {unit}
            </span>
          </div>
          <div className="flex items-center justify-between w-full text-xs mt-0.5">
            <span className="text-graphite-500 dark:text-graphite-400">MPE Allowed:</span>
            <span className="font-mono text-graphite-700 dark:text-graphite-300">
              ±{mpe.toFixed(4)} {unit}
            </span>
          </div>

          <div className={`mt-2 px-2 py-0.5 text-[11px] font-semibold tracking-wider rounded border ${badgeBg} flex items-center gap-1`}>
            <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: strokeColor }} />
            {statusLabel}
          </div>
        </div>
      )}
    </div>
  );
};
