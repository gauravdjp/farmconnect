-- ====================================================================
-- OIML R-76 NAWI Legal Metrology Test Report Generation System
-- Department of Consumer Affairs (DoCA), Ministry of Consumer Affairs, GoI
-- Migration 02: Canonical OIML R-76:2006 Test Catalogue & Authentic Metrology Seed Data
-- ====================================================================

-- 1. SEED ORGANIZATIONS (Designated Central Metrology Testing Laboratories)
INSERT INTO organizations (id, name, nabl_code, address, state, contact_email, contact_phone)
VALUES 
(
    '11111111-1111-1111-1111-111111111111',
    'Regional Reference Standard Laboratory (RRSL), Bengaluru',
    'NABL-CC-2144',
    'PB No. 8412, Outer Ring Road, Jnanabharathi, Bengaluru - 560072',
    'Karnataka',
    'rrsl-bangalore@gov.in',
    '+91-80-23214567'
),
(
    '22222222-2222-2222-2222-222222222222',
    'Regional Reference Standard Laboratory (RRSL), Faridabad',
    'NABL-CC-2189',
    'Sector 12, Near Mini Secretariat, Faridabad - 121007',
    'Haryana',
    'rrsl-faridabad@gov.in',
    '+91-129-2287654'
),
(
    '33333333-3333-3333-3333-333333333333',
    'National Physical Laboratory (CSIR-NPL), New Delhi',
    'NABL-CC-1001',
    'Dr. K.S. Krishnan Marg, Pusa Campus, New Delhi - 110012',
    'Delhi',
    'metrology@nplindia.org',
    '+91-11-45609212'
)
ON CONFLICT (id) DO NOTHING;

-- 2. SEED REFERENCE STANDARDS
INSERT INTO reference_standards (id, organization_id, name, serial_no, accuracy_grade, certificate_no, calibration_date, calibration_due_date, calibrated_by)
VALUES
(
    'aaaa1111-0000-0000-0000-000000000001',
    '11111111-1111-1111-1111-111111111111',
    'Stainless Steel Precision Weights Set (1 g to 10 kg)',
    'RRSLB-WT-F1-08',
    'OIML Class F1',
    'NPL/MASS/2026/0411',
    '2026-01-15',
    '2027-01-14',
    'CSIR - National Physical Laboratory, New Delhi'
),
(
    'aaaa1111-0000-0000-0000-000000000002',
    '11111111-1111-1111-1111-111111111111',
    'Cast Iron Bar Weights Set (20 kg x 5 units)',
    'RRSLB-WT-M1-44',
    'OIML Class M1',
    'RRSLB/VER/2025/1192',
    '2025-08-10',
    '2026-08-09',
    'Regional Reference Standard Laboratory, Bengaluru'
),
(
    'aaaa1111-0000-0000-0000-000000000003',
    '11111111-1111-1111-1111-111111111111',
    'Micro-Fractional Mass Standards (1 mg to 500 mg)',
    'RRSLB-WT-E2-02',
    'OIML Class E2',
    'NPL/MASS/2026/0109',
    '2026-02-02',
    '2027-02-01',
    'CSIR - National Physical Laboratory, New Delhi'
)
ON CONFLICT (id) DO NOTHING;

-- 3. SEED MANUFACTURERS
INSERT INTO manufacturers (id, name, legal_address, country, indian_rep_name, indian_rep_address, contact_email, contact_phone)
VALUES
(
    'bbbb1111-0000-0000-0000-000000000001',
    'Essae-Teraoka Private Limited',
    '377/22, 6th Cross, Wilson Garden, Bengaluru - 560027',
    'India',
    NULL,
    NULL,
    'compliance@essae.com',
    '+91-80-22221133'
),
(
    'bbbb1111-0000-0000-0000-000000000002',
    'Avery India Limited',
    'Plot No. 50-59, Sector 25, Ballabgarh, Faridabad - 121004',
    'India',
    NULL,
    NULL,
    'legal.metrology@averyweigh-tronix.com',
    '+91-129-4094400'
),
(
    'bbbb1111-0000-0000-0000-000000000003',
    'Contech Instruments Limited',
    '301, Punit Industrial Estate, Turbhe, Navi Mumbai - 400705',
    'India',
    NULL,
    NULL,
    'technical@contechindia.com',
    '+91-22-27618822'
)
ON CONFLICT (id) DO NOTHING;

