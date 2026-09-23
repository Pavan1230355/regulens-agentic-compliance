/**
 * REGULENS - Synthetic Demo Database Seed Data
 * Enterprise Banking Regulatory Intelligence, Obligations, Controls & Gaps
 */

const regulations = [
  {
    id: "REG-CDD-03",
    title: "Customer Due Diligence Update v3",
    code: "CDD-2026-V3",
    version: "v3.0",
    status: "Active",
    jurisdiction: "India / RBI",
    category: "KYC / AML",
    effectiveDate: "2026-10-01",
    lastUpdated: "2026-02-15",
    description: "Updated Master Direction on Customer Due Diligence, enhanced verification retention, periodic review frequency for high-risk accounts, and mandatory exception logging.",
    documentUrl: "/docs/CDD_Update_v3.pdf",
    totalPages: 48,
    activeObligations: 8,
    impactedControls: 5,
    riskLevel: "High",
    versions: [
      {
        version: "v1.0",
        date: "2022-01-10",
        summary: "Initial CDD Baseline guidelines.",
        changesCount: 0
      },
      {
        version: "v2.0",
        date: "2024-05-18",
        summary: "Introduced digital KYC and video-based verification standards.",
        changesCount: 4
      },
      {
        version: "v3.0",
        date: "2026-02-15",
        summary: "Enhanced retention to 18 months, quarterly high-risk review, and mandatory exception logging.",
        changesCount: 3
      }
    ],
    sections: [
      {
        sectionId: "4.2",
        title: "Evidence Retention Standards",
        content: "Entities must retain all customer verification artifacts, including biometric logs, video CIP recordings, and identity validation tokens, for a minimum duration of 18 months following account opening or profile modification."
      },
      {
        sectionId: "6.1",
        title: "High-Risk Customer Review Cycles",
        content: "High-risk customer profiles must undergo comprehensive customer due diligence re-verification on a quarterly basis (every 90 days), replacing the previous annual review cycle."
      },
      {
        sectionId: "8.4",
        title: "Customer Verification Exception Log",
        content: "All overrides, exceptions, or delayed verification approvals granted during customer onboarding must be recorded in an immutable automated exception register and submitted to compliance operations monthly."
      }
    ]
  },
  {
    id: "REG-AML-02",
    title: "AML Master Direction 2025",
    code: "AML-MD-2025",
    version: "v2.1",
    status: "Active",
    jurisdiction: "India / FIU-IND",
    category: "Anti-Money Laundering",
    effectiveDate: "2025-06-01",
    lastUpdated: "2025-05-10",
    description: "Comprehensive anti-money laundering regulations governing transaction monitoring thresholds, suspicious activity reporting (STR), and ultimate beneficial ownership (UBO) identification.",
    documentUrl: "/docs/AML_Master_Direction_2025.pdf",
    totalPages: 124,
    activeObligations: 34,
    impactedControls: 22,
    riskLevel: "Critical"
  },
  {
    id: "REG-DLG-01",
    title: "RBI Digital Lending Guidelines v2",
    code: "DLG-2025-V2",
    version: "v2.0",
    status: "Active",
    jurisdiction: "India / RBI",
    category: "Digital Banking",
    effectiveDate: "2025-11-15",
    lastUpdated: "2025-09-20",
    description: "Regulatory framework for tech-enabled lending, loan service providers (LSP), APR disclosures, and direct borrower disbursement constraints.",
    documentUrl: "/docs/Digital_Lending_Guidelines_v2.pdf",
    totalPages: 62,
    activeObligations: 19,
    impactedControls: 14,
    riskLevel: "Medium"
  },
  {
    id: "REG-CSF-04",
    title: "Cybersecurity Framework for Banks 2026",
    code: "CSF-BANK-2026",
    version: "v4.0",
    status: "Active",
    jurisdiction: "Global / BIS & RBI",
    category: "Cybersecurity & Resilience",
    effectiveDate: "2026-01-01",
    lastUpdated: "2025-12-01",
    description: "Mandatory security standards covering zero-trust API security, continuous threat monitoring, real-time fraud alert isolation, and incident reporting windows.",
    documentUrl: "/docs/Cybersecurity_Framework_2026.pdf",
    totalPages: 96,
    activeObligations: 28,
    impactedControls: 31,
    riskLevel: "High"
  }
];

