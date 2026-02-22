import React, { useState } from 'react';
import {
  ChevronDown,
  Search,
  Store,
  Zap,
  AlertTriangle,
  MoreVertical,
  ChevronRight,
  Check,
  Info
} from 'lucide-react';
import { cn } from '../types';

type OrderTab = 'active' | 'history';

interface ActiveOrder {
  id: string;
  customer: string;
  type: 'Pickup' | 'Delivery';
  status: string;
  statusColor: string;
  orderedAt: string;
  relativeTime: string;
  platform?: 'Uber' | '1st' | 'Med';
}

const activeOrdersData: ActiveOrder[] = [
  { id: '1', customer: 'John Doe', type: 'Pickup', status: 'Preparing', statusColor: 'bg-gray-600', orderedAt: '11:00 am', relativeTime: '5 mins ago' },
  { id: '2', customer: 'John Doe', type: 'Delivery', status: 'Preparing', statusColor: 'bg-gray-600', orderedAt: '10:45 am', relativeTime: '15 mins ago' },
  { id: '3', customer: 'Wiz K.', type: 'Delivery', status: 'Ready for Delivery', statusColor: 'bg-gray-300', orderedAt: '10:20 am', relativeTime: '54 mins ago', platform: 'Uber' },
  { id: '4', customer: 'Bubba K.', type: 'Delivery', status: 'Out for Delivery', statusColor: 'bg-gray-300', orderedAt: '9:50 am', relativeTime: '84 mins ago', platform: 'Uber' },
  { id: '5', customer: 'Cheech Marin', type: 'Pickup', status: 'Ready for Pickup', statusColor: 'bg-gray-300', orderedAt: '9:10 am', relativeTime: '121 mins ago', platform: '1st' },
  { id: '6', customer: 'Tommy Chong', type: 'Pickup', status: 'Ready for Pickup', statusColor: 'bg-gray-300', orderedAt: '8:59 am', relativeTime: '133 mins ago', platform: 'Med' },
  { id: '7', customer: 'Willie N.', type: 'Delivery', status: 'Ready for Delivery', statusColor: 'bg-gray-300', orderedAt: '8:06 am', relativeTime: '3 hours ago', platform: 'Uber' },
];

const historyOrdersData = [
  { id: '#4E2A1', store: 'Gourmet Sushi (Canary Wharf)', date: 'Feb 18, 2024', time: '6:42 PM', fulfillment: 'Delivery', platform: 'Uber Eats', issue: 'Inaccurate', issueColor: 'text-orange-700 bg-orange-50 border-orange-100', payout: '£24.50', status: 'Completed' },
  { id: '#8B9C2', store: 'Gourmet Sushi (Spitalfields)', date: 'Feb 18, 2024', time: '5:15 PM', fulfillment: 'Pickup', platform: 'Uber Eats', issue: 'Potentially Inaccurate', issueColor: 'text-orange-700 bg-orange-50 border-orange-100', payout: '£18.20', status: 'Completed' },
  { id: '#3D5F9', store: 'Gourmet Sushi (Camden)', date: 'Feb 17, 2024', time: '8:30 PM', fulfillment: 'Delivery', platform: 'Uber Eats', issue: 'Unfulfilled', issueColor: 'text-gray-600 bg-gray-100 border-gray-200', payout: '£0.00', status: 'Canceled' },
  { id: '#7A1E4', store: 'Gourmet Sushi (Notting Hill)', date: 'Feb 17, 2024', time: '7:12 PM', fulfillment: 'Delivery', platform: 'Uber Eats', issue: 'Inaccurate', issueColor: 'text-orange-700 bg-orange-50 border-orange-100', payout: '£32.10', status: 'Completed' },
  { id: '#2C8G5', store: 'Gourmet Sushi (Battersea)', date: 'Feb 16, 2024', time: '1:45 PM', fulfillment: 'Pickup', platform: 'Uber Eats', issue: 'None', issueColor: 'hidden', payout: '£15.75', status: 'Completed' },
  { id: '#9K4H3', store: 'Gourmet Sushi (Holborn)', date: 'Feb 16, 2024', time: '12:20 PM', fulfillment: 'Delivery', platform: 'Uber Eats', issue: 'Unfulfilled', issueColor: 'text-gray-600 bg-gray-100 border-gray-200', payout: '£0.00', status: 'Canceled' }
];

