const state = {
  program: "MIPS",
  route: "performance",
  selectedOrg: null,
  selectedSubmission: null,
  selectedSubmissionScope: null,
  selectedIndividualGroup: "",
  selectedIndividualClinician: "",
  scoreTab: "Summary",
  labMode: "vision",
  scenario: "mvp-zmvp4",
  labStep: 0,
  mvpSpecialty: null,
  mvpSpecialties: null,
  practiceComposition: "multi",
};

const defaultScenarioByProgram = {
  MIPS: "mips-performance",
  MVP: "mvp-zmvp4",
  APPPLUS: "appplus-score",
  QRDA: "qrda-export",
};

const programOrder = ["MVP", "APPPLUS", "QRDA", "MIPS"];

const scenarioDefinitions = {
  "mvp-zmvp4": {
    label: "MVP ZzMVP4 Score Details",
    program: "MVP",
    route: "performance-detail",
    selectedOrg: "ZzMVP4",
    goal: "Inspect an MVP subgroup scorecard, confirm measure details, and export results.",
    signal: "Can a user get from customer context to the correct MVP subgroup without losing program/year context?",
  },
  "appplus-score": {
    label: "APP Plus APM Entity Score",
    program: "APPPLUS",
    route: "performance-detail",
    selectedOrg: "CCPM Community Care Partnership of Maine",
    goal: "Review APP Plus APM Entity quality performance and export score data.",
    signal: "Can APP Plus feel like one micro-app among peers while still showing APM-specific scope?",
  },
  "mips-performance": {
    label: "MIPS Customer Performance",
    program: "MIPS",
    route: "performance",
    selectedOrg: null,
    goal: "Check customer-level MIPS performance and provider count.",
    signal: "Can the user understand they are looking at one customer across submission pathways?",
  },
  "mvp-individual": {
    label: "MVP Individual Submission Search",
    program: "MVP",
    route: "submissions-Individual",
    selectedOrg: null,
    goal: "Find individual MVP submissions using subgroup and eligible clinician filters.",
    signal: "Can required filters and disabled dependent fields be understood quickly?",
  },
  "qrda-export": {
    label: "QRDA Export Package",
    program: "QRDA",
    route: "export-qrda",
    selectedOrg: null,
    goal: "Generate a QRDA I or QRDA III package for the selected program and scope.",
    signal: "Can QRDA be treated as a submission pathway rather than a disconnected utility?",
  },
  "new-submission": {
    label: "Create Submission Draft",
    program: "MVP",
    route: "new-submission",
    selectedOrg: "ZzMVP4",
    goal: "Create a pathway-specific draft submission and understand what supplemental data is missing.",
    signal: "Can draft creation expose Quality, PI, IA, and package readiness without extra navigation?",
  },
};

const customerProfiles = {
  zmdi: {
    name: "ZzMount Desert Island Hospital",
    reportingYear: "PY 2026",
    strategy: "Show legacy as disabled",
    activeSummary: "MVP Submission + APP Plus + QRDA",
    inactiveNote: "Traditional MIPS remains visible only as transition context.",
    programs: {
      MVP: { status: "active", label: "MVP Submission", note: "4 MVP subgroups" },
      APPPLUS: { status: "active", label: "Active", note: "APP Plus score review" },
      QRDA: { status: "active", label: "Active", note: "QRDA package generation" },
      MIPS: { status: "legacy", label: "Transition only", note: "Legacy scorecard available for customer context" },
    },
  },
  ccpm: {
    name: "CCPM Community Care Partnership of Maine",
    reportingYear: "PY 2026",
    strategy: "Hide retired paths, disable unused paths",
    activeSummary: "MVP Submission + APP Plus + QRDA",
    inactiveNote: "Traditional MIPS is removed from the top-line customer workspace unless needed for transition context.",
    programs: {
      MVP: { status: "active", label: "MVP Submission", note: "MVP submission workflow visible" },
      APPPLUS: { status: "active", label: "Primary", note: "1 APM Entity" },
      QRDA: { status: "active", label: "Active", note: "QRDA III package support" },
      MIPS: { status: "hidden", label: "Retired", note: "Hidden from this customer experience" },
    },
  },
};

const measureInventoryProfiles = {
  zmdi: {
    id: "zmdi",
    customerName: "ZzMount Desert Island Hospital",
    ownerType: "EC + APM-ready",
    period: "PY 2026",
    lastRefresh: "2026-07-15",
    summary: "One customer-level enabled measure inventory drives the in-app routing. EC measures support MVP, transition MIPS review, and QRDA export; some enabled measures remain analytics-only until the customer selects them for a submission.",
    measures: [
      { id: "CMS153v14", name: "Chlamydia Screening in Women", type: "eCQM", owner: "EC", scope: "Eligible clinician", specialty: "Women's Health", programs: ["MVP", "MIPS", "QRDA"], status: "Submission selected" },
      { id: "CMS349v8", name: "HIV Screening", type: "eCQM", owner: "EC", scope: "Eligible clinician", specialty: "Infectious Disease", programs: ["MVP", "MIPS", "QRDA"], status: "Submission selected" },
      { id: "CMS2v15", name: "Preventive Care and Screening: Screening for Depression and Follow-Up Plan", type: "eCQM", owner: "EC", scope: "Eligible clinician", specialty: "Mental Health", programs: ["MVP", "MIPS", "QRDA"], status: "Submission selected" },
      { id: "CMS130v14", name: "Colorectal Cancer Screening", type: "eCQM", owner: "EC", scope: "Eligible clinician", specialty: "Primary Care", programs: ["MVP", "MIPS", "QRDA"], status: "Submission selected" },
      { id: "CMS122v14", name: "Diabetes: Hemoglobin A1c Poor Control", type: "eCQM", owner: "EC", scope: "Eligible clinician", specialty: "Primary Care", programs: [], status: "Enabled, not submission selected" },
    ],
  },
  ambulatory: {
    id: "ambulatory",
    customerName: "Oracle-demo Ambulatory Group",
    ownerType: "EC only",
    period: "PY 2026",
    lastRefresh: "2026-07-15",
    summary: "This customer has one enabled clinician measure inventory. MVP Submission is the recommended future path; Traditional MIPS is shown only as transition context.",
    measures: [
      { id: "CMS145v14", name: "CAD: Beta-Blocker Therapy", type: "CQM", owner: "EC", scope: "Eligible clinician", specialty: "Cardiology", programs: ["MVP", "MIPS", "QRDA"], status: "Submission selected" },
      { id: "CMS165v14", name: "Controlling High Blood Pressure", type: "eCQM", owner: "EC", scope: "Eligible clinician", specialty: "Primary Care", programs: ["MVP", "MIPS", "QRDA"], status: "Submission selected" },
      { id: "CMS125v14", name: "Breast Cancer Screening", type: "eCQM", owner: "EC", scope: "Eligible clinician", specialty: "Primary Care", programs: ["MVP", "MIPS", "QRDA"], status: "Submission selected" },
      { id: "CMS69v14", name: "BMI Screening and Follow-Up", type: "CQM", owner: "EC", scope: "Eligible clinician", specialty: "Primary Care", programs: ["MIPS"], status: "Enabled for transition review" },
      { id: "CMS138v14", name: "Preventive Care and Screening: Tobacco Use", type: "eCQM", owner: "EC", scope: "Eligible clinician", specialty: "Primary Care", programs: [], status: "Enabled, not submission selected" },
    ],
  },
  appplus: {
    id: "appplus",
    customerName: "CCPM Community Care Partnership of Maine",
    ownerType: "APM Entity + EC",
    period: "PY 2026",
    lastRefresh: "2026-06-22",
    summary: "The customer-level inventory includes APM Entity CQMs and EC measures. APP Plus is primary, MVP remains visible for specialty cohort planning, and QRDA supports supported export packages.",
    measures: [
      { id: "112", name: "Breast Cancer Screening", type: "CQM", owner: "APM", scope: "APM Entity", specialty: "Primary Care", programs: ["APPPLUS", "QRDA"], status: "Submission selected" },
      { id: "113", name: "Colorectal Cancer Screening", type: "CQM", owner: "APM", scope: "APM Entity", specialty: "Primary Care", programs: ["APPPLUS", "QRDA"], status: "Submission selected" },
      { id: "236", name: "Controlling High Blood Pressure", type: "CQM", owner: "APM", scope: "APM Entity", specialty: "Primary Care", programs: ["APPPLUS", "QRDA"], status: "Submission selected" },
      { id: "001", name: "Diabetes: Glycemic Status Assessment Greater Than 9%", type: "CQM", owner: "APM", scope: "APM Entity", specialty: "Endocrinology", programs: ["APPPLUS", "QRDA"], status: "Submission selected" },
      { id: "CMS2v15", name: "Screening for Depression and Follow-Up Plan", type: "eCQM", owner: "EC", scope: "Eligible clinician", specialty: "Mental Health", programs: ["MVP", "MIPS", "QRDA"], status: "Submission selected" },
      { id: "CMS68v14", name: "Documentation of Current Medications", type: "eCQM", owner: "EC", scope: "Eligible clinician", specialty: "Primary Care", programs: [], status: "Enabled, not submission selected" },
    ],
  },
};

const smartRecommendations = [
  {
    tin: "428739421",
    name: "National Capital Nephrology",
    pathway: "MVP",
    providers: 31,
    projectedScore: "97.28",
    status: "Ready",
    reviewSignal: "Moderate uplift",
    action: "Register",
  },
  {
    tin: "412888813",
    name: "ZzMidwest Heart Institute LLC",
    pathway: "MVP",
    providers: 373,
    projectedScore: "95.4",
    status: "Not Registered",
    reviewSignal: "Moderate risk",
    action: "Details",
  },
  {
    tin: "561299822",
    name: "Roadstar Oncology Affiliates of MN",
    pathway: "MVP",
    providers: 8,
    projectedScore: "94.98",
    status: "Not Registered",
    reviewSignal: "Low uplift",
    action: "Details",
  },
  {
    tin: "451490506",
    name: "WHC Physician Group, LLC",
    pathway: "Subgroup",
    providers: 528,
    projectedScore: "93.78",
    status: "Ready",
    reviewSignal: "High uplift",
    action: "Register",
  },
  {
    tin: "948720138",
    name: "Metroneal Associates",
    pathway: "APP Plus",
    providers: 13,
    projectedScore: "93.5",
    status: "Ready",
    reviewSignal: "Low uplift",
    action: "Details",
  },
];

const mvpCatalogRows = [
  {
    id: "G0055",
    name: "Advancing Care for Heart Disease",
    specialties: ["Cardiology", "Internal Medicine", "Family Medicine", "Nonphysician Practitioners", "Nurse Practitioner", "Physician Assistants"],
    currentFit: "ZzMVP2",
    providers: 45,
    measures: "4 quality measures, outcome/high-priority required",
    action: "Use for heart disease subgroup",
    status: "Recommended",
  },
  {
    id: "G0057",
    name: "Adopting Best Practices and Promoting Patient Safety within Emergency Medicine",
    specialties: ["Emergency Medicine", "Nonphysician Practitioners", "Nurse Practitioner", "Physician Assistants"],
    currentFit: "ED clinician cohort",
    providers: 18,
    measures: "Quality + PI + IA readiness review",
    action: "Review roster fit",
    status: "Candidate",
  },
  {
    id: "M0001",
    name: "Advancing Cancer Care",
    specialties: ["Oncology", "Hematology", "Nonphysician Practitioners", "Nurse Practitioner", "Physician Assistants"],
    currentFit: "Oncology practice",
    providers: 8,
    measures: "Patient experience, end-of-life, diagnostics",
    action: "Review oncology roster",
    status: "Candidate",
  },
  {
    id: "G0053",
    name: "Advancing Rheumatology Patient Care",
    specialties: ["Rheumatology", "Nonphysician Practitioners", "Nurse Practitioner", "Physician Assistants"],
    currentFit: "Rheumatology specialty group",
    providers: 7,
    measures: "Rheumatology conditions and care management",
    action: "Review specialty fit",
    status: "Candidate",
  },
  {
    id: "M1366",
    name: "Focusing on Women's Health",
    specialties: ["Gynecology", "Obstetrics", "Urogynecology", "Certified Nurse Mid-Wives", "Nurse Practitioner", "Physician Assistants"],
    currentFit: "ZzMVP3",
    providers: 45,
    measures: "Women's health quality measure fit",
    action: "Use for women's health subgroup",
    status: "Recommended",
  },
  {
    id: "M1368",
    name: "Prevention and Treatment of Infectious Disorders Including Hepatitis C and HIV",
    specialties: ["Infectious Disease", "Immunology", "Nonphysician Practitioners", "Nurse Practitioner", "Physician Assistants"],
    currentFit: "ZzMVP4",
    providers: 45,
    measures: "HIV, chlamydia, preventive screening readiness",
    action: "Use for ZzMVP4 subgroup",
    status: "Recommended",
  },
  {
    id: "M1369",
    name: "Quality Care in Mental Health and Substance Use Disorders",
    specialties: ["Mental Health", "Behavioral Health", "Psychiatry", "Clinical Social Workers", "Nurse Practitioners", "Physician Assistants"],
    currentFit: "ZzMVP5",
    providers: 53,
    measures: "Behavioral health and SUD measure fit",
    action: "Use for behavioral health subgroup",
    status: "Recommended",
  },
  {
    id: "M1422",
    name: "Gastroenterology Care",
    specialties: ["Gastroenterology", "Nonphysician Practitioners", "Nurse Practitioner", "Physician Assistants"],
    currentFit: "GI specialty group",
    providers: 12,
    measures: "eCQM/CQM collection type check",
    action: "Validate measures",
    status: "Candidate",
  },
  {
    id: "M0002",
    name: "Optimal Care for Kidney Health",
    specialties: ["Nephrology"],
    currentFit: "Nephrology cohort",
    providers: 31,
    measures: "Kidney health measure set",
    action: "Review nephrology cohort",
    status: "Candidate",
  },
  {
    id: "M0005",
    name: "Value in Primary Care",
    specialties: ["Preventive Medicine", "Internal Medicine", "Family Medicine", "Geriatrics", "Nonphysician Practitioners", "Nurse Practitioner", "Physician Assistants"],
    currentFit: "Primary care group",
    providers: 61,
    measures: "Broad primary care prevention measures",
    action: "Evaluate group reporting fit",
    status: "Candidate",
  },
  {
    id: "M1425",
    name: "Surgical Care",
    specialties: ["General Surgery", "Neurosurgery", "Cardiothoracic Surgery", "Nonphysician Practitioners", "Nurse Practitioner", "Physician Assistants"],
    currentFit: "Surgical subgroup",
    providers: 21,
    measures: "Outcome/high-priority measure required",
    action: "Create subgroup draft",
    status: "Needs review",
  },
  {
    id: "M1503",
    name: "Vascular Surgery",
    specialties: ["Vascular Surgery", "Nonphysician Practitioners", "Nurse Practitioner", "Physician Assistants"],
    currentFit: "Vascular practice",
    providers: 9,
    measures: "Case minimum and data completeness check",
    action: "Check denominator volume",
    status: "Needs review",
  },
  {
    id: "G0054",
    name: "Coordinating Stroke Care to Promote Prevention and Cultivate Positive Outcomes",
    specialties: ["Neurology", "Neurosurgical", "Vascular Surgery", "Nonphysician Practitioners", "Nurse Practitioner", "Physician Assistants"],
    currentFit: "Stroke care cohort",
    providers: 14,
    measures: "Stroke prevention and outcomes",
    action: "Compare with vascular surgery",
    status: "Candidate",
  },
];

const mvpMeasureRequirements = {
  G0055: ["CMS145v14", "CMS165v14"],
  G0057: [],
  M0001: [],
  G0053: [],
  M1366: ["CMS153v14"],
  M1368: ["CMS349v8", "CMS2v15"],
  M1369: ["CMS2v15"],
  M1422: ["CMS130v14"],
  M0002: [],
  M0005: ["CMS130v14", "CMS122v14", "CMS2v15"],
  M1425: [],
  M1503: [],
  G0054: [],
};

const providerAssignmentRows = [
  {
    specialty: "Cardiology",
    cohort: "Heart disease clinicians",
    tinNpi: "45 TIN/NPI combinations under TIN 3130ccdb",
    recommendedLevel: "Subgroup",
    mvpId: "G0055",
    mvpName: "Advancing Care for Heart Disease",
    rationale: "Specialty cohort is large enough to register separately while preserving group PI reporting.",
  },
  {
    specialty: "Infectious Disease",
    cohort: "Infectious disease and immunology subgroup",
    tinNpi: "45 TIN/NPI combinations under TIN 3130ccdb",
    recommendedLevel: "Subgroup",
    mvpId: "M1368",
    mvpName: "Prevention and Treatment of Infectious Disorders Including Hepatitis C and HIV",
    rationale: "Specialty and measure set align to HIV, hepatitis C, and preventive screening quality work.",
  },
  {
    specialty: "Mental Health",
    cohort: "Behavioral health and psychiatry clinicians",
    tinNpi: "53 TIN/NPI combinations under TIN 3130ccdb",
    recommendedLevel: "Subgroup",
    mvpId: "M1369",
    mvpName: "Quality Care in Mental Health and Substance Use Disorders",
    rationale: "Specialty-specific MVP avoids mixing behavioral health performance with unrelated group measures.",
  },
  {
    specialty: "Gynecology",
    cohort: "Women's health clinicians",
    tinNpi: "45 TIN/NPI combinations under TIN 3130ccdb",
    recommendedLevel: "Subgroup",
    mvpId: "M1366",
    mvpName: "Focusing on Women's Health",
    rationale: "Women’s health specialty filter gives a cleaner MVP fit than generic group reporting.",
  },
  {
    specialty: "Family Medicine",
    cohort: "Primary care clinicians",
    tinNpi: "61 TIN/NPI combinations under TIN 3130ccdb",
    recommendedLevel: "Group or Subgroup",
    mvpId: "M0005",
    mvpName: "Value in Primary Care",
    rationale: "Single-specialty or small multi-specialty practices can often evaluate MVP group reporting; larger multi-specialty practices may need subgroup or individual paths.",
  },
  {
    specialty: "Emergency Medicine",
    cohort: "Emergency department clinicians",
    tinNpi: "18 TIN/NPI combinations across ED billing group",
    recommendedLevel: "Individual or Subgroup",
    mvpId: "G0057",
    mvpName: "Adopting Best Practices and Promoting Patient Safety within Emergency Medicine",
    rationale: "Roster, ED attribution, and registration timing determine whether individual or subgroup reporting is cleaner.",
  },
];

const mvpReportingLevelRules = [
  {
    level: "Group",
    status: "Allowed for selected cases",
    rule: "Single-specialty practices and multispecialty small practices can report an MVP as a group.",
    userDecision: "Confirm practice specialty mix and small-practice status before enabling group MVP submission.",
  },
  {
    level: "Group",
    status: "Blocked for large multispecialty",
    rule: "Multispecialty practices that are not small practices cannot report an MVP as a group beginning with PY 2026.",
    userDecision: "Route to individual, subgroup, or APM Entity when the TIN is multispecialty and not small.",
  },
  {
    level: "Subgroup",
    status: "Registration required",
    rule: "Subgroup reporting is MVP-only, tied to a single TIN, and requires advance registration with included clinicians.",
    userDecision: "Collect subgroup roster, composition type, narrative rationale, selected MVP, subgroup identifier, and whole-TIN PI context.",
  },
  {
    level: "Individual / APM Entity",
    status: "Alternative paths",
    rule: "Clinicians may participate through multiple levels and receive the highest final score for the same TIN/NPI combination.",
    userDecision: "Forecast individual, subgroup, group, and APM Entity outcomes before locking the submission path.",
  },
];

const providerMvpForecastRows = [
  { provider: "Jane Coleman, MD", npi: "1942000000", selectedSpecialty: "Infectious Disease", mvpId: "M1368", mvpName: "Prevention and Treatment of Infectious Disorders Including Hepatitis C and HIV", current: "61.2", forecast: "74.8", delta: "+13.6", confidence: "High", gaps: "HIV Screening denominator, depression follow-up numerator" },
  { provider: "Marcus Bell, NP", npi: "1942000001", selectedSpecialty: "Infectious Disease", mvpId: "M1368", mvpName: "Prevention and Treatment of Infectious Disorders Including Hepatitis C and HIV", current: "58.9", forecast: "70.4", delta: "+11.5", confidence: "Medium", gaps: "Low HIV numerator; chlamydia denominator volume" },
  { provider: "Nadia Singh, MD", npi: "1942000002", selectedSpecialty: "Cardiology", mvpId: "G0055", mvpName: "Advancing Care for Heart Disease", current: "67.4", forecast: "79.1", delta: "+11.7", confidence: "High", gaps: "CAD beta-blocker numerator and blood pressure control" },
  { provider: "Robert Kane, PA", npi: "1942000003", selectedSpecialty: "Cardiology", mvpId: "G0055", mvpName: "Advancing Care for Heart Disease", current: "48.2", forecast: "55.9", delta: "+7.7", confidence: "Low", gaps: "Case minimum risk; measure attribution review" },
  { provider: "Elena Morales, MD", npi: "1942000004", selectedSpecialty: "Mental Health", mvpId: "M1369", mvpName: "Quality Care in Mental Health and Substance Use Disorders", current: "69.1", forecast: "82.6", delta: "+13.5", confidence: "High", gaps: "Depression follow-up and SUD screening" },
  { provider: "Priya Shah, CNM", npi: "1942000005", selectedSpecialty: "Gynecology", mvpId: "M1366", mvpName: "Focusing on Women's Health", current: "63.8", forecast: "77.0", delta: "+13.2", confidence: "Medium", gaps: "Chlamydia screening stratification and breast cancer screening" },
  { provider: "Thomas Riley, MD", npi: "1942000006", selectedSpecialty: "Family Medicine", mvpId: "M0005", mvpName: "Value in Primary Care", current: "72.5", forecast: "81.3", delta: "+8.8", confidence: "High", gaps: "Colorectal screening and blood pressure control" },
];

