import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const LiveFleetMap: React.FC = () => {
    const navigate = useNavigate();
    const [zoomLevel, setZoomLevel] = useState(1);

    const zoomIn = () => setZoomLevel(prev => Math.min(prev + 0.2, 2));
    const zoomOut = () => setZoomLevel(prev => Math.max(prev - 0.2, 0.8));

    return (
        <div className="fixed inset-0 z-[100] bg-slate-950 font-display text-slate-100 overflow-hidden flex flex-col antialiased">
            {/* Background Map Layer */}
            <div className="absolute inset-0 z-0">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_#1e293b_0%,#0f172a_100%)] opacity-60"></div>
                <div
                    className="absolute inset-0 transition-transform duration-700 ease-out origin-center"
                    style={{ transform: `scale(${zoomLevel * 1.15})` }}
                >
                    <img
                        alt="Harare Map"
                        className="absolute inset-0 w-full h-full object-cover mix-blend-luminosity grayscale opacity-20"
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuBUX9PFRZVuQIKXkclnpeisf47gjopDQSI7ikoRUOqC0b752rylx9Bsr1v__NhcPgOB-6cnOfQotGw-cETKL7pW23P1WcLcNzByKOFl57e11uKJil0VolbKxTs2TIxO2N7nhs1GPOFIusu1TRRfEQJgDYIvqpN5wA16Vz803iW0y4vcSGj7Espi85kJ-SRX-Wwc3j5lMYVvJGEdknb7-U-ZxkyWxXqyp1VALFLDpSbrkJ3nfz3pPMhdu7yWC_IM3bewYadWmA8mCk6V"
                    />

                    {/* Radar Scanning Line */}
                    <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-transparent via-primary/10 to-transparent h-1/2 w-full -translate-y-full animate-scan"></div>

                    {/* Map Grid Overlay */}
                    <div className="absolute inset-0 pointer-events-none opacity-20" style={{ backgroundImage: 'radial-gradient(circle, #334155 1px, transparent 1px)', backgroundSize: '60px 60px' }}></div>

                    {/* Fleet Markers */}
                    {/* Available Drivers */}
                    <div className="absolute top-[20%] left-[35%] group cursor-pointer">
                        <div className="w-3 h-3 bg-amber-400 rounded-full shadow-[0_0_15px_rgba(251,191,36,0.8)] border-2 border-slate-900 transition-transform hover:scale-125"></div>
                    </div>
                    <div className="absolute top-[55%] left-[15%] w-3 h-3 bg-amber-400 rounded-full shadow-[0_0_15px_rgba(251,191,36,0.8)] border-2 border-slate-900"></div>
                    <div className="absolute bottom-[30%] right-[40%] w-3 h-3 bg-amber-400 rounded-full shadow-[0_0_15px_rgba(251,191,36,0.8)] border-2 border-slate-900"></div>

                    {/* Active Trips */}
                    <div className="absolute top-[30%] right-[45%] w-4 h-4 bg-primary rounded-full border-2 border-white shadow-[0_0_20px_rgba(0,255,144,0.6)]"></div>
                    <div className="absolute bottom-[20%] left-[45%] w-4 h-4 bg-primary rounded-full border-2 border-white shadow-[0_0_20px_rgba(0,255,144,0.6)]"></div>

                    {/* New Requests */}
                    <div className="absolute top-[45%] left-[50%] w-5 h-5 bg-red-600 rounded-full border-2 border-white animate-pulse-primary shadow-[0_0_25px_rgba(220,38,38,0.9)] flex items-center justify-center">
                        <div className="w-2 h-2 bg-white rounded-full"></div>
                    </div>
                </div>
            </div>

            {/* Top Navigation UI */}
            <div className="absolute top-6 left-6 z-50 flex items-center gap-4">
                <button
                    onClick={() => navigate('/')}
                    className="flex items-center gap-2 bg-slate-900/90 backdrop-blur-xl border border-slate-700 hover:border-primary transition-all text-white px-5 py-2.5 rounded-xl shadow-2xl group"
                >
                    <span className="material-symbols-outlined text-xl group-hover:-translate-x-1 transition-transform">arrow_back</span>
                    <span className="font-bold text-sm tracking-wide uppercase">Back to Dashboard</span>
                </button>
                <div className="bg-slate-900/90 backdrop-blur-xl border border-slate-700 px-4 py-2.5 rounded-xl flex items-center gap-3 shadow-2xl">
                    <span className="w-2 h-2 bg-primary rounded-full animate-pulse shadow-[0_0_10px_rgba(0,255,144,0.8)]"></span>
                    <span className="text-xs font-bold text-slate-300 uppercase tracking-widest">Live: Harare Metro Command</span>
                </div>
            </div>

            {/* Right Status Sidebar */}
            <div className="absolute top-6 right-6 z-50 w-72 space-y-4">
                <div className="glass-panel p-4 space-y-6">
                    <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                        <h3 className="font-bold text-base tracking-tight uppercase text-white">Real-Time Stats</h3>
                        <span className="material-symbols-outlined text-primary text-xl">analytics</span>
                    </div>

                    <div className="space-y-4">
                        <div className="glass-card p-3 rounded-xl border-l-2 border-primary">
                            <p className="text-[9px] text-slate-400 font-bold uppercase tracking-widest mb-1">Active Rides</p>
                            <div className="flex items-end gap-2">
                                <span className="text-2xl font-bold text-primary leading-none">142</span>
                                <span className="text-[10px] text-primary/60 font-medium mb-0.5">Live now</span>
                            </div>
                        </div>

                        <div className="glass-card p-3 rounded-xl border-l-2 border-amber-400">
                            <p className="text-[9px] text-slate-400 font-bold uppercase tracking-widest mb-1">Bidding Activity</p>
                            <div className="flex items-end gap-2">
                                <span className="text-2xl font-bold text-amber-400 leading-none">28</span>
                                <span className="text-[10px] text-amber-400/60 font-medium mb-0.5">Avg $12.40</span>
                            </div>
                        </div>

                        <div className="glass-card p-3 rounded-xl border-l-2 border-primary">
                            <p className="text-[9px] text-slate-400 font-bold uppercase tracking-widest mb-1">Today's Revenue</p>
                            <div className="flex items-end gap-2">
                                <span className="text-2xl font-bold text-white leading-none">$4,852</span>
                                <span className="text-[10px] text-primary/60 font-medium mb-0.5">USD equiv.</span>
                            </div>
                        </div>
                    </div>

                    <div className="pt-2">
                        <button className="w-full py-2.5 bg-primary text-black font-bold rounded-xl text-[10px] uppercase tracking-widest shadow-lg shadow-primary/20 hover:brightness-110 transition-all flex items-center justify-center gap-2">
                            <span className="material-symbols-outlined text-sm font-bold">bolt</span>
                            Optimize Dispatch
                        </button>
                    </div>
                </div>

                {/* Map Legend Overlay */}
                <div className="glass-panel p-4">
                    <h4 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-3 px-1">Map Legend</h4>
                    <div className="space-y-2">
                        <div className="flex items-center gap-3 bg-slate-800/20 p-2 rounded-lg">
                            <span className="w-2.5 h-2.5 bg-amber-400 rounded-full shadow-[0_0_8px_rgba(251,191,36,0.6)]"></span>
                            <span className="text-[10px] font-semibold text-slate-300 uppercase">Available (84)</span>
                        </div>
                        <div className="flex items-center gap-3 bg-slate-800/20 p-2 rounded-lg">
                            <span className="w-2.5 h-2.5 bg-primary rounded-full shadow-[0_0_8px_rgba(0,255,144,0.6)]"></span>
                            <span className="text-[10px] font-semibold text-slate-300 uppercase">Active (142)</span>
                        </div>
                        <div className="flex items-center gap-3 bg-slate-800/20 p-2 rounded-lg">
                            <span className="w-2.5 h-2.5 bg-red-600 rounded-full animate-pulse shadow-[0_0_8px_rgba(220,38,38,0.6)]"></span>
                            <span className="text-[10px] font-semibold text-slate-300 uppercase">Requests (15)</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Repositioned Actions & Zoom (Now Bottom Left above Node Info) */}
            <div className="absolute bottom-40 left-6 z-50 flex flex-col gap-3">
                <button className="glass-panel hover:bg-slate-800 text-white p-3 rounded-xl border border-slate-700 shadow-2xl transition-all flex items-center gap-3 group">
                    <span className="material-symbols-outlined text-xl text-primary group-hover:scale-110 transition-transform">layers</span>
                    <span className="text-[10px] font-bold uppercase tracking-wider pr-2">Heatmap Mode</span>
                </button>
                <div className="flex flex-col glass-panel rounded-xl overflow-hidden w-fit">
                    <button onClick={zoomIn} className="p-3 hover:bg-slate-800 border-b border-slate-700 transition-colors">
                        <span className="material-symbols-outlined text-xl">add</span>
                    </button>
                    <button onClick={zoomOut} className="p-3 hover:bg-slate-800 transition-colors">
                        <span className="material-symbols-outlined text-xl">remove</span>
                    </button>
                </div>
            </div>

            {/* Bottom Left Node Information */}
            <div className="absolute bottom-24 left-6 z-50">
                <div className="glass-panel p-4 rounded-xl flex items-center gap-4">
                    <div className="flex flex-col">
                        <span className="text-[9px] font-bold text-slate-500 uppercase tracking-widest">Connection</span>
                        <div className="flex items-center gap-2">
                            <span className="w-2 h-2 bg-primary rounded-full"></span>
                            <span className="text-xs font-bold">Stable (42ms)</span>
                        </div>
                    </div>
                    <div className="h-8 w-[1px] bg-slate-800"></div>
                    <div className="flex flex-col">
                        <span className="text-[9px] font-bold text-slate-500 uppercase tracking-widest">Active nodes</span>
                        <span className="text-xs font-bold uppercase">12 Workers</span>
                    </div>
                </div>
            </div>

            {/* Ticker Tape */}
            <div className="absolute bottom-0 left-0 w-full z-[100] bg-[#0f172a]/95 backdrop-blur-md border-t border-slate-700/50 py-3 overflow-hidden">
                <div className="flex items-center whitespace-nowrap ticker-scroll">
                    <div className="flex items-center gap-8 px-4">
                        <div className="flex items-center gap-2.5">
                            <span className="material-symbols-outlined text-primary text-xl">payments</span>
                            <span className="text-sm font-medium text-slate-200">New Bid: <span className="font-bold text-primary">$12.00</span> in Mabelreign</span>
                        </div>
                        <div className="h-4 w-[1px] bg-slate-700/50"></div>
                        <div className="flex items-center gap-2.5">
                            <span className="material-symbols-outlined text-primary text-xl">check_circle</span>
                            <span className="text-sm font-medium text-slate-200">Ride Completed: <span className="font-bold">ID #8829</span></span>
                        </div>
                        <div className="h-4 w-[1px] bg-slate-700/50"></div>
                        <div className="flex items-center gap-2.5">
                            <span className="material-symbols-outlined text-amber-500 text-xl font-bold">warning</span>
                            <span className="text-sm font-medium text-slate-200 uppercase">Driver Offline: <span className="font-bold">T. Chaka</span></span>
                        </div>
                        <div className="h-4 w-[1px] bg-slate-700/50"></div>
                        <div className="flex items-center gap-2.5">
                            <span className="material-symbols-outlined text-primary text-xl">near_me</span>
                            <span className="text-sm font-medium text-slate-200 uppercase">System Status: <span className="font-bold">Optimal Dispatch</span></span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Inset Shadow for Depth */}
            <div className="absolute inset-0 pointer-events-none shadow-[inset_0_0_150px_rgba(0,0,0,0.8)] z-10"></div>
        </div>
    );
};

export default LiveFleetMap;
