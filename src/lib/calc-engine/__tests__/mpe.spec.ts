/**
 * Boundary Verification Test Suite for OIML R-76 MPE Calculation Engine
 * 
 * Verifies exact compliance with Table 6 of OIML Recommendation R-76-1:2006
 */

import { computeMPE, evaluateReading, computeRepeatability, validateInstrumentClass } from "../mpe";
import Decimal from "decimal.js";

function assert(condition: boolean, message: string) {
  if (!condition) {
    console.error(`FAIL: ${message}`);
    throw new Error(`Assertion failed: ${message}`);
  }
  console.log(`PASS: ${message}`);
}

function runTests() {
  console.log("==================================================");
  console.log("STARTING OIML R-76 CALCULATION ENGINE VERIFICATION");
  console.log("==================================================");

  // 1. CLASS III TESTS (Most common commercial scales & platform scales, e.g. e = 10 g = 0.01 kg)
  // Tier 1: 0 <= m <= 500e -> MPE = +/- 0.5e
  // Tier 2: 500e < m <= 2000e -> MPE = +/- 1.0e
  // Tier 3: m > 2000e -> MPE = +/- 1.5e
  const eClass3Grams = new Decimal(10); // 10 grams

  // At 500e exactly (5000g = 5 kg): should be in Tier 1 (+/- 0.5e = 5g)
  const mpe500e = computeMPE("III", eClass3Grams, 5000);
  assert(mpe500e.equals(5), "Class III: Load exactly at 500e (5000g) must have MPE = 0.5e (5g)");

  // At 501e (5010g): should be in Tier 2 (+/- 1.0e = 10g)
  const mpe501e = computeMPE("III", eClass3Grams, 5010);
  assert(mpe501e.equals(10), "Class III: Load at 501e (5010g) must have MPE = 1.0e (10g)");

  // At 2000e exactly (20000g = 20 kg): should be in Tier 2 (+/- 1.0e = 10g)
  const mpe2000e = computeMPE("III", eClass3Grams, 20000);
  assert(mpe2000e.equals(10), "Class III: Load exactly at 2000e (20000g) must have MPE = 1.0e (10g)");

  // At 2001e (20010g = 20.01 kg): should be in Tier 3 (+/- 1.5e = 15g)
  const mpe2001e = computeMPE("III", eClass3Grams, 20010);
  assert(mpe2001e.equals(15), "Class III: Load at 2001e (20010g) must have MPE = 1.5e (15g)");

  // 2. IN-SERVICE SERVICE TYPE (Double tolerance check)
  const mpeInService = computeMPE("III", eClass3Grams, 5000, { service: "IN_SERVICE" });
  assert(mpeInService.equals(10), "Class III In-Service: Load at 500e must double MPE to 1.0e (10g)");

  // 3. CLASS II TESTS (Precision balances, e.g. e = 0.01 g)
  // Tier 1: 0 <= m <= 5000e -> MPE = 0.5e
  // Tier 2: 5000e < m <= 20000e -> MPE = 1.0e
  // Tier 3: m > 20000e -> MPE = 1.5e
  const eClass2 = new Decimal(0.01);

  const mpeClass2_5000e = computeMPE("II", eClass2, 50); // 50g = 5000 * 0.01g
  assert(mpeClass2_5000e.equals(0.005), "Class II: Load at 5000e must have MPE = 0.5e (0.005g)");

  const mpeClass2_5001e = computeMPE("II", eClass2, 50.01);
  assert(mpeClass2_5001e.equals(0.01), "Class II: Load at 5001e must have MPE = 1.0e (0.01g)");

  // 4. READING EVALUATION (PASS / WARNING / FAIL)
  // When measuring in kilograms: e = 0.01 kg (10 g)
  const eClass3Kg = new Decimal(0.01); // 10 grams in kg

  // Load = 10 kg (1000e -> Tier 2, MPE = 1.0e = 0.01 kg = 10g)
  // Indicated = 10.008 kg (+8g error). Error is 80% of 10g MPE -> PASS
  const evalPass = evaluateReading(10.008, 10.000, "III", eClass3Kg);
  assert(evalPass.verdict === "PASS" && evalPass.status === "PASS", "Error +8g within 10g MPE is COMPLIANT PASS");

  // Load = 10 kg, Indicated = 10.009 kg (+9g error). Error is 90% of 10g MPE -> WARNING (Near limit)
  const evalWarn = evaluateReading(10.009, 10.000, "III", eClass3Kg);
  assert(evalWarn.verdict === "PASS" && evalWarn.status === "WARNING", "Error +9g is near limit (WARNING)");

  // Load = 10 kg, Indicated = 10.012 kg (+12g error). Exceeds 10g MPE -> FAIL
  const evalFail = evaluateReading(10.012, 10.000, "III", eClass3Kg);
  assert(evalFail.verdict === "FAIL" && evalFail.status === "FAIL", "Error +12g exceeds 10g MPE is NON-COMPLIANT FAIL");

  // 5. REPEATABILITY EVALUATION
  // Readings at 20kg: [20.005, 20.002, 20.008, 20.004, 20.006, 20.003] -> Range = 0.006kg (6g) <= MPE (0.01kg) -> PASS
  const repeatPass = computeRepeatability([20.005, 20.002, 20.008, 20.004, 20.006, 20.003], 20, "III", 0.01);
  assert(repeatPass.verdict === "PASS", "Repeatability range 6g <= 10g MPE is PASS");

  // 6. INSTRUMENT CLASS VALIDATION (OIML R-76 Table 3)
  // Class III scale with Max = 30 kg, e = 10 g (0.01 kg) -> n = 3000 (Legal: 100 <= n <= 10,000)
  const validModel = validateInstrumentClass("III", 30, 0.01);
  assert(validModel.isValid && validModel.n.equals(3000), "Class III scale with n = 3000 is valid");

  // Invalid: Class III scale with Max = 150 kg, e = 1 g (0.001 kg) -> n = 150,000 (> 10,000) -> INVALID
  const invalidModel = validateInstrumentClass("III", 150, 0.001);
  assert(!invalidModel.isValid, "Class III with n = 150,000 exceeds maximum allowable 10,000 and is correctly rejected");

  console.log("==================================================");
  console.log("ALL 11 BOUNDARY & DOMAIN TESTS PASSED SUCCESSFULLY");
  console.log("==================================================");
}

runTests();
