import {
    Activity,
    ArrowUpRight,
    Info,
    Layers,
    Minus,
    Navigation,
    Plus,
    ShieldAlert
} from 'lucide-react';
import React from 'react';
import { useAdminStore } from '../../../stores/adminStore';

export const MarketplaceHealth: React.FC = () => {
    const { addIncident } = useAdminStore();

    const triggerEmergency = () => {
        addIncident({
            type: 'SOS_SIGNAL',
            priority: 'critical',
            status: 'open',
            description: 'EMERGENCY: Rider medical situation reported via quick-action trigger during stress test.',
            passengerName: 'Mark V.',
            driverName: 'PILOT-342'
        });
        alert('Critical SOS Incident Triggered!');
    };

    return (
        <div className="flex h-full overflow-hidden">
            {/* Sidebar Controls (Internal to Module) */}
            <aside className="w-80 border-r border-border-dark bg-panel-dark h-full flex flex-col shrink-0 overflow-y-auto custom-scrollbar">
                <div className="p-5 flex flex-col gap-6 ">
                    {/* Market Health Section */}
                    <section>
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Market Health</h3>
                            <Info size={14} className="text-primary" />
                        </div>
                        <div className="bg-background-dark/50 rounded-xl p-4 border border-border-dark">
                            <div className="flex justify-between items-end mb-2">
                                <div>
                                    <p className="text-[10px] text-slate-500 uppercase font-bold">Supply / Demand</p>
                                    <p className="text-2xl font-extrabold text-white">1.42<span className="text-xs font-normal text-slate-400 ml-1">Ratio</span></p>
                                </div>
                                <div className="h-12 w-12 flex items-center justify-center rounded-full border-4 border-primary border-t-transparent animate-spin-slow">
                                    <span className="text-[10px] font-bold text-primary">84%</span>
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-2 mt-4">
                                <div className="bg-panel-dark p-2 rounded-lg border border-border-dark">
                                    <p className="text-[10px] uppercase text-slate-500 font-bold">Drivers</p>
                                    <p className="text-sm font-bold text-white">1,204</p>
                                </div>
                                <div className="bg-panel-dark p-2 rounded-lg border border-border-dark">
                                    <p className="text-[10px] uppercase text-slate-500 font-bold">Active Pings</p>
                                    <p className="text-sm font-bold text-primary">845</p>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Global Fare Floor Controller */}
                    <section>
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Fare Floor Controls</h3>
                            <button className="text-[10px] bg-primary/10 text-primary px-2 py-1 rounded font-bold uppercase hover:bg-primary/20 transition-colors">Reset</button>
                        </div>
                        <div className="space-y-4">
                            {[
                                { zone: "Downtown Core", val: 4.50, range: [2, 8] },
                                { zone: "Airport Link", val: 12.00, range: [10, 25] },
                                { zone: "North Residential", val: 3.20, range: [2, 8] }
                            ].map((zone) => (
                                <div key={zone.zone} className="p-3 bg-background-dark/50 rounded-lg border border-transparent hover:border-primary/30 transition-all group">
                                    <div className="flex justify-between items-center mb-3">
                                        <span className="text-sm font-semibold text-slate-200">{zone.zone}</span>
                                        <span className="text-xs font-bold text-primary">${zone.val.toFixed(2)} min</span>
                                    </div>
                                    <input
                                        type="range"
                                        min={zone.range[0]}
                                        max={zone.range[1]}
                                        step="0.1"
                                        className="w-full h-1.5 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-primary"
                                    />
                                    <div className="flex justify-between mt-1 text-[10px] text-slate-500 font-bold">
                                        <span>${zone.range[0].toFixed(2)}</span>
                                        <span>${zone.range[1].toFixed(2)}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>

                    <div className="mt-auto pt-6 space-y-2">
                        <button className="w-full bg-primary hover:bg-primary/90 text-black font-bold py-3 rounded-xl transition-all flex items-center justify-center gap-2 shadow-lg shadow-primary/20">
                            <ArrowUpRight size={18} />
                            APPLY GLOBAL UPDATES
                        </button>
                        <button
                            onClick={triggerEmergency}
                            className="w-full bg-red-500 hover:bg-red-600 text-white font-bold py-3 rounded-xl transition-all flex items-center justify-center gap-2 shadow-lg shadow-red-500/20"
                        >
                            <ShieldAlert size={18} />
                            TRIGGER SOS MOCK
                        </button>
                    </div>
                </div>
            </aside>

            {/* Main Map Area */}
            <main className="flex-1 relative bg-slate-900 overflow-hidden">
                {/* Map Simulation Background */}
                <div className="absolute inset-0 z-0">
                    <img
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuBx2b1Blf2cHujewY-hMMyySbJobGkEPgkYSuD0OQ33hPG6yYSXZJYwdrIOpt1RUQb5gExZcuMMpuXDf5Y6w2Z_bTbhAuKb_UnprIwiEY6kOrnLSTxWHVVDdc8nrfhwqxoBFOVOzpkAAR9OLsro2sr2_2Jy4826ve5oYvAqft7Ugu8W8pikmKjfgvk9ipGPDPuCVCsZIczLzh0ByybdYI9dLwefJYTm2eD2aBgFhX2ng13If994tJiZzZGwqQLl7D_JIg019B7OTx8"
                        alt="Live Map"
                        className="w-full h-full object-cover opacity-30 grayscale contrast-125"
                    />
                    <div className="absolute inset-0 bg-gradient-to-tr from-background-dark via-transparent to-background-dark/80"></div>
                </div>

                {/* Map Controls */}
                <div className="absolute right-6 top-6 z-20 flex flex-col gap-2">
                    <button className="bg-panel-dark p-3 rounded-lg shadow-xl border border-border-dark text-slate-400 hover:text-primary transition-colors">
                        <Layers size={20} />
                    </button>
                    <button className="bg-panel-dark p-3 rounded-lg shadow-xl border border-border-dark text-slate-400 hover:text-primary transition-colors">
                        <Navigation size={20} />
                    </button>
                    <div className="mt-4 flex flex-col gap-2">
                        <button className="bg-panel-dark p-2 rounded-lg shadow-xl border border-border-dark text-slate-400 hover:text-primary transition-colors">
                            <Plus size={20} />
                        </button>
                        <button className="bg-panel-dark p-2 rounded-lg shadow-xl border border-border-dark text-slate-400 hover:text-primary transition-colors">
                            <Minus size={20} />
                        </button>
                    </div>
                </div>

                {/* Live Activity Log */}
                <div className="absolute bottom-6 left-6 right-6 z-20 pointer-events-none flex gap-4">
                    <div className="flex-1 max-w-sm bg-panel-dark/90 backdrop-blur-md rounded-xl p-4 border border-border-dark pointer-events-auto shadow-2xl">
                        <div className="flex items-center justify-between mb-3">
                            <h4 className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Live Bid Wars</h4>
                            <span className="text-[10px] px-1.5 py-0.5 bg-green-500/10 text-green-500 rounded font-bold border border-green-500/20 animate-pulse">LIVE</span>
                        </div>
                        <div className="space-y-3 max-h-48 overflow-y-auto custom-scrollbar pr-2">
                            <div className="flex items-start gap-3 pb-3 border-b border-border-dark">
                                <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                                    <Activity size={14} className="text-primary" />
                                </div>
                                <div>
                                    <p className="text-[11px] font-bold text-white">User_8293 bid <span className="text-primary">$18.50</span></p>
                                    <p className="text-[10px] text-slate-500 font-medium">3 Drivers responded • Polanco Zone</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="hidden lg:flex flex-1 max-w-xs bg-panel-dark/90 backdrop-blur-md rounded-xl p-4 border border-border-dark pointer-events-auto shadow-2xl flex flex-col justify-between">
                        <h4 className="text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-2">Demand Pulse</h4>
                        <div className="flex items-center gap-4">
                            <div className="flex-1 h-12 bg-background-dark/50 rounded-lg flex items-end gap-1 p-1 overflow-hidden">
                                {[0.4, 0.6, 0.9, 0.7, 1, 0.8, 0.5].map((h, i) => (
                                    <div key={i} className="flex-1 bg-primary/40 rounded-t-sm" style={{ height: `${h * 100}%` }}></div>
                                ))}
                            </div>
                            <div>
                                <p className="text-xl font-black text-primary">+12%</p>
                                <p className="text-[10px] text-slate-500 uppercase font-bold">vs Avg</p>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default MarketplaceHealth;
