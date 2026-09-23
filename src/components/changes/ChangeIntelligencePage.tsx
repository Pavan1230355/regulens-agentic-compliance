import React, { useEffect, useState } from 'react';
import { api } from '../../services/api';
import { RegulationChange } from '../../types';
import { useApp } from '../../context/AppContext';
import {
  GitCompare,
  AlertCircle,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  ShieldAlert,
  FileCheck2,
  Clock,
  Layers
} from 'lucide-react';

export const ChangeIntelligencePage: React.FC = () => {
  const [changes, setChanges] = useState<RegulationChange[]>([]);
  const { setActiveTab, triggerDemoWorkflow } = useApp();

  useEffect(() => {
    api.getRegulationChanges('REG-CDD-03').then(res => {
      setChanges(res.diffs || []);
    });
  }, []);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-slate-900 p-6 rounded-2xl border border-slate-800">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="bg-sky-500/10 text-sky-400 text-[10px] font-mono px-2.5 py-0.5 rounded border border-sky-500/20 font-bold">
              REGULATORY DIFF ENGINE
            </span>
            <span className="text-xs text-slate-400 font-mono">v2.0 vs v3.0</span>
          </div>
          <h1 className="text-xl font-bold text-white flex items-center gap-2">
            <GitCompare className="w-5 h-5 text-sky-400" />
            <span>Regulatory Change Intelligence</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Customer Due Diligence Update v3 — Automated delta detection across regulatory text clauses.
          </p>
        </div>

        <button
          onClick={triggerDemoWorkflow}
          className="px-4 py-2.5 rounded-xl bg-brand-600 hover:bg-brand-500 text-white font-semibold text-xs flex items-center gap-2 shadow-lg shadow-brand-600/30 transition-all border border-brand-400/30"
        >
          <Sparkles className="w-4 h-4 text-amber-300" />
          <span>Extract Downstream Obligations</span>
        </button>
      </div>

      {/* Changes Cards List */}
      <div className="space-y-4">
        {changes.map((chg, index) => (
          <div key={chg.id} className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4 shadow-sm hover:border-slate-700 transition-all">
            {/* Top Row Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 pb-3 border-b border-slate-800">
              <div className="flex items-center gap-3">
                <span className="px-2.5 py-1 rounded bg-brand-950 text-brand-300 border border-brand-500/30 font-mono text-xs font-bold">
                  {chg.section}
                </span>
                <h3 className="text-sm font-bold text-white">{chg.title}</h3>
              </div>

              <div className="flex items-center gap-3 font-mono text-xs">
                <span className="text-slate-400">Confidence: {(chg.confidence * 100).toFixed(0)}%</span>
                <span className={`px-2.5 py-0.5 rounded font-bold ${
                  chg.riskLevel === 'HIGH' ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30' : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                }`}>
                  RISK: {chg.riskLevel}
                </span>
              </div>
            </div>

            {/* Side-by-Side Old vs New Text Diff */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono">
              {/* Previous Version Box */}
              <div className="bg-rose-950/10 border border-rose-500/20 p-4 rounded-xl space-y-2">
                <div className="text-rose-400 font-bold uppercase text-[10px] tracking-wider flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-rose-500"></span>
                  <span>PREVIOUS VERSION (v2.0)</span>
                </div>
                <div className="text-slate-300 bg-slate-950/80 p-3 rounded-lg border border-rose-500/10 line-through opacity-80">
                  {chg.oldText}
                </div>
              </div>

              {/* Current Version Box */}
              <div className="bg-emerald-950/10 border border-emerald-500/20 p-4 rounded-xl space-y-2">
                <div className="text-emerald-400 font-bold uppercase text-[10px] tracking-wider flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                  <span>CURRENT UPDATED VERSION (v3.0)</span>
                </div>
                <div className="text-emerald-200 bg-slate-950/80 p-3 rounded-lg border border-emerald-500/20 font-semibold">
                  {chg.newText}
                </div>
              </div>
            </div>

            {/* Downstream Impact Summary Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-slate-950 p-3.5 rounded-xl border border-slate-800 text-xs font-mono">
              <div className="flex items-center gap-2">
                <Layers className="w-4 h-4 text-brand-400" />
                <div>
                  <div className="text-slate-500 text-[10px]">OBLIGATIONS</div>
                  <div className="text-white font-bold">{chg.affectedObligationsCount} Impacted</div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <FileCheck2 className="w-4 h-4 text-sky-400" />
                <div>
                  <div className="text-slate-500 text-[10px]">CONTROLS</div>
                  <div className="text-sky-300 font-bold">{chg.affectedControlsCount} Controls</div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-amber-400" />
                <div>
                  <div className="text-slate-500 text-[10px]">EVIDENCE SETS</div>
                  <div className="text-amber-300 font-bold">{chg.affectedEvidenceCount} Sets</div>
                </div>
              </div>

              <div className="flex items-center justify-end">
                <button
                  onClick={() => setActiveTab('obligations')}
                  className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium flex items-center gap-1.5"
                >
                  <span>View Obligations</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
