import {
    Activity,
    CheckCircle2,
    Info,
    Layers,
    Maximize,
    Minus,
    MousePointer2,
    Navigation,
    Plus,
    Save,
    Trash2
} from 'lucide-react';
import React from 'react';
import { Header } from '../../../components/shared/Header';

export const Geofencing: React.FC = () => {
    return (
        <div className="flex-1 flex flex-col overflow-hidden">
            <Header title="Geofencing & Regions" />
            <div className="flex h-full dark:bg-zinc-950 overflow-hidden">
                {/* Left: Zone Management */}
                <div className="w-96 border-r border-zinc-800 flex flex-col shrink-0 dark:bg-zinc-900/30">
                    <div className="p-6 border-b border-zinc-800 dark:bg-zinc-900/50 backdrop-blur">
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-lg font-bold text-white">Geofencing</h2>
                            <button className="p-2 bg-primary text-black rounded-lg hover:shadow-lg hover:shadow-primary/20 transition-all">
                                <Plus size={18} />
                            </button>
                        </div>
                        <div className="bg-zinc-950/50 p-3 rounded-xl border border-zinc-800 flex items-center gap-3">
                            <div className="p-2 bg-primary/10 rounded-lg text-primary">
                                <Info size={16} />
                            </div>
                            <p className="text-[10px] text-slate-400 font-medium italic">
                                Drawing a polygon will automatically set the fare floor for that zone.
                            </p>
                        </div>
                    </div>

                    <div className="flex-1 overflow-y-auto custom-scrollbar p-6 space-y-6">
                        <section>
                            <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-4">Active Zones</h3>
                            <div className="space-y-3">
                                {[
                                    { name: "Downtown Core", area: "12.4 km²", color: "bg-primary" },
                                    { name: "Airport Link", area: "8.2 km²", color: "bg-amber-500" },
                                    { name: "Condesa Nightlife", area: "4.1 km²", color: "bg-purple-500" }
                                ].map((zone, i) => (
                                    <div key={i} className="bg-zinc-900 p-4 rounded-xl border border-zinc-800 hover:border-primary/40 transition-all group cursor-pointer">
                                        <div className="flex justify-between items-start mb-2">
                                            <div className="flex items-center gap-3">
                                                <div className={`w-3 h-3 rounded-full ${zone.color} shadow-[0_0_10px_rgba(0,255,144,0.4)]`}></div>
                                                <h4 className="text-sm font-bold text-slate-200">{zone.name}</h4>
                                            </div>
                                            <button className="text-slate-500 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100">
                                                <Trash2 size={14} />
                                            </button>
                                        </div>
                                        <div className="flex items-center justify-between mt-4">
                                            <span className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Coverage: {zone.area}</span>
                                            <span className="text-[10px] text-primary font-black uppercase underline cursor-pointer">Edit Logic</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>

                        <section className="bg-primary/5 border border-primary/20 rounded-2xl p-5">
                            <div className="flex items-center gap-3 mb-3">
                                <Activity size={18} className="text-primary" />
                                <h4 className="text-[10px] font-black text-primary uppercase tracking-widest">Dynamic Adjuster</h4>
                            </div>
                            <p className="text-xs text-slate-400 font-medium mb-4 italic">
                                "Auto-surge polygon resizing based on heat data is currently <span className="text-primary font-bold">Enabled</span>."
                            </p>
                            <div className="flex bg-zinc-950/50 p-1 rounded-lg border border-zinc-800">
                                <button className="flex-1 py-1.5 text-[10px] font-bold bg-primary text-black rounded-md uppercase">Manual</button>
                                <button className="flex-1 py-1.5 text-[10px] font-bold text-slate-500 hover:text-slate-300 transition-colors uppercase">Auto</button>
                            </div>
                        </section>
                    </div>

                    <div className="p-6 mt-auto border-t border-zinc-800 bg-zinc-950/20">
                        <button className="w-full py-3 bg-primary text-black font-black text-xs rounded-xl hover:shadow-lg hover:shadow-primary/20 transition-all flex items-center justify-center gap-2 uppercase tracking-widest">
                            <Save size={16} /> Save Grid Config
                        </button>
                    </div>
                </div>

                {/* Main: Interactive Map */}
                <div className="flex-1 relative bg-zinc-950 overflow-hidden">
                    <div className="absolute inset-0 z-0 opacity-40 grayscale contrast-125">
                        <img
                            src="https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=2000"
                            alt="Geofence Map"
                            className="w-full h-full object-cover"
                        />
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-tr from-zinc-950/90 via-transparent to-zinc-950/60 pointer-events-none"></div>

                    {/* Map Tools Toolbar */}
                    <div className="absolute top-8 left-1/2 -translate-x-1/2 z-20 flex bg-zinc-900/80 backdrop-blur-md rounded-2xl border border-zinc-800 p-1.5 shadow-2xl">
                        <button className="p-3 rounded-xl bg-primary text-black border border-primary/20 flex items-center gap-2">
                            <MousePointer2 size={18} />
                            <span className="text-[10px] font-black uppercase tracking-widest">Select</span>
                        </button>
                        <button className="p-3 rounded-xl text-slate-500 hover:text-white transition-all flex items-center gap-2">
                            <Plus size={18} />
                            <span className="text-[10px] font-black uppercase tracking-widest">Polygon</span>
                        </button>
                        <button className="p-3 rounded-xl text-slate-500 hover:text-white transition-all flex items-center gap-2">
                            <Layers size={18} />
                            <span className="text-[10px] font-black uppercase tracking-widest">Heatmap</span>
                        </button>
                        <div className="w-px h-8 bg-zinc-800 mx-2 self-center"></div>
                        <button className="p-3 rounded-xl text-slate-500 hover:text-white transition-all">
                            <Maximize size={18} />
                        </button>
                    </div>

                    {/* Map Controls */}
                    <div className="absolute right-8 bottom-8 z-20 flex flex-col gap-2">
                        <button className="bg-zinc-900 p-3 rounded-xl shadow-xl border border-zinc-800 text-slate-400 hover:text-primary transition-all">
                            <Navigation size={20} />
                        </button>
                        <div className="flex flex-col bg-zinc-900 rounded-xl shadow-xl border border-zinc-800 overflow-hidden mt-4">
                            <button className="p-3 text-slate-400 hover:text-primary transition-all border-b border-zinc-800">
                                <Plus size={20} />
                            </button>
                            <button className="p-3 text-slate-400 hover:text-primary transition-all">
                                <Minus size={20} />
                            </button>
                        </div>
                    </div>

                    {/* Legend / Status Overlay */}
                    <div className="absolute bottom-8 left-8 z-20 bg-zinc-900/90 backdrop-blur rounded-2xl p-4 border border-zinc-800 shadow-2xl flex items-center gap-6">
                        <div className="flex items-center gap-3">
                            <div className="flex -space-x-2">
                                {[1, 2, 3].map((i) => (
                                    <div key={i} className="w-8 h-8 rounded-full border-2 border-zinc-900 bg-slate-800 flex items-center justify-center font-bold text-[10px] text-slate-400">
                                        {i}
                                    </div>
                                ))}
                            </div>
                            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Live Operators Editing</span>
                        </div>
                        <div className="h-4 w-px bg-zinc-800"></div>
                        <div className="flex items-center gap-2">
                            <CheckCircle2 size={16} className="text-primary" />
                            <span className="text-[10px] font-black text-slate-200 uppercase tracking-widest">Production Sync Ready</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Geofencing;
