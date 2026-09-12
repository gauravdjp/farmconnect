export type AccuracyClass = 'I' | 'II' | 'III' | 'IIII';
export type TestCaseStatus = 'DRAFT' | 'IN_PROGRESS' | 'REVIEW' | 'APPROVED' | 'SUPERSEDED';
export type UserRole = 
  | 'SUPER_ADMIN' 
  | 'LAB_ADMIN' 
  | 'TEST_ENGINEER' 
  | 'REVIEWER' 
  | 'LAB_INCHARGE_APPROVER' 
  | 'MANUFACTURER_PORTAL_USER';

export type VerdictType = 'PASS' | 'FAIL' | 'INCOMPLETE' | 'REVIEW';
export type FieldDataType = 'NUMERIC' | 'TEXT' | 'SELECT' | 'COMPUTED';

export interface Organization {
  id: string;
  name: string;
  nabl_code: string;
  address: string;
  state: string;
  contact_email: string;
  contact_phone?: string;
  logo_url?: string;
  is_active: boolean;
  created_at: string;
}

export interface Profile {
  id: string;
  organization_id?: string;
  full_name: string;
  email: string;
  role: UserRole;
  phone?: string;
  designation?: string;
  is_active: boolean;
  created_at: string;
}

export interface ReferenceStandard {
  id: string;
  organization_id: string;
  name: string;
  serial_no: string;
  accuracy_grade: string; // e.g. "OIML Class F1", "Class E2", "Class M1"
  certificate_no: string;
  calibration_date: string;
  calibration_due_date: string;
  calibrated_by: string;
}

export interface Manufacturer {
  id: string;
  name: string;
  legal_address: string;
  country: string;
  indian_rep_name?: string;
  indian_rep_address?: string;
  contact_email: string;
  contact_phone?: string;
  created_at: string;
}

export interface InstrumentModel {
  id: string;
  manufacturer_id: string;
  model_name: string;
  category: string;
  accuracy_class: AccuracyClass;
  max_capacity: number;
  min_capacity: number;
  verification_interval: number; // e
  display_interval?: number;     // d
  capacity_unit: string;
  verification_interval_count: number; // n = Max / e
  power_source: string;
  indicator_model?: string;
  load_cell_model?: string;
  load_cell_cert_ref?: string;
  technical_notes?: string;
  created_at: string;
  manufacturer?: Manufacturer;
}

export interface TemplateField {
  id: string;
  template_id: string;
  field_code: string;
  label: string;
  data_type: FieldDataType;
  unit?: string;
  sanity_min?: number;
  sanity_max?: number;
  sequence: number;
  required: boolean;
  feeds_mpe: boolean;
}

export interface TestTemplate {
  id: string;
  code: string;
  version: string;
  name: string;
  clause_ref?: string;
  applicable_classes: AccuracyClass[];
  description?: string;
  sequence_order: number;
  is_mandatory: boolean;
  is_active: boolean;
  fields?: TemplateField[];
}

export interface TestCase {
  id: string;
  case_number: string;
  organization_id: string;
  instrument_model_id: string;
  created_by?: string;
  assigned_engineer_id?: string;
  status: TestCaseStatus;
  initiated_at: string;
  completed_at?: string;
  approved_by?: string;
  approved_at?: string;
  approval_notes?: string;
  created_at: string;
  updated_at: string;
  instrument_model?: InstrumentModel;
  organization?: Organization;
}

export interface EnvironmentalCondition {
  id: string;
  test_case_id: string;
  reference_standard_id?: string;
  recorded_at: string;
  temperature_celsius: number;
  relative_humidity_pct: number;
  atmospheric_pressure_hpa?: number;
  notes?: string;
  reference_standard?: ReferenceStandard;
}

export interface TestObservationValue {
  id: string;
  observation_id: string;
  field_code: string;
  value_numeric?: number;
  value_text?: string;
  unit?: string;
  step_number?: number;
}

export interface CalculationResult {
  id: string;
  observation_id: string;
  error_value: number;
  mpe_value: number;
  verdict: VerdictType;
  calculation_details?: Record<string, unknown>;
  engine_version: string;
}

export interface TestObservation {
  id: string;
  test_case_id: string;
  test_template_code: string;
  performed_by?: string;
  performed_at: string;
  source: string;
  external_lab_name?: string;
  external_cert_ref?: string;
  anomaly_flag: boolean;
  anomaly_reason?: string;
  notes?: string;
  values?: TestObservationValue[];
  result?: CalculationResult;
}

export interface ComplianceAggregation {
  id: string;
  test_case_id: string;
  overall_verdict: VerdictType;
  per_test_summary: Array<{
    code: string;
    name: string;
    clause_ref: string;
    is_mandatory: boolean;
    status: VerdictType | 'NOT_STARTED';
    error_summary?: string;
  }>;
  calculated_at: string;
  engine_version: string;
  override_reason?: string;
}

export interface Report {
  id: string;
  test_case_id: string;
  report_number: string;
  current_version: number;
  status: TestCaseStatus;
  qr_code_hash: string;
  created_at: string;
  updated_at: string;
}

export interface AuditLog {
  id: string;
  actor_id?: string;
  actor_name?: string;
  actor_role?: string;
  action: string;
  entity_type: string;
  entity_id: string;
  ip_address?: string;
  created_at: string;
}
