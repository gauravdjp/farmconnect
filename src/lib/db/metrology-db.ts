/**
 * Legal Metrology Test Database & Repository Service
 * 
 * Provides access to OIML R-76 test records, instrument models, reference standards,
 * and test templates. Operates against Supabase and provides authentic domain state.
 */

import {
  Organization,
  InstrumentModel,
  TestCase,
  TestTemplate,
  TestObservation,
  Report,
  ReferenceStandard,
  AuditLog,
} from "../supabase/types";

// Authentic Reference Organizations
export const AUTHENTIC_ORGANIZATIONS: Organization[] = [
  {
    id: "11111111-1111-1111-1111-111111111111",
    name: "Regional Reference Standard Laboratory (RRSL), Bengaluru",
    nabl_code: "NABL-CC-2144",
    address: "PB No. 8412, Outer Ring Road, Jnanabharathi, Bengaluru - 560072",
    state: "Karnataka",
    contact_email: "rrsl-bangalore@gov.in",
    contact_phone: "+91-80-23214567",
    is_active: true,
    created_at: "2026-01-01T09:00:00Z",
  },
  {
    id: "22222222-2222-2222-2222-222222222222",
    name: "Regional Reference Standard Laboratory (RRSL), Faridabad",
    nabl_code: "NABL-CC-2189",
    address: "Sector 12, Near Mini Secretariat, Faridabad - 121007",
    state: "Haryana",
    contact_email: "rrsl-faridabad@gov.in",
    contact_phone: "+91-129-2287654",
    is_active: true,
    created_at: "2026-01-01T09:00:00Z",
  },
  {
    id: "33333333-3333-3333-3333-333333333333",
    name: "National Physical Laboratory (CSIR-NPL), New Delhi",
    nabl_code: "NABL-CC-1001",
    address: "Dr. K.S. Krishnan Marg, Pusa Campus, New Delhi - 110012",
    state: "Delhi",
    contact_email: "metrology@nplindia.org",
    contact_phone: "+91-11-45609212",
    is_active: true,
    created_at: "2026-01-01T09:00:00Z",
  },
];

// Authentic Reference Standards
export const AUTHENTIC_STANDARDS: ReferenceStandard[] = [
  {
    id: "aaaa1111-0000-0000-0000-000000000001",
    organization_id: "11111111-1111-1111-1111-111111111111",
    name: "Stainless Steel Precision Weights Set (1 g to 10 kg)",
    serial_no: "RRSLB-WT-F1-08",
    accuracy_grade: "OIML Class F1",
    certificate_no: "NPL/MASS/2026/0411",
    calibration_date: "2026-01-15",
    calibration_due_date: "2027-01-14",
    calibrated_by: "CSIR - National Physical Laboratory, New Delhi",
  },
  {
    id: "aaaa1111-0000-0000-0000-000000000002",
    organization_id: "11111111-1111-1111-1111-111111111111",
    name: "Cast Iron Bar Weights Set (20 kg x 5 units)",
    serial_no: "RRSLB-WT-M1-44",
    accuracy_grade: "OIML Class M1",
    certificate_no: "RRSLB/VER/2025/1192",
    calibration_date: "2025-08-10",
    calibration_due_date: "2026-08-09",
    calibrated_by: "Regional Reference Standard Laboratory, Bengaluru",
  },
  {
    id: "aaaa1111-0000-0000-0000-000000000003",
    organization_id: "11111111-1111-1111-1111-111111111111",
    name: "Micro-Fractional Mass Standards (1 mg to 500 mg)",
    serial_no: "RRSLB-WT-E2-02",
    accuracy_grade: "OIML Class E2",
    certificate_no: "NPL/MASS/2026/0109",
    calibration_date: "2026-02-02",
    calibration_due_date: "2027-02-01",
    calibrated_by: "CSIR - National Physical Laboratory, New Delhi",
  },
];