const mvpIndividualGroups = [
  { id: "ZzMVP2", name: "Heart disease clinicians", specialty: "Cardiology", mvpId: "G0055", mvpName: "Advancing Care for Heart Disease" },
  { id: "ZzMVP3", name: "Women's health clinicians", specialty: "Gynecology", mvpId: "M1366", mvpName: "Focusing on Women's Health" },
  { id: "ZzMVP4", name: "Infectious disease and immunology subgroup", specialty: "Infectious Disease", mvpId: "M1368", mvpName: "Prevention and Treatment of Infectious Disorders Including Hepatitis C and HIV" },
  { id: "ZzMVP5", name: "Behavioral health and psychiatry clinicians", specialty: "Mental Health", mvpId: "M1369", mvpName: "Quality Care in Mental Health and Substance Use Disorders" },
];

const mvpIndividualClinicians = {
  ZzMVP2: [
    { name: "Nadia Singh, MD", npi: "1942000002", forecast: "79.1", current: "67.4", confidence: "High" },
    { name: "Robert Kane, PA", npi: "1942000003", forecast: "55.9", current: "48.2", confidence: "Low" },
  ],
  ZzMVP3: [
    { name: "Priya Shah, CNM", npi: "1942000005", forecast: "77.0", current: "63.8", confidence: "Medium" },
  ],
  ZzMVP4: [
    { name: "Jane Coleman, MD", npi: "1942000000", forecast: "74.8", current: "61.2", confidence: "High" },
    { name: "Marcus Bell, NP", npi: "1942000001", forecast: "70.4", current: "58.9", confidence: "Medium" },
  ],
  ZzMVP5: [
    { name: "Elena Morales, MD", npi: "1942000004", forecast: "82.6", current: "69.1", confidence: "High" },
  ],
};

const customerPhaseSteps = [
  {
    phase: "Start",
    title: "Customer Context Loaded",
    decision: "Use the customer’s fixed enabled measures, roster, TIN/NPI eligibility, and participation context to infer which in-app submission paths are available.",
    evidence: "Enabled clinician measures, roster, TIN/NPI eligibility, QPP/APM participation",
  },
  {
    phase: "Path",
    title: "Pick the Recommended Path",
    decision: "Show only the submission paths supported by the known customer setup, with future-state paths prioritized over retiring Traditional MIPS.",
    evidence: "MVP, APP Plus, QRDA availability and transition context",
  },
  {
    phase: "Configure",
    title: "Configure the Path",
    decision: "For MVPs, ask only the necessary follow-up questions: practice composition, specialties, MVP, reporting level, subgroup rationale, and provider forecast.",
    evidence: "Composition, specialty, MVP fit, reporting level, subgroup narrative, forecast score",
  },
  {
    phase: "Submit",
    title: "Register and Submit",
    decision: "Register the MVP/subgroup when required, freeze the package, submit through CMS QPP/API, or generate export files.",
    evidence: "CMS QPP OAuth, subgroup identifier, validation status, receipt status",
  },
];

const smartScoreLift = {
  baseline: "89.5%",
  projected: "93.78",
  benchmark: "88.17",
  recommendationLift: "+5.54",
  providersLift: "9",
  opportunity: "61.4%",
  tinsNeedingReview: "7 TINs",
};

const qppSession = {
  status: "active",
  label: "Logged into CMS QPP",
  remaining: "15 mins",
  user: "b.g.sunil.kumar@oracle.com",
};

const visionStages = [
  {
    id: "strategy",
    timebox: "January-February",
    label: "Strategy",
    title: "Choose the strongest submission strategy",
    promise: "Start the year with a recommended strategy instead of a long measure list.",
    customerQuestion: "What is the most effective strategy for this organization?",
    systemAction: "Forecasts program fit from enabled measures, provider specialty mix, and current performance.",
    artifact: "Approved 2026 submission strategy",
    primaryAction: "Select Recommended Strategy",
  },
  {
    id: "improve",
    timebox: "March-September",
    label: "Improve",
    title: "Turn gaps into routed work",
    promise: "Move from planning to score improvement while there is still time to act.",
    customerQuestion: "Which issues can my teams actually fix this month?",
    systemAction: "Finds likely evidence, separates documentation, workflow, and data-mapping issues, then routes work.",
    artifact: "Prioritized quality work queue",
    primaryAction: "Open Work Queue",
  },
  {
    id: "monitor",
    timebox: "Ongoing",
    label: "Monitor",
    title: "Catch changes before they become submission risk",
    promise: "Watch week-over-week satisfaction changes and surface credible exceptions.",
    customerQuestion: "Where should I direct attention this week?",
    systemAction: "Flags sudden drops, unlikely improvements, stale feeds, and mapping shifts.",
    artifact: "Exception watchlist",
    primaryAction: "Review Exceptions",
  },
  {
    id: "validate",
    timebox: "October-November",
    label: "Validate",
    title: "Validate the representative population",
    promise: "Focus human judgment on the exceptions that matter, not the entire submission.",
    customerQuestion: "Can I stand behind this submission?",
    systemAction: "Selects a representative validation population and performs deep patient, data, and logic checks.",
    artifact: "Validated submission package",
    primaryAction: "Approve Validation",
  },
  {
    id: "submit",
    timebox: "Submission",
    label: "Submit",
    title: "Submit securely without the scramble",
    promise: "Send the approved version through secure OAuth and track CMS response.",
    customerQuestion: "Was the approved data submitted successfully?",
    systemAction: "Uses the active CMS QPP connection to submit, track receipt, and resolve final exceptions.",
    artifact: "CMS receipt and audit trail",
    primaryAction: "Submit to CMS",
  },
];

const visionStrategyRows = [
  { path: "MVP Submission", recommendation: "Recommended", impact: "Highest score lift", rationale: "Best match to specialty mix and enabled measure coverage." },
  { path: "APP Plus", recommendation: "Available", impact: "Use when APM Entity applies", rationale: "Keep visible for customers with APM participation." },
  { path: "QRDA Export", recommendation: "Supporting path", impact: "File fallback", rationale: "Generate only from approved clinician or APM packages." },
  { path: "Traditional MIPS", recommendation: "Transition only", impact: "Retiring", rationale: "Retain as reference while customers migrate to MVPs." },
];

const visionWorkQueueRows = [
  { type: "Evidence likely exists", owner: "Chart chase", count: "428 patients", next: "Agent review queued" },
  { type: "Documentation gap", owner: "Clinical operations", count: "112 patients", next: "Workflow follow-up" },
  { type: "Data mapping issue", owner: "Interface team", count: "3 feeds", next: "Mapping ticket ready" },
];

const visionMonitorRows = [
  { signal: "Depression screening dropped 7.4 pts", cause: "Documentation workflow changed", action: "Route to clinic manager" },
  { signal: "HIV screening improved 18.2 pts", cause: "Improvement exceeds expected trend", action: "Audit sample evidence" },
  { signal: "Blood pressure denominator shifted", cause: "Possible feed or mapping change", action: "Review data lineage" },
];

const visionValidationRows = [
  { check: "Population representativeness", status: "Ready", detail: "Sample mirrors specialty, payer, and measure mix." },
  { check: "Patient qualification logic", status: "Review", detail: "37 records need human judgment." },
  { check: "Evidence traceability", status: "Ready", detail: "Every accepted record links to source evidence." },
];

const visionSubmissionRows = [
  { step: "Package approved", status: "Complete", detail: "MVP subgroup and APP Plus package frozen." },
  { step: "CMS QPP OAuth", status: "Active", detail: `${qppSession.user} - ${qppSession.remaining} remaining.` },
  { step: "CMS receipt", status: "Waiting", detail: "Receipt appears here after secure submission." },
];

const periods = {
  MIPS: ["eCQM 2026 Analytics Calendar 2026", "CQM 2025 Performance Year", "eCQM 2025 Performance Year"],
  MVP: ["CQM 2026 Analytics Calendar 2026", "eCQM 2026 Analytics Calendar 2026", "eCQM CQM 2025 Analytics Calendar 2025", "eCQM CQM 2025 Analytics Calendar 2026"],
  APP: ["APP 2025 Performance Year", "APP 2026 Preview"],
  APPPLUS: ["eCQM 2026 Analytics Calendar 2026", "APP Plus 2025 Performance Year", "APP Plus 2026 Preview"],
  QRDA: ["CY2025", "CY2026 Preview"],
  HQR: ["Hospital Quality Reporting CY2026 Preview", "Hospital IQR CY2025 Submission", "Hospital eCQM CY2026 Preview"],
};

const performanceRows = {
  MIPS: [
    { name: "ZzMount Desert Island Hospital", period: "eCQM 2026 Analytics Calendar 2026", quality: "59% (17.6 out of 30)", providers: 61 },
  ],
  MVP: [
    { participation: "Subgroup", name: "ZzMVP2", mvp: "Heart Disease", period: "eCQM 2026 Analytics Calendar 2026", quality: "40% (11.9 out of 30)", providers: 45 },
    { participation: "Subgroup", name: "ZzMVP3", mvp: "Women's Health", period: "eCQM 2026 Analytics Calendar 2026", quality: "55% (16.65 out of 30)", providers: 45 },
    { participation: "Subgroup", name: "ZzMVP4", mvp: "Infectious Disease, Immunology", period: "eCQM 2026 Analytics Calendar 2026", quality: "37% (11.18 out of 30)", providers: 45 },
    { participation: "Subgroup", name: "ZzMVP5", mvp: "Mental Health, Behavioral Health, Psychiatry", period: "eCQM 2026 Analytics Calendar 2026", quality: "41% (12.3 out of 30)", providers: 53 },
  ],
  APP: [
    { name: "ACO Entity View Test", period: "APP 2025 Performance Year", quality: "loading", providers: 0 },
    { name: "TIN 1: CernerDemo", period: "APP 2025 Performance Year", quality: "loading", providers: 0 },
  ],
  APPPLUS: [
    { name: "CCPM Community Care Partnership of Maine", period: "eCQM 2026 Analytics Calendar 2026", quality: "30% (15.1 out of 50)", tins: 0 },
  ],
  HQR: [
    { name: "ZzMount Desert Island Hospital", period: "Hospital Quality Reporting CY2026 Preview", quality: "86% readiness", providers: 0 },
    { name: "Northern Coast Medical Center", period: "Hospital IQR CY2025 Submission", quality: "74% readiness", providers: 0 },
  ],
};

const submissions = {
  MIPS: {
    Group: [
      { name: "ZzMount Desert Island Hospital", practice: "ZzMount Desert Island Hospital", tin: "3130ccdb", composite: "72.4", quality: "72.4", pi: "pending", ia: "pending" },
      { name: "MIPS Org View Test", practice: "MIPS Org View Test", tin: "000011111", composite: "loading", quality: "FROZEN", pi: "loading", ia: "loading" },
      { name: "TIN 1: CernerDemo", practice: "TIN 1: CernerDemo", tin: "000000011", composite: "loading", quality: "loading", pi: "loading", ia: "loading" },
      { name: "TIN 3: CernerDemo", practice: "TIN 3: CernerDemo", tin: "000988985", composite: "loading", quality: "loading", pi: "loading", ia: "loading" },
      { name: "TIN 4: CernerDemo", practice: "TIN 4: CernerDemo", tin: "000989984", composite: "loading", quality: "loading", pi: "loading", ia: "loading" },
    ],
    Individual: [
      { name: "Individual Submission - Jane Clinician", practice: "TIN 1: CernerDemo", tin: "NPI 1942000000", composite: "draft", quality: "0.0", pi: "pending", ia: "pending" },
    ],
  },
  MVP: {
    Group: [],
    Individual: [],
    Subgroup: [
      { name: "ZzMVP2", practice: "ZzMVP2", tin: "SG-00000002", composite: "40%", quality: "11.9 / 30", pi: "pending", ia: "pending" },
      { name: "ZzMVP3", practice: "ZzMVP3", tin: "SG-00000003", composite: "55%", quality: "16.65 / 30", pi: "pending", ia: "pending" },
    ],
  },
  APP: {
    Group: [
      { name: "APP Group Quality Submission", practice: "ACO Entity View Test", tin: "APM 1000001", composite: "draft", quality: "0.0", pi: "pending", ia: "pending" },
    ],
    Individual: [],
    "APM Entity": [],
  },
  APPPLUS: {
    Group: [
      { name: "CCPM Community Care Partnership of Maine", practice: "CCPM Community Care Partnership of Maine", tin: "0", composite: "30%", quality: "15.1 / 50", pi: "pending", ia: "pending" },
    ],
    Individual: [],
    "APM Entity": [],
  },
  HQR: {
    Hospital: [
      { name: "Hospital Quality eCQM Package", practice: "ZzMount Desert Island Hospital", tin: "CCN 200001", composite: "draft", quality: "86% readiness", pi: "not applicable", ia: "not applicable" },
      { name: "Hospital IQR Submission", practice: "Northern Coast Medical Center", tin: "CCN 200114", composite: "review", quality: "74% readiness", pi: "not applicable", ia: "not applicable" },
    ],
  },
};

const measures = [
  { measure: "Breast Cancer Screening", id: "CMS125v14", ipp: "--", denomExclusions: "--", denom: "--", numerator: "--", exceptions: "--", notMet: "--", rate: "75.38%", score: "0.0", children: [
    { measure: "CMS125v14 - Breast Cancer Screening - Stratum 1", ipp: "579", denomExclusions: "4", denom: "575", numerator: "449", exceptions: "0", notMet: "126" },
    { measure: "CMS125v14 - Breast Cancer Screening - Stratum 2", ipp: "2266", denomExclusions: "71", denom: "2195", numerator: "1639", exceptions: "0", notMet: "556" },
  ] },
  { measure: "Cervical Cancer Screening", id: "CMS124v14", ipp: "2220", denomExclusions: "169", denom: "2051", numerator: "1084", exceptions: "0", notMet: "967", rate: "52.85%", score: "7.5" },
  { measure: "Chlamydia Screening in Women", id: "CMS153v14", ipp: "--", denomExclusions: "--", denom: "--", numerator: "--", exceptions: "--", notMet: "--", rate: "10.42%", score: "5.5", children: [
    { measure: "CMS153v14 - Chlamydia Screening in Women - Stratum 1", ipp: "42", denomExclusions: "2", denom: "40", numerator: "3", exceptions: "0", notMet: "37" },
    { measure: "CMS153v14 - Chlamydia Screening in Women - Stratum 2", ipp: "60", denomExclusions: "4", denom: "56", numerator: "7", exceptions: "0", notMet: "49" },
  ] },
  { measure: "Colorectal Cancer Screening", id: "CMS130v14", ipp: "--", denomExclusions: "--", denom: "--", numerator: "--", exceptions: "--", notMet: "--", rate: "74.25%", score: "0.0", children: [
    { measure: "CMS130v14 - Colorectal Cancer Screening - Stratum 1", ipp: "435", denomExclusions: "2", denom: "433", numerator: "282", exceptions: "0", notMet: "151" },
    { measure: "CMS130v14 - Colorectal Cancer Screening - Stratum 2", ipp: "4437", denomExclusions: "167", denom: "4270", numerator: "3210", exceptions: "0", notMet: "1060" },
  ] },
  { measure: "Controlling High Blood Pressure", id: "CMS165v14", ipp: "2660", denomExclusions: "268", denom: "2392", numerator: "1012", exceptions: "0", notMet: "1380", rate: "42.31%", score: "1.9" },
  { measure: "Coronary Artery Disease (CAD): Beta-Blocker Therapy - Prior Myocardial Infarction (MI) or Left Ventricular Systolic Dysfunction (LVEF <=40%)", id: "CMS145v14", ipp: "--", denomExclusions: "--", denom: "--", numerator: "--", exceptions: "--", notMet: "--", rate: "53.7%", score: "1.0", children: [
    { measure: "CMS145v14 - Coronary Artery Disease (CAD): Beta-Blocker Therapy - Prior Myocardial Infarction (MI) - Population 2 - Group", ipp: "444", denomExclusions: "0", denom: "0", numerator: "0", exceptions: "0", notMet: "0" },
  ] },
  { measure: "Preventive Care and Screening: Body Mass Index (BMI) Screening", id: "CMS69v14", ipp: "7778", denomExclusions: "100", denom: "7678", numerator: "2110", exceptions: "0", notMet: "5568", rate: "27.48%", score: "1.9" },
];

const mvpScorecards = {
  ZzMVP2: {
    mvpId: "G0055",
    subgroupId: "SG-00000002",
    measures: [
      { measure: "Coronary Artery Disease (CAD): Beta-Blocker Therapy - Prior Myocardial Infarction (MI) or Left Ventricular Systolic Dysfunction (LVEF <= 40%)", id: "CMS145v14", ipp: "--", denomExclusions: "--", denom: "--", numerator: "--", exceptions: "--", notMet: "--", rate: "52.83%", score: "1.0", children: [
        { measure: "CMS145v14 - Coronary Artery Disease (CAD): Beta-Blocker Therapy-Left Ventricular Systolic Dysfunction (LVEF <=40%) - Population 1 - Group", ipp: "434", denomExclusions: "0", denom: "0", numerator: "0", exceptions: "0", notMet: "0" },
      ] },
    ],
  },
  ZzMVP3: {
    mvpId: "M1366",
    subgroupId: "SG-00000003",
    measures: [
      { measure: "Chlamydia Screening in Women", id: "CMS153v14", ipp: "--", denomExclusions: "--", denom: "--", numerator: "--", exceptions: "--", notMet: "--", rate: "10.42%", score: "5.5", children: [
        { measure: "CMS153v14 - Chlamydia Screening in Women - Stratum 1", ipp: "42", denomExclusions: "2", denom: "40", numerator: "3", exceptions: "0", notMet: "37" },
        { measure: "CMS153v14 - Chlamydia Screening in Women - Stratum 2", ipp: "60", denomExclusions: "4", denom: "56", numerator: "7", exceptions: "0", notMet: "49" },
      ] },
    ],
  },
  ZzMVP4: {
    mvpId: "M1368",
    subgroupId: "SG-00000004",
    measures: [
      { measure: "Chlamydia Screening in Women", id: "CMS153v14", ipp: "--", denomExclusions: "--", denom: "--", numerator: "--", exceptions: "--", notMet: "--", rate: "9.64%", score: "5.4", children: [
        { measure: "CMS153v14 - Chlamydia Screening in Women - Stratum 1", ipp: "40", denomExclusions: "2", denom: "38", numerator: "3", exceptions: "0", notMet: "35" },
        { measure: "CMS153v14 - Chlamydia Screening in Women - Stratum 2", ipp: "47", denomExclusions: "2", denom: "45", numerator: "5", exceptions: "0", notMet: "40" },
      ] },
      { measure: "HIV Screening", id: "CMS349v8", ipp: "4366", denomExclusions: "0", denom: "4366", numerator: "0", exceptions: "6", notMet: "4360", rate: "0.0%", score: "0.0" },
      { measure: "Preventive Care and Screening: Screening for Depression and Follow-Up Plan", id: "CMS2v15", ipp: "8057", denomExclusions: "238", denom: "7819", numerator: "6761", exceptions: "0", notMet: "1058", rate: "86.47%", score: "9.5" },
    ],
  },
  ZzMVP5: {
    mvpId: "M1369",
    subgroupId: "SG-00000005",
    measures: [
      { measure: "Preventive Care and Screening: Screening for Depression and Follow-Up Plan", id: "CMS2v15", ipp: "8057", denomExclusions: "238", denom: "7819", numerator: "6761", exceptions: "0", notMet: "1058", rate: "86.47%", score: "9.5" },
    ],
  },
};

const scorecardsByProgram = {
  MIPS: {
    "ZzMount Desert Island Hospital": {
      measures,
      entities: ["ZzMount Desert Island Hospital"],
    },
  },
  APPPLUS: {
    "CCPM Community Care Partnership of Maine": {
      measures: [
        measures[0],
        measures[3],
        measures[4],
      ],
      entities: ["CCPM Community Care Partnership of Maine"],
    },
  },
  HQR: {
    "ZzMount Desert Island Hospital": {
      measures: [
        measures[1],
        measures[3],
        measures[6],
      ],
      entities: ["ZzMount Desert Island Hospital", "Northern Coast Medical Center"],
    },
  },
};

