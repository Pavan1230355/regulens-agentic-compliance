import React, { useEffect, useState } from 'react';
import { api } from '../../services/api';
import { RemediationTask } from '../../types';
import { useApp } from '../../context/AppContext';
import {
  Wrench,
  CheckCircle2,
  Clock,
  UserCheck,
  AlertTriangle,
  Sparkles,
  ShieldAlert,
  XCircle,
  Check
} from 'lucide-react';

export const RemediationPage: React.FC = () => {
  const [tasks, setTasks] = useState<RemediationTask[]>([]);
  const { addToast } = useApp();

  useEffect(() => {
    api.getRemediationTasks().then(data => setTasks(data));
  }, []);

  const handleApprove = async (id: string) => {
    await api.approveRemediation(id);
    setTasks(prev => prev.map(t => t.id === id ? { ...t, status: 'APPROVED', approvedBy: 'Compliance Admin' } : t));
    addToast('Plan Approved', `Remediation task ${id} approved and routed to assigned owner.`, 'success');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-slate-900 p-6 rounded-2xl border border-slate-800">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="bg-brand-500/10 text-brand-400 text-[10px] font-mono px-2.5 py-0.5 rounded border border-brand-500/20 font-bold">
              HUMAN-IN-THE-LOOP APPROVAL WORKFLOW
            </span>
            <span className="text-xs text-slate-400 font-mono">Actionable Remediation</span>
          </div>
          <h1 className="text-xl font-bold text-white flex items-center gap-2">
            <Wrench className="w-5 h-5 text-brand-400" />
            <span>Remediation Planning & Execution</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Automated remediation plan generation with root cause diagnosis, owner routing, and mandatory human sign-off.
          </p>
        </div>
      </div>

      {/* Remediation Cards */}
      <div className="space-y-6">
        {tasks.map(task => (
          <div key={task.id} className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-5 shadow-xl">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 pb-3 border-b border-slate-800">
              <div className="flex items-center gap-3">
                <span className="font-mono text-xs font-bold text-brand-400 bg-brand-950 px-2.5 py-1 rounded border border-brand-500/30">
                  {task.id}
                </span>
                <span className="font-mono text-xs text-amber-400">Target Gap: {task.gapId}</span>
                <h2 className="text-base font-bold text-white">{task.title}</h2>
              </div>

              <span className={`px-2.5 py-1 rounded text-xs font-mono font-bold ${
                task.status === 'APPROVED' ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
              }`}>
                {task.status}
              </span>
            </div>

            {/* Problem & Root Cause Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono">
              <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
                <div className="text-slate-500 text-[10px] font-bold uppercase">IDENTIFIED PROBLEM</div>
                <div className="text-slate-200">{task.problem}</div>
              </div>

              <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
                <div className="text-slate-500 text-[10px] font-bold uppercase">DIAGNOSED ROOT CAUSE</div>
                <div className="text-rose-300">{task.rootCause}</div>
              </div>
            </div>

            {/* Action Plan Box */}
            <div className="p-4 bg-brand-950/20 border border-brand-500/30 rounded-xl space-y-2 text-xs">
              <div className="text-brand-300 font-mono font-bold uppercase text-[10px] flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                <span>RECOMMENDED REMEDIATION ACTION PLAN</span>
              </div>
              <p className="text-slate-100 font-medium leading-relaxed">{task.actionPlan}</p>
            </div>

            {/* Owner & Deadline Row */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-slate-950 p-3.5 rounded-xl border border-slate-800 text-xs font-mono">
              <div>
                <div className="text-slate-500 text-[10px]">ASSIGNED OWNER</div>
                <div className="text-white font-bold">{task.owner}</div>
              </div>
              <div>
                <div className="text-slate-500 text-[10px]">PRIORITY</div>
                <div className="text-rose-400 font-bold">{task.priority}</div>
              </div>
              <div>
                <div className="text-slate-500 text-[10px]">COMPLIANCE DEADLINE</div>
                <div className="text-sky-300">{task.deadline}</div>
              </div>
              <div>
                <div className="text-slate-500 text-[10px]">VERIFICATION METHOD</div>
                <div className="text-emerald-400 truncate">{task.verificationMethod}</div>
              </div>
            </div>

            {/* Action Bar */}
            <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
              <div className="text-[11px] text-slate-400 font-mono">
                {task.status === 'APPROVED' ? `Approved by ${task.approvedBy || 'Compliance Admin'}` : 'Human approval required before execution'}
              </div>

              {task.status !== 'APPROVED' && (
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => addToast('Plan Rejected', `Remediation plan ${task.id} returned for revision.`, 'warning')}
                    className="px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium"
                  >
                    Reject
                  </button>
                  <button
                    onClick={() => handleApprove(task.id)}
                    className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center gap-1.5 shadow-md shadow-emerald-600/20"
                  >
                    <Check className="w-4 h-4" />
                    <span>Approve Remediation Plan</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
