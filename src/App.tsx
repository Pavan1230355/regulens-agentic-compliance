import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Layout } from './components/layout/Layout';
import { OverviewDashboard } from './components/dashboard/OverviewDashboard';
import { RegulationsPage } from './components/regulations/RegulationsPage';
import { ChangeIntelligencePage } from './components/changes/ChangeIntelligencePage';
import { ObligationsPage } from './components/obligations/ObligationsPage';
import { ControlsPage } from './components/controls/ControlsPage';
import { EvidenceAssessmentPage } from './components/evidence/EvidenceAssessmentPage';
import { GapRegisterPage } from './components/gaps/GapRegisterPage';
import { RiskAnalysisPage } from './components/risk/RiskAnalysisPage';
import { RemediationPage } from './components/remediation/RemediationPage';
import { ImpactSimulatorPage } from './components/simulator/ImpactSimulatorPage';
import { AgentActivityPage } from './components/agents/AgentActivityPage';
import { ReportsPage } from './components/reports/ReportsPage';
import { DemoWorkflowModal } from './components/demo/DemoWorkflowModal';

const MainContent: React.FC = () => {
  const { activeTab } = useApp();

  switch (activeTab) {
    case 'overview':
      return <OverviewDashboard />;
    case 'regulations':
      return <RegulationsPage />;
    case 'changes':
      return <ChangeIntelligencePage />;
    case 'obligations':
      return <ObligationsPage />;
    case 'controls':
      return <ControlsPage />;
    case 'evidence':
      return <EvidenceAssessmentPage />;
    case 'gaps':
      return <GapRegisterPage />;
    case 'risk':
      return <RiskAnalysisPage />;
    case 'remediation':
      return <RemediationPage />;
    case 'simulator':
      return <ImpactSimulatorPage />;
    case 'agents':
      return <AgentActivityPage />;
    case 'reports':
      return <ReportsPage />;
    default:
      return <OverviewDashboard />;
  }
};

export function App() {
  return (
    <AppProvider>
      <Layout>
        <MainContent />
        <DemoWorkflowModal />
      </Layout>
    </AppProvider>
  );
}

export default App;
