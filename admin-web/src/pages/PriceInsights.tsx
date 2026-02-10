import { ArrowUpRight, BarChart3, Calendar, Download, Filter, TrendingUp } from 'lucide-react';
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import PageBreadcrumb from '../components/common/PageBreadcrumb';

const data = [
    { name: 'Mon', price: 12.5, volume: 420 },
    { name: 'Tue', price: 13.2, volume: 450 },
    { name: 'Wed', price: 11.8, volume: 380 },
    { name: 'Thu', price: 14.5, volume: 510 },
    { name: 'Fri', price: 18.2, volume: 720 },
    { name: 'Sat', price: 21.0, volume: 840 },
    { name: 'Sun', price: 16.5, volume: 600 },
];

export function PriceInsights() {
    return (
        <div className="min-h-screen bg-transparent dark:text-white/90 flex flex-col">
            <PageBreadcrumb pageTitle="Price Insights" />

            <div className="flex-1 space-y-6">

                {/* Filters Row */}
                <div className="flex flex-wrap items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                        <button className="px-4 py-2 card text-[11px] font-bold uppercase tracking-widest flex items-center gap-2 hover:bg-gray-50 dark:hover:bg-white/5 transition-all text-gray-700 dark:text-gray-400">
                            <Calendar size={14} className="text-primary" />
                            Last 7 Days
                        </button>
                        <button className="px-4 py-2 card text-[11px] font-bold uppercase tracking-widest flex items-center gap-2 hover:bg-gray-50 dark:hover:bg-white/5 transition-all text-gray-700 dark:text-gray-400">
                            <Filter size={14} className="text-primary" />
                            All Regions
                        </button>
                    </div>
                    <button className="px-5 py-2.5 bg-primary text-black text-[11px] font-black uppercase tracking-widest rounded-xl flex items-center gap-2 hover:shadow-lg hover:shadow-primary/20 transition-all">
                        <Download size={14} />
                        Export Data
                    </button>
                </div>

                {/* Charts Row */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div className="card p-6 space-y-6 shadow-sm">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="p-2.5 bg-gray-50 dark:bg-gray-800 rounded-xl">
                                    <TrendingUp className="text-primary" size={18} />
                                </div>
                                <h3 className="text-sm font-bold text-gray-800 dark:text-white uppercase tracking-widest">Average Fare Trend</h3>
                            </div>
                            <span className="badge badge-success">+14.2%</span>
                        </div>
                        <div className="h-64">
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={data}>
                                    <defs>
                                        <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#00ff90" stopOpacity={0.2} />
                                            <stop offset="95%" stopColor="#00ff90" stopOpacity={0} />
                                        </linearGradient>
                                    </defs>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} className="dark:stroke-gray-800" />
                                    <XAxis dataKey="name" stroke="#94a3b8" fontSize={10} axisLine={false} tickLine={false} dy={10} />
                                    <YAxis stroke="#94a3b8" fontSize={10} axisLine={false} tickLine={false} tickFormatter={(val) => `£${val}`} />
                                    <Tooltip
                                        contentStyle={{ backgroundColor: '#101828', border: 'none', borderRadius: '12px' }}
                                        labelStyle={{ color: '#00ff90', fontWeight: 'bold' }}
                                        itemStyle={{ fontSize: '11px', color: '#fff' }}
                                    />
                                    <Area type="monotone" dataKey="price" stroke="#00ff90" strokeWidth={3} fillOpacity={1} fill="url(#colorPrice)" />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    <div className="card p-6 space-y-6 shadow-sm">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="p-2.5 bg-gray-50 dark:bg-gray-800 rounded-xl">
                                    <BarChart3 className="text-secondary" size={18} />
                                </div>
                                <h3 className="text-sm font-bold text-gray-800 dark:text-white uppercase tracking-widest">Match Volume</h3>
                            </div>
                            <span className="badge badge-success">2.4k Rides</span>
                        </div>
                        <div className="h-64">
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={data}>
                                    <defs>
                                        <linearGradient id="colorVolume" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#465fff" stopOpacity={0.2} />
                                            <stop offset="95%" stopColor="#465fff" stopOpacity={0} />
                                        </linearGradient>
                                    </defs>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} className="dark:stroke-gray-800" />
                                    <XAxis dataKey="name" stroke="#94a3b8" fontSize={10} axisLine={false} tickLine={false} dy={10} />
                                    <YAxis stroke="#94a3b8" fontSize={10} axisLine={false} tickLine={false} />
                                    <Tooltip
                                        contentStyle={{ backgroundColor: '#101828', border: 'none', borderRadius: '12px' }}
                                        labelStyle={{ color: '#465fff', fontWeight: 'bold' }}
                                        itemStyle={{ fontSize: '11px', color: '#fff' }}
                                    />
                                    <Area type="monotone" dataKey="volume" stroke="#465fff" strokeWidth={3} fillOpacity={1} fill="url(#colorVolume)" />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </div>

                {/* Profitability Table */}
                <div className="card overflow-hidden shadow-sm">
                    <div className="p-6 border-b border-gray-100 dark:border-gray-800">
                        <h3 className="text-lg font-bold text-gray-800 dark:text-white tracking-tight">Route Profitability</h3>
                        <p className="text-xs text-gray-500 dark:text-gray-400">Historical margin analysis by segment</p>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead>
                                <tr className="text-gray-400 text-[11px] font-bold uppercase tracking-widest border-b border-gray-100 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-900/50">
                                    <th className="px-6 py-4">Route Segment</th>
                                    <th className="px-6 py-4">Avg. Fare</th>
                                    <th className="px-6 py-4">Growth</th>
                                    <th className="px-6 py-4">Matches</th>
                                    <th className="px-6 py-4 text-right">Details</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                                {[
                                    { route: 'Downtown → Airport', fare: '£42.50', growth: '+8.2%', matches: '124' },
                                    { route: 'Soho → Canary Wharf', fare: '£18.20', growth: '+12.4%', matches: '412' },
                                    { route: 'Shoreditch → Westminster', fare: '£14.50', growth: '-2.1%', matches: '286' },
                                ].map((item, idx) => (
                                    <tr key={idx} className="hover:bg-gray-50 dark:hover:bg-white/[0.01] transition-all group">
                                        <td className="px-6 py-5 font-bold text-gray-800 dark:text-white text-sm">{item.route}</td>
                                        <td className="px-6 py-5 font-bold text-sm text-gray-600 dark:text-gray-400">{item.fare}</td>
                                        <td className="px-6 py-5">
                                            <span className={`badge ${item.growth.startsWith('+') ? 'badge-success' : 'badge-error'}`}>
                                                {item.growth}
                                            </span>
                                        </td>
                                        <td className="px-6 py-5 text-gray-500 font-bold text-sm tracking-tight">{item.matches}</td>
                                        <td className="px-6 py-5 text-right">
                                            <button className="p-2 hover:bg-gray-100 dark:hover:bg-white/5 rounded-lg transition-colors">
                                                <ArrowUpRight size={18} className="text-gray-400 group-hover:text-primary transition-colors" />
                                            </button>
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
}

