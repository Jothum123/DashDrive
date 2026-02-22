import { useState } from 'react'
import { Layout } from './components/Layout'
import { Dashboard } from './components/Dashboard'
import { Orders } from './components/Orders'
import { Inventory } from './components/Inventory'
import { Performance } from './components/Performance'
import { AddProduct } from './components/AddProduct'
import { Financials } from './components/Financials'
import { Stores } from './components/stores/Stores';
import { StoreHours } from './components/stores/StoreHours';
import { HolidayHours } from './components/stores/HolidayHours';
import { MarketingOverview } from './components/marketing/MarketingOverview';
import { Offers } from './components/marketing/Offers';

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');

  return (
    <Layout activeTab={activeTab} setActiveTab={setActiveTab}>
      {activeTab === 'dashboard' && <Dashboard />}
      {activeTab === 'orders' && <Orders />}
      {activeTab === 'inventory' && <Inventory onAddProduct={() => setActiveTab('addProduct')} />}
      {activeTab === 'performance' && <Performance />}
      {activeTab === 'addProduct' && <AddProduct />}
      {activeTab === 'financials' && <Financials />}
      {activeTab === 'stores' && <Stores onNavigate={setActiveTab} />}
      {activeTab === 'store-hours' && <StoreHours />}
      {activeTab === 'holiday-hours' && <HolidayHours />}
      {activeTab === 'marketing-overview' && <MarketingOverview />}
      {activeTab === 'offers' && <Offers />}
      {activeTab !== 'dashboard' && activeTab !== 'orders' && activeTab !== 'inventory' &&
        activeTab !== 'performance' && activeTab !== 'addProduct' && activeTab !== 'financials' &&
        activeTab !== 'stores' && activeTab !== 'store-hours' && activeTab !== 'holiday-hours' &&
        activeTab !== 'marketing-overview' && activeTab !== 'offers' && (
          <div className="flex items-center justify-center h-full text-gray-400">
            Content for {activeTab} is coming soon...
          </div>
        )}
    </Layout>
  )
}

export default App
