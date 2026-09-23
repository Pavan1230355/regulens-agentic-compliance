import React, { useEffect, useState } from 'react';
import { api } from '../../services/api';
import { DashboardData } from '../../types';
import { useApp } from '../../context/AppContext';
import {
  FileText,
  CheckSquare,
  ShieldCheck,
  AlertTriangle,
  Flame,
  PieChart,
  Activity,
  CheckCircle2,
  Clock,
  ArrowRight,
  Sparkles,
  TrendingUp,
  FileCheck2
} from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell
} from 'recharts';

export const OverviewDashboard: React.FC = () => {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const { setActiveTab, setSelectedGapId, triggerDemoWorkflow } = useApp();

  useEffect(() => {
    api.getDashboard().then(res => {
      setData(res);
      setLoading(false);
    });
  }, []);

  if (loading || !data) {
    return (
      <div className="flex items-center justify-center h-96 text-slate-400 font-mono text-xs">
        <Activity className="w-5 h-5 animate-spin text-brand-500 mr-2" />
        Loading Executive Compliance Intelligence Dashboard...
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Executive Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-900 to-brand-950/40 p-6 rounded-2xl border border-slate-800 flex items-center justify-between shadow-xl">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="bg-brand-500/20 text-brand-300 text-[11px] font-mono font-semibold px-2.5 py-0.5 rounded-full border border-brand-500/30">
              REGULENS AGENTIC PLATFORM v1.0
            </span>
            <span className="text-slate-400 text-xs">ET AI Hackathon Demo</span>
          </div>
          <h1 className="text-2xl font-bold text-white tracking-tight">Enterprise Compliance Overview</h1>
          <p className="text-xs text-slate-400 mt-1 max-w-2xl">
            Real-time regulatory change tracking, obligation extraction, control mapping, evidence verification, and risk prioritization.
          </p>
        </div>
        <button
          onClick={triggerDemoWorkflow}
          className="px-4 py-2.5 rounded-xl bg-brand-600 hover:bg-brand-500 text-white font-semibold text-xs flex items-center gap-2 shadow-lg shadow-brand-600/30 transition-all border border-brand-400/30"
        >
          <Sparkles className="w-4 h-4 text-amber-300" />
          <span>Run 1-Click Agent Pipeline</span>
        </button>
      </div>

      {/* Top 6 KPI Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {/* KPI 1 */}
        <div className="bg-slate-900/90 border border-slate-800 p-4 rounded-xl shadow-sm hover:border-slate-700 transition-all">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-medium">Active Regulations</span>
            <FileText className="w-4 h-4 text-brand-400" />
          </div>
          <div className="text-2xl font-bold text-white font-mono">{data.kpis.activeRegulations}</div>
          <div className="text-[10px] text-emerald-400 font-mono mt-1 flex items-center gap-1">
            <TrendingUp className="w-3 h-3" />
            <span>+3 new updates</span>
          </div>
        </div>

        {/* KPI 2 */}
        <div className="bg-slate-900/90 border border-slate-800 p-4 rounded-xl shadow-sm hover:border-slate-700 transition-all">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-medium">Obligations</span>
            <CheckSquare className="w-4 h-4 text-sky-400" />
          </div>
          <div className="text-2xl font-bold text-white font-mono">{data.kpis.regulatoryObligations}</div>
          <div className="text-[10px] text-sky-400 font-mono mt-1">98% confidence score</div>
        </div>

        {/* KPI 3 */}
        <div className="bg-slate-900/90 border border-slate-800 p-4 rounded-xl shadow-sm hover:border-slate-700 transition-all">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-medium">Mapped Controls</span>
            <ShieldCheck className="w-4 h-4 text-indigo-400" />
          </div>
          <div className="text-2xl font-bold text-white font-mono">{data.kpis.mappedControls}</div>
          <div className="text-[10px] text-slate-400 font-mono mt-1">5 core business units</div>
        </div>

        {/* KPI 4 */}
        <div className="bg-slate-900/90 border border-slate-800 p-4 rounded-xl shadow-sm hover:border-slate-700 transition-all">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-medium">Compliance Gaps</span>
            <AlertTriangle className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-2xl font-bold text-amber-400 font-mono">{data.kpis.openComplianceGaps}</div>
          <div className="text-[10px] text-amber-400/80 font-mono mt-1">Requires remediation</div>
        </div>

        {/* KPI 5 */}
        <div className="bg-slate-900/90 border border-rose-500/20 bg-rose-950/10 p-4 rounded-xl shadow-sm hover:border-rose-500/40 transition-all">
          <div className="flex items-center justify-between text-rose-300 mb-2">
            <span className="text-xs font-medium">High Risk Gaps</span>
            <Flame className="w-4 h-4 text-rose-500" />
          </div>
          <div className="text-2xl font-bold text-rose-400 font-mono">{data.kpis.highRiskGaps}</div>
          <div className="text-[10px] text-rose-400 font-mono mt-1">Risk Score &gt; 75/100</div>
        </div>

        {/* KPI 6 */}
        <div className="bg-slate-900/90 border border-slate-800 p-4 rounded-xl shadow-sm hover:border-slate-700 transition-all">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-medium">Evidence Coverage</span>
            <FileCheck2 className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-2xl font-bold text-emerald-400 font-mono">{data.kpis.evidenceCoverage}</div>
          <div className="text-[10px] text-slate-400 font-mono mt-1">14,420 audit records</div>
        </div>
      </div>

      {/* Middle Section: Workflow Status + Risk Distribution Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Agentic Workflow Chain */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 flex flex-col justify-between shadow-sm">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Activity className="w-4 h-4 text-brand-400" />
                <h2 className="text-sm font-bold text-white uppercase tracking-wider font-mono">Agentic Workflow Chain</h2>
              </div>
              <span className="text-[10px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2 py-0.5 rounded font-mono">
                AUTONOMOUS
              </span>
            </div>

            <div className="space-y-2.5">
              {data.agenticWorkflowStatus.map((step, idx) => (
                <div key={idx} className="flex items-center justify-between bg-slate-950 p-2.5 rounded-lg border border-slate-800/80">
                  <div className="flex items-center gap-2.5 text-xs font-medium text-slate-200">
                    <span className="w-5 h-5 rounded-full bg-slate-800 text-slate-400 flex items-center justify-center text-[10px] font-mono">
                      {idx + 1}
                    </span>
                    <span>{step.name}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-emerald-400 text-xs font-mono">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Completed</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
            <span>Last full agent execution</span>
            <span className="font-mono text-slate-300">Today, 10:42 AM</span>
          </div>
        </div>

        {/* Compliance Risk Distribution Chart */}
        <div className="lg:col-span-2 bg-slate-900 border border-slate-800 rounded-2xl p-5 flex flex-col justify-between shadow-sm">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <PieChart className="w-4 h-4 text-brand-400" />
                <h2 className="text-sm font-bold text-white uppercase tracking-wider font-mono">Compliance Risk Severity Distribution</h2>
              </div>
              <button
                onClick={() => setActiveTab('risk')}
                className="text-xs text-brand-400 hover:text-brand-300 flex items-center gap-1 font-medium"
              >
                <span>View Risk Analysis</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>

            <div className="h-56">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data.riskDistribution} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <XAxis dataKey="level" tick={{ fill: '#94a3b8', fontSize: 11 }} />
                  <YAxis tick={{ fill: '#94a3b8', fontSize: 11 }} />
                  <Tooltip
                    contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '8px', color: '#f8fafc' }}
                    itemStyle={{ color: '#38bdf8' }}
                  />
                  <Bar dataKey="count" radius={[6, 6, 0, 0]}>
                    {data.riskDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="grid grid-cols-4 gap-2 pt-3 border-t border-slate-800 text-center">
            {data.riskDistribution.map((r, i) => (
              <div key={i} className="bg-slate-950 p-2 rounded-lg border border-slate-800">
                <div className="text-[10px] text-slate-400 uppercase font-mono">{r.level}</div>
                <div className="text-base font-bold font-mono text-white" style={{ color: r.color }}>{r.count} Gaps</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Priority Findings & Agent Activity Ticker */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Priority Findings Table */}
        <div className="lg:col-span-2 bg-slate-900 border border-slate-800 rounded-2xl p-5">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-amber-400" />
              <h2 className="text-sm font-bold text-white uppercase tracking-wider font-mono">Priority Compliance Findings</h2>
            </div>
            <button
              onClick={() => setActiveTab('gaps')}
              className="text-xs text-brand-400 hover:text-brand-300 flex items-center gap-1"
            >
              <span>View Gap Register</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-950 text-slate-400 uppercase font-mono text-[10px] border-b border-slate-800">
                <tr>
                  <th className="p-3">Gap ID</th>
                  <th className="p-3">Requirement</th>
                  <th className="p-3">Control</th>
                  <th className="p-3">Risk Level</th>
                  <th className="p-3">Owner</th>
                  <th className="p-3 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {data.priorityFindings.map(gap => (
                  <tr key={gap.id} className="hover:bg-slate-800/40 transition-colors">
                    <td className="p-3 font-mono font-bold text-amber-400">{gap.id}</td>
                    <td className="p-3 text-slate-200 font-medium max-w-xs truncate">{gap.title}</td>
                    <td className="p-3 font-mono text-slate-400">{gap.controlId}</td>
                    <td className="p-3">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold ${
                        gap.riskLevel === 'HIGH' ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30' : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                      }`}>
                        {gap.riskLevel} ({gap.riskScore}/100)
                      </span>
                    </td>
                    <td className="p-3 text-slate-400">{gap.owner}</td>
                    <td className="p-3 text-right">
                      <button
                        onClick={() => {
                          setSelectedGapId(gap.id);
                          setActiveTab('gaps');
                        }}
                        className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 text-[11px] font-medium"
                      >
                        Inspect
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Live Agent Activity Ticker */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Activity className="w-4 h-4 text-emerald-400 animate-pulse" />
                <h2 className="text-sm font-bold text-white uppercase tracking-wider font-mono">Recent Agent Trace Activity</h2>
              </div>
              <button
                onClick={() => setActiveTab('agents')}
                className="text-xs text-brand-400 hover:text-brand-300"
              >
                Full Log
              </button>
            </div>

            <div className="space-y-3 max-h-72 overflow-y-auto pr-1">
              {data.recentActivity.map((act, i) => (
                <div key={i} className="p-3 rounded-lg bg-slate-950 border border-slate-800/80 space-y-1">
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="font-mono text-brand-400 font-semibold">{act.agent}</span>
                    <span className="font-mono text-slate-500">{act.timestamp}</span>
                  </div>
                  <div className="text-xs text-slate-200 font-medium">{act.action}</div>
                  <div className="text-[11px] text-slate-400 truncate">{act.output}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between text-[11px] text-slate-500">
            <span>Audit trail immutability</span>
            <span className="text-emerald-400 font-mono">VERIFIED</span>
          </div>
        </div>
      </div>
    </div>
  );
};