-- 4. SEED INSTRUMENT MODELS
INSERT INTO instrument_models (
    id, manufacturer_id, model_name, category, accuracy_class, 
    max_capacity, min_capacity, verification_interval, display_interval, capacity_unit,
    power_source, indicator_model, load_cell_model, load_cell_cert_ref, technical_notes
)
VALUES
(
    'cccc1111-0000-0000-0000-000000000001',
    'bbbb1111-0000-0000-0000-000000000001',
    'DS-215 Electronic Platform Scale',
    'Electronic Platform Scale',
    'III',
    30.0000,
    0.2000,
    0.0100,
    0.0100,
    'kg',
    '230V AC mains 50Hz and 6V 4.5Ah rechargeable battery',
    'DI-166 Digital Indicator',
    'Zemic L6D Single Point Aluminum Load Cell',
    'R60/2000-NL1-08.02',
    'Platform dimensions 400mm x 400mm with stainless steel platter. Six-digit high-contrast LED display.'
),
(
    'cccc1111-0000-0000-0000-000000000002',
    'bbbb1111-0000-0000-0000-000000000003',
    'CB-600 Precision Laboratory Balance',
    'Precision Balance',
    'II',
    600.0000,
    0.5000,
    0.0100,
    0.0010,
    'g',
    '12V DC via external 230V AC adapter',
    'Integrated Microprocessor Unit',
    'Electromagnetic Force Compensation Transducer',
    'R60/2000-DE1-12.01',
    'Draft shield enclosed, internal motorized calibration weight mechanism.'
),
(
    'cccc1111-0000-0000-0000-000000000003',
    'bbbb1111-0000-0000-0000-000000000002',
    'Bridgemaster E-120 Pitless Weighbridge',
    'Weighbridge',
    'III',
    60000.0000,
    400.0000,
    20.0000,
    20.0000,
    'kg',
    '230V AC mains 50Hz with UPS backup',
    'E1310 Weight Indicator Terminal',
    'Avery T302 Double-Ended Shear Beam Compression Load Cells (6 units)',
    'R60/2000-GB1-06.01',
    'Steel-deck vehicular weighbridge, platform size 16m x 3m with surge protection.'
)
ON CONFLICT (id) DO NOTHING;

-- 5. SEED TEST TEMPLATES (Full OIML R-76:2006 Catalogue)
INSERT INTO test_templates (id, code, version, name, clause_ref, applicable_classes, description, sequence_order, is_mandatory)
VALUES
(
    'dddd1111-0000-0000-0000-000000000001',
    'ACCURACY_TEST',
    'R76-2006-v1',
    'Weighing Performance (Accuracy) Test',
    'OIML R-76-1 Clause A.4.4 & A.4.6',
    ARRAY['I', 'II', 'III', 'IIII']::accuracy_class[],
    'Determination of weighing performance under increasing and decreasing test loads across the entire operational range, evaluating errors against Maximum Permissible Error (MPE) thresholds.',
    1,
    true
),
(
    'dddd1111-0000-0000-0000-000000000002',
    'ECCENTRICITY_TEST',
    'R76-2006-v1',
    'Eccentricity (Off-Centre Loading) Test',
    'OIML R-76-1 Clause A.4.7',
    ARRAY['I', 'II', 'III', 'IIII']::accuracy_class[],
    'Application of designated test load at eccentric positions (center, four quadrants/corners) on the load-receiving surface to assess error under non-uniform loading.',
    2,
    true
),
(
    'dddd1111-0000-0000-0000-000000000003',
    'REPEATABILITY_TEST',
    'R76-2006-v1',
    'Repeatability Test',
    'OIML R-76-1 Clause A.4.10',
    ARRAY['I', 'II', 'III', 'IIII']::accuracy_class[],
    'Successive identical load applications (minimum 10 series for Class I, 6 for Class II/III/IIII) to compute experimental range and variance against permissible limits.',
    3,
    true
),
(
    'dddd1111-0000-0000-0000-000000000004',
    'DISCRIMINATION_TEST',
    'R76-2006-v1',
    'Discrimination (Sensitivity) Test',
    'OIML R-76-1 Clause A.4.8',
    ARRAY['I', 'II', 'III', 'IIII']::accuracy_class[],
    'Verification that an additional small test load (1.4d) smoothly and deterministically advances the indicated equilibrium value by at least one display division.',
    4,
    true
),
(
    'dddd1111-0000-0000-0000-000000000005',
    'TARE_TEST',
    'R76-2006-v1',
    'Tare Setting & Net Weighing Test',
    'OIML R-76-1 Clause A.4.11',
    ARRAY['I', 'II', 'III', 'IIII']::accuracy_class[],
    'Verification of subtractive and semi-automatic tare devices, ensuring net load indications adhere strictly to MPE calculated on the net load basis.',
    5,
    true
),
(
    'dddd1111-0000-0000-0000-000000000006',
    'CREEP_TEST',
    'R76-2006-v1',
    'Time-Dependence & Creep Test',
    'OIML R-76-1 Clause A.4.12',
    ARRAY['I', 'II', 'III', 'IIII']::accuracy_class[],
    'Prolonged sustained load test measuring display drift at specified time intervals (0.5 min, 3 min, 5 min, 30 min) to ensure sensor mechanical stability.',
    6,
    false
),
(
    'dddd1111-0000-0000-0000-000000000007',
    'STATIC_TEMPERATURE_TEST',
    'R76-2006-v1',
    'Static Temperatures (Climatic) Test',
    'OIML R-76-1 Clause A.5.3.1',
    ARRAY['I', 'II', 'III', 'IIII']::accuracy_class[],
    'Evaluation in an environmental climatic chamber at specified temperatures (-10°C, 20°C, 40°C or declared temperature span) across nominal span.',
    7,
    false
),
(
    'dddd1111-0000-0000-0000-000000000008',
    'DAMP_HEAT_TEST',
    'R76-2006-v1',
    'Damp Heat Steady State Test',
    'OIML R-76-1 Clause A.5.3.2',
    ARRAY['I', 'II', 'III', 'IIII']::accuracy_class[],
    'Soak testing under elevated relative humidity (85% RH at 40°C) for 48 hours to assess dielectric isolation and zero/span drift.',
    8,
    false
),
(
    'dddd1111-0000-0000-0000-000000000009',
    'VOLTAGE_VARIATION_TEST',
    'R76-2006-v1',
    'Power Supply Voltage Variation Test',
    'OIML R-76-1 Clause A.5.4',
    ARRAY['I', 'II', 'III', 'IIII']::accuracy_class[],
    'Testing at -15% and +10% of nominal AC mains voltage (195V to 253V for 230V mains) and battery minimum cutoff voltage.',
    9,
    false
),
(
    'dddd1111-0000-0000-0000-000000000010',
    'TILTING_TEST',
    'R76-2006-v1',
    'Tilting Test for Non-Fixed Instruments',
    'OIML R-76-1 Clause A.5.1',
    ARRAY['II', 'III', 'IIII']::accuracy_class[],
    'Determination of influence when tilted longitudinally and transversely up to the limiting angle of the level-indicating device (typically 50/1000).',
    10,
    false
),
(
    'dddd1111-0000-0000-0000-000000000011',
    'WARM_UP_TEST',
    'R76-2006-v1',
    'Warm-Up Time Evaluation',
    'OIML R-76-1 Clause A.5.2',
    ARRAY['I', 'II', 'III', 'IIII']::accuracy_class[],
    'Immediate zero and test-load evaluation upon cold power initiation, verified at 5, 15, and 30 minutes against declared warm-up duration.',
    11,
    false
),
(
    'dddd1111-0000-0000-0000-000000000012',
    'ADMIN_EXAM_TEST',
    'R76-2006-v1',
    'Administrative & Construction Examination',
    'OIML R-76-1 Clause 3, 4, 7',
    ARRAY['I', 'II', 'III', 'IIII']::accuracy_class[],
    'Visual and mechanical verification of markings, verification mark stamp plate, lead sealing provisions, leveling vial, and firmware audit trail checksum.',
    12,
    true
)
ON CONFLICT (code, version) DO NOTHING;

