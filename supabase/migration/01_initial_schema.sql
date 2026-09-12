-- ====================================================================
-- OIML R-76 NAWI Legal Metrology Test Report Generation System
-- Department of Consumer Affairs (DoCA), Ministry of Consumer Affairs, GoI
-- Migration 01: Core Relational Schema with Multi-Tenant Row Level Security
-- ====================================================================

-- 1. EXTENSIONS
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- 2. ENUM TYPES
DO $$ BEGIN
    CREATE TYPE accuracy_class AS ENUM ('I', 'II', 'III', 'IIII');
EXCEPTION WHEN duplicate_object THEN null; END $$;

DO $$ BEGIN
    CREATE TYPE test_case_status AS ENUM ('DRAFT', 'IN_PROGRESS', 'REVIEW', 'APPROVED', 'SUPERSEDED');
EXCEPTION WHEN duplicate_object THEN null; END $$;

DO $$ BEGIN
    CREATE TYPE user_role AS ENUM (
        'SUPER_ADMIN',
        'LAB_ADMIN',
        'TEST_ENGINEER',
        'REVIEWER',
        'LAB_INCHARGE_APPROVER',
        'MANUFACTURER_PORTAL_USER'
    );
EXCEPTION WHEN duplicate_object THEN null; END $$;

DO $$ BEGIN
    CREATE TYPE verdict_type AS ENUM ('PASS', 'FAIL', 'INCOMPLETE', 'REVIEW');
EXCEPTION WHEN duplicate_object THEN null; END $$;

DO $$ BEGIN
    CREATE TYPE field_data_type AS ENUM ('NUMERIC', 'TEXT', 'SELECT', 'COMPUTED');
EXCEPTION WHEN duplicate_object THEN null; END $$;

-- 3. ORGANIZATIONS (Designated / NABL Accredited Testing Laboratories)
CREATE TABLE IF NOT EXISTS organizations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    nabl_code TEXT UNIQUE,
    address TEXT NOT NULL,
    state TEXT NOT NULL,
    contact_email TEXT NOT NULL,
    contact_phone TEXT,
    logo_url TEXT,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);

-- 4. USER PROFILES (Linked to Supabase auth.users)
CREATE TABLE IF NOT EXISTS profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    organization_id UUID REFERENCES organizations(id) ON DELETE SET NULL,
    full_name TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    role user_role NOT NULL DEFAULT 'TEST_ENGINEER',
    phone TEXT,
    designation TEXT,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);

-- 5. REFERENCE STANDARDS (Calibration Weights & Verification Standards)
CREATE TABLE IF NOT EXISTS reference_standards (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    organization_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    serial_no TEXT NOT NULL,
    accuracy_grade TEXT NOT NULL, -- e.g. "OIML Class E2", "Class F1", "Class M1"
    certificate_no TEXT NOT NULL,
    calibration_date DATE NOT NULL,
    calibration_due_date DATE NOT NULL,
    calibrated_by TEXT NOT NULL, -- e.g. "National Physical Laboratory (NPL), New Delhi"
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);

-- 6. MANUFACTURERS & APPLICANTS
CREATE TABLE IF NOT EXISTS manufacturers (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    legal_address TEXT NOT NULL,
    country TEXT NOT NULL DEFAULT 'India',
    indian_rep_name TEXT,
    indian_rep_address TEXT,
    contact_email TEXT NOT NULL,
    contact_phone TEXT,
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);

