import React from 'react';
import { Sidebar } from './Sidebar';
import { Header } from './Header';
import { useApp } from '../../context/AppContext';
import { AlertCircle, CheckCircle, Info, XCircle, X } from 'lucide-react';

export const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { toasts, removeToast } = useApp();

  return (
    <div className="flex h-screen bg-slate-950 text-slate-100 overflow-hidden">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <Header />
        <main className="flex-1 overflow-y-auto p-6">
          {children}
        </main>
      </div>

      {/* Toast Notification Container */}
      <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-2 max-w-sm">
        {toasts.map(toast => (
          <div
            key={toast.id}
            className={`p-4 rounded-xl border shadow-xl flex items-start gap-3 backdrop-blur ${
              toast.type === 'success' ? 'bg-emerald-950/80 border-emerald-500/30 text-emerald-200' :
              toast.type === 'error' ? 'bg-rose-950/80 border-rose-500/30 text-rose-200' :
              toast.type === 'warning' ? 'bg-amber-950/80 border-amber-500/30 text-amber-200' :
              'bg-slate-900/90 border-slate-700 text-slate-200'
            }`}
          >
            {toast.type === 'success' && <CheckCircle className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />}
            {toast.type === 'error' && <XCircle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />}
            {toast.type === 'warning' && <AlertCircle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />}
            {toast.type === 'info' && <Info className="w-5 h-5 text-brand-400 shrink-0 mt-0.5" />}
            <div className="flex-1 text-xs">
              <div className="font-semibold text-sm mb-0.5">{toast.title}</div>
              <div>{toast.message}</div>
            </div>
            <button onClick={() => removeToast(toast.id)} className="text-slate-400 hover:text-white">
              <X className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
