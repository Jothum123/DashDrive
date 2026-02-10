import {
    Activity,
    Cpu,
    Dna,
    Lock,
    Settings,
    Shield,
    Zap
} from 'lucide-react';
import React from 'react';
import { Header } from '../components/layout/Header';

export const SystemRules: React.FC = () => {
    return (
        <div className="min-h-screen bg-black text-white flex flex-col">
            <Header title="System Rules" subtitle="Logic Orchestration & Network Triggers" />

            <div className="flex-1 p-8 grid grid-cols-1 lg:grid-cols-4 gap-8">
                <div className="lg:col-span-3 space-y-10">
                    {/* Rules Section */}
                    <section>
                        <div className="flex items-center justify-between mb-8">
                            <div className="flex items-center gap-3">
                                <Cpu className="text-primary" size={24} />
                                <h2 className="text-xl font-black tracking-tighter uppercase">Active Heuristics</h2>
                            </div>
                            <button className="text-primary text-[10px] font-black uppercase tracking-widest hover:brightness-125 transition-all">+ Initialize New Rule</button>
                        </div>

                        <div className="grid gap-4">
                            {[
                                { trigger: 'Network Saturation > 85%', val: 'Critical', action: 'Expand Radius Floor', change: '+12%', icon: Dna, color: 'text-primary' },
                                { trigger: 'Avg ETA > 12m', val: 'Congested', action: 'Trigger Supply Surge', change: '1.8x', icon: Activity, color: 'text-orange-500' },
                                { trigger: 'Rider Cancellations > 4%', val: 'Volatility', action: 'Adjust Match Latency', change: '-200ms', icon: Settings, color: 'text-emerald-500' },
                            ].map((rule, idx) => (
                                <div key={idx} className="bg-zinc-900/50 border border-zinc-800 p-8 rounded-[40px] flex items-center gap-8 group hover:border-zinc-700 transition-all text-left">
                                    <div className="w-16 h-16 bg-black border border-zinc-800 rounded-3xl flex items-center justify-center text-zinc-600 group-hover:text-primary transition-colors">
                                        <rule.icon size={28} />
                                    </div>
                                    <div className="flex-1 grid grid-cols-12 gap-8 items-center">
                                        <div className="col-span-4">
                                            <p className="text-[10px] font-black uppercase text-zinc-600 mb-2 tracking-widest">Trigger Vector</p>
                                            <div className="flex items-center gap-3">
                                                <span className="text-base font-black text-white">{rule.trigger}</span>
                                                <span className="bg-zinc-800 text-zinc-500 text-[9px] font-black px-2 py-0.5 rounded uppercase border border-white/5">{rule.val}</span>
                                            </div>
                                        </div>
                                        <div className="col-span-1 flex justify-center">
                                            <span className="text-zinc-800">→</span>
                                        </div>
                                        <div className="col-span-5">
                                            <p className="text-[10px] font-black uppercase text-zinc-600 mb-2 tracking-widest">System Response</p>
                                            <p className="text-base font-black text-zinc-400">
                                                {rule.action} <span className={`font-black ${rule.color}`}>{rule.change}</span>
                                            </p>
                                        </div>
                                        <div className="col-span-2 flex justify-end">
                                            <button className="w-12 h-12 rounded-2xl bg-zinc-800 border border-zinc-700 flex items-center justify-center hover:bg-zinc-700 transition-all">
                                                <Settings size={20} className="text-zinc-500" />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* Safety Guardrails */}
                    <section>
                        <div className="flex items-center gap-3 mb-8">
                            <Shield className="text-primary" size={24} />
                            <h2 className="text-xl font-black tracking-tighter uppercase">Operational Safety</h2>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="bg-zinc-900/50 border border-zinc-800 p-10 rounded-[48px] text-left">
                                <h4 className="font-black text-white flex items-center gap-3 mb-10 text-sm uppercase tracking-widest">
                                    <Lock className="text-red-500" size={18} />
                                    Multi-Factor Ceiling
                                </h4>
                                <div className="space-y-8">
                                    <div className="space-y-3">
                                        <label className="text-[10px] font-black text-zinc-600 uppercase tracking-widest">Max Network Multiplier</label>
                                        <div className="relative">
                                            <input className="w-full bg-black border border-zinc-800 rounded-2xl py-4 px-6 font-black text-2xl text-white outline-none focus:border-primary transition-all" type="text" defaultValue="3.50x" />
                                            <div className="absolute right-6 top-1/2 -translate-y-1/2 text-[10px] font-black text-primary px-3 py-1 bg-primary/10 rounded-lg uppercase">Hard Limit</div>
                                        </div>
                                    </div>
                                    <div className="space-y-3">
                                        <label className="text-[10px] font-black text-zinc-600 uppercase tracking-widest">Trip Yield Cap (Global)</label>
                                        <div className="relative">
                                            <input className="w-full bg-black border border-zinc-800 rounded-2xl py-4 px-6 font-black text-2xl text-white outline-none focus:border-primary transition-all" type="text" defaultValue="$120.00" />
                                            <Lock size={16} className="absolute right-6 top-1/2 -translate-y-1/2 text-zinc-800" />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-zinc-900/50 border border-zinc-800 p-10 rounded-[48px] text-left">
                                <h4 className="font-black text-white flex items-center gap-3 mb-10 text-sm uppercase tracking-widest">
                                    <Zap className="text-primary" size={18} />
                                    Adjustment Sensitivity
                                </h4>
                                <div className="space-y-8">
                                    <div className="space-y-3">
                                        <label className="text-[10px] font-black text-zinc-600 uppercase tracking-widest">Refresh Interval</label>
                                        <div className="relative">
                                            <select className="w-full bg-black border border-zinc-800 rounded-2xl py-4 px-6 font-black text-sm text-zinc-300 appearance-none outline-none focus:border-primary transition-all">
                                                <option>Real-time (Stream)</option>
                                                <option selected>15 Seconds</option>
                                                <option>1 Minute</option>
                                            </select>
                                            <div className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none text-zinc-700">▼</div>
                                        </div>
                                    </div>
                                    <div className="space-y-3">
                                        <label className="text-[10px] font-black text-zinc-600 uppercase tracking-widest">Max Delta Swing (%)</label>
                                        <div className="relative">
                                            <input className="w-full bg-black border border-zinc-800 rounded-2xl py-4 px-6 font-black text-2xl text-white outline-none focus:border-primary transition-all" type="text" defaultValue="15%" />
                                            <div className="absolute right-6 top-1/2 -translate-y-1/2 flex gap-2">
                                                <div className="w-2 h-2 bg-primary rounded-full"></div>
                                                <div className="w-2 h-2 bg-primary rounded-full"></div>
                                                <div className="w-2 h-2 bg-zinc-800 rounded-full"></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>

                {/* Global Control Sidebar */}
                <aside className="space-y-6">
                    <div className="p-10 rounded-[48px] bg-red-500/10 border border-red-500/20 relative overflow-hidden group shadow-2xl text-left">
                        <div className="relative z-10">
                            <div className="flex items-center justify-between mb-6">
                                <span className="text-[10px] font-black text-red-500 uppercase tracking-widest">Safety Override</span>
                                <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                            </div>
                            <h3 className="text-xl font-black text-white mb-3">Network Kill-Switch</h3>
                            <p className="text-xs text-zinc-500 mb-8 leading-relaxed font-bold">Immediate de-escalation of all bot-controlled multipliers. Reverts network to static baseline across all 54 active sectors.</p>
                            <button className="w-full bg-red-500 hover:bg-red-600 text-black font-black py-4 rounded-2xl uppercase tracking-widest text-[10px] transition-all active:scale-95 shadow-xl shadow-red-500/20">
                                Disable Autonomous Logic
                            </button>
                        </div>
                    </div>

                    <div className="bg-zinc-900/50 border border-zinc-800 rounded-[48px] flex flex-col overflow-hidden text-left">
                        <div className="p-6 border-b border-zinc-800 flex items-center justify-between bg-zinc-900/30">
                            <h4 className="text-[10px] font-black uppercase text-zinc-600 tracking-widest">Telemetry Feed</h4>
                            <Activity size={16} className="text-zinc-700" />
                        </div>
                        <div className="flex-1 p-4 space-y-2">
                            {[
                                { zone: 'SF Central Cluster', status: 'Optimizing', code: 'Z-01' },
                                { zone: 'Midtown NYC', status: 'Warning', code: 'Z-14' },
                                { zone: 'London CBD', status: 'Locked', code: 'Z-09' },
                                { zone: 'Tokyo Shibuya', status: 'Optimizing', code: 'Z-22' },
                            ].map((z, idx) => (
                                <div key={idx} className="p-5 bg-black border border-zinc-800 hover:border-zinc-600 rounded-[32px] transition-all cursor-pointer group">
                                    <div className="flex justify-between items-start mb-3">
                                        <div>
                                            <span className="text-[9px] font-black text-zinc-700 uppercase mb-1 block">{z.code}</span>
                                            <span className="text-xs font-black text-white group-hover:text-primary transition-colors">{z.zone}</span>
                                        </div>
                                        <div className={`w-2 h-2 rounded-full ${z.status === 'Optimizing' ? 'bg-primary' : z.status === 'Locked' ? 'bg-zinc-800' : 'bg-orange-500'}`} />
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-[9px] font-black text-zinc-600 uppercase tracking-widest">{z.status}</span>
                                        <button className="text-[10px] font-black text-primary uppercase tracking-tighter">Tune</button>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="p-6 bg-zinc-900/30 border-t border-zinc-800">
                            <button className="w-full py-4 text-[10px] font-black uppercase text-zinc-500 hover:text-white transition-all border border-zinc-800 rounded-2xl">Audit 54 Sectors</button>
                        </div>
                    </div>
                </aside>
            </div>
        </div>
    );
};

export default SystemRules;
