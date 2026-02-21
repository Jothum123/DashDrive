import React from 'react';
import { 
  TrendingUp, 
  Users, 
  ShoppingBag, 
  Calendar,
  Download,
  Filter,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line
} from 'recharts';
import { cn } from '../types';

const heatmapData = [
  { hour: '8am', mon: 10, tue: 15, wed: 12, thu: 18, fri: 25, sat: 40, sun: 35 },
  { hour: '12pm', mon: 45, tue: 50, wed: 48, thu: 55, fri: 70, sat: 95, sun: 85 },
  { hour: '4pm', mon: 20, tue: 25, wed: 22, thu: 30, fri: 45, sat: 60, sun: 55 },
  { hour: '8pm', mon: 60, tue: 65, wed: 62, thu: 75, fri: 90, sat: 110, sun: 100 },
];

const topEats = [
  { name: 'Classic Burger', sales: 450, profit: '$5,400', trend: '+12%' },
  { name: 'Truffle Fries', sales: 320, profit: '$1,920', trend: '+8%' },
  { name: 'Spicy Wings', sales: 280, profit: '$3,360', trend: '-2%' },
  { name: 'Vanilla Shake', sales: 150, profit: '$900', trend: '+15%' },
];

const retentionData = [
  { name: 'New Customers', value: 400 },
  { name: 'Returning', value: 600 },
];

const COLORS = ['#F97316', '#10B981'];

const revenueData = [
  { day: 'Mon', revenue: 2400 },
  { day: 'Tue', revenue: 1398 },
  { day: 'Wed', revenue: 9800 },
  { day: 'Thu', revenue: 3908 },
  { day: 'Fri', revenue: 4800 },
  { day: 'Sat', revenue: 3800 },
  { day: 'Sun', revenue: 4300 },
];

const Analytics = () => {
  return (
    <div className="space-y-8 pb-12">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Performance & Analytics</h1>
          <p className="text-sm text-gray-500">Deep dive into your business metrics.</p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-xl text-sm font-bold hover:bg-gray-50 transition-colors">
            <Calendar size={18} />
            Feb 1 - Feb 20, 2026
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-xl text-sm font-bold hover:bg-gray-50 transition-colors">
            <Download size={18} />
            EXPORT PDF
          </button>
        </div>
      </div>

      {/* Revenue Trend Chart */}
      <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h3 className="font-bold text-lg">Revenue Trend</h3>
            <p className="text-xs text-gray-400">Daily revenue breakdown for the current week.</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
              <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">Revenue</span>
            </div>
          </div>
        </div>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F3F4F6" />
              <XAxis 
                dataKey="day" 
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
                cursor={{ fill: '#F97316', opacity: 0.05 }}
                contentStyle={{ 
                  borderRadius: '16px', 
                  border: 'none', 
                  boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
                  padding: '12px 16px'
                }}
                formatter={(value: number) => [`$${value.toLocaleString()}`, 'Revenue']}
              />
              <Bar 
                dataKey="revenue" 
                fill="#F97316" 
                radius={[6, 6, 0, 0]} 
                barSize={40}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Heatmap Widget */}
        <div className="lg:col-span-2 bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h3 className="font-bold text-lg">Peak Ordering Hours</h3>
              <p className="text-xs text-gray-400">Heatmap of order density across the week.</p>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-orange-100 rounded"></div>
              <span className="text-[10px] font-bold text-gray-400">LOW</span>
              <div className="w-3 h-3 bg-orange-500 rounded ml-2"></div>
              <span className="text-[10px] font-bold text-gray-400">HIGH</span>
            </div>
          </div>
          
          <div className="grid grid-cols-8 gap-2">
            <div className="h-8"></div>
            {['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'].map(day => (
              <div key={day} className="text-[10px] font-bold text-gray-400 text-center">{day}</div>
            ))}
            
            {heatmapData.map((row) => (
              <React.Fragment key={row.hour}>
                <div className="text-[10px] font-bold text-gray-400 flex items-center">{row.hour}</div>
                {[row.mon, row.tue, row.wed, row.thu, row.fri, row.sat, row.sun].map((val, i) => (
                  <div 
                    key={i} 
                    title={`${val} orders at ${row.hour}`}
                    className="aspect-square rounded-lg transition-all hover:scale-110 cursor-pointer group relative"
                    style={{ 
                      backgroundColor: `rgba(249, 115, 22, ${val / 110})`,
                      boxShadow: val > 80 ? '0 4px 12px rgba(249, 115, 22, 0.2)' : 'none'
                    }}
                  >
                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-gray-900 text-white text-[10px] font-bold rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-10">
                      {val} Orders
                    </div>
                  </div>
                ))}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Customer Retention */}
        <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 flex flex-col">
          <h3 className="font-bold text-lg mb-2">Customer Retention</h3>
          <p className="text-xs text-gray-400 mb-8">New vs. Returning customers this month.</p>
          
          <div className="flex-1 min-h-[200px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={retentionData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={8}
                  dataKey="value"
                >
                  {retentionData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          
          <div className="grid grid-cols-2 gap-4 mt-8">
            <div className="p-4 bg-orange-50 rounded-2xl border border-orange-100">
              <p className="text-[10px] font-bold text-orange-600 uppercase tracking-wider mb-1">New</p>
              <p className="text-xl font-bold">40%</p>
            </div>
            <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-100">
              <p className="text-[10px] font-bold text-emerald-600 uppercase tracking-wider mb-1">Returning</p>
              <p className="text-xl font-bold">60%</p>
            </div>
          </div>
        </div>

        {/* Top Eats Leaderboard */}
        <div className="lg:col-span-3 bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-8">
            <h3 className="font-bold text-lg">Top Eats Leaderboard</h3>
            <button className="text-sm font-bold text-orange-500 hover:underline">View Full Report</button>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-left border-b border-gray-100">
                  <th className="pb-4 text-xs font-bold text-gray-400 uppercase tracking-widest">Item Name</th>
                  <th className="pb-4 text-xs font-bold text-gray-400 uppercase tracking-widest">Units Sold</th>
                  <th className="pb-4 text-xs font-bold text-gray-400 uppercase tracking-widest">Gross Profit</th>
                  <th className="pb-4 text-xs font-bold text-gray-400 uppercase tracking-widest">Trend</th>
                  <th className="pb-4 text-xs font-bold text-gray-400 uppercase tracking-widest">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {topEats.map((item, i) => (
                  <tr key={i} className="group hover:bg-gray-50/50 transition-colors">
                    <td className="py-4 font-bold text-sm">{item.name}</td>
                    <td className="py-4 text-sm font-medium">{item.sales}</td>
                    <td className="py-4 text-sm font-bold text-emerald-600">{item.profit}</td>
                    <td className="py-4">
                      <div className={cn(
                        "flex items-center gap-1 text-xs font-bold",
                        item.trend.startsWith('+') ? "text-emerald-500" : "text-red-500"
                      )}>
                        {item.trend.startsWith('+') ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
                        {item.trend}
                      </div>
                    </td>
                    <td className="py-4">
                      <button className="text-xs font-bold text-gray-400 group-hover:text-orange-500 transition-colors">BOOST ITEM</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
