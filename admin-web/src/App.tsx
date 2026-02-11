import React, { useEffect } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { GoogleMapsProvider } from './components/maps/GoogleMapsProvider';
import { AppLayout } from './components/shared/AppLayout';
import { useAdminStore } from './stores/adminStore';
import { useAuthStore } from './stores/authStore';
import { Login } from './v1_reference/pages/Login'; // Keep login for now

// Feature Pages
import { Geofencing } from './features/config/pages/Geofencing';
import { DashboardOverview } from './features/dashboard/pages/DashboardOverview';
import { DemandHeatmap } from './features/dashboard/pages/DemandHeatmap';
import { FinancialEngine } from './features/finance/pages/FinancialEngine';
import { FleetDrivers } from './features/fleet/pages/FleetDrivers';
import { VerificationHub } from './features/fleet/pages/VerificationHub';
import { LiveBidDetail } from './features/ops-central/pages/LiveBidDetail';
import { LiveBids } from './features/ops-central/pages/LiveBids';
import { LiveFleetMap } from './features/ops-central/pages/LiveFleetMap';
import { ManualDispatch } from './features/ops-central/pages/ManualDispatch';
import { MarketplaceHealth } from './features/ops-central/pages/MarketplaceHealth';
import { SafetyDisputes } from './features/safety/pages/SafetyDisputes';

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, isLoading } = useAuthStore();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background-dark flex items-center justify-center">
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
  const { initializeSocket, initializeSupabase } = useAdminStore();

  useEffect(() => {
    checkSession();
    initializeSocket();
    const cleanup = initializeSupabase();
    return () => {
      if (cleanup && typeof cleanup === 'function') {
        cleanup();
      }
    };
  }, [checkSession, initializeSocket, initializeSupabase]);

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
            <Route index element={<DashboardOverview />} />
            <Route path="heatmap" element={<DemandHeatmap />} />
            <Route path="fleet-map" element={<LiveFleetMap />} />
            <Route path="dispatch" element={<ManualDispatch />} />
            <Route path="bids" element={<LiveBids />} />
            <Route path="bids/:id" element={<LiveBidDetail />} />
            <Route path="riders" element={<MarketplaceHealth />} /> {/* Placeholder */}
            <Route path="fleet" element={<FleetDrivers />} />
            <Route path="verification" element={<VerificationHub />} />
            <Route path="finance" element={<FinancialEngine />} />
            <Route path="safety" element={<SafetyDisputes />} />
            <Route path="geofencing" element={<Geofencing />} />
            <Route path="cms" element={<Geofencing />} /> {/* Placeholder */}
            <Route path="settings" element={<Geofencing />} /> {/* Placeholder */}

            {/* Fallbacks */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Route>
        </Routes>
      </GoogleMapsProvider>
    </BrowserRouter>
  );
}

export default App;
