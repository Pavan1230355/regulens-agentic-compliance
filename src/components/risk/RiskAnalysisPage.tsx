import React, { useEffect, useState } from 'react';
import { api } from '../../services/api';
import { ComplianceGap } from '../../types';
import { useApp } from '../../context/AppContext';
import {
  BrainCircuit,
  Flame,
  CheckCircle2,
  AlertTriangle,
  HelpCircle,
  BarChart2,
  Sparkles,
  Sliders
} from 'lucide-react';

export const RiskAnalysisPage: React.FC = () => {
  const [gaps, setGaps] = useState<ComplianceGap[]>([]);
  const [selectedGap, setSelectedGap] = useState<ComplianceGap | null>(null);

  useEffect(() => {
    api.getGaps().then(data => {
      setGaps(data);
      if (data.length > 0) setSelectedGap(data[0]);
    });
  }, []);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-slate-900 p-6 rounded-2xl border border-slate-800">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="bg-rose-500/10 text-rose-400 text-[10px] font-mono px-2.5 py-0.5 rounded border border-rose-500/20 font-bold">
              DETERMINISTIC WEIGHTED RISK ENGINE
            </span>
            <span className="text-xs text-slate-400 font-mono">100% Explainable Formula</span>
          </div>
          <h1 className="text-xl font-bold text-white flex items-center gap-2">
            <BrainCircuit className="w-5 h-5 text-rose-400" />
            <span>Risk Prioritization & Explainability Panel</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Weighted risk scoring engine calculating non-arbitrary risk scores based on regulatory severity, control weakness, and deadline proximity.
          </p>
        </div>
      </div>

      {/* Selected Gap Risk Detail Card */}
      {selectedGap && selectedGap.riskAnalysis && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-6 shadow-xl">
          {/* Top Score Banner */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-800">
            <div>
              <span className="font-mono text-xs text-amber-400 font-bold">{selectedGap.id}</span>
              <h2 className="text-xl font-bold text-white">{selectedGap.title}</h2>
              <p className="text-xs text-slate-400 mt-0.5">{selectedGap.requirement}</p>
            </div>

            {/* Score Badge */}
            <div className="flex items-center gap-4 bg-slate-950 p-4 rounded-xl border border-rose-500/30">
              <div className="text-right">
                <div className="text-slate-500 font-mono text-[10px]">COMPLIANCE RISK SCORE</div>
                <div className="text-2xl font-bold text-rose-400 font-mono">{selectedGap.riskAnalysis.riskScore} / 100</div>
              </div>
              <div className="w-12 h-12 rounded-xl bg-rose-500/20 border border-rose-500/30 flex items-center justify-center text-rose-400 font-bold font-mono text-lg">
                HIGH
              </div>
            </div>
          </div>

          {/* Explainability Panel "WHY HIGH RISK?" */}
          <div className="bg-slate-950 p-5 rounded-2xl border border-brand-500/30 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-brand-300 font-mono font-bold text-xs uppercase tracking-wider">
                <Sparkles className="w-4 h-4 text-amber-300" />
                <span>EXPLAINABILITY PANEL — WHY HIGH RISK?</span>
              </div>
              <span className="text-[10px] text-emerald-400 font-mono">DETERMINISTIC REASONING</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {selectedGap.riskAnalysis.explainabilityFactors.map((factor, idx) => (
                <div key={idx} className="p-3 bg-slate-900 rounded-xl border border-slate-800 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2.5 text-slate-200">
                    <span className="w-2 h-2 rounded-full bg-rose-500"></span>
                    <span>{factor.factor}</span>
                  </div>
                  <span className="font-mono font-bold text-rose-400 bg-rose-950/40 px-2 py-0.5 rounded border border-rose-500/20">
                    {factor.impact}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Weighted Formula Breakdown Grid */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 font-mono">
              Deterministic Weighted Formula Breakdown
            </h3>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 font-mono text-xs">
              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                <div className="text-slate-500 text-[10px]">SEVERITY (25%)</div>
                <div className="text-white font-bold text-base">{selectedGap.riskAnalysis.breakdown.severityScore} / 100</div>
              </div>

              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                <div className="text-slate-500 text-[10px]">EVIDENCE DEF. (20%)</div>
                <div className="text-rose-400 font-bold text-base">{selectedGap.riskAnalysis.breakdown.evidenceDeficiencyScore} / 100</div>
              </div>

              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                <div className="text-slate-500 text-[10px]">CONTROL WEAK. (20%)</div>
                <div className="text-amber-400 font-bold text-base">{selectedGap.riskAnalysis.breakdown.controlWeaknessScore} / 100</div>
              </div>

              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                <div className="text-slate-500 text-[10px]">DEADLINE PROX. (15%)</div>
                <div className="text-sky-400 font-bold text-base">{selectedGap.riskAnalysis.breakdown.deadlineProximityScore} / 100</div>
              </div>

              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                <div className="text-slate-500 text-[10px]">CUSTOMER IMP. (10%)</div>
                <div className="text-indigo-400 font-bold text-base">{selectedGap.riskAnalysis.breakdown.customerImpactScore} / 100</div>
              </div>

              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                <div className="text-slate-500 text-[10px]">POPULATION (10%)</div>
                <div className="text-emerald-400 font-bold text-base">{selectedGap.riskAnalysis.breakdown.populationScore} / 100</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Select Other Gaps */}
      <div className="space-y-3">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 font-mono">Select Gap for Risk Analysis</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {gaps.map(g => (
            <div
              key={g.id}
              onClick={() => setSelectedGap(g)}
              className={`p-4 rounded-xl border cursor-pointer transition-all ${
                selectedGap?.id === g.id ? 'bg-brand-950/30 border-brand-500/50' : 'bg-slate-900 border-slate-800 hover:border-slate-700'
              }`}
            >
              <div className="flex items-center justify-between mb-1 font-mono text-xs">
                <span className="font-bold text-amber-400">{g.id}</span>
                <span className="text-rose-400 font-bold">{g.riskScore} / 100</span>
              </div>
              <div className="text-xs font-medium text-white line-clamp-1">{g.title}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
