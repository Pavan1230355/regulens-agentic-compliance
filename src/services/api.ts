import {
  DashboardData,
  Regulation,
  RegulationChange,
  Obligation,
  Control,
  EvidenceRecord,
  ComplianceGap,
  RemediationTask,
  AgentRun,
  ImpactSimulationResult
} from '../types';

const API_BASE = '/api';

export const api = {
  async getDashboard(): Promise<DashboardData> {
    try {
      const res = await fetch(`${API_BASE}/dashboard`);
      if (res.ok) return await res.json();
    } catch (e) {
      console.warn('Backend API offline, using local synthetic fallback state.');
    }
    return getFallbackDashboardData();
  },

  async getRegulations(): Promise<Regulation[]> {
    try {
      const res = await fetch(`${API_BASE}/regulations`);
      if (res.ok) return await res.json();
    } catch (e) {}
    return getFallbackRegulations();
  },

  async getRegulationChanges(id: string): Promise<any> {
    try {
      const res = await fetch(`${API_BASE}/regulations/${id}/changes`);
      if (res.ok) return await res.json();
    } catch (e) {}
    return { diffs: getFallbackChanges() };
  },

  async analyzeRegulation(id: string): Promise<any> {
    try {
      const res = await fetch(`${API_BASE}/regulations/${id}/analyze`, { method: 'POST' });
      if (res.ok) return await res.json();
    } catch (e) {}
    return getFallbackPipelineRun();
  },

  async getObligations(): Promise<Obligation[]> {
    try {
      const res = await fetch(`${API_BASE}/obligations`);
      if (res.ok) return await res.json();
    } catch (e) {}
    return getFallbackObligations();
  },

  async explainObligation(id: string): Promise<any> {
    try {
      const res = await fetch(`${API_BASE}/obligations/${id}/explain`);
      if (res.ok) return await res.json();
    } catch (e) {}
    const obl = getFallbackObligations().find(o => o.id === id);
    return {
      obligationId: id,
      requirement: obl?.requirement || "Retain customer verification evidence for 18 months.",
      source: obl?.source || "CDD Update v3 — Section 4.2",
      confidence: 0.98,
      reasoningSummary: obl?.explanation || "Requires 50% extension in audit trail availability across all core storage buckets.",
      applicableBusinessUnits: ["Retail Banking", "Wealth Management", "Digital Onboarding"],
      jurisdiction: "India",
      effectiveDate: "2026-10-01",
      deadline: "2026-09-30",
      mappedControls: ["CDD-11", "CDD-07"]
    };
  },

  async getControls(): Promise<Control[]> {
    try {
      const res = await fetch(`${API_BASE}/controls`);
      if (res.ok) return await res.json();
    } catch (e) {}
    return getFallbackControls();
  },

  async getEvidence(): Promise<EvidenceRecord[]> {
    try {
      const res = await fetch(`${API_BASE}/evidence`);
      if (res.ok) return await res.json();
    } catch (e) {}
    return getFallbackEvidence();
  },

  async getGaps(): Promise<ComplianceGap[]> {
    try {
      const res = await fetch(`${API_BASE}/gaps`);
      if (res.ok) return await res.json();
    } catch (e) {}
    return getFallbackGaps();
  },

  async getRemediationTasks(): Promise<RemediationTask[]> {
    try {
      const res = await fetch(`${API_BASE}/remediation`);
      if (res.ok) return await res.json();
    } catch (e) {}
    return getFallbackRemediation();
  },

  async approveRemediation(id: string): Promise<any> {
    try {
      const res = await fetch(`${API_BASE}/remediation/${id}/approve`, { method: 'POST' });
      if (res.ok) return await res.json();
    } catch (e) {}
    return { message: "Plan approved locally." };
  },

  async simulateImpact(param: string, oldValue: string, newValue: string): Promise<ImpactSimulationResult> {
    try {
      const res = await fetch(`${API_BASE}/impact/simulate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ parameter: param, oldValue, newValue })
      });
      if (res.ok) return await res.json();
    } catch (e) {}
    return getFallbackImpactSimulation(param, oldValue, newValue);
  },

  async getAgentActivity(): Promise<AgentRun[]> {
    try {
      const res = await fetch(`${API_BASE}/agents/activity`);
      if (res.ok) return await res.json();
    } catch (e) {}
    return getFallbackAgentActivity();
  }
};

// Local Fallback Helpers
function getFallbackDashboardData(): DashboardData {
  return {
    kpis: {
      activeRegulations: 24,
      regulatoryObligations: 187,
      mappedControls: 143,
      openComplianceGaps: 12,
      highRiskGaps: 4,
      evidenceCoverage: "91%",
      criticalChanges: 3
    },
    riskDistribution: [
      { level: "Critical", count: 2, color: "#EF4444" },
      { level: "High", count: 4, color: "#F97316" },
      { level: "Medium", count: 5, color: "#F59E0B" },
      { level: "Low", count: 1, color: "#10B981" }
    ],
    agenticWorkflowStatus: [
      { name: "Regulatory Intelligence", status: "COMPLETED" },
      { name: "Obligation Extraction", status: "COMPLETED" },
      { name: "Control Mapping", status: "COMPLETED" },
      { name: "Evidence Assessment", status: "COMPLETED" },
      { name: "Risk Analysis", status: "COMPLETED" },
      { name: "Remediation Planning", status: "COMPLETED" }
    ],
    priorityFindings: getFallbackGaps(),
    recentActivity: getFallbackAgentActivity()
  };
}

function getFallbackRegulations(): Regulation[] {
  return [
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
      description: "Master Direction on Customer Due Diligence, enhanced verification retention to 18m, quarterly high-risk reviews.",
      totalPages: 48,
      activeObligations: 8,
      impactedControls: 5,
      riskLevel: "High"
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
      description: "Sanctions screening thresholds, suspicious activity reporting (STR), beneficial ownership standards.",
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
      description: "Regulatory framework for tech-enabled lending, loan service providers (LSP), APR disclosures.",
      totalPages: 62,
      activeObligations: 19,
      impactedControls: 14,
      riskLevel: "Medium"
    }
  ];
}

function getFallbackChanges(): RegulationChange[] {
  return [
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
      impactSummary: "New compliance obligation OBL-043 created. Requires mapping to OPS-12.",
      affectedControlsCount: 2,
      affectedEvidenceCount: 4,
      affectedObligationsCount: 1,
      riskLevel: "MEDIUM"
    }
  ];
}

function getFallbackObligations(): Obligation[] {
  return [
    {
      id: "OBL-041",
      regulationId: "REG-CDD-03",
      requirement: "Retain customer verification evidence, biometric tokens, and video CIP logs for a minimum of 18 months.",
      applicability: "Retail Banking, Wealth Management",
      jurisdiction: "India",
      product: "Savings Accounts, Credit Cards",
      effectiveDate: "2026-10-01",
      deadline: "2026-09-30",
      source: "CDD Update v3 — Section 4.2",
      confidence: 0.98,
      status: "Partially Mapped",
      mappedControls: ["CDD-11", "CDD-07"],
      explanation: "Mandates 50% extension in audit trail retention. Requires updating CDD-11 storage lifecycle rules."
    },
    {
      id: "OBL-042",
      regulationId: "REG-CDD-03",
      requirement: "Perform quarterly customer verification reviews for all accounts categorized as high-risk.",
      applicability: "High-Net-Worth, Corporate Banking",
      jurisdiction: "India",
      product: "Current Accounts, Trade Finance",
      effectiveDate: "2026-10-01",
      deadline: "2026-09-30",
      source: "CDD Update v3 — Section 6.1",
      confidence: 0.96,
      status: "Mapped with Gap",
      mappedControls: ["CDD-07", "OPS-12"],
      explanation: "Shifts re-verification cycle from 365 days to 90 days for 14,200 high-risk entities."
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
      explanation: "Requires centralized immutable audit log capturing every onboarding exception."
    }
  ];
}

function getFallbackControls(): Control[] {
  return [
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
      description: "Automated workflow validating customer government ID and biometric verification."
    },
    {
      id: "CDD-11",
      name: "Customer Evidence & Document Retention Policy",
      owner: "Data Governance Team",
      businessUnit: "Enterprise IT & Security",
      frequency: "Daily Batch Audit",
      effectiveness: "Partially Effective (71%)",
      lastTested: "2026-02-01",
      evidenceCoverage: "93%",
      status: "Non-Compliant (Retention Shortfall)",
      relatedObligations: ["OBL-041"],
      description: "Data retention engine enforcing automated archival and purge rules across document repositories."
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
      owner: "Internal Audit Team",
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
}

function getFallbackEvidence(): EvidenceRecord[] {
  return [
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
      findings: "7 customer evidence files created 14–17 months ago were purged under legacy 12-month policy rules before the 18-month extension rule was configured."
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
}

function getFallbackGaps(): ComplianceGap[] {
  return [
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
      recommendation: "Deploy automated quarterly scheduler in core banking CRM and run catch-up verification cycle for high-risk cohorts.",
      riskAnalysis: {
        gapId: "GAP-1042",
        riskScore: 87,
        riskLevel: "HIGH",
        breakdown: {
          severityScore: 95,
          evidenceDeficiencyScore: 95,
          controlWeaknessScore: 75,
          deadlineProximityScore: 85,
          customerImpactScore: 90,
          populationScore: 95
        },
        explainabilityFactors: [
          { factor: "Mandatory Regulatory Requirement (§6.1)", impact: "+25 pts", type: "CRITICAL" },
          { factor: "Critical Evidence Deficiency (10,650 missing records)", impact: "+20 pts", type: "HIGH" },
          { factor: "Customer-Facing High-Risk Segment", impact: "+20 pts", type: "HIGH" },
          { factor: "Compliance Deadline Approaching (< 90 Days)", impact: "+15 pts", type: "MEDIUM" }
        ],
        confidence: 0.98,
        timestamp: "2026-02-15T10:45:00.000Z"
      }
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
      recommendation: "Immediately update S3 bucket retention rule lifecycle-kyc-keep to 548 days (18 months) and restore backup snapshots.",
      riskAnalysis: {
        gapId: "GAP-1037",
        riskScore: 78,
        riskLevel: "HIGH",
        breakdown: {
          severityScore: 90,
          evidenceDeficiencyScore: 75,
          controlWeaknessScore: 90,
          deadlineProximityScore: 85,
          customerImpactScore: 60,
          populationScore: 10
        },
        explainabilityFactors: [
          { factor: "Non-Compliant Control Retention Trigger", impact: "+25 pts", type: "CRITICAL" },
          { factor: "Permanent Audit Trail Destruction Risk", impact: "+20 pts", type: "HIGH" },
          { factor: "Targeted Remediation Simple & High Impact", impact: "+15 pts", type: "MEDIUM" }
        ],
        confidence: 0.97,
        timestamp: "2026-02-15T10:45:00.000Z"
      }
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
    }
  ];
}

function getFallbackRemediation(): RemediationTask[] {
  return [
    {
      id: "REM-201",
      gapId: "GAP-1042",
      title: "Reconfigure Core Banking CRM High-Risk Re-Verification Schedule",
      problem: "Q2 customer verification evidence unavailable due to legacy annual schedule.",
      rootCause: "Core system job job_annual_kyc_review scheduled for 365-day interval.",
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
      actionPlan: "1. Modify Terraform/S3 bucket lifecycle configuration RetentionInDays = 548. 2. Restore missing 7 objects from cold Glacier backup.",
      owner: "IT Infrastructure Team",
      priority: "HIGH",
      status: "IN_PROGRESS",
      deadline: "2026-08-15",
      requiredEvidence: "AWS S3 Lifecycle policy JSON, restore confirmation log.",
      verificationMethod: "Checksum verification on restored KYC files."
    }
  ];
}

function getFallbackImpactSimulation(param: string, oldValue: string, newValue: string): ImpactSimulationResult {
  const newNum = parseInt(newValue) || 24;
  return {
    simulationId: `SIM-${Date.now()}`,
    parameter: param,
    oldValue,
    newValue,
    timestamp: new Date().toISOString(),
    summary: {
      affectedObligationsCount: 4,
      affectedControlsCount: 3,
      affectedEvidenceSetsCount: 7,
      affectedBusinessUnitsCount: 4,
      potentialNewGapsCount: 1,
      recommendedActionsCount: 3
    },
    dependencyChain: {
      regulation: "Customer Due Diligence Update v3",
      obligations: [
        { id: "OBL-041", text: `Retain customer verification evidence for minimum of ${newNum} months.` },
        { id: "OBL-042", text: "Perform periodic verification review for high-risk customer accounts." },
        { id: "OBL-045", text: "Maintain digital audit trail for cross-border identity verification tokens." },
        { id: "OBL-048", text: "Provide immutable customer verification record upon regulatory inspection." }
      ],
      controls: [
        { id: "CDD-11", name: "Customer Evidence Retention Policy", status: "Non-Compliant" },
        { id: "CDD-07", name: "Customer Verification Validation Workflow", status: "Attention Required" },
        { id: "OPS-12", name: "Periodic Audit Policy Review", status: "High Risk Gap" }
      ],
      evidence: [
        { id: "EVI-801", status: "PARTIAL_DEFICIENCY", findings: `${7 + (newNum - 18) * 18} records purged prematurely under shorter retention rule.` },
        { id: "EVI-802", status: "CRITICAL_MISSING", findings: "Review schedules require update across 14,200 accounts." },
        { id: "EVI-803", status: "ABSENT", findings: "Exception logs absent for historical overrides." }
      ],
      newGaps: [
        {
          gapId: "GAP-SIM-2026",
          title: `Retention Shortfall Under ${newNum}-Month Policy`,
          severity: "HIGH",
          estimatedMissingRecords: 7 + (newNum - 18) * 18,
          description: `Increasing retention to ${newNum} months invalidates ${7 + (newNum - 18) * 18} archived customer files purged under previous rules.`
        }
      ],
      remediation: [
        { step: 1, action: `Update S3 storage retention rule to ${newNum * 30.5} days`, owner: "IT Infrastructure", priority: "URGENT" },
        { step: 2, action: `Initiate cold Glacier restore for files created ${newNum} months ago`, owner: "Data Engineering", priority: "HIGH" },
        { step: 3, action: "Update CDD-11 audit verification scripts", owner: "Internal Audit", priority: "MEDIUM" }
      ]
    }
  };
}

function getFallbackAgentActivity(): AgentRun[] {
  return [
    {
      id: "RUN-9001",
      timestamp: "10:42:01",
      agent: "Regulatory Intelligence Agent",
      action: "Document Ingestion & Parsing",
      input: "Customer Due Diligence Update v3.pdf (48 pages)",
      output: "Parsed 48 pages. Identified 3 changes (§4.2, §6.1, §8.4).",
      status: "COMPLETED",
      confidence: 0.99
    },
    {
      id: "RUN-9002",
      timestamp: "10:42:12",
      agent: "Obligation Extraction Agent",
      action: "Clause Extraction",
      input: "v2.0 vs v3.0 diff text",
      output: "Extracted 8 obligations including OBL-041, OBL-042, OBL-043.",
      status: "COMPLETED",
      confidence: 0.98
    },
    {
      id: "RUN-9003",
      timestamp: "10:42:20",
      agent: "Control Mapping Agent",
      action: "Semantic Mapping",
      input: "OBL-041, OBL-042, OBL-043",
      output: "Mapped to CDD-07, CDD-11, OPS-12, AML-04.",
      status: "COMPLETED",
      confidence: 0.95
    },
    {
      id: "RUN-9004",
      timestamp: "10:42:28",
      agent: "Evidence Assessment Agent",
      action: "Audit Trail Verification",
      input: "CDD-11 & CDD-07 evidence buckets",
      output: "Identified 7 missing records (retention) and 10,650 Q2 logs missing.",
      status: "COMPLETED",
      confidence: 0.96
    },
    {
      id: "RUN-9005",
      timestamp: "10:42:36",
      agent: "Risk Prioritization Agent",
      action: "Weighted Risk Scoring",
      input: "GAP-1042 & GAP-1037",
      output: "Scored GAP-1042 at 87/100 (HIGH) with explainability breakdown.",
      status: "COMPLETED",
      confidence: 0.99
    },
    {
      id: "RUN-9006",
      timestamp: "10:42:44",
      agent: "Remediation Agent",
      action: "Action Plan Generation",
      input: "GAP-1042, GAP-1037",
      output: "Generated remediation plans REM-201 and REM-202.",
      status: "COMPLETED",
      confidence: 0.94
    }
  ];
}

function getFallbackPipelineRun() {
  return {
    runId: "RUN-DEMO-LIVE",
    status: "SUCCESS",
    summary: "Agentic chain completed successfully across 7 workflow stages.",
    results: {
      changesCount: 3,
      obligationsCount: 8,
      mappedControlsCount: 5,
      evidenceDeficienciesCount: 3,
      gapsCount: 3,
      remediationTasksCount: 2
    }
  };
}