const pathwayCards = [
  {
    title: "Traditional MIPS",
    text: "The original framework available to MIPS eligible clinicians for collecting and reporting data to MIPS. Performance is measured across Quality, Improvement Activities, Promoting Interoperability, and Cost.",
    buttons: [{ label: "Open MIPS", program: "MIPS" }],
  },
  {
    title: "MIPS Value Pathways (MVP)",
    text: "MVPs are one way to meet MIPS reporting requirements. MVPs include a subset of measures and activities tied to a specialty, clinical condition, or episode of care.",
    buttons: [{ label: "Open MVP", program: "MVP" }],
  },
  {
    title: "APM Performance Pathways (APP Plus)",
    text: "APM Performance Pathways provide predetermined measure sets for MIPS APM participants. APP Plus supports expanded quality measure reporting for the 2025 performance period and preview workflows.",
    buttons: [{ label: "Open APP Plus", program: "APPPLUS" }],
  },
  {
    title: "Quality Reporting Document Architecture (QRDA)",
    text: "QRDA supports Category I and Category III file generation for program, scope, and performance-period based quality data exchange.",
    buttons: [{ label: "Open QRDA", program: "QRDA" }],
  },
];

const navByProgram = {
  MIPS: ["Performance", "Submissions", "Group", "Individual", "Upload", "Provider Profile", "Flow Map"],
  MVP: ["Performance", "Submissions", "Group", "Individual", "Subgroup", "Upload", "Flow Map"],
  APP: ["Performance", "Submissions", "Group", "Individual", "APM Entity", "Upload", "Flow Map"],
  APPPLUS: ["Performance", "Submissions", "Group", "Individual", "APM Entity", "Upload", "Flow Map"],
  QRDA: ["Export QRDA", "Generated QRDA Files", "Flow Map"],
  HQR: ["Performance", "Submissions", "Hospital", "Upload", "Flow Map"],
};

const programSelect = document.getElementById("programSelect");
const labModeSelect = document.getElementById("labModeSelect");
const scenarioSelect = document.getElementById("scenarioSelect");
const runScenarioButton = document.getElementById("runScenarioButton");
const sidebar = document.getElementById("sidebar");
const content = document.getElementById("content");
const toast = document.getElementById("toast");

programSelect.addEventListener("change", (event) => {
  setProgram(event.target.value, event.target.value === "QRDA" ? "export-qrda" : "performance");
});

document.querySelector(".brand").addEventListener("click", () => {
  state.route = "home";
  render();
});

labModeSelect.addEventListener("change", (event) => {
  state.labMode = event.target.value;
  state.labStep = 0;
  applyScenario(state.scenario, state.labMode === "production");
});

scenarioSelect.addEventListener("change", (event) => {
  state.scenario = event.target.value;
  state.labStep = 0;
  resetMvpSpecialtySelection();
  if (state.labMode === "production") {
    applyScenario(state.scenario, true);
  } else {
    render();
  }
});

runScenarioButton.addEventListener("click", () => {
  applyScenario(state.scenario, state.labMode === "production");
});

function setProgram(program, route = "performance") {
  state.program = program;
  state.route = route;
  state.selectedOrg = null;
  state.selectedSubmission = null;
  state.selectedSubmissionScope = null;
  state.selectedIndividualGroup = "";
  state.selectedIndividualClinician = "";
  state.scoreTab = "Summary";
  programSelect.value = program;
  render();
}

function setRoute(route) {
  state.route = route;
  state.selectedOrg = null;
  state.selectedSubmission = null;
  state.selectedSubmissionScope = route.startsWith("submissions-") ? route.replace("submissions-", "") : null;
  state.scoreTab = "Summary";
  render();
}

function resetMvpSpecialtySelection() {
  state.mvpSpecialty = null;
  state.mvpSpecialties = null;
  state.practiceComposition = "multi";
}

function applyScenario(scenarioKey, mutateProductionRoute) {
  const scenario = scenarioDefinitions[scenarioKey];
  if (!scenario) return;
  state.scenario = scenarioKey;
  state.labStep = 0;
  resetMvpSpecialtySelection();
  scenarioSelect.value = scenarioKey;
  labModeSelect.value = state.labMode;
  if (mutateProductionRoute) {
    state.program = scenario.program;
    state.route = scenario.route;
    state.selectedOrg = scenario.selectedOrg;
    state.selectedSubmission = null;
    state.selectedSubmissionScope = scenario.route.startsWith("submissions-") ? scenario.route.replace("submissions-", "") : null;
    state.selectedIndividualGroup = scenarioKey === "mvp-individual" ? "" : state.selectedIndividualGroup;
    state.selectedIndividualClinician = "";
    state.scoreTab = "Summary";
    programSelect.value = scenario.program;
  }
  render();
}

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("show");
  window.setTimeout(() => toast.classList.remove("show"), 2200);
}

function render() {
  labModeSelect.value = state.labMode;
  scenarioSelect.value = state.scenario;
  content.classList.remove("flush");
  if (state.labMode !== "production") {
    return renderDesignLab();
  }
  document.querySelector(".app-shell").classList.remove("design-lab-mode");
  const isHome = state.route === "home";
  document.querySelector(".body-grid").classList.toggle("home-mode", isHome);
  document.querySelector(".app-shell").classList.toggle("home-mode", isHome);
  renderSidebar();
  if (state.route === "home") return renderHome();
  if (state.route === "performance") return renderPerformance();
  if (state.route === "performance-detail") return renderPerformanceDetail();
  if (state.route === "submissions-overview") return renderSubmissionsOverview();
  if (state.route.startsWith("submissions-")) return renderSubmissions(state.route.replace("submissions-", ""));
  if (state.route === "submission-detail") return renderSubmissionDetail();
  if (state.route === "new-submission") return renderNewSubmission();
  if (state.route === "upload") return renderUpload();
  if (state.route === "provider-profile") return renderProviderProfile();
  if (state.route === "export-qrda") return renderQrdaExport();
  if (state.route === "generated-qrda-files") return renderQrdaFiles();
  if (state.route === "flow-map") return renderFlowMap();
}

function renderSidebar() {
  if (state.route === "home") {
    sidebar.innerHTML = "";
    return;
  }
  const items = navByProgram[state.program];
  const active = routeLabel(state.route);
  sidebar.innerHTML = `
    <div class="program-title">${programLabel(state.program)}</div>
    <nav class="nav-list" aria-label="${programLabel(state.program)} navigation">
      ${items.map((item) => navButton(item, active)).join("")}
    </nav>
    <div class="nav-spacer"></div>
    <div class="engine"><strong>${state.program === "QRDA" ? "QRDA EXPORT ENGINE" : state.program + " SCORING ENGINE"}</strong>ORACLE</div>
  `;
  sidebar.querySelectorAll("[data-nav]").forEach((button) => {
    button.addEventListener("click", () => setRoute(navRoute(button.dataset.nav)));
  });
}

function navButton(item, active) {
  const child = ["Group", "Individual", "Subgroup", "APM Entity", "Hospital"].includes(item) ? " child" : "";
  const selected = item === active ? " active" : "";
  return `<button class="nav-item${child}${selected}" data-nav="${item}">${item}</button>`;
}

function navRoute(label) {
  const map = {
    Performance: "performance",
    Submissions: "submissions-overview",
    Group: "submissions-Group",
    Individual: "submissions-Individual",
    Subgroup: "submissions-Subgroup",
    "APM Entity": "submissions-APM Entity",
    Hospital: "submissions-Hospital",
    Upload: "upload",
    "Provider Profile": "provider-profile",
    "Export QRDA": "export-qrda",
    "Generated QRDA Files": "generated-qrda-files",
    "Flow Map": "flow-map",
  };
  return map[label] || "performance";
}

function routeLabel(route) {
  if (route === "performance" || route === "performance-detail") return "Performance";
  if (route.startsWith("submissions-") || route === "submission-detail" || route === "new-submission") return route.replace("submissions-", "");
  if (route === "upload") return "Upload";
  if (route === "provider-profile") return "Provider Profile";
  if (route === "export-qrda") return "Export QRDA";
  if (route === "generated-qrda-files") return "Generated QRDA Files";
  if (route === "flow-map") return "Flow Map";
  return "";
}

function programLabel(program) {
  if (program === "APPPLUS") return "APP Plus";
  if (program === "MVP") return "MVP Submission";
  if (program === "HQR") return "Hospital Quality Reporting";
  return program;
}

function submissionTitle(program) {
  if (program === "MVP") return "MVP Submission";
  if (program === "QRDA") return "QRDA Package";
  return `${programLabel(program)} Submission`;
}

function strategyTitle(program) {
  if (program === "MVP") return "MVP Submission Strategy";
  if (program === "HQR") return "Hospital Quality Reporting Strategy";
  return `${programLabel(program)} Submission Strategy`;
}

function scenarioCustomer(scenario) {
  return scenario.program === "APPPLUS" ? customerProfiles.ccpm : customerProfiles.zmdi;
}

function availablePrograms(profile) {
  return programOrder.filter((program) => profile.programs[program]?.status !== "hidden");
}

function programStatus(profile, program) {
  return profile.programs[program] || { status: "disabled", label: "Not configured", note: "This pathway is not part of the customer strategy." };
}

function currentMeasureProfile() {
  return state.program === "APPPLUS" || state.scenario === "appplus-score" ? measureInventoryProfiles.appplus : measureInventoryProfiles.zmdi;
}

function measureCounts(profile) {
  return profile.measures.reduce((counts, measure) => {
    counts.total += 1;
    counts[measure.owner] = (counts[measure.owner] || 0) + 1;
    counts[measure.type] = (counts[measure.type] || 0) + 1;
    if (measure.programs.length) counts.submissionSelected += 1;
    else counts.analyticsOnly += 1;
    measure.programs.forEach((program) => {
      counts.programs[program] = (counts.programs[program] || 0) + 1;
    });
    return counts;
  }, { total: 0, EC: 0, APM: 0, eCQM: 0, CQM: 0, submissionSelected: 0, analyticsOnly: 0, programs: {} });
}

function enabledSpecialties(profile) {
  return [...new Set(profile.measures.filter((measure) => measure.owner === "EC").map((measure) => measure.specialty))];
}

function enabledMeasureIds(profile = currentMeasureProfile()) {
  return new Set(profile.measures.map((measure) => measure.id));
}

function mvpMeasureFit(row, profile = currentMeasureProfile()) {
  const required = mvpMeasureRequirements[row.id] || [];
  const enabled = enabledMeasureIds(profile);
  if (!required.length) {
    return { status: "review", label: "Needs measure review", reason: "Measure fit must be confirmed before this MVP can be selected." };
  }
  const matched = required.filter((id) => enabled.has(id));
  if (matched.length === required.length) {
    return { status: "ready", label: "Recommended", reason: "Enabled measure coverage supports this MVP." };
  }
  if (matched.length > 0) {
    return { status: "partial", label: "Partial fit", reason: "Some supporting measures are enabled; review gaps before selecting." };
  }
  return { status: "blocked", label: "Not available", reason: "This MVP is not supported by the customer’s enabled measure set." };
}

function pathwayEligibility(profile = currentMeasureProfile()) {
  const counts = measureCounts(profile);
  const mvpMeasures = counts.programs.MVP || 0;
  const appPlusMeasures = counts.programs.APPPLUS || 0;
  const qrdaMeasures = counts.programs.QRDA || 0;
  const mipsMeasures = counts.programs.MIPS || 0;
  return {
    MVP: {
      status: mvpMeasures > 0 ? "recommended" : "hidden",
      label: mvpMeasures > 0 ? "Recommended" : "No MVP-selected measures",
      evidence: mvpMeasures > 0 ? "Best fit based on enabled clinician quality measures and specialty coverage." : "No supported MVP path found from this customer setup.",
      next: "Confirm practice composition, choose specialty focus, then pick a supported MVP.",
    },
    APPPLUS: {
      status: appPlusMeasures > 0 ? "recommended" : counts.EC > 0 ? "applicable" : "hidden",
      label: appPlusMeasures > 0 ? "Primary" : counts.EC > 0 ? "Available if APM entity applies" : "Not applicable",
      evidence: appPlusMeasures > 0 ? "Customer has APM Entity reporting signals." : counts.EC > 0 ? "Available only if APM Entity participation applies." : "Not supported by this customer setup.",
      next: "Confirm APM Entity participation and APP Plus measure package.",
    },
    QRDA: {
      status: qrdaMeasures > 0 ? "applicable" : "hidden",
      label: qrdaMeasures > 0 ? "Export path" : "No QRDA-selected measures",
      evidence: qrdaMeasures > 0 ? "Export is available for supported clinician/APM submission packages." : "No supported QRDA export path found.",
      next: "Generate QRDA I/III files for the selected path and scope.",
    },
    MIPS: {
      status: mipsMeasures > 0 ? "transition" : "hidden",
      label: mipsMeasures > 0 ? "Transition only" : "No MIPS-selected measures",
      evidence: mipsMeasures > 0 ? "Legacy context only while Traditional MIPS retires." : "No legacy MIPS context needed.",
      next: "Keep as reference; steer new decisions toward MVP where possible.",
    },
  };
}

function availableProgramsFromMeasures(profile = currentMeasureProfile()) {
  const eligibility = pathwayEligibility(profile);
  return programOrder.filter((program) => eligibility[program]?.status !== "hidden");
}

function eligibilityRank(status) {
  const order = { recommended: 0, applicable: 1, transition: 2, hidden: 3 };
  return order[status] ?? 4;
}

function sortedEligiblePrograms(profile = currentMeasureProfile()) {
  const eligibility = pathwayEligibility(profile);
  return availableProgramsFromMeasures(profile).sort((a, b) => eligibilityRank(eligibility[a].status) - eligibilityRank(eligibility[b].status));
}

function pathwayEligibilityClass(status) {
  if (status === "recommended") return "ok";
  if (status === "applicable") return "";
  if (status === "transition") return "warn";
  return "disabled";
}

function firstEligibleProgram(profile = currentMeasureProfile()) {
  return sortedEligiblePrograms(profile)[0] || "MVP";
}

function selectedIndividualGroup() {
  return mvpIndividualGroups.find((group) => group.id === state.selectedIndividualGroup) || null;
}

function cliniciansForSelectedGroup() {
  return state.selectedIndividualGroup ? (mvpIndividualClinicians[state.selectedIndividualGroup] || []) : [];
}

function selectedIndividualClinician() {
  return cliniciansForSelectedGroup().find((clinician) => clinician.npi === state.selectedIndividualClinician) || null;
}

function individualDraftName() {
  const clinician = selectedIndividualClinician();
  return clinician ? `Individual MVP Draft - ${clinician.name}` : "Individual MVP Draft";
}

function statusLabel(status) {
  const labels = {
    active: "Active",
    legacy: "Transition",
    disabled: "Unavailable",
    hidden: "Hidden",
    recommended: "Recommended",
    applicable: "Applicable",
    transition: "Transition",
  };
  return labels[status] || status;
}

function currentWorkflow(scenario) {
  const steps = workflowSteps(scenario);
  const index = Math.min(state.labStep, steps.length - 1);
  return { steps, index, step: steps[index] };
}

function workflowPercent(workflow) {
  return Math.round(((workflow.index + 1) / workflow.steps.length) * 100);
}

function workflowBadge(index) {
  return ["Start", "Choose", "Validate", "Package", "Track"][index] || `Step ${index + 1}`;
}

function renderGuidedChecklist(scenario, options = {}) {
  const workflow = currentWorkflow(scenario);
  const percent = workflowPercent(workflow);
  return `
    <section class="guided-checklist ${options.compact ? "compact" : ""}">
      <div class="checklist-topline">
        <div>
          <span class="eyebrow">Primary Workflow</span>
          <strong>Start here: ${workflow.step.title}</strong>
        </div>
        <span>${percent}% complete</span>
      </div>
      <div class="progress-track" aria-label="${percent}% complete">
        <div style="width: ${percent}%"></div>
      </div>
      <ol>
        ${workflow.steps.map((step, index) => `
          <li class="${index === workflow.index ? "active" : index < workflow.index ? "complete" : ""}">
            <button data-lab-step="${index}">
              <span>${index < workflow.index ? "Done" : workflowBadge(index)}</span>
              <strong>${step.title}</strong>
            </button>
          </li>
        `).join("")}
      </ol>
    </section>
  `;
}

function renderCustomerPhaseGuide(scenario, options = {}) {
  const workflow = currentWorkflow(scenario);
  const activeIndex = Math.min(workflow.index, customerPhaseSteps.length - 1);
  const percent = workflowPercent(workflow);
  return `
    <section class="customer-phase-guide primary-sequence ${options.compact ? "compact" : ""}">
      <div class="phase-guide-title">
        <div>
          <span class="eyebrow">Customer Action Plan</span>
          <h3>Start here: Step ${activeIndex + 1}: ${customerPhaseSteps[activeIndex].phase}</h3>
          <p>${customerPhaseSteps[activeIndex].title}. ${customerPhaseSteps[activeIndex].decision}</p>
        </div>
        <span>${percent}% complete</span>
      </div>
      <div class="progress-track" aria-label="${percent}% complete">
        <div style="width: ${percent}%"></div>
      </div>
      <div class="phase-card-row">
        ${customerPhaseSteps.map((step, index) => `
          <article class="${index === activeIndex ? "active" : index < activeIndex ? "complete" : "locked"}">
            <div class="step-card-top">
              <span>Step ${index + 1}</span>
              <em>${step.phase}</em>
            </div>
            <strong>${step.title}</strong>
            <p>${step.decision}</p>
            <em>${step.evidence}</em>
            <small>${index < activeIndex ? "Completed" : index === activeIndex ? "Current step" : `Locked until Step ${index} is complete`}</small>
          </article>
        `).join("")}
      </div>
    </section>
  `;
}

function scenarioDefaultSpecialty(scenario) {
  if (state.scenario === "mvp-zmvp4") return "Infectious Disease";
  if (state.scenario === "mvp-individual") return "Cardiology";
  if (state.scenario === "new-submission") return "Infectious Disease";
  if (scenario.selectedOrg === "ZzMVP2") return "Cardiology";
  if (scenario.selectedOrg === "ZzMVP3") return "Gynecology";
  if (scenario.selectedOrg === "ZzMVP5") return "Mental Health";
  return "All Specialties";
}

function scenarioDefaultSpecialties(scenario) {
  if (state.scenario === "mvp-zmvp4") return ["Infectious Disease", "Mental Health", "Cardiology"];
  if (state.scenario === "new-submission") return ["Infectious Disease", "Mental Health"];
  const specialty = scenarioDefaultSpecialty(scenario);
  return specialty === "All Specialties" ? ["Primary Care"] : [specialty];
}

function selectedPracticeComposition() {
  return state.practiceComposition || "multi";
}

function selectedMvpSpecialty(scenario) {
  return selectedMvpSpecialties(scenario)[0] || scenarioDefaultSpecialty(scenario);
}

function selectedMvpSpecialties(scenario) {
  if (Array.isArray(state.mvpSpecialties) && state.mvpSpecialties.length) return state.mvpSpecialties;
  if (state.mvpSpecialty) return [state.mvpSpecialty];
  return selectedPracticeComposition() === "multi" ? scenarioDefaultSpecialties(scenario) : [scenarioDefaultSpecialty(scenario)];
}

function mvpSpecialtyOptions() {
  const options = new Set(["All Specialties"]);
  mvpCatalogRows.forEach((row) => row.specialties.forEach((specialty) => options.add(specialty)));
  return [...options].sort((a, b) => a === "All Specialties" ? -1 : b === "All Specialties" ? 1 : a.localeCompare(b));
}

function mvpClinicalSpecialtyOptions() {
  return mvpSpecialtyOptions().filter((option) => option !== "All Specialties");
}

function matchesSpecialty(row, specialty) {
  return specialty === "All Specialties" || row.specialties.includes(specialty);
}

function matchesAnySpecialty(row, specialties) {
  return !specialties.length || specialties.includes("All Specialties") || specialties.some((specialty) => row.specialties.includes(specialty));
}

function recommendedMvpRows(scenario) {
  const specialties = selectedMvpSpecialties(scenario);
  const exact = mvpCatalogRows.filter((row) => matchesAnySpecialty(row, specialties));
  const source = exact.length ? exact : mvpCatalogRows;
  return source.slice().sort((a, b) => {
    const aMatch = matchesAnySpecialty(a, specialties) ? 0 : 1;
    const bMatch = matchesAnySpecialty(b, specialties) ? 0 : 1;
    if (aMatch !== bMatch) return aMatch - bMatch;
    const fitOrder = { ready: 0, partial: 1, review: 2, blocked: 3 };
    const fitDelta = (fitOrder[mvpMeasureFit(a).status] ?? 4) - (fitOrder[mvpMeasureFit(b).status] ?? 4);
    if (fitDelta !== 0) return fitDelta;
    const order = { Recommended: 0, Candidate: 1, "Needs review": 2 };
    return (order[a.status] ?? 3) - (order[b.status] ?? 3);
  });
}