const PlatformBadge = ({ type }: { type: 'Uber' | '1st' | 'Med' }) => {
  const styles = {
    Uber: "bg-[#E6F4EA] text-[#0E8345]",
    '1st': "bg-[#FFF8E1] text-[#F9A825]",
    Med: "bg-[#F5F5F5] text-[#616161]"
  };
  return (
    <span className={cn("px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-tight mr-2", styles[type])}>
      {type}
    </span>
  );
};

const Orders = () => {
  const [activeTab, setActiveTab] = useState<OrderTab>('active');
  const [activeFilter, setActiveFilter] = useState('All orders');
  const [historySubTab, setHistorySubTab] = useState<'all' | 'unfulfilled'>('all');

  const filters = [
    { label: 'All orders', count: 7 },
    { label: 'New', count: 0 },
    { label: 'Preparing', count: 0 },
    { label: 'Ready for Pickup', count: 0 },
    { label: 'Delivering', count: 3 },
  ];

  return (
    <div className="flex flex-col h-full bg-white self-stretch">
      {/* Tab Navigation */}
      <div className="px-8 pt-6 border-b border-gray-200 bg-white shrink-0">
        <div className="flex gap-8">
          {[
            { id: 'active' as OrderTab, label: 'Active orders' },
            { id: 'history' as OrderTab, label: 'Order history' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                "pb-4 text-sm font-semibold relative transition-colors",
                activeTab === tab.id ? "text-black" : "text-gray-400 hover:text-black"
              )}
            >
              {tab.label}
              {activeTab === tab.id && (
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-black rounded-t-full" />
              )}
            </button>
          ))}

          <div className="flex-1" />

          {activeTab === 'active' && (
            <div className="flex items-center gap-4">
              <div className="relative mb-4">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                <input
                  type="text"
                  placeholder="Search active orders"
                  className="bg-gray-100 border-none rounded-lg py-2 pl-9 pr-4 text-sm w-72 focus:ring-2 focus:ring-black/5"
                />
              </div>
              <button className="p-2 text-gray-400 mb-4 ml-2 hover:bg-gray-50 rounded-lg transition-colors"><MoreVertical size={20} /></button>
            </div>
          )}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto bg-[#F6F6F6] p-8">
        {activeTab === 'active' ? (
          <div className="max-w-7xl mx-auto space-y-6">
            {/* Filter Pills */}
            <div className="flex flex-wrap gap-3">
              {filters.map((filter) => (
                <button
                  key={filter.label}
                  onClick={() => setActiveFilter(filter.label)}
                  className={cn(
                    "px-6 py-2 rounded-full text-sm font-bold transition-all border",
                    activeFilter === filter.label
                      ? "bg-[#333] border-[#333] text-white"
                      : "bg-white border-gray-300 text-black hover:border-black"
                  )}
                >
                  {filter.label} • {filter.count}
                </button>
              ))}
            </div>

            {/* Selection Action Bar */}
            <div className="bg-white border border-gray-200 shadow-sm rounded-sm px-6 py-4 flex items-center gap-4">
              <div className="w-5 h-5 border-2 border-gray-200 rounded-sm flex items-center justify-center cursor-pointer hover:border-black transition-colors">
                <div className="w-2.5 h-2.5 bg-transparent" />
              </div>
              <span className="text-sm font-bold text-gray-400">Select items to see actions</span>
            </div>

            {/* Active Orders Table */}
            <div className="bg-white rounded-sm border border-gray-200 shadow-sm overflow-hidden">
              <table className="w-full">
                <thead>
                  <tr className="bg-[#EAEAEA] border-b border-gray-200">
                    <th className="px-6 py-3 text-left text-[11px] font-black text-gray-500 uppercase tracking-widest">Customer</th>
                    <th className="px-6 py-3 text-left text-[11px] font-black text-gray-500 uppercase tracking-widest">Type</th>
                    <th className="px-6 py-3 text-left text-[11px] font-black text-gray-500 uppercase tracking-widest">Status</th>
                    <th className="px-6 py-3 text-left text-[11px] font-black text-gray-500 uppercase tracking-widest flex items-center gap-1">
                      Ordered At <ChevronDown size={14} />
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {activeOrdersData.map((order) => (
                    <tr key={order.id} className="hover:bg-gray-50 transition-colors group">
                      <td className="px-6 py-5">
                        <div className="flex items-center text-sm font-bold text-black border-l-4 border-transparent group-hover:border-black pl-2">
                          {order.platform && <PlatformBadge type={order.platform} />}
                          {order.customer}
                        </div>
                      </td>
                      <td className="px-6 py-5">
                        <span className="text-sm font-bold text-gray-900">{order.type}</span>
                      </td>
                      <td className="px-6 py-5">
                        <div className="flex items-center gap-2">
                          <div className={cn("w-2.5 h-2.5 rounded-full", order.statusColor)} />
                          <span className="text-sm font-bold text-gray-900">{order.status}</span>
                        </div>
                      </td>
                      <td className="px-6 py-5">
                        <div className="text-sm font-bold text-gray-900">
                          {order.orderedAt} <span className="text-gray-400 ml-1">-{order.relativeTime}</span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="px-6 py-4 bg-white border-t border-gray-100">
                <span className="text-xs font-bold text-gray-400 italic">Showing 1 to 7 of 7 results</span>
              </div>
            </div>
          </div>
        ) : (
          <div className="max-w-7xl mx-auto space-y-6">
            <h1 className="text-4xl font-black text-black mb-2">Orders</h1>
            <p className="text-sm text-gray-600 mb-8">
              Review your orders in real time. For detailed view of your pay, go to <button className="text-blue-600 underline font-medium">Payouts by order.</button>
            </p>

            <div className="flex gap-8 border-b border-gray-200">
              <button
                onClick={() => setHistorySubTab('all')}
                className={cn(
                  "pb-4 text-sm font-bold relative transition-colors",
                  historySubTab === 'all' ? "text-black" : "text-gray-400 hover:text-black"
                )}
              >
                All
                {historySubTab === 'all' && (
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-black rounded-t-full" />
                )}
              </button>
              <button
                onClick={() => setHistorySubTab('unfulfilled')}
                className={cn(
                  "pb-4 text-sm font-bold relative transition-colors flex items-center gap-2",
                  historySubTab === 'unfulfilled' ? "text-black" : "text-gray-400 hover:text-black"
                )}
              >
                Unfulfilled
                <span className="bg-[#E6F4EA] text-[#0E8345] px-1.5 py-0.5 rounded text-[10px] font-black uppercase tracking-tight">New</span>
                {historySubTab === 'unfulfilled' && (
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-black rounded-t-full" />
                )}
              </button>
            </div>

            {/* Alert Bar */}
            <div className="bg-[#FFF8E1] border border-[#FFE082] rounded-xl px-6 py-5 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="bg-orange-100 p-2 rounded-lg">
                  <AlertTriangle className="text-orange-600" size={20} />
                </div>
                <div>
                  <h3 className="text-sm font-black text-black">5 order issues with potential deduction</h3>
                  <p className="text-sm text-gray-600 mt-0.5">Review the order for more details</p>
                </div>
              </div>
              <button className="bg-[#FFD54F] hover:bg-[#FFC107] text-black px-6 py-2.5 rounded-full text-sm font-black transition-colors">
                View orders
              </button>
            </div>

            {/* Detailed Filters */}
            <div className="flex flex-wrap items-center gap-2">
              <button className="px-4 py-2 bg-white border border-gray-200 rounded-full text-sm font-bold flex items-center gap-2 hover:bg-gray-50 transition-colors">
                All stores (6) <ChevronDown size={16} className="text-gray-400" />
              </button>
              <button className="px-4 py-2 bg-white border border-gray-200 rounded-full text-sm font-bold flex items-center gap-2 hover:bg-gray-50 transition-colors">
                2024/02/12 - 2024/02/18 <ChevronDown size={16} className="text-gray-400" />
              </button>
              <button className="px-4 py-2 bg-white border border-gray-200 rounded-full text-sm font-bold flex items-center gap-2 hover:bg-gray-50 transition-colors relative">
                Sort <ChevronDown size={16} className="text-gray-400" />
                <div className="absolute -top-1 right-0 w-4 h-4 bg-[#FFD54F] rounded-full flex items-center justify-center text-[10px] font-black border-2 border-[#F6F6F6]">1</div>
              </button>
              <button className="px-4 py-2 bg-white border border-gray-200 rounded-full text-sm font-bold flex items-center gap-2 hover:bg-gray-50 transition-colors">
                Order issue <ChevronDown size={16} className="text-gray-400" />
              </button>
              <button className="px-6 py-2 bg-white border border-gray-200 rounded-full text-sm font-bold hover:bg-gray-50 transition-colors text-gray-600">
                Uber One member
              </button>
              <button className="p-2 bg-white border border-gray-200 rounded-full hover:bg-gray-50 transition-colors text-gray-400">
                <Search size={18} />
              </button>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-sm font-black text-black">1,596 Orders</span>
              <Info size={14} className="text-gray-300" />
            </div>

            {/* History Orders Table */}
            <div className="bg-white rounded-sm border border-gray-200 shadow-sm overflow-hidden">
              <table className="w-full">
                <thead>
                  <tr className="bg-white border-b border-gray-100">
                    <th className="px-6 py-5 text-left text-[11px] font-black text-gray-400 uppercase tracking-widest">Order</th>
                    <th className="px-6 py-5 text-left text-[11px] font-black text-gray-400 uppercase tracking-widest">Details</th>
                    <th className="px-6 py-5 text-left text-[11px] font-black text-gray-400 uppercase tracking-widest text-center">Fulfillment type</th>
                    <th className="px-6 py-5 text-left text-[11px] font-black text-gray-400 uppercase tracking-widest text-center">Issue</th>
                    <th className="px-6 py-5 text-right text-[11px] font-black text-gray-400 uppercase tracking-widest">Net payout</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {historyOrdersData.map((order) => (
                    <tr key={order.id} className="hover:bg-gray-50 transition-colors group">
                      <td className="px-6 py-6">
                        <div className="space-y-1">
                          <div className="text-sm font-black text-blue-600 hover:underline cursor-pointer">{order.id}</div>
                          <div className={cn(
                            "text-[10px] font-black uppercase inline-block",
                            order.status === 'Canceled' ? "text-rose-500" : "text-gray-400"
                          )}>
                            {order.status}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-6">
                        <div className="space-y-1">
                          <div className="text-sm font-black text-black leading-tight">{order.store}</div>
                          <div className="text-xs text-gray-500 font-medium">{order.date} • {order.time}</div>
                        </div>
                      </td>
                      <td className="px-6 py-6 border-x border-gray-50/50">
                        <div className="flex flex-col items-center">
                          <div className="text-sm font-black text-black leading-tight">{order.fulfillment}</div>
                          <div className="text-[11px] text-gray-400 font-bold">{order.platform}</div>
                        </div>
                      </td>
                      <td className="px-6 py-6">
                        <div className="flex justify-center">
                          <div className={cn(
                            "inline-flex items-center gap-1.5 px-3 py-1 rounded text-[10px] font-black uppercase border tracking-tight",
                            order.issueColor === 'hidden' ? "invisible" : order.issueColor
                          )}>
                            <AlertTriangle size={10} className="fill-current" />
                            {order.issue}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-6">
                        <div className="text-right text-sm font-black text-black">{order.payout}</div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="px-6 py-4 bg-white border-t border-gray-100 flex items-center justify-between">
                <span className="text-xs font-bold text-gray-400 italic">Showing 1 to 6 of 1,596 results</span>
                <div className="flex gap-2">
                  <button className="px-3 py-1 border border-gray-200 rounded text-xs font-bold text-gray-400 cursor-not-allowed">Previous</button>
                  <button className="px-3 py-1 border border-gray-200 rounded text-xs font-bold text-black hover:bg-gray-50">Next</button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Orders;
