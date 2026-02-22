import React, { useState } from 'react';
import {
  ChevronRight,
  ChevronLeft,
  Moon,
  CheckCircle2,
  MessageCircle,
  X,
  ArrowLeft,
  MapPin,
  Phone,
  Edit2,
  Store as StoreIcon,
  Clock,
  Calendar
} from 'lucide-react';
import { cn } from '../types';

interface Store {
  id: string;
  name: string;
  address: string;
  status: 'open' | 'closed';
  info: string;
  sales: string;
  orders: number;
  image: string;
}

const openStores: Store[] = [
  {
    id: '294d6f7c-358a-483a-930...',
    name: 'Little Pub Toast Test Store (Infosys Dev)',
    address: '294d6f7c-358a-483a-930...',
    status: 'open',
    info: 'Since 11:00 AM',
    sales: '$0',
    orders: 0,
    image: 'https://picsum.photos/seed/store1/100/100'
  },
  {
    id: '1400 Broadway, New York, ...',
    name: 'Revel Test Store (InfoSys UAT)',
    address: '1400 Broadway, New York, ...',
    status: 'open',
    info: 'Since 2:41 PM',
    sales: '$0',
    orders: 0,
    image: 'https://picsum.photos/seed/store2/100/100'
  }
];

const closedStores: Store[] = [
  {
    id: '219 King Street',
    name: 'One Restaurant & Bar',
    address: '219 King Street',
    status: 'closed',
    info: 'Opens 1:30 PM Wednesday',
    sales: '$0',
    orders: 0,
    image: 'https://picsum.photos/seed/store3/100/100'
  },
  {
    id: '1455 Market Street',
    name: 'Pizza Pizza Pizza - Test Store G',
    address: '1455 Market Street',
    status: 'closed',
    info: '',
    sales: '$0',
    orders: 0,
    image: 'https://picsum.photos/seed/store4/100/100'
  },
  {
    id: '5954 Kanto Square Drive',
    name: 'Test Store G',
    address: '5954 Kanto Square Drive',
    status: 'closed',
    info: '',
    sales: '$0',
    orders: 0,
    image: 'https://picsum.photos/seed/store5/100/100'
  }
];

