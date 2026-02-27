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
  Settings,
  Search,
  Bell,
  ChefHat,
  Package,
  MessageSquare,
  Globe,
  Calendar,
  Clock,
  FileText,
  Star
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
import Sales from './components/Sales';
import Operations from './components/Operations';
import TopEats from './components/TopEats';

type Tab = 'home' | 'stores-list' | 'webshop' | 'orders' | 'kitchen' | 'inventory' | 'performance-sales' | 'performance-operations' | 'performance-top-eats' | 'feedback' | 'reports' | 'insights' | 'marketing' | 'menu' | 'payments' | 'users' | 'settings' | 'store-info' | 'holiday-hours' | 'store-hours' | 'prep-times' | 'documents';

export default function App() {
  const [activeTab, setActiveTab] = useState<Tab>('orders');
  const [isPerformanceOpen, setIsPerformanceOpen] = useState(false);
  const [isStoresOpen, setIsStoresOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isPizzaPlaceOpen, setIsPizzaPlaceOpen] = useState(true);
  const [selectedStore, setSelectedStore] = useState<any>(null);

  const sidebarItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'orders', label: 'Orders', icon: ClipboardList },
    {
      id: 'stores',
      label: 'Stores',
      icon: Store,
      hasChevron: true,
      isOpen: isStoresOpen,
      setOpen: setIsStoresOpen,
      subItems: [
        { id: 'stores-list', label: 'Stores', icon: Store },
        { id: 'store-hours', label: 'Store Hours', icon: Clock },
        { id: 'holiday-hours', label: 'Holiday Hours', icon: Calendar },
        { id: 'webshop', label: 'Webshop', icon: Globe },
      ]
    },
    {
      id: 'performance',
      label: 'Performance',
      icon: BarChart2,
      hasChevron: true,
      isOpen: isPerformanceOpen,
      setOpen: setIsPerformanceOpen,
      subItems: [
        { id: 'performance-sales', label: 'Sales' },
        { id: 'performance-operations', label: 'Operations' },
        { id: 'performance-top-eats', label: 'Top Eats' },
      ]
    },
    { id: 'feedback', label: 'Feedback', icon: Star },
    { id: 'reports', label: 'Reports', icon: ClipboardList },
    { id: 'payments', label: 'Payments', icon: CreditCard },
    { id: 'menu', label: 'Menu', icon: Utensils },
    { id: 'marketing', label: 'Marketing', icon: Megaphone },
    { id: 'prep-times', label: 'Preparation Times', icon: Clock },
    { id: 'users', label: 'Users', icon: UsersIcon },
    { id: 'documents', label: 'Documents', icon: FileText },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];



  const pizzaPlaceItems = [
    { id: 'marketing', label: 'Marketing', icon: Megaphone },
    { id: 'menu', label: 'Menu', icon: Utensils },
    { id: 'payments', label: 'Payments', icon: CreditCard },
    { id: 'users', label: 'Users', icon: UsersIcon },
    { id: 'settings', label: 'Settings', icon: Settings, hasChevron: true, isOpen: isSettingsOpen, setOpen: setIsSettingsOpen },
  ];

  const handleSelectStore = (store: any) => {
    setSelectedStore(store);
    setActiveTab('store-info');
  };

  return (
    <div className="flex h-screen bg-white text-black font-sans overflow-hidden">
      {/* Sidebar */}
      <aside className="w-64 bg-white flex flex-col border-r border-gray-200 overflow-y-auto shrink-0">
        <div className="p-6 pb-2">
          <div className="text-2xl font-bold tracking-tight mb-8">
            Uber <span className="text-emerald-600">Eats</span> Manager
          </div>

          <nav className="space-y-1">
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
                    "w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors relative",
                    activeTab === item.id || (item.subItems && item.subItems.some(s => s.id === activeTab)) ? "bg-gray-100" : "hover:bg-gray-50 text-gray-700"
                  )}
                >
                  {(activeTab === item.id || (item.subItems && item.subItems.some(s => s.id === activeTab))) && <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-emerald-600 rounded-r-full"></div>}
                  <item.icon size={20} className={cn(activeTab === item.id ? "text-emerald-600" : "text-gray-500")} />
                  <span className="flex-1 text-left">{item.label}</span>
                  {item.hasChevron && (item.isOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />)}
                </button>

                {item.subItems && item.isOpen && (
                  <div className="ml-9 mt-1 space-y-1">
                    {item.subItems.map((sub) => (
                      <button
                        key={sub.id}
                        onClick={() => setActiveTab(sub.id as Tab)}
                        className={cn(
                          "w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-colors relative",
                          activeTab === sub.id ? "bg-gray-100 text-black" : "text-gray-600 hover:bg-gray-50"
                        )}
                      >
                        {activeTab === sub.id && <div className="absolute -left-9 top-1/2 -translate-y-1/2 w-1 h-6 bg-emerald-600 rounded-r-full"></div>}
                        {sub.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>
        </div>

        <div className="p-6 pt-2">
          <div className="h-[1px] bg-gray-100 mb-6"></div>
          <button
            onClick={() => setIsPizzaPlaceOpen(!isPizzaPlaceOpen)}
            className="w-full flex items-center justify-between px-2 mb-4 text-left"
          >
            <div>
              <div className="text-sm font-bold">Starbucks (82) Lyn...</div>
              <div className="text-xs text-gray-500">Switch location</div>
            </div>
            {isPizzaPlaceOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </button>

          <AnimatePresence>
            {isPizzaPlaceOpen && (
              <motion.nav
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="overflow-hidden space-y-1"
              >
                {pizzaPlaceItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id as Tab)}
                    className={cn(
                      "w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors relative",
                      activeTab === item.id ? "bg-gray-100" : "hover:bg-gray-50 text-gray-700"
                    )}
                  >
                    {activeTab === item.id && <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-emerald-600 rounded-r-full"></div>}
                    <item.icon size={20} className={cn(activeTab === item.id ? "text-emerald-600" : "text-gray-500")} />
                    <span className="flex-1 text-left">{item.label}</span>
                    {item.hasChevron && (item.isOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />)}
                  </button>
                ))}
              </motion.nav>
            )}
          </AnimatePresence>
        </div>

        <div className="mt-auto p-6">
          <button
            onClick={() => setActiveTab('feedback')}
            className={cn(
              "w-full flex items-center gap-3 px-4 py-2 bg-gray-100 rounded-full text-sm font-bold hover:bg-gray-200 transition-colors",
              activeTab === 'feedback' && "ring-2 ring-black"
            )}
          >
            <MessageSquare size={18} />
            Feedback
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-end px-8 shrink-0 gap-6">
          <div className="flex items-center gap-2 px-4 py-1.5 bg-gray-100 text-gray-600 rounded-full text-xs font-bold">
            <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
            Emulation in progress
            <ChevronDown size={14} className="ml-1" />
          </div>
          <button className="flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-black transition-colors">
            <HelpCircle size={18} />
            Help
          </button>
          <div className="relative">
            <Bell size={20} className="text-gray-600" />
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-blue-500 text-white text-[10px] flex items-center justify-center rounded-full font-bold border-2 border-white">3</span>
          </div>
          <button className="text-sm font-medium text-gray-600 hover:text-black transition-colors">Log Out</button>
        </header>

        {/* Scrollable Content Area */}
        <div className="flex-1 overflow-y-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
              className="h-full"
            >
              {activeTab === 'home' && <Dashboard />}
              {activeTab === 'orders' && <Orders />}
              {activeTab === 'stores-list' && <Stores onSelectStore={handleSelectStore} />}
              {activeTab === 'store-info' && <StoreInfo store={selectedStore} onBack={() => setActiveTab('stores-list')} setActiveTab={setActiveTab} />}
              {activeTab === 'kitchen' && <Kitchen />}
              {activeTab === 'inventory' && <Inventory />}
              {activeTab === 'menu' && <MenuMaker />}
              {activeTab === 'performance-sales' && <Sales />}
              {activeTab === 'performance-operations' && <Operations />}
              {activeTab === 'performance-top-eats' && <TopEats />}
              {activeTab === 'feedback' && <Feedback />}
              {activeTab === 'store-hours' && <StoreHours store={selectedStore} />}
              {activeTab === 'holiday-hours' && <HolidayHours store={selectedStore} />}
              {['stores', 'webshop', 'reports', 'insights', 'marketing', 'payments', 'users', 'settings', 'prep-times', 'documents'].includes(activeTab) && (
                <div className="flex items-center justify-center h-full text-gray-400">
                  {activeTab.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')} screen coming soon.
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}
