import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Sparkles,
  CheckCircle2,
  X,
  FileText,
  GitCompare,
  CheckSquare,
  ShieldCheck,
  FileSpreadsheet,
  AlertTriangle,
  BrainCircuit,
  Wrench,
  SlidersHorizontal,
  Play
} from 'lucide-react';

interface Step {
  id: number;
  label: string;
  agent: string;
  message: string;
  icon: React.ReactNode;
}

export const DemoWorkflowModal: React.FC = () => {
  const { demoModalOpen, setDemoModalOpen, setActiveTab } = useApp();
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [isRunning, setIsRunning] = useState<boolean>(false);

  const steps: Step[] = [
    { id: 1, label: 'Document Ingestion', agent: 'Security & Ingestion Agent', message: 'Parsing Customer Due Diligence Update v3.pdf (48 pages)...', icon: <FileText className="w-4 h-4" /> },
    { id: 2, label: 'Change Detection', agent: 'Regulatory Intelligence Agent', message: 'Detected 3 changes across §4.2, §6.1, and §8.4.', icon: <GitCompare className="w-4 h-4" /> },
    { id: 3, label: 'Obligation Extraction', agent: 'Obligation Extraction Agent', message: 'Extracted 8 obligations (OBL-041, OBL-042, OBL-043)...', icon: <CheckSquare className="w-4 h-4" /> },
    { id: 4, label: 'Control Mapping', agent: 'Control Mapping Agent', message: 'Mapped 5 impacted controls (CDD-07, CDD-11, OPS-12)...', icon: <ShieldCheck className="w-4 h-4" /> },
    { id: 5, label: 'Evidence Assessment', agent: 'Evidence Assessment Agent', message: 'Identified 7 missing records in CDD-11 & 10,650 Q2 logs missing in CDD-07.', icon: <FileSpreadsheet className="w-4 h-4" /> },
    { id: 6, label: 'Risk Prioritization', agent: 'Risk Prioritization Agent', message: 'Calculated 2 High-Risk Gaps: GAP-1042 (87/100) & GAP-1037 (78/100).', icon: <BrainCircuit className="w-4 h-4" /> },
    { id: 7, label: 'Remediation Planning', agent: 'Remediation Agent', message: 'Generated 3 actionable plans (REM-201, REM-202, REM-203).', icon: <Wrench className="w-4 h-4" /> },
    { id: 8, label: 'What-If Simulation', agent: 'Impact Analysis Agent', message: 'Simulated 18m → 24m retention shift: 4 obligations, 3 controls, 1 new gap.', icon: <SlidersHorizontal className="w-4 h-4" /> }
  ];

  const startDemo = () => {
    setIsRunning(true);
    setCurrentStep(1);
  };

  useEffect(() => {
    if (isRunning && currentStep > 0 && currentStep <= steps.length) {
      const timer = setTimeout(() => {
        if (currentStep < steps.length) {
          setCurrentStep(prev => prev + 1);
        } else {
          setIsRunning(false);
        }
      }, 3500); // 3.5s per step for a sleek 30s overall experience
      return () => clearTimeout(timer);
    }
  }, [isRunning, currentStep]);

  if (!demoModalOpen) return null;

  return (
    <div className="fixed inset-0 bg-slate-950/85 backdrop-blur-md z-50 flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-2xl w-full p-6 space-y-6 shadow-2xl relative overflow-hidden">
        <button
          onClick={() => {
            setDemoModalOpen(false);
            setIsRunning(false);
            setCurrentStep(0);
          }}
          className="absolute top-4 right-4 text-slate-400 hover:text-white"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-brand-600 to-indigo-600 flex items-center justify-center text-white shadow-lg shadow-brand-500/20">
            <Sparkles className="w-5 h-5 text-amber-300 animate-pulse" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-white">REGULENS 1-Click Agentic Workflow Demo</h2>
            <p className="text-xs text-slate-400">Live multi-agent chain execution for ET AI Hackathon judges</p>
          </div>
        </div>

        {/* Start Button or Active Stepper */}
        {currentStep === 0 ? (
          <div className="bg-slate-950 p-6 rounded-xl border border-slate-800 text-center space-y-4">
            <div className="text-xs text-slate-300 max-w-md mx-auto leading-relaxed">
              This demo executes the full 8-agent compliance pipeline in real-time, showcasing document parsing, clause extraction, control mapping, evidence audit, risk scoring, remediation, and what-if simulation.
            </div>
            <button
              onClick={startDemo}
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-brand-600 to-indigo-600 hover:from-brand-500 hover:to-indigo-500 text-white font-bold text-xs inline-flex items-center gap-2 shadow-lg shadow-brand-600/30"
            >
              <Play className="w-4 h-4 fill-current text-white" />
              <span>Launch Live 30-Second Simulation</span>
            </button>
          </div>
        ) : (
          <div className="space-y-4 font-mono text-xs">
            {/* Progress Bar */}
            <div className="w-full bg-slate-950 h-2 rounded-full overflow-hidden border border-slate-800">
              <div
                className="bg-gradient-to-r from-brand-500 to-emerald-400 h-full transition-all duration-500"
                style={{ width: `${(currentStep / steps.length) * 100}%` }}
              ></div>
            </div>

            {/* Stepper List */}
            <div className="space-y-2 max-h-80 overflow-y-auto pr-1">
              {steps.map(step => {
                const isPassed = currentStep > step.id;
                const isCurrent = currentStep === step.id;
                return (
                  <div
                    key={step.id}
                    className={`p-3 rounded-xl border transition-all flex items-start gap-3 ${
                      isCurrent
                        ? 'bg-brand-950/40 border-brand-500 text-white shadow-md'
                        : isPassed
                        ? 'bg-slate-950/60 border-slate-800/80 text-slate-300'
                        : 'bg-slate-950/30 border-slate-900 text-slate-600'
                    }`}
                  >
                    <div className={`w-6 h-6 rounded-lg flex items-center justify-center shrink-0 mt-0.5 ${
                      isCurrent ? 'bg-brand-500 text-white animate-bounce' : isPassed ? 'bg-emerald-500/20 text-emerald-400' : 'bg-slate-800 text-slate-500'
                    }`}>
                      {isPassed ? <CheckCircle2 className="w-4 h-4" /> : step.icon}
                    </div>

                    <div className="flex-1 text-xs">
                      <div className="flex items-center justify-between">
                        <span className="font-bold">{step.label}</span>
                        <span className="text-[10px] text-brand-400">{step.agent}</span>
                      </div>
                      <div className="text-[11px] text-slate-300 mt-0.5">{step.message}</div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Completion Footer */}
            {currentStep === steps.length && !isRunning && (
              <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
                <span className="text-emerald-400 font-bold text-xs flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Agentic Pipeline Run Complete!</span>
                </span>
                <button
                  onClick={() => {
                    setDemoModalOpen(false);
                    setActiveTab('simulator');
                  }}
                  className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs"
                >
                  Explore What-If Impact Simulator
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
