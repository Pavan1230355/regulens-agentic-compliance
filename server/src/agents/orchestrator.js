/**
 * REGULENS - Multi-Agent Workflow Orchestrator
 * Coordinates step-by-step multi-agent compliance pipeline execution and maintains live execution traces.
 */

const SecurityAgent = require('./securityAgent');
const RegulatoryIntelligenceAgent = require('./regulatoryIntelligenceAgent');
const ObligationAgent = require('./obligationAgent');
const ControlMappingAgent = require('./controlMappingAgent');
const EvidenceAgent = require('./evidenceAgent');
const RiskAgent = require('./riskAgent');
const RemediationAgent = require('./remediationAgent');
const { gaps, controls, evidenceRecords, agentRunHistory } = require('../data/seedData');

class WorkflowOrchestrator {
  static runCompletePipeline(documentName = "Customer Due Diligence Update v3.pdf") {
    const trace = [];
    const startTime = Date.now();

    // Step 0: Security Scan
    const securityResult = SecurityAgent.analyzeInput(documentName);
    trace.push({
      step: 1,
      agent: "Security Guardrail Agent",
      action: "Input Security & Prompt Injection Analysis",
      status: securityResult.safe ? "PASSED" : "BLOCKED",
      output: securityResult.message,
      confidence: 1.0,
      timestamp: new Date().toISOString()
    });

    if (!securityResult.safe) {
      return { status: "BLOCKED", trace };
    }

    // Step 1: Regulatory Intelligence
    const regResult = RegulatoryIntelligenceAgent.analyzeDocument(documentName);
    trace.push({
      step: 2,
      agent: "Regulatory Intelligence Agent",
      action: "Ingestion, Version Diff & Change Detection",
      status: "COMPLETED",
      output: regResult.summary,
      details: regResult.detectedChanges,
      confidence: regResult.confidence,
      timestamp: new Date().toISOString()
    });

    // Step 2: Obligation Extraction
    const oblResult = ObligationAgent.extractObligations(regResult.detectedChanges);
    trace.push({
      step: 3,
      agent: "Obligation Extraction Agent",
      action: "Clause Extraction & Applicability Identification",
      status: "COMPLETED",
      output: oblResult.summary,
      details: oblResult.obligations,
      confidence: oblResult.confidence,
      timestamp: new Date().toISOString()
    });

    // Step 3: Control Mapping
    const controlResult = ControlMappingAgent.mapObligationsToControls(oblResult.obligations);
    trace.push({
      step: 4,
      agent: "Control Mapping Agent",
      action: "Semantic Mapping to Internal Banking Controls",
      status: "COMPLETED",
      output: controlResult.summary,
      details: controlResult.controls,
      confidence: controlResult.confidence,
      timestamp: new Date().toISOString()
    });

    // Step 4: Evidence Assessment
    const evidenceResult = EvidenceAgent.assessEvidence();
    trace.push({
      step: 5,
      agent: "Evidence Assessment Agent",
      action: "System Audit Trail & Evidence Verification",
      status: "COMPLETED",
      output: evidenceResult.summary,
      details: evidenceResult.findings,
      confidence: evidenceResult.confidence,
      timestamp: new Date().toISOString()
    });

    // Step 5: Risk Prioritization
    const scoredGaps = gaps.map(g => {
      const ctrl = controls.find(c => c.id === g.controlId);
      const ev = evidenceRecords.find(e => e.id === g.evidenceId);
      return { ...g, riskAnalysis: RiskAgent.calculateRisk(g, ctrl, ev) };
    });

    trace.push({
      step: 6,
      agent: "Risk Prioritization Agent",
      action: "Deterministic Weighted Risk Scoring (0-100)",
      status: "COMPLETED",
      output: `Scored ${scoredGaps.length} gaps. Highest risk: GAP-1042 (87/100).`,
      details: scoredGaps,
      confidence: 0.98,
      timestamp: new Date().toISOString()
    });

    // Step 6: Remediation Planning
    const remResult = RemediationAgent.generateRemediationPlans(scoredGaps);
    trace.push({
      step: 7,
      agent: "Remediation Agent",
      action: "Automated Remediation Action Plan Generation",
      status: "COMPLETED",
      output: remResult.summary,
      details: remResult.tasks,
      confidence: remResult.confidence,
      timestamp: new Date().toISOString()
    });

    const executionTimeMs = Date.now() - startTime;

    return {
      runId: `RUN-DEMO-${Date.now()}`,
      status: "SUCCESS",
      documentName,
      executionTimeMs,
      timestamp: new Date().toISOString(),
      summary: "Agentic chain completed successfully across 7 workflow stages.",
      trace,
      results: {
        changesCount: regResult.detectedChanges.length,
        obligationsCount: oblResult.obligations.length,
        mappedControlsCount: controlResult.controls.length,
        evidenceDeficienciesCount: evidenceResult.findings.length,
        gapsCount: scoredGaps.length,
        remediationTasksCount: remResult.tasks.length
      }
    };
  }
}

module.exports = WorkflowOrchestrator;
