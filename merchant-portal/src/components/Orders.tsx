import React, { useState } from 'react';
import { 
  ChevronDown, 
  Search, 
  Info, 
  RefreshCcw,
  Check
} from 'lucide-react';
import { cn } from '../types';

const ordersData = [
  {
    id: '835',
    name: 'Mike S',
    method: 'Delivery • Uber Eats',
    store: 'Pizza Cafe',
    date: '07/07/2021 at 1:37PM',
    status: 'Inaccurate',
    price: '$35.75',
    adjustment: '- $5.43',
    avatarColor: 'bg-emerald-100',
    icon: '🍕'
  },
  {
    id: '841',
    name: 'Ashley J',
    method: 'Delivery • Uber Eats',
    store: 'Pizza Cafe',
    date: '12/30/2020 at 2:30PM',
    status: 'Inaccurate',
    price: '$48.00',
    adjustment: '- $8.23',
    avatarColor: 'bg-orange-100',
    icon: '🍔'
  },
  {
    id: '837',
    name: 'Zahir M',
    method: 'Delivery • Uber Eats',
    store: 'Pizza Cafe',
    date: '12/30/2020 at 1:59PM',
    status: 'Inaccurate',
    price: '$34.25',
    adjustment: '- $4.25',
    avatarColor: 'bg-orange-100',
    icon: '🌮'
  },
  {
    id: '0213C',
    name: 'Sharday W',
    method: 'Pickup • Uber Eats Web',
    store: 'Pizza Cafe',
    date: '04/04/2021 at 9:39PM',
    status: 'Inaccurate',
    price: '$34.12',
    adjustment: '- $8.23',
    avatarColor: 'bg-blue-100',
    icon: '🍣'
  },
  {
    id: 'FCC83',
    name: 'Matthew J',
    method: 'Delivery • Uber Eats App',
    store: 'Pizza Cafe',
    date: '04/04/2021 at 3:38AM',
    status: 'Inaccurate',
    price: '$33.65',
    adjustment: '- $4.25',
    avatarColor: 'bg-orange-100',
    icon: '🍦',
    checked: false
  }
];

const Orders = () => {
  const [selectedOrders, setSelectedOrders] = useState<string[]>(['835', '841', '837', '0213C']);

  const toggleOrder = (id: string) => {
    if (selectedOrders.includes(id)) {
      setSelectedOrders(selectedOrders.filter(o => o !== id));
    } else {
      setSelectedOrders([...selectedOrders, id]);
    }
  };

  return (
    <div className="max-w-6xl mx-auto py-8 px-8">
      <h1 className="text-4xl font-bold mb-8">Orders</h1>

      {/* Filters */}
      <div className="flex flex-wrap gap-3 mb-8">
        <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-full text-sm font-medium hover:bg-gray-200 transition-colors">
          2020/12/25 - 2020/12/30 <ChevronDown size={16} />
        </button>
        <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-full text-sm font-medium hover:bg-gray-200 transition-colors">
          All stores <ChevronDown size={16} />
        </button>
        <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-full text-sm font-medium hover:bg-gray-200 transition-colors">
          Sort <ChevronDown size={16} />
        </button>
        <button className="flex items-center gap-2 px-4 py-2 bg-black text-white rounded-full text-sm font-medium hover:bg-gray-800 transition-colors">
          Store refunded <ChevronDown size={16} />
        </button>
        <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-full text-sm font-medium hover:bg-gray-200 transition-colors">
          Uber One
        </button>
        <button className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors">
          <Search size={18} />
        </button>
      </div>

      {/* Results Info */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-2 text-sm text-gray-600">
          Showing 5 results <Info size={14} />
          <button className="text-black underline ml-2">Reset</button>
        </div>
        <button className="px-6 py-2.5 bg-black text-white rounded-full text-sm font-bold hover:bg-gray-800 transition-colors">
          Dispute orders ({selectedOrders.length})
        </button>
      </div>

      {/* Orders List */}
      <div className="space-y-0">
        {ordersData.map((order) => (
          <div 
            key={order.id} 
            className="flex items-center gap-6 py-5 border-b border-gray-100 group hover:bg-gray-50/50 transition-colors px-4 -mx-4 rounded-lg"
          >
            {/* Checkbox */}
            <button 
              onClick={() => toggleOrder(order.id)}
              className={cn(
                "w-5 h-5 rounded border flex items-center justify-center transition-colors",
                selectedOrders.includes(order.id) ? "bg-black border-black text-white" : "bg-white border-gray-300"
              )}
            >
              {selectedOrders.includes(order.id) && <Check size={14} strokeWidth={3} />}
            </button>

            {/* Avatar */}
            <div className={cn("w-10 h-10 rounded-full flex items-center justify-center text-xl shrink-0", order.avatarColor)}>
              {order.icon}
            </div>

            {/* Name & ID */}
            <div className="w-32">
              <div className="font-bold text-sm">{order.name}</div>
              <div className="text-xs text-gray-500">{order.id}</div>
            </div>

            {/* Method */}
            <div className="flex-1 text-sm text-gray-600">
              {order.method}
            </div>

            {/* Store & Date */}
            <div className="w-48">
              <div className="text-xs text-gray-500">{order.store}</div>
              <div className="text-xs text-gray-500">{order.date}</div>
            </div>

            {/* Status Badge */}
            <div className="w-24">
              <span className="px-3 py-1 bg-orange-50 text-orange-600 rounded-full text-[10px] font-bold border border-orange-100 uppercase tracking-wider">
                {order.status}
              </span>
            </div>

            {/* Price */}
            <div className="text-right min-w-[80px]">
              <div className="text-sm font-bold">{order.price}</div>
              <div className="text-xs text-red-500 font-medium">{order.adjustment}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;
