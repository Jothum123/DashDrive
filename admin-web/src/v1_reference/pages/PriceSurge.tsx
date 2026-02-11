import { Activity, Info, Map as MapIcon, Sliders, TrendingUp, Zap } from 'lucide-react';
import { useState } from 'react';
import PageBreadcrumb from '../components/common/PageBreadcrumb';
import { useAdminStore } from '../../stores/adminStore';

export function PriceSurge() {
    const { strategy, updateStrategy } = useAdminStore();
    const [selectedZone, setSelectedZone] = useState<string | null>('Downtown');

    const zones = [
        { name: 'Downtown', surge: 2.4, demand: 'High', drivers: 42 },
        { name: 'Airport', surge: 1.8, demand: 'Medium', drivers: 12 },
        { name: 'West End', surge: 1.2, demand: 'Low', drivers: 28 },
        { name: 'Soho', surge: 2.1, demand: 'High', drivers: 15 },
        { name: 'Hackney', surge: 1.5, demand: 'Medium', drivers: 31 },
    ];

    return (
        <div className="min-h-screen bg-transparent dark:text-white/90 flex flex-col">
            <PageBreadcrumb pageTitle="Price Surge Control" />

            <div className="flex-1 grid grid-cols-1 lg:grid-cols-4 gap-6">

                {/* Left: Heatmap View */}
                <div className="lg:col-span-3 flex flex-col gap-6">
                    <div className="flex-1 card relative overflow-hidden group border-none bg-gray-950 dark:bg-black/40 backdrop-blur-sm shadow-inner">
                        {/* Simulated Map / Heatmap */}
                        <div className="absolute inset-0 p-12 opacity-40">
                            <svg className="w-full h-full" viewBox="0 0 800 500">
                                <circle cx="400" cy="250" r="150" fill="url(#surgeGradient)" className="animate-pulse" />
                                <circle cx="200" cy="150" r="80" fill="url(#surgeGradient)" style={{ animationDelay: '1s' }} className="animate-pulse" />
                                <circle cx="600" cy="350" r="100" fill="url(#surgeGradient)" style={{ animationDelay: '2s' }} className="animate-pulse" />
                                <defs>
                                    <radialGradient id="surgeGradient">
                                        <stop offset="0%" stopColor="#00ff90" stopOpacity="0.4" />
                                        <stop offset="100%" stopColor="#00ff90" stopOpacity="0" />
                                    </radialGradient>
                                </defs>
                            </svg>
                        </div>

                        <div className="absolute top-6 left-6 flex items-center gap-2 bg-white/10 dark:bg-black/60 backdrop-blur-md border border-white/10 px-4 py-2 rounded-xl">
                            <MapIcon size={14} className="text-primary" />
                            <span className="text-[10px] font-black uppercase tracking-[0.2em]">Global Intelligence View</span>
                        </div>

                        {/* Interactive Zone Markers (Simulated) */}
                        {zones.map((zone, idx) => (
                            <button
                                key={zone.name}
                                onClick={() => setSelectedZone(zone.name)}
                                className={`absolute p-2 rounded-xl border backdrop-blur-md transition-all ${selectedZone === zone.name
                                    ? 'bg-primary text-black border-primary scale-110 z-20 shadow-[0_0_20px_rgba(0,255,144,0.3)]'
                                    : 'bg-black/40 text-white border-white/10 hover:border-primary/50'
                                    }`}
                                style={{
                                    top: `${20 + (idx * 12)}%`,
                                    left: `${15 + (idx * 15)}%`
                                }}
                            >
                                <div className="flex items-center gap-2 px-2">
                                    <Zap size={10} className={selectedZone === zone.name ? 'text-black' : 'text-primary'} />
                                    <span className="text-[10px] font-bold uppercase tracking-widest">{zone.name} x{zone.surge}</span>
                                </div>
                            </button>
                        ))}
                    </div>

                    {/* Bottom: Zone Quick Stats */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <SurgeStat
                            label="Active Surge Areas"
                            value="14"
                            sub="Peak: Soho"
                            icon={<TrendingUp className="text-primary" size={16} />}
                        />
                        <SurgeStat
                            label="Avg. Multiplier"
                            value="x1.42"
                            sub="+12% from 1h ago"
                            icon={<Zap className="text-primary" size={16} />}
                        />
                        <SurgeStat
                            label="Potential Gaps"
                            value="3"
                            sub="Low driver density"
                            icon={<Activity className="text-primary" size={16} />}
                        />
                    </div>
                </div>

                {/* Right: Controls */}
                <aside className="space-y-6">
                    <div className="card p-6 space-y-8">
                        <div className="flex items-center gap-3 border-b border-gray-100 dark:border-gray-800 pb-4">
                            <Sliders className="text-primary" size={18} />
                            <h3 className="text-sm font-bold text-gray-800 dark:text-white uppercase tracking-widest">Global Rules</h3>
                        </div>

                        <div className="space-y-6">
                            <div className="space-y-4">
                                <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest text-gray-500">
                                    <span>Max Surge Multiplier</span>
                                    <span className="text-primary text-xs">x{strategy.fareMultiplier.toFixed(1)}</span>
                                </div>
                                <input
                                    type="range"
                                    min="1"
                                    max="5"
                                    step="0.1"
                                    value={strategy.fareMultiplier}
                                    onChange={(e) => updateStrategy({ fareMultiplier: parseFloat(e.target.value) })}
                                    className="w-full accent-primary bg-gray-100 dark:bg-gray-800 h-1.5 rounded-full appearance-none cursor-pointer"
                                />
                            </div>

                            <button className="w-full py-3.5 bg-primary text-black text-[11px] font-black uppercase tracking-widest rounded-xl hover:shadow-lg hover:shadow-primary/20 transition-all">
                                Update Pricing
                            </button>
                        </div>

                        <div className="pt-6 border-t border-gray-100 dark:border-gray-800 space-y-5">
                            <div className="flex items-center justify-between">
                                <span className="text-[11px] font-bold uppercase text-gray-500 tracking-wider">Auto Pricing</span>
                                <div className="w-10 h-5 bg-primary rounded-full relative shadow-[0_0_8px_rgba(0,255,144,0.3)] cursor-pointer">
                                    <div className="absolute right-0.5 top-0.5 w-4 h-4 bg-white rounded-full" />
                                </div>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-[11px] font-bold uppercase text-gray-500 tracking-wider">Driver Bounty</span>
                                <div className="w-10 h-5 bg-gray-200 dark:bg-gray-800 rounded-full relative cursor-pointer">
                                    <div className="absolute left-0.5 top-0.5 w-4 h-4 bg-gray-500 rounded-full" />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="p-6 bg-primary/10 border border-primary/20 rounded-2xl">
                        <div className="flex items-center gap-2 mb-3">
                            <Info size={14} className="text-primary" />
                            <p className="text-[10px] font-bold text-primary uppercase tracking-[0.2em]">Optimization Tip</p>
                        </div>
                        <p className="text-[11px] font-medium text-gray-600 dark:text-gray-400 leading-relaxed">
                            Increasing driver bounties by <span className="text-gray-800 dark:text-white font-bold">15%</span> in the <span className="text-primary font-bold">City Center</span> could reduce wait times by <span className="text-gray-800 dark:text-white font-bold">4m</span>.
                        </p>
                    </div>
                </aside>
            </div>
        </div>
    );
}

function SurgeStat({ label, value, sub, icon }: any) {
    return (
        <div className="card p-6 flex flex-col gap-1 transition-all hover:bg-gray-50 dark:hover:bg-white/[0.04]">
            <div className="flex items-center gap-2 mb-2">
                <div className="p-2 bg-gray-100 dark:bg-gray-800 rounded-lg">
                    {icon}
                </div>
                <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">{label}</span>
            </div>
            <p className="text-2xl font-bold dark:text-white tracking-tight">{value}</p>
            <p className="text-[10px] font-medium text-gray-400 uppercase tracking-tight">{sub}</p>
        </div>
    );
}

