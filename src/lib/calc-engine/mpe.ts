/**
 * OIML R-76 NAWI Calculation Engine
 * 
 * Pure, side-effect-free, authoritative implementation of Maximum Permissible Error (MPE)
 * and compliance evaluation as defined in OIML Recommendation R-76-1:2006, Section 3.5 & Table 6.
 */

import Decimal from "decimal.js";

// Accuracy classes under OIML R-76
export type AccuracyClass = "I" | "II" | "III" | "IIII";

export type VerificationService = "INITIAL" | "IN_SERVICE";
export type LoadBasis = "GROSS" | "NET";

export interface MPEOptions {
  service?: VerificationService; // Default: INITIAL (Type evaluation)
  loadBasis?: LoadBasis;         // Default: GROSS
}

export interface MPETier {
  upToE: number; // Tier boundary expressed in verification scale intervals (m/e)
  factor: number; // Factor multiplied by e (0.5, 1.0, 1.5)
}

// OIML R-76-1 Table 6: Maximum permissible errors for type evaluation (initial verification)
export const MPE_TIER_TABLE: Record<AccuracyClass, MPETier[]> = {
  I: [
    { upToE: 50000, factor: 0.5 },
    { upToE: 200000, factor: 1.0 },
    { upToE: Infinity, factor: 1.5 },
  ],
  II: [
    { upToE: 5000, factor: 0.5 },
    { upToE: 20000, factor: 1.0 },
    { upToE: Infinity, factor: 1.5 },
  ],
  III: [
    { upToE: 500, factor: 0.5 },
    { upToE: 2000, factor: 1.0 },
    { upToE: Infinity, factor: 1.5 },
  ],
  IIII: [
    { upToE: 50, factor: 0.5 },
    { upToE: 200, factor: 1.0 },
    { upToE: Infinity, factor: 1.5 },
  ],
};

export interface MPECalculationResult {
  load: Decimal;
  e: Decimal;
  loadInE: Decimal;
  tierFactor: Decimal;
  mpe: Decimal;
  tierBoundaryE: number;
  service: VerificationService;
}

/**
 * Computes the Maximum Permissible Error (MPE) for a given load and instrument parameters.
 * 
 * @param accuracyClass Instrument accuracy class (I, II, III, IIII)
 * @param verificationInterval Verification scale interval 'e'
 * @param load Applied test load
 * @param options Calculation options (service type, load basis)
 * @returns MPE as an absolute positive Decimal value
 */
export function computeMPE(
  accuracyClass: AccuracyClass,
  verificationInterval: Decimal.Value,
  load: Decimal.Value,
  options: MPEOptions = {}
): Decimal {
  const result = computeMPEDetails(accuracyClass, verificationInterval, load, options);
  return result.mpe;
}

/**
 * Computes the full breakdown of MPE calculation with tier metadata.
 */
export function computeMPEDetails(
  accuracyClass: AccuracyClass,
  verificationInterval: Decimal.Value,
  load: Decimal.Value,
  options: MPEOptions = {}
): MPECalculationResult {
  const service = options.service || "INITIAL";
  const e = new Decimal(verificationInterval);
  const m = new Decimal(load).abs();

  if (e.isZero() || e.isNegative()) {
    throw new Error("Verification interval 'e' must be strictly positive.");
  }

  // Load expressed as number of verification intervals: n = m / e
  const loadInE = m.div(e);

  const tiers = MPE_TIER_TABLE[accuracyClass];
  if (!tiers) {
    throw new Error(`Invalid accuracy class: ${accuracyClass}`);
  }

  // Find the matching tier. Note: boundary is inclusive (load <= upToE)
  const tier = tiers.find((t) => loadInE.lte(t.upToE)) || tiers[tiers.length - 1];

  let factor = new Decimal(tier.factor);

  // In-service verification doubles the allowable error (OIML R-76-1 Section 3.5.2)
  if (service === "IN_SERVICE") {
    factor = factor.mul(2);
  }

  const mpe = e.mul(factor);

  return {
    load: m,
    e,
    loadInE,
    tierFactor: factor,
    mpe,
    tierBoundaryE: tier.upToE,
    service,
  };
}

