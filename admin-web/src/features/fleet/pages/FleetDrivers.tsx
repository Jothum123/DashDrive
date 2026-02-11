import {
    Car,
    Filter,
    MapPin,
    Search,
    Star
} from 'lucide-react';
import React from 'react';
import { Header } from '../../../components/shared/Header';

export const FleetDrivers: React.FC = () => {
    return (
        <div className="flex-1 flex flex-col overflow-y-auto bg-background-light dark:bg-zinc-950 min-h-full">
            <Header title="Fleet Management" />
            <div className="p-8 space-y-8">
                <div className="flex items-center justify-between">
                    <div>
                        <h2 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">Fleet Drivers</h2>
                        <p className="text-slate-500 text-sm font-medium">Real-time status & performance monitoring of the active fleet</p>
                    </div>
                    <div className="flex gap-3">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 w-4 h-4" />
                            <input
                                type="text"
                                placeholder="Search drivers..."
                                className="bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 text-slate-900 dark:text-white rounded-xl pl-10 pr-4 py-2.5 text-xs focus:ring-1 focus:ring-primary focus:outline-none w-64 shadow-sm"
                            />
                        </div>
                        <button className="p-2.5 bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-xl text-slate-400 hover:text-primary transition-all shadow-sm">
                            <Filter size={18} />
                        </button>
                    </div>
                </div>

                {/* Drivers Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {[
                        { name: "Marco Rossi", status: "Online", rating: 4.92, vehicle: "Tesla Model 3", color: "bg-primary", trips: 24, lastSync: "Just now" },
                        { name: "Elena Valente", status: "Busy", rating: 4.88, vehicle: "BMW i4", color: "bg-amber-500", trips: 18, lastSync: "2m ago" },
                        { name: "Liam Chen", status: "Offline", rating: 4.95, vehicle: "Audi e-tron", color: "bg-slate-500", trips: 42, lastSync: "1h ago" },
                        { name: "Sofia Berg", status: "Online", rating: 4.75, vehicle: "Volvo C40", color: "bg-primary", trips: 12, lastSync: "Just now" },
                    ].map((driver, i) => (
                        <div key={i} className="bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-2xl p-6 hover:border-primary/40 transition-all group cursor-pointer shadow-sm relative overflow-hidden">
                            <div className={`absolute top-0 right-0 w-32 h-32 ${driver.color}/5 blur-3xl -mr-16 -mt-16 group-hover:opacity-100 opacity-0 transition-opacity`}></div>

                            <div className="flex items-center justify-between mb-6">
                                <div className="relative">
                                    <div className="w-14 h-14 rounded-2xl bg-slate-100 dark:bg-zinc-800 border border-black/5 flex items-center justify-center font-black text-primary text-xl shadow-inner">
                                        {driver.name.charAt(0)}
                                    </div>
                                    <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-4 border-white dark:border-zinc-900 ${driver.color}`}></div>
                                </div>
                                <div className="text-right">
                                    <div className="flex items-center gap-1 text-amber-500 bg-amber-500/10 px-2 py-0.5 rounded-full border border-amber-500/20 mb-1">
                                        <Star size={10} fill="currentColor" />
                                        <span className="text-[10px] font-black">{driver.rating}</span>
                                    </div>
                                    <p className="text-[10px] text-slate-500 font-bold uppercase">{driver.status}</p>
                                </div>
                            </div>

                            <div className="mb-6">
                                <h4 className="text-base font-bold text-slate-900 dark:text-white mb-1 group-hover:text-primary transition-colors">{driver.name}</h4>
                                <div className="flex items-center gap-1.5 text-[10px] text-slate-500 font-bold uppercase tracking-tight">
                                    <Car size={12} className="text-primary" /> {driver.vehicle}
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4 pb-6 border-b border-slate-100 dark:border-zinc-800 mb-4">
                                <div>
                                    <p className="text-[9px] text-slate-500 uppercase font-black mb-1">Today's Trips</p>
                                    <p className="text-sm font-bold text-slate-900 dark:text-white">{driver.trips}</p>
                                </div>
                                <div>
                                    <p className="text-[9px] text-slate-500 uppercase font-black mb-1">Last Sync</p>
                                    <p className="text-sm font-bold text-slate-400">{driver.lastSync}</p>
                                </div>
                            </div>

                            <button className="w-full py-2.5 bg-slate-50 dark:bg-background-dark/50 hover:bg-primary hover:text-black border border-slate-200 dark:border-zinc-800 rounded-xl text-[10px] font-black uppercase text-slate-400 transition-all flex items-center justify-center gap-2 tracking-widest">
                                <MapPin size={12} /> Live Tracking
                            </button>
                        </div>
                    ))}

                    {/* Add Driver Card */}
                    <div className="bg-slate-50 dark:bg-zinc-900/30 border-2 border-dashed border-slate-200 dark:border-zinc-800 rounded-2xl flex flex-col items-center justify-center p-6 hover:border-primary/40 transition-all group cursor-pointer">
                        <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary group-hover:scale-110 transition-transform mb-4">
                            <Plus size={24} />
                        </div>
                        <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Register New Driver</p>
                    </div>
                </div>
            </div>
        </div>
        </div >
    );
};

const Plus: React.FC<{ size: number }> = ({ size }) => {
    return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
            <line x1="12" y1="5" x2="12" y2="19"></line>
            <line x1="5" y1="12" x2="19" y2="12"></line>
        </svg>
    )
}

export default FleetDrivers;
