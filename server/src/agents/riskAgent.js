/**
 * REGULENS - Risk Analysis Agent
 * Computes deterministic weighted compliance risk scores (0-100) and provides explainability factors.
 */

class RiskAgent {
  /**
   * Deterministic Risk Formula:
   * Score = (Severity * 0.25) + (EvidenceDeficiency * 0.20) + (ControlWeakness * 0.20) +
   *         (DeadlineProximity * 0.15) + (CustomerImpact * 0.10) + (AffectedPopulation * 0.10)
   */
  static calculateRisk(gap, control, evidence) {
    let severityScore = 80;
    if (gap.requirement?.includes("mandatory") || gap.requirement?.includes("18 months") || gap.requirement?.includes("quarterly")) {
      severityScore = 95;
    } else if (gap.riskLevel === "MEDIUM") {
      severityScore = 60;
    } else if (gap.riskLevel === "LOW") {
      severityScore = 30;
    }

    let evidenceDeficiencyScore = 50;
    if (evidence) {
      if (evidence.status === "CRITICAL_MISSING" || evidence.status === "ABSENT") {
        evidenceDeficiencyScore = 95;
      } else if (evidence.status === "PARTIAL_DEFICIENCY") {
        evidenceDeficiencyScore = 75;
      }
    }

    let controlWeaknessScore = 70;
    if (control) {
      if (control.status.includes("High Risk") || control.status.includes("Non-Compliant")) {
        controlWeaknessScore = 90;
      } else if (control.status.includes("Attention")) {
        controlWeaknessScore = 75;
      } else if (control.status.includes("Compliant")) {
        controlWeaknessScore = 20;
      }
    }

    let deadlineProximityScore = 85; // Default < 60 days
    if (gap.dueDate) {
      const daysLeft = Math.max(1, Math.floor((new Date(gap.dueDate) - new Date("2026-02-15")) / (1000 * 60 * 60 * 24)));
      if (daysLeft < 30) deadlineProximityScore = 100;
      else if (daysLeft < 90) deadlineProximityScore = 85;
      else deadlineProximityScore = 40;
    }

    let customerImpactScore = gap.affectedAccounts > 1000 ? 90 : (gap.affectedAccounts > 0 ? 60 : 20);
    let populationScore = Math.min(100, Math.floor((gap.affectedAccounts || 10) / 150));

    const weightedScore = Math.round(
      (severityScore * 0.25) +
      (evidenceDeficiencyScore * 0.20) +
      (controlWeaknessScore * 0.20) +
      (deadlineProximityScore * 0.15) +
      (customerImpactScore * 0.10) +
      (populationScore * 0.10)
    );

    let riskLevel = "LOW";
    if (weightedScore >= 75) riskLevel = "HIGH";
    else if (weightedScore >= 50) riskLevel = "MEDIUM";

    const explainabilityFactors = [];
    if (severityScore >= 80) explainabilityFactors.push({ factor: "Mandatory Regulatory Requirement", impact: "+25 pts", type: "CRITICAL" });
    if (evidenceDeficiencyScore >= 75) explainabilityFactors.push({ factor: "Evidence Missing or Expired", impact: "+20 pts", type: "HIGH" });
    if (controlWeaknessScore >= 70) explainabilityFactors.push({ factor: "Internal Control Sub-optimal or Non-Compliant", impact: "+20 pts", type: "HIGH" });
    if (deadlineProximityScore >= 80) explainabilityFactors.push({ factor: "Compliance Deadline Approaching (< 90 Days)", impact: "+15 pts", type: "MEDIUM" });
    if (customerImpactScore >= 60) explainabilityFactors.push({ factor: `Affects ${gap.affectedAccounts || 'Multiple'} Active Accounts`, impact: "+10 pts", type: "MEDIUM" });

    return {
      gapId: gap.id,
      riskScore: weightedScore,
      riskLevel: riskLevel,
      breakdown: {
        severityScore,
        evidenceDeficiencyScore,
        controlWeaknessScore,
        deadlineProximityScore,
        customerImpactScore,
        populationScore
      },
      explainabilityFactors,
      confidence: 0.98,
      timestamp: new Date().toISOString()
    };
  }
}

module.exports = RiskAgent;