export interface ReadingEvaluation {
  appliedLoad: Decimal;
  indicatedValue: Decimal;
  error: Decimal; // E = I - L
  mpe: Decimal;
  isCompliant: boolean;
  isNearLimit: boolean; // Error magnitude >= 85% of MPE
  verdict: "PASS" | "FAIL";
  status: "PASS" | "WARNING" | "FAIL";
}

/**
 * Evaluates an observed reading against OIML R-76 MPE.
 */
export function evaluateReading(
  indicatedValue: Decimal.Value,
  appliedLoad: Decimal.Value,
  accuracyClass: AccuracyClass,
  verificationInterval: Decimal.Value,
  options: MPEOptions = {}
): ReadingEvaluation {
  const I = new Decimal(indicatedValue);
  const L = new Decimal(appliedLoad);
  const error = I.minus(L); // Observed Error E = I - L

  const mpe = computeMPE(accuracyClass, verificationInterval, L, options);
  const absError = error.abs();

  const isCompliant = absError.lte(mpe);
  const isNearLimit = isCompliant && absError.gte(mpe.mul(0.85));

  const verdict: "PASS" | "FAIL" = isCompliant ? "PASS" : "FAIL";
  const status: "PASS" | "WARNING" | "FAIL" = !isCompliant
    ? "FAIL"
    : isNearLimit
    ? "WARNING"
    : "PASS";

  return {
    appliedLoad: L,
    indicatedValue: I,
    error,
    mpe,
    isCompliant,
    isNearLimit,
    verdict,
    status,
  };
}

export interface RepeatabilityResult {
  readings: Decimal[];
  mean: Decimal;
  range: Decimal; // Max - Min
  mpeAtLoad: Decimal;
  isCompliant: boolean;
  verdict: "PASS" | "FAIL";
}

/**
 * Evaluates repeatability under identical load according to OIML R-76-1 Clause A.4.10.
 * The difference between the maximum and minimum result of n weighings shall not exceed the absolute MPE for that load.
 */
export function computeRepeatability(
  readings: Decimal.Value[],
  appliedLoad: Decimal.Value,
  accuracyClass: AccuracyClass,
  verificationInterval: Decimal.Value
): RepeatabilityResult {
  if (readings.length === 0) {
    throw new Error("Repeatability requires at least one reading.");
  }

  const decReadings = readings.map((r) => new Decimal(r));
  const max = Decimal.max(...decReadings);
  const min = Decimal.min(...decReadings);
  const range = max.minus(min);

  const sum = decReadings.reduce((acc, curr) => acc.plus(curr), new Decimal(0));
  const mean = sum.div(decReadings.length);

  const mpeAtLoad = computeMPE(accuracyClass, verificationInterval, appliedLoad);
  const isCompliant = range.lte(mpeAtLoad);

  return {
    readings: decReadings,
    mean,
    range,
    mpeAtLoad,
    isCompliant,
    verdict: isCompliant ? "PASS" : "FAIL",
  };
}

/**
 * Validates whether declared instrument specifications are legal under OIML R-76-1 Table 3.
 */
export function validateInstrumentClass(
  accuracyClass: AccuracyClass,
  maxCapacity: Decimal.Value,
  verificationInterval: Decimal.Value
): { isValid: boolean; n: Decimal; minN: number; maxN: number; reason?: string } {
  const max = new Decimal(maxCapacity);
  const e = new Decimal(verificationInterval);
  const n = max.div(e);

  const rules: Record<AccuracyClass, { min: number; max: number }> = {
    I: { min: 50000, max: Infinity },
    II: { min: 100, max: 100000 },
    III: { min: 100, max: 10000 },
    IIII: { min: 100, max: 1000 },
  };

  const rule = rules[accuracyClass];
  if (n.lt(rule.min) || n.gt(rule.max)) {
    return {
      isValid: false,
      n,
      minN: rule.min,
      maxN: rule.max,
      reason: `Class ${accuracyClass} requires number of scale intervals 'n' between ${rule.min} and ${
        rule.max === Infinity ? "Infinity" : rule.max
      }. Current specification yields n = ${n.toFixed(0)}.`,
    };
  }

  return {
    isValid: true,
    n,
    minN: rule.min,
    maxN: rule.max,
  };
}
