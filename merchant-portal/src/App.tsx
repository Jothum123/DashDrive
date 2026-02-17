import { useState } from 'react';
import { useMerchantContext } from './contexts/MerchantContext';
import { Sidebar } from './components/Sidebar';
import { Dashboard } from './pages/Dashboard';
import { Orders } from './pages/Orders';
import { Menu } from './pages/Menu';
import { Analytics } from './pages/Analytics';
import { ZimWallet } from './pages/ZimWallet';
import { Handshake } from './pages/Handshake';
import { InventoryMart } from './pages/Mart/InventoryMart';
import { PickerView } from './pages/Mart/PickerView';
import { BookingCalendar } from './pages/Stay/BookingCalendar';
import { Bell, Search, User, ShoppingCart, Bed, Utensils } from 'lucide-react';

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');

  const { serviceType } = useMerchantContext();

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard': return <Dashboard />;
      case 'orders':
        if (serviceType === 'MART') return <PickerView />;
        if (serviceType === 'STAY') return <BookingCalendar />;
        return <Orders />;
      case 'menu':
        if (serviceType === 'MART') return <InventoryMart />;
        return <Menu />;
      case 'analytics': return <Analytics />;
      case 'wallet': return <ZimWallet />;
      case 'delivery': return <Handshake />;
      default: return <Dashboard />;
    }
  };

  const getHeaderIcon = () => {
    switch (serviceType) {
      case 'MART': return <ShoppingCart className="text-brand-green" size={20} />;
      case 'STAY': return <Bed className="text-brand-green" size={20} />;
      default: return <Utensils className="text-brand-green" size={20} />;
    }
  };

  return (
    <div className="min-h-screen bg-zinc-50 text-zinc-900 flex">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

      <main className="flex-1 ml-64 p-8">
        <header className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-brand-green/10 rounded-lg">
              {getHeaderIcon()}
            </div>
            <div>
              <h1 className="text-2xl font-bold capitalize">{activeTab}</h1>
              <p className="text-zinc-500 text-sm">DashDrive {serviceType} Hub</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" size={18} />
              <input
                type="text"
                placeholder="Search orders, items..."
                className="bg-zinc-200/50 border border-zinc-200 rounded-xl py-2 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-brand-green/20 w-64 transition-all"
              />
            </div>

            <button className="p-2 rounded-xl bg-white border border-zinc-200 text-zinc-400 hover:text-zinc-900 transition-colors relative shadow-sm">
              <Bell size={20} />
              <span className="absolute top-2 right-2 w-2 h-2 bg-brand-green rounded-full border-2 border-white"></span>
            </button>

            <div className="flex items-center gap-3 pl-4 border-l border-zinc-200">
              <div className="text-right">
                <p className="text-sm font-medium">The London Grill</p>
                <p className="text-xs text-brand-green font-semibold">Store Open</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-white border border-zinc-200 flex items-center justify-center shadow-sm">
                <User size={20} className="text-zinc-600" />
              </div>
            </div>
          </div>
        </header>

        {renderContent()}
      </main>
    </div>
  );
}

export default App;