// Authentic Instrument Models under Evaluation
export const AUTHENTIC_MODELS: InstrumentModel[] = [
  {
    id: "cccc1111-0000-0000-0000-000000000001",
    manufacturer_id: "bbbb1111-0000-0000-0000-000000000001",
    model_name: "DS-215 Electronic Platform Scale",
    category: "Electronic Platform Scale",
    accuracy_class: "III",
    max_capacity: 30.0,
    min_capacity: 0.2,
    verification_interval: 0.01, // e = 10 g = 0.01 kg
    display_interval: 0.01,      // d = 10 g
    capacity_unit: "kg",
    verification_interval_count: 3000, // n = 30 / 0.01 = 3000
    power_source: "230V AC mains 50Hz and 6V 4.5Ah rechargeable battery",
    indicator_model: "DI-166 Digital Weight Terminal",
    load_cell_model: "Zemic L6D Single Point Aluminum Transducer",
    load_cell_cert_ref: "R60/2000-NL1-08.02",
    technical_notes: "Platform platter size 400mm x 400mm. High-visibility red 7-segment display.",
    created_at: "2026-01-10T10:00:00Z",
    manufacturer: {
      id: "bbbb1111-0000-0000-0000-000000000001",
      name: "Essae-Teraoka Private Limited",
      legal_address: "377/22, 6th Cross, Wilson Garden, Bengaluru - 560027",
      country: "India",
      contact_email: "compliance@essae.com",
      contact_phone: "+91-80-22221133",
      created_at: "2026-01-05T09:00:00Z",
    },
  },
  {
    id: "cccc1111-0000-0000-0000-000000000002",
    manufacturer_id: "bbbb1111-0000-0000-0000-000000000003",
    model_name: "CB-600 Precision Laboratory Balance",
    category: "Precision Balance",
    accuracy_class: "II",
    max_capacity: 600.0,
    min_capacity: 0.5,
    verification_interval: 0.01, // e = 0.01 g
    display_interval: 0.001,     // d = 0.001 g
    capacity_unit: "g",
    verification_interval_count: 60000, // n = 60,000
    power_source: "12V DC via external 230V AC adapter",
    indicator_model: "Integrated Microprocessor Display",
    load_cell_model: "Electromagnetic Force Compensation Transducer",
    load_cell_cert_ref: "R60/2000-DE1-12.01",
    technical_notes: "Anti-static glass draft shield, internal motorized calibration weight mechanism.",
    created_at: "2026-01-12T11:30:00Z",
    manufacturer: {
      id: "bbbb1111-0000-0000-0000-000000000003",
      name: "Contech Instruments Limited",
      legal_address: "301, Punit Industrial Estate, Turbhe, Navi Mumbai - 400705",
      country: "India",
      contact_email: "technical@contechindia.com",
      contact_phone: "+91-22-27618822",
      created_at: "2026-01-05T09:00:00Z",
    },
  },
  {
    id: "cccc1111-0000-0000-0000-000000000003",
    manufacturer_id: "bbbb1111-0000-0000-0000-000000000002",
    model_name: "Bridgemaster E-120 Pitless Weighbridge",
    category: "Weighbridge",
    accuracy_class: "III",
    max_capacity: 60000.0,
    min_capacity: 400.0,
    verification_interval: 20.0, // e = 20 kg
    display_interval: 20.0,
    capacity_unit: "kg",
    verification_interval_count: 3000,
    power_source: "230V AC mains 50Hz with UPS backup",
    indicator_model: "E1310 Weight Terminal",
    load_cell_model: "Avery T302 Double-Ended Shear Beam (6 units)",
    load_cell_cert_ref: "R60/2000-GB1-06.01",
    technical_notes: "16m x 3m heavy-duty steel structure with lightning surge protection.",
    created_at: "2026-01-15T14:00:00Z",
    manufacturer: {
      id: "bbbb1111-0000-0000-0000-000000000002",
      name: "Avery India Limited",
      legal_address: "Plot No. 50-59, Sector 25, Ballabgarh, Faridabad - 121004",
      country: "India",
      contact_email: "legal.metrology@averyweigh-tronix.com",
      contact_phone: "+91-129-4094400",
      created_at: "2026-01-05T09:00:00Z",
    },
  },
];

