import React, { useEffect, useState } from 'react';
import { api } from '../../services/api';
import { Obligation } from '../../types';
import { useApp } from '../../context/AppContext';
import {
  CheckSquare,
  Sparkles,
  HelpCircle,
  X,
  FileText,
  ShieldCheck,
  Building,
  Calendar,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';

export const ObligationsPage: React.FC = () => {
  const [obligations, setObligations] = useState<Obligation[]>([]);
  const [explanationModal, setExplanationModal] = useState<any | null>(null);
  const [loadingModal, setLoadingModal] = useState<boolean>(false);
  const { setSelectedObligationId } = useApp();

  useEffect(() => {
    api.getObligations().then(data => setObligations(data));
  }, []);

  const handleExplain = async (id: string) => {
    setLoadingModal(true);
    setSelectedObligationId(id);
    const result = await api.explainObligation(id);
    setExplanationModal(result);
    setLoadingModal(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-slate-900 p-6 rounded-2xl border border-slate-800">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="bg-sky-500/10 text-sky-400 text-[10px] font-mono px-2.5 py-0.5 rounded border border-sky-500/20 font-bold">
              AI EXTRACTION LAYER
            </span>
            <span className="text-xs text-slate-400 font-mono">187 Obligations Cataloged</span>
          </div>
          <h1 className="text-xl font-bold text-white flex items-center gap-2">
            <CheckSquare className="w-5 h-5 text-sky-400" />
            <span>Obligation Intelligence & Extraction</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Structured regulatory obligation extraction with applicability scoping and confidence scoring.
          </p>
        </div>
      </div>

      {/* Obligations Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-950 text-slate-400 uppercase font-mono text-[10px] border-b border-slate-800">
              <tr>
                <th className="p-4">Obligation ID</th>
                <th className="p-4">Requirement</th>
                <th className="p-4">Applicability</th>
                <th className="p-4">Source Clause</th>
                <th className="p-4">Confidence</th>
                <th className="p-4">Mapped Controls</th>
                <th className="p-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {obligations.map(obl => (
                <tr key={obl.id} className="hover:bg-slate-800/40 transition-colors">
                  <td className="p-4 font-mono font-bold text-brand-400">{obl.id}</td>
                  <td className="p-4 font-medium text-slate-100 max-w-sm">{obl.requirement}</td>
                  <td className="p-4 text-slate-300 font-mono">{obl.applicability}</td>
                  <td className="p-4 font-mono text-slate-400 text-[11px]">{obl.source}</td>
                  <td className="p-4 font-mono">
                    <span className="text-emerald-400 font-bold">{(obl.confidence * 100).toFixed(0)}%</span>
                  </td>
                  <td className="p-4 font-mono">
                    <div className="flex gap-1 flex-wrap">
                      {obl.mappedControls.map(c => (
                        <span key={c} className="px-2 py-0.5 rounded bg-slate-800 text-slate-300 text-[10px]">
                          {c}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="p-4 text-right">
                    <button
                      onClick={() => handleExplain(obl.id)}
                      className="px-3 py-1.5 rounded-lg bg-brand-600/20 hover:bg-brand-600/30 text-brand-300 text-xs font-semibold border border-brand-500/30 flex items-center gap-1.5 ml-auto"
                    >
                      <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                      <span>Explain Obligation</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* "Explain Obligation" Modal */}
      {explanationModal && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-2xl w-full p-6 space-y-6 shadow-2xl relative">
            <button
              onClick={() => setExplanationModal(null)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-brand-600/20 border border-brand-500/30 flex items-center justify-center text-brand-400">
                <Sparkles className="w-4 h-4 text-amber-300" />
              </div>
              <div>
                <h2 className="text-base font-bold text-white">AI Obligation Explanation & Citation</h2>
                <div className="text-xs text-brand-400 font-mono font-bold">{explanationModal.obligationId}</div>
              </div>
            </div>

            <div className="space-y-4 text-xs">
              <div className="p-3.5 bg-slate-950 rounded-xl border border-slate-800">
                <div className="text-slate-500 font-mono text-[10px] uppercase mb-1">REGULATORY REQUIREMENT</div>
                <div className="text-slate-100 font-medium text-sm">{explanationModal.requirement}</div>
              </div>

              <div className="p-4 bg-brand-950/20 border border-brand-500/30 rounded-xl space-y-2">
                <div className="text-brand-300 font-mono font-bold uppercase text-[10px] flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                  <span>AI REASONING & LEGAL INTERPRETATION SUMMARY</span>
                </div>
                <p className="text-slate-200 leading-relaxed">
                  {explanationModal.reasoningSummary}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3 font-mono">
                <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
                  <div className="text-slate-500 text-[10px]">SOURCE CITATION</div>
                  <div className="text-sky-300 font-bold">{explanationModal.source}</div>
                </div>

                <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
                  <div className="text-slate-500 text-[10px]">CONFIDENCE SCORE</div>
                  <div className="text-emerald-400 font-bold">{(explanationModal.confidence * 100).toFixed(0)}% Certainty</div>
                </div>
              </div>

              <div className="space-y-2">
                <div className="text-slate-400 font-mono text-[10px] uppercase">APPLICABLE BUSINESS UNITS</div>
                <div className="flex gap-2 flex-wrap">
                  {explanationModal.applicableBusinessUnits?.map((unit: string) => (
                    <span key={unit} className="px-2.5 py-1 rounded-md bg-slate-800 text-slate-200 font-mono">
                      {unit}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-800 flex justify-end">
              <button
                onClick={() => setExplanationModal(null)}
                className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium"
              >
                Close Explanation
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