const changes = [
  {
    id: "CHG-001",
    regulationId: "REG-CDD-03",
    section: "§4.2",
    title: "Customer Verification Retention Extended",
    oldText: "Evidence retention duration = 12 months from customer profile creation.",
    newText: "Evidence retention duration = 18 months from customer profile creation or modification.",
    changeType: "Modified Threshold",
    confidence: 0.98,
    impactSummary: "Requires expanding digital evidence storage capacity and updating CDD-11 purge scripts.",
    affectedControlsCount: 5,
    affectedEvidenceCount: 7,
    affectedObligationsCount: 4,
    riskLevel: "HIGH"
  },
  {
    id: "CHG-002",
    regulationId: "REG-CDD-03",
    section: "§6.1",
    title: "High-Risk Customer Review Frequency",
    oldText: "Perform annual verification review for high-risk customer segments.",
    newText: "Perform quarterly verification review (every 90 days) for high-risk customer segments.",
    changeType: "Increased Frequency",
    confidence: 0.96,
    impactSummary: "Quadruples review frequency for 14,200 high-risk accounts. Requires CDD-07 automated queue.",
    affectedControlsCount: 3,
    affectedEvidenceCount: 12,
    affectedObligationsCount: 3,
    riskLevel: "HIGH"
  },
  {
    id: "CHG-003",
    regulationId: "REG-CDD-03",
    section: "§8.4",
    title: "Mandated Customer Verification Exception Register",
    oldText: "Exceptions reviewed during annual compliance audit.",
    newText: "Maintain automated, immutable Exception Log for all onboarding verification overrides.",
    changeType: "New Requirement",
    confidence: 0.99,
    impactSummary: "New compliance obligation OBL-043 created. Requires mapping to OPS-12 and onboarding systems.",
    affectedControlsCount: 2,
    affectedEvidenceCount: 4,
    affectedObligationsCount: 1,
    riskLevel: "MEDIUM"
  }
];

const obligations = [
  {
    id: "OBL-041",
    regulationId: "REG-CDD-03",
    requirement: "Retain customer verification evidence, biometric tokens, and video CIP logs for a minimum of 18 months.",
    applicability: "Retail Banking, Wealth Management, Digital Onboarding",
    jurisdiction: "India",
    product: "Savings Accounts, Credit Cards, Personal Loans",
    effectiveDate: "2026-10-01",
    deadline: "2026-09-30",
    source: "CDD Update v3 — Section 4.2",
    confidence: 0.98,
    status: "Partially Mapped",
    mappedControls: ["CDD-11", "CDD-07"],
    explanation: "This obligation mandates a 50% extension in historical audit trail availability. All system backup jobs, retention rules, and data storage policies must hold customer identity validation files for 18 full calendar months."
  },
  {
    id: "OBL-042",
    regulationId: "REG-CDD-03",
    requirement: "Perform quarterly customer verification reviews for all accounts categorized as high-risk.",
    applicability: "High-Net-Worth, PEP Accounts, Corporate Banking",
    jurisdiction: "India",
    product: "Current Accounts, Trade Finance",
    effectiveDate: "2026-10-01",
    deadline: "2026-09-30",
    source: "CDD Update v3 — Section 6.1",
    confidence: 0.96,
    status: "Mapped with Gap",
    mappedControls: ["CDD-07", "OPS-12"],
    explanation: "Shifts the audit re-certification cycle from 365 days to 90 days for high-risk entities. Missing a single quarterly window puts the bank in non-compliance."
  },
  {
    id: "OBL-043",
    regulationId: "REG-CDD-03",
    requirement: "Maintain an automated, audit-logged exception register for identity overrides and deferred KYC documents.",
    applicability: "All Business Units",
    jurisdiction: "India",
    product: "All Financial Products",
    effectiveDate: "2026-10-01",
    deadline: "2026-08-31",
    source: "CDD Update v3 — Section 8.4",
    confidence: 0.99,
    status: "Unmapped Control Gap",
    mappedControls: ["OPS-12"],
    explanation: "Requires a centralized immutable audit log recording every instance where standard KYC rules were bypassed or temporarily waived."
  },
  {
    id: "OBL-108",
    regulationId: "REG-AML-02",
    requirement: "Execute real-time screening of wire transfers against OFAC, UN, and local sanctions lists prior to settlement.",
    applicability: "Cross-Border Transactions, Forex",
    jurisdiction: "Global / India",
    product: "Wire Transfers, Remittances",
    effectiveDate: "2025-06-01",
    deadline: "2025-05-31",
    source: "AML Master Direction 2025 — Section 12.1",
    confidence: 0.99,
    status: "Fully Mapped",
    mappedControls: ["AML-04"],
    explanation: "Continuous microsecond transaction screening before authorization."
  }
];

