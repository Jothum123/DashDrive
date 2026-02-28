/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import {
  Home,
  Store,
  ClipboardList,
  BarChart2,
  ChevronDown,
  ChevronUp,
  HelpCircle,
  LogOut,
  Megaphone,
  Utensils,
  CreditCard,
  Users as UsersIcon,
  Settings as SettingsIcon,
  Search,
  Bell,
  ChefHat,
  Package,
  MessageSquare,
  Globe,
  Calendar,
  Clock,
  FileText,
  Star,
  AlertCircle
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from './types';

// Components
import Dashboard from './components/Dashboard';
import Orders from './components/Orders';
import MenuMaker from './components/MenuMaker';
import Feedback from './components/Feedback';
import Kitchen from './components/Kitchen';
import Inventory from './components/Inventory';
import Stores, { StoreInfo } from './components/Stores';
import StoreHours from './components/StoreHours';
import HolidayHours from './components/HolidayHours';
import Users from './components/Users';
import Reports from './components/Reports';
import Issues from './components/Issues';
import Settings from './components/Settings';
import Sales from './components/Sales';
import Operations from './components/Operations';
import TopEats from './components/TopEats';
import Marketing from './components/Marketing';
import CustomerInsights from './components/CustomerInsights';
import Payments from './components/Payments';

type Tab = 'home' | 'orders' | 'performance-sales' | 'performance-operations' | 'performance-top-eats' | 'menu' | 'stores-list' | 'store-info' | 'store-hours' | 'holiday-hours' | 'users' | 'reports' | 'issues' | 'settings' | 'feedback' | 'customers-insights' | 'marketing' | 'payments';

export default function App() {
  const [activeTab, setActiveTab] = useState<Tab>('home');
  const [isPerformanceOpen, setIsPerformanceOpen] = useState(false);
  const [isStoresOpen, setIsStoresOpen] = useState(false);
  const [isCustomersOpen, setIsCustomersOpen] = useState(false);
  const [isPizzaPlaceOpen, setIsPizzaPlaceOpen] = useState(true);
  const [selectedStore, setSelectedStore] = useState<any>(null);
  const [selectedOrg, setSelectedOrg] = useState('DashFood Group');

  const sidebarItems = [
    { id: 'home', label: 'Overview', icon: Home },
    { id: 'orders', label: 'Order Hub', icon: ClipboardList },
    {
      id: 'performance',
      label: 'Performance',
      icon: BarChart2,
      hasChevron: true,
      isOpen: isPerformanceOpen,
      setOpen: setIsPerformanceOpen,
      subItems: [
        { id: 'performance-sales', label: 'Sales Analytics' },
        { id: 'performance-operations', label: 'Ops Efficiency' },
        { id: 'performance-top-eats', label: 'Top Performance' },
      ]
    },
    { id: 'menu', label: 'Menu Editor', icon: Utensils },
    {
      id: 'stores',
      label: 'Storefronts',
      icon: Store,
      hasChevron: true,
      isOpen: isStoresOpen,
      setOpen: setIsStoresOpen,
      subItems: [
        { id: 'stores-list', label: 'View All' },
        { id: 'store-info', label: 'Basic Info' },
        { id: 'store-hours', label: 'Hours' },
        { id: 'holiday-hours', label: 'Holidays' },
      ]
    },
    { id: 'marketing', label: 'Campaigns', icon: Megaphone },
    {
      id: 'customers',
      label: 'Relationships',
      icon: UsersIcon,
      hasChevron: true,
      isOpen: isCustomersOpen,
      setOpen: setIsCustomersOpen,
      subItems: [
        { id: 'feedback', label: 'Feedback' },
        { id: 'customers-insights', label: 'Insights' },
      ]
    },
    { id: 'payments', label: 'Financials', icon: CreditCard },
    { id: 'reports', label: 'Business Reports', icon: FileText },
    { id: 'issues', label: 'Support Ops', icon: AlertCircle },
    { id: 'users', label: 'Team access', icon: ChefHat },
    { id: 'settings', label: 'Console Config', icon: SettingsIcon },
  ];

  const handleSelectStore = (store: any) => {
    setSelectedStore(store);
    setActiveTab('store-info');
  };

  return (
    <div className="flex h-screen bg-[#f8f9fa] text-black font-sans overflow-hidden">
      {/* Premium Sidebar */}
      <aside className="w-[280px] bg-black flex flex-col overflow-y-auto shrink-0 relative transition-all duration-300">
        <div className="p-8 pb-4">
          <div className="flex items-center gap-3 mb-10 group cursor-pointer">
            <div className="w-10 h-10 bg-[#00ff90] rounded-xl flex items-center justify-center text-black shadow-[0_0_20px_rgba(0,255,144,0.3)] group-hover:scale-105 transition-transform">
              <Globe size={24} />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-black text-white tracking-tighter leading-none">Dash<span className="text-[#00ff90]">Drive</span></span>
              <span className="text-[10px] text-gray-500 font-bold uppercase tracking-[0.2em] mt-1">Management</span>
            </div>
          </div>

          <nav className="space-y-1.5">
            {sidebarItems.map((item) => (
              <div key={item.id}>
                <button
                  onClick={() => {
                    if (item.setOpen) {
                      item.setOpen(!item.isOpen);
                    } else {
                      setActiveTab(item.id as Tab);
                    }
                  }}
                  className={cn(
                    "w-full flex items-center gap-3.5 px-4 py-3 rounded-2xl text-[13px] font-bold transition-all duration-200 relative group",
                    activeTab === item.id || (item.subItems && item.subItems.some(s => s.id === activeTab))
                      ? "bg-[#111] text-[#00ff90]"
                      : "text-gray-400 hover:text-white hover:bg-[#0a0a0a]"
                  )}
                >
                  {(activeTab === item.id || (item.subItems && item.subItems.some(s => s.id === activeTab))) && (
                    <motion.div
                      layoutId="active-indicator"
                      className="absolute left-0 top-1/2 -translate-y-1/2 w-1.5 h-6 bg-[#00ff90] rounded-r-full shadow-[0_0_10px_rgba(0,255,144,0.5)]"
                    />
                  )}
                  <item.icon size={20} className={cn(
                    "transition-colors",
                    activeTab === item.id || (item.subItems && item.subItems.some(s => s.id === activeTab)) ? "text-[#00ff90]" : "text-gray-500 group-hover:text-gray-300"
                  )} />
                  <span className="flex-1 text-left">{item.label}</span>
                  {item.hasChevron && (
                    <ChevronDown size={14} className={cn("transition-transform duration-300", item.isOpen ? "rotate-180" : "rotate-0")} />
                  )}
                </button>

                {item.subItems && item.isOpen && (
                  <div className="ml-12 mt-1 mb-2 space-y-1 border-l border-zinc-800/50">
                    {item.subItems.map((sub) => (
                      <button
                        key={sub.id}
                        onClick={() => setActiveTab(sub.id as Tab)}
                        className={cn(
                          "w-full text-left px-4 py-2 rounded-xl text-[12px] font-semibold transition-all duration-200 relative",
                          activeTab === sub.id ? "text-white bg-zinc-900" : "text-gray-500 hover:text-gray-300"
                        )}
                      >
                        {sub.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>
        </div>

        <div className="mt-auto p-8 pt-4">
          <div className="p-4 rounded-3xl bg-zinc-900/50 border border-zinc-800 mb-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-8 h-8 rounded-full bg-[#00ff90]/10 flex items-center justify-center text-[#00ff90]">
                <HelpCircle size={16} />
              </div>
              <span className="text-xs font-bold text-white">Need help?</span>
            </div>
            <p className="text-[10px] text-gray-500 font-medium mb-3">Check our documentation or contact support.</p>
            <button className="w-full py-2 bg-white text-black text-[10px] font-black uppercase tracking-widest rounded-xl hover:bg-gray-100 transition-colors">
              Knowledge Base
            </button>
          </div>

          <button className="w-full flex items-center gap-3 px-4 py-3 text-gray-500 hover:text-rose-500 transition-all text-xs font-bold group">
            <div className="w-8 h-8 rounded-xl bg-zinc-900 flex items-center justify-center group-hover:bg-rose-500/10 transition-colors">
              <LogOut size={16} />
            </div>
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden bg-[#f8f9fa]">
        {/* Premium Elevated Header */}
        <header className="h-24 glass flex items-center justify-between px-10 shrink-0 sticky top-0 z-50">
          <div className="flex items-center gap-6">
            <div className="flex flex-col">
              <h2 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-1">Current Context</h2>
              <div className="flex items-center gap-3 text-sm font-black tracking-tight text-black">
                <span className="bg-black text-white px-2 py-0.5 rounded-lg text-[10px]">{selectedOrg}</span>
                <ChevronRight size={14} className="text-gray-300" />
                <span className="text-[#00ff90] bg-[#00ff90]/5 px-2 py-0.5 rounded-lg text-[10px]">Starbucks Lynwood</span>
              </div>
            </div>

            <div className="h-8 w-[1px] bg-gray-200 mx-2"></div>

            <div className="bg-rose-50 text-rose-600 px-3 py-1.5 rounded-2xl flex items-center gap-2 border border-rose-100 shadow-sm animate-pulse">
              <div className="w-1.5 h-1.5 bg-rose-500 rounded-full"></div>
              <span className="text-[10px] font-black uppercase tracking-wider">3 Urgent Issues</span>
            </div>
          </div>

          <div className="flex items-center gap-6">
            <div className="flex items-center gap-3 bg-white p-1.5 rounded-2xl border border-gray-100 shadow-sm">
              <button className="relative p-2.5 text-gray-600 hover:text-[#00ff90] transition-colors rounded-xl hover:bg-gray-50">
                <Bell size={20} />
                <span className="absolute top-2 right-2 w-4 h-4 bg-[#00ff90] text-black text-[9px] flex items-center justify-center rounded-full font-black border-2 border-white">3</span>
              </button>
              <div className="h-6 w-[1px] bg-gray-100"></div>
              <button className="p-2.5 text-gray-600 hover:text-[#00ff90] transition-colors rounded-xl hover:bg-gray-50">
                <Search size={20} />
              </button>
            </div>

            <div className="flex items-center gap-4 bg-white px-4 py-2 rounded-2xl border border-gray-100 shadow-sm cursor-pointer hover:border-[#00ff90]/50 transition-colors group">
              <div className="flex flex-col items-end">
                <span className="text-[11px] font-black text-black">Justin Chithu</span>
                <span className="text-[9px] font-bold text-gray-400 uppercase tracking-widest leading-none">Global Admin</span>
              </div>
              <div className="w-10 h-10 rounded-2xl bg-black flex items-center justify-center text-[#00ff90] font-black text-sm shadow-[0_5px_15px_rgba(0,0,0,0.1)] group-hover:scale-105 transition-transform">
                JC
              </div>
            </div>
          </div>
        </header>

        {/* Scrollable Content Area */}
        <div className="flex-1 overflow-y-auto px-10 py-10 pb-20 scroll-smooth">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
              className="h-full"
            >
              {activeTab === 'home' && <Dashboard />}
              {activeTab === 'orders' && <Orders />}
              {activeTab === 'stores-list' && <Stores onSelectStore={handleSelectStore} />}
              {activeTab === 'store-info' && <StoreInfo store={selectedStore} onBack={() => setActiveTab('stores-list')} setActiveTab={setActiveTab} />}
              {activeTab === 'menu' && <MenuMaker />}
              {activeTab === 'performance-sales' && <Sales />}
              {activeTab === 'performance-operations' && <Operations />}
              {activeTab === 'performance-top-eats' && <TopEats />}
              {activeTab === 'feedback' && <Feedback />}
              {activeTab === 'customers-insights' && <CustomerInsights />}
              {activeTab === 'store-hours' && <StoreHours store={selectedStore} />}
              {activeTab === 'holiday-hours' && <HolidayHours store={selectedStore} />}
              {activeTab === 'users' && <Users />}
              {activeTab === 'reports' && <Reports />}
              {activeTab === 'issues' && <Issues />}
              {activeTab === 'marketing' && <Marketing />}
              {activeTab === 'payments' && <Payments />}
              {activeTab === 'settings' && <Settings />}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}