-- 7. INSTRUMENT MODELS
CREATE TABLE IF NOT EXISTS instrument_models (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    manufacturer_id UUID NOT NULL REFERENCES manufacturers(id) ON DELETE RESTRICT,
    model_name TEXT NOT NULL,
    category TEXT NOT NULL, -- "Electronic Platform Scale", "Counter Scale", "Weighbridge", "Precision Balance"
    accuracy_class accuracy_class NOT NULL,
    max_capacity NUMERIC(14, 4) NOT NULL,
    min_capacity NUMERIC(14, 4) NOT NULL,
    verification_interval NUMERIC(14, 4) NOT NULL, -- "e"
    display_interval NUMERIC(14, 4),               -- "d"
    capacity_unit TEXT NOT NULL DEFAULT 'kg',      -- 'kg', 'g', 't', 'mg'
    verification_interval_count NUMERIC(14, 2) GENERATED ALWAYS AS (max_capacity / verification_interval) STORED, -- "n"
    power_source TEXT NOT NULL,                    -- "230V AC mains 50Hz", "Internal rechargeable battery 6V"
    indicator_model TEXT,
    load_cell_model TEXT,
    load_cell_cert_ref TEXT,                       -- OIML R-60 certificate reference
    technical_notes TEXT,
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);

-- 8. TEST TEMPLATES (Configurable Test Template Engine)
CREATE TABLE IF NOT EXISTS test_templates (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    code TEXT NOT NULL,                            -- e.g. "ACCURACY_TEST"
    version TEXT NOT NULL,                         -- e.g. "R76-2006-v1"
    name TEXT NOT NULL,
    clause_ref TEXT,                               -- OIML R-76 clause (e.g. "A.4.4", "A.4.6")
    applicable_classes accuracy_class[] NOT NULL,
    description TEXT,
    sequence_order INT NOT NULL DEFAULT 1,
    is_mandatory BOOLEAN NOT NULL DEFAULT true,
    is_active BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT now(),
    UNIQUE(code, version)
);

-- 9. TEMPLATE FIELDS
CREATE TABLE IF NOT EXISTS template_fields (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    template_id UUID NOT NULL REFERENCES test_templates(id) ON DELETE CASCADE,
    field_code TEXT NOT NULL,                      -- e.g. "applied_load", "indicated_value_inc"
    label TEXT NOT NULL,
    data_type field_data_type NOT NULL DEFAULT 'NUMERIC',
    unit TEXT,                                     -- "kg", "g", "°C", "mm"
    sanity_min NUMERIC(14, 4),
    sanity_max NUMERIC(14, 4),
    sequence INT NOT NULL DEFAULT 1,
    required BOOLEAN NOT NULL DEFAULT true,
    feeds_mpe BOOLEAN NOT NULL DEFAULT false,
    created_at TIMESTAMPTZ DEFAULT now()
);

-- 10. TEST CASES (Type Evaluation Dossiers)
CREATE TABLE IF NOT EXISTS test_cases (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    case_number TEXT NOT NULL UNIQUE,              -- e.g. "NAWI-2026-RRSLB-00104"
    organization_id UUID NOT NULL REFERENCES organizations(id) ON DELETE RESTRICT,
    instrument_model_id UUID NOT NULL REFERENCES instrument_models(id) ON DELETE RESTRICT,
    created_by UUID REFERENCES profiles(id) ON DELETE SET NULL,
    assigned_engineer_id UUID REFERENCES profiles(id) ON DELETE SET NULL,
    status test_case_status NOT NULL DEFAULT 'DRAFT',
    initiated_at TIMESTAMPTZ DEFAULT now(),
    completed_at TIMESTAMPTZ,
    approved_by UUID REFERENCES profiles(id) ON DELETE SET NULL,
    approved_at TIMESTAMPTZ,
    approval_notes TEXT,
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);

-- 11. ENVIRONMENTAL & LABORATORY CONDITIONS
CREATE TABLE IF NOT EXISTS environmental_conditions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    test_case_id UUID NOT NULL REFERENCES test_cases(id) ON DELETE CASCADE,
    reference_standard_id UUID REFERENCES reference_standards(id) ON DELETE SET NULL,
    recorded_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    temperature_celsius NUMERIC(5, 2) NOT NULL,
    relative_humidity_pct NUMERIC(5, 2) NOT NULL,
    atmospheric_pressure_hpa NUMERIC(7, 2),
    notes TEXT,
    recorded_by UUID REFERENCES profiles(id) ON DELETE SET NULL,
    created_at TIMESTAMPTZ DEFAULT now()
);

