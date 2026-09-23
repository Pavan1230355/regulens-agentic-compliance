/**
 * REGULENS - Main Express API Server
 */

const express = require('express');
const cors = require('cors');
const multer = require('multer');
const dotenv = require('dotenv');

dotenv.config();

const {
  regulations,
  changes,
  obligations,
  controls,
  evidenceRecords,
  gaps,
  remediationTasks,
  agentRunHistory
} = require('./src/data/seedData');

const SecurityAgent = require('./src/agents/securityAgent');
const RegulatoryIntelligenceAgent = require('./src/agents/regulatoryIntelligenceAgent');
const ObligationAgent = require('./src/agents/obligationAgent');
const ControlMappingAgent = require('./src/agents/controlMappingAgent');
const EvidenceAgent = require('./src/agents/evidenceAgent');
const RiskAgent = require('./src/agents/riskAgent');
const RemediationAgent = require('./src/agents/remediationAgent');
const ImpactAgent = require('./src/agents/impactAgent');
const WorkflowOrchestrator = require('./src/agents/orchestrator');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const upload = multer({ dest: 'uploads/' });

// API Endpoints

// 1. Dashboard API
app.get('/api/dashboard', (req, res) => {
  res.json({
    kpis: {
      activeRegulations: regulations.length,
      regulatoryObligations: 187,
      mappedControls: 143,
      openComplianceGaps: gaps.filter(g => g.status === 'OPEN').length + 10,
      highRiskGaps: gaps.filter(g => g.riskLevel === 'HIGH').length + 2,
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
    priorityFindings: gaps,
    recentActivity: agentRunHistory
  });
});

// 2. Regulations API
app.get('/api/regulations', (req, res) => {
  res.json(regulations);
});

app.get('/api/regulations/:id', (req, res) => {
  const reg = regulations.find(r => r.id === req.params.id) || regulations[0];
  res.json(reg);
});

app.get('/api/regulations/:id/changes', (req, res) => {
  const diff = RegulatoryIntelligenceAgent.getVersionDiff(req.params.id);
  res.json(diff);
});

app.post('/api/regulations/upload', upload.single('file'), (req, res) => {
  const fileName = req.file ? req.file.originalname : "Uploaded_Regulation.pdf";
  const sec = SecurityAgent.analyzeInput(fileName);
  if (!sec.safe) {
    return res.status(400).json(sec);
  }
  res.json({
    message: "Document uploaded and parsed successfully.",
    fileName,
    status: "PROCESSING_READY",
    fileId: `DOC-${Date.now()}`
  });
});

app.post('/api/regulations/:id/analyze', (req, res) => {
  const pipelineResult = WorkflowOrchestrator.runCompletePipeline("Customer Due Diligence Update v3.pdf");
  res.json(pipelineResult);
});

// 3. Obligations API
app.get('/api/obligations', (req, res) => {
  res.json(obligations);
});

app.get('/api/obligations/:id/explain', (req, res) => {
  const exp = ObligationAgent.explainObligation(req.params.id);
  res.json(exp);
});

// 4. Controls API
app.get('/api/controls', (req, res) => {
  res.json(controls);
});

// 5. Evidence API
app.get('/api/evidence', (req, res) => {
  res.json(evidenceRecords);
});

// 6. Gaps & Risk API
app.get('/api/gaps', (req, res) => {
  const enrichedGaps = gaps.map(g => {
    const ctrl = controls.find(c => c.id === g.controlId);
    const ev = evidenceRecords.find(e => e.id === g.evidenceId);
    return { ...g, riskAnalysis: RiskAgent.calculateRisk(g, ctrl, ev) };
  });
  res.json(enrichedGaps);
});

app.get('/api/gaps/:id', (req, res) => {
  const gap = gaps.find(g => g.id === req.params.id) || gaps[0];
  const ctrl = controls.find(c => c.id === gap.controlId);
  const ev = evidenceRecords.find(e => e.id === gap.evidenceId);
  const riskAnalysis = RiskAgent.calculateRisk(gap, ctrl, ev);
  res.json({ ...gap, riskAnalysis, control: ctrl, evidence: ev });
});

app.post('/api/gaps/:id/analyze-risk', (req, res) => {
  const gap = gaps.find(g => g.id === req.params.id) || gaps[0];
  const ctrl = controls.find(c => c.id === gap.controlId);
  const ev = evidenceRecords.find(e => e.id === gap.evidenceId);
  res.json(RiskAgent.calculateRisk(gap, ctrl, ev));
});

// 7. Remediation API
app.get('/api/remediation', (req, res) => {
  res.json(remediationTasks);
});

app.post('/api/remediation/:id/approve', (req, res) => {
  const task = RemediationAgent.approveTask(req.params.id);
  res.json({ message: "Remediation plan approved successfully.", task });
});

// 8. What-If Impact Simulator API
app.post('/api/impact/simulate', (req, res) => {
  const { parameter = "retention", oldValue = "18", newValue = "24" } = req.body;
  const result = ImpactAgent.simulateRequirementChange(parameter, oldValue, newValue);
  res.json(result);
});

// 9. Agent Activity & Orchestration
app.get('/api/agents/activity', (req, res) => {
  res.json(agentRunHistory);
});

app.post('/api/agents/orchestrate', (req, res) => {
  const { documentName = "Customer Due Diligence Update v3.pdf" } = req.body;
  const pipelineResult = WorkflowOrchestrator.runCompletePipeline(documentName);
  res.json(pipelineResult);
});

// 10. Audit Logs
app.get('/api/audit', (req, res) => {
  res.json({
    totalAudits: agentRunHistory.length,
    systemStatus: "HEALTHY",
    lastAgentExecution: agentRunHistory[agentRunHistory.length - 1],
    securityIncidents: 0,
    complianceVersion: "ReguLens-v1.0.0-Demo"
  });
});

app.listen(PORT, () => {
  console.log(`[REGULENS] Backend API Server running on port ${PORT}`);
});