const controls = [
  {
    id: "CDD-07",
    name: "Customer Verification & Identity Validation",
    owner: "Compliance Operations",
    businessUnit: "Retail Banking Services",
    frequency: "Continuous / Triggered",
    effectiveness: "Effective (88%)",
    lastTested: "2026-02-10",
    evidenceCoverage: "82%",
    status: "Attention Required",
    relatedObligations: ["OBL-041", "OBL-042"],
    description: "Automated workflow that validates customer government ID against national database and verifies biometric match."
  },
  {
    id: "CDD-11",
    name: "Customer Evidence & Document Retention Policy",
    owner: "Data Governance & Storage Team",
    businessUnit: "Enterprise IT & Security",
    frequency: "Daily Batch Audit",
    effectiveness: "Partially Effective (71%)",
    lastTested: "2026-02-01",
    evidenceCoverage: "93%",
    status: "Non-Compliant (Retention Shortfall)",
    relatedObligations: ["OBL-041"],
    description: "Data retention engine enforcing automated archival and purge rules across all document repositories."
  },
  {
    id: "AML-04",
    name: "Automated Transaction Monitoring & Sanctions Filter",
    owner: "Financial Crime Unit",
    businessUnit: "Risk & Compliance",
    frequency: "Real-Time / Sub-Second",
    effectiveness: "Highly Effective (98%)",
    lastTested: "2026-02-14",
    evidenceCoverage: "100%",
    status: "Compliant",
    relatedObligations: ["OBL-108"],
    description: "Core anti-money laundering screening engine monitoring cash flows and foreign transactions."
  },
  {
    id: "OPS-12",
    name: "Periodic Policy Review & Audit Exception Register",
    owner: "Internal Audit & Policy Ops",
    businessUnit: "Corporate Governance",
    frequency: "Quarterly",
    effectiveness: "Needs Improvement (65%)",
    lastTested: "2026-01-15",
    evidenceCoverage: "60%",
    status: "High Risk Gap",
    relatedObligations: ["OBL-042", "OBL-043"],
    description: "Governance control overseeing policy update cadence and manager exception sign-offs."
  }
];

const evidenceRecords = [
  {
    id: "EVI-801",
    controlId: "CDD-11",
    requirement: "18-month evidence retention duration (§4.2)",
    expectedCount: 100,
    foundCount: 93,
    missingCount: 7,
    status: "PARTIAL_DEFICIENCY",
    lastAudit: "2026-02-15 10:44:12",
    sourceDocument: "S3_KYC_Archive_Bucket_02",
    findings: "7 customer evidence files created 14–17 months ago were purged under legacy 12-month policy rules before the 18-month extension rule was configured in storage lifecycle triggers."
  },
  {
    id: "EVI-802",
    controlId: "CDD-07",
    requirement: "Quarterly high-risk customer review log (§6.1)",
    expectedCount: 14200,
    foundCount: 3550,
    missingCount: 10650,
    status: "CRITICAL_MISSING",
    lastAudit: "2026-02-15 10:44:15",
    sourceDocument: "Core_Banking_Audit_Trail_Q2",
    findings: "System currently executes high-risk customer reviews on an annual basis. Q2 intermediate review logs are absent for 10,650 accounts."
  },
  {
    id: "EVI-803",
    controlId: "OPS-12",
    requirement: "Automated verification exception register (§8.4)",
    expectedCount: 120,
    foundCount: 0,
    missingCount: 120,
    status: "ABSENT",
    lastAudit: "2026-02-15 10:44:18",
    sourceDocument: "Exception_Register_DB",
    findings: "No central database table or structured exception logging workflow currently exists for onboarding KYC waivers."
  }
];

