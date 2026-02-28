import React, { useState, useEffect } from 'react';
import {
  TrendingUp,
  Users,
  ShoppingBag,
  AlertCircle,
  Clock,
  ArrowUpRight,
  ArrowDownRight,
  MoreHorizontal,
  ChevronRight,
  Camera,
  UserPlus,
  Settings as SettingsIcon,
  MessageSquare,
  Activity,
  Zap,
  Target,
  Globe
} from 'lucide-react';
import {
  AreaChart,
  Area,
  ResponsiveContainer,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  BarChart,
  Bar
} from 'recharts';
import { motion } from 'motion/react';
import { cn } from '../types';
import { fetchFromAdmin } from '../api';

const salesData = [
  { name: 'Mon', sales: 4200, orders: 120 },
  { name: 'Tue', sales: 3800, orders: 110 },
  { name: 'Wed', sales: 3200, orders: 95 },
  { name: 'Thu', sales: 4500, orders: 140 },
  { name: 'Fri', sales: 5100, orders: 165 },
  { name: 'Sat', sales: 6200, orders: 200 },
  { name: 'Sun', sales: 5800, orders: 185 },
];

const TaskCard = ({ title, description, icon: Icon, action, severity }: { title: string, description: string, icon: any, action: string, severity?: 'critical' | 'warning' | 'info' }) => (
  <motion.div
    whileHover={{ y: -4 }}
    className="card-premium p-6 flex items-start gap-4 relative overflow-hidden group border-none"
  >
    {severity === 'critical' && <div className="absolute left-0 top-0 bottom-0 w-1 bg-rose-500 shadow-[0_0_15px_rgba(244,63,94,0.5)]" />}

    <div className={cn(
      "w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 transition-all duration-300",
      severity === 'critical' ? "bg-rose-50 text-rose-500 group-hover:bg-rose-500 group-hover:text-white" :
        severity === 'warning' ? "bg-amber-50 text-amber-500 group-hover:bg-amber-500 group-hover:text-white" :
          "bg-[#00ff90]/10 text-[#00ff90] group-hover:bg-[#00ff90] group-hover:text-black"
    )}>
      <Icon size={24} />
    </div>
    <div className="flex-1">
      <h3 className="font-black text-black text-[15px] mb-1 leading-tight">{title}</h3>
      <p className="text-[12px] text-gray-500 mb-4 font-medium leading-relaxed">{description}</p>
      <button className="text-[11px] font-black text-black flex items-center gap-1 group-hover:translate-x-1 transition-transform uppercase tracking-widest">
        {action} <ChevronRight size={14} className="text-[#00ff90]" />
      </button>
    </div>
  </motion.div>
);

