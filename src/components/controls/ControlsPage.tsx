import React, { useEffect, useState } from 'react';
import { api } from '../../services/api';
import { Control } from '../../types';
import { useApp } from '../../context/AppContext';
import {
  ShieldCheck,
  Layers,
  ArrowRight,
  CheckCircle2,
  AlertTriangle,
  Database,
  FileCheck2,
  Server
} from 'lucide-react';

export const ControlsPage: React.FC = () => {
  const [controls, setControls] = useState<Control[]>([]);
  const [selectedControl, setSelectedControl] = useState<Control | null>(null);

  useEffect(() => {
    api.getControls().then(data => {
      setControls(data);
      if (data.length > 0) setSelectedControl(data[0]);
    });
  }, []);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-slate-900 p-6 rounded-2xl border border-slate-800">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="bg-indigo-500/10 text-indigo-400 text-[10px] font-mono px-2.5 py-0.5 rounded border border-indigo-500/20 font-bold">
              CONTROL FRAMEWORK MATRIX
            </span>
            <span className="text-xs text-slate-400 font-mono">143 Mapped Internal Controls</span>
          </div>
          <h1 className="text-xl font-bold text-white flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-indigo-400" />
            <span>Controls & Evidence Architecture</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Internal control framework mapping, effectiveness testing, and end-to-end audit dependency chain.
          </p>
        </div>
      </div>

      {/* Visual Graph Mapping Chain Component */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4 shadow-xl">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="text-xs font-bold uppercase font-mono text-brand-400 tracking-wider flex items-center gap-2">
            <Layers className="w-4 h-4 text-brand-400" />
            <span>End-to-End Visual Dependency Chain Visualization</span>
          </div>
          <span className="text-[10px] text-slate-500 font-mono">OBLIGATION → CONTROL → EVIDENCE STORE → AUDIT REPOSITORY</span>
        </div>

        {/* Visual Graph Node Chain */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 py-4">
          {/* Node 1: Obligation */}
          <div className="bg-slate-950 p-4 rounded-xl border border-brand-500/30 flex flex-col justify-between space-y-3 relative">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono text-brand-400 font-bold">OBLIGATION</span>
              <span className="w-2 h-2 rounded-full bg-brand-500"></span>
            </div>
            <div>
              <div className="font-bold text-sm text-white font-mono">OBL-041</div>
              <p className="text-[11px] text-slate-300 mt-1">18-Month Customer Verification Retention (§4.2)</p>
            </div>
            <div className="text-[10px] text-slate-500 font-mono">Source: CDD Update v3</div>
          </div>

          {/* Node 2: Control */}
          <div className="bg-slate-950 p-4 rounded-xl border border-indigo-500/30 flex flex-col justify-between space-y-3 relative">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono text-indigo-400 font-bold">INTERNAL CONTROL</span>
              <span className="w-2 h-2 rounded-full bg-indigo-500"></span>
            </div>
            <div>
              <div className="font-bold text-sm text-white font-mono">CDD-11</div>
              <p className="text-[11px] text-slate-300 mt-1">Customer Evidence Retention Policy Engine</p>
            </div>
            <div className="text-[10px] text-amber-400 font-mono">Effectiveness: 71%</div>
          </div>

          {/* Node 3: Evidence Store */}
          <div className="bg-slate-950 p-4 rounded-xl border border-sky-500/30 flex flex-col justify-between space-y-3 relative">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono text-sky-400 font-bold">EVIDENCE STORE</span>
              <Server className="w-4 h-4 text-sky-400" />
            </div>
            <div>
              <div className="font-bold text-sm text-white font-mono">S3_KYC_Archive</div>
              <p className="text-[11px] text-slate-300 mt-1">AWS S3 Bucket & Cold Glacier Repository</p>
            </div>
            <div className="text-[10px] text-slate-500 font-mono">Rule: RetentionInDays = 548</div>
          </div>

          {/* Node 4: Audit Verification Records */}
          <div className="bg-slate-950 p-4 rounded-xl border border-rose-500/30 flex flex-col justify-between space-y-3 relative">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono text-rose-400 font-bold">EVIDENCE DEFICIENCY</span>
              <AlertTriangle className="w-4 h-4 text-rose-400" />
            </div>
            <div>
              <div className="font-bold text-sm text-rose-300 font-mono">EVI-801</div>
              <p className="text-[11px] text-slate-300 mt-1">93 Found / 100 Expected (7 Records Purged)</p>
            </div>
            <div className="text-[10px] text-rose-400 font-mono">GAP-1037 Created</div>
          </div>
        </div>
      </div>

      {/* Controls Grid Table */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {controls.map(ctrl => (
          <div key={ctrl.id} className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-4 hover:border-slate-700 transition-all">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div>
                <span className="font-mono text-xs font-bold text-indigo-400">{ctrl.id}</span>
                <h3 className="text-sm font-bold text-white">{ctrl.name}</h3>
              </div>
              <span className={`px-2.5 py-0.5 rounded text-[10px] font-mono font-bold ${
                ctrl.status.includes('Non-Compliant') || ctrl.status.includes('High Risk')
                  ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                  : ctrl.status.includes('Attention')
                  ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                  : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/20'
              }`}>
                {ctrl.status}
              </span>
            </div>

            <p className="text-xs text-slate-300">{ctrl.description}</p>

            <div className="grid grid-cols-2 gap-2 bg-slate-950 p-3 rounded-xl border border-slate-800 text-xs font-mono">
              <div>
                <span className="text-slate-500 text-[10px]">OWNER: </span>
                <span className="text-slate-200">{ctrl.owner}</span>
              </div>
              <div>
                <span className="text-slate-500 text-[10px]">BUSINESS UNIT: </span>
                <span className="text-slate-200">{ctrl.businessUnit}</span>
              </div>
              <div>
                <span className="text-slate-500 text-[10px]">EFFECTIVENESS: </span>
                <span className="text-emerald-400 font-bold">{ctrl.effectiveness}</span>
              </div>
              <div>
                <span className="text-slate-500 text-[10px]">COVERAGE: </span>
                <span className="text-sky-400 font-bold">{ctrl.evidenceCoverage}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
