import { AdvancedMarker, Map } from '@vis.gl/react-google-maps';
import {
    Activity,
    ChevronDown,
    MapPin,
    RefreshCcw,
    Search
} from 'lucide-react';
import React, { useState } from 'react';

const defaultCenter = { lat: 19.4326, lng: -99.1332 }; // Mexico City

const mockBids = [
    { id: '1', lat: 19.4426, lng: -99.1432, bids: 0, priority: 'Critical' },
    { id: '2', lat: 19.4226, lng: -99.1232, bids: 5, priority: 'Healthy' },
    { id: '3', lat: 19.4526, lng: -99.1532, bids: 0, priority: 'Critical' },
    { id: '4', lat: 19.4126, lng: -99.1132, bids: 3, priority: 'Healthy' },
    { id: '5', lat: 19.4326, lng: -99.1432, bids: 1, priority: 'Stable' },
];

export const MarketDashboard: React.FC = () => {
    const [city] = useState('Mexico City, MX');

    return (
        <div className="flex flex-col gap-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
            {/* Header: Marketplace Health */}
            <header className="flex flex-col md:flex-row md:items-center justify-between gap-8">
                <div>
                    <h1 className="text-4xl font-uber-bold text-gray-900 dark:text-white tracking-tight leading-none">Marketplace Health</h1>
                    <p className="text-gray-500 dark:text-accent-gray text-sm mt-3 font-medium">Real-time supply & demand monitoring for <span className="text-gray-900 dark:text-white underline underline-offset-4 decoration-primary/30 font-uber-bold cursor-pointer hover:decoration-primary transition-all">{city.split(',')[0]}</span></p>
                </div>

                <div className="flex items-center gap-4">
                    <div className="bg-white/50 dark:bg-zinc-900/50 backdrop-blur-md border border-gray-200 dark:border-zinc-800 rounded-[20px] flex items-center px-6 py-3.5 shadow-xl shadow-black/5 min-w-[220px] group cursor-pointer hover:border-primary/30 transition-all">
                        <MapPin className="text-gray-400 group-hover:text-primary transition-colors mr-3" size={18} />
                        <span className="text-sm font-uber-bold dark:text-white">{city}</span>
                        <ChevronDown className="ml-auto text-gray-400" size={16} />
                    </div>
                    <button className="bg-primary hover:bg-primary-dark text-black px-8 py-4 rounded-[20px] flex items-center text-sm font-uber-bold transition-all shadow-2xl shadow-primary/20 hover:scale-[1.02] active:scale-95">
                        <RefreshCcw className="mr-2" size={18} />
                        Refresh Data
                    </button>
                </div>
            </header>

            {/* KPI Section: Marketplace Vitals */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8">
                <KPICard
                    title="Active Rides"
                    value="1,284"
                    trend="+12%"
                    type="up"
                    visual={<Sparkline color="primary" />}
                />
                <KPICard
                    title="Online Drivers"
                    value="4,892"
                    trend="-4%"
                    type="down"
                    visual={<Sparkline color="primary" />}
                />
                <KPICard
                    title="Daily Revenue"
                    value="$42,900"
                    trend="+8%"
                    type="up"
                    visual={<Sparkline color="primary" />}
                />
                <KPICard
                    title="Avg Match Time"
                    value="2.4m"
                    trend="Stable"
                    type="neutral"
                    visual={<LevelBars count={5} active={3} />}
                />
            </div>

            {/* Central Intelligence Grid */}
            <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
                {/* Main God's Eye Map */}
                <div className="xl:col-span-8 bg-zinc-900/50 backdrop-blur-xl rounded-[40px] border border-zinc-800 overflow-hidden flex flex-col min-h-[600px] shadow-2xl relative group/map">
                    <div className="p-10 border-b border-white/5 flex items-center justify-between bg-zinc-950/20 backdrop-blur-md z-20 absolute top-0 left-0 right-0">
                        <div>
                            <h2 className="text-xl font-uber-bold flex items-center text-white gap-3">
                                <Activity className="text-primary" size={24} />
                                Live Negotiation Map
                            </h2>
                            <p className="text-xs text-gray-500 font-medium mt-1">Real-time ride requests and bid densities</p>
                        </div>
                        <div className="hidden md:flex items-center gap-8">
                            <LegendItem color="bg-rose-500" label="0 Bids (High Priority)" />
                            <LegendItem color="bg-emerald-500" label="3+ Bids (Healthy)" />
                        </div>
                    </div>

                    <div className="flex-1 relative">
                        <Map
                            defaultCenter={defaultCenter}
                            defaultZoom={13}
                            mapId="330dd4d2eb9c8b5578df2d93"
                            disableDefaultUI={true}
                            className="grayscale contrast-[1.1] dark:invert-[0.9] opacity-90 brightness-[0.7] dark:brightness-[0.8]"
                        >
                            {mockBids.map(ping => (
                                <AdvancedMarker key={ping.id} position={{ lat: ping.lat, lng: ping.lng }}>
                                    <div className="relative group cursor-pointer">
                                        <div className={`absolute -inset-4 rounded-full animate-ping opacity-20 duration-1000 ${ping.bids === 0 ? 'bg-rose-500' : 'bg-emerald-500'}`} />
                                        <div className={`w-4 h-4 rounded-full border-[2.5px] border-zinc-900 shadow-2xl ${ping.bids === 0 ? 'bg-rose-500' : 'bg-emerald-500'}`} />
                                    </div>
                                </AdvancedMarker>
                            ))}
                        </Map>
                    </div>

                    {/* Map Controls */}
                    <div className="absolute bottom-10 right-10 flex flex-col gap-3 z-30">
                        <button className="w-12 h-12 bg-zinc-900/80 backdrop-blur-md text-white rounded-2xl shadow-2xl border border-white/10 flex items-center justify-center hover:bg-zinc-800 transition-all text-xl font-medium">+</button>
                        <button className="w-12 h-12 bg-zinc-900/80 backdrop-blur-md text-white rounded-2xl shadow-2xl border border-white/10 flex items-center justify-center hover:bg-zinc-800 transition-all text-xl font-medium">-</button>
                    </div>
                </div>

                {/* Performance Analytics Sidebar */}
                <div className="xl:col-span-4 space-y-8">
                    {/* Liquidity Ratio Gauge */}
                    <div className="bg-zinc-900/50 backdrop-blur-md p-10 rounded-[40px] border border-zinc-800 shadow-2xl relative overflow-hidden group">
                        <h3 className="text-[11px] font-black uppercase tracking-[0.2em] text-gray-500 mb-10">Liquidity Ratio (Bids/Req)</h3>
                        <div className="relative w-full aspect-[2/1] flex items-end justify-center">
                            {/* Gauge Gradient Background */}
                            <div className="absolute top-0 w-[240px] h-[240px] rounded-full overflow-hidden"
                                style={{
                                    background: 'conic-gradient(from 180deg at 50% 100%, #f43f5e 0deg, #f59e0b 90deg, #3b82f6 180deg)',
                                    mask: 'radial-gradient(circle at 50% 100%, transparent 63%, black 64%)',
                                    WebkitMask: 'radial-gradient(circle at 50% 100%, transparent 63%, black 64%)'
                                }}
                            />

                            {/* Gauge Value Overlay */}
                            <div className="relative z-10 text-center pb-6">
                                <span className="text-5xl font-uber-bold text-white leading-none tracking-tighter">2.8x</span>
                                <p className="text-[10px] text-zinc-500 uppercase font-bold tracking-widest mt-2">Avg Bids</p>
                            </div>

                            {/* Gauge Needle */}
                            <div className="absolute bottom-0 left-1/2 w-1.5 h-24 bg-white rounded-full origin-bottom rotate-[45deg] -translate-x-1/2 z-20 shadow-2xl" />
                        </div>

                        <div className="mt-12 flex justify-between px-4">
                            <GaugeLabel color="bg-rose-500" text="Low" />
                            <GaugeLabel color="bg-amber-500" text="Stable" />
                            <GaugeLabel color="bg-blue-500" text="High" />
                        </div>
                    </div>

                    {/* Success Gap (Pricing) */}
                    <div className="bg-zinc-900/50 backdrop-blur-md p-10 rounded-[40px] border border-zinc-800 shadow-2xl flex-1">
                        <div className="flex items-center justify-between mb-10">
                            <h3 className="text-[11px] font-black uppercase tracking-[0.2em] text-gray-500">Success Gap (Pricing)</h3>
                        </div>
                        <div className="space-y-10">
                            <ZoneBar title="Polanco (Premium)" value="+14.2% Negotiated" progress={85} />
                            <ZoneBar title="Santa Fe (Business)" value="+8.5% Negotiated" progress={65} />
                            <ZoneBar title="Roma/Condesa (Hub)" value="+11.0% Negotiated" progress={75} />
                        </div>
                        <div className="mt-12 flex items-center gap-6">
                            <div className="flex items-center gap-2">
                                <div className="w-3 h-1.5 bg-zinc-800 rounded-sm" />
                                <span className="text-[9px] font-black uppercase tracking-widest text-gray-600">Initial Price</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="w-3 h-1.5 bg-blue-500 rounded-sm" />
                                <span className="text-[9px] font-black uppercase tracking-widest text-gray-600">Final Deal</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Negotiation Stream (God's Eye Table) */}
            <div className="bg-white dark:bg-zinc-900 rounded-[40px] border border-gray-200 dark:border-zinc-800 shadow-2xl overflow-hidden mt-4">
                <div className="p-10 border-b border-gray-100 dark:border-zinc-800 flex items-center justify-between">
                    <div>
                        <h3 className="font-uber-bold text-2xl dark:text-white leading-none">Live Negotiation Floor</h3>
                        <p className="text-sm text-gray-500 mt-2 font-medium">Real-time auction logs for active ride requests</p>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="relative group">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-primary transition-colors" size={16} />
                            <input
                                type="text"
                                placeholder="Filter by Request ID..."
                                className="pl-12 pr-6 py-3 bg-gray-50 dark:bg-zinc-800 border-none rounded-2xl text-sm font-uber-bold focus:ring-2 focus:ring-primary/20 w-[300px] transition-all"
                            />
                        </div>
                        <button className="text-primary text-sm font-black uppercase tracking-widest hover:underline px-4">View All Logs</button>
                    </div>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left font-uber">
                        <thead className="bg-gray-50/50 dark:bg-zinc-800/20 text-gray-400 uppercase text-[10px] font-black tracking-[0.2em]">
                            <tr>
                                <th className="px-10 py-6">Rider / Participant</th>
                                <th className="px-10 py-6">Route Vector</th>
                                <th className="px-10 py-6">Base Quote</th>
                                <th className="px-10 py-6">Highest Bid</th>
                                <th className="px-10 py-6">Bid Vol</th>
                                <th className="px-10 py-6">Market State</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100 dark:divide-zinc-800 dark:text-white">
                            <TableRow name="Carlos Mendoza" route="Condesa → Airport T1" base="$180" high="$210" count={7} state="NEGOTIATING" color="primary" />
                            <TableRow name="Sofia Ramirez" route="Santa Fe → Polanco" base="$220" high="---" count={0} state="STALLED" color="rose-500" />
                            <TableRow name="Miguel Paredes" route="Coyoacán → Centro" base="$150" high="$165" count={3} state="MATCHED" color="emerald-500" />
                            <TableRow name="Elena Gomez" route="Roma Norte → Condesa" base="$80" high="$95" count={5} state="NEGOTIATING" color="primary" />
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

const KPICard = ({ title, value, trend, type, visual }: any) => (
    <div className="bg-zinc-900/40 backdrop-blur-md p-10 rounded-[32px] border border-zinc-800 shadow-xl group hover:border-primary/20 transition-all cursor-default">
        <div className="flex items-center justify-between mb-8">
            <span className="text-[11px] font-black uppercase tracking-[1.5px] text-zinc-500">{title}</span>
            <span className={`text-[10px] font-black flex items-center px-2 py-1 rounded-lg ${type === 'up' ? 'text-emerald-500 bg-emerald-500/10' :
                type === 'down' ? 'text-rose-500 bg-rose-500/10' :
                    'text-zinc-500 bg-zinc-800'
                }`}>
                {trend}
            </span>
        </div>
        <div className="flex items-end justify-between gap-4">
            <span className="text-4xl font-uber-bold tracking-tight text-white leading-none">{value}</span>
            <div className="flex-1 max-w-[100px]">
                {visual}
            </div>
        </div>
    </div>
);

const Sparkline = ({ color }: any) => (
    <div className="flex items-end gap-[3px] h-8">
        {[0.4, 0.7, 0.5, 0.9, 0.6, 0.8, 0.7].map((h, i) => (
            <div
                key={i}
                className={`flex-1 rounded-full bg-${color} opacity-${30 + (i * 10)} group-hover:opacity-${50 + (i * 10)} transition-all`}
                style={{ height: `${h * 100}%` }}
            />
        ))}
    </div>
);

const LevelBars = ({ count, active }: any) => (
    <div className="flex gap-[3px] h-3 items-center">
        {[...Array(count)].map((_, i) => (
            <div key={i} className={`flex-1 h-full rounded-full ${i < active ? 'bg-zinc-600' : 'bg-zinc-800'}`} />
        ))}
    </div>
);

const LegendItem = ({ color, label }: any) => (
    <div className="flex items-center gap-2.5">
        <div className={`w-2.5 h-2.5 rounded-full ${color}`} />
        <span className="text-[10px] font-black text-white/40 uppercase tracking-widest">{label}</span>
    </div>
);

const GaugeLabel = ({ color, text }: any) => (
    <div className="flex items-center gap-2">
        <div className={`w-2 h-2 rounded-full ${color}`} />
        <span className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">{text}</span>
    </div>
);

const ZoneBar = ({ title, value, progress }: any) => (
    <div className="space-y-4 font-uber">
        <div className="flex items-center justify-between">
            <span className="text-xs font-uber-bold text-zinc-300">{title}</span>
            <span className="text-xs font-uber-bold text-blue-500 lowercase">{value}</span>
        </div>
        <div className="h-4 bg-zinc-800/50 rounded-full overflow-hidden flex shadow-inner">
            <div className="h-full bg-zinc-800" style={{ width: '15%' }} /> {/* Spacer/Initial */}
            <div className="h-full bg-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.5)]" style={{ width: `${progress - 15}%` }} />
        </div>
    </div>
);

const TableRow = ({ name, route, base, high, count, state }: any) => (
    <tr className="group hover:bg-white/[0.02] transition-colors">
        <td className="px-10 py-7">
            <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-zinc-800 flex items-center justify-center font-black text-xs text-white">
                    {name.split(' ').map((n: string) => n[0]).join('')}
                </div>
                <div>
                    <span className="font-uber-bold text-white block text-sm">{name}</span>
                    <span className="text-[9px] text-zinc-500 uppercase font-black tracking-widest mt-1 block">Participant</span>
                </div>
            </div>
        </td>
        <td className="px-10 py-7 text-zinc-500 font-medium text-sm">{route}</td>
        <td className="px-10 py-7 font-uber-bold text-white text-sm">{base}</td>
        <td className="px-10 py-7">
            <span className="text-primary font-uber-bold text-sm">{high === '---' ? '---' : high}</span>
        </td>
        <td className="px-10 py-7">
            <div className="flex gap-1">
                {[...Array(5)].map((_, i) => (
                    <div key={i} className={`w-4 h-1 rounded-full ${i < (count / 2) ? 'bg-primary' : 'bg-zinc-800'}`} />
                ))}
            </div>
        </td>
        <td className="px-10 py-7 text-right">
            <span className={`px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest ${state === 'STALLED' ? 'bg-rose-500/10 text-rose-500' :
                state === 'MATCHED' ? 'bg-emerald-500/10 text-emerald-500' :
                    'bg-blue-500/10 text-blue-500'
                }`}>{state}</span>
        </td>
    </tr>
);

export default MarketDashboard;
