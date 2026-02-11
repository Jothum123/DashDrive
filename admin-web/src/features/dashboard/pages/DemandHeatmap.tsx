import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Header } from '../../../components/shared/Header';

export const DemandHeatmap: React.FC = () => {
    const [zoomLevel, setZoomLevel] = useState(1);
    const [isFullscreen, setIsFullscreen] = useState(false);

    const toggleFullscreen = () => setIsFullscreen(!isFullscreen);
    const zoomIn = () => setZoomLevel(prev => Math.min(prev + 0.2, 2));
    const zoomOut = () => setZoomLevel(prev => Math.max(prev - 0.2, 0.8));

    return (
        <div className={`flex-1 flex flex-col min-w-0 overflow-y-auto bg-background-light dark:bg-zinc-950 scrollbar-hide ${isFullscreen ? 'z-50' : ''}`}>
            <Header title="Demand Heatmap" />
            <div className="p-8 space-y-8 flex-1">
                {/* KPI Section - Hide in fullscreen for better focus */}
                {!isFullscreen && (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        <div className="bg-white dark:bg-zinc-900 p-5 rounded-2xl border border-slate-200 dark:border-zinc-800 shadow-sm high-affordance-border">
                            <div className="flex justify-between items-start mb-4">
                                <div className="p-2 bg-primary/10 rounded-lg">
                                    <span className="material-icons text-primary">local_taxi</span>
                                </div>
                                <span className="text-xs font-bold text-green-500 bg-green-500/10 px-2 py-1 rounded">+12%</span>
                            </div>
                            <h3 className="text-slate-500 dark:text-slate-400 text-xs font-bold uppercase tracking-wider">Active Rides</h3>
                            <p className="text-3xl font-bold mt-1">142</p>
                        </div>

                        <div className="bg-white dark:bg-zinc-900 p-5 rounded-2xl border border-slate-200 dark:border-zinc-800 shadow-sm">
                            <div className="flex justify-between items-start mb-4">
                                <div className="p-2 bg-amber-500/10 rounded-lg">
                                    <span className="material-icons text-amber-500">gavel</span>
                                </div>
                                <span className="text-xs font-bold text-amber-500 bg-amber-500/10 px-2 py-1 rounded">Live</span>
                            </div>
                            <h3 className="text-slate-500 dark:text-slate-400 text-xs font-bold uppercase tracking-wider">Active Bids</h3>
                            <p className="text-3xl font-bold mt-1">28</p>
                        </div>

                        <div className="bg-white dark:bg-zinc-900 p-5 rounded-2xl border border-slate-200 dark:border-zinc-800 shadow-sm">
                            <div className="flex justify-between items-start mb-4">
                                <div className="p-2 bg-primary/10 rounded-lg">
                                    <span className="material-icons text-primary">payments</span>
                                </div>
                                <span className="text-xs font-bold text-slate-500 bg-slate-500/10 px-2 py-1 rounded">Combined</span>
                            </div>
                            <h3 className="text-slate-500 dark:text-slate-400 text-xs font-bold uppercase tracking-wider">Total Revenue</h3>
                            <p className="text-3xl font-bold mt-1">$4,852</p>
                        </div>

                        <div className="bg-white dark:bg-zinc-900 p-5 rounded-2xl border border-slate-200 dark:border-zinc-800 shadow-sm">
                            <div className="flex justify-between items-start mb-4">
                                <div className="p-2 bg-red-500/10 rounded-lg">
                                    <span className="material-symbols-outlined text-red-500">verified_user</span>
                                </div>
                                <span className="text-xs font-bold text-red-500 bg-red-500/10 px-2 py-1 rounded">Urgent</span>
                            </div>
                            <h3 className="text-slate-500 dark:text-slate-400 text-xs font-bold uppercase tracking-wider">Driver Approvals</h3>
                            <p className="text-3xl font-bold mt-1">12</p>
                        </div>
                    </div>
                )}

                {/* Heatmap Section */}
                <div className={`space-y-4 ${isFullscreen ? 'fixed inset-0 z-[100] bg-zinc-950 p-8 flex flex-col' : ''}`}>
                    <div className="flex items-center justify-between">
                        <h2 className="text-lg font-bold flex items-center gap-2 uppercase tracking-tight">
                            <span className="material-icons text-primary text-[20px]">map</span>
                            Demand Heatmap: Harare Metro
                        </h2>
                        <div className="flex items-center gap-3">
                            <div className="flex items-center gap-2 bg-amber-500/10 text-amber-500 border border-amber-500/20 px-3 py-1.5 rounded-lg text-xs font-bold">
                                <span className="material-icons text-sm">wifi_off</span>
                                Low Bandwidth Mode
                            </div>
                            <div className="flex items-center gap-1 bg-white dark:bg-zinc-900 p-1 rounded-lg border border-slate-200 dark:border-zinc-800">
                                <Link to="/" className="px-3 py-1.5 text-xs font-bold rounded-md text-slate-500 hover:bg-slate-100 dark:hover:bg-zinc-800 transition-colors cursor-pointer text-center">Live Map</Link>
                                <button className="px-3 py-1.5 text-xs font-bold rounded-md bg-primary text-black">Heatmap</button>
                            </div>
                            <button
                                onClick={toggleFullscreen}
                                className="flex items-center justify-center p-2 bg-white dark:bg-zinc-900 rounded-lg border border-slate-200 dark:border-zinc-800 text-slate-500 hover:text-primary transition-colors"
                            >
                                <span className="material-symbols-outlined text-[20px]">{isFullscreen ? 'close_fullscreen' : 'open_in_full'}</span>
                            </button>
                        </div>
                    </div>

                    <div className={`relative w-full bg-slate-200 dark:bg-zinc-950 rounded-2xl overflow-hidden border border-slate-300 dark:border-zinc-800 shadow-inner group transition-all duration-300 ${isFullscreen ? 'flex-1 h-full' : 'h-[500px]'}`}>
                        {/* Map Container with Zoom */}
                        <div
                            className="absolute inset-0 transition-transform duration-500 ease-out origin-center"
                            style={{ transform: `scale(${zoomLevel})` }}
                        >
                            <div className="absolute inset-0 map-bg opacity-50"></div>
                            <img
                                alt="Harare Map"
                                className="absolute inset-0 w-full h-full object-cover mix-blend-overlay grayscale opacity-40"
                                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBUX9PFRZVuQIKXkclnpeisf47gjopDQSI7ikoRUOqC0b752rylx9Bsr1v__NhcPgOB-6cnOfQotGw-cETKL7pW23P1WcLcNzByKOFl57e11uKJil0VolbKxTs2TIxO2N7nhs1GPOFIusu1TRRfEQJgDYIvqpN5wA16Vz803iW0y4vcSGj7Espi85kJ-SRX-Wwc3j5lMYVvJGEdknb7-U-ZxkyWxXqyp1VALFLDpSbrkJ3nfz3pPMhdu7yWC_IM3bewYadWmA8mCk6V"
                            />

                            {/* Heatmap Blobs */}
                            <div className="absolute top-[45%] left-[48%] w-64 h-64 heatmap-high"></div>
                            <div className="absolute top-[38%] left-[42%] w-48 h-48 heatmap-high"></div>
                            <div className="absolute top-[52%] left-[55%] w-40 h-40 heatmap-high opacity-80"></div>
                            <div className="absolute top-[25%] left-[55%] w-56 h-56 heatmap-med"></div>
                            <div className="absolute top-[60%] left-[30%] w-52 h-52 heatmap-med opacity-90"></div>
                            <div className="absolute top-[40%] left-[20%] w-44 h-44 heatmap-med"></div>
                            <div className="absolute bottom-[20%] right-[35%] w-48 h-48 heatmap-med"></div>
                            <div className="absolute top-[10%] left-[15%] w-72 h-72 heatmap-low opacity-60"></div>
                            <div className="absolute bottom-[15%] left-[65%] w-80 h-80 heatmap-low opacity-50"></div>
                        </div>

                        {/* Interactive Controls Overlay */}
                        <div className="absolute top-6 right-6 flex flex-col gap-2 z-20">
                            <div className="bg-zinc-950/90 backdrop-blur-md border border-zinc-700/50 rounded-lg flex flex-col shadow-2xl overflow-hidden">
                                <button
                                    onClick={zoomIn}
                                    className="p-2.5 text-slate-300 hover:bg-primary hover:text-black transition-all border-b border-zinc-700/50 flex items-center justify-center"
                                >
                                    <span className="material-icons text-xl">add</span>
                                </button>
                                <button
                                    onClick={zoomOut}
                                    className="p-2.5 text-slate-300 hover:bg-primary hover:text-black transition-all flex items-center justify-center"
                                >
                                    <span className="material-icons text-xl">remove</span>
                                </button>
                            </div>
                            <button
                                onClick={toggleFullscreen}
                                className="p-2.5 bg-zinc-950/90 backdrop-blur-md border border-zinc-700/50 text-slate-300 hover:bg-primary hover:text-black rounded-lg transition-all shadow-2xl flex items-center justify-center"
                            >
                                <span className="material-symbols-outlined text-xl">{isFullscreen ? 'fullscreen_exit' : 'fullscreen'}</span>
                            </button>
                        </div>

                        {/* Density Legend */}
                        <div className="absolute top-6 left-6 bg-zinc-950/90 backdrop-blur-md border border-zinc-700 p-4 rounded-xl space-y-3 z-10 shadow-2xl">
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
                                <span className="w-3 h-3 rounded-full bg-green-500 shadow-[0_0_12px_rgba(34,197,94,0.6)]"></span>
                                <span className="text-[11px] font-medium text-slate-200">Low (&lt;20 req/km²)</span>
                            </div>
                        </div>
                    </div>
                </div>

                {!isFullscreen && (
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 pb-12">
                        {/* Demand Trends Chart */}
                        <div className="lg:col-span-2 bg-white dark:bg-zinc-900 p-6 rounded-2xl border border-slate-200 dark:border-zinc-800 shadow-sm hover:border-primary/20 transition-all">
                            <div className="flex justify-between items-center mb-6">
                                <div>
                                    <h3 className="font-bold text-lg uppercase tracking-tight">Demand Trends</h3>
                                    <p className="text-xs text-slate-500">Hourly ride request volume analysis</p>
                                </div>
                                <div className="flex items-center bg-slate-100 dark:bg-zinc-800 p-1 rounded-lg">
                                    <button className="px-4 py-1.5 text-xs font-bold rounded-md bg-white dark:bg-zinc-700 shadow-sm text-primary">Today</button>
                                    <button className="px-4 py-1.5 text-xs font-bold rounded-md text-slate-500 hover:bg-slate-200 dark:hover:bg-zinc-700/50">Yesterday</button>
                                </div>
                            </div>
                            <div className="flex items-end justify-between h-64 gap-1.5 mt-4">
                                {[15, 10, 8, 12, 20, 45, 75, 90, 100, 85, 70, 60, 55, 65, 80, 95, 88, 72, 50, 35, 25, 20, 18, 15].map((val, i) => (
                                    <div key={i}
                                        className={`flex-1 transition-all rounded-t-sm group relative ${val >= 90 ? 'bg-primary' : 'bg-primary/20 hover:bg-primary/40'}`}
                                        style={{ height: `${val}%` }}>
                                        <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 whitespace-nowrap z-10">
                                            {i}:00 - {val} req
                                        </div>
                                        {val === 100 && (
                                            <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-primary text-black text-[10px] px-2 py-1 rounded font-bold whitespace-nowrap shadow-lg">PEAK: 08:00</div>
                                        )}
                                    </div>
                                ))}
                            </div>
                            <div className="flex justify-between mt-4 px-1 border-t border-slate-100 dark:border-zinc-800 pt-3">
                                <span className="text-[10px] font-bold text-slate-400">00h</span>
                                <span className="text-[10px] font-bold text-slate-400">06h</span>
                                <span className="text-[10px] font-bold text-slate-400">12h</span>
                                <span className="text-[10px] font-bold text-slate-400">18h</span>
                                <span className="text-[10px] font-bold text-slate-400">23h</span>
                            </div>
                        </div>

                        {/* Financial Summary */}
                        <div className="bg-white dark:bg-zinc-900 p-6 rounded-2xl border border-slate-200 dark:border-zinc-800 shadow-sm flex flex-col">
                            <div className="mb-6">
                                <h3 className="font-bold text-lg uppercase tracking-tight">Financial Overview</h3>
                                <p className="text-xs text-slate-500">Multi-currency revenue & health</p>
                            </div>
                            <div className="space-y-6 flex-1">
                                <div className="space-y-3">
                                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Revenue breakdown</p>
                                    <div className="space-y-2">
                                        <div className="bg-slate-50 dark:bg-zinc-950/50 p-3 rounded-lg border border-slate-200 dark:border-zinc-800 flex items-center justify-between">
                                            <div className="flex items-center gap-3">
                                                <div className="w-8 h-8 rounded bg-green-500/10 flex items-center justify-center text-green-500 font-bold text-xs">US$</div>
                                                <div>
                                                    <p className="text-sm font-bold">3,240.00</p>
                                                    <p className="text-[10px] text-slate-500">US Dollar</p>
                                                </div>
                                            </div>
                                            <span className="text-xs font-bold text-green-500">+4.2%</span>
                                        </div>
                                        <div className="bg-slate-50 dark:bg-zinc-950/50 p-3 rounded-lg border border-slate-200 dark:border-zinc-800 flex items-center justify-between border-l-2 border-l-primary">
                                            <div className="flex items-center gap-3">
                                                <div className="w-8 h-8 rounded bg-primary/10 flex items-center justify-center text-primary font-bold text-[10px]">ZiG</div>
                                                <div>
                                                    <p className="text-sm font-bold">21,482.50</p>
                                                    <p className="text-[10px] text-slate-500">Zimbabwe Gold</p>
                                                </div>
                                            </div>
                                            <span className="text-xs font-bold text-primary">+1.8%</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-3">
                                    <div className="flex justify-between items-end">
                                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Transaction Health</p>
                                        <span className="text-xs font-bold text-green-500">98.4% Success</span>
                                    </div>
                                    <div className="h-2 w-full bg-slate-100 dark:bg-zinc-800 rounded-full overflow-hidden flex">
                                        <div className="h-full bg-primary" style={{ width: '98.4%' }}></div>
                                        <div className="h-full bg-red-500" style={{ width: '1.6%' }}></div>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4 pt-1">
                                        <div>
                                            <div className="flex items-center gap-1.5 mb-0.5">
                                                <div className="w-1.5 h-1.5 rounded-full bg-primary"></div>
                                                <span className="text-[10px] font-bold text-slate-500 uppercase">Successful</span>
                                            </div>
                                            <p className="text-sm font-bold">1,412</p>
                                        </div>
                                        <div>
                                            <div className="flex items-center gap-1.5 mb-0.5">
                                                <div className="w-1.5 h-1.5 rounded-full bg-red-500"></div>
                                                <span className="text-[10px] font-bold text-slate-500 uppercase">Failed</span>
                                            </div>
                                            <p className="text-sm font-bold">23</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <Link to="/finance" className="w-full mt-8 py-3 bg-primary text-black hover:bg-primary/90 transition-all rounded-xl font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-2 shadow-lg shadow-primary/20 text-center">
                                View Detailed Reports
                                <span className="material-icons text-sm">arrow_forward</span>
                            </Link>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default DemandHeatmap;
