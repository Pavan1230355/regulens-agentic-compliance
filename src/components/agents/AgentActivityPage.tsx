import React, { useEffect, useState } from 'react';
import { api } from '../../services/api';
import { AgentRun } from '../../types';
import { useApp } from '../../context/AppContext';
import {
  Activity,
  CheckCircle2,
  Clock,
  Terminal,
  Sparkles,
  Bot,
  BrainCircuit,
  ShieldCheck,
  CheckSquare
} from 'lucide-react';

export const AgentActivityPage: React.FC = () => {
  const [activities, setActivities] = useState<AgentRun[]>([]);

  useEffect(() => {
    api.getAgentActivity().then(data => setActivities(data));
  }, []);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-slate-900 p-6 rounded-2xl border border-slate-800">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="bg-emerald-500/10 text-emerald-400 text-[10px] font-mono px-2.5 py-0.5 rounded border border-emerald-500/20 font-bold">
              REAL-TIME EXECUTION AUDIT TRAIL
            </span>
            <span className="text-xs text-slate-400 font-mono">8 Specialized Agents</span>
          </div>
          <h1 className="text-xl font-bold text-white flex items-center gap-2">
            <Activity className="w-5 h-5 text-emerald-400" />
            <span>Agent Activity & Execution Trace</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Immutable log of multi-agent execution steps, input prompts, JSON outputs, confidence scores, and timestamps.
          </p>
        </div>
      </div>

      {/* Trace Activity Feed */}
      <div className="space-y-3 font-mono text-xs">
        {activities.map((act, index) => (
          <div key={act.id || index} className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-3 shadow-sm hover:border-slate-700 transition-all">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-slate-800/80">
              <div className="flex items-center gap-2.5">
                <span className="w-6 h-6 rounded-lg bg-brand-600/20 border border-brand-500/30 flex items-center justify-center text-brand-400 font-bold text-[10px]">
                  #{index + 1}
                </span>
                <span className="font-bold text-brand-300 text-sm">{act.agent}</span>
                <span className="text-slate-500 text-[10px]">• {act.action}</span>
              </div>

              <div className="flex items-center gap-3 text-[11px]">
                <span className="text-slate-500">{act.timestamp}</span>
                <span className="text-emerald-400 font-bold">Confidence: {(act.confidence * 100).toFixed(0)}%</span>
                <span className="bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded text-[10px] border border-emerald-500/30">
                  {act.status}
                </span>
              </div>
            </div>

            {/* Input & Output Box */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-[11px]">
              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800/80 space-y-1">
                <div className="text-slate-500 uppercase text-[10px]">AGENT INPUT DATA</div>
                <div className="text-slate-300 truncate">{act.input}</div>
              </div>

              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800/80 space-y-1">
                <div className="text-brand-400 uppercase text-[10px]">STRUCTURED AGENT OUTPUT</div>
                <div className="text-slate-100 font-medium">{act.output}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