function renderProviderAssignmentPlanner(scenario, options = {}) {
  const specialties = selectedMvpSpecialties(scenario);
  const rows = providerAssignmentRows.filter((row) => specialties.includes("All Specialties") || specialties.includes(row.specialty));
  const visibleRows = (rows.length ? rows : providerAssignmentRows).slice(0, options.compact ? 3 : 6);
  return `
    <section class="provider-assignment-planner ${options.compact ? "compact" : ""}">
      <div class="phase-guide-title">
        <div>
          <span class="eyebrow">MVP Assignment Planning</span>
          <h3>Choose specialty, then assign providers to an MVP</h3>
          <p>The facility selects the specialty/MVP context. TIN/NPI tells us roster and eligibility, but it is not enough to infer specialty or the best MVP.</p>
        </div>
        <span>TIN/NPI based</span>
      </div>
      <div class="assignment-practice-note">
        <strong>Preloaded input</strong>
        <span>TIN/NPI eligibility, provider roster, and historical measure performance are loaded. Specialty and MVP intent are customer-selected inputs.</span>
      </div>
      <div class="assignment-table-wrap">
        <table class="assignment-table">
          <thead>
            <tr>
              <th>Specialty</th>
              <th>Cohort</th>
              <th>TIN/NPI Basis</th>
              <th>Recommended Level</th>
              <th>MVP</th>
              <th>Rationale</th>
            </tr>
          </thead>
          <tbody>
            ${visibleRows.map((row) => `
              <tr>
                <td><strong>${row.specialty}</strong></td>
                <td>${row.cohort}</td>
                <td>${row.tinNpi}</td>
                <td><span class="status-chip ready">${row.recommendedLevel}</span></td>
                <td><strong>${row.mvpId}</strong><span class="subline">${row.mvpName}</span></td>
                <td>${row.rationale}</td>
              </tr>
            `).join("")}
          </tbody>
        </table>
      </div>
    </section>
  `;
}

function selectedSpecialtySummary(scenario) {
  const specialties = selectedMvpSpecialties(scenario);
  return specialties.length > 2 ? `${specialties.slice(0, 2).join(", ")} +${specialties.length - 2}` : specialties.join(", ");
}

function renderPracticeSpecialtyGate(scenario, options = {}) {
  const composition = selectedPracticeComposition();
  const specialties = selectedMvpSpecialties(scenario);
  const specialtyOptions = mvpClinicalSpecialtyOptions();
  const singleSpecialty = selectedMvpSpecialty(scenario);
  return `
    <section class="practice-specialty-gate ${composition} ${options.compact ? "compact" : ""}">
      <div class="phase-guide-title">
        <div>
          <span class="eyebrow">Step 1: Practice Composition</span>
          <h3>Is the practice single-specialty or multi-specialty?</h3>
          <p>This is the first MVP routing decision. It determines whether the customer selects one specialty or several specialties before the MVP submission list is narrowed.</p>
        </div>
        <span>${composition === "single" ? "Single-specialty" : "Multi-specialty"} basis</span>
      </div>
      <div class="composition-toggle" role="radiogroup" aria-label="Practice composition">
        <label class="${composition === "single" ? "selected" : ""}">
          <input type="radio" name="practice-composition" value="single" data-practice-composition${composition === "single" ? " checked" : ""} />
          <strong>Single-specialty</strong>
          <span>Choose one specialty and show matching MVPs.</span>
        </label>
        <label class="${composition === "multi" ? "selected" : ""}">
          <input type="radio" name="practice-composition" value="multi" data-practice-composition${composition === "multi" ? " checked" : ""} />
          <strong>Multi-specialty</strong>
          <span>Choose all applicable specialties and show MVPs that fit any selected specialty.</span>
        </label>
      </div>
      ${composition === "single" ? `
        <label class="single-specialty-select">
          Step 2: Specialty
          <select data-mvp-specialty aria-label="Single specialty">
            ${specialtyOptions.map((option) => `<option value="${option}"${option === singleSpecialty ? " selected" : ""}>${option}</option>`).join("")}
          </select>
        </label>
      ` : `
        <div class="specialty-check-grid" aria-label="Selected specialties">
          <div>
            <span>Step 2: Specialties</span>
            <strong>${specialties.length} selected</strong>
          </div>
          ${specialtyOptions.map((option) => `
            <label class="${specialties.includes(option) ? "checked" : ""}">
              <input type="checkbox" value="${option}" data-mvp-specialty-option${specialties.includes(option) ? " checked" : ""} />
              <span>${option}</span>
            </label>
          `).join("")}
        </div>
      `}
    </section>
  `;
}

function renderMvpReportingLevelRules(options = {}) {
  return `
    <section class="mvp-reporting-rules ${options.compact ? "compact" : ""}">
      <div class="phase-guide-title">
        <div>
          <span class="eyebrow">MVP Reporting Level Rules</span>
          <h3>Group reporting depends on specialty mix and small-practice status</h3>
          <p>Use this decision table before enabling a group MVP package for the selected facility.</p>
        </div>
        <span>PY 2026 rule</span>
      </div>
      <div class="assignment-table-wrap">
        <table class="assignment-table">
          <thead>
            <tr><th>Level</th><th>Status</th><th>Rule</th><th>Prototype Decision</th></tr>
          </thead>
          <tbody>
            ${mvpReportingLevelRules.map((row) => `
              <tr>
                <td><strong>${row.level}</strong></td>
                <td><span class="status-chip ${row.status.includes("Blocked") ? "warn" : "ready"}">${row.status}</span></td>
                <td>${row.rule}</td>
                <td>${row.userDecision}</td>
              </tr>
            `).join("")}
          </tbody>
        </table>
      </div>
    </section>
  `;
}

function renderSubgroupCompositionForm(options = {}) {
  return `
    <section class="subgroup-composition ${options.compact ? "compact" : ""}">
      <div class="phase-guide-title">
        <div>
          <span class="eyebrow">CMS Registration Input</span>
          <h3>Subgroup composition and rationale</h3>
          <p>Capture why these clinicians belong together before registration or provider assignment is locked.</p>
        </div>
        <span>Informational narrative</span>
      </div>
      <div class="composition-grid">
        <label>
          Subgroup composition
          <select aria-label="Subgroup composition">
            <option>Single-specialty subgroup</option>
            <option selected>Multispecialty subgroup</option>
          </select>
        </label>
        <label>
          Registration name
          <input value="West Side Musculoskeletal Care Subgroup" aria-label="Subgroup registration name" />
        </label>
        <label>
          Clinicians included
          <input value="Orthopedic surgeons, physical therapists, NPs, associated clinicians" aria-label="Clinicians included" />
        </label>
      </div>
      <label class="composition-narrative">
        Subgroup Composition Narrative <span>(for informational purposes only)</span>
        <textarea aria-label="Subgroup composition narrative">This subgroup represents our west side practice, which uses one EHR platform and collaborates on patient care across orthopedic surgeons, physical therapists, nurse practitioners (NPs), and other associated clinicians.</textarea>
      </label>
      <div class="composition-example">
        <strong>CMS-style example</strong>
        <span>Describe and provide rationale for how the facility chose which clinicians to include in the subgroup, such as shared practice location, EHR platform, patient population, care team, or specialty focus.</span>
      </div>
    </section>
  `;
}

function mvpForecastRowsForSpecialties(specialties) {
  const rows = specialties.includes("All Specialties") ? providerMvpForecastRows : providerMvpForecastRows.filter((row) => specialties.includes(row.selectedSpecialty));
  return rows.length ? rows : providerMvpForecastRows.slice(0, 4);
}

function renderProviderMvpForecast(scenario, options = {}) {
  const specialties = selectedMvpSpecialties(scenario);
  const rows = mvpForecastRowsForSpecialties(specialties).slice(0, options.compact ? 3 : 7);
  const avgForecast = rows.length ? Math.round(rows.reduce((sum, row) => sum + Number(row.forecast), 0) / rows.length) : 0;
  return `
    <section class="provider-mvp-forecast ${options.compact ? "compact" : ""}">
      <div class="phase-guide-title">
        <div>
          <span class="eyebrow">Provider Performance Forecast</span>
          <h3>Forecast performance as providers are assigned to the selected MVP</h3>
          <p>Projected score uses the provider’s historical measure performance against the measures included in the selected MVP. Practice composition and specialties are selected by the facility.</p>
        </div>
        <span>${avgForecast}% projected avg</span>
      </div>
      <div class="forecast-controls">
        <label>Practice composition<select data-practice-composition-select aria-label="Forecast practice composition"><option value="single"${selectedPracticeComposition() === "single" ? " selected" : ""}>Single-specialty</option><option value="multi"${selectedPracticeComposition() === "multi" ? " selected" : ""}>Multi-specialty</option></select></label>
        <label>Selected specialties<input value="${selectedSpecialtySummary(scenario)}" aria-label="Selected specialty summary" readonly /></label>
        <label>Assignment mode<select aria-label="Assignment mode"><option>Subgroup recommended</option><option>Individual review</option><option>APM Entity if applicable</option><option>Group if allowed</option></select></label>
      </div>
      <div class="assignment-table-wrap">
        <table class="assignment-table forecast-table">
          <thead>
            <tr><th>Provider</th><th>Selected Specialty</th><th>MVP</th><th class="numeric">Current</th><th class="numeric">Forecast</th><th>Confidence</th><th>Performance Drivers</th><th></th></tr>
          </thead>
          <tbody>
            ${rows.map((row) => `
              <tr>
                <td><strong>${row.provider}</strong><span class="subline">NPI ${row.npi}</span></td>
                <td>${row.selectedSpecialty}</td>
                <td><strong>${row.mvpId}</strong><span class="subline">${row.mvpName}</span></td>
                <td class="numeric">${row.current}</td>
                <td class="numeric"><strong>${row.forecast}</strong><span class="subline">${row.delta}</span></td>
                <td><span class="status-chip ${row.confidence === "High" ? "ready" : "warn"}">${row.confidence}</span></td>
                <td>${row.gaps}</td>
                <td><button class="link" data-toast="${row.provider} assigned to ${row.mvpId} forecast cohort">Assign</button></td>
              </tr>
            `).join("")}
          </tbody>
        </table>
      </div>
    </section>
  `;
}

function renderMvpSelectionWorkbench(scenario, options = {}) {
  const active = scenario.program === "MVP" || state.scenario.startsWith("mvp") || state.scenario === "new-submission";
  const specialties = selectedMvpSpecialties(scenario);
  const specialtySummary = selectedSpecialtySummary(scenario);
  const filteredRows = recommendedMvpRows(scenario);
  const visibleRows = options.compact ? filteredRows.slice(0, 3) : filteredRows;
  const supportedCount = visibleRows.filter((row) => ["ready", "partial"].includes(mvpMeasureFit(row).status)).length;
  const unavailableCount = visibleRows.filter((row) => mvpMeasureFit(row).status === "blocked").length;
  return `
    <section class="mvp-selection-workbench ${active ? "active" : ""} ${options.compact ? "compact" : ""}">
      <div class="mvp-selector-heading">
        <div>
          <span class="eyebrow">MVP Submission Decision</span>
          <h3>Facility chooses composition, specialties, MVP, measures, and reporting level</h3>
          <p>The prototype does not infer specialty from TIN/NPI. The facility first declares whether the practice is single-specialty or multi-specialty, then selects the applicable specialties to narrow the MVP submission list.</p>
        </div>
        <div class="mvp-rule-card">
          <span>Rule of thumb</span>
          <strong>Composition comes first.</strong>
          <em>TIN/NPI supports roster and eligibility; it does not choose the MVP. Group reporting depends on specialty mix and small-practice status.</em>
        </div>
      </div>
      ${renderPracticeSpecialtyGate(scenario, { compact: options.compact })}
      <div class="mvp-choice-controls">
        <label>Step 3: MVP reporting level<select><option>Subgroup</option><option>Individual</option><option>APM Entity</option><option>Group if allowed</option></select></label>
        <label>Step 4: Measure mode<select><option>eCQM & CQM</option><option>eCQM</option><option>CQM</option></select></label>
        <button class="btn small" data-toast="MVP specialty fit recalculated">Recalculate Fit</button>
      </div>
      ${renderMvpReportingLevelRules({ compact: options.compact })}
      ${renderSubgroupCompositionForm({ compact: options.compact })}
      <div class="mvp-filter-summary">
        <strong>Recommended MVPs</strong>
        <span>${supportedCount} supported for ${specialtySummary}${unavailableCount ? `; ${unavailableCount} unavailable because of enabled-measure coverage` : ""}</span>
      </div>
      <div class="mvp-catalog-grid">
        ${visibleRows.map((row) => {
          const fit = mvpMeasureFit(row);
          const specialtyMatch = matchesAnySpecialty(row, specialties);
          const disabled = fit.status === "blocked";
          return `
          <article class="mvp-candidate ${specialtyMatch && !disabled ? "recommended" : ""} ${fit.status} ${row.status === "Needs review" ? "review" : ""}">
            <div>
              <span>${row.id}</span>
              <strong>${row.name}</strong>
              <em>${row.specialties.join(", ")}</em>
            </div>
            <dl>
              <div><dt>Fit</dt><dd>${row.currentFit}</dd></div>
              <div><dt>Providers</dt><dd>${row.providers}</dd></div>
              <div><dt>Readiness</dt><dd>${fit.reason}</dd></div>
            </dl>
            <div class="mvp-candidate-footer">
              <span class="status-chip ${fit.status === "ready" ? "ready" : fit.status === "blocked" ? "disabled" : "warn"}">${fit.label}</span>
              <button class="link" ${disabled ? "disabled" : `data-toast="${row.id} selected for MVP submission planning"`}>${disabled ? "Unavailable" : row.action}</button>
            </div>
          </article>
        `;
        }).join("")}
      </div>
      ${renderProviderMvpForecast(scenario, { compact: options.compact })}
    </section>
  `;
}

function periodSelect(extraClass = "", selectedValue = null) {
  const selected = selectedValue || (state.program === "MVP" ? "eCQM 2026 Analytics Calendar 2026" : periods[state.program][0]);
  return `<select class="${extraClass}" aria-label="Performance period">${periods[state.program].map((p) => `<option${p === selected ? " selected" : ""}>${p}</option>`).join("")}</select>`;
}

function renderQppOAuthStatus(options = {}) {
  const connected = qppSession.status === "active";
  return `
    <div class="qpp-status ${connected ? "active" : "needed"} ${options.compact ? "compact" : ""}">
      <div>
        <span>CMS QPP OAuth</span>
        <strong>${connected ? `${qppSession.label} (${qppSession.remaining})` : "Login required for CMS session"}</strong>
        ${options.compact ? "" : `<em>${connected ? qppSession.user : "Connect before eCQM submit or approval."}</em>`}
      </div>
      <button class="${connected ? "lab-btn" : "btn"}" data-toast="${connected ? "CMS QPP session refreshed" : "CMS QPP OAuth login started"}">${connected ? "Refresh" : "Login to CMS QPP"}</button>
    </div>
  `;
}

function renderQualityModeControls() {
  return `
    <div class="quality-mode-row">
      ${renderQppOAuthStatus({ compact: true })}
      <label>
        Measure Type
        <select aria-label="Measure type">
          <option>eCQM & CQM</option>
          <option>eCQM</option>
          <option>CQM</option>
        </select>
      </label>
      <div class="search-control"><input placeholder="Search measures by name" /><button aria-label="Search">⌕</button></div>
    </div>
  `;
}

function renderUnifiedQualityPanel() {
  const ecqmMeasures = measures.slice(0, 3);
  const cqmMeasures = measures.slice(3, 6);
  return `
    <section class="quality-workbench">
      <div class="quality-tabs" role="tablist">
        <button class="active">Quality</button>
        <button disabled>PI</button>
        <button disabled>IA</button>
      </div>
      ${renderQualityModeControls()}
      <div class="quality-summary-strip">
        <div><span>Performance Period</span><strong>eCQM & CQM 2026 Analytics Calendar 2026</strong></div>
        <div><span>Performance Data Date</span><strong>Jul 14, 2026</strong></div>
        <div><span>Quality Score</span><strong>${state.program === "APPPLUS" ? "4% (2.0 out of 50)" : "0% (0.0 out of 30)"}</strong></div>
        <div><span>Status</span><strong>DRAFT</strong></div>
      </div>
      <h3>eCQM</h3>
      ${qualityMeasureRows(ecqmMeasures)}
      <h3>CQM</h3>
      ${qualityMeasureRows(cqmMeasures)}
    </section>
  `;
}

function qualityMeasureRows(measureList) {
  return `
    <div class="table-wrap compact-table">
      <table>
        <thead><tr><th>Measure</th><th>Measure ID</th><th>Outcome</th><th>High Priority</th><th class="numeric">Performance Rate</th><th class="numeric">Points</th></tr></thead>
        <tbody>
          ${measureList.map((measure, index) => `
            <tr>
              <td><strong>${measure.measure}</strong></td>
              <td>${measure.id.replace("CMS", "")}</td>
              <td>${index === 0 ? "Yes" : "No"}</td>
              <td>${index === 1 ? "Yes" : "No"}</td>
              <td class="numeric">${measure.rate}</td>
              <td class="numeric">${measure.score}</td>
            </tr>
          `).join("")}
        </tbody>
      </table>
    </div>
  `;
}

function renderMeasurePathwayMatrix(profile, options = {}) {
  const eligibility = pathwayEligibility(profile);
  const programs = options.showHidden ? programOrder : sortedEligiblePrograms(profile);
  return `
    <div class="measure-pathway-matrix ${options.compact ? "compact" : ""}">
      ${programs.map((program) => {
        const rule = eligibility[program];
        const visible = rule.status !== "hidden";
        return `
          <article class="measure-pathway ${rule.status} ${visible ? "" : "hidden-path"}">
            <div>
              <span class="status-pill ${pathwayEligibilityClass(rule.status)}">${statusLabel(rule.status)}</span>
              <h3>${programLabel(program)}</h3>
              <p>${rule.evidence}</p>
            </div>
            <em>${rule.next}</em>
            ${visible ? `<button class="btn small" data-open-eligible-program="${program}">Open Path</button>` : `<button class="btn small secondary" disabled>Not shown</button>`}
          </article>
        `;
      }).join("")}
    </div>
  `;
}

function renderMeasureIntake() {
  const profile = currentMeasureProfile();
  const primaryProgram = firstEligibleProgram(profile);
  content.innerHTML = `
    <section class="content-inner measure-intake">
      <div class="intake-hero">
        <div>
          <span class="eyebrow">Path Finder</span>
          <h1>Find the customer’s submission path</h1>
          <p>The customer’s enabled measures, roster, TIN/NPI eligibility, and participation context are already loaded. The customer should only see the inferred path choices and the next decision.</p>
        </div>
        <div class="intake-selector">
          <dl>
            <div><dt>Customer</dt><dd>${profile.customerName}</dd></div>
            <div><dt>Measure owner mix</dt><dd>${profile.ownerType}</dd></div>
            <div><dt>Period</dt><dd>${profile.period}</dd></div>
            <div><dt>Last refresh</dt><dd>${profile.lastRefresh}</dd></div>
          </dl>
        </div>
      </div>
      ${renderSubmissionPathChecklist(profile)}
      <section class="intake-section">
        <div class="section-heading-row">
          <div>
            <span class="eyebrow">Recommended Paths</span>
            <h2>Paths inferred from the fixed customer setup</h2>
          </div>
          <button class="btn" data-continue-pathways>Continue to Pathway Selection</button>
        </div>
        ${renderMeasurePathwayMatrix(profile)}
      </section>
      <button class="btn secondary" data-open-eligible-program="${primaryProgram}">Open ${programLabel(primaryProgram)}</button>
    </section>
  `;
  bindMeasureIntakeControls();
}

function renderSubmissionPathChecklist(profile) {
  const primary = firstEligibleProgram(profile);
  return `
    <section class="path-finder-checklist" aria-label="Submission path checklist">
      <article class="complete">
        <span>Step 1</span>
        <strong>Customer setup loaded</strong>
        <p>Enabled measures, roster, TIN/NPI eligibility, and participation context are already known for this customer.</p>
      </article>
      <article class="active">
        <span>Step 2</span>
        <strong>Recommended path: ${programLabel(primary)}</strong>
        <p>The system narrows available paths from the customer’s fixed configuration. Unsupported paths are hidden or disabled.</p>
      </article>
      <article class="locked">
        <span>Step 3</span>
        <strong>Configure the selected path</strong>
        <p>For MVP, confirm practice composition, specialties, reporting level, subgroup rationale, and provider forecast.</p>
      </article>
      <article class="locked">
        <span>Step 4</span>
        <strong>Validate and submit</strong>
        <p>Freeze the package, confirm CMS QPP session, submit or export, and track receipt status.</p>
      </article>
    </section>
  `;
}

