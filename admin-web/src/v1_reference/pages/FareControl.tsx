import { Activity, AlertTriangle, Shield, Sliders, TrendingUp } from 'lucide-react';
import React, { useState } from 'react';

export const FareControl: React.FC = () => {
    const [sensitivity, setSensitivity] = useState(70);

    return (
        <div className="flex flex-col gap-8">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-uber-bold text-gray-900 dark:text-white leading-tight">Fare Floor Control</h1>
                    <p className="text-sm text-gray-500 font-medium tracking-tight mt-1">Manage automated pricing logic and market sensitivity</p>
                </div>
                <div className="px-4 py-2 bg-brand-500 text-white rounded-xl text-[10px] font-black uppercase tracking-widest shadow-lg shadow-brand-500/20">
                    Auto-Optimization Active
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-8">
                    {/* Sensitivity Control Card */}
                    <div className="bg-white dark:bg-zinc-900 p-8 rounded-[32px] border border-gray-200 dark:border-white/10 shadow-xl relative overflow-hidden">
                        <div className="flex items-center gap-3 mb-8">
                            <div className="p-3 bg-brand-500/10 rounded-2xl text-brand-500">
                                <Sliders size={20} />
                            </div>
                            <h2 className="text-lg font-uber-bold text-gray-900 dark:text-white">Market Sensitivity</h2>
                        </div>

                        <div className="space-y-12 py-4">
                            <div className="relative h-2 bg-gray-100 dark:bg-white/5 rounded-full px-1">
                                <div
                                    className="absolute inset-y-0 left-0 bg-brand-500 rounded-full transition-all duration-300"
                                    style={{ width: `${sensitivity}%` }}
                                />
                                <input
                                    type="range"
                                    min="0"
                                    max="100"
                                    value={sensitivity}
                                    onChange={(e) => setSensitivity(parseInt(e.target.value))}
                                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                />
                                <div
                                    className="absolute top-1/2 -translate-y-1/2 w-6 h-6 bg-white border-4 border-brand-500 rounded-full shadow-lg transition-all duration-300 pointer-events-none"
                                    style={{ left: `calc(${sensitivity}% - 12px)` }}
                                />
                            </div>

                            <div className="grid grid-cols-3 gap-8">
                                <SensitivityValue label="Conservative" active={sensitivity < 33} />
                                <SensitivityValue label="Balanced" active={sensitivity >= 33 && sensitivity < 66} />
                                <SensitivityValue label="Aggressive" active={sensitivity >= 66} />
                            </div>
                        </div>

                        <div className="mt-8 p-4 bg-amber-500/5 border border-amber-500/10 rounded-2xl flex items-start gap-3">
                            <AlertTriangle className="text-amber-500 shrink-0" size={18} />
                            <div>
                                <p className="text-[11px] font-bold text-amber-700 dark:text-amber-400 uppercase tracking-wider mb-1">Impact Analysis</p>
                                <p className="text-[12px] text-amber-900/60 dark:text-amber-400/60 font-medium leading-relaxed">
                                    Current setting will push rider starting bids **1.4x higher** than the base floor to maximize driver match rates in high-congestion zones.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Pricing Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <PriceModelItem
                            title="Base KM Rate"
                            value="$1.20"
                            icon={<TrendingUp size={16} />}
                        />
                        <PriceModelItem
                            title="Absolute Floor"
                            value="$5.00"
                            icon={<Shield size={16} />}
                        />
                    </div>
                </div>

                <div className="space-y-6">
                    <div className="bg-zinc-950 dark:bg-white text-white dark:text-zinc-950 p-8 rounded-[32px] shadow-2xl">
                        <h3 className="text-sm font-black uppercase tracking-[0.2em] mb-6 opacity-60">Price Discovery</h3>
                        <div className="space-y-4">
                            <DiscoveryStat label="Avg rider bid" value="$12.40" />
                            <DiscoveryStat label="Avg matched fare" value="$16.20" />
                            <div className="h-[1px] bg-white/10 dark:bg-zinc-900/10 my-4" />
                            <DiscoveryStat label="Discovery Gap" value="+$3.80" highlight />
                        </div>
                        <button className="w-full mt-8 py-4 bg-brand-500 text-white rounded-2xl text-xs font-black uppercase tracking-[0.2em] hover:bg-brand-600 transition-all shadow-xl shadow-brand-500/20">
                            Apply Changes
                        </button>
                    </div>

                    <div className="bg-white dark:bg-zinc-900 p-6 rounded-[28px] border border-gray-200 dark:border-white/10">
                        <div className="flex items-center gap-2 mb-4">
                            <Activity size={16} className="text-emerald-500" />
                            <span className="text-[10px] font-black uppercase tracking-widest text-emerald-500">Live Prediction</span>
                        </div>
                        <p className="text-lg font-uber-bold text-gray-800 dark:text-white mb-2">Likely Surplus</p>
                        <p className="text-xs text-gray-500 font-medium leading-relaxed">
                            Supply is projected to exceed demand by **12%** in the next 15 minutes. System will automatically suppress premiums.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

const SensitivityValue: React.FC<{ label: string; active: boolean }> = ({ label, active }) => (
    <div className={`text-center transition-all ${active ? 'scale-110' : 'opacity-40 grayscale'}`}>
        <p className={`text-[10px] font-black uppercase tracking-[0.2em] ${active ? 'text-brand-500' : 'text-gray-400'}`}>
            {label}
        </p>
    </div>
);

const PriceModelItem: React.FC<{ title: string; value: string; icon: React.ReactNode }> = ({ title, value, icon }) => (
    <div className="bg-white dark:bg-zinc-900 p-6 rounded-3xl border border-gray-100 dark:border-white/10 flex items-center justify-between group">
        <div>
            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">{title}</p>
            <p className="text-xl font-uber-bold text-gray-900 dark:text-white">{value}</p>
        </div>
        <div className="p-3 bg-gray-50 dark:bg-white/5 rounded-2xl text-gray-400 group-hover:text-brand-500 transition-colors">
            {icon}
        </div>
    </div>
);

const DiscoveryStat: React.FC<{ label: string; value: string; highlight?: boolean }> = ({ label, value, highlight }) => (
    <div className="flex items-center justify-between">
        <span className="text-[12px] font-medium opacity-60">{label}</span>
        <span className={`text-[13px] font-black ${highlight ? 'text-brand-500' : ''}`}>{value}</span>
    </div>
);
