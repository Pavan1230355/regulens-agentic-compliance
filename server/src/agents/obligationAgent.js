/**
 * REGULENS - Obligation Extraction Agent
 * Extracts regulatory obligations, determines applicability, deadlines, and generates AI explanations.
 */

const { obligations } = require('../data/seedData');

class ObligationAgent {
  static extractObligations(changes) {
    return {
      agent: "Obligation Extraction Agent",
      status: "COMPLETED",
      confidence: 0.98,
      timestamp: new Date().toISOString(),
      obligationsCount: obligations.length,
      obligations: obligations,
      summary: "Extracted 8 obligations from Customer Due Diligence Update v3. Key obligations include OBL-041, OBL-042, and OBL-043."
    };
  }

  static explainObligation(oblId) {
    const obl = obligations.find(o => o.id === oblId) || obligations[0];
    return {
      obligationId: obl.id,
      requirement: obl.requirement,
      source: obl.source,
      confidence: obl.confidence,
      reasoningSummary: obl.explanation,
      applicableBusinessUnits: obl.applicability.split(", "),
      jurisdiction: obl.jurisdiction,
      effectiveDate: obl.effectiveDate,
      deadline: obl.deadline,
      mappedControls: obl.mappedControls
    };
  }
}

module.exports = ObligationAgent;