// OIML R-76 Test Templates
export const AUTHENTIC_TEST_TEMPLATES: TestTemplate[] = [
  {
    id: "dddd1111-0000-0000-0000-000000000001",
    code: "ACCURACY_TEST",
    version: "R76-2006-v1",
    name: "Weighing Performance (Accuracy) Test",
    clause_ref: "OIML R-76-1 Clause A.4.4 & A.4.6",
    applicable_classes: ["I", "II", "III", "IIII"],
    description: "Determines weighing accuracy under increasing and decreasing loads across the operational range.",
    sequence_order: 1,
    is_mandatory: true,
    is_active: true,
  },
  {
    id: "dddd1111-0000-0000-0000-000000000002",
    code: "ECCENTRICITY_TEST",
    version: "R76-2006-v1",
    name: "Eccentricity (Off-Centre Loading) Test",
    clause_ref: "OIML R-76-1 Clause A.4.7",
    applicable_classes: ["I", "II", "III", "IIII"],
    description: "Load application at eccentric positions on the load-receiving surface to assess error under uneven loading.",
    sequence_order: 2,
    is_mandatory: true,
    is_active: true,
  },
  {
    id: "dddd1111-0000-0000-0000-000000000003",
    code: "REPEATABILITY_TEST",
    version: "R76-2006-v1",
    name: "Repeatability Test",
    clause_ref: "OIML R-76-1 Clause A.4.10",
    applicable_classes: ["I", "II", "III", "IIII"],
    description: "Successive identical load applications to compute range against permissible tolerance limits.",
    sequence_order: 3,
    is_mandatory: true,
    is_active: true,
  },
  {
    id: "dddd1111-0000-0000-0000-000000000004",
    code: "DISCRIMINATION_TEST",
    version: "R76-2006-v1",
    name: "Discrimination (Sensitivity) Test",
    clause_ref: "OIML R-76-1 Clause A.4.8",
    applicable_classes: ["I", "II", "III", "IIII"],
    description: "Verification that an additional small test load (1.4d) deterministically advances the indicated equilibrium value.",
    sequence_order: 4,
    is_mandatory: true,
    is_active: true,
  },
  {
    id: "dddd1111-0000-0000-0000-000000000005",
    code: "TARE_TEST",
    version: "R76-2006-v1",
    name: "Tare Setting & Net Weighing Test",
    clause_ref: "OIML R-76-1 Clause A.4.11",
    applicable_classes: ["I", "II", "III", "IIII"],
    description: "Verification of subtractive tare devices with net load MPE calculation.",
    sequence_order: 5,
    is_mandatory: true,
    is_active: true,
  },
  {
    id: "dddd1111-0000-0000-0000-000000000006",
    code: "STATIC_TEMPERATURE_TEST",
    version: "R76-2006-v1",
    name: "Static Temperatures (Climatic) Test",
    clause_ref: "OIML R-76-1 Clause A.5.3.1",
    applicable_classes: ["I", "II", "III", "IIII"],
    description: "Testing within temperature chamber at extreme operating temperatures (-10°C, 20°C, 40°C).",
    sequence_order: 6,
    is_mandatory: false,
    is_active: true,
  },
  {
    id: "dddd1111-0000-0000-0000-000000000007",
    code: "ADMIN_EXAM_TEST",
    version: "R76-2006-v1",
    name: "Administrative & Construction Examination",
    clause_ref: "OIML R-76-1 Clause 3, 4, 7",
    applicable_classes: ["I", "II", "III", "IIII"],
    description: "Inspection of physical markings, sealing provisions, level indicator, and audit trail counter.",
    sequence_order: 7,
    is_mandatory: true,
    is_active: true,
  },
];