const Dashboard = () => {
  const [metrics, setMetrics] = useState({
    orders_today: 0,
    revenue_today: 0,
    avg_prep_time: 0,
    late_orders: 0,
    active_stores: 0
  });

  useEffect(() => {
    const loadMetrics = async () => {
      try {
        const data = await fetchFromAdmin('/admin/dashboard/overview');
        setMetrics(data);
      } catch (err) {
        console.error("Dashboard fetch failed:", err);
      }
    };
    loadMetrics();
    const interval = setInterval(loadMetrics, 30000);
    return () => clearInterval(interval);
  }, []);

  const stats = [
    { label: 'Active Fleet', value: metrics.active_stores, target: '84', icon: Activity, color: '#00ff90' },
    { label: 'Live Orders', value: metrics.orders_today, trend: '+12%', icon: Zap, color: '#00ff90' },
    { label: 'Service Level', value: `${metrics.avg_prep_time}m`, target: '15m', icon: Target, color: '#000000' },
    { label: 'Breach Risk', value: metrics.late_orders, status: metrics.late_orders > 0 ? 'Critical' : 'Safe', icon: AlertCircle, color: metrics.late_orders > 0 ? '#f43f5e' : '#00ff90' },
  ];

  return (
    <div className="max-w-7xl mx-auto space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Executive Welcome Section */}
      <div className="flex items-end justify-between">
        <div className="space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-black text-white rounded-full text-[10px] font-black uppercase tracking-[0.2em]">
            <span className="w-1.5 h-1.5 bg-[#00ff90] rounded-full shadow-[0_0_8px_#00ff90] animate-pulse"></span>
            Global Operations Center
          </div>
          <h1 className="text-5xl font-black text-black tracking-tighter leading-none">Command <span className="text-[#00ff90] drop-shadow-sm">Center</span></h1>
          <p className="text-lg text-gray-500 font-medium tracking-tight">Real-time performance distribution across 84 geographic hubs.</p>
        </div>

        <div className="flex bg-white p-1 rounded-2xl border border-gray-100 shadow-sm glass">
          <button className="px-6 py-2.5 text-[11px] font-black bg-black text-white rounded-xl uppercase tracking-widest shadow-lg shadow-black/10 transition-all">Overview</button>
          <button className="px-6 py-2.5 text-[11px] font-black text-gray-400 hover:text-black rounded-xl uppercase tracking-widest transition-all">Live Map</button>
        </div>
      </div>

      {/* KPI Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        {stats.map((item, i) => (
          <motion.div
            key={i}
            whileHover={{ scale: 1.02, y: -4 }}
            className="card-premium p-8 flex flex-col justify-between group h-full border-none shadow-[0_10px_30px_-10px_rgba(0,0,0,0.05)]"
          >
            <div className="flex items-center justify-between mb-8">
              <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center text-gray-300 group-hover:bg-black group-hover:text-[#00ff90] transition-all duration-300">
                <item.icon size={20} />
              </div>
              {item.trend && <span className="text-[10px] font-black text-[#10b981] bg-[#10b981]/10 px-2 py-0.5 rounded-lg">{item.trend}</span>}
              {item.status && <span className={cn(
                "text-[10px] font-black px-2 py-0.5 rounded-lg",
                item.status === 'Critical' ? "text-rose-600 bg-rose-50" : "text-[#00ff90] bg-[#00ff90]/10"
              )}>{item.status}</span>}
            </div>

            <div>
              <p className="text-[11px] font-black text-gray-400 uppercase tracking-widest mb-2 leading-none">{item.label}</p>
              <div className="flex items-baseline gap-2">
                <span className="text-4xl font-black tracking-tighter text-black">{item.value}</span>
                {item.target && <span className="text-sm font-bold text-gray-300">/ {item.target}</span>}
              </div>
            </div>

            <div className="mt-8 relative h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: i === 3 && item.status === 'Critical' ? '85%' : '75%' }}
                transition={{ duration: 1.5, delay: i * 0.1 }}
                className="h-full rounded-full"
                style={{ backgroundColor: item.color }}
              />
            </div>
          </motion.div>
        ))}
      </div>

      {/* Primary Analytics Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Sales Chart */}
        <div className="lg:col-span-2 card-premium p-10 border-none relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-8">
            <div className="flex items-center gap-3">
              <div className="flex flex-col items-end">
                <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest leading-none mb-1">Total Sales</span>
                <span className="text-2xl font-black text-black tracking-tighter leading-none">£142,480.00</span>
              </div>
              <div className="w-10 h-10 rounded-2xl bg-[#00ff90]/10 text-[#00ff90] flex items-center justify-center">
                <TrendingUp size={20} />
              </div>
            </div>
          </div>

          <div className="flex flex-col mb-12">
            <h3 className="font-black text-2xl text-black tracking-tight mb-2">Revenue Growth</h3>
            <p className="text-sm text-gray-400 font-medium tracking-tight">Daily sales volume across all connected merchant partners.</p>
          </div>

          <div className="h-[380px] w-full mt-4">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={salesData}>
                <defs>
                  <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#00ff90" stopOpacity={0.2} />
                    <stop offset="95%" stopColor="#00ff90" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                <XAxis
                  dataKey="name"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 11, fill: '#999', fontWeight: 800, textTransform: 'uppercase' }}
                  dy={15}
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 11, fill: '#999', fontWeight: 800 }}
                  tickFormatter={(value) => `£${value / 1000}k`}
                />
                <Tooltip
                  cursor={{ stroke: '#00ff90', strokeWidth: 1 }}
                  contentStyle={{
                    borderRadius: '24px',
                    border: 'none',
                    boxShadow: '0 20px 40px -10px rgba(0,0,0,0.1)',
                    padding: '16px'
                  }}
                  itemStyle={{ fontWeight: 900, color: '#000', textTransform: 'uppercase', fontSize: '10px' }}
                />
                <Area
                  type="monotone"
                  dataKey="sales"
                  stroke="#000"
                  strokeWidth={4}
                  fillOpacity={1}
                  fill="url(#colorSales)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Live Ops Monitor */}
        <div className="card-premium p-10 border-none bg-black">
          <div className="flex items-center justify-between mb-10">
            <div>
              <h3 className="font-black text-2xl text-white tracking-tight leading-none mb-2">Live Monitor</h3>
              <span className="text-[10px] text-zinc-500 font-black uppercase tracking-[0.2em]">Real-time Event Stream</span>
            </div>
            <div className="px-3 py-1 bg-[#00ff90] text-black rounded-lg text-[9px] font-black uppercase tracking-widest">
              Active
            </div>
          </div>

          <div className="space-y-8">
            {[
              { title: 'Marketplace Cluster #4', detail: 'High latency pulse', time: 'Just now', icon: Activity, color: '#00ff90' },
              { title: 'New Store Online', value: 'Lywood Hub Ready', time: '12m ago', icon: Globe, color: '#fff' },
              { title: 'Volume Spike', detail: '42%+ above average', time: '24m ago', icon: TrendingUp, color: '#00ff90' },
              { title: 'Maintenance Window', detail: 'Scheduled for 04:00', time: '2h ago', icon: Clock, color: '#zinc-600' },
            ].map((activity, i) => (
              <div key={i} className="flex gap-4 group cursor-pointer">
                <div className="shrink-0 w-11 h-11 rounded-2xl bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-500 group-hover:text-white transition-all">
                  <activity.icon size={18} />
                </div>
                <div className="flex-1 border-b border-zinc-800/50 pb-5">
                  <div className="flex justify-between items-start mb-1">
                    <p className="text-[13px] font-black text-white group-hover:text-[#00ff90] transition-colors">{activity.title}</p>
                    <p className="text-[9px] text-zinc-600 font-bold uppercase">{activity.time}</p>
                  </div>
                  <p className="text-[11px] text-zinc-500 font-medium">{activity.detail || activity.value}</p>
                </div>
              </div>
            ))}
          </div>

          <button className="w-full mt-10 py-4 text-[10px] font-black text-white border border-zinc-800 rounded-2xl hover:bg-zinc-900 transition-all uppercase tracking-[0.2em]">
            Export Systems Log
          </button>
        </div>
      </div>

      {/* Operational Escalations */}
      <section className="space-y-8 px-2">
        <div className="flex items-end justify-between">
          <div className="space-y-1">
            <h2 className="text-3xl font-black text-black tracking-tight">Action Items</h2>
            <p className="text-sm text-gray-400 font-medium tracking-tight">Manual intervention required for the following operational blocks.</p>
          </div>
          <button className="px-6 py-2 border-2 border-black text-[11px] font-black rounded-xl uppercase tracking-widest hover:bg-black hover:text-white transition-all">View Hierarchy</button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <TaskCard
            severity="critical"
            title="Service SLA Breach"
            description="5 stores in 'North Region' are reporting prep times 20% above SLA thresholds."
            icon={AlertCircle}
            action="Calibrate Latency"
          />
          <TaskCard
            severity="warning"
            title="Integrations Sync"
            description="Global price update failed for 12 locations due to restricted POS connection."
            icon={SettingsIcon}
            action="Force Menu Sync"
          />
          <TaskCard
            title="Support Escalations"
            description="3 high-priority refund disputes are waiting for regional manager approval."
            icon={MessageSquare}
            action="Review Disputes"
          />
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