function renderMeasurePathwayQualifier(options = {}) {
  const profile = currentMeasureProfile();
  const titles = {
    command: "Path finder: start from what the customer already has enabled",
    hub: "Path finder: show only submission paths this customer can use",
    smart: "Smart path finder: infer the next best submission path",
  };
  const label = options.mode === "smart" ? "Smart Path Finder" : options.mode === "hub" ? "Submission Path Finder" : "Submission Path Finder";
  return `
    <section class="measure-qualifier ${options.compact ? "compact" : ""} ${options.mode || ""}">
      <div class="section-heading-row">
        <div>
          <span class="eyebrow">${label}</span>
          <h3>${titles[options.mode] || "Infer the customer’s submission path from known setup"}</h3>
          <p>Measures stay behind the scenes. The customer sees the recommended paths and the next decision they need to make.</p>
        </div>
      </div>
      ${renderSubmissionPathChecklist(profile)}
      ${renderMeasurePathwayMatrix(profile, { compact: true })}
    </section>
  `;
}

function renderHome() {
  content.innerHTML = `
    <section class="content-inner home-content">
      <div class="login-marker">LOGIN SCREEN!!</div>
      <h1>Select Oracle Health Data Submissions Pathways</h1>
      <p class="intro">The Quality Payment Program is changing how clinicians receive reimbursement from Medicare patients. This prototype maps the existing submission shell and leaves room for new paths as traditional MIPS evolves.</p>
      <p class="intro">The application operates as a Qualified Registry for reporting quality category data, previewing measure scores, creating submission-ready data, and sending information directly to CMS workflows.</p>
      <div class="pathway-grid">
        ${pathwayCards.map((card) => `
          <article class="pathway-card">
            <h2>${card.title}</h2>
            <p>${card.text}</p>
            <div class="button-row">${card.buttons.map((button) => `<button class="btn" data-program="${button.program}">${button.label}</button>`).join("")}</div>
          </article>
        `).join("")}
      </div>
    </section>
  `;
  content.querySelectorAll("[data-program]").forEach((button) => {
    button.addEventListener("click", () => setProgram(button.dataset.program, button.dataset.program === "QRDA" ? "export-qrda" : "performance"));
  });
}

function bindMeasureIntakeControls(root = content) {
  root.querySelectorAll("[data-continue-pathways]").forEach((button) => {
    button.addEventListener("click", () => {
      state.route = "home";
      render();
    });
  });
  root.querySelectorAll("[data-open-eligible-program]").forEach((button) => {
    button.addEventListener("click", () => {
      const program = button.dataset.openEligibleProgram;
      setProgram(program, program === "QRDA" ? "export-qrda" : "performance");
    });
  });
}

function renderPerformance() {
  const rows = performanceRows[state.program] || [];
  content.classList.add("flush");
  content.innerHTML = `
    <section class="content-inner flush">
      <div class="toolbar">
        <h1>${programLabel(state.program)} Performance</h1>
        <div class="select-period">${periodSelect()}</div>
      </div>
      <div class="table-wrap">
        <table>
          <thead>
            <tr>
              ${state.program === "MVP" ? "<th>Participation</th>" : ""}
              <th>Name</th>
              ${state.program === "MVP" ? "<th>MVP</th>" : ""}
              <th>Performance Period</th>
              <th class="numeric">Quality Score</th>
              <th class="numeric">${state.program === "APPPLUS" ? "TINs" : "Providers"}</th>
            </tr>
          </thead>
          <tbody>
            ${rows.length ? rows.map((row) => `
              <tr>
                ${state.program === "MVP" ? `<td>${row.participation || "Group"}</td>` : ""}
                <td><button class="link" data-org="${row.name}">${row.name}</button></td>
                ${state.program === "MVP" ? `<td>${row.mvp || "Value in Primary Care"}</td>` : ""}
                <td>${row.period}</td>
                <td class="numeric">${scoreCell(row.quality)}</td>
                <td class="numeric">${state.program === "APPPLUS" ? row.tins : row.providers}</td>
              </tr>
            `).join("") : `<tr><td colspan="${state.program === "MVP" ? 6 : 4}"><div class="empty-state">No scorecards found for the selected performance period</div></td></tr>`}
          </tbody>
        </table>
      </div>
      <div class="pager"><span>First</span><span>Previous</span><strong>1</strong><span>Next</span><span>Last</span></div>
    </section>
  `;
  content.querySelectorAll("[data-org]").forEach((button) => {
    button.addEventListener("click", () => {
      state.selectedOrg = button.dataset.org;
      state.route = "performance-detail";
      render();
    });
  });
}

function renderPerformanceDetail() {
  const org = state.selectedOrg || "MIPS Org View Test";
  const isMvp = state.program === "MVP";
  const scorecard = isMvp ? (mvpScorecards[org] || mvpScorecards.ZzMVP2) : ((scorecardsByProgram[state.program] || {})[org] || { measures, entities: [org] });
  content.innerHTML = `
    <section class="content-inner flush">
      <button class="btn ghost" data-back="performance">Back to ${programLabel(state.program)} Performance</button>
      <div class="score-header">
        <div>
          <h1>View Scores for ${org}</h1>
          ${isMvp ? `<p class="score-meta"><strong>MVP ID:</strong> ${scorecard.mvpId}<br /><strong>Subgroup ID:</strong> ${scorecard.subgroupId}</p>` : ""}
        </div>
        ${scoreHeaderControls(org, scorecard)}
      </div>
      <div class="tabs">
        ${["Summary", "Details", "Exports"].map((tab) => `<button class="tab${state.scoreTab === tab ? " active" : ""}" data-score-tab="${tab}">${tab}</button>`).join("")}
      </div>
      ${renderScoreTabContent(scorecard, isMvp)}
    </section>
  `;
  content.querySelector("[data-score-entity]")?.addEventListener("change", (event) => {
    state.selectedOrg = event.target.value;
    render();
  });
  content.querySelectorAll("[data-score-tab]").forEach((button) => {
    button.addEventListener("click", () => {
      state.scoreTab = button.dataset.scoreTab;
      render();
    });
  });
  bindBackButtons();
  bindToastButtons();
}

function renderScoreTabContent(scorecard, isMvp) {
  if (state.scoreTab === "Details") {
    return `
      <h2>Measure Details</h2>
      <div class="table-wrap">
        <table>
          <thead><tr><th>Measure</th><th>Population</th><th>Supporting Facts</th><th>Last Calculated</th><th>Status</th></tr></thead>
          <tbody>
            ${scorecard.measures.slice(0, 5).map((measure) => `
              <tr><td>${measure.measure}</td><td>${measure.id}</td><td>${measure.children ? measure.children.length + " strata" : "Aggregate measure"}</td><td>2026-07-15</td><td><span class="status-pill ok">Available</span></td></tr>
            `).join("")}
          </tbody>
        </table>
      </div>
    `;
  }
  if (state.scoreTab === "Exports") {
    return `
      <h2>Exports</h2>
      <div class="table-wrap">
        <table>
          <thead><tr><th>Export Name</th><th>Format</th><th>Scope</th><th>Generated</th><th>Status</th><th></th></tr></thead>
          <tbody>
            <tr><td>score-summary-${state.program.toLowerCase()}-2026.csv</td><td>CSV</td><td>${programLabel(state.program)}</td><td>2026-07-15</td><td><span class="status-pill ok">Ready</span></td><td><button class="link" data-toast="Score export downloaded">Download</button></td></tr>
            <tr><td>score-details-${state.program.toLowerCase()}-2026.xlsx</td><td>XLSX</td><td>${programLabel(state.program)}</td><td>2026-07-15</td><td><span class="status-pill">Draft</span></td><td><button class="link" data-toast="Export queued">Regenerate</button></td></tr>
          </tbody>
        </table>
      </div>
    `;
  }
  return `
    <h2>${state.program === "MIPS" || state.program === "APPPLUS" ? "CQM" : "eCQM"}</h2>
    ${measureTable(true, scorecard.measures)}
    <h2>${state.program === "MIPS" || state.program === "APPPLUS" ? "eCQM" : "CQM"}</h2>
    ${isMvp ? measureTable(false, [], "No measures found for the selected performance period.") : measureTable(false, measures)}
  `;
}

function scoreValue(value) {
  if (!value) return 0;
  const match = String(value).match(/(\d+(?:\.\d+)?)/);
  return match ? Number(match[1]) : 0;
}

function readinessTone(value) {
  const score = scoreValue(value);
  if (score >= 80) return "ok";
  if (score >= 50) return "watch";
  return "risk";
}

function renderRedwoodProgramOverview(rows) {
  const profile = state.program === "APPPLUS" ? customerProfiles.ccpm : customerProfiles.zmdi;
  const active = programStatus(profile, state.program);
  const primaryScore = rows[0]?.quality || (state.program === "QRDA" ? "Ready" : "Pending");
  const tone = readinessTone(primaryScore);
  const totalProviders = rows.reduce((sum, row) => sum + Number(row.providers || row.tins || 0), 0);
  const packageLabel = state.program === "HQR" ? "Hospital package" : state.program === "QRDA" ? "Export package" : "Submission package";
  return `
    <section class="redwood-overview" aria-label="${programLabel(state.program)} summary">
      <article class="redwood-hero-card">
        <div>
          <span class="eyebrow">Customer Strategy</span>
          <h2>${profile.name}</h2>
          <p>${profile.activeSummary}</p>
        </div>
        <div class="radial-score ${tone}" style="--score:${Math.min(scoreValue(primaryScore), 100)}%">
          <strong>${primaryScore}</strong>
          <span>${state.program === "HQR" ? "Readiness" : "Quality"}</span>
        </div>
      </article>
      <article class="redwood-kpi">
        <span>Configured Path</span>
        <strong>${active.label}</strong>
        <em>${active.note}</em>
      </article>
      <article class="redwood-kpi">
        <span>Entities</span>
        <strong>${rows.length || 1}</strong>
        <em>${state.program === "MVP" ? "Subgroups" : state.program === "HQR" ? "Hospitals" : "Reporting entities"}</em>
      </article>
      <article class="redwood-kpi">
        <span>Population</span>
        <strong>${totalProviders || "Ready"}</strong>
        <em>${state.program === "APPPLUS" ? "TINs" : "Providers / records"}</em>
      </article>
      <article class="redwood-next">
        <span>Next Best Action</span>
        <strong>${packageLabel}</strong>
        <button class="btn small" data-toast="${programLabel(state.program)} readiness review opened">Review</button>
      </article>
    </section>
  `;
}

function renderScoreTrendCard(scorecard) {
  const rows = scorecard.measures || [];
  const top = rows.slice(0, 3);
  const average = top.length ? Math.round(top.reduce((sum, measure) => sum + scoreValue(measure.score), 0) / top.length * 10) / 10 : 0;
  return `
    <section class="score-signal-band">
      <article>
        <span>Quality Signal</span>
        <strong>${average} pts</strong>
        <em>average across visible measures</em>
      </article>
      <article>
        <span>CMS QPP OAuth</span>
        <strong>Active</strong>
        <em>${qppSession.remaining} remaining</em>
      </article>
      <article>
        <span>Weakest Measure</span>
        <strong>${top.slice().sort((a, b) => scoreValue(a.score) - scoreValue(b.score))[0]?.id || "Pending"}</strong>
        <em>prioritize before freeze</em>
      </article>
      <article>
        <span>Submission Mode</span>
        <strong>eCQM & CQM</strong>
        <em>unified quality review</em>
      </article>
    </section>
  `;
}

function renderMeasureInsightRail(scorecard) {
  const rows = (scorecard.measures || measures).slice(0, 4);
  return `
    <aside class="insight-rail">
      <span class="eyebrow">Measure Signals</span>
      <h3>Prioritized Review</h3>
      ${rows.map((measure) => {
        const value = Math.min(scoreValue(measure.rate), 100);
        const tone = readinessTone(measure.rate);
        return `
          <div class="measure-signal ${tone}">
            <div>
              <strong>${measure.id}</strong>
              <span>${measure.measure}</span>
            </div>
            <div class="mini-meter" aria-label="${value}% performance rate"><span style="width:${value}%"></span></div>
            <em>${measure.rate} · ${measure.score} pts</em>
          </div>
        `;
      }).join("")}
      <button class="btn secondary" data-toast="Measure insight drawer opened">Open Insights</button>
    </aside>
  `;
}

function scoreHeaderControls(org, scorecard) {
  const collection = `<select aria-label="Measure collection type"><option>${state.program === "MVP" || state.program === "APPPLUS" ? "eCQM & CQM" : "eCQM"}</option><option>eCQM</option><option>CQM</option></select>`;
  const entity = `<select aria-label="Reporting entity" data-score-entity>${scoreEntityOptions(org, scorecard)}</select>`;
  const period = periodSelect("", "eCQM 2026 Analytics Calendar 2026");
  const orderedControls = state.program === "MVP" ? `${collection}${entity}${period}` : `${collection}${period}${entity}`;
  return `
    <div class="score-controls">
      ${orderedControls}
      <button class="btn secondary" data-toast="Score export started">⇩ Export</button>
      <span class="processing-date"><strong>Outcome Processing Date:</strong> 2026-07-15</span>
    </div>
  `;
}

function scoreEntityOptions(selected, scorecard = null) {
  if (state.program !== "MVP") {
    const entities = scorecard?.entities || [selected];
    return entities.map((name) => `<option${name === selected ? " selected" : ""}>${name}</option>`).join("");
  }
  return ["ZzMVP2", "ZzMVP3", "ZzMVP4", "ZzMVP5"].map((name) => `<option${name === selected ? " selected" : ""}>${name}</option>`).join("");
}

function measureTable(expanded, measureList = measures, emptyMessage = null) {
  const rows = emptyMessage ? `<tr><td colspan="10"><div class="empty-state compact">${emptyMessage}</div></td></tr>` : measureList.flatMap((measure) => {
    const parent = `
      <tr>
        <td><strong>${measure.measure}</strong></td>
        <td><strong>${measure.id}</strong></td>
        <td class="numeric">${measure.ipp}</td>
        <td class="numeric">${measure.denomExclusions}</td>
        <td class="numeric">${measure.denom}</td>
        <td class="numeric">${measure.numerator}</td>
        <td class="numeric">${measure.exceptions}</td>
        <td class="numeric">${measure.notMet}</td>
        <td class="numeric"><strong>${measure.rate}</strong></td>
        <td class="numeric"><strong>${measure.score}</strong></td>
      </tr>
    `;
    const children = expanded && measure.children ? measure.children.map((child) => `
      <tr>
        <td>- ${child.measure || child}</td><td></td><td class="numeric">${child.ipp || "0"}</td><td class="numeric">${child.denomExclusions || "0"}</td><td class="numeric">${child.denom || "0"}</td><td class="numeric">${child.numerator || "0"}</td><td class="numeric">${child.exceptions || "0"}</td><td class="numeric">${child.notMet || "0"}</td><td></td><td></td>
      </tr>
    `).join("") : "";
    return parent + children;
  }).join("");
  return `
    <div class="table-wrap">
      <table>
        <thead>
          <tr>
            <th>Measure</th><th>Measure ID</th><th class="numeric">IPP</th><th class="numeric">Denominator Exclusions</th><th class="numeric">Performance Denominator</th><th class="numeric">Numerator</th><th class="numeric">Exceptions</th><th class="numeric">Not Met</th><th class="numeric">Performance Rate</th><th class="numeric">Quality Measure Score</th>
          </tr>
        </thead>
        <tbody>${rows}</tbody>
      </table>
    </div>
  `;
}

function renderSubmissionsOverview() {
  const scopes = navByProgram[state.program].filter((item) => ["Group", "Individual", "Subgroup", "APM Entity", "Hospital"].includes(item));
  content.innerHTML = `
    <section class="content-inner">
      <div class="toolbar">
        <h1>${programLabel(state.program)} Submissions</h1>
        <button class="btn" data-new>+ New</button>
      </div>
      <div class="summary-grid">
        ${scopes.map((scope) => {
          const rows = ((submissions[state.program] || {})[scope]) || [];
          return `<button class="metric metric-button" data-scope="${scope}"><span>${scope}</span><strong>${rows.length}</strong><em>${rows.length === 1 ? "submission" : "submissions"}</em></button>`;
        }).join("")}
      </div>
      <h2>Recent Submission Activity</h2>
      <div class="table-wrap">
        <table>
          <thead><tr><th>Submission</th><th>Scope</th><th>Entity</th><th>Status</th><th>Quality</th><th>Next Step</th></tr></thead>
          <tbody>
            ${scopes.flatMap((scope) => (((submissions[state.program] || {})[scope]) || []).slice(0, 2).map((row) => `
              <tr>
                <td><button class="link" data-submission="${row.name}">${row.name}</button></td>
                <td>${scope}</td>
                <td>${row.practice}</td>
                <td><span class="status-pill ${row.quality === "FROZEN" ? "ok" : ""}">${row.quality === "FROZEN" ? "Frozen" : "Draft"}</span></td>
                <td>${scoreCell(row.quality)}</td>
                <td>${row.quality === "FROZEN" ? "Submit to CMS" : "Review missing PI/IA"}</td>
              </tr>
            `)).join("") || `<tr><td colspan="6"><div class="empty-state">No submissions found for this program.</div></td></tr>`}
          </tbody>
        </table>
      </div>
    </section>
  `;
  content.querySelector("[data-new]")?.addEventListener("click", () => {
    state.selectedSubmissionScope = "Group";
    state.route = "new-submission";
    render();
  });
  content.querySelectorAll("[data-scope]").forEach((button) => {
    button.addEventListener("click", () => setRoute(`submissions-${button.dataset.scope}`));
  });
  content.querySelectorAll("[data-submission]").forEach((button) => {
    button.addEventListener("click", () => {
      state.selectedSubmission = button.dataset.submission;
      state.selectedSubmissionScope = scope;
      state.route = "submission-detail";
      render();
    });
  });
}

function renderSubmissions(scope) {
  const scopeRows = ((submissions[state.program] || {})[scope]) || [];
  const isMvpIndividual = state.program === "MVP" && scope === "Individual";
  const selectedGroup = selectedIndividualGroup();
  const availableClinicians = cliniciansForSelectedGroup();
  const selectedClinician = selectedIndividualClinician();
  const individualRows = isMvpIndividual
    ? selectedClinician
      ? [{ name: individualDraftName(), clinician: selectedClinician.name, practice: selectedGroup.id, mvp: selectedGroup.mvpName, composite: "draft", quality: selectedClinician.forecast, pi: "pending", ia: "pending", npi: selectedClinician.npi, confidence: selectedClinician.confidence }]
      : availableClinicians.map((clinician) => ({ name: `Candidate - ${clinician.name}`, clinician: clinician.name, practice: selectedGroup?.id || "", mvp: selectedGroup?.mvpName || "", composite: "review", quality: clinician.forecast, pi: "pending", ia: "pending", npi: clinician.npi, confidence: clinician.confidence }))
    : scopeRows;
  const displayRows = isMvpIndividual ? individualRows : scopeRows;
  content.innerHTML = `
    <section class="content-inner flush">
      <div class="toolbar">
        <h1>${scope} Submissions</h1>
        <button class="btn" data-new>+ New</button>
      </div>
      <div class="filter-row ${isMvpIndividual ? "wide-filters" : ""}">
        <div class="field"><label>Performance Period</label>${periodSelect()}</div>
        ${isMvpIndividual ? `
          <div class="field"><label>MVP Group/Subgroup</label><select data-individual-group aria-label="MVP Group/Subgroup"><option value="">-- Select Group/Subgroup --</option>${mvpIndividualGroups.map((group) => `<option value="${group.id}"${group.id === state.selectedIndividualGroup ? " selected" : ""}>${group.id} - ${group.name}</option>`).join("")}</select></div>
          <div class="field"><label><span class="required">*</span> Eligible Clinician</label><select data-individual-clinician aria-label="Eligible Clinician" ${state.selectedIndividualGroup ? "" : "disabled"}><option value="">${state.selectedIndividualGroup ? "-- Select Clinician --" : "Select subgroup first"}</option>${availableClinicians.map((clinician) => `<option value="${clinician.npi}"${clinician.npi === state.selectedIndividualClinician ? " selected" : ""}>${clinician.name} - NPI ${clinician.npi}</option>`).join("")}</select></div>
        ` : `
          <div class="field"><label>${scope === "APM Entity" ? "APM Entity" : state.program === "MVP" ? "MVP Group/Subgroup" : scope + " Practice"}</label><select><option></option><option>ZzMount Desert Island Hospital</option><option>ZzMVP2</option><option>MIPS Org View Test</option><option>TIN 1: CernerDemo</option></select></div>
        `}
        <div class="field"><label>Submission Name</label><div class="search-control"><input placeholder="Submission Name" /><button aria-label="Search">⌕</button></div></div>
      </div>
      <div class="table-wrap">
        <table>
          <thead>
            ${isMvpIndividual
              ? `<tr><th>Submission Name</th><th>Eligible Clinician</th><th>MVP Group/Subgroup</th><th>MVP</th><th class="numeric">Composite Score</th><th class="numeric">Quality Score</th><th class="numeric">PI Score</th><th class="numeric">IA Score</th></tr>`
              : `<tr><th>Submission Name</th><th>${scope === "APM Entity" ? "APM Entity" : state.program === "MVP" ? "MVP Group/Subgroup" : scope + " Practice"}</th><th class="numeric">Composite Score</th><th class="numeric">Quality Score</th><th class="numeric">PI Score</th><th class="numeric">IA Score</th></tr>`}
          </thead>
          <tbody>
            ${displayRows.length ? displayRows.map((row) => isMvpIndividual ? `
              <tr>
                <td><button class="link" data-submission="${row.name}">${row.name}</button></td>
                <td>${row.clinician || "Eligible Clinician"}<span class="subline">NPI ${row.npi || "pending"}</span></td>
                <td>${row.practice}</td>
                <td>${row.mvp || "Heart Disease"}</td>
                <td class="numeric">${scoreCell(row.composite)}</td>
                <td class="numeric">${scoreCell(row.quality)}</td>
                <td class="numeric">${scoreCell(row.pi)}</td>
                <td class="numeric">${scoreCell(row.ia)}</td>
              </tr>
            ` : `
              <tr>
                <td><button class="link" data-submission="${row.name}">${row.name}</button></td>
                <td>${row.practice}<span class="subline">${state.program === "MVP" ? "Subgroup ID" : "TIN"}: ${row.tin}</span></td>
                <td class="numeric">${scoreCell(row.composite)}</td>
                <td class="numeric">${scoreCell(row.quality)}</td>
                <td class="numeric">${scoreCell(row.pi)}</td>
                <td class="numeric">${scoreCell(row.ia)}</td>
              </tr>
            `).join("") : `<tr><td colspan="${isMvpIndividual ? 8 : 6}"><div class="empty-state">${isMvpIndividual ? "Select an MVP subgroup to view eligible clinicians and forecast individual drafts." : "No Submissions found"}</div></td></tr>`}
          </tbody>
        </table>
      </div>
      ${isMvpIndividual ? `
        <div class="individual-flow-actions">
          <span>${selectedClinician ? `${selectedClinician.name} selected for ${selectedGroup.mvpId}` : state.selectedIndividualGroup ? "Select an eligible clinician to create or open an individual draft." : "Start by selecting an MVP group/subgroup."}</span>
          <button class="btn" data-create-individual-draft ${selectedClinician ? "" : "disabled"}>Create Individual Draft</button>
        </div>
      ` : ""}
      <div class="pager"><span>First</span><span>Previous</span><strong>1</strong><span>Next</span><span>Last</span></div>
    </section>
  `;
  content.querySelector("[data-new]").addEventListener("click", () => {
    state.selectedSubmissionScope = scope;
    state.route = "new-submission";
    render();
  });
  content.querySelector("[data-individual-group]")?.addEventListener("change", (event) => {
    state.selectedIndividualGroup = event.target.value;
    state.selectedIndividualClinician = "";
    const group = selectedIndividualGroup();
    if (group) {
      state.practiceComposition = "single";
      state.mvpSpecialty = group.specialty;
      state.mvpSpecialties = [group.specialty];
    }
    render();
  });
  content.querySelector("[data-individual-clinician]")?.addEventListener("change", (event) => {
    state.selectedIndividualClinician = event.target.value;
    render();
  });
  content.querySelector("[data-create-individual-draft]")?.addEventListener("click", () => {
    state.selectedSubmission = individualDraftName();
    state.route = "submission-detail";
    render();
  });
  content.querySelectorAll("[data-submission]").forEach((button) => {
    button.addEventListener("click", () => {
      state.selectedSubmission = button.dataset.submission;
      state.route = "submission-detail";
      render();
    });
  });
}