-- 12. TEST OBSERVATIONS
CREATE TABLE IF NOT EXISTS test_observations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    test_case_id UUID NOT NULL REFERENCES test_cases(id) ON DELETE CASCADE,
    test_template_code TEXT NOT NULL,
    performed_by UUID REFERENCES profiles(id) ON DELETE SET NULL,
    performed_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    source TEXT NOT NULL DEFAULT 'IN_HOUSE',       -- 'IN_HOUSE' or 'EXTERNAL_ACCREDITED_LAB'
    external_lab_name TEXT,
    external_cert_ref TEXT,
    anomaly_flag BOOLEAN DEFAULT false,
    anomaly_reason TEXT,
    anomaly_acknowledged_by UUID REFERENCES profiles(id) ON DELETE SET NULL,
    notes TEXT,
    created_at TIMESTAMPTZ DEFAULT now()
);

-- 13. TEST OBSERVATION VALUES (Row-per-field dynamic schema)
CREATE TABLE IF NOT EXISTS test_observation_values (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    observation_id UUID NOT NULL REFERENCES test_observations(id) ON DELETE CASCADE,
    field_code TEXT NOT NULL,
    value_numeric NUMERIC(14, 4),
    value_text TEXT,
    unit TEXT,
    step_number INT DEFAULT 1                      -- For multi-step loads / points
);

-- 14. CALCULATION RESULTS
CREATE TABLE IF NOT EXISTS calculation_results (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    observation_id UUID NOT NULL REFERENCES test_observations(id) ON DELETE CASCADE UNIQUE,
    error_value NUMERIC(14, 4) NOT NULL,
    mpe_value NUMERIC(14, 4) NOT NULL,
    verdict verdict_type NOT NULL,
    calculation_details JSONB,
    engine_version TEXT NOT NULL DEFAULT '1.0.0',
    created_at TIMESTAMPTZ DEFAULT now()
);

-- 15. COMPLIANCE AGGREGATIONS
CREATE TABLE IF NOT EXISTS compliance_aggregations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    test_case_id UUID NOT NULL REFERENCES test_cases(id) ON DELETE CASCADE UNIQUE,
    overall_verdict verdict_type NOT NULL,
    per_test_summary JSONB NOT NULL,
    calculated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    engine_version TEXT NOT NULL DEFAULT '1.0.0',
    override_reason TEXT,
    override_by UUID REFERENCES profiles(id) ON DELETE SET NULL
);

-- 16. REPORTS
CREATE TABLE IF NOT EXISTS reports (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    test_case_id UUID NOT NULL REFERENCES test_cases(id) ON DELETE CASCADE UNIQUE,
    report_number TEXT NOT NULL UNIQUE,            -- e.g. "DOCA/OIML-R76/2026/04812"
    current_version INT NOT NULL DEFAULT 1,
    status test_case_status NOT NULL DEFAULT 'DRAFT',
    qr_code_hash TEXT NOT NULL,                    -- SHA-256 integrity & verification hash
    search_vector tsvector,
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);

-- 17. REPORT VERSIONS (Immutable historical snapshots)
CREATE TABLE IF NOT EXISTS report_versions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    report_id UUID NOT NULL REFERENCES reports(id) ON DELETE CASCADE,
    version_number INT NOT NULL,
    format TEXT NOT NULL DEFAULT 'PDF',            -- 'PDF' or 'DOCX'
    file_url TEXT,
    is_draft BOOLEAN NOT NULL DEFAULT true,
    engine_version TEXT NOT NULL,
    snapshot_data JSONB NOT NULL,                  -- Complete canonical ReportData snapshot
    created_at TIMESTAMPTZ DEFAULT now()
);

