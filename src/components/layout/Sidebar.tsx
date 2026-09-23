import React from 'react';
import { useApp } from '../../context/AppContext';
import { NavigationTab } from '../../types';
import {
  LayoutDashboard,
  FileText,
  GitCompare,
  CheckSquare,
  ShieldCheck,
  FileSpreadsheet,
  AlertTriangle,
  BrainCircuit,
  Wrench,
  SlidersHorizontal,
  Activity,
  BarChart3,
  Sparkles
} from 'lucide-react';

export const Sidebar: React.FC = () => {
  const { activeTab, setActiveTab, triggerDemoWorkflow } = useApp();

  const navItems: { id: NavigationTab; label: string; icon: React.ReactNode; badge?: string }[] = [
    { id: 'overview', label: 'Overview', icon: <LayoutDashboard className="w-4 h-4" /> },
    { id: 'regulations', label: 'Regulations', icon: <FileText className="w-4 h-4" />, badge: '24' },
    { id: 'changes', label: 'Regulatory Changes', icon: <GitCompare className="w-4 h-4" />, badge: '3 Critical' },
    { id: 'obligations', label: 'Obligations', icon: <CheckSquare className="w-4 h-4" />, badge: '187' },
    { id: 'controls', label: 'Controls & Evidence', icon: <ShieldCheck className="w-4 h-4" />, badge: '143' },
    { id: 'evidence', label: 'Evidence Assessment', icon: <FileSpreadsheet className="w-4 h-4" /> },
    { id: 'gaps', label: 'Compliance Gaps', icon: <AlertTriangle className="w-4 h-4" />, badge: '12' },
    { id: 'risk', label: 'Risk Analysis', icon: <BrainCircuit className="w-4 h-4" /> },
    { id: 'remediation', label: 'Remediation', icon: <Wrench className="w-4 h-4" /> },
    { id: 'simulator', label: 'Impact Simulator', icon: <SlidersHorizontal className="w-4 h-4" />, badge: 'What-If' },
    { id: 'agents', label: 'Agent Activity', icon: <Activity className="w-4 h-4" /> },
    { id: 'reports', label: 'Reports', icon: <BarChart3 className="w-4 h-4" /> }
  ];

  return (
    <aside className="w-64 bg-slate-900 border-r border-slate-800 flex flex-col justify-between select-none">
      <div>
        {/* Logo Header */}
        <div className="p-5 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-gradient-to-tr from-brand-600 to-sky-400 flex items-center justify-center text-white font-bold shadow-lg shadow-brand-500/20">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="font-bold text-lg tracking-wider text-white">REGULENS</div>
              <div className="text-[10px] tracking-widest text-brand-400 font-mono uppercase">Agentic Compliance</div>
            </div>
          </div>
        </div>

        {/* Demo Mode Button */}
        <div className="px-3 py-3">
          <button
            onClick={triggerDemoWorkflow}
            className="w-full py-2.5 px-3 rounded-lg bg-gradient-to-r from-brand-600 to-indigo-600 hover:from-brand-500 hover:to-indigo-500 text-white font-medium text-xs flex items-center justify-center gap-2 shadow-md shadow-brand-600/20 transition-all border border-brand-400/30 group"
          >
            <Sparkles className="w-4 h-4 text-amber-300 animate-pulse group-hover:rotate-12 transition-transform" />
            <span>Launch Hackathon Demo</span>
          </button>
        </div>

        {/* Navigation List */}
        <nav className="px-2 py-2 space-y-0.5 max-h-[calc(100vh-220px)] overflow-y-auto">
          {navItems.map(item => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-md text-xs font-medium transition-colors ${
                  isActive
                    ? 'bg-brand-600/20 text-brand-300 border-l-2 border-brand-500 font-semibold'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <span className={isActive ? 'text-brand-400' : 'text-slate-500'}>{item.icon}</span>
                  <span>{item.label}</span>
                </div>
                {item.badge && (
                  <span
                    className={`text-[10px] px-1.5 py-0.5 rounded font-mono ${
                      item.badge.includes('Critical') || item.badge === '12'
                        ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                        : item.badge === 'What-If'
                        ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                        : 'bg-slate-800 text-slate-400'
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Footer Info */}
      <div className="p-4 border-t border-slate-800 text-[11px] text-slate-500 space-y-1">
        <div className="flex items-center justify-between text-slate-400 font-mono">
          <span>ET AI Hackathon</span>
          <span className="text-emerald-400">F3 / D2</span>
        </div>
        <div>Problem 1: Banking Regulations</div>
      </div>
    </aside>
  );
};
