import {
    ArrowUpRight,
    BarChart3,
    Flame,
    MoreHorizontal,
    Plus,
    Search,
    Zap
} from 'lucide-react';
import { useState } from 'react';

export function Marketing() {
    const [activeTab, setActiveTab] = useState('Campaigns');
    const [nudgeIdle, setNudgeIdle] = useState(15);
    const [nudgeDiscount, setNudgeDiscount] = useState(10);

    return (
        <div className="flex flex-col gap-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
            {/* Header: Marketing Intelligence */}
            <header className="flex flex-col md:flex-row md:items-center justify-between gap-8">
                <div>
                    <div className="flex items-center gap-2 mb-2">
                        <div className="w-5 h-5 rounded-lg bg-pink-500/10 flex items-center justify-center">
                            <Flame size={12} className="text-pink-500 fill-pink-500" />
                        </div>
                        <span className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Growth & Incentives Hub</span>
                    </div>
                    <h1 className="text-4xl font-uber-bold text-gray-900 dark:text-white tracking-tight leading-none">Marketing Manager</h1>
                    <p className="text-gray-500 dark:text-accent-gray text-sm mt-3 font-medium">Drive demand liquidity through automated nudges and campaign boosts</p>
                </div>

                <div className="flex items-center gap-4">
                    <button className="bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-2xl flex items-center px-6 py-3.5 shadow-xl shadow-black/5 hover:border-pink-500 transition-all">
                        <BarChart3 className="mr-3 text-gray-400" size={18} />
                        <span className="text-sm font-uber-bold dark:text-white">Performance View</span>
                    </button>
                    <button className="bg-zinc-950 dark:bg-white text-white dark:text-zinc-950 px-8 py-4 rounded-2xl flex items-center text-sm font-uber-bold transition-all shadow-2xl hover:scale-[1.02] active:scale-95">
                        <Plus className="mr-2" size={18} />
                        New Campaign
                    </button>
                </div>
            </header>

            {/* Negotiation Nudge Controller (The "Secret Sauce") */}
            <div className="bg-zinc-950 rounded-[40px] p-12 text-white shadow-2xl relative overflow-hidden group">
                <div className="absolute right-0 top-0 p-12 opacity-5 pointer-events-none transition-transform group-hover:scale-110 duration-1000">
                    <Zap size={240} className="text-primary fill-primary" />
                </div>

                <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16">
                    <div className="space-y-8">
                        <div>
                            <h2 className="text-3xl font-uber-bold mb-3 flex items-center gap-3">
                                Negotiation Nudge
                                <div className="px-3 py-1 bg-primary/20 text-primary text-[10px] font-black uppercase tracking-widest rounded-full border border-primary/20">Active Engine</div>
                            </h2>
                            <p className="text-gray-400 text-sm font-medium leading-relaxed">
                                Automatically trigger discount offers to idle riders when marketplace liquidity is high to encourage price discovery.
                            </p>
                        </div>

                        <div className="space-y-10">
                            <SliderControl
                                label="Trigger after idle time"
                                value={`${nudgeIdle}m`}
                                min={5}
                                max={60}
                                current={nudgeIdle}
                                onChange={(val: number) => setNudgeIdle(val)}
                            />
                            <SliderControl
                                label="Automatic Nudge Discount"
                                value={`${nudgeDiscount}%`}
                                min={5}
                                max={30}
                                current={nudgeDiscount}
                                onChange={(val: number) => setNudgeDiscount(val)}
                            />
                        </div>
                    </div>

                    <div className="bg-white/5 backdrop-blur-xl rounded-[32px] p-8 border border-white/5 flex flex-col justify-between">
                        <div>
                            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 mb-6 block">Real-time Impact Preview</span>
                            <div className="grid grid-cols-2 gap-8">
                                <ImpactStat label="Est. Conversion" value="+14.2%" color="text-primary" />
                                <ImpactStat label="Profit Compression" value="-2.1%" color="text-rose-400" />
                            </div>
                        </div>
                        <div className="mt-10 pt-8 border-t border-white/5 flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                                <span className="text-xs text-gray-400 font-medium font-uber">Simulated for current demand peak</span>
                            </div>
                            <button className="bg-primary px-6 py-2.5 rounded-xl text-black text-xs font-black uppercase tracking-widest hover:scale-105 transition-all">Update Engine</button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Campaign Management Hub */}
            <div className="bg-white dark:bg-zinc-900 rounded-[40px] border border-gray-200 dark:border-zinc-800 shadow-2xl overflow-hidden">
                <div className="px-10 py-8 border-b border-gray-100 dark:border-zinc-800 flex items-center justify-between bg-white dark:bg-zinc-900/50">
                    <div className="flex items-center gap-2 p-1 bg-gray-100 dark:bg-zinc-800 rounded-2xl">
                        {['Campaigns', 'Vouchers', 'Bonus Quests'].map(tab => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`px-8 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === tab ? 'bg-white dark:bg-zinc-900 text-gray-900 dark:text-white shadow-sm' : 'text-gray-400 hover:text-gray-600'
                                    }`}
                            >
                                {tab}
                            </button>
                        ))}
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="relative group">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-pink-500 transition-colors" size={16} />
                            <input
                                type="text"
                                placeholder="Filter active campaigns..."
                                className="pl-12 pr-6 py-3 bg-gray-50 dark:bg-zinc-800/50 border-none rounded-2xl text-sm font-uber-bold focus:ring-2 focus:ring-pink-500/20 w-[240px]"
                            />
                        </div>
                    </div>
                </div>

                <div className="p-10">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        <CampaignCard
                            title="Valentine Rush Boost"
                            status="ACTIVE"
                            reach="12.4k"
                            conversions="892"
                            budget="$2,400"
                            type="Surge Override"
                        />
                        <CampaignCard
                            title="New Pilot Incentive"
                            status="SCHEDULED"
                            reach="---"
                            conversions="---"
                            budget="$10.0k"
                            type="Bonus Quest"
                        />
                        <CampaignCard
                            title="Winter Chill Promo"
                            status="COMPLETED"
                            reach="45.1k"
                            conversions="2.4k"
                            budget="$5,000"
                            type="Promo Code"
                        />
                    </div>
                </div>
            </div>

            {/* Campaign Performance Bar Chart (Mockup) */}
            <div className="bg-white dark:bg-zinc-900 p-10 rounded-[40px] border border-gray-200 dark:border-zinc-800 shadow-xl">
                <div className="flex items-center justify-between mb-12">
                    <div>
                        <h3 className="font-uber-bold text-2xl dark:text-white leading-none">Campaign Performance Matrix</h3>
                        <p className="text-sm text-gray-500 mt-2">Conversion vs Spend across all active marketing channels</p>
                    </div>
                    <div className="flex items-center gap-8">
                        <ChartLegend color="bg-pink-500" label="Spent" />
                        <ChartLegend color="bg-primary" label="Yield" />
                    </div>
                </div>
                <div className="flex items-end gap-6 h-64 px-4">
                    {[0.4, 0.7, 0.5, 0.9, 0.6, 0.8, 0.3].map((val, i) => (
                        <div key={i} className="flex-1 flex gap-2 h-full items-end">
                            <div className="flex-1 bg-pink-500/10 rounded-t-xl group relative cursor-pointer" style={{ height: `${val * 100}%` }}>
                                <div className="absolute inset-0 bg-pink-500/20 opacity-0 group-hover:opacity-100 transition-opacity rounded-t-xl" />
                            </div>
                            <div className="flex-1 bg-primary rounded-t-xl shadow-lg shadow-primary/10 group relative cursor-pointer" style={{ height: `${val * 120}%` }}>
                                <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-zinc-900 text-white text-[10px] font-black py-1.5 px-2 rounded-lg opacity-0 group-hover:opacity-100 transition-all">
                                    {Math.round(val * 100)}%
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="flex justify-between mt-8 px-6 text-[10px] font-black text-gray-400 uppercase tracking-widest">
                    <span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span>
                </div>
            </div>
        </div>
    );
}

const SliderControl = ({ label, value, min, max, current, onChange }: any) => (
    <div className="space-y-6">
        <div className="flex justify-between items-center">
            <span className="text-xs font-black uppercase tracking-widest text-gray-400">{label}</span>
            <span className="text-2xl font-uber-bold text-primary">{value}</span>
        </div>
        <input
            type="range"
            min={min}
            max={max}
            value={current}
            onChange={(e) => onChange(parseInt(e.target.value))}
            className="w-full h-1.5 bg-white/10 rounded-full appearance-none cursor-pointer accent-primary"
        />
    </div>
);

const ImpactStat = ({ label, value, color }: any) => (
    <div>
        <p className="text-[10px] font-black uppercase tracking-widest text-gray-500 mb-2">{label}</p>
        <p className={`text-3xl font-uber-bold ${color}`}>{value}</p>
    </div>
);

const CampaignCard = ({ title, status, reach, conversions, budget, type }: any) => (
    <div className="p-8 rounded-[32px] border border-gray-100 dark:border-zinc-800 bg-gray-50/50 dark:bg-zinc-800/10 hover:border-pink-500/30 transition-all group cursor-pointer relative overflow-hidden">
        <div className="flex justify-between items-start mb-6">
            <span className={`text-[10px] font-black px-3 py-1.5 rounded-xl border ${status === 'ACTIVE' ? 'border-primary/30 bg-primary/5 text-primary' :
                    status === 'SCHEDULED' ? 'border-gray-200 text-gray-400' :
                        'border-rose-500/30 bg-rose-500/5 text-rose-500'
                }`}>{status}</span>
            <MoreHorizontal size={18} className="text-gray-300" />
        </div>
        <div className="space-y-2 mb-8">
            <h4 className="font-uber-bold text-lg dark:text-white leading-tight">{title}</h4>
            <p className="text-[10px] font-black uppercase tracking-widest text-gray-500">{type}</p>
        </div>
        <div className="grid grid-cols-2 gap-4 pb-4">
            <div>
                <p className="text-[10px] text-gray-400 font-medium mb-1">Est. Reach</p>
                <p className="font-uber-bold dark:text-white">{reach}</p>
            </div>
            <div>
                <p className="text-[10px] text-gray-400 font-medium mb-1">Conversions</p>
                <p className="font-uber-bold text-primary">{conversions}</p>
            </div>
        </div>
        <div className="pt-6 border-t border-gray-100 dark:border-zinc-800 flex items-center justify-between">
            <span className="text-sm font-uber-bold dark:text-white">{budget}</span>
            <ArrowUpRight size={18} className="text-gray-300 group-hover:text-pink-500 transition-colors" />
        </div>
    </div>
);

const ChartLegend = ({ color, label }: any) => (
    <div className="flex items-center gap-2">
        <div className={`w-2.5 h-2.5 rounded-full ${color}`} />
        <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{label}</span>
    </div>
);

export default Marketing;
