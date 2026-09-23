import React, { createContext, useContext, useState, useEffect } from 'react';
import { NavigationTab } from '../types';

interface ToastNotification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
}

interface AppContextType {
  activeTab: NavigationTab;
  setActiveTab: (tab: NavigationTab) => void;
  selectedRegulationId: string;
  setSelectedRegulationId: (id: string) => void;
  selectedGapId: string;
  setSelectedGapId: (id: string) => void;
  selectedObligationId: string;
  setSelectedObligationId: (id: string) => void;
  userRole: 'Compliance Admin' | 'Compliance Analyst' | 'Auditor' | 'Management';
  setUserRole: (role: any) => void;
  demoModalOpen: boolean;
  setDemoModalOpen: (open: boolean) => void;
  toasts: ToastNotification[];
  addToast: (title: string, message: string, type?: ToastNotification['type']) => void;
  removeToast: (id: string) => void;
  triggerDemoWorkflow: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activeTab, setActiveTab] = useState<NavigationTab>('overview');
  const [selectedRegulationId, setSelectedRegulationId] = useState<string>('REG-CDD-03');
  const [selectedGapId, setSelectedGapId] = useState<string>('GAP-1042');
  const [selectedObligationId, setSelectedObligationId] = useState<string>('OBL-041');
  const [userRole, setUserRole] = useState<'Compliance Admin' | 'Compliance Analyst' | 'Auditor' | 'Management'>('Compliance Admin');
  const [demoModalOpen, setDemoModalOpen] = useState<boolean>(false);
  const [toasts, setToasts] = useState<ToastNotification[]>([]);

  const addToast = (title: string, message: string, type: ToastNotification['type'] = 'info') => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts(prev => [...prev, { id, title, message, type }]);
    setTimeout(() => removeToast(id), 5000);
  };

  const removeToast = (id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  const triggerDemoWorkflow = () => {
    setDemoModalOpen(true);
  };

  return (
    <AppContext.Provider
      value={{
        activeTab,
        setActiveTab,
        selectedRegulationId,
        setSelectedRegulationId,
        selectedGapId,
        setSelectedGapId,
        selectedObligationId,
        setSelectedObligationId,
        userRole,
        setUserRole,
        demoModalOpen,
        setDemoModalOpen,
        toasts,
        addToast,
        removeToast,
        triggerDemoWorkflow
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
};
