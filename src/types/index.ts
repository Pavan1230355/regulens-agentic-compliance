export type NavigationTab =
  | 'overview'
  | 'regulations'
  | 'changes'
  | 'obligations'
  | 'controls'
  | 'evidence'
  | 'gaps'
  | 'risk'
  | 'remediation'
  | 'simulator'
  | 'agents'
  | 'reports';

export interface RegulationVersion {
  version: string;
  date: string;
  summary: string;
  changesCount: number;
}

export interface RegulationSection {
  sectionId: string;
  title: string;
  content: string;
}

export interface Regulation {
  id: string;
  title: string;
  code: string;
  version: string;
  status: 'Active' | 'Pending Review' | 'Archived';
  jurisdiction: string;
  category: string;
  effectiveDate: string;
  lastUpdated: string;
  description: string;
  documentUrl?: string;
  totalPages: number;
  activeObligations: number;
  impactedControls: number;
  riskLevel: 'Critical' | 'High' | 'Medium' | 'Low';
  versions?: RegulationVersion[];
  sections?: RegulationSection[];
}

export interface RegulationChange {
  id: string;
  regulationId: string;
  section: string;
  title: string;
  oldText: string;
  newText: string;
  changeType: string;
  confidence: number;
  impactSummary: string;
  affectedControlsCount: number;
  affectedEvidenceCount: number;
  affectedObligationsCount: number;
  riskLevel: 'HIGH' | 'MEDIUM' | 'LOW';
}

export interface Obligation {
  id: string;
  regulationId: string;
  requirement: string;
  applicability: string;
  jurisdiction: string;
  product: string;
  effectiveDate: string;
  deadline: string;
  source: string;
  confidence: number;
  status: string;
  mappedControls: string[];
  explanation: string;
}

export interface Control {
  id: string;
  name: string;
  owner: string;
  businessUnit: string;
  frequency: string;
  effectiveness: string;
  lastTested: string;
  evidenceCoverage: string;
  status: string;
  relatedObligations: string[];
  description: string;
}

export interface EvidenceRecord {
  id: string;
  controlId: string;
  requirement: string;
  expectedCount: number;
  foundCount: number;
  missingCount: number;
  status: 'CRITICAL_MISSING' | 'PARTIAL_DEFICIENCY' | 'ABSENT' | 'COMPLIANT';
  lastAudit: string;
  sourceDocument: string;
  findings: string;
}

export interface ExplainabilityFactor {
  factor: string;
  impact: string;
  type: 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW';
}

export interface RiskAnalysis {
  gapId: string;
  riskScore: number; // 0 - 100
  riskLevel: 'HIGH' | 'MEDIUM' | 'LOW';
  breakdown: {
    severityScore: number;
    evidenceDeficiencyScore: number;
    controlWeaknessScore: number;
    deadlineProximityScore: number;
    customerImpactScore: number;
    populationScore: number;
  };
  explainabilityFactors: ExplainabilityFactor[];
  confidence: number;
  timestamp: string;
}

export interface ComplianceGap {
  id: string;
  title: string;
  requirement: string;
  controlId: string;
  evidenceId: string;
  riskScore: number;
  riskLevel: 'HIGH' | 'MEDIUM' | 'LOW';
  status: 'OPEN' | 'IN_REVIEW' | 'RESOLVED';
  owner: string;
  dueDate: string;
  affectedAccounts: number;
  description: string;
  recommendation: string;
  riskAnalysis?: RiskAnalysis;
}

export interface RemediationTask {
  id: string;
  gapId: string;
  title: string;
  problem: string;
  rootCause: string;
  actionPlan: string;
  owner: string;
  priority: 'HIGH' | 'MEDIUM' | 'LOW';
  status: 'PENDING_APPROVAL' | 'APPROVED' | 'IN_PROGRESS' | 'PLANNED' | 'COMPLETED';
  deadline: string;
  requiredEvidence: string;
  verificationMethod: string;
  approvedAt?: string;
  approvedBy?: string;
}

export interface AgentRun {
  id: string;
  timestamp: string;
  agent: string;
  action: string;
  input: string;
  output: string;
  status: 'COMPLETED' | 'RUNNING' | 'PENDING' | 'FAILED';
  confidence: number;
}

export interface AgentTraceStep {
  step: number;
  agent: string;
  action: string;
  status: string;
  output: string;
  details?: any;
  confidence: number;
  timestamp: string;
}

export interface ImpactSimulationResult {
  simulationId: string;
  parameter: string;
  oldValue: string;
  newValue: string;
  timestamp: string;
  summary: {
    affectedObligationsCount: number;
    affectedControlsCount: number;
    affectedEvidenceSetsCount: number;
    affectedBusinessUnitsCount: number;
    potentialNewGapsCount: number;
    recommendedActionsCount: number;
  };
  dependencyChain: {
    regulation: string;
    obligations: { id: string; text: string }[];
    controls: { id: string; name: string; status: string }[];
    evidence: { id: string; status: string; findings: string }[];
    newGaps: { gapId: string; title: string; severity: string; estimatedMissingRecords: number; description: string }[];
    remediation: { step: number; action: string; owner: string; priority: string }[];
  };
}

export interface DashboardData {
  kpis: {
    activeRegulations: number;
    regulatoryObligations: number;
    mappedControls: number;
    openComplianceGaps: number;
    highRiskGaps: number;
    evidenceCoverage: string;
    criticalChanges: number;
  };
  riskDistribution: { level: string; count: number; color: string }[];
  agenticWorkflowStatus: { name: string; status: string }[];
  priorityFindings: ComplianceGap[];
  recentActivity: AgentRun[];
}
