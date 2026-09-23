import React, { useEffect, useState } from 'react';
import { api } from '../../services/api';
import { ComplianceGap } from '../../types';
import { useApp } from '../../context/AppContext';
import {
  AlertTriangle,
  Flame,
  Search,
  Filter,
  ArrowRight,
  ShieldAlert,
  User,
  Calendar,
  X,
  Sparkles,
  CheckCircle2,
  Wrench
} from 'lucide-react';

export const GapRegisterPage: React.FC = () => {
  const [gaps, setGaps] = useState<ComplianceGap[]>([]);
  const [selectedGap, setSelectedGap] = useState<ComplianceGap | null>(null);
  const [search, setSearch] = useState<string>('');
  const { setActiveTab, setSelectedGapId } = useApp();

  useEffect(() => {
    api.getGaps().then(data => {
      setGaps(data);
      if (data.length > 0) setSelectedGap(data[0]);
    });
  }, []);

  const filtered = gaps.filter(g =>
    g.title.toLowerCase().includes(search.toLowerCase()) ||
    g.id.toLowerCase().includes(search.toLowerCase()) ||
    g.controlId.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-slate-900 p-6 rounded-2xl border border-slate-800">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="bg-amber-500/10 text-amber-400 text-[10px] font-mono px-2.5 py-0.5 rounded border border-amber-500/20 font-bold">
              GAP IDENTIFICATION AGENT
            </span>
            <span className="text-xs text-slate-400 font-mono">12 Active Gaps Identified</span>
          </div>
          <h1 className="text-xl font-bold text-white flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-amber-400" />
            <span>Compliance Gap Register</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Centralized registry of control weaknesses, evidence shortfalls, and regulatory non-compliance findings.
          </p>
        </div>
      </div>

      {/* Search Bar */}
      <div className="relative">
        <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Filter compliance gaps by ID, control, or requirement..."
          className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-9 pr-4 py-2 text-xs text-slate-200 focus:outline-none focus:border-brand-500"
        />
      </div>

      {/* Main Grid: Gaps Table + Gap Detail Drawer */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Gaps Table */}
        <div className="lg:col-span-2 bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-950 text-slate-400 uppercase font-mono text-[10px] border-b border-slate-800">
                <tr>
                  <th className="p-3.5">Gap ID</th>
                  <th className="p-3.5">Finding Title</th>
                  <th className="p-3.5">Control</th>
                  <th className="p-3.5">Risk Score</th>
                  <th className="p-3.5">Owner</th>
                  <th className="p-3.5">Due Date</th>
                  <th className="p-3.5 text-right">Inspect</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 font-mono">
                {filtered.map(gap => (
                  <tr
                    key={gap.id}
                    onClick={() => setSelectedGap(gap)}
                    className={`cursor-pointer transition-colors ${
                      selectedGap?.id === gap.id ? 'bg-brand-950/30' : 'hover:bg-slate-800/40'
                    }`}
                  >
                    <td className="p-3.5 font-bold text-amber-400">{gap.id}</td>
                    <td className="p-3.5 font-sans font-medium text-slate-100 max-w-xs truncate">{gap.title}</td>
                    <td className="p-3.5 text-slate-400">{gap.controlId}</td>
                    <td className="p-3.5">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        gap.riskLevel === 'HIGH' ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30' : 'bg-amber-500/20 text-amber-300'
                      }`}>
                        {gap.riskScore} / 100 ({gap.riskLevel})
                      </span>
                    </td>
                    <td className="p-3.5 text-slate-300 font-sans">{gap.owner}</td>
                    <td className="p-3.5 text-slate-400">{gap.dueDate}</td>
                    <td className="p-3.5 text-right font-sans">
                      <button className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 text-[11px]">
                        Inspect
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right Column: Selected Gap Detail Drawer */}
        {selectedGap && (
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-5 shadow-xl">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div>
                <span className="font-mono text-xs font-bold text-amber-400">{selectedGap.id}</span>
                <h2 className="text-base font-bold text-white">{selectedGap.title}</h2>
              </div>
              <span className={`px-2.5 py-1 rounded text-xs font-mono font-bold ${
                selectedGap.riskLevel === 'HIGH' ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30' : 'bg-amber-500/20 text-amber-300'
              }`}>
                RISK: {selectedGap.riskScore}/100
              </span>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <span className="text-slate-500 font-mono text-[10px] uppercase">REGULATORY REQUIREMENT</span>
                <div className="text-slate-200 font-medium bg-slate-950 p-3 rounded-xl border border-slate-800 mt-1">
                  {selectedGap.requirement}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 font-mono text-[11px]">
                <div className="p-2.5 bg-slate-950 rounded-lg border border-slate-800">
                  <div className="text-slate-500 text-[10px]">CONTROL ID</div>
                  <div className="text-indigo-400 font-bold">{selectedGap.controlId}</div>
                </div>
                <div className="p-2.5 bg-slate-950 rounded-lg border border-slate-800">
                  <div className="text-slate-500 text-[10px]">EVIDENCE STORE</div>
                  <div className="text-sky-400 font-bold">{selectedGap.evidenceId}</div>
                </div>
              </div>

              <div>
                <span className="text-slate-500 font-mono text-[10px] uppercase">FINDING DESCRIPTION</span>
                <p className="text-slate-300 leading-relaxed mt-1">{selectedGap.description}</p>
              </div>

              <div className="p-3.5 bg-amber-950/20 border border-amber-500/30 rounded-xl space-y-1">
                <div className="text-amber-300 font-mono font-bold text-[10px] uppercase flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                  <span>AI RECOMMENDED ACTION</span>
                </div>
                <p className="text-slate-200">{selectedGap.recommendation}</p>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
              <button
                onClick={() => setActiveTab('risk')}
                className="px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium"
              >
                View Risk Breakdown
              </button>

              <button
                onClick={() => setActiveTab('remediation')}
                className="px-4 py-2 rounded-xl bg-brand-600 hover:bg-brand-500 text-white text-xs font-bold flex items-center gap-1.5 shadow-md shadow-brand-600/20"
              >
                <Wrench className="w-3.5 h-3.5" />
                <span>Create Remediation Task</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