function renderSubmissionDetail() {
  const name = state.selectedSubmission || "MIPS Org View Test";
  const selectedGroup = selectedIndividualGroup();
  const selectedClinician = selectedIndividualClinician();
  const isIndividualDetail = state.program === "MVP" && (state.selectedSubmissionScope === "Individual" || name.includes("Individual"));
  content.innerHTML = `
    <section class="content-inner">
      <button class="btn ghost" data-back="submissions-${isIndividualDetail ? "Individual" : "Group"}">Back to Submissions</button>
      <div class="toolbar">
        <h1>${name}</h1>
        <div class="button-row">
          <button class="btn secondary" data-toast="Submission saved for final review">Save for Final Review</button>
          <button class="btn" data-toast="Prototype event: CMS submit request queued">Submit to CMS</button>
        </div>
      </div>
      <div class="detail-layout">
        <div>
          <div class="summary-grid">
            <div class="metric"><span>Workflow Status</span><strong>${isIndividualDetail ? "Draft Review" : "Frozen"}</strong></div>
            <div class="metric"><span>${isIndividualDetail ? "Clinician" : "Composite Score"}</span><strong>${isIndividualDetail ? selectedClinician?.name || "Selected clinician" : "0.0"}</strong></div>
            <div class="metric"><span>${isIndividualDetail ? "Forecast Score" : "Quality Score"}</span><strong>${isIndividualDetail ? selectedClinician?.forecast || "Pending" : "0.0"}</strong></div>
            <div class="metric"><span>CMS QPP OAuth</span><strong>Active</strong></div>
          </div>
          ${isIndividualDetail ? `
            <div class="pathway-context-strip">
              <div><span>MVP Group/Subgroup</span><strong>${selectedGroup?.id || "Selected subgroup"}</strong></div>
              <div><span>MVP</span><strong>${selectedGroup?.mvpId || "MVP"}</strong><em>${selectedGroup?.mvpName || "Selected MVP"}</em></div>
              <div><span>NPI</span><strong>${selectedClinician?.npi || "Selected NPI"}</strong></div>
            </div>
          ` : ""}
          ${renderUnifiedQualityPanel()}
        </div>
        <aside>
          <div class="panel">
            <h3>Submission Workflow</h3>
            <ol class="steps">
              <li><span class="step-mark">1</span><span>Select program, period, and submission scope</span></li>
              <li><span class="step-mark">2</span><span>Confirm eCQM, CQM, or unified Quality measure mode</span></li>
              <li><span class="step-mark">3</span><span>Login to CMS QPP for eCQM submit/approval actions</span></li>
              <li><span class="step-mark">4</span><span>Freeze submission-ready measures</span></li>
              <li><span class="step-mark">5</span><span>Submit to CMS API or export QRDA package</span></li>
              <li><span class="step-mark">6</span><span>Track receipt, validation, and correction status</span></li>
            </ol>
          </div>
          <div class="panel">
            <h3>Validation Summary</h3>
            <p><span class="status-pill ok">Ready</span> Demographics and provider identifiers present.</p>
            <p><span class="status-pill warn">Review</span> Several measures are returning zero denominators in demo data.</p>
          </div>
        </aside>
      </div>
    </section>
  `;
  bindBackButtons();
  bindToastButtons();
}

function renderNewSubmission() {
  const isIndividualDraft = state.program === "MVP" && state.selectedSubmissionScope === "Individual";
  const selectedGroup = selectedIndividualGroup();
  const availableClinicians = cliniciansForSelectedGroup();
  const selectedClinician = selectedIndividualClinician();
  content.innerHTML = `
    <section class="content-inner">
      <button class="btn ghost" data-back="submissions-${state.selectedSubmissionScope || "Group"}">Back to Submissions</button>
      <h1>${isIndividualDraft ? "New Individual MVP Submission" : `New ${submissionTitle(state.program)}`}</h1>
      <div class="detail-layout">
        <div class="panel">
          <div class="filter-row">
            <div class="field"><label>Performance Period</label>${periodSelect()}</div>
            <div class="field"><label>Submission Scope</label><select data-draft-scope aria-label="Submission Scope"><option${state.selectedSubmissionScope === "Group" ? " selected" : ""}>Group</option><option${state.selectedSubmissionScope === "Individual" ? " selected" : ""}>Individual</option><option${state.selectedSubmissionScope === "Subgroup" ? " selected" : ""}>Subgroup</option><option${state.selectedSubmissionScope === "APM Entity" ? " selected" : ""}>APM Entity</option></select></div>
            <div class="field"><label>Submission Name</label><input value="${isIndividualDraft ? individualDraftName() : `${submissionTitle(state.program)} Draft`}" /></div>
          </div>
          ${isIndividualDraft ? `
            <div class="individual-draft-panel">
              <div class="field"><label>MVP Group/Subgroup</label><select data-individual-group aria-label="Draft MVP Group/Subgroup"><option value="">-- Select Group/Subgroup --</option>${mvpIndividualGroups.map((group) => `<option value="${group.id}"${group.id === state.selectedIndividualGroup ? " selected" : ""}>${group.id} - ${group.name}</option>`).join("")}</select></div>
              <div class="field"><label>Eligible Clinician</label><select data-individual-clinician aria-label="Draft Eligible Clinician" ${state.selectedIndividualGroup ? "" : "disabled"}><option value="">${state.selectedIndividualGroup ? "-- Select Clinician --" : "Select subgroup first"}</option>${availableClinicians.map((clinician) => `<option value="${clinician.npi}"${clinician.npi === state.selectedIndividualClinician ? " selected" : ""}>${clinician.name} - NPI ${clinician.npi}</option>`).join("")}</select></div>
              <div class="draft-kpi"><span>MVP</span><strong>${selectedGroup?.mvpId || "Select subgroup"}</strong><em>${selectedGroup?.mvpName || "MVP will populate after subgroup selection"}</em></div>
              <div class="draft-kpi"><span>Forecast</span><strong>${selectedClinician?.forecast || "--"}</strong><em>${selectedClinician ? `${selectedClinician.confidence} confidence` : "Select clinician"}</em></div>
            </div>
          ` : ""}
          <h2>Data Sources</h2>
          <div class="table-wrap">
            <table>
              <thead><tr><th>Category</th><th>Source</th><th>Status</th><th>Last Refresh</th></tr></thead>
              <tbody>
                <tr><td>Quality</td><td>Unified eCQM & CQM scorecards</td><td><span class="status-pill ok">Available</span></td><td>Today</td></tr>
                <tr><td>CMS QPP OAuth</td><td>CMS QPP session for submit and approval actions</td><td><span class="status-pill ok">Active for 15 mins</span></td><td>Just now</td></tr>
                <tr><td>Promoting Interoperability</td><td>Imported CEHRT numerator / denominator file</td><td><span class="status-pill warn">Needs import</span></td><td>Not loaded</td></tr>
                <tr><td>Improvement Activities</td><td>Manual selection and attestation</td><td><span class="status-pill warn">Needs selection</span></td><td>Not started</td></tr>
              </tbody>
            </table>
          </div>
          <div class="split-actions">
            <span class="muted">${isIndividualDraft ? "Individual draft carries subgroup, clinician, MVP, and forecast context forward." : "Prototype creates a draft and routes to review."}</span>
            <button class="btn" data-create-draft ${isIndividualDraft && !selectedClinician ? "disabled" : ""}>Create Draft</button>
          </div>
        </div>
        <aside class="panel">
          <h3>Expected Next Screens</h3>
          <ol class="steps">
            <li><span class="step-mark">1</span><span>Choose reporting entity and scope.</span></li>
            <li><span class="step-mark">2</span><span>Select Quality mode: eCQM, CQM, or both.</span></li>
            <li><span class="step-mark">3</span><span>Confirm CMS QPP OAuth session.</span></li>
            <li><span class="step-mark">4</span><span>Preview scores and warnings.</span></li>
            <li><span class="step-mark">5</span><span>Freeze and submit or export.</span></li>
          </ol>
        </aside>
      </div>
    </section>
  `;
  content.querySelector("[data-draft-scope]")?.addEventListener("change", (event) => {
    state.selectedSubmissionScope = event.target.value;
    render();
  });
  content.querySelector("[data-individual-group]")?.addEventListener("change", (event) => {
    state.selectedIndividualGroup = event.target.value;
    state.selectedIndividualClinician = "";
    const group = selectedIndividualGroup();
    if (group) {
      state.practiceComposition = "single";
      state.mvpSpecialty = group.specialty;
      state.mvpSpecialties = [group.specialty];
    }
    render();
  });
  content.querySelector("[data-individual-clinician]")?.addEventListener("change", (event) => {
    state.selectedIndividualClinician = event.target.value;
    render();
  });
  content.querySelector("[data-create-draft]")?.addEventListener("click", () => {
    state.selectedSubmission = isIndividualDraft ? individualDraftName() : `${submissionTitle(state.program)} Draft`;
    state.route = "submission-detail";
    render();
  });
  bindBackButtons();
  bindToastButtons();
}

function renderUpload() {
  content.innerHTML = `
    <section class="content-inner">
      <h1>${programLabel(state.program)} Upload</h1>
      <div class="panel">
        <div class="filter-row">
          <div class="field"><label>Upload Type</label><select><option>PI numerator / denominator import</option><option>IA attestation import</option><option>QRDA validation package</option></select></div>
          <div class="field"><label>Performance Period</label>${periodSelect()}</div>
          <div class="field"><label>File</label><input value="demo-pi-import.csv" /></div>
          <button class="btn" data-toast="Prototype upload validated">Validate Upload</button>
        </div>
        <div class="table-wrap">
          <table>
            <thead><tr><th>File Name</th><th>Type</th><th>Status</th><th>Rows</th><th>Issues</th></tr></thead>
            <tbody>
              <tr><td>demo-pi-import.csv</td><td>PI Measures</td><td><span class="status-pill warn">Needs review</span></td><td>0</td><td>Demo data contains zero values</td></tr>
              <tr><td>mips-quality-scorecards.json</td><td>Quality Scorecards</td><td><span class="status-pill ok">Loaded</span></td><td>6</td><td>None</td></tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>
  `;
  bindToastButtons();
}

function renderProviderProfile() {
  content.innerHTML = `
    <section class="content-inner">
      <h1>Provider Profile</h1>
      <div class="table-wrap">
        <table>
          <thead><tr><th>Provider</th><th>NPI</th><th>Practice</th><th>Participation</th><th>Status</th></tr></thead>
          <tbody>
            <tr><td>Jane Clinician</td><td>1942000000</td><td>TIN 1: CernerDemo</td><td>MIPS Individual</td><td><span class="status-pill ok">Eligible</span></td></tr>
            <tr><td>Group Practice Roster</td><td>Multiple</td><td>MIPS Org View Test</td><td>MIPS Group</td><td><span class="status-pill warn">Verify roster</span></td></tr>
          </tbody>
        </table>
      </div>
    </section>
  `;
}

function renderQrdaExport() {
  content.innerHTML = `
    <section class="content-inner">
      <h1>QRDA Export</h1>
      <div class="panel">
        <div class="filter-row">
          <div class="field"><label>QRDA Category</label><select><option>QRDA I</option><option>QRDA III</option></select></div>
          <div class="field"><label>Program</label><select><option>MIPS</option><option>APP Plus</option><option>MVP</option></select></div>
          <div class="field"><label>Submission Scope</label><select><option>Individual</option><option>Group</option><option>Subgroup</option><option>APM Entity</option></select></div>
          <button class="btn" data-toast="QRDA export job started">Export QRDA</button>
        </div>
        <div class="table-wrap">
          <table>
            <thead><tr><th>Output Convention</th><th>Category</th><th>Program</th><th>Scope</th><th>Bulk Export</th></tr></thead>
            <tbody>
              <tr><td>QRDA1_MIPS_INDIV_TIN_NPI_CY2025_timestamp.zip</td><td>1</td><td>MIPS</td><td>Individual</td><td>No</td></tr>
              <tr><td>QRDA3_APP_PLUS_GROUP_CY2025_timestamp.zip</td><td>3</td><td>APP Plus</td><td>Group</td><td>Yes</td></tr>
              <tr><td>QRDA1_MVP_GROUP_TIN_CY2025_timestamp.zip</td><td>1</td><td>MVP</td><td>Group</td><td>No</td></tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>
  `;
  bindToastButtons();
}

function renderQrdaFiles() {
  content.innerHTML = `
    <section class="content-inner">
      <h1>Generated QRDA Files</h1>
      <div class="table-wrap">
        <table>
          <thead><tr><th>File Name</th><th>Program</th><th>Scope</th><th>Generated</th><th>Status</th><th></th></tr></thead>
          <tbody>
            <tr><td>QRDA1_MIPS_4_GROUP_CY2025_07-20-26_111924.zip</td><td>MIPS</td><td>Group</td><td>Today</td><td><span class="status-pill ok">Ready</span></td><td><button class="link" data-toast="Download started">Download</button></td></tr>
            <tr><td>QRDA3_MVP_1_INDIV_CY2025_07-20-26_112015.zip</td><td>MVP</td><td>Individual</td><td>Today</td><td><span class="status-pill warn">Warnings</span></td><td><button class="link" data-toast="Download started">Download</button></td></tr>
          </tbody>
        </table>
      </div>
    </section>
  `;
  bindToastButtons();
}

function renderFlowMap() {
  content.innerHTML = `
    <section class="content-inner">
      <h1>Prototype Flow Map</h1>
      <div class="flow-grid">
        <article class="flow-card">
          <h3>Program Entry</h3>
          <ol><li>Home pathway cards</li><li>Program selector in header</li><li>Program-specific left navigation</li></ol>
        </article>
        <article class="flow-card">
          <h3>Performance Review</h3>
          <ol><li>Performance list by reporting entity</li><li>Open scorecard summary</li><li>Review eCQM, CQM, PI, and IA tables</li></ol>
        </article>
        <article class="flow-card">
          <h3>Submission Creation</h3>
          <ol><li>Choose Group, Individual, Subgroup, or APM Entity</li><li>Filter existing submissions</li><li>Create draft, freeze, review, and submit</li></ol>
        </article>
        <article class="flow-card">
          <h3>Supplemental Data</h3>
          <ol><li>Upload PI numerator / denominator values</li><li>Select IA attestations</li><li>Validate missing or zeroed values</li></ol>
        </article>
        <article class="flow-card">
          <h3>QRDA Path</h3>
          <ol><li>Select QRDA I or III</li><li>Choose program and scope</li><li>Generate and download ZIP package</li></ol>
        </article>
        <article class="flow-card">
          <h3>CMS Response</h3>
          <ol><li>Submit through CMS API or QRDA export</li><li>Track receipt and validation status</li><li>Correct and resubmit when needed</li></ol>
        </article>
      </div>
    </section>
  `;
}

function currentVisionStage() {
  const index = Math.min(Math.max(state.labStep, 0), visionStages.length - 1);
  return { index, stage: visionStages[index], percent: Math.round(((index + 1) / visionStages.length) * 100) };
}

function renderVisionPlatform() {
  const workflow = currentVisionStage();
  return `
    <div class="vision-shell">
      <header class="vision-header">
        <div>
          <span class="eyebrow">Oracle Health Data Submissions</span>
          <h1>Quality Operating System</h1>
          <p>Choose the right strategy, improve performance all year, validate with confidence, and submit without the scramble.</p>
        </div>
        <div class="vision-progress">
          <span>${workflow.percent}%</span>
          <strong>${workflow.stage.label}</strong>
          <em>${workflow.stage.timebox}</em>
        </div>
      </header>
      <nav class="vision-stage-nav" aria-label="Vision platform stages">
        ${visionStages.map((stage, index) => `
          <button class="${index === workflow.index ? "active" : index < workflow.index ? "complete" : "future"}" data-lab-step="${index}">
            <span>${index + 1}</span>
            <strong>${stage.label}</strong>
            <em>${stage.timebox}</em>
          </button>
        `).join("")}
      </nav>
      <div class="vision-stage-layout">
        <main class="vision-panel vision-focus">
          <div class="vision-panel-title">
            <div>
              <span class="eyebrow">${workflow.stage.timebox}</span>
              <h2>${workflow.stage.title}</h2>
            </div>
            <button class="btn" data-vision-next="1" ${workflow.index === visionStages.length - 1 ? "disabled" : ""}>${workflow.stage.primaryAction}</button>
          </div>
          ${renderVisionStageContent(workflow.stage)}
        </main>
        <aside class="vision-panel vision-aide">
          <span class="eyebrow">Customer lens</span>
          <h3>${workflow.stage.promise}</h3>
          <dl>
            <div><dt>Question</dt><dd>${workflow.stage.customerQuestion}</dd></div>
            <div><dt>System role</dt><dd>${workflow.stage.systemAction}</dd></div>
            <div><dt>Output</dt><dd>${workflow.stage.artifact}</dd></div>
          </dl>
          <div class="workflow-actions">
            <button class="btn ghost" data-vision-next="-1" ${workflow.index === 0 ? "disabled" : ""}>Back</button>
            <button class="btn" data-vision-next="1" ${workflow.index === visionStages.length - 1 ? "disabled" : ""}>Continue</button>
          </div>
          <button class="btn secondary" data-open-production="mvp-zmvp4">Open Production Control</button>
        </aside>
      </div>
    </div>
  `;
}

function renderVisionStageContent(stage) {
  if (stage.id === "strategy") return renderVisionStrategyStage();
  if (stage.id === "improve") return renderVisionImproveStage();
  if (stage.id === "monitor") return renderVisionMonitorStage();
  if (stage.id === "validate") return renderVisionValidateStage();
  return renderVisionSubmitStage();
}

