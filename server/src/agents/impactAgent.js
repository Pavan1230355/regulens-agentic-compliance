/**
 * REGULENS - Impact Analysis Agent
 * Simulates regulatory parameter changes (e.g. retention 18m -> 24m) and calculates downstream effects.
 */

const { regulations, obligations, controls, evidenceRecords, gaps } = require('../data/seedData');

class ImpactAgent {
  static simulateRequirementChange(paramType, oldValue, newValue) {
    let affectedObligations = [];
    let affectedControls = [];
    let affectedEvidence = [];
    let affectedBusinessUnits = ["Retail Banking", "Wealth Management", "Compliance Operations", "IT Storage & Infra"];
    let potentialNewGaps = [];
    let recommendedActions = [];

    if (paramType === "retention") {
      const newMonths = parseInt(newValue, 10) || 24;
      const monthsDelta = newMonths - 18;

      affectedObligations = obligations.filter(o => o.requirement.includes("18 months") || o.id === "OBL-041");
      affectedControls = controls.filter(c => c.id === "CDD-11" || c.id === "CDD-07" || c.id === "OPS-12");
      affectedEvidence = evidenceRecords.filter(e => e.controlId === "CDD-11" || e.controlId === "CDD-07");

      const estimatedDeficientRecords = 7 + (monthsDelta * 18); // Simulation math

      potentialNewGaps.push({
        gapId: "GAP-SIM-2026",
        title: `Retention Shortfall Under ${newMonths}-Month Policy`,
        severity: "HIGH",
        estimatedMissingRecords: estimatedDeficientRecords,
        description: `Increasing retention from ${oldValue} to ${newMonths} months invalidates ${estimatedDeficientRecords} archived customer files purged under previous rules.`
      });

      recommendedActions = [
        {
          step: 1,
          action: `Update S3 storage lifecycle trigger 'RetentionInDays' to ${newMonths * 30.5} days`,
          owner: "IT Infrastructure",
          priority: "URGENT"
        },
        {
          step: 2,
          action: `Initiate cold storage (Glacier) recovery sweep for archives created ${newMonths} months ago`,
          owner: "Data Engineering",
          priority: "HIGH"
        },
        {
          step: 3,
          action: `Update Control CDD-11 test scripts to audit ${newMonths}-month retention windows`,
          owner: "Internal Audit",
          priority: "MEDIUM"
        }
      ];
    } else if (paramType === "review_frequency") {
      affectedObligations = obligations.filter(o => o.id === "OBL-042");
      affectedControls = controls.filter(c => c.id === "CDD-07");
      affectedEvidence = evidenceRecords.filter(e => e.controlId === "CDD-07");

      potentialNewGaps.push({
        gapId: "GAP-SIM-2027",
        title: `Verification Workload Increase (${newValue})`,
        severity: "HIGH",
        estimatedMissingRecords: 14200,
        description: `Transitioning high-risk reviews to ${newValue} requires 4x processing throughput for 14,200 accounts.`
      });

      recommendedActions = [
        {
          step: 1,
          action: "Deploy automated AI customer verification queuing",
          owner: "Compliance Tech",
          priority: "HIGH"
        }
      ];
    }

    return {
      simulationId: `SIM-${Date.now()}`,
      parameter: paramType,
      oldValue: `${oldValue}`,
      newValue: `${newValue}`,
      timestamp: new Date().toISOString(),
      summary: {
        affectedObligationsCount: affectedObligations.length,
        affectedControlsCount: affectedControls.length,
        affectedEvidenceSetsCount: affectedEvidence.length,
        affectedBusinessUnitsCount: affectedBusinessUnits.length,
        potentialNewGapsCount: potentialNewGaps.length,
        recommendedActionsCount: recommendedActions.length
      },
      dependencyChain: {
        regulation: "Customer Due Diligence Update v3",
        obligations: affectedObligations.map(o => ({ id: o.id, text: o.requirement })),
        controls: affectedControls.map(c => ({ id: c.id, name: c.name, status: c.status })),
        evidence: affectedEvidence.map(e => ({ id: e.id, status: e.status, findings: e.findings })),
        newGaps: potentialNewGaps,
        remediation: recommendedActions
      }
    };
  }
}

module.exports = ImpactAgent;
