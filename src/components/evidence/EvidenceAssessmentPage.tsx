import React, { useEffect, useState } from 'react';
import { api } from '../../services/api';
import { EvidenceRecord } from '../../types';
import { useApp } from '../../context/AppContext';
import {
  FileSpreadsheet,
  AlertTriangle,
  CheckCircle2,
  Clock,
  Database,
  Sparkles,
  FileCheck2,
  XCircle
} from 'lucide-react';

export const EvidenceAssessmentPage: React.FC = () => {
  const [evidence, setEvidence] = useState<EvidenceRecord[]>([]);

  useEffect(() => {
    api.getEvidence().then(data => setEvidence(data));
  }, []);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-slate-900 p-6 rounded-2xl border border-slate-800">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="bg-emerald-500/10 text-emerald-400 text-[10px] font-mono px-2.5 py-0.5 rounded border border-emerald-500/20 font-bold">
              AUDIT TRAIL INSPECTOR AGENT
            </span>
            <span className="text-xs text-slate-400 font-mono">14,420 Records Verified</span>
          </div>
          <h1 className="text-xl font-bold text-white flex items-center gap-2">
            <FileSpreadsheet className="w-5 h-5 text-emerald-400" />
            <span>Evidence Assessment & Audit Records</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Continuous inspection of digital proof, retention timestamps, and document coverage across core repositories.
          </p>
        </div>
      </div>

      {/* Summary KPI Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 bg-slate-900 p-4 rounded-2xl border border-slate-800 font-mono text-xs">
        <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
          <div className="text-slate-500 text-[10px]">REQUIRED EVIDENCE</div>
          <div className="text-white font-bold text-lg">14,420 Records</div>
        </div>
        <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
          <div className="text-slate-500 text-[10px]">AVAILABLE VERIFIED</div>
          <div className="text-emerald-400 font-bold text-lg">3,643 Records</div>
        </div>
        <div className="p-3 bg-slate-950 rounded-xl border border-rose-500/20 bg-rose-950/10">
          <div className="text-rose-400 text-[10px]">MISSING EVIDENCE</div>
          <div className="text-rose-400 font-bold text-lg">10,777 Records</div>
        </div>
        <div className="p-3 bg-slate-950 rounded-xl border border-amber-500/20">
          <div className="text-amber-400 text-[10px]">EXPIRED RECORDS</div>
          <div className="text-amber-400 font-bold text-lg">7 Records</div>
        </div>
        <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
          <div className="text-slate-500 text-[10px]">EVIDENCE COVERAGE</div>
          <div className="text-brand-400 font-bold text-lg">91.4% Overall</div>
        </div>
      </div>

      {/* Evidence Items Audit Cards */}
      <div className="space-y-4">
        {evidence.map(item => (
          <div key={item.id} className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4 shadow-sm hover:border-slate-700 transition-all">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 pb-3 border-b border-slate-800">
              <div className="flex items-center gap-3">
                <span className="font-mono text-xs font-bold text-brand-400 bg-brand-950 px-2.5 py-1 rounded border border-brand-500/30">
                  {item.id}
                </span>
                <span className="font-mono text-xs text-slate-400">Control: {item.controlId}</span>
                <h3 className="text-sm font-bold text-white">{item.requirement}</h3>
              </div>

              <span className={`px-2.5 py-0.5 rounded text-xs font-mono font-bold ${
                item.status === 'CRITICAL_MISSING' || item.status === 'ABSENT'
                  ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                  : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
              }`}>
                {item.status}
              </span>
            </div>

            {/* Counts & Store Row */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-slate-950 p-3.5 rounded-xl border border-slate-800 text-xs font-mono">
              <div>
                <div className="text-slate-500 text-[10px]">EXPECTED RECORDS</div>
                <div className="text-white font-bold">{item.expectedCount}</div>
              </div>
              <div>
                <div className="text-slate-500 text-[10px]">FOUND VERIFIED</div>
                <div className="text-emerald-400 font-bold">{item.foundCount}</div>
              </div>
              <div>
                <div className="text-slate-500 text-[10px]">DEFICIENT MISSING</div>
                <div className="text-rose-400 font-bold">{item.missingCount}</div>
              </div>
              <div>
                <div className="text-slate-500 text-[10px]">AUDIT BUCKET SOURCE</div>
                <div className="text-sky-300 truncate">{item.sourceDocument}</div>
              </div>
            </div>

            {/* AI Finding Banner */}
            <div className="bg-brand-950/20 border border-brand-500/30 p-4 rounded-xl flex items-start gap-3">
              <Sparkles className="w-5 h-5 text-amber-300 shrink-0 mt-0.5" />
              <div className="space-y-1 text-xs">
                <div className="font-bold text-brand-300 font-mono">EVIDENCE AGENT AUDIT FINDING</div>
                <p className="text-slate-200 leading-relaxed">{item.findings}</p>
                <div className="text-[10px] text-slate-500 font-mono pt-1">Audited at: {item.lastAudit} • Confidence: 96%</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
