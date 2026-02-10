
import React, { useState } from 'react';
import { View } from './types';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Dashboard from './pages/Dashboard';
import DriverManagement from './pages/DriverManagement';
import SurgePricing from './pages/SurgePricing';
import SupportDesk from './pages/SupportDesk';
import AutomationConfig from './pages/AutomationConfig';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<View>(View.DASHBOARD);

  const renderView = () => {
    switch (currentView) {
      case View.DASHBOARD: return <Dashboard />;
      case View.DRIVERS: return <DriverManagement />;
      case View.PRICING: return <SurgePricing />;
      case View.SUPPORT: return <SupportDesk />;
      case View.AUTOMATION: return <AutomationConfig />;
      default: return <Dashboard />;
    }
  };

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar currentView={currentView} setView={setCurrentView} />
      <div className="flex flex-col flex-1 overflow-hidden">
        <Header />
        <main className="flex-1 overflow-y-auto custom-scrollbar p-6">
          {renderView()}
        </main>
      </div>
    </div>
  );
};

export default App;