const Stores = ({ onSelectStore }: { onSelectStore: (store: Store) => void }) => {
  return (
    <div className="flex-1 bg-white overflow-y-auto relative">
      <div className="max-w-7xl mx-auto py-8 px-8">
        {/* Open Stores */}
        <div className="space-y-0 mb-12">
          {openStores.map((store) => (
            <div
              key={store.id}
              onClick={() => onSelectStore(store)}
              className="flex items-center gap-6 py-6 border-b border-gray-100 hover:bg-gray-50 transition-colors cursor-pointer group"
            >
              <div className="relative shrink-0">
                <img src={store.image} alt="" className="w-16 h-16 rounded-lg object-cover" referrerPolicy="no-referrer" />
                <div className="absolute -bottom-1 -right-1 bg-white rounded-full p-0.5">
                  <CheckCircle2 size={16} className="text-emerald-500 fill-white" />
                </div>
              </div>

              <div className="flex-1 min-w-0">
                <h3 className="font-bold text-sm truncate">{store.name}</h3>
                <p className="text-xs text-gray-500 truncate">{store.address}</p>
              </div>

              <div className="w-12 flex justify-center">
                <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-400">
                  <div className="w-4 h-0.5 bg-gray-300"></div>
                </div>
              </div>

              <div className="w-48">
                <div className="text-xs font-bold">Accepting orders</div>
                <div className="text-xs text-gray-500">{store.info}</div>
              </div>

              <div className="w-24">
                <div className="text-xs font-bold">{store.sales}</div>
                <div className="text-xs text-gray-500">Sales</div>
              </div>

              <div className="w-24">
                <div className="text-xs font-bold">{store.orders}</div>
                <div className="text-xs text-gray-500">Orders</div>
              </div>

              <ChevronRight size={20} className="text-gray-300 group-hover:text-black transition-colors" />
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-end gap-4 mb-12 text-sm text-gray-500">
          <button className="flex items-center gap-1 hover:text-black transition-colors">
            <ChevronLeft size={18} /> Prev
          </button>
          <div className="flex items-center gap-2">
            <select className="bg-transparent border-none p-0 focus:ring-0 font-bold text-black">
              <option>1</option>
            </select>
            <span>of 2</span>
          </div>
          <button className="flex items-center gap-1 hover:text-black transition-colors font-bold text-black">
            Next <ChevronRight size={18} />
          </button>
        </div>

        {/* Closed Stores */}
        <div>
          <h2 className="text-lg font-bold mb-6">Closed ({closedStores.length})</h2>
          <div className="space-y-0">
            {closedStores.map((store) => (
              <div
                key={store.id}
                onClick={() => onSelectStore(store)}
                className="flex items-center gap-6 py-6 border-b border-gray-100 hover:bg-gray-50 transition-colors cursor-pointer group"
              >
                <div className="relative shrink-0">
                  <img src={store.image} alt="" className="w-16 h-16 rounded-lg object-cover grayscale" referrerPolicy="no-referrer" />
                  <div className="absolute -bottom-1 -right-1 bg-white rounded-full p-0.5">
                    <Moon size={16} className="text-gray-400 fill-gray-400" />
                  </div>
                </div>

                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-sm truncate">{store.name}</h3>
                  <p className="text-xs text-gray-500 truncate">{store.address}</p>
                </div>

                <div className="w-12 flex justify-center">
                  <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-400">
                    <div className="w-4 h-0.5 bg-gray-300"></div>
                  </div>
                </div>

                <div className="w-48">
                  <div className="text-xs font-bold">Closed</div>
                  <div className="text-xs text-gray-500">{store.info}</div>
                </div>

                <div className="w-24">
                  <div className="text-xs font-bold">{store.sales}</div>
                  <div className="text-xs text-gray-500">Sales</div>
                </div>

                <div className="w-24">
                  <div className="text-xs font-bold">{store.orders}</div>
                  <div className="text-xs text-gray-500">Orders</div>
                </div>

                <ChevronRight size={20} className="text-gray-300 group-hover:text-black transition-colors" />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Floating Chat Button */}
      <div className="fixed bottom-8 right-8 flex flex-col items-end gap-4 z-50">
        <div className="bg-amber-400 p-4 rounded-lg shadow-xl relative max-w-[200px]">
          <p className="text-xs font-bold text-gray-800">Have a question? We'd love to chat with you!</p>
          <div className="absolute -bottom-2 right-4 w-4 h-4 bg-amber-400 rotate-45"></div>
        </div>
        <button className="w-14 h-14 bg-black text-white rounded-xl shadow-2xl flex items-center justify-center hover:scale-105 transition-transform">
          <MessageCircle size={28} />
        </button>
      </div>
    </div>
  );
};

export const StoreInfo = ({ store, onBack, setActiveTab }: { store: Store, onBack: () => void, setActiveTab: (tab: any) => void }) => {
  return (
    <div className="flex-1 bg-white overflow-y-auto">
      <div className="max-w-7xl mx-auto py-8 px-8">
        <button
          onClick={onBack}
          className="p-2 hover:bg-gray-100 rounded-full transition-colors mb-4"
        >
          <ArrowLeft size={24} />
        </button>

        <h1 className="text-4xl font-bold mb-4">Store info</h1>

        <div className="flex items-center gap-2 text-sm text-gray-500 mb-8">
          <Moon size={16} />
          <span>Closed</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2 relative aspect-video bg-gray-100 rounded-lg overflow-hidden border border-gray-200">
            {/* Placeholder Map */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="relative">
                <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center text-white shadow-xl">
                  <StoreIcon size={24} />
                </div>
                <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-t-[12px] border-t-black"></div>
              </div>
            </div>
            <button className="absolute top-4 right-4 bg-black text-white px-4 py-2 rounded-full text-xs font-bold shadow-lg">
              Adjust Pin
            </button>
          </div>

          <div className="space-y-8">
            <div>
              <h2 className="text-2xl font-bold mb-2">{store.name}</h2>
              <p className="text-gray-500 text-sm">{store.address}</p>
              <p className="text-gray-500 text-sm">San Francisco, 94103</p>
            </div>

            <div className="space-y-4 pt-4 border-t border-gray-100">
              <button
                onClick={() => setActiveTab('store-hours')}
                className="w-full px-6 py-3 bg-gray-100 rounded-xl text-sm font-bold hover:bg-gray-200 transition-colors flex items-center justify-between group"
              >
                <div className="flex items-center gap-3">
                  <Clock size={18} className="text-gray-500" />
                  <span>Manage Regular Hours</span>
                </div>
                <ChevronRight size={18} className="text-gray-300 group-hover:text-black transition-colors" />
              </button>

              <button
                onClick={() => setActiveTab('holiday-hours')}
                className="w-full px-6 py-3 bg-gray-100 rounded-xl text-sm font-bold hover:bg-gray-200 transition-colors flex items-center justify-between group"
              >
                <div className="flex items-center gap-3">
                  <Calendar size={18} className="text-gray-500" />
                  <span>Manage Holiday Hours</span>
                </div>
                <ChevronRight size={18} className="text-gray-300 group-hover:text-black transition-colors" />
              </button>
            </div>

            <div>
              <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Phone</h3>
              <p className="text-sm">+12345678901</p>
            </div>

            <button className="px-6 py-2 bg-gray-100 rounded-full text-sm font-bold hover:bg-gray-200 transition-colors flex items-center gap-2">
              <Edit2 size={16} />
              Edit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Stores;
