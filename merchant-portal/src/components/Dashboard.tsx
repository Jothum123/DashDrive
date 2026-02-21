import React from 'react';
import { 
  TrendingUp, 
  Users, 
  ShoppingBag, 
  AlertCircle, 
  Clock, 
  ArrowUpRight, 
  ArrowDownRight,
  MoreHorizontal
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  AreaChart,
  Area
} from 'recharts';
import { cn } from '../types';

const data = [
  { name: 'Mon', sales: 4000 },
  { name: 'Tue', sales: 3000 },
  { name: 'Wed', sales: 2000 },
  { name: 'Thu', sales: 2780 },
  { name: 'Fri', sales: 1890 },
  { name: 'Sat', sales: 2390 },
  { name: 'Sun', sales: 3490 },
];

const Dashboard = () => {
  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="flex items-end justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Good morning, Alex</h1>
          <p className="text-gray-500 mt-1">Here's what's happening with your store today.</p>
        </div>
        <div className="flex gap-3">
          <div className="flex flex-col items-end">
            <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Current Time</span>
            <span className="text-lg font-mono font-medium">11:44 AM</span>
          </div>
        </div>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { label: 'Gross Sales', value: '$12,480.00', trend: '+12.5%', isUp: true, icon: TrendingUp, color: 'text-emerald-500', bg: 'bg-emerald-50' },
          { label: 'Order Volume', value: '156', trend: '+8.2%', isUp: true, icon: ShoppingBag, color: 'text-blue-500', bg: 'bg-blue-50' },
          { label: 'Avg. Ticket Size', value: '$80.00', trend: '-2.4%', isUp: false, icon: Users, color: 'text-orange-500', bg: 'bg-orange-50' },
        ].map((stat, i) => (
          <div key={i} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start mb-4">
              <div className={stat.bg + " p-3 rounded-xl"}>
                <stat.icon size={24} className={stat.color} />
              </div>
              <div className={stat.isUp ? "text-emerald-600 flex items-center text-sm font-bold" : "text-red-600 flex items-center text-sm font-bold"}>
                {stat.isUp ? <ArrowUpRight size={16} /> : <ArrowDownRight size={16} />}
                {stat.trend}
              </div>
            </div>
            <div className="space-y-1">
              <p className="text-sm font-medium text-gray-500 uppercase tracking-wider">{stat.label}</p>
              <p className="text-3xl font-bold tracking-tight">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Sales Chart */}
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-8">
            <h3 className="font-bold text-lg">Sales Overview</h3>
            <select className="bg-gray-50 border-none text-sm font-medium rounded-lg px-3 py-1.5 focus:ring-0">
              <option>Last 7 Days</option>
              <option>Last 30 Days</option>
            </select>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#F97316" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#F97316" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F3F4F6" />
                <XAxis 
                  dataKey="name" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fontSize: 12, fill: '#9CA3AF' }}
                  dy={10}
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fontSize: 12, fill: '#9CA3AF' }}
                  tickFormatter={(value) => `$${value}`}
                />
                <Tooltip 
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                />
                <Area 
                  type="monotone" 
                  dataKey="sales" 
                  stroke="#F97316" 
                  strokeWidth={3}
                  fillOpacity={1} 
                  fill="url(#colorSales)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Urgent Action Feed */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-bold text-lg">Urgent Actions</h3>
            <span className="bg-red-100 text-red-600 px-2 py-1 rounded text-[10px] font-black uppercase">3 Alerts</span>
          </div>
          <div className="space-y-4">
            {[
              { title: 'Missed Order #4829', time: '12m ago', type: 'critical', icon: AlertCircle },
              { title: 'Printer Offline (Kitchen)', time: '24m ago', type: 'warning', icon: Clock },
              { title: 'Low Stock: Brioche Buns', time: '1h ago', type: 'info', icon: AlertCircle },
            ].map((alert, i) => (
              <div key={i} className="flex gap-4 p-4 rounded-xl bg-gray-50 border border-gray-100 hover:border-orange-200 transition-colors cursor-pointer group">
                <div className={cn(
                  "shrink-0 w-10 h-10 rounded-full flex items-center justify-center",
                  alert.type === 'critical' ? "bg-red-100 text-red-600" : 
                  alert.type === 'warning' ? "bg-orange-100 text-orange-600" : "bg-blue-100 text-blue-600"
                )}>
                  <alert.icon size={20} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold truncate group-hover:text-orange-600 transition-colors">{alert.title}</p>
                  <p className="text-xs text-gray-500">{alert.time}</p>
                </div>
                <MoreHorizontal size={16} className="text-gray-400" />
              </div>
            ))}
          </div>
          <button className="w-full mt-6 py-3 text-sm font-bold text-orange-500 hover:bg-orange-50 rounded-xl transition-colors">
            View All Alerts
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
