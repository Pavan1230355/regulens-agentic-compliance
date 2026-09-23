/**
 * REGULENS - Security Agent (Prompt Injection & Input Guardrail Filter)
 * Scans input documents and text chunks for instruction overrides, credential theft, context poisoning.
 */

class SecurityAgent {
  static analyzeInput(text) {
    if (!text || typeof text !== 'string') {
      return { safe: true, threatScore: 0, detectedThreats: [] };
    }

    const threatPatterns = [
      { pattern: /ignore\s+(all\s+)?previous\s+instructions/i, name: "Instruction Override" },
      { pattern: /you\s+are\s+now\s+a/i, name: "Role Hijacking" },
      { pattern: /system\s+prompt|reveal\s+key|api_key|password/i, name: "Secret Extraction" },
      { pattern: /<script|exec\(|eval\(/i, name: "Code Injection" },
      { pattern: /do\s+not\s+follow\s+compliance/i, name: "Compliance Constraint Bypass" }
    ];

    const detected = [];
    for (const item of threatPatterns) {
      if (item.pattern.test(text)) {
        detected.push(item.name);
      }
    }

    if (detected.length > 0) {
      return {
        safe: false,
        action: "BLOCK",
        threatScore: Math.min(100, detected.length * 40),
        detectedThreats: detected,
        message: "Potential prompt injection or policy override attempt detected. Content isolated from agent execution layer."
      };
    }

    return {
      safe: true,
      action: "ALLOW",
      threatScore: 0,
      detectedThreats: [],
      message: "Input verified safe by Security Agent."
    };
  }
}

module.exports = SecurityAgent;