function renderVisionStrategyStage() {
  return `
    <section class="vision-stage-content">
      <div class="vision-recommendation">
        <span>Recommended strategy</span>
        <h3>MVP Submission - Prevention and Treatment of Infectious Disorders</h3>
        <p>Best fit based on the customer setup already known to the platform: specialty mix, enabled measure coverage, and provider performance forecast.</p>
      </div>
      <div class="vision-kpi-row">
        <div><span>Projected quality score</span><strong>93.8</strong><em>+5.5 point forecast lift</em></div>
        <div><span>Strategy confidence</span><strong>High</strong><em>Supported path, low data risk</em></div>
        <div><span>Provider fit</span><strong>45</strong><em>Clinicians forecast for subgroup review</em></div>
      </div>
      <table class="vision-table">
        <thead><tr><th>Path</th><th>Recommendation</th><th>Expected impact</th><th>Why</th></tr></thead>
        <tbody>
          ${visionStrategyRows.map((row) => `
            <tr>
              <td><strong>${row.path}</strong></td>
              <td><span class="status-chip ${row.recommendation === "Recommended" ? "ready" : row.recommendation === "Transition only" ? "warn" : ""}">${row.recommendation}</span></td>
              <td>${row.impact}</td>
              <td>${row.rationale}</td>
            </tr>
          `).join("")}
        </tbody>
      </table>
    </section>
  `;
}

function renderVisionImproveStage() {
  return `
    <section class="vision-stage-content">
      <div class="vision-recommendation teal">
        <span>Agentic work queue</span>
        <h3>Route the right issue to the right team</h3>
        <p>The platform separates evidence that can be found automatically from problems that need documentation, workflow, or data-mapping intervention.</p>
      </div>
      <div class="vision-kpi-row">
        <div><span>Evidence found</span><strong>428</strong><em>Patients ready for support review</em></div>
        <div><span>Actionable gaps</span><strong>112</strong><em>Routed before year end</em></div>
        <div><span>Data issues</span><strong>3</strong><em>Feeds or mappings need attention</em></div>
      </div>
      <table class="vision-table">
        <thead><tr><th>Issue type</th><th>Owner</th><th>Volume</th><th>Next action</th></tr></thead>
        <tbody>
          ${visionWorkQueueRows.map((row) => `
            <tr><td><strong>${row.type}</strong></td><td>${row.owner}</td><td>${row.count}</td><td>${row.next}</td></tr>
          `).join("")}
        </tbody>
      </table>
    </section>
  `;
}

function renderVisionMonitorStage() {
  return `
    <section class="vision-stage-content">
      <div class="vision-recommendation amber">
        <span>Exception monitoring</span>
        <h3>Abnormal changes come to the quality manager</h3>
        <p>Week-over-week satisfaction rates are watched for unexpected drops, unlikely jumps, stale feeds, and denominator shifts.</p>
      </div>
      <div class="vision-trend-strip">
        <div><span>Depression screening</span><strong>-7.4 pts</strong><em>Needs review</em></div>
        <div><span>HIV screening</span><strong>+18.2 pts</strong><em>Audit sample</em></div>
        <div><span>Blood pressure</span><strong>+0.8 pts</strong><em>Expected trend</em></div>
      </div>
      <table class="vision-table">
        <thead><tr><th>Signal</th><th>Likely cause</th><th>Action</th></tr></thead>
        <tbody>
          ${visionMonitorRows.map((row) => `
            <tr><td><strong>${row.signal}</strong></td><td>${row.cause}</td><td>${row.action}</td></tr>
          `).join("")}
        </tbody>
      </table>
    </section>
  `;
}

function renderVisionValidateStage() {
  return `
    <section class="vision-stage-content">
      <div class="vision-recommendation">
        <span>Representative validation</span>
        <h3>Validate the data that best represents the organization</h3>
        <p>The platform chooses the validation population, checks patient qualification logic, and leaves human judgment for true exceptions.</p>
      </div>
      <div class="vision-kpi-row">
        <div><span>Validation population</span><strong>1,240</strong><em>Representative records selected</em></div>
        <div><span>Auto-validated</span><strong>97%</strong><em>Evidence and logic confirmed</em></div>
        <div><span>Needs judgment</span><strong>37</strong><em>Exceptions queued for review</em></div>
      </div>
      <table class="vision-table">
        <thead><tr><th>Validation check</th><th>Status</th><th>Detail</th></tr></thead>
        <tbody>
          ${visionValidationRows.map((row) => `
            <tr>
              <td><strong>${row.check}</strong></td>
              <td><span class="status-chip ${row.status === "Ready" ? "ready" : "warn"}">${row.status}</span></td>
              <td>${row.detail}</td>
            </tr>
          `).join("")}
        </tbody>
      </table>
    </section>
  `;
}

function renderVisionSubmitStage() {
  return `
    <section class="vision-stage-content">
      <div class="vision-recommendation green">
        <span>Secure submission</span>
        <h3>Approved data is sent through the active CMS QPP connection</h3>
        <p>No file handoffs, credential chasing, or version ambiguity. The audit trail shows exactly what was approved and submitted.</p>
      </div>
      <div class="vision-kpi-row">
        <div><span>Submission package</span><strong>Frozen</strong><em>Approved version locked</em></div>
        <div><span>OAuth session</span><strong>Active</strong><em>${qppSession.remaining} remaining</em></div>
        <div><span>CMS response</span><strong>Pending</strong><em>Receipt tracked in workspace</em></div>
      </div>
      <table class="vision-table">
        <thead><tr><th>Submission step</th><th>Status</th><th>Detail</th></tr></thead>
        <tbody>
          ${visionSubmissionRows.map((row) => `
            <tr><td><strong>${row.step}</strong></td><td>${row.status}</td><td>${row.detail}</td></tr>
          `).join("")}
        </tbody>
      </table>
    </section>
  `;
}

function renderDesignLab() {
  document.querySelector(".app-shell").classList.add("design-lab-mode");
  document.querySelector(".app-shell").classList.remove("home-mode");
  document.querySelector(".body-grid").classList.add("home-mode");
  sidebar.innerHTML = "";
  const scenario = scenarioDefinitions[state.scenario];
  const workflow = currentWorkflow(scenario);
  content.innerHTML = `
    <section class="design-lab-canvas ${state.labMode === "vision" ? "vision-canvas" : ""}">
      ${state.labMode === "vision" ? renderVisionPlatform() : `
        <div class="lab-scenario">
          <div>
            <span class="eyebrow">Scenario</span>
            <h1>${scenario.label}</h1>
            <p>${scenario.goal}</p>
          </div>
          <div class="lab-signal">
            <span>Test Signal</span>
            <strong>${workflow.step.signal || scenario.signal}</strong>
          </div>
        </div>
        ${state.labMode === "compare" ? renderCompareView(scenario) : renderVariantView(state.labMode, scenario)}
      `}
    </section>
  `;
  content.querySelectorAll("[data-open-production]").forEach((button) => {
    button.addEventListener("click", () => {
      state.labMode = "production";
      applyScenario(button.dataset.openProduction, true);
    });
  });
  content.querySelectorAll("[data-switch-lab]").forEach((button) => {
    button.addEventListener("click", () => {
      state.labMode = button.dataset.switchLab;
      render();
    });
  });
  content.querySelectorAll("[data-lab-step]").forEach((button) => {
    button.addEventListener("click", () => {
      state.labStep = Number(button.dataset.labStep);
      render();
    });
  });
  content.querySelectorAll("[data-lab-next]").forEach((button) => {
    button.addEventListener("click", () => {
      const nextScenario = button.dataset.labNext;
      const steps = workflowSteps(scenarioDefinitions[nextScenario] || scenario);
      state.labStep = Math.min(state.labStep + 1, steps.length - 1);
      render();
    });
  });
  content.querySelectorAll("[data-lab-prev]").forEach((button) => {
    button.addEventListener("click", () => {
      state.labStep = Math.max(state.labStep - 1, 0);
      render();
    });
  });
  content.querySelectorAll("[data-vision-next]").forEach((button) => {
    button.addEventListener("click", () => {
      const delta = Number(button.dataset.visionNext);
      state.labStep = Math.min(Math.max(state.labStep + delta, 0), visionStages.length - 1);
      render();
    });
  });
  content.querySelectorAll("[data-lab-program]").forEach((button) => {
    button.addEventListener("click", () => {
      const program = button.dataset.labProgram;
      const status = button.dataset.pathwayStatus;
      if (status === "disabled") {
        showToast(`${programLabel(program)} is not configured for this customer.`);
        return;
      }
      const nextScenario = defaultScenarioByProgram[program];
      if (!nextScenario) return;
      state.scenario = nextScenario;
      state.labStep = 0;
      resetMvpSpecialtySelection();
      scenarioSelect.value = nextScenario;
      render();
    });
  });
  content.querySelectorAll("[data-open-eligible-program]").forEach((button) => {
    button.addEventListener("click", () => {
      const nextScenario = defaultScenarioByProgram[button.dataset.openEligibleProgram];
      if (!nextScenario) return;
      state.scenario = nextScenario;
      state.labStep = 0;
      resetMvpSpecialtySelection();
      scenarioSelect.value = nextScenario;
      render();
    });
  });
  content.querySelectorAll("[data-mvp-specialty]").forEach((select) => {
    select.addEventListener("change", () => {
      state.mvpSpecialty = select.value;
      state.mvpSpecialties = [select.value];
      state.practiceComposition = "single";
      render();
    });
  });
  content.querySelectorAll("[data-practice-composition]").forEach((input) => {
    input.addEventListener("change", () => {
      state.practiceComposition = input.value;
      const current = selectedMvpSpecialties(scenario);
      if (state.practiceComposition === "single") {
        const selected = current[0] || scenarioDefaultSpecialty(scenario);
        state.mvpSpecialty = selected;
        state.mvpSpecialties = [selected];
      } else {
        state.mvpSpecialties = current.length ? current : scenarioDefaultSpecialties(scenario);
        state.mvpSpecialty = state.mvpSpecialties[0] || null;
      }
      render();
    });
  });
  content.querySelectorAll("[data-practice-composition-select]").forEach((select) => {
    select.addEventListener("change", () => {
      state.practiceComposition = select.value;
      const current = selectedMvpSpecialties(scenario);
      state.mvpSpecialties = state.practiceComposition === "single" ? [current[0] || scenarioDefaultSpecialty(scenario)] : current;
      state.mvpSpecialty = state.mvpSpecialties[0] || null;
      render();
    });
  });
  content.querySelectorAll("[data-mvp-specialty-option]").forEach((checkbox) => {
    checkbox.addEventListener("change", () => {
      const selected = [...content.querySelectorAll("[data-mvp-specialty-option]:checked")].map((item) => item.value);
      state.practiceComposition = "multi";
      state.mvpSpecialties = selected.length ? selected : scenarioDefaultSpecialties(scenario);
      state.mvpSpecialty = state.mvpSpecialties[0] || null;
      render();
    });
  });
  bindToastButtons();
}

function renderCompareView(scenario) {
  const workflow = currentWorkflow(scenario);
  return `
    <div class="compare-grid">
      <article class="compare-pane">
        <div class="pane-heading">
          <span>Control</span>
          <strong>Production Today</strong>
        </div>
        ${renderProductionSnapshot(scenario)}
        <button class="lab-btn secondary" data-open-production="${state.scenario}">Open Control Full Screen</button>
      </article>
      <article class="compare-pane">
        <div class="pane-heading">
          <span>Variant A</span>
          <strong>Customer Command Center</strong>
        </div>
        ${renderCommandCenterSnapshot(scenario, true)}
        <button class="lab-btn secondary" data-switch-lab="variantA">Open Variant A</button>
      </article>
    </div>
    <div class="compare-runner">
      <div>
        <span class="eyebrow">Current Click-Through Step</span>
        <strong>${workflow.index === 0 ? "Start here" : workflowBadge(workflow.index)}: ${workflow.step.title}</strong>
        <p>${workflow.step.body}</p>
      </div>
      <div class="workflow-actions compact-actions">
        <button class="lab-btn" data-lab-prev ${workflow.index === 0 ? "disabled" : ""}>Back</button>
        <button class="lab-btn" data-lab-next="${state.scenario}" ${workflow.index === workflow.steps.length - 1 ? "disabled" : ""}>Next Step</button>
      </div>
    </div>
    <div class="comparison-notes">
      <div><strong>Navigation Distance</strong><span>Compare click count, visible context, and whether program/scope is carried forward.</span></div>
      <div><strong>Orientation</strong><span>Check whether the user knows the customer, program, year, scope, and next action at each step.</span></div>
      <div><strong>Policy Flexibility</strong><span>Look for places where retired or emerging pathways can be added without another left-rail branch.</span></div>
    </div>
  `;
}

function renderVariantView(mode, scenario) {
  if (mode === "vision") {
    return renderVisionPlatform(scenario);
  }
  if (mode === "smart") {
    return renderSmartGuidedSubmission(scenario);
  }
  if (mode === "variantB") {
    return renderPathwayHub(scenario);
  }
  return renderCommandCenter(scenario);
}

function renderProductionSnapshot(scenario) {
  const row = performanceRows[scenario.program]?.[0];
  const program = programLabel(scenario.program);
  return `
    <div class="mini-shell">
      <div class="mini-topbar">Oracle Health Data Submissions <span>${program}</span></div>
      <div class="mini-body">
        <div class="mini-rail"><strong>${program}</strong><span>Performance</span><span>Submissions</span><span>Upload</span></div>
        <div class="mini-content">
          <h3>${scenario.route === "performance-detail" ? `View Scores for ${scenario.selectedOrg}` : `${program} Performance`}</h3>
          ${scenario.route === "performance-detail" ? miniScoreRows(scenario.program, scenario.selectedOrg) : `
            <table><thead><tr><th>Name</th><th>Quality Score</th><th>${scenario.program === "APPPLUS" ? "TINs" : "Providers"}</th></tr></thead>
            <tbody><tr><td>${row?.name || "Selected entity"}</td><td>${scoreCell(row?.quality || "pending")}</td><td>${row?.providers ?? row?.tins ?? 0}</td></tr></tbody></table>
          `}
        </div>
      </div>
    </div>
  `;
}

function renderCommandCenter(scenario) {
  const workflow = currentWorkflow(scenario);
  return `
    <div class="variant-layout">
      ${renderCommandCenterSnapshot(scenario, false)}
      <aside class="lab-panel">
        <h2>Scenario Runner</h2>
        <div class="scenario-progress-note">
          <span>Current step</span>
          <strong>Step ${workflow.index + 1}: ${workflow.step.title}</strong>
          <em>${workflowPercent(workflow)}% complete</em>
        </div>
        <div class="workflow-actions">
          <button class="btn ghost" data-lab-prev ${workflow.index === 0 ? "disabled" : ""}>Back</button>
          <button class="btn" data-lab-next="${state.scenario}" ${workflow.index === workflow.steps.length - 1 ? "disabled" : ""}>Next Step</button>
        </div>
        <button class="btn" data-open-production="${state.scenario}">Run Against Production</button>
      </aside>
    </div>
  `;
}

function renderCommandCenterSnapshot(scenario, compact) {
  const profile = scenarioCustomer(scenario);
  const workflow = currentWorkflow(scenario);
  return `
    <div class="command-center ${compact ? "compact" : ""}">
      <header class="customer-header">
        <div>
          <span class="eyebrow">Customer</span>
          <h2>${profile.name}</h2>
          <p>${profile.activeSummary}</p>
        </div>
        <div class="customer-status">
          <span>${profile.reportingYear}</span>
          <strong>${programLabel(scenario.program)}</strong>
          <small>${programStatus(profile, scenario.program).label}</small>
        </div>
      </header>
      <div class="pathway-strip">
        ${availablePrograms(profile).map((program) => {
          const availability = programStatus(profile, program);
          return `
            <button class="${program === scenario.program ? "selected" : ""} ${availability.status}" data-lab-program="${program}" data-pathway-status="${availability.status}">
              <strong>${programLabel(program)}</strong>
              <span>${availability.label}</span>
            </button>
          `;
        }).join("")}
      </div>
      <div class="strategy-note">
        <strong>${profile.strategy}</strong>
        <span>${profile.inactiveNote}</span>
      </div>
      ${renderMeasurePathwayQualifier({ compact, mode: "command" })}
      ${renderCustomerPhaseGuide(scenario, { compact })}
      ${renderProviderAssignmentPlanner(scenario, { compact })}
      ${renderMvpSelectionWorkbench(scenario, { compact })}
      <div class="workbench-grid">
        <section class="lab-panel">
          <div class="panel-title-row">
            <h3>${workflow.step.title}</h3>
            <span>${workflowBadge(workflow.index)} phase</span>
          </div>
          <p class="workflow-copy">${workflow.step.body}</p>
          ${renderWorkflowEvidence(scenario, workflow.step)}
        </section>
        <section class="lab-panel">
          <h3>Ready Actions</h3>
          ${workflow.step.actions.map((action) => `
            <button class="action-row" ${action.next ? `data-lab-next="${state.scenario}"` : `data-toast="${action.toast}"`}>
              ${action.label}<span>${action.verb}</span>
            </button>
          `).join("")}
        </section>
      </div>
    </div>
  `;
}

function renderPathwayHub(scenario) {
  const profile = scenarioCustomer(scenario);
  const workflow = currentWorkflow(scenario);
  return `
    <div class="hub-layout">
      <aside class="hub-nav">
        <h2>${profile.name}</h2>
        <p>${profile.activeSummary}</p>
        ${availablePrograms(profile).map((program) => {
          const availability = programStatus(profile, program);
          return `
          <button class="${program === scenario.program ? "selected" : ""} ${availability.status}" data-lab-program="${program}" data-pathway-status="${availability.status}">
            <strong>${programLabel(program)}</strong>
            <span>${pathwayDescription(program)}</span>
            <em>${statusLabel(availability.status)}: ${availability.note}</em>
          </button>
        `;
        }).join("")}
        <div class="hidden-path-note">${profile.inactiveNote}</div>
      </aside>
      <section class="hub-main">
        <div class="hub-title">
          <span class="eyebrow">Guided Workflow</span>
          <h2>${scenario.label}</h2>
        </div>
        ${renderMeasurePathwayQualifier({ mode: "hub" })}
        ${renderCustomerPhaseGuide(scenario)}
        ${renderProviderAssignmentPlanner(scenario)}
        ${renderMvpSelectionWorkbench(scenario)}
        <div class="lab-panel">
          <div class="panel-title-row">
            <h3>${workflow.step.title}</h3>
            <span>${programLabel(scenario.program)}</span>
          </div>
          <p class="workflow-copy">${workflow.step.body}</p>
          ${renderWorkflowEvidence(scenario, workflow.step)}
          <div class="workflow-actions">
            <button class="btn ghost" data-lab-prev ${workflow.index === 0 ? "disabled" : ""}>Back</button>
            <button class="btn" data-lab-next="${state.scenario}" ${workflow.index === workflow.steps.length - 1 ? "disabled" : ""}>Next Step</button>
          </div>
        </div>
      </section>
    </div>
  `;
}

function renderSmartGuidedSubmission(scenario) {
  const workflow = currentWorkflow(scenario);
  const profile = scenarioCustomer(scenario);
  return `
    <div class="smart-shell">
      <header class="smart-topbar">
        <strong>Oracle Health Smart Submissions</strong>
        <div><span>AA</span>Amit Mehta</div>
      </header>
      <section class="smart-context">
        <div>
          <span class="eyebrow">Customer Workspace</span>
          <h2>${scenario.program === "APPPLUS" ? "Oracle-demo APM Entity" : "Oracle-demo"}</h2>
        </div>
        <dl>
          <div><dt>Year</dt><dd>2026</dd></div>
          <div><dt>Organizations</dt><dd>178</dd></div>
          <div><dt>Providers</dt><dd>8,547</dd></div>
          <div><dt>Pathway Mix</dt><dd>${scenarioCustomer(scenario).activeSummary}</dd></div>
        </dl>
      </section>
      <div class="smart-pathway-strip">
        ${availablePrograms(profile).map((program) => {
          const availability = programStatus(profile, program);
          return `
            <button class="${program === scenario.program ? "selected" : ""} ${availability.status}" data-lab-program="${program}" data-pathway-status="${availability.status}">
              <strong>${programLabel(program)}</strong>
              <span>${availability.label}</span>
            </button>
          `;
        }).join("")}
      </div>
      ${renderMeasurePathwayQualifier({ compact: true, mode: "smart" })}
      ${renderCustomerPhaseGuide(scenario)}
      ${renderProviderAssignmentPlanner(scenario, { compact: scenario.program !== "MVP" })}
      ${renderMvpSelectionWorkbench(scenario, { compact: scenario.program !== "MVP" })}
      <div class="smart-workspace">
        <main>
          ${renderSmartStage(scenario, workflow)}
        </main>
        <aside class="smart-aide">
          <span class="eyebrow">Recommended Next Best Action</span>
          <h3>${workflow.step.title}</h3>
          <p>${workflow.step.body}</p>
          <div class="smart-aide-list">
            <div><strong>${smartScoreLift.recommendationLift}</strong><span>projected point lift</span></div>
            <div><strong>${smartScoreLift.tinsNeedingReview}</strong><span>need review before submission</span></div>
            <div><strong>Low risk</strong><span>CMS-calc gap after recommendations</span></div>
          </div>
          <div class="workflow-actions">
            <button class="btn ghost" data-lab-prev ${workflow.index === 0 ? "disabled" : ""}>Back</button>
            <button class="btn" data-lab-next="${state.scenario}" ${workflow.index === workflow.steps.length - 1 ? "disabled" : ""}>Continue</button>
          </div>
        </aside>
      </div>
    </div>
  `;
}