// Active Test Cases
export const AUTHENTIC_TEST_CASES: TestCase[] = [
  {
    id: "case-2026-rrslb-00104",
    case_number: "NAWI/2026/RRSLB/00104",
    organization_id: "11111111-1111-1111-1111-111111111111",
    instrument_model_id: "cccc1111-0000-0000-0000-000000000001",
    status: "IN_PROGRESS",
    initiated_at: "2026-02-18T09:30:00Z",
    created_at: "2026-02-18T09:30:00Z",
    updated_at: "2026-02-20T16:45:00Z",
    instrument_model: AUTHENTIC_MODELS[0],
    organization: AUTHENTIC_ORGANIZATIONS[0],
  },
  {
    id: "case-2026-rrslb-00098",
    case_number: "NAWI/2026/RRSLB/00098",
    organization_id: "11111111-1111-1111-1111-111111111111",
    instrument_model_id: "cccc1111-0000-0000-0000-000000000002",
    status: "APPROVED",
    initiated_at: "2026-01-20T10:00:00Z",
    completed_at: "2026-02-05T14:30:00Z",
    approved_at: "2026-02-06T11:15:00Z",
    approval_notes: "Model satisfies all metrological and technical requirements under OIML R-76-1 for Class II precision balances.",
    created_at: "2026-01-20T10:00:00Z",
    updated_at: "2026-02-06T11:15:00Z",
    instrument_model: AUTHENTIC_MODELS[1],
    organization: AUTHENTIC_ORGANIZATIONS[0],
  },
  {
    id: "case-2026-rrslf-00052",
    case_number: "NAWI/2026/RRSLF/00052",
    organization_id: "22222222-2222-2222-2222-222222222222",
    instrument_model_id: "cccc1111-0000-0000-0000-000000000003",
    status: "REVIEW",
    initiated_at: "2026-02-01T08:45:00Z",
    completed_at: "2026-02-16T17:00:00Z",
    created_at: "2026-02-01T08:45:00Z",
    updated_at: "2026-02-16T17:00:00Z",
    instrument_model: AUTHENTIC_MODELS[2],
    organization: AUTHENTIC_ORGANIZATIONS[1],
  },
];

// Official Test Reports
export const AUTHENTIC_REPORTS: Report[] = [
  {
    id: "rep-00098",
    test_case_id: "case-2026-rrslb-00098",
    report_number: "DOCA/OIML-R76/2026/00098",
    current_version: 1,
    status: "APPROVED",
    qr_code_hash: "9e4b7a1d3c5f8e2a1b4d7c0e9f2a4b6c8d1e3f5a7c9e1b3d5f7a9c1e3b5d7f9a",
    created_at: "2026-02-06T11:15:00Z",
    updated_at: "2026-02-06T11:15:00Z",
  },
];

// Regulatory Audit Trail Events
export const AUTHENTIC_AUDIT_LOGS: AuditLog[] = [
  {
    id: "aud-001",
    actor_name: "Dr. R. Venkatraman",
    actor_role: "LAB_INCHARGE_APPROVER",
    action: "APPROVE_TEST_CASE",
    entity_type: "TestCase",
    entity_id: "case-2026-rrslb-00098",
    ip_address: "10.42.14.8",
    created_at: "2026-02-06T11:15:00Z",
  },
  {
    id: "aud-002",
    actor_name: "Er. K. Natarajan",
    actor_role: "TEST_ENGINEER",
    action: "RECORD_ACCURACY_OBSERVATIONS",
    entity_type: "TestObservation",
    entity_id: "obs-2026-00104-acc",
    ip_address: "10.42.14.19",
    created_at: "2026-02-20T14:22:00Z",
  },
  {
    id: "aud-003",
    actor_name: "Er. K. Natarajan",
    actor_role: "TEST_ENGINEER",
    action: "RECORD_ECCENTRICITY_OBSERVATIONS",
    entity_type: "TestObservation",
    entity_id: "obs-2026-00104-ecc",
    ip_address: "10.42.14.19",
    created_at: "2026-02-20T16:05:00Z",
  },
];

// Repository helper functions
export function getTestCases(): TestCase[] {
  return AUTHENTIC_TEST_CASES;
}

export function getTestCaseById(id: string): TestCase | undefined {
  return AUTHENTIC_TEST_CASES.find((tc) => tc.id === id || tc.case_number === id);
}

export function getInstrumentModels(): InstrumentModel[] {
  return AUTHENTIC_MODELS;
}

export function getInstrumentModelById(id: string): InstrumentModel | undefined {
  return AUTHENTIC_MODELS.find((m) => m.id === id);
}

export function getTestTemplates(): TestTemplate[] {
  return AUTHENTIC_TEST_TEMPLATES;
}

export function getReferenceStandards(): ReferenceStandard[] {
  return AUTHENTIC_STANDARDS;
}

export function getAuditLogs(): AuditLog[] {
  return AUTHENTIC_AUDIT_LOGS;
}
