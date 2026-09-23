import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  BarChart3,
  Download,
  FileText,
  ShieldCheck,
  AlertTriangle,
  FileCheck2,
  CheckCircle2
} from 'lucide-react';

export const ReportsPage: React.FC = () => {
  const { addToast } = useApp();

  const handleDownload = (format: string, title: string) => {
    addToast('Report Exported', `Generated and downloaded '${title}.${format.toLowerCase()}'.`, 'success');
  };

  const reports = [
    { title: 'Executive Compliance Summary Report', type: 'Summary', date: '2026-02-15', description: 'High-level board summary covering active regulations, gap counts, and evidence coverage.' },
    { title: 'Regulatory Change Delta Report', type: 'Delta Audit', date: '2026-02-15', description: 'Detailed diff analysis of Customer Due Diligence Update v3 vs legacy rules.' },
    { title: 'Compliance Gap Register Export', type: 'Gaps', date: '2026-02-15', description: 'Full register of open findings, owners, due dates, and risk scores.' },
    { title: 'Deterministic Risk Prioritization Report', type: 'Risk Analysis', date: '2026-02-15', description: 'Weighted risk formula breakdowns and explainability factors for auditors.' },
    { title: 'Remediation Action Plan Status', type: 'Remediation', date: '2026-02-15', description: 'Status of human-approved remediation tasks and verification milestones.' },
    { title: 'Immutable Agent Execution Audit Log', type: 'Audit Trail', date: '2026-02-15', description: 'Complete step-by-step trace of agent execution runs and prompt/response hashes.' }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-slate-900 p-6 rounded-2xl border border-slate-800">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="bg-brand-500/10 text-brand-400 text-[10px] font-mono px-2.5 py-0.5 rounded border border-brand-500/20 font-bold">
              AUDIT-READY REPORT GENERATOR
            </span>
            <span className="text-xs text-slate-400 font-mono">PDF / CSV / JSON</span>
          </div>
          <h1 className="text-xl font-bold text-white flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-brand-400" />
            <span>Compliance & Audit Reports</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Export executive summaries, regulatory gap logs, and agent audit trails for regulatory submission.
          </p>
        </div>
      </div>

      {/* Reports Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {reports.map((rep, idx) => (
          <div key={idx} className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-4 shadow-sm hover:border-slate-700 transition-all">
            <div className="flex items-center justify-between pb-2 border-b border-slate-800">
              <span className="font-mono text-[10px] text-brand-400 font-bold uppercase">{rep.type}</span>
              <span className="font-mono text-[10px] text-slate-500">{rep.date}</span>
            </div>

            <h3 className="text-sm font-bold text-white">{rep.title}</h3>
            <p className="text-xs text-slate-400">{rep.description}</p>

            <div className="pt-2 flex items-center gap-2">
              <button
                onClick={() => handleDownload('PDF', rep.title)}
                className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-mono font-medium flex items-center gap-1.5"
              >
                <Download className="w-3.5 h-3.5 text-rose-400" />
                <span>PDF</span>
              </button>

              <button
                onClick={() => handleDownload('CSV', rep.title)}
                className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-mono font-medium flex items-center gap-1.5"
              >
                <Download className="w-3.5 h-3.5 text-emerald-400" />
                <span>CSV</span>
              </button>

              <button
                onClick={() => handleDownload('JSON', rep.title)}
                className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-mono font-medium flex items-center gap-1.5"
              >
                <Download className="w-3.5 h-3.5 text-sky-400" />
                <span>JSON</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
