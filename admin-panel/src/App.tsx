import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { DashboardLayout } from './components/layout/DashboardLayout';
import { DashboardOverview } from './features/dashboard/pages/DashboardOverview';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <DashboardLayout>
        <Routes>
          <Route path="/" element={<DashboardOverview />} />
          <Route path="/fleet-command" element={<div className="p-10 text-center uppercase tracking-widest font-black text-zinc-600">Fleet Command Center // Incoming Stream</div>} />
          <Route path="/negotiation" element={<div className="p-10 text-center uppercase tracking-widest font-black text-zinc-600">Negotiation Hub // Live Bids</div>} />
          <Route path="/marketplace" element={<div className="p-10 text-center uppercase tracking-widest font-black text-zinc-600">Marketplace // Merchant Pulse</div>} />
          <Route path="/finance" element={<div className="p-10 text-center uppercase tracking-widest font-black text-zinc-600">Fintech Suite // Paynow Gateway</div>} />

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </DashboardLayout>
    </BrowserRouter>
  );
};

export default App;
