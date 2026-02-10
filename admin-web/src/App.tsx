import React, { useEffect } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import AppLayout from './components/layout/AppLayout';
import { GoogleMapsProvider } from './components/maps/GoogleMapsProvider';
import { Dashboard } from './pages/Dashboard';
import { Financials } from './pages/Financials';
import { Login } from './pages/Login';
import { Promotions } from './pages/Promotions';
import { useAuthStore } from './stores/authStore';

import { AccessRoles } from './pages/AccessRoles';
import { AuditLogs } from './pages/AuditLogs';
import { AutomatedSupport } from './pages/AutomatedSupport';
import { DocumentManagement } from './pages/DocumentManagement';
import { FleetManagement } from './pages/FleetManagement';
import { Growth } from './pages/Growth';
import { LiveNetwork } from './pages/LiveNetwork';
import { Payouts } from './pages/Payouts';
import { PerformanceInsight } from './pages/PerformanceInsight';
import { PriceInsights } from './pages/PriceInsights';
import { PriceSurge } from './pages/PriceSurge';
import { ReviewRatings } from './pages/ReviewRatings';
import { SafetyCompliance } from './pages/SafetyCompliance';
import { Settings } from './pages/Settings';
import { StrategyHub } from './pages/StrategyHub';
import { SystemHealth } from './pages/SystemHealth';
import { SystemRules } from './pages/SystemRules';
import { UserCenter } from './pages/UserCenter';
import { VehicleManagement } from './pages/VehicleManagement';

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, isLoading } = useAuthStore();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-zinc-950 flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
}

function App() {
  const { checkSession } = useAuthStore();

  useEffect(() => {
    checkSession();
  }, [checkSession]);

  return (
    <BrowserRouter>
      <GoogleMapsProvider>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <AppLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Dashboard />} />

            {/* Mission Control */}
            <Route path="network" element={<LiveNetwork />} />
            <Route path="tracking" element={<LiveNetwork />} />
            <Route path="documents" element={<DocumentManagement />} />
            <Route path="support" element={<AutomatedSupport />} />
            <Route path="health" element={<SystemHealth />} />

            {/* Strategy Hub */}
            <Route path="strategy" element={<StrategyHub />} />
            <Route path="surge" element={<PriceSurge />} />
            <Route path="analytics" element={<PriceInsights />} />

            {/* Fleet Intelligence */}
            <Route path="drivers" element={<FleetManagement />} />
            <Route path="vehicles" element={<VehicleManagement />} />
            <Route path="performance" element={<PerformanceInsight />} />

            {/* User Matrix */}
            <Route path="passengers" element={<UserCenter />} />
            <Route path="corporate" element={<UserCenter />} />
            <Route path="reviews" element={<ReviewRatings />} />

            {/* Protection */}
            <Route path="safety" element={<SafetyCompliance />} />
            <Route path="compliance" element={<SafetyCompliance />} />
            <Route path="rules" element={<SystemRules />} />

            {/* Fiscal & Growth */}
            <Route path="financials" element={<Financials />} />
            <Route path="payouts" element={<Payouts />} />
            <Route path="promotions" element={<Promotions />} />
            <Route path="growth" element={<Growth />} />

            {/* Infrastructure */}
            <Route path="roles" element={<AccessRoles />} />
            <Route path="audit" element={<AuditLogs />} />
            <Route path="settings" element={<Settings />} />
          </Route>
        </Routes>
      </GoogleMapsProvider>
    </BrowserRouter>
  );
}


export default App;