const gaps = [
  {
    id: "GAP-1042",
    title: "Quarterly Customer Verification Evidence Missing",
    requirement: "Perform quarterly customer verification review for high-risk accounts (§6.1)",
    controlId: "CDD-07",
    evidenceId: "EVI-802",
    riskScore: 87,
    riskLevel: "HIGH",
    status: "OPEN",
    owner: "Compliance Operations",
    dueDate: "2026-09-30",
    affectedAccounts: 14200,
    description: "CDD-07 control is executing annual re-verification instead of newly mandated quarterly review. Missing Q2 audit trails for 10,650 high-risk accounts.",
    recommendation: "Deploy automated quarterly scheduler in core banking CRM and run catch-up verification cycle for high-risk cohorts."
  },
  {
    id: "GAP-1037",
    title: "Document Purge Trigger Violates 18-Month Retention Rule",
    requirement: "Retain customer verification evidence for 18 months (§4.2)",
    controlId: "CDD-11",
    evidenceId: "EVI-801",
    riskScore: 78,
    riskLevel: "HIGH",
    status: "OPEN",
    owner: "IT Infrastructure & Security",
    dueDate: "2026-08-15",
    affectedAccounts: 7,
    description: "S3 automated lifecycle policies were purging verification artifacts after 365 days. 7 records purged prematurely.",
    recommendation: "Immediately update S3 bucket retention rule `lifecycle-kyc-keep` to 548 days (18 months) and restore backup snapshots."
  },
  {
    id: "GAP-1050",
    title: "Automated Onboarding Exception Register Unimplemented",
    requirement: "Maintain automated Exception Log for identity overrides (§8.4)",
    controlId: "OPS-12",
    evidenceId: "EVI-803",
    riskScore: 62,
    riskLevel: "MEDIUM",
    status: "IN_REVIEW",
    owner: "Policy & Governance Ops",
    dueDate: "2026-08-31",
    affectedAccounts: 120,
    description: "Manual email overrides currently used for temporary KYC waivers. Lacks central audit tracking.",
    recommendation: "Build a microservice logging endpoint into the digital onboarding portal to capture sign-off metadata."
  },
  {
    id: "GAP-1012",
    title: "Forex Wire Screening SLA Threshold Variance",
    requirement: "Sub-second cross-border transaction screening (§12.1)",
    controlId: "AML-04",
    evidenceId: "EVI-701",
    riskScore: 45,
    riskLevel: "LOW",
    status: "RESOLVED",
    owner: "Financial Crime Unit",
    dueDate: "2026-05-01",
    affectedAccounts: 0,
    description: "Latency spike caused 12 wire transfers to delay screening by 2.4 seconds during peak volume.",
    recommendation: "Scaled container instances for AML filtering engine."
  }
];

const remediationTasks = [
  {
    id: "REM-201",
    gapId: "GAP-1042",
    title: "Reconfigure Core Banking CRM High-Risk Re-Verification Schedule",
    problem: "Q2 customer verification evidence unavailable due to legacy annual schedule.",
    rootCause: "Core system job `job_annual_kyc_review` scheduled for 365-day interval.",
    actionPlan: "1. Update cron configuration to 90 days. 2. Trigger automated SMS/email reminders to account managers. 3. Validate evidence upload to CDD-07.",
    owner: "Compliance Operations",
    priority: "HIGH",
    status: "PENDING_APPROVAL",
    deadline: "2026-08-30",
    requiredEvidence: "Cron schedule dump, sample Q2 verification audit report for 500 accounts.",
    verificationMethod: "Automated API check against EVI-802 evidence store."
  },
  {
    id: "REM-202",
    gapId: "GAP-1037",
    title: "Update S3 Storage Retention Policy to 548 Days (18 Months)",
    problem: "7 evidence files purged under 12-month rule.",
    rootCause: "Cloud storage lifecycle script set to 365-day object expiry.",
    actionPlan: "1. Modify Terraform/S3 bucket lifecycle configuration `RetentionInDays = 548`. 2. Restore missing 7 objects from cold Glacier backup.",
    owner: "IT Infrastructure Team",
    priority: "HIGH",
    status: "IN_PROGRESS",
    deadline: "2026-08-15",
    requiredEvidence: "AWS S3 Lifecycle policy JSON, restore confirmation log.",
    verificationMethod: "Checksum verification on restored KYC files."
  },
  {
    id: "REM-203",
    gapId: "GAP-1050",
    title: "Deploy Digital Exception Register Microservice",
    problem: "No centralized log for onboarding identity overrides.",
    rootCause: "Legacy manual email sign-off process.",
    actionPlan: "1. Implement REST endpoint `/api/onboarding/exceptions/log`. 2. Wire onboarding portal UI to require supervisor sign-off reason.",
    owner: "Digital Banking Engineering",
    priority: "MEDIUM",
    status: "PLANNED",
    deadline: "2026-08-31",
    requiredEvidence: "Swagger API spec, sample exception log entries.",
    verificationMethod: "Penetration test and audit trail inspection."
  }
];