-- 18. REPORT SIGNATURES
CREATE TABLE IF NOT EXISTS report_signatures (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    report_version_id UUID NOT NULL REFERENCES report_versions(id) ON DELETE CASCADE,
    signed_by UUID NOT NULL REFERENCES profiles(id) ON DELETE RESTRICT,
    signature_type TEXT NOT NULL DEFAULT 'DSC_PKI',-- 'DSC_PKI' or 'GOV_ESIGN'
    content_hash TEXT NOT NULL,
    certificate_details JSONB,
    signed_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 19. ATTACHMENTS & PHOTOGRAPHS
CREATE TABLE IF NOT EXISTS attachments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    target_type TEXT NOT NULL,                     -- 'TEST_CASE', 'OBSERVATION', 'MODEL'
    target_id UUID NOT NULL,
    file_name TEXT NOT NULL,
    file_url TEXT NOT NULL,
    mime_type TEXT NOT NULL,
    file_size INT NOT NULL,
    caption TEXT,
    uploaded_by UUID REFERENCES profiles(id) ON DELETE SET NULL,
    created_at TIMESTAMPTZ DEFAULT now()
);

-- 20. AUDIT LOGS (Append-only legal record)
CREATE TABLE IF NOT EXISTS audit_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    actor_id UUID REFERENCES profiles(id) ON DELETE SET NULL,
    actor_role TEXT,
    action TEXT NOT NULL,
    entity_type TEXT NOT NULL,
    entity_id TEXT NOT NULL,
    payload_before JSONB,
    payload_after JSONB,
    ip_address TEXT,
    user_agent TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 21. INDEXES FOR PERFORMANCE & FULL TEXT SEARCH
CREATE INDEX IF NOT EXISTS idx_test_cases_org ON test_cases(organization_id, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_test_cases_model ON test_cases(instrument_model_id);
CREATE INDEX IF NOT EXISTS idx_observations_case ON test_observations(test_case_id);
CREATE INDEX IF NOT EXISTS idx_obs_values_obs ON test_observation_values(observation_id);
CREATE INDEX IF NOT EXISTS idx_reports_search ON reports USING GIN(search_vector);

-- 22. ROW LEVEL SECURITY (RLS) POLICIES
ALTER TABLE organizations ENABLE ROW LEVEL SECURITY;
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE reference_standards ENABLE ROW LEVEL SECURITY;
ALTER TABLE test_cases ENABLE ROW LEVEL SECURITY;
ALTER TABLE environmental_conditions ENABLE ROW LEVEL SECURITY;
ALTER TABLE test_observations ENABLE ROW LEVEL SECURITY;
ALTER TABLE test_observation_values ENABLE ROW LEVEL SECURITY;
ALTER TABLE reports ENABLE ROW LEVEL SECURITY;
ALTER TABLE audit_logs ENABLE ROW LEVEL SECURITY;

-- Helper function to get the current user's organization
CREATE OR REPLACE FUNCTION current_user_org_id()
RETURNS UUID AS $$
    SELECT organization_id FROM profiles WHERE id = auth.uid();
$$ LANGUAGE sql SECURITY DEFINER STABLE;

-- Helper function to check if current user is Super Admin
CREATE OR REPLACE FUNCTION is_super_admin()
RETURNS BOOLEAN AS $$
    SELECT (role = 'SUPER_ADMIN') FROM profiles WHERE id = auth.uid();
$$ LANGUAGE sql SECURITY DEFINER STABLE;

-- RLS: Organizations
CREATE POLICY org_isolation_policy ON organizations
    FOR SELECT USING (is_super_admin() OR id = current_user_org_id());

-- RLS: Profiles
CREATE POLICY profile_read_policy ON profiles
    FOR SELECT USING (is_super_admin() OR organization_id = current_user_org_id() OR id = auth.uid());

CREATE POLICY profile_self_update_policy ON profiles
    FOR UPDATE USING (id = auth.uid());

-- RLS: Test Cases
CREATE POLICY test_cases_read_policy ON test_cases
    FOR SELECT USING (is_super_admin() OR organization_id = current_user_org_id());

CREATE POLICY test_cases_insert_policy ON test_cases
    FOR INSERT WITH CHECK (is_super_admin() OR organization_id = current_user_org_id());

CREATE POLICY test_cases_update_policy ON test_cases
    FOR UPDATE USING (is_super_admin() OR organization_id = current_user_org_id());
