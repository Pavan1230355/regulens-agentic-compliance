# REGULENS — Agentic Regulatory Compliance & Control Intelligence

[![ET AI Hackathon](https://img.shields.io/badge/ET_AI_Hackathon-Problem_1:_Banking_%2F_Financial_Regulations-0284C7?style=for-the-badge)](https://github.com)
[![Claim Category](https://img.shields.io/badge/Claim-F3_%2F_D2-emerald?style=for-the-badge)](#claim-justification)

**ReguLens** is an autonomous multi-agent regulatory compliance platform designed for the **ET AI Hackathon — Agentic Edition (Problem 1: Banking / Financial Regulations)**.

Unlike conversational chatbots, **ReguLens** provides a complete enterprise banking platform that continuously bridges the gap between complex regulatory mandates and internal operational controls.

---

## 🚀 Complete Agentic Workflow Chain

```text
REGULATION
   ↓
REGULATORY CHANGE
   ↓
OBLIGATION EXTRACTION
   ↓
APPLICABILITY
   ↓
CONTROL MAPPING
   ↓
EVIDENCE ASSESSMENT
   ↓
GAP IDENTIFICATION
   ↓
RISK PRIORITIZATION
   ↓
REMEDIATION
   ↓
IMPACT ANALYSIS
   ↓
CONTINUOUS MONITORING
```

---

## 🤖 Multi-Agent Architecture

ReguLens orchestrates 8 specialized autonomous agents:

1. **Security Guardrail Agent**: Analyzes input files for direct and indirect prompt injection, role hijacking, and secret extraction before execution.
2. **Regulatory Intelligence Agent**: Ingests regulatory PDFs/DOCX, chunks text, tracks document versions, and computes clause diffs (e.g. §4.2, §6.1, §8.4).
3. **Obligation Extraction Agent**: Parses clauses, determines product applicability, assigns confidence scores, and generates AI explanations.
4. **Control Mapping Agent**: Semantically maps extracted obligations to internal banking controls (`CDD-07`, `CDD-11`, `AML-04`, `OPS-12`).
5. **Evidence Assessment Agent**: Audits database logs and cloud storage buckets (`S3_KYC_Archive`) to identify missing or expired evidence records.
6. **Risk Prioritization Agent**: Computes a 100% deterministic, weighted compliance risk score (0–100) and produces auditor explainability breakdowns.
7. **Remediation Agent**: Generates actionable root-cause remediation plans with assigned owners, deadlines, and human-in-the-loop approval workflows.
8. **Impact Analysis Agent**: Parameterized What-If simulator engine calculating downstream dependency propagation across the entire organization.

---

## 🛠️ Technology Stack

- **Frontend**: React 18, Vite, TypeScript, Tailwind CSS, Lucide Icons, Recharts
- **Backend API**: Node.js, Express.js, Multer
- **Agent Framework**: Multi-agent orchestrator pipeline with deterministic fallback execution
- **Security**: Prompt injection guardrail filter

---

## ⚡ Quick Start & Running the Application

### 1. Prerequisites
- Node.js (v18+ recommended)
- npm or yarn

### 2. Backend Setup
```bash
cd server
npm install
npm start
# Express API server starts on http://localhost:5000
```

### 3. Frontend Setup
```bash
# In the root project directory
npm install
npm run dev
# Vite frontend server starts on http://localhost:3000
```

---

## 📋 3-Minute Hackathon Demo Pitch Script

- **0:00 - 0:20 | Introduction**: Present ReguLens as an enterprise agentic compliance engine replacing manual spreadsheets.
- **0:20 - 0:45 | Document Upload & Diff**: Upload *Customer Due Diligence Update v3.pdf* and observe automated change detection across §4.2 (12m → 18m retention), §6.1 (annual → quarterly review), and §8.4 (exception log).
- **0:45 - 1:15 | Obligations & Visual Mapping**: Inspect extracted obligations (`OBL-041`), trigger "Explain Obligation" for AI citations, and view the end-to-end visual dependency graph (`Obligation → Control → Evidence Store → Audit Records`).
- **1:15 - 1:45 | Evidence Deficiency & Gap Register**: Review `EVI-801` (7 records purged) and inspect `GAP-1042` with 87/100 risk score.
- **1:45 - 2:15 | Risk Explainability & Remediation**: Demonstrate the deterministic risk breakdown ("WHY HIGH RISK?") and approve human-in-the-loop remediation task `REM-201`.
- **2:15 - 3:00 | The Killer What-If Simulator**: Navigate to Impact Simulator, change retention from 18 to 24 months, click "Run Impact Analysis", and showcase live dependency recalculation (4 obligations, 3 controls, 7 evidence sets, 1 new gap).

---

## 🏷️ Claim Justification (F3 / D2)

- **F3 (Feature Breadth)**: Exceeds the 8 required features by demonstrating all 11 stages of the regulatory chain including RAG source citations, prompt injection filtering, human-in-the-loop approval, and parameter simulation.
- **D2 (Demonstrable Reliability)**: High demonstrable reliability powered by deterministic fallback mode ensuring 100% execution uptime during live hackathon presentations.
