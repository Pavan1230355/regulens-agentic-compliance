import React from 'react';
import { useApp } from '../../context/AppContext';
import { Search, Bell, ShieldCheck, UserCheck } from 'lucide-react';

export const Header: React.FC = () => {
  const { userRole, setUserRole } = useApp();

  return (
    <header className="h-16 bg-slate-900/80 backdrop-blur border-b border-slate-800 px-6 flex items-center justify-between sticky top-0 z-30">
      {/* Search Input */}
      <div className="relative w-96">
        <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          placeholder="Search regulations, obligations, controls, evidence, or gaps (e.g. CDD-07)..."
          className="w-full bg-slate-950 border border-slate-800 rounded-lg pl-9 pr-4 py-1.5 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-brand-500 transition-colors"
        />
      </div>

      {/* Right Tools & Profile */}
      <div className="flex items-center gap-4">
        {/* AI Agent Online Indicator */}
        <div className="flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 rounded-full text-xs font-mono text-emerald-400">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
          <span>8 AGENTS ONLINE</span>
        </div>

        {/* Notifications */}
        <button className="relative p-2 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-slate-800 transition-colors">
          <Bell className="w-4 h-4" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-rose-500"></span>
        </button>

        {/* Role Selector */}
        <div className="flex items-center gap-2 bg-slate-950 border border-slate-800 px-3 py-1 rounded-lg">
          <UserCheck className="w-4 h-4 text-brand-400" />
          <select
            value={userRole}
            onChange={(e) => setUserRole(e.target.value as any)}
            className="bg-transparent text-xs text-slate-200 font-medium focus:outline-none cursor-pointer"
          >
            <option value="Compliance Admin" className="bg-slate-900 text-slate-200">Compliance Admin</option>
            <option value="Compliance Analyst" className="bg-slate-900 text-slate-200">Compliance Analyst</option>
            <option value="Auditor" className="bg-slate-900 text-slate-200">External Auditor</option>
            <option value="Management" className="bg-slate-900 text-slate-200">Executive Management</option>
          </select>
        </div>
      </div>
    </header>
  );
};