const agentRunHistory = [
  {
    id: "RUN-9001",
    timestamp: "2026-02-15T10:42:01.000Z",
    agent: "Regulatory Intelligence Agent",
    action: "Document Ingestion & Parsing",
    input: "Customer Due Diligence Update v3.pdf (48 pages)",
    output: "Document parsed successfully. Identified 3 regulatory changes across §4.2, §6.1, §8.4.",
    status: "COMPLETED",
    confidence: 0.99
  },
  {
    id: "RUN-9002",
    timestamp: "2026-02-15T10:42:12.000Z",
    agent: "Regulatory Intelligence Agent",
    action: "Change Detection Analysis",
    input: "v2.0 vs v3.0 text diff",
    output: "3 changes categorized: §4.2 retention extended (12m -> 18m), §6.1 review cycle increased (annual -> quarterly), §8.4 exception log mandated.",
    status: "COMPLETED",
    confidence: 0.97
  },
  {
    id: "RUN-9003",
    timestamp: "2026-02-15T10:42:20.000Z",
    agent: "Obligation Extraction Agent",
    action: "Clause Parsing & Extraction",
    input: "CDD Update v3 text chunks",
    output: "Extracted 8 obligations. High importance: OBL-041 (18m retention), OBL-042 (quarterly review), OBL-043 (exception log).",
    status: "COMPLETED",
    confidence: 0.98
  },
  {
    id: "RUN-9004",
    timestamp: "2026-02-15T10:42:28.000Z",
    agent: "Control Mapping Agent",
    action: "Semantic Matrix Mapping",
    input: "OBL-041, OBL-042, OBL-043",
    output: "Mapped to 5 internal controls: CDD-07, CDD-11, OPS-12, AML-04, IT-SEC-01. Identified 1 unmapped requirement gap.",
    status: "COMPLETED",
    confidence: 0.95
  },
  {
    id: "RUN-9005",
    timestamp: "2026-02-15T10:42:36.000Z",
    agent: "Evidence Assessment Agent",
    action: "Audit Trail Verification",
    input: "CDD-11, CDD-07, OPS-12 evidence stores",
    output: "Detected 7 missing records in CDD-11 (retention shortfall) and 10,650 missing Q2 review logs in CDD-07.",
    status: "COMPLETED",
    confidence: 0.96
  },
  {
    id: "RUN-9006",
    timestamp: "2026-02-15T10:42:44.000Z",
    agent: "Risk Prioritization Agent",
    action: "Deterministic Weighted Scoring",
    input: "Gaps GAP-1042, GAP-1037, GAP-1050",
    output: "Scored GAP-1042 at 87/100 (HIGH) and GAP-1037 at 78/100 (HIGH). Generated explainability factors.",
    status: "COMPLETED",
    confidence: 0.99
  },
  {
    id: "RUN-9007",
    timestamp: "2026-02-15T10:42:52.000Z",
    agent: "Remediation Agent",
    action: "Action Plan Generation",
    input: "GAP-1042, GAP-1037",
    output: "Generated remediation plans REM-201 and REM-202 with root causes, deadlines, and assigned owners.",
    status: "COMPLETED",
    confidence: 0.94
  }
];

module.exports = {
  regulations,
  changes,
  obligations,
  controls,
  evidenceRecords,
  gaps,
  remediationTasks,
  agentRunHistory
};
