import {
    ArrowDownRight,
    ArrowUpRight,
    Award,
    BarChart3,
    Download,
    Star,
    TrendingUp,
    Users,
    Zap
} from 'lucide-react';
import React, { useState } from 'react';
import { Header } from '../components/layout/Header';
import { useAdminStore } from '../stores/adminStore';

export const PerformanceInsight: React.FC = () => {
    const { drivers } = useAdminStore();
    const [timeframe, setTimeframe] = useState<'daily' | 'weekly' | 'monthly'>('weekly');

    const activeDrivers = drivers.filter(d => d.status === 'active').length;
    const avgRating = (drivers.reduce((acc, d) => acc + d.rating, 0) / drivers.length).toFixed(2);
    const totalYield = drivers.reduce((acc, d) => acc + d.totalEarnings, 0);

    return (
        <div className="min-h-screen bg-black text-white flex flex-col">
            <Header
                title="Fleet Intelligence"
                subtitle="Performance Metrics & Growth Projection"
                actions={
                    <div className="flex gap-3">
                        <select
                            value={timeframe}
                            onChange={(e) => setTimeframe(e.target.value as any)}
                            className="bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-2 text-[10px] font-black uppercase tracking-widest outline-none focus:border-primary/30 appearance-none min-w-[120px]"
                        >
                            <option value="daily">Daily View</option>
                            <option value="weekly">Weekly View</option>
                            <option value="monthly">Monthly View</option>
                        </select>
                        <button className="px-6 py-3 bg-zinc-900 border border-white/5 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-zinc-800 transition-all text-zinc-400 flex items-center gap-2">
                            <Download size={14} />
                            Export Data
                        </button>
                    </div>
                }
            />

            <div className="flex-1 p-8 space-y-8">
                {/* Executive Summary Stats */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    <PerformanceStat
                        label="Active Deployment"
                        value={activeDrivers}
                        trend="+12%"
                        icon={<Users size={20} />}
                        color="text-primary"
                    />
                    <PerformanceStat
                        label="Avg. KPI Rating"
                        value={avgRating}
                        trend="+0.05"
                        icon={<Star size={20} />}
                        color="text-amber-500"
                    />
                    <PerformanceStat
                        label="Gross Revenue"
                        value={`£${(totalYield / 1000).toFixed(1)}k`}
                        trend="+8.2%"
                        icon={<TrendingUp size={20} />}
                        color="text-primary"
                    />
                    <PerformanceStat
                        label="Retention Rate"
                        value="94.2%"
                        trend="-0.5%"
                        isNegative
                        icon={<Award size={20} />}
                        color="text-zinc-400"
                    />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Performance Trends Chart Placeholder */}
                    <div className="lg:col-span-2 bg-zinc-900/50 border border-zinc-800 rounded-[40px] p-10 flex flex-col min-h-[400px]">
                        <div className="flex items-center justify-between mb-8">
                            <div>
                                <h3 className="text-xl font-black uppercase tracking-tight">Earning Projection</h3>
                                <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Revenue variance over selected timeframe</p>
                            </div>
                            <div className="flex items-center gap-4">
                                <div className="flex items-center gap-2">
                                    <div className="w-2 h-2 rounded-full bg-primary" />
                                    <span className="text-[9px] font-black uppercase text-zinc-400">Current</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="w-2 h-2 rounded-full bg-zinc-700" />
                                    <span className="text-[9px] font-black uppercase text-zinc-400">Previous</span>
                                </div>
                            </div>
                        </div>

                        <div className="flex-1 flex items-end justify-between gap-4 mt-8">
                            {[45, 62, 55, 80, 70, 95, 85].map((h, i) => (
                                <div key={i} className="flex-1 flex flex-col items-center gap-4">
                                    <div className="w-full relative group">
                                        <div
                                            className="absolute bottom-0 w-full bg-zinc-800 rounded-t-xl transition-all h-full opacity-30"
                                            style={{ height: `${h - 20}%` }}
                                        />
                                        <div
                                            className="relative w-full bg-primary/20 hover:bg-primary transition-all rounded-t-xl group-hover:shadow-[0_0_20px_rgba(0,255,144,0.3)]"
                                            style={{ height: `${h}%` }}
                                        >
                                            <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-zinc-900 border border-zinc-800 text-white text-[10px] font-black px-2 py-1 rounded-lg opacity-0 group-hover:opacity-100 transition-all">
                                                £{(h * 120).toLocaleString()}
                                            </div>
                                        </div>
                                    </div>
                                    <span className="text-[10px] font-black text-zinc-600 uppercase">Day {i + 1}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Operational Insights */}
                    <div className="bg-zinc-900/50 border border-zinc-800 rounded-[40px] p-10 space-y-10">
                        <div className="flex items-center gap-3">
                            <BarChart3 className="text-primary" size={20} />
                            <h3 className="text-sm font-black uppercase tracking-widest text-primary">Strategic Insights</h3>
                        </div>

                        <div className="space-y-8">
                            <InsightMetric
                                label="Top Performer Average"
                                value="£1,840 / wk"
                                trend="+ 4.2%"
                            />
                            <InsightMetric
                                label="Empty Leg Variance"
                                value="12.4%"
                                trend="- 2.1%"
                                isGood
                            />
                            <InsightMetric
                                label="Surge Participation"
                                value="68.5%"
                                trend="+ 15%"
                            />
                        </div>

                        <div className="pt-8 border-t border-white/5">
                            <p className="text-[10px] font-black text-zinc-500 uppercase tracking-[0.2em] mb-4">Urgent Actions</p>
                            <div className="p-5 bg-red-500/5 border border-red-500/10 rounded-3xl space-y-3">
                                <div className="flex items-center gap-3">
                                    <Zap className="text-red-500" size={16} />
                                    <p className="text-xs font-black uppercase tracking-tight text-red-500/80">Surge Blind Spots</p>
                                </div>
                                <p className="text-[11px] font-bold text-zinc-400 leading-relaxed italic">
                                    "15% of fleet is idle during active surge windows in West End."
                                </p>
                                <button className="w-full py-3 bg-red-500/10 hover:bg-red-500 text-red-500 hover:text-white border border-red-500/20 text-[9px] font-black uppercase tracking-widest rounded-xl transition-all">
                                    Dispatch Priority Alert
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Top Performers Table */}
                <div className="bg-zinc-900/50 border border-zinc-800 rounded-[40px] overflow-hidden">
                    <div className="px-10 py-8 border-b border-zinc-800 flex items-center justify-between">
                        <h3 className="text-sm font-black uppercase tracking-widest">Elite Tier Deployment</h3>
                        <button className="text-[10px] font-black uppercase tracking-widest text-primary hover:underline transition-all">View All Performance</button>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="text-zinc-500 text-[10px] font-black uppercase tracking-widest border-b border-zinc-800 bg-zinc-900/20">
                                    <th className="px-10 py-5">Pilot Asset</th>
                                    <th className="px-10 py-5">Weekly Yield</th>
                                    <th className="px-10 py-5">Completion Delta</th>
                                    <th className="px-10 py-5">Rating consistency</th>
                                    <th className="px-10 py-5 text-right">Trend</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-zinc-800/50">
                                {drivers.slice(0, 5).map((driver) => (
                                    <tr key={driver.id} className="hover:bg-zinc-800/30 transition-all">
                                        <td className="px-10 py-5">
                                            <div className="flex items-center gap-4">
                                                <div className="w-10 h-10 rounded-xl bg-zinc-800 border border-white/5 flex items-center justify-center font-black text-xs text-primary">
                                                    {driver.name.charAt(0)}
                                                </div>
                                                <div>
                                                    <p className="text-xs font-black text-white">{driver.name}</p>
                                                    <p className="text-[9px] text-zinc-500 font-bold uppercase">{driver.carModel}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-10 py-5 font-black text-white text-sm">£{(driver.totalEarnings / 4).toLocaleString()}</td>
                                        <td className="px-10 py-5 font-bold text-zinc-400 text-xs text-sm">98.5%</td>
                                        <td className="px-10 py-5">
                                            <div className="flex items-center gap-1">
                                                {[...Array(5)].map((_, i) => (
                                                    <Star key={i} size={10} fill={i < Math.floor(driver.rating) ? 'currentColor' : 'none'} className={i < Math.floor(driver.rating) ? 'text-primary' : 'text-zinc-800'} />
                                                ))}
                                            </div>
                                        </td>
                                        <td className="px-10 py-5 text-right">
                                            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-lg bg-primary/10 text-primary text-[10px] font-black">
                                                <ArrowUpRight size={12} />
                                                4.2%
                                            </span>
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

function PerformanceStat({ label, value, trend, icon, color, isNegative = false }: any) {
    return (
        <div className="p-8 bg-zinc-900/50 border border-zinc-800 rounded-[32px] group hover:bg-zinc-900 transition-all relative overflow-hidden">
            <div className={`w-12 h-12 rounded-2xl bg-black border border-zinc-800 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform ${color}`}>
                {icon}
            </div>
            <div className="flex items-end justify-between items-start">
                <div>
                    <p className="text-3xl font-black tracking-tighter mb-1 leading-none">{value}</p>
                    <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">{label}</p>
                </div>
                <div className={`flex items-center gap-1 text-[10px] font-black px-2 py-1 rounded-lg ${isNegative ? 'bg-red-500/10 text-red-500' : 'bg-primary/10 text-primary'}`}>
                    {isNegative ? <ArrowDownRight size={12} /> : <ArrowUpRight size={12} />}
                    {trend}
                </div>
            </div>
        </div>
    );
}

function InsightMetric({ label, value, trend, isGood = false }: any) {
    return (
        <div className="flex items-center justify-between">
            <div>
                <p className="text-[10px] font-black text-zinc-500 uppercase tracking-widest mb-1">{label}</p>
                <p className="text-lg font-black">{value}</p>
            </div>
            <div className={`px-2 py-1 rounded-lg text-[10px] font-black flex items-center gap-1 ${isGood ? 'bg-primary/10 text-primary' : 'bg-zinc-950 text-zinc-500 border border-zinc-800'}`}>
                {trend}
            </div>
        </div>
    );
}

export default PerformanceInsight;
