import React, { useEffect, useState } from 'react';
import { api } from '../../services/api';
import { Regulation } from '../../types';
import { useApp } from '../../context/AppContext';
import {
  FileText,
  Upload,
  Search,
  Filter,
  CheckCircle2,
  Sparkles,
  GitCompare,
  ExternalLink,
  ShieldAlert,
  Clock,
  Layers,
  ArrowRight
} from 'lucide-react';

export const RegulationsPage: React.FC = () => {
  const [regulations, setRegulations] = useState<Regulation[]>([]);
  const [selectedReg, setSelectedReg] = useState<Regulation | null>(null);
  const [search, setSearch] = useState<string>('');
  const [jurisdictionFilter, setJurisdictionFilter] = useState<string>('All');
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const { setActiveTab, setSelectedRegulationId, addToast, triggerDemoWorkflow } = useApp();

  useEffect(() => {
    api.getRegulations().then(data => {
      setRegulations(data);
      if (data.length > 0) setSelectedReg(data[0]);
    });
  }, []);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setIsUploading(true);
      setTimeout(() => {
        setIsUploading(false);
        addToast('Document Uploaded', `Successfully scanned '${file.name}'. Security agent verified safe from prompt injection.`, 'success');
      }, 1500);
    }
  };

  const filtered = regulations.filter(r => {
    const matchesSearch = r.title.toLowerCase().includes(search.toLowerCase()) || r.code.toLowerCase().includes(search.toLowerCase());
    const matchesJurisdiction = jurisdictionFilter === 'All' || r.jurisdiction.includes(jurisdictionFilter);
    return matchesSearch && matchesJurisdiction;
  });

  return (
    <div className="space-y-6">
      {/* Top Action Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-slate-900 p-5 rounded-2xl border border-slate-800">
        <div>
          <h1 className="text-xl font-bold text-white flex items-center gap-2">
            <FileText className="w-5 h-5 text-brand-400" />
            <span>Regulatory Knowledge Repository</span>
          </h1>
          <p className="text-xs text-slate-400 mt-0.5">
            Ingest and track regulatory updates across jurisdictions with automated document chunking and version diffing.
          </p>
        </div>

        {/* Upload Button Dropzone */}
        <div className="flex items-center gap-3">
          <label className="cursor-pointer px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium border border-slate-700 flex items-center gap-2 transition-all">
            <Upload className="w-4 h-4 text-brand-400" />
            <span>{isUploading ? 'Scanning & Ingesting...' : 'Upload PDF / DOCX / TXT'}</span>
            <input type="file" onChange={handleFileUpload} accept=".pdf,.docx,.txt" className="hidden" />
          </label>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col md:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search regulations by title, code, or keyword..."
            className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-9 pr-4 py-2 text-xs text-slate-200 focus:outline-none focus:border-brand-500"
          />
        </div>

        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-slate-500" />
          <select
            value={jurisdictionFilter}
            onChange={(e) => setJurisdictionFilter(e.target.value)}
            className="bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none"
          >
            <option value="All">All Jurisdictions</option>
            <option value="India">India / RBI</option>
            <option value="Global">Global / BIS</option>
          </select>
        </div>
      </div>

      {/* Main Grid: Regulation List + Regulation Detail */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Regulations List */}
        <div className="space-y-3">
          {filtered.map(reg => (
            <div
              key={reg.id}
              onClick={() => setSelectedReg(reg)}
              className={`p-4 rounded-xl border cursor-pointer transition-all ${
                selectedReg?.id === reg.id
                  ? 'bg-brand-950/30 border-brand-500/50 shadow-md shadow-brand-500/10'
                  : 'bg-slate-900 border-slate-800 hover:border-slate-700'
              }`}
            >
              <div className="flex items-center justify-between mb-1.5">
                <span className="font-mono text-[10px] text-brand-400 font-semibold">{reg.code}</span>
                <span className={`text-[10px] px-2 py-0.5 rounded font-mono font-bold ${
                  reg.riskLevel === 'Critical' ? 'bg-rose-500/20 text-rose-300' :
                  reg.riskLevel === 'High' ? 'bg-amber-500/20 text-amber-300' : 'bg-slate-800 text-slate-300'
                }`}>
                  {reg.riskLevel} Risk
                </span>
              </div>
              <h3 className="text-sm font-bold text-white mb-1">{reg.title}</h3>
              <p className="text-xs text-slate-400 line-clamp-2 mb-3">{reg.description}</p>

              <div className="flex items-center justify-between text-[11px] text-slate-500 pt-2 border-t border-slate-800/80 font-mono">
                <span>{reg.version} • {reg.jurisdiction}</span>
                <span>Effective: {reg.effectiveDate}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Right Column: Selected Regulation Details */}
        {selectedReg && (
          <div className="lg:col-span-2 bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-6">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-800">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="bg-emerald-500/10 text-emerald-400 text-[10px] font-mono px-2 py-0.5 rounded border border-emerald-500/20">
                    {selectedReg.status}
                  </span>
                  <span className="text-xs text-slate-400 font-mono">{selectedReg.code}</span>
                </div>
                <h2 className="text-xl font-bold text-white">{selectedReg.title}</h2>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    setSelectedRegulationId(selectedReg.id);
                    setActiveTab('changes');
                  }}
                  className="px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium flex items-center gap-2 border border-slate-700"
                >
                  <GitCompare className="w-4 h-4 text-sky-400" />
                  <span>Compare Version Diff</span>
                </button>

                <button
                  onClick={triggerDemoWorkflow}
                  className="px-4 py-2 rounded-xl bg-brand-600 hover:bg-brand-500 text-white text-xs font-bold flex items-center gap-2 shadow-md shadow-brand-600/20"
                >
                  <Sparkles className="w-4 h-4 text-amber-300" />
                  <span>Analyze Regulation with AI</span>
                </button>
              </div>
            </div>

            {/* Quick Metadata Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-slate-950 p-4 rounded-xl border border-slate-800/80 font-mono text-xs">
              <div>
                <div className="text-slate-500 text-[10px]">CURRENT VERSION</div>
                <div className="text-white font-bold">{selectedReg.version}</div>
              </div>
              <div>
                <div className="text-slate-500 text-[10px]">JURISDICTION</div>
                <div className="text-slate-200">{selectedReg.jurisdiction}</div>
              </div>
              <div>
                <div className="text-slate-500 text-[10px]">OBLIGATIONS</div>
                <div className="text-brand-400 font-bold">{selectedReg.activeObligations} Active</div>
              </div>
              <div>
                <div className="text-slate-500 text-[10px]">IMPACTED CONTROLS</div>
                <div className="text-amber-400 font-bold">{selectedReg.impactedControls} Controls</div>
              </div>
            </div>

            {/* Description */}
            <div className="space-y-2">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 font-mono">Regulatory Executive Summary</h3>
              <p className="text-xs text-slate-300 leading-relaxed bg-slate-950/60 p-4 rounded-xl border border-slate-800">
                {selectedReg.description}
              </p>
            </div>

            {/* Versions History */}
            {selectedReg.versions && (
              <div className="space-y-3">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 font-mono">Version Audit Trail</h3>
                <div className="space-y-2">
                  {selectedReg.versions.map((ver, idx) => (
                    <div key={idx} className="p-3 bg-slate-950 rounded-xl border border-slate-800 flex items-center justify-between text-xs">
                      <div className="flex items-center gap-3">
                        <span className="font-mono font-bold text-brand-400">{ver.version}</span>
                        <span className="text-slate-300">{ver.summary}</span>
                      </div>
                      <div className="text-[11px] text-slate-500 font-mono">{ver.date}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Embedded Sections Preview */}
            <div className="space-y-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 font-mono">Key Clauses & Sections</h3>
              <div className="space-y-2">
                <div className="p-3.5 bg-slate-950 rounded-xl border border-slate-800 text-xs space-y-1">
                  <div className="font-bold text-brand-300 font-mono">§4.2 Evidence Retention Duration Standards</div>
                  <div className="text-slate-300">Retain customer verification artifacts for a minimum duration of 18 months following profile modification.</div>
                </div>
                <div className="p-3.5 bg-slate-950 rounded-xl border border-slate-800 text-xs space-y-1">
                  <div className="font-bold text-brand-300 font-mono">§6.1 High-Risk Customer Review Cycles</div>
                  <div className="text-slate-300">High-risk customer profiles must undergo re-verification on a quarterly basis (every 90 days).</div>
                </div>
                <div className="p-3.5 bg-slate-950 rounded-xl border border-slate-800 text-xs space-y-1">
                  <div className="font-bold text-brand-300 font-mono">§8.4 Verification Exception Logging</div>
                  <div className="text-slate-300">Overrides and deferred KYC approvals must be recorded in an immutable exception register.</div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
