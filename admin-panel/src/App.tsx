import React, { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { StatCard } from './components/StatCard';
import { EarningChart } from './components/EarningChart';
import { Leaderboard } from './components/Leaderboard';
import { RecentActivity } from './components/RecentActivity';
import { HeatMapView } from './components/HeatMapView';
import { FleetView } from './components/FleetView';
import { CustomerDetails } from './components/CustomerDetails';
import { DriverDetails } from './components/DriverDetails';
import { SuperAppDashboard } from './components/SuperAppDashboard';
import { ZoneSetup } from './components/ZoneSetup';
import { AnalyticsView } from './components/AnalyticsView';
import {
  Clock,
  CheckCircle2,
  PlayCircle,
  XCircle,
  RotateCcw,
  Calendar,
  AlertTriangle,
  UserCheck,
  Car
} from 'lucide-react';

export default function App() {
  const [currentView, setCurrentView] = useState('Dashboard');
  const [selectedCustomerId, setSelectedCustomerId] = useState<string | null>(null);
  const [selectedDriverId, setSelectedDriverId] = useState<string | null>(null);

  const navigateToCustomer = (id: string) => {
    setSelectedCustomerId(id);
    setCurrentView('Customer Details');
  };

  const navigateToDriver = (id: string) => {
    setSelectedDriverId(id);
    setCurrentView('Driver Details');
  };

  const renderContent = () => {
    switch (currentView) {
      case 'Dashboard':
        return <SuperAppDashboard onNavigate={setCurrentView} />;
      case 'Analytics':
        return <AnalyticsView />;
      case 'Zone Setup':
        return <ZoneSetup />;
      case 'Heat Map':
        return <HeatMapView />;
      case 'Fleet View':
        return <FleetView onCustomerClick={navigateToCustomer} onDriverClick={navigateToDriver} />;
      case 'Customers':
        return <FleetView initialTab="Customers" onCustomerClick={navigateToCustomer} onDriverClick={navigateToDriver} />;
      case 'Drivers':
        return <FleetView initialTab="Drivers" onCustomerClick={navigateToCustomer} onDriverClick={navigateToDriver} />;
      case 'Customer Details':
        return <CustomerDetails customerId={selectedCustomerId || 'C-201'} onBack={() => setCurrentView('Fleet View')} />;
      case 'Driver Details':
        return <DriverDetails driverId={selectedDriverId || 'V-101'} onBack={() => setCurrentView('Fleet View')} />;
      default:
        return (
          <div className="flex flex-col items-center justify-center h-[60vh] text-slate-400">
            <AlertTriangle className="w-16 h-16 mb-4 opacity-20" />
            <h2 className="text-xl font-bold">View Under Construction</h2>
            <p className="text-sm">The {currentView} module is currently being implemented.</p>
            <button
              onClick={() => setCurrentView('Dashboard')}
              className="mt-6 text-primary font-bold hover:underline"
            >
              Back to Dashboard
            </button>
          </div>
        );
    }
  };

  return (
    <div className="flex min-h-screen bg-bg-main font-sans">
      <Sidebar currentView={currentView} onNavigate={setCurrentView} />

      <main className="flex-1 ml-64 flex flex-col min-w-0">
        <Header />

        <div className="p-8 h-[calc(100vh-80px)] overflow-y-auto">
          {renderContent()}
        </div>
      </main>
    </div>
  );
}
