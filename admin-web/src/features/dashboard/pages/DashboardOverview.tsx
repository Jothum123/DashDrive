import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Header } from '../../../components/shared/Header';
import { LiveFleetMap } from '../../ops-central/pages/LiveFleetMap';

export const DashboardOverview: React.FC = () => {
    const [mapView, setMapView] = useState<'live' | 'heatmap'>('live');
    const [zoomLevel, setZoomLevel] = useState(1);
    const [isFullscreen, setIsFullscreen] = useState(false);

    const toggleFullscreen = () => setIsFullscreen(!isFullscreen);
    const zoomIn = () => setZoomLevel(prev => Math.min(prev + 0.2, 2));
    const zoomOut = () => setZoomLevel(prev => Math.max(prev - 0.2, 0.8));

    if (isFullscreen) {
        if (mapView === 'live') {
            return <LiveFleetMap />;
        }
        return (
            <div className="fixed inset-0 z-[100] bg-zinc-950 font-display text-slate-200 overflow-hidden flex flex-col">
                {/* Background Map Layer */}
                <div className="absolute inset-0 z-0 overflow-hidden">
                    <div
                        className="absolute inset-0 transition-transform duration-700 ease-out origin-center"
                        style={{ transform: `scale(${zoomLevel * 1.1})` }}
                    >
                        <img
                            className="w-full h-full object-cover opacity-60 mix-blend-luminosity"
                            src="https://lh3.googleusercontent.com/aida-public/AB6AXuD7XayBnjiA5M1xZ2I8GnY71UrqqCDX353kysFFE_b3ZnE4ApSUDUAL0_mInjINgxcETDncvIH-lhiJCV5advlIVqghbVfuvqJ069urrc65yFQXgP46N82vhGSit8I5wu10yAqQkV5tISPTnLDS81AryYGnkRYK6CgA5D7L4oxFij4RYOjMfV7hsG-OsZ1aYUKohNNE-F016uNp0kLz-g2uFQ1rEzlJrh0E18Msiyn1vAXJPc1EcmFqKJnsSC3rFnixGOPQm6l4uoZT"
                            alt="Harare Map"
                        />
                        {/* Heatmap overlay (mapView is always 'heatmap' here) */}
                        <div className="absolute inset-0 pointer-events-none">
                            <div className="absolute top-[45%] left-[48%] w-64 h-64 heatmap-high opacity-80"></div>
                            <div className="absolute top-[38%] left-[42%] w-48 h-48 heatmap-high opacity-70"></div>
                            <div className="absolute top-[25%] left-[55%] w-56 h-56 heatmap-med opacity-60"></div>
                            <div className="absolute bottom-[20%] right-[35%] w-48 h-48 heatmap-med opacity-50"></div>
                            <div className="absolute bottom-[15%] left-[65%] w-80 h-80 heatmap-low opacity-40"></div>
                        </div>
                    </div>
                </div>

                {/* UI Overlay Wrappers */}
                <div className="relative z-20 w-full h-full pointer-events-none flex flex-col justify-between">
                    {/* Top Header */}
                    <div className="p-6 flex justify-between items-start pointer-events-auto">
                        <button
                            onClick={toggleFullscreen}
                            className="bg-primary hover:bg-primary/90 text-black flex items-center gap-2 px-5 py-2.5 rounded-lg shadow-2xl transition-all group"
                        >
                            <span className="material-icons text-lg group-hover:-translate-x-1 transition-transform">arrow_back</span>
                            <span className="font-bold text-sm uppercase tracking-tight">Back to Dashboard</span>
                        </button>

                        <div className="flex items-center gap-3 bg-zinc-950/80 backdrop-blur-md px-4 py-2 rounded-lg border border-white/10">
                            <div className="w-3 h-3 rounded-full bg-primary animate-pulse shadow-[0_0_10px_rgba(0,255,144,0.5)]"></div>
                            <span className="text-xs font-bold tracking-widest uppercase text-white">Central Hub: Harare (UTC+2)</span>
                        </div>
                    </div>

                    {/* Bottom Floating Legend & Controls */}
                    <div className="px-6 pb-20 flex flex-row justify-between items-end">
                        <div className="pointer-events-auto w-64 glass-panel p-4 rounded-xl border border-white/5 space-y-3 shadow-2xl">
                            <div className="flex justify-between items-center mb-1">
                                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Map Legend</span>
                                <span className="material-icons text-slate-500 text-xs">info</span>
                            </div>
                            <div className="h-2 w-full rounded-full bg-gradient-to-r from-primary via-yellow-400 to-red-500"></div>
                            <div className="flex justify-between text-[8px] text-slate-500 font-black tracking-tighter">
                                <span>NORMAL SUPPLY</span>
                                <span>MODERATE</span>
                                <span>CRITICAL CRASH</span>
                            </div>
                            <div className="pt-2 border-t border-white/5 flex flex-col gap-2">
                                <div className="flex items-center gap-2">
                                    <span className="w-2 h-2 rounded-full bg-primary shadow-[0_0_5px_rgba(0,255,144,0.8)]"></span>
                                    <span className="text-[10px] text-slate-300 font-bold uppercase">Available Fleet</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="w-2 h-2 rounded-full bg-yellow-500 shadow-[0_0_5px_rgba(234,179,8,0.8)]"></span>
                                    <span className="text-[10px] text-slate-300 font-bold uppercase">Active Demand</span>
                                </div>
                            </div>
                        </div>

                        {/* Floating Action Controls */}
                        <div className="pointer-events-auto flex flex-col gap-2 mb-2">
                            <button onClick={zoomIn} className="w-10 h-10 bg-zinc-950/90 hover:bg-primary text-white hover:text-black rounded-lg flex items-center justify-center border border-white/10 mb-1 transition-all">
                                <span className="material-icons">add</span>
                            </button>
                            <button onClick={zoomOut} className="w-10 h-10 bg-zinc-950/90 hover:bg-primary text-white hover:text-black rounded-lg flex items-center justify-center border border-white/10 mb-2 transition-all">
                                <span className="material-icons">remove</span>
                            </button>
                            <button
                                onClick={() => setMapView('live')}
                                className="w-10 h-10 rounded-lg flex items-center justify-center border transition-all bg-primary text-black border-primary"
                            >
                                <span className="material-icons">layers</span>
                            </button>
                        </div>
                    </div>

                    {/* Ticker Tape */}
                    <div className="pointer-events-auto h-16 w-full bg-zinc-950/95 border-t border-white/10 flex items-center relative z-50">
                        <div className="h-full px-6 flex items-center bg-primary text-black font-black uppercase tracking-widest text-xs z-40 shadow-[10px_0_20px_rgba(0,0,0,0.5)]">
                            Live Telemetry
                        </div>
                        <div className="ticker-container flex-1 h-full flex items-center overflow-hidden">
                            <div className="ticker-scroll flex items-center gap-12">
                                {[
                                    { icon: 'info', text: 'New Bidding Session: Avondale Area', color: 'text-primary' },
                                    { icon: 'check_circle', text: 'Ride Completed: 12.40 USD Earned', color: 'text-green-500' },
                                    { icon: 'verified', text: 'Driver Verified: T. Moyo (Taxi-44)', color: 'text-primary' },
                                    { icon: 'warning', text: 'Surge Triggered: Borrowdale High Demand', color: 'text-yellow-500' }
                                ].map((item, i) => (
                                    <div key={i} className="flex items-center gap-3">
                                        <span className={`material-symbols-outlined ${item.color} text-3xl font-bold`}>{item.icon}</span>
                                        <span className="text-xl font-bold text-white uppercase tracking-tight">{item.text}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Left Control Sidebar */}
                <aside className="fixed top-24 left-6 h-[calc(100vh-176px)] w-72 glass-panel z-40 rounded-2xl flex flex-col pointer-events-auto border border-white/10 shadow-2xl overflow-hidden translate-x-0 transition-transform">
                    <div className="p-4 bg-red-600/10 border-b border-red-500/20">
                        <button className="w-full bg-red-600 hover:bg-red-700 text-white py-2.5 rounded-lg flex items-center justify-center gap-2 transition-colors shadow-lg shadow-red-900/20 group">
                            <span className="material-symbols-outlined text-lg font-bold group-active:scale-90">emergency_home</span>
                            <span className="font-bold text-xs uppercase tracking-tighter">Global Kill-Switch</span>
                        </button>
                    </div>

                    <div className="p-4 border-b border-white/5 bg-white/5">
                        <div className="flex justify-between items-center mb-3">
                            <h3 className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Dispatch Mode</h3>
                            <span className="text-[10px] font-bold text-primary px-2 py-0.5 bg-primary/10 rounded">AUTONOMOUS</span>
                        </div>
                        <div className="flex p-1 bg-black/40 rounded-lg border border-white/5">
                            <button className="flex-1 text-[8px] font-bold py-1.5 rounded bg-primary text-black">AI PILOT</button>
                            <button className="flex-1 text-[8px] font-bold py-1.5 rounded text-slate-500">MANUAL</button>
                        </div>
                    </div>

                    <div className="flex-grow overflow-y-auto custom-scrollbar p-4 space-y-5">
                        {[
                            { label: 'Avondale', val: 1.4, color: 'accent-primary' },
                            { label: 'Borrowdale', val: 2.8, color: 'accent-yellow-500', hl: 'text-yellow-500' },
                            { label: 'Mbare', val: 3.5, color: 'accent-red-500', hl: 'text-red-500' },
                            { label: 'Harare CBD', val: 1.0, color: 'accent-slate-600' }
                        ].map((zone) => (
                            <div key={zone.label} className="space-y-2">
                                <div className="flex justify-between items-end">
                                    <span className="text-[10px] font-bold text-slate-400 uppercase">{zone.label}</span>
                                    <div className={`text-lg font-bold ${zone.hl || 'text-white'}`}>{zone.val}x</div>
                                </div>
                                <input
                                    type="range"
                                    min="1.0"
                                    max="4.0"
                                    step="0.1"
                                    value={zone.val}
                                    readOnly
                                    className={`w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer ${zone.color} surge-slider`}
                                />
                            </div>
                        ))}
                    </div>
                </aside>

                {/* Right Status Sidebar */}
                <aside className="fixed top-0 right-0 h-[calc(100vh-64px)] w-80 glass-panel z-20 p-6 flex flex-col pointer-events-auto border-l border-white/10">
                    <div className="flex items-center justify-between mb-8">
                        <div>
                            <h2 className="text-xl font-bold tracking-tight text-white uppercase">Sector Stats</h2>
                            <p className="text-[10px] text-primary font-bold uppercase tracking-[0.2em]">Zim Dashboard v2</p>
                        </div>
                        <div className="flex items-center gap-2 bg-primary/10 px-2 py-1 rounded text-primary border border-primary/20">
                            <span className="material-icons text-xs">radio_button_checked</span>
                            <span className="text-[10px] font-bold">STREAMING</span>
                        </div>
                    </div>

                    <div className="space-y-4 flex-grow overflow-y-auto pr-2 custom-scrollbar">
                        <div className="glass-card p-4 rounded-xl border-l-2 border-l-primary">
                            <div className="flex items-start justify-between">
                                <div>
                                    <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Active Rides</span>
                                    <div className="text-3xl font-bold text-white mt-1">1,284</div>
                                </div>
                                <div className="p-2 bg-primary/20 rounded-lg text-primary">
                                    <span className="material-icons">local_taxi</span>
                                </div>
                            </div>
                        </div>

                        <div className="glass-card p-4 rounded-xl border-l-2 border-l-yellow-500">
                            <div className="flex items-start justify-between">
                                <div>
                                    <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Open Bids</span>
                                    <div className="text-3xl font-bold text-white mt-1">452</div>
                                </div>
                                <div className="p-2 bg-yellow-500/20 rounded-lg text-yellow-500">
                                    <span className="material-icons">gavel</span>
                                </div>
                            </div>
                        </div>

                        <div className="glass-card p-4 rounded-xl">
                            <h4 className="text-[10px] font-bold text-slate-400 uppercase mb-3">Node Latency</h4>
                            <div className="space-y-3">
                                <div className="space-y-1">
                                    <div className="flex justify-between text-[10px] font-bold text-slate-400">
                                        <span>GATEWAY_AF-SOUTH</span>
                                        <span className="text-primary">12ms</span>
                                    </div>
                                    <div className="h-1 bg-zinc-800 rounded-full overflow-hidden">
                                        <div className="h-full bg-primary" style={{ width: '12%' }}></div>
                                    </div>
                                </div>
                                <div className="space-y-1">
                                    <div className="flex justify-between text-[10px] font-bold text-slate-400">
                                        <span>SUPABASE_CLUSTER</span>
                                        <span className="text-primary">24ms</span>
                                    </div>
                                    <div className="h-1 bg-zinc-800 rounded-full overflow-hidden">
                                        <div className="h-full bg-primary" style={{ width: '24%' }}></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <button
                        onClick={toggleFullscreen}
                        className="w-full mt-6 bg-white/5 hover:bg-white/10 text-white py-3 rounded-lg border border-white/10 font-bold text-xs uppercase tracking-widest transition-colors flex items-center justify-center gap-2"
                    >
                        <span className="material-icons text-sm">fullscreen_exit</span>
                        Exit Command Center
                    </button>
                </aside>
            </div>
        );
    }

    return (
        <div className="flex-1 flex flex-col min-w-0 overflow-y-auto bg-background-light dark:bg-zinc-950 scrollbar-hide">
            <Header title="Dashboard Overview" />
            <div className="p-8 space-y-8 flex-1">
                {/* Secondary Header / Controls Section */}
                <div className="flex items-center justify-between">
                    <h2 className="text-lg font-bold flex items-center gap-2 uppercase tracking-tight text-slate-900 dark:text-white">
                        <span className="material-icons text-primary text-[20px]">{mapView === 'live' ? 'public' : 'map'}</span>
                        {mapView === 'live' ? 'God View: Live Map' : 'Demand Heatmap: Harare Metro'}
                    </h2>
                    <div className="flex items-center gap-3">
                        <div className="flex items-center gap-2 bg-amber-500/10 text-amber-500 border border-amber-500/20 px-3 py-1.5 rounded-lg text-xs font-bold">
                            <span className="material-icons text-sm">wifi_off</span>
                            Low Bandwidth Mode
                        </div>
                        <div className="flex items-center gap-1 bg-white dark:bg-zinc-900 p-1 rounded-lg border border-slate-200 dark:border-zinc-800">
                            <button
                                onClick={() => setMapView('live')}
                                className={`px-3 py-1.5 text-xs font-bold rounded-md transition-colors ${mapView === 'live' ? 'bg-primary text-black' : 'text-slate-500 hover:bg-slate-100 dark:hover:bg-zinc-800'}`}
                            >
                                Live Map
                            </button>
                            <button
                                onClick={() => setMapView('heatmap')}
                                className={`px-3 py-1.5 text-xs font-bold rounded-md transition-colors ${mapView === 'heatmap' ? 'bg-primary text-black' : 'text-slate-500 hover:bg-slate-100 dark:hover:bg-zinc-800'}`}
                            >
                                Heatmap
                            </button>
                        </div>
                        <button
                            onClick={toggleFullscreen}
                            className="flex items-center justify-center p-2 bg-white dark:bg-zinc-900 rounded-lg border border-slate-200 dark:border-zinc-800 text-slate-500 hover:text-primary transition-colors"
                        >
                            <span className="material-symbols-outlined text-[20px]">open_in_full</span>
                        </button>
                    </div>
                </div>

                {/* KPI Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <div className="bg-white dark:bg-zinc-900 p-5 rounded-2xl border border-slate-200 dark:border-zinc-800 shadow-sm transition-all hover:shadow-md high-affordance-border">
                        <div className="flex justify-between items-start mb-4">
                            <div className="p-2 bg-primary/10 rounded-lg">
                                <span className="material-icons text-primary">local_taxi</span>
                            </div>
                            <span className="text-xs font-bold text-green-500 bg-green-500/10 px-2 py-1 rounded">+12%</span>
                        </div>
                        <h3 className="text-slate-500 dark:text-slate-400 text-xs font-bold uppercase tracking-wider">Active Rides</h3>
                        <p className="text-3xl font-bold mt-1 text-slate-900 dark:text-white">142</p>
                    </div>

                    <div className="bg-white dark:bg-zinc-900 p-5 rounded-2xl border border-slate-200 dark:border-zinc-800 shadow-sm transition-all hover:shadow-md">
                        <div className="flex justify-between items-start mb-4">
                            <div className="p-2 bg-amber-500/10 rounded-lg">
                                <span className="material-icons text-amber-500">gavel</span>
                            </div>
                            <span className="text-xs font-bold text-amber-500 bg-amber-500/10 px-2 py-1 rounded">Live</span>
                        </div>
                        <h3 className="text-slate-500 dark:text-slate-400 text-xs font-bold uppercase tracking-wider">Active Bids</h3>
                        <p className="text-3xl font-bold mt-1 text-slate-900 dark:text-white">28</p>
                    </div>

                    <div className="bg-white dark:bg-zinc-900 p-5 rounded-2xl border border-slate-200 dark:border-zinc-800 shadow-sm transition-all hover:shadow-md text-slate-900 dark:text-white">
                        <div className="flex justify-between items-start mb-4">
                            <div className="p-2 bg-primary/10 rounded-lg">
                                <span className="material-icons text-primary">payments</span>
                            </div>
                            <span className="text-xs font-bold text-slate-500 bg-slate-500/10 px-2 py-1 rounded">Combined</span>
                        </div>
                        <h3 className="text-slate-500 dark:text-slate-400 text-xs font-bold uppercase tracking-wider">Total Revenue</h3>
                        <p className="text-3xl font-bold mt-1">$4,852</p>
                    </div>

                    <div className="bg-white dark:bg-zinc-900 p-5 rounded-2xl border border-slate-200 dark:border-zinc-800 shadow-sm transition-all hover:shadow-md">
                        <div className="flex justify-between items-start mb-4">
                            <div className="p-2 bg-red-500/10 rounded-lg">
                                <span className="material-symbols-outlined text-red-500">verified_user</span>
                            </div>
                            <span className="text-xs font-bold text-red-500 bg-red-500/10 px-2 py-1 rounded animate-pulse">Urgent</span>
                        </div>
                        <h3 className="text-slate-500 dark:text-slate-400 text-xs font-bold uppercase tracking-wider">Driver Approvals</h3>
                        <p className="text-3xl font-bold mt-1 text-slate-900 dark:text-white">12</p>
                    </div>
                </div>

                {/* Main Map Visualization Content */}
                <div className="relative h-[500px] w-full bg-slate-200 dark:bg-zinc-900 rounded-2xl overflow-hidden border border-slate-300 dark:border-zinc-800 shadow-inner group transition-all">
                    {/* Map Content Layer with Zoom Transform */}
                    <div
                        className="absolute inset-0 transition-transform duration-500 origin-center"
                        style={{ transform: `scale(${zoomLevel})` }}
                    >
                        <div className="absolute inset-0 map-bg opacity-50"></div>
                        <img
                            className="absolute inset-0 w-full h-full object-cover mix-blend-overlay grayscale opacity-40"
                            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBUX9PFRZVuQIKXkclnpeisf47gjopDQSI7ikoRUOqC0b752rylx9Bsr1v__NhcPgOB-6cnOfQotGw-cETKL7pW23P1WcLcNzByKOFl57e11uKJil0VolbKxTs2TIxO2N7nhs1GPOFIusu1TRRfEQJgDYIvqpN5wA16Vz803iW0y4vcSGj7Espi85kJ-SRX-Wwc3j5lMYVvJGEdknb7-U-ZxkyWxXqyp1VALFLDpSbrkJ3nfz3pPMhdu7yWC_IM3bewYadWmA8mCk6V"
                            alt="Map Preview"
                        />
                        {/* Map Grid Overlay */}
                        <div className="absolute inset-0 pointer-events-none opacity-10" style={{ backgroundImage: 'radial-gradient(circle, #ffffff 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>

                        {mapView === 'live' ? (
                            <>
                                <div className="absolute top-1/2 left-1/2 w-4 h-4 bg-primary rounded-full border-2 border-white marker-glow"></div>
                                <div className="absolute top-1/4 left-1/3 w-3 h-3 bg-amber-400 rounded-full shadow-lg"></div>
                                <div className="absolute bottom-1/3 right-1/4 w-3 h-3 bg-red-500 rounded-full animate-pulse-red"></div>
                            </>
                        ) : (
                            <div className="absolute top-[45%] left-[48%] w-64 h-64 heatmap-high"></div>
                        )}
                    </div>

                    {/* Quick Controls */}
                    <div className="absolute top-6 right-6 flex flex-col gap-2 z-20">
                        <div className="bg-zinc-950/90 backdrop-blur-md border border-zinc-700/50 rounded-lg flex flex-col shadow-2xl overflow-hidden">
                            <button onClick={zoomIn} className="p-2.5 hover:bg-primary hover:text-black transition-all border-b border-zinc-700/50 flex items-center justify-center">
                                <span className="material-icons">add</span>
                            </button>
                            <button onClick={zoomOut} className="p-2.5 hover:bg-primary hover:text-black transition-all flex items-center justify-center">
                                <span className="material-icons">remove</span>
                            </button>
                        </div>
                    </div>

                    {/* Left Side Overlay (Legend) */}
                    <div className="absolute top-6 left-6 bg-zinc-950/90 backdrop-blur-md border border-zinc-700 p-4 rounded-xl space-y-3 z-10 shadow-2xl">
                        {mapView === 'live' ? (
                            <>
                                <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Fleet Legend</div>
                                <div className="flex items-center gap-3">
                                    <span className="w-3 h-3 bg-amber-400 rounded-full shadow-[0_0_8px_rgba(251,191,36,0.6)]"></span>
                                    <span className="text-xs font-medium text-slate-200">Available Drivers (84)</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <span className="w-3 h-3 bg-primary rounded-full shadow-[0_0_8px_rgba(0,255,144,0.6)]"></span>
                                    <span className="text-xs font-medium text-slate-200">Active Trips (142)</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <span className="w-3 h-3 bg-red-500 rounded-full animate-pulse-red shadow-[0_0_8px_rgba(239,68,68,0.6)]"></span>
                                    <span className="text-xs font-medium text-slate-200">New Requests (15)</span>
                                </div>
                            </>
                        ) : (
                            <>
                                <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Density Legend</div>
                                <div className="flex items-center gap-3">
                                    <span className="w-3 h-3 rounded-full bg-red-500 shadow-[0_0_12px_rgba(239,68,68,0.6)]"></span>
                                    <span className="text-[11px] font-medium text-slate-200">High Demand (&gt;50 req/km²)</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <span className="w-3 h-3 rounded-full bg-amber-500 shadow-[0_0_12px_rgba(245,158,11,0.6)]"></span>
                                    <span className="text-[11px] font-medium text-slate-200">Moderate (20-50 req/km²)</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <span className="w-3 h-3 rounded-full bg-primary shadow-[0_0_12px_rgba(0,255,144,0.6)]"></span>
                                    <span className="text-[11px] font-medium text-slate-200">Low (&lt;20 req/km²)</span>
                                </div>
                            </>
                        )}
                    </div>
                </div>

                {/* Bottom Charts Section */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 pb-12">
                    {/* Demand Trends Chart */}
                    <div className="lg:col-span-2 bg-white dark:bg-zinc-900 p-6 rounded-2xl border border-slate-200 dark:border-zinc-800 shadow-sm transition-all hover:border-primary/20">
                        <div className="flex justify-between items-center mb-6">
                            <div>
                                <h3 className="font-bold text-lg uppercase tracking-tight text-slate-900 dark:text-white">Demand Trends</h3>
                                <p className="text-xs text-slate-500">Hourly ride request volume analysis</p>
                            </div>
                            <div className="flex items-center bg-slate-100 dark:bg-zinc-800 p-1 rounded-lg">
                                <button className="px-4 py-1.5 text-xs font-bold rounded-md bg-white dark:bg-zinc-700 shadow-sm text-primary">Today</button>
                                <button className="px-4 py-1.5 text-xs font-bold rounded-md text-slate-500 hover:bg-slate-200 dark:hover:bg-zinc-700/50 transition-colors">Yesterday</button>
                            </div>
                        </div>
                        <div className="flex items-end justify-between h-64 gap-1.5 mt-4">
                            {[15, 10, 8, 12, 20, 45, 75, 90, 100, 85, 70, 60, 55, 65, 80, 95, 88, 72, 50, 35, 25, 20, 18, 15].map((val, i) => (
                                <div key={i}
                                    className={`flex-1 transition-all rounded-t-sm group relative ${val >= 90 ? 'bg-primary' : 'bg-primary/20 hover:bg-primary/40'}`}
                                    style={{ height: `${val}%` }}>
                                    <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 whitespace-nowrap z-10 transition-opacity">
                                        {i}:00 - {val} req
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Financial Status Summary Block */}
                    <div className="bg-white dark:bg-zinc-900 p-6 rounded-2xl border border-slate-200 dark:border-zinc-800 shadow-sm flex flex-col justify-between">
                        <div className="mb-6">
                            <h3 className="font-bold text-lg uppercase tracking-tight text-slate-900 dark:text-white">Financial Status</h3>
                            <p className="text-xs text-slate-500">Multi-currency revenue & health</p>
                        </div>
                        <div className="space-y-4">
                            <div className="p-4 bg-slate-50 dark:bg-zinc-950/50 rounded-xl border border-slate-200 dark:border-zinc-800 flex items-center justify-between border-l-2 border-l-primary">
                                <div>
                                    <p className="text-xs text-slate-500 uppercase font-bold tracking-wider">Avg. Bid Delta</p>
                                    <p className="text-xl font-bold text-primary">+15.4%</p>
                                </div>
                                <span className="material-icons text-primary/40 text-3xl">trending_up</span>
                            </div>
                            <div className="p-4 bg-slate-50 dark:bg-zinc-950/50 rounded-xl border border-slate-200 dark:border-zinc-800 flex items-center justify-between">
                                <div>
                                    <p className="text-xs text-slate-500 uppercase font-bold tracking-wider">Failed Payouts</p>
                                    <p className="text-xl font-bold text-red-500">2</p>
                                </div>
                                <span className="material-icons text-red-500/40 text-3xl">error_outline</span>
                            </div>
                        </div>
                        <Link to="/finance" className="w-full mt-6 py-3 bg-primary text-black hover:bg-primary/90 transition-all rounded-xl font-bold text-sm uppercase tracking-widest text-center shadow-lg shadow-primary/20">
                            Full Financial Hub
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DashboardOverview;