-- 6. SEED CORE TEMPLATE FIELDS FOR ACCURACY TEST
INSERT INTO template_fields (template_id, field_code, label, data_type, unit, sequence, required, feeds_mpe)
SELECT 
    id, 'applied_load', 'Applied Reference Load (L)', 'NUMERIC', 'kg', 1, true, true
FROM test_templates WHERE code = 'ACCURACY_TEST' AND version = 'R76-2006-v1';

INSERT INTO template_fields (template_id, field_code, label, data_type, unit, sequence, required, feeds_mpe)
SELECT 
    id, 'indicated_value_inc', 'Indicated Value - Increasing (I_inc)', 'NUMERIC', 'kg', 2, true, true
FROM test_templates WHERE code = 'ACCURACY_TEST' AND version = 'R76-2006-v1';

INSERT INTO template_fields (template_id, field_code, label, data_type, unit, sequence, required, feeds_mpe)
SELECT 
    id, 'indicated_value_dec', 'Indicated Value - Decreasing (I_dec)', 'NUMERIC', 'kg', 3, false, true
FROM test_templates WHERE code = 'ACCURACY_TEST' AND version = 'R76-2006-v1';

-- 7. SEED CORE TEMPLATE FIELDS FOR ECCENTRICITY TEST
INSERT INTO template_fields (template_id, field_code, label, data_type, unit, sequence, required, feeds_mpe)
SELECT 
    id, 'position_code', 'Load Location (Center / Corners)', 'SELECT', NULL, 1, true, false
FROM test_templates WHERE code = 'ECCENTRICITY_TEST' AND version = 'R76-2006-v1';

INSERT INTO template_fields (template_id, field_code, label, data_type, unit, sequence, required, feeds_mpe)
SELECT 
    id, 'applied_load', 'Test Load (1/3 Max)', 'NUMERIC', 'kg', 2, true, true
FROM test_templates WHERE code = 'ECCENTRICITY_TEST' AND version = 'R76-2006-v1';

INSERT INTO template_fields (template_id, field_code, label, data_type, unit, sequence, required, feeds_mpe)
SELECT 
    id, 'indicated_value', 'Indicated Reading (I)', 'NUMERIC', 'kg', 3, true, true
FROM test_templates WHERE code = 'ECCENTRICITY_TEST' AND version = 'R76-2006-v1';