function renderSmartStage(scenario, workflow) {
  if (workflow.index === 0) return renderSmartScoreDashboard(scenario);
  if (workflow.index === 1) return renderSmartRecommendationCards();
  if (workflow.index === workflow.steps.length - 1) return renderSmartSubmitReview(scenario);
  return renderSmartRecommendationTable(scenario);
}

function renderSmartScoreDashboard(scenario) {
  return `
    <section class="smart-panel">
      <div class="smart-panel-title">
        <div>
          <span class="eyebrow">Score Optimization</span>
          <h3>${strategyTitle(scenario.program)}</h3>
        </div>
        <button class="lab-btn" data-lab-next="${state.scenario}">Review Recommendations</button>
      </div>
      <div class="score-optimizer">
        <div>
          <span>Baseline</span>
          <strong>${smartScoreLift.baseline}</strong>
          <em>Current projected score</em>
        </div>
        <div>
          <span>Recommended Setup</span>
          <strong>${smartScoreLift.projected}</strong>
          <em>${smartScoreLift.recommendationLift} estimated lift</em>
        </div>
        <div>
          <span>CMS Benchmark</span>
          <strong>${smartScoreLift.benchmark}</strong>
          <em>1.3% gap after recommendations</em>
        </div>
      </div>
      <div class="quality-complexity-band">
        ${renderQppOAuthStatus({ compact: true })}
        <div>
          <span>Quality Mode</span>
          <strong>eCQM & CQM</strong>
          <em>Unified Quality screen, APP Plus aligned</em>
        </div>
        <div>
          <span>Submission Actions</span>
          <strong>Edit, Freeze, Approve</strong>
          <em>Category-aware action menu</em>
        </div>
      </div>
      <div class="recommendation-impact">
        <div><span>Eligible Clinicians</span><strong>${smartScoreLift.opportunity}</strong><em>can improve with recommended settings</em></div>
        <div><span>Provider Lift</span><strong>${smartScoreLift.providersLift}</strong><em>additional clinicians likely to benefit</em></div>
        <div><span>Manual Review</span><strong>${smartScoreLift.tinsNeedingReview}</strong><em>not auto-submitted until confirmed</em></div>
      </div>
    </section>
  `;
}

function renderSmartRecommendationCards() {
  return `
    <section class="smart-panel">
      <div class="smart-panel-title">
        <div>
          <span class="eyebrow">Recommendations</span>
          <h3>Top Performing TINs</h3>
        </div>
        <button class="lab-btn" data-lab-next="${state.scenario}">View All TINs</button>
      </div>
      <div class="smart-card-grid">
        ${smartRecommendations.slice(0, 3).map((row) => `
          <article class="recommendation-card">
            <div class="card-status ${row.status === "Ready" ? "ready" : "warn"}">${row.status}</div>
            <h4>${row.tin}</h4>
            <p>${row.name}</p>
            <dl>
              <div><dt>Projected</dt><dd>${row.projectedScore}</dd></div>
              <div><dt>Providers</dt><dd>${row.providers}</dd></div>
            </dl>
            <span>${row.reviewSignal}</span>
            <button class="btn" data-lab-next="${state.scenario}">${row.action}</button>
          </article>
        `).join("")}
      </div>
    </section>
  `;
}

function renderSmartRecommendationTable(scenario) {
  return `
    <section class="smart-panel">
      <div class="smart-panel-title">
        <div>
          <span class="eyebrow">Recommendation Details</span>
          <h3>Review TINs and Pathway Fit</h3>
        </div>
        <div class="smart-filters">
          <input value="" placeholder="Search by TIN or name" />
          <select><option>All Pathways</option><option>MVP Submission</option><option>APP Plus</option><option>QRDA</option><option>Traditional MIPS transition</option></select>
          <select><option>eCQM & CQM</option><option>eCQM</option><option>CQM</option></select>
          <select><option>All Statuses</option><option>Ready</option><option>Not Registered</option></select>
        </div>
      </div>
      <div class="smart-table-wrap">
        <table class="smart-table">
          <thead><tr><th>TIN / Name</th><th>Pathway</th><th>Providers</th><th>Projected Score</th><th>Status</th><th>Review Signals</th><th>Actions</th></tr></thead>
          <tbody>
            ${smartRecommendations.map((row, index) => `
              <tr>
                <td><strong>${row.name}</strong><span>${row.tin}</span></td>
                <td>${row.pathway}</td>
                <td>${row.providers}</td>
                <td><strong>${row.projectedScore}</strong><span>Baseline 88.44</span></td>
                <td><span class="status-chip ${row.status === "Ready" ? "ready" : "warn"}">${row.status}</span></td>
                <td>${row.reviewSignal}</td>
                <td>
                  <button class="link" data-toast="Insight panel opened for ${row.name}">Insights</button>
                  <button class="btn small" data-lab-step="${Math.min(workflowSteps(scenario).length - 1, index === 3 ? 3 : 2)}">${row.action}</button>
                </td>
              </tr>
            `).join("")}
          </tbody>
        </table>
      </div>
    </section>
  `;
}

function renderSmartSubmitReview(scenario) {
  const row = smartRecommendations[3];
  const pathwayLabel = scenario.program === "APPPLUS" ? "APP Plus APM Entity" : "MVP Subgroup";
  return `
    <section class="smart-panel">
      <div class="entity-score-band">
        <div><span>Group Submissions</span><strong>1</strong><em>across 528 providers</em></div>
        <div><span>Subgroup Submissions</span><strong>1</strong><em>recommended</em></div>
        <div><span>Individual Pathways</span><strong>2</strong><em>not recommended</em></div>
        <div><span>Projected Score</span><strong>${row.projectedScore}</strong><em>+5.54 vs baseline</em></div>
      </div>
      <div class="smart-modal-preview">
        <div class="modal-card">
          <div class="modal-heading">
            <h3>${scenario.program === "QRDA" ? "Generate Recommended Package" : "Submit Recommendation"}</h3>
            <button class="link" data-toast="Review closed">Close</button>
          </div>
          <dl class="modal-summary">
            <div><dt>TIN</dt><dd>${row.tin}</dd></div>
            <div><dt>Name</dt><dd>${row.name}</dd></div>
            <div><dt>Pathway</dt><dd>${pathwayLabel}</dd></div>
            <div><dt>Projected Score</dt><dd>${row.projectedScore}</dd></div>
            <div><dt>Quality Mode</dt><dd>eCQM & CQM</dd></div>
            <div><dt>CMS QPP OAuth</dt><dd>Active (${qppSession.remaining})</dd></div>
          </dl>
          <div class="measure-review-list">
            <h4>Measures Included</h4>
            <div><span>236</span>Controlling High Blood Pressure</div>
            <div><span>134</span>Screening for Depression and Follow-Up Plan</div>
            <div><span>001</span>Diabetes: Glycemic Status Assessment Greater Than 9%</div>
            <div><span>110</span>Preventive Care and Screening: Influenza Immunization</div>
          </div>
          <label class="attestation"><input type="checkbox" checked /> I have reviewed the data I am submitting.</label>
          <div class="workflow-actions">
            <button class="btn ghost" data-lab-prev>Back</button>
            <button class="btn" data-toast="${programLabel(scenario.program)} recommendation submitted for review">Submit</button>
          </div>
        </div>
      </div>
    </section>
  `;
}

function renderScenarioFocus(scenario) {
  if (scenario.program === "MVP") {
    const entity = scenario.selectedOrg || "ZzMVP4";
    const card = mvpScorecards[entity] || mvpScorecards.ZzMVP4;
    return `
      <dl class="focus-list">
        <div><dt>Program</dt><dd>MVP</dd></div>
        <div><dt>Subgroup</dt><dd>${entity}</dd></div>
        <div><dt>MVP ID</dt><dd>${card.mvpId}</dd></div>
        <div><dt>Quality Score</dt><dd>${performanceRows.MVP.find((row) => row.name === entity)?.quality || "37% (11.18 out of 30)"}</dd></div>
      </dl>
      ${miniScoreRows("MVP", entity)}
    `;
  }
  if (scenario.program === "APPPLUS") {
    return `
      <dl class="focus-list">
        <div><dt>Program</dt><dd>APP Plus</dd></div>
        <div><dt>Entity</dt><dd>CCPM Community Care Partnership of Maine</dd></div>
        <div><dt>Quality Score</dt><dd>30% (15.1 out of 50)</dd></div>
        <div><dt>Outcome Date</dt><dd>2026-07-15</dd></div>
      </dl>
      ${miniScoreRows("APPPLUS", "CCPM Community Care Partnership of Maine")}
    `;
  }
  if (scenario.program === "QRDA") {
    return `
      <dl class="focus-list">
        <div><dt>Export Type</dt><dd>QRDA I / QRDA III</dd></div>
        <div><dt>Programs</dt><dd>MVP Submission, APP Plus, QRDA export</dd></div>
        <div><dt>Scopes</dt><dd>Individual, Group, Subgroup, APM Entity</dd></div>
        <div><dt>Status</dt><dd>Ready to configure</dd></div>
      </dl>
    `;
  }
  return `
    <dl class="focus-list">
      <div><dt>Program</dt><dd>${programLabel(scenario.program)}</dd></div>
      <div><dt>Customer</dt><dd>ZzMount Desert Island Hospital</dd></div>
      <div><dt>Quality Score</dt><dd>59% (17.6 out of 30)</dd></div>
      <div><dt>Providers</dt><dd>61</dd></div>
    </dl>
  `;
}

function miniScoreRows(program, entity) {
  const card = program === "MVP" ? mvpScorecards[entity] : ((scorecardsByProgram[program] || {})[entity] || { measures });
  return `
    <table class="mini-table">
      <thead><tr><th>Measure</th><th>Rate</th><th>Score</th></tr></thead>
      <tbody>
        ${(card.measures || measures).slice(0, 4).map((measure) => `<tr><td>${measure.measure}</td><td>${measure.rate}</td><td>${measure.score}</td></tr>`).join("")}
      </tbody>
    </table>
  `;
}

function renderWorkflowEvidence(scenario, step) {
  if (step.view === "scope") {
    return `
      <div class="signal-grid">
        <div><span>Customer Mix</span><strong>${scenarioCustomer(scenario).activeSummary}</strong></div>
        <div><span>Selected Path</span><strong>${programLabel(scenario.program)}</strong></div>
        <div><span>Reporting Year</span><strong>2026</strong></div>
      </div>
    `;
  }
  if (step.view === "submissions") {
    const scope = scenario.route.replace("submissions-", "") || "Subgroup";
    const rows = submissions[scenario.program]?.[scope] || submissions[scenario.program]?.Subgroup || [];
    return `
      <div class="mini-list">
        ${(rows.length ? rows : submissions.MVP.Subgroup).map((row) => `
          <button class="mini-list-row" data-lab-next="${state.scenario}">
            <strong>${row.name}</strong>
            <span>${row.tin} · ${row.quality}</span>
          </button>
        `).join("")}
      </div>
    `;
  }
  if (step.view === "draft") {
    return `
      <div class="readiness-board">
        <div><span>Quality</span><strong>eCQM & CQM</strong><em>Unified Quality screen ready</em></div>
        <div><span>CMS QPP OAuth</span><strong>Active</strong><em>${qppSession.remaining} remaining</em></div>
        <div><span>PI</span><strong>Needs values</strong><em>2 numerator fields missing</em></div>
        <div><span>IA</span><strong>Attestation</strong><em>1 activity requires review</em></div>
        <div><span>Package</span><strong>Draft</strong><em>Not submitted to CMS</em></div>
      </div>
    `;
  }
  if (step.view === "qrda") {
    return `
      <div class="qrda-flow">
        <label>Category<select><option>QRDA III aggregate package</option><option>QRDA I patient-level package</option></select></label>
        <label>Program<select><option>${programLabel(scenario.program === "QRDA" ? "APPPLUS" : scenario.program)}</option><option>MVP Submission</option><option>APP Plus</option><option>Traditional MIPS transition</option></select></label>
        <label>Scope<select><option>APM Entity</option><option>Subgroup</option><option>Individual</option><option>Group if allowed</option></select></label>
      </div>
    `;
  }
  return renderScenarioFocus(scenario);
}

function workflowSteps(scenario) {
  const action = (label, verb = "Continue", next = true) => ({ label, verb, next, toast: `${label} noted` });
  const terminal = (label, verb = "Done") => ({ label, verb, next: false, toast: `${label} queued` });
  const map = {
    "mvp-zmvp4": [
      { title: "Infer Available Paths", body: "Start from the customer’s fixed enabled measures, roster, TIN/NPI eligibility, and participation context. Do not ask the user to choose a measure inventory.", signal: "The first visible customer action is choosing a supported submission path, not reviewing raw measure setup.", view: "scope", actions: [action("Open recommended path"), terminal("Explain legacy MIPS", "Note")] },
      { title: "Configure MVP Path", body: "Ask whether the practice is single-specialty or multi-specialty, then collect only the relevant specialties. The MVP list is narrowed by specialty and disabled when the customer does not have supporting measures enabled.", signal: "The customer sees a short viable MVP list with clear unavailable reasons.", view: "submissions", actions: [action("Select MVP candidate"), terminal("Compare levels", "Compare")] },
      { title: "Forecast Provider Fit", body: "Forecast each provider’s performance against the selected MVP before assigning the provider to an individual, subgroup, group, or APM Entity path.", signal: "Provider assignment is based on predicted performance and readiness, not a static TIN/NPI specialty inference.", view: "score", actions: [action("Review provider forecast"), terminal("Flag low confidence", "Flag")] },
      { title: "Register and Package", body: "Register the MVP or subgroup when needed, preserve the subgroup ID, freeze the submission-ready package, and queue the CMS submit or export action.", signal: "Submission intent is obvious and carries customer, MVP, level, subgroup, and performance period forward.", view: "score", actions: [terminal("Queue MVP package", "Queue"), terminal("Download details", "Download")] },
    ],
    "appplus-score": [
      { title: "Confirm Submission Strategy", body: "Open a customer workspace where MVP Submission, APP Plus, and QRDA remain visible while retired Traditional MIPS is transition context.", signal: "Unused programs do not compete with the active submission strategy.", view: "scope", actions: [action("Open APP Plus"), terminal("View transition note", "View")] },
      { title: "Open APM Entity", body: "Land on the APM Entity score context with the entity name, score, and reporting period already selected.", signal: "APP Plus feels like a peer pathway but keeps APM-specific language.", view: "score", actions: [action("Review CQM scores"), terminal("Open entity roster", "Open")] },
      { title: "Resolve Score Signals", body: "Surface high-volume measures, weak rates, selected eCQM/CQM mode, and missing supplemental inputs before export.", signal: "The screen tells users what needs attention instead of only listing numbers.", view: "score", actions: [action("Review outliers"), terminal("Assign follow-up", "Assign")] },
      { title: "Export APP Plus Package", body: "Prepare a package with program, entity, year, and file format already scoped from the customer strategy.", signal: "The export path carries context forward.", view: "qrda", actions: [terminal("Queue APP Plus export", "Queue"), terminal("Download score data", "Download")] },
    ],
    "mips-performance": [
      { title: "Show Transition Context", body: "Traditional MIPS is available only as a legacy reference while MVP Submission, APP Plus, and QRDA remain the in-app future-state paths.", signal: "Users understand MIPS is not the primary future pathway.", view: "scope", actions: [action("Open legacy scorecard"), terminal("View migration note", "Note")] },
      { title: "Review Customer Score", body: "Display the customer-level quality score and provider count using the same production data shape.", signal: "Legacy data remains accessible without driving the future workflow.", view: "score", actions: [action("Open score detail"), terminal("Export legacy report", "Export")] },
      { title: "Route to Future Pathway", body: "Offer the next likely customer action: MVP Submission, APP Plus review, or QRDA package generation.", signal: "The UI nudges users from MIPS reference data toward configured future paths.", view: "scope", actions: [terminal("Recommend MVP path", "Recommend"), terminal("Create QRDA package", "Queue")] },
    ],
    "mvp-individual": [
      { title: "Review Eligible Clinicians", body: "Keep the user inside MVP Submission and start from clinician roster, TIN/NPI eligibility, and historical measure performance. Specialty is a facility-selected filter.", signal: "The dependent filters make sense because selected specialty and pathway context are explicit.", view: "scope", actions: [action("Choose Individual scope"), terminal("Review subgroup scope", "Review")] },
      { title: "Choose Composition, Specialty, and MVP", body: "Choose the individual clinician, confirm whether the practice context is single-specialty or multi-specialty, select the facility-confirmed specialty set, then filter available MVPs by patient population and measure fit.", signal: "Disabled fields explain what must be selected before an eligible clinician or MVP can be chosen.", view: "submissions", actions: [action("Select clinician"), terminal("Clear filters", "Clear")] },
      { title: "Forecast Individual Draft", body: "Show clinician, chosen MVP, TIN/NPI, quality measures, forecast score, QPP OAuth status, and missing supplemental data before draft creation.", signal: "The user can see whether the individual MVP submission is viable before registering or packaging.", view: "draft", actions: [terminal("Create individual draft", "Create"), terminal("Save filter set", "Save")] },
    ],
    "qrda-export": [
      { title: "Start from Export Pathway", body: "QRDA is treated as a first-class pathway with customer and active program strategy visible.", signal: "File generation is no longer a detached utility screen.", view: "scope", actions: [action("Configure QRDA package"), terminal("View generated files", "Open")] },
      { title: "Choose Category and Program", body: "Select QRDA I or QRDA III, then choose from only the customer’s configured programs.", signal: "Users cannot accidentally generate files for programs the customer does not use.", view: "qrda", actions: [action("Choose QRDA III"), terminal("Switch category", "Switch")] },
      { title: "Confirm Scope", body: "Scope options adapt to the program: subgroup for MVP, APM Entity for APP Plus, and individual when supported.", signal: "Program rules are visible in the controls instead of hidden behind validation errors.", view: "qrda", actions: [action("Confirm scope"), terminal("Preview package name", "Preview")] },
      { title: "Generate Package", body: "Queue a ZIP package and expose status, warnings, and download actions in the same pathway.", signal: "Users can understand package readiness and next action immediately.", view: "qrda", actions: [terminal("Generate ZIP", "Generate"), terminal("Download history", "Open")] },
    ],
    "new-submission": [
      { title: "Choose Draft Pathway", body: "Create a draft from the customer’s active pathway list, then choose MVP Submission, APP Plus, or QRDA based on the customer’s submission strategy.", signal: "Draft creation respects each customer’s configured submission mix.", view: "scope", actions: [action("Create MVP draft"), terminal("Use APP Plus instead", "Switch")] },
      { title: "Choose Composition, MVP, and Measures", body: "For MVP drafts, start with single-specialty vs multi-specialty composition, choose the applicable specialties, pick the MVP, choose the reporting level, then confirm 4 quality measures and collection type.", signal: "MVP setup is visible before the user commits to the draft.", view: "draft", actions: [action("Resolve missing inputs"), terminal("Create anyway", "Create")] },
      { title: "Save for Review", body: "Persist the draft with owner, due date, selected MVP, subgroup or clinician roster, CMS QPP OAuth state, and submission path.", signal: "The draft has operational context, not just form fields.", view: "draft", actions: [terminal("Save draft", "Save"), terminal("Assign reviewer", "Assign")] },
    ],
  };
  return map[state.scenario] || [
    { title: "Select Customer", body: "Choose the customer and configured submission pathways.", signal: scenario.signal, view: "scope", actions: [action("Open pathway")] },
  ];
}

function scenarioSteps(scenario) {
  return workflowSteps(scenario).map((step) => step.title);
}

function pathwayDescription(program) {
  const descriptions = {
    MIPS: "Traditional quality performance and submissions",
    MVP: "MVP submission and subgroup reporting",
    APPPLUS: "APM entity reporting and APP Plus scores",
    QRDA: "File generation and package history",
  };
  return descriptions[program];
}

function scoreCell(value) {
  if (value === "loading") return `<span class="spinner" aria-label="Loading"></span>`;
  if (value === "pending") return `<span class="status-pill warn">Pending</span>`;
  if (value === "draft") return `<span class="status-pill">Draft</span>`;
  if (value === "FROZEN") return `<span class="spinner" aria-label="Loading"></span><span class="subline">FROZEN</span>`;
  return value;
}

function bindBackButtons() {
  content.querySelectorAll("[data-back]").forEach((button) => {
    button.addEventListener("click", () => setRoute(button.dataset.back));
  });
}

function bindToastButtons() {
  content.querySelectorAll("[data-toast]").forEach((button) => {
    button.addEventListener("click", () => showToast(button.dataset.toast));
  });
}

render();
