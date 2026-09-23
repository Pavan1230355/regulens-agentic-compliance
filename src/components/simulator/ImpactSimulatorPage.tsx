import React, { useState } from 'react';
import { api } from '../../services/api';
import { ImpactSimulationResult } from '../../types';
import { useApp } from '../../context/AppContext';
import {
  SlidersHorizontal,
  Sparkles,
  ArrowRight,
  Layers,
  ShieldAlert,
  CheckCircle2,
  AlertTriangle,
  Play,
  Wrench,
  FileCheck2,
  Clock
} from 'lucide-react';

export const ImpactSimulatorPage: React.FC = () => {
  const [paramType, setParamType] = useState<string>('retention');
  const [oldVal, setOldVal] = useState<string>('18');
  const [newVal, setNewVal] = useState<string>('24');
  const [simulation, setSimulation] = useState<ImpactSimulationResult | null>(null);
  const [isSimulating, setIsSimulating] = useState<boolean>(false);
  const { addToast } = useApp();

  const handleRunSimulation = async () => {
    setIsSimulating(true);
    const result = await api.simulateImpact(paramType, oldVal, newVal);
    setTimeout(() => {
      setSimulation(result);
      setIsSimulating(false);
      addToast('Simulation Complete', `Impact analysis calculated for ${newVal}-month retention parameter change.`, 'success');
    }, 800);
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-amber-950/20 to-slate-900 p-6 rounded-2xl border border-amber-500/30 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="bg-amber-500/20 text-amber-300 text-[10px] font-mono px-2.5 py-0.5 rounded border border-amber-500/30 font-bold">
              KILLER DEMO FEATURE — WHAT-IF SIMULATOR
            </span>
            <span className="text-xs text-slate-400 font-mono">Autonomous Propagation Engine</span>
          </div>
          <h1 className="text-xl font-bold text-white flex items-center gap-2">
            <SlidersHorizontal className="w-5 h-5 text-amber-400" />
            <span>Regulatory Impact Simulator</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Simulate regulatory threshold shifts and observe real-time cascading impact through obligations, controls, evidence, and gaps.
          </p>
        </div>

        <button
          onClick={handleRunSimulation}
          disabled={isSimulating}
          className="px-5 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-brand-600 hover:from-amber-400 hover:to-brand-500 text-white font-bold text-xs flex items-center gap-2 shadow-xl shadow-amber-500/20 border border-amber-300/30 transition-all"
        >
          <Play className="w-4 h-4 text-white fill-current" />
          <span>{isSimulating ? 'Propagating Simulation...' : 'Run What-If Impact Analysis'}</span>
        </button>
      </div>

      {/* Simulator Controls Card */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4 shadow-sm">
        <div className="text-xs font-bold uppercase font-mono text-slate-400">Simulation Parameter Inputs</div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-mono text-xs">
          <div>
            <label className="text-slate-500 text-[10px] block mb-1">REGULATORY PARAMETER</label>
            <select
              value={paramType}
              onChange={(e) => setParamType(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-slate-200 focus:outline-none"
            >
              <option value="retention">Evidence Retention Duration (§4.2)</option>
              <option value="review_frequency">High-Risk Customer Review Cycle (§6.1)</option>
            </select>
          </div>

          <div>
            <label className="text-slate-500 text-[10px] block mb-1">CURRENT BASELINE VALUE</label>
            <input
              type="text"
              value={oldVal}
              onChange={(e) => setOldVal(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-slate-200 focus:outline-none"
            />
          </div>

          <div>
            <label className="text-slate-500 text-[10px] block mb-1">SIMULATED NEW REQUIREMENT VALUE</label>
            <input
              type="text"
              value={newVal}
              onChange={(e) => setNewVal(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-amber-300 font-bold focus:outline-none"
            />
          </div>
        </div>
      </div>

      {/* Simulation Result Area */}
      {simulation && (
        <div className="space-y-6">
          {/* Top Metric Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 bg-slate-900 p-4 rounded-2xl border border-slate-800 font-mono text-xs">
            <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-center">
              <div className="text-slate-500 text-[10px]">AFFECTED OBLIGATIONS</div>
              <div className="text-white font-bold text-xl">{simulation.summary.affectedObligationsCount}</div>
            </div>
            <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-center">
              <div className="text-slate-500 text-[10px]">AFFECTED CONTROLS</div>
              <div className="text-indigo-400 font-bold text-xl">{simulation.summary.affectedControlsCount}</div>
            </div>
            <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-center">
              <div className="text-slate-500 text-[10px]">AFFECTED EVIDENCE</div>
              <div className="text-sky-400 font-bold text-xl">{simulation.summary.affectedEvidenceSetsCount}</div>
            </div>
            <div className="p-3 bg-rose-950/20 border border-rose-500/30 rounded-xl text-center">
              <div className="text-rose-400 text-[10px]">NEW COMPLIANCE GAPS</div>
              <div className="text-rose-400 font-bold text-xl">{simulation.summary.potentialNewGapsCount}</div>
            </div>
            <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-center">
              <div className="text-slate-500 text-[10px]">REMEDIATION ACTIONS</div>
              <div className="text-emerald-400 font-bold text-xl">{simulation.summary.recommendedActionsCount}</div>
            </div>
          </div>

          {/* Visual Dependency Cascade Chain */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-6 shadow-xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="text-xs font-bold uppercase font-mono text-amber-300 tracking-wider flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-300" />
                <span>SIMULATED CASCADING DOWNSTREAM IMPACT CHAIN</span>
              </div>
              <span className="text-[10px] text-slate-500 font-mono">{simulation.oldValue} Months → {simulation.newValue} Months</span>
            </div>

            {/* Downstream Chain Details */}
            <div className="space-y-4 text-xs font-mono">
              {/* Obligations */}
              <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
                <div className="text-brand-400 font-bold uppercase text-[10px]">1. AFFECTED OBLIGATIONS</div>
                <div className="space-y-1">
                  {simulation.dependencyChain.obligations.map(o => (
                    <div key={o.id} className="text-slate-200">
                      • <span className="font-bold text-brand-300">{o.id}:</span> {o.text}
                    </div>
                  ))}
                </div>
              </div>

              {/* Controls */}
              <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
                <div className="text-indigo-400 font-bold uppercase text-[10px]">2. IMPACTED CONTROLS</div>
                <div className="flex gap-2 flex-wrap">
                  {simulation.dependencyChain.controls.map(c => (
                    <span key={c.id} className="px-3 py-1 rounded bg-slate-800 text-slate-200 font-bold">
                      {c.id} ({c.name})
                    </span>
                  ))}
                </div>
              </div>

              {/* New Gaps */}
              <div className="p-4 bg-rose-950/20 border border-rose-500/30 rounded-xl space-y-2">
                <div className="text-rose-400 font-bold uppercase text-[10px] flex items-center gap-1.5">
                  <AlertTriangle className="w-3.5 h-3.5" />
                  <span>3. DETECTED NEW COMPLIANCE GAP</span>
                </div>
                {simulation.dependencyChain.newGaps.map(g => (
                  <div key={g.gapId} className="text-slate-200">
                    <div className="font-bold text-rose-300">{g.title} ({g.severity})</div>
                    <div className="text-slate-300 text-[11px] mt-0.5">{g.description}</div>
                  </div>
                ))}
              </div>

              {/* Recommended Actions */}
              <div className="p-4 bg-emerald-950/20 border border-emerald-500/30 rounded-xl space-y-2">
                <div className="text-emerald-400 font-bold uppercase text-[10px]">4. AI RECOMMENDED REMEDIATION STEPS</div>
                <div className="space-y-1">
                  {simulation.dependencyChain.remediation.map(r => (
                    <div key={r.step} className="text-slate-200 flex items-center justify-between">
                      <span>Step {r.step}: {r.action}</span>
                      <span className="text-emerald-400 font-bold">[{r.owner}]</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
