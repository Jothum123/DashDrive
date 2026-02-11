import { ArrowUpRight, BarChart3, Globe, Rocket, Target, Users, Zap } from 'lucide-react';
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { Header } from '../components/layout/Header';

const growthData = [
    { name: 'Week 1', newUsers: 120, revenue: 5000 },
    { name: 'Week 2', newUsers: 180, revenue: 7500 },
    { name: 'Week 3', newUsers: 240, revenue: 12000 },
    { name: 'Week 4', newUsers: 400, revenue: 21000 },
];

export function Growth() {
    return (
        <div className="min-h-screen bg-black text-white flex flex-col">
            <Header title="Growth" subtitle="Regional Expansion & User Acquisition Metrics" />

            <div className="flex-1 p-8 space-y-8">

                {/* Acquisition KPIs */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    <GrowthCard
                        label="New Passengers"
                        value="+2,450"
                        sub="Last 30 days"
                        trend="+12.5%"
                        icon={<Users className="text-primary" size={20} />}
                    />
                    <GrowthCard
                        label="Market Share"
                        value="18.2%"
                        sub="In London Hub"
                        trend="+2.1%"
                        icon={<Globe className="text-primary" size={20} />}
                    />
                    <GrowthCard
                        label="Conversion Rate"
                        value="4.8%"
                        sub="App Install -> Ride"
                        trend="-0.4%"
                        trendIsRed={true}
                        icon={<Zap className="text-primary" size={20} />}
                    />
                    <GrowthCard
                        label="Referral Lift"
                        value="£4,500"
                        sub="Network Growth"
                        trend="+45%"
                        icon={<Rocket className="text-primary" size={20} />}
                    />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">

                    {/* Growth Chart */}
                    <div className="lg:col-span-3 bg-zinc-900/50 border border-zinc-800 rounded-[40px] p-8 space-y-8">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <BarChart3 className="text-primary" size={20} strokeWidth={2.5} />
                                <h3 className="text-lg font-black tracking-tighter text-white">Acquisition Velocity</h3>
                            </div>
                        </div>
                        <div className="h-80">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={growthData}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#18181b" vertical={false} />
                                    <XAxis dataKey="name" stroke="#52525b" fontSize={10} axisLine={false} tickLine={false} dy={10} />
                                    <YAxis stroke="#52525b" fontSize={10} axisLine={false} tickLine={false} />
                                    <Tooltip
                                        cursor={{ fill: '#18181b' }}
                                        contentStyle={{ backgroundColor: '#09090b', border: '1px solid #18181b', borderRadius: '12px' }}
                                        labelStyle={{ color: '#00ff90', fontWeight: 'bold' }}
                                    />
                                    <Bar dataKey="newUsers" fill="#00ff90" radius={[4, 4, 0, 0]} barSize={40} />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    {/* Channel Performance */}
                    <div className="lg:col-span-2 bg-zinc-900/50 border border-zinc-800 rounded-[40px] p-8 space-y-8">
                        <div className="flex items-center gap-3">
                            <Target className="text-primary" size={20} strokeWidth={2.5} />
                            <h3 className="text-lg font-black tracking-tighter text-white">Acquisition Channels</h3>
                        </div>
                        <div className="space-y-6">
                            <ChannelRow label="Social Media" value="45%" color="bg-primary" />
                            <ChannelRow label="Referral Program" value="30%" color="bg-blue-500" />
                            <ChannelRow label="Organic Search" value="15%" color="bg-zinc-500" />
                            <ChannelRow label="Partnerships" value="10%" color="bg-zinc-800" />
                        </div>

                        <div className="pt-8 border-t border-zinc-800">
                            <button className="w-full py-4 bg-zinc-950 border border-zinc-800 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:border-primary/50 transition-all flex items-center justify-center gap-2">
                                Launch Growth Campaign
                                <ArrowUpRight size={14} className="text-primary" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

function GrowthCard({ label, value, sub, trend, icon, trendIsRed = false }: any) {
    return (
        <div className="p-6 bg-zinc-900/50 border border-zinc-800 rounded-[32px] group hover:border-zinc-700 transition-all overflow-hidden relative">
            <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-black rounded-2xl border border-zinc-800 group-hover:scale-105 transition-transform">
                    {icon}
                </div>
                <div className={`px-2 py-0.5 rounded-lg text-[10px] font-black tracking-tighter ${trendIsRed ? 'bg-red-500/10 text-red-500' : 'bg-primary/10 text-primary'
                    }`}>
                    {trend}
                </div>
            </div>
            <div>
                <p className="text-zinc-500 text-[10px] font-black uppercase tracking-widest mb-1">{label}</p>
                <div className="flex items-end justify-between">
                    <p className="text-2xl font-black text-white">{value}</p>
                    <p className="text-[10px] font-bold text-zinc-600">{sub}</p>
                </div>
            </div>
        </div>
    );
}

function ChannelRow({ label, value, color }: any) {
    return (
        <div className="space-y-2">
            <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest">
                <span className="text-zinc-500">{label}</span>
                <span className="text-white">{value}</span>
            </div>
            <div className="h-1.5 bg-zinc-950 rounded-full overflow-hidden">
                <div
                    className={`h-full ${color} transition-all duration-1000`}
                    style={{ width: value }}
                />
            </div>
        </div>
    );
}
