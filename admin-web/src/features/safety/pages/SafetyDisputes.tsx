import {
    Filter,
    MapPin,
    Navigation,
    Phone,
    Search,
    ShieldAlert,
    User,
    Video
} from 'lucide-react';
import React, { useState } from 'react';
import { useAdminStore, type SafetyIncident } from '../../../stores/adminStore';

export const SafetyDisputes: React.FC = () => {
    const { incidents, resolveIncident } = useAdminStore();
    const [selectedIncident, setSelectedIncident] = useState<SafetyIncident | null>(incidents[0] || null);

    const criticalCount = incidents.filter(i => i.priority === 'critical' && i.status === 'open').length;

    return (
        <div className="flex h-full dark:bg-background-dark overflow-hidden">
            {/* Left: Alerts Inbox */}
            <div className="w-96 border-r border-border-dark flex flex-col shrink-0 dark:bg-panel-dark/30">
                <div className="p-6 border-b border-border-dark dark:bg-panel-dark/50 backdrop-blur">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-lg font-bold text-white">Trust & Safety</h2>
                        {criticalCount > 0 && (
                            <span className="px-2 py-0.5 bg-red-500 text-white text-[10px] font-black rounded uppercase animate-pulse">
                                {criticalCount} Critical
                            </span>
                        )}
                    </div>
                    <div className="flex gap-2">
                        <div className="relative flex-1">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 w-4 h-4" />
                            <input
                                type="text"
                                placeholder="Search incidents..."
                                className="w-full bg-background-dark/50 border border-border-dark text-white rounded-lg pl-10 py-2 text-xs focus:ring-1 focus:ring-primary focus:outline-none"
                            />
                        </div>
                        <button className="p-2 bg-background-dark/50 border border-border-dark rounded-lg text-slate-400 hover:text-white transition-all">
                            <Filter size={16} />
                        </button>
                    </div>
                </div>

                <div className="flex-1 overflow-y-auto custom-scrollbar p-4 space-y-3">
                    {incidents.map((incident) => (
                        <div
                            key={incident.id}
                            onClick={() => setSelectedIncident(incident)}
                            className={`p-4 rounded-xl border-2 transition-all cursor-pointer ${selectedIncident?.id === incident.id ? 'bg-red-500/10 border-red-500' : 'bg-panel-dark/50 border-border-dark hover:border-primary/40'
                                }`}
                        >
                            <div className="flex justify-between items-start mb-3">
                                <span className={`text-[10px] font-black px-2 py-0.5 rounded uppercase ${incident.priority === 'critical' ? 'bg-red-500 text-white' :
                                    incident.priority === 'high' ? 'bg-amber-500 text-white' : 'bg-primary text-black'
                                    }`}>
                                    {incident.type}
                                </span>
                                <span className="text-[10px] text-slate-500 font-bold">
                                    {new Date(incident.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                </span>
                            </div>
                            <h4 className="text-sm font-bold text-slate-200 mb-1">{incident.passengerName}</h4>
                            <div className="flex items-center gap-1.5 text-[10px] text-slate-500 font-bold uppercase tracking-tight">
                                <MapPin size={12} className="text-primary" /> {incident.driverName}'s Zone
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Main: Adjudication Center */}
            <div className="flex-1 flex flex-col overflow-hidden relative">
                {selectedIncident?.priority === 'critical' && selectedIncident.status === 'open' && (
                    <div className="absolute top-0 right-0 p-8 z-10 pointer-events-none">
                        <div className="bg-red-500/10 border-2 border-red-500/50 backdrop-blur-md rounded-2xl p-6 max-w-sm pointer-events-auto shadow-2xl animate-in fade-in slide-in-from-top-4">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="p-3 bg-red-500 rounded-full text-white animate-pulse">
                                    <ShieldAlert size={24} />
                                </div>
                                <div>
                                    <h3 className="text-lg font-black text-white italic tracking-tighter uppercase">SOS Signal</h3>
                                    <p className="text-[10px] text-red-500 font-black uppercase tracking-widest leading-none">Emergency Broadcast</p>
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-3">
                                <button className="bg-red-500 hover:bg-red-600 text-white font-black py-3 rounded-xl text-xs flex items-center justify-center gap-2 transition-all uppercase tracking-widest shadow-lg shadow-red-500/20">
                                    <Phone size={14} fill="currentColor" /> Call Emergency
                                </button>
                                <button className="bg-panel-dark border border-border-dark text-white font-black py-3 rounded-xl text-xs flex items-center justify-center gap-2 transition-all hover:bg-white/5 uppercase tracking-widest">
                                    <Video size={14} /> Live Buffer
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                <div className="flex-1 overflow-y-auto custom-scrollbar p-10 space-y-12">
                    {selectedIncident ? (
                        <>
                            <section>
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="h-8 w-1 bg-primary rounded-full"></div>
                                    <h3 className="text-xl font-black text-white tracking-tight uppercase">Incident #{selectedIncident.id}</h3>
                                </div>

                                <div className="grid grid-cols-3 gap-8">
                                    <div className="bg-panel-dark border border-border-dark rounded-2xl p-6 relative overflow-hidden group">
                                        <div className="absolute -right-4 -bottom-4 opacity-5 group-hover:opacity-10 transition-opacity">
                                            <User size={80} />
                                        </div>
                                        <p className="text-[10px] text-slate-500 uppercase font-black tracking-widest mb-4">Driver Profile</p>
                                        <div className="flex items-center gap-4">
                                            <div className="w-12 h-12 rounded-xl bg-slate-800 border-2 border-green-500/30 overflow-hidden flex items-center justify-center">
                                                <User size={24} className="text-slate-500" />
                                            </div>
                                            <div>
                                                <p className="font-bold text-slate-200">{selectedIncident.driverName}</p>
                                                <p className="text-[10px] text-slate-500 font-bold">Verified Member</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="bg-panel-dark border border-border-dark rounded-2xl p-6 relative overflow-hidden group">
                                        <p className="text-[10px] text-slate-500 uppercase font-black tracking-widest mb-4">Rider Details</p>
                                        <div className="flex items-center gap-4">
                                            <div className="w-12 h-12 rounded-xl bg-slate-800 border-2 border-red-500/30 flex items-center justify-center">
                                                <User size={24} className="text-slate-500" />
                                            </div>
                                            <div>
                                                <p className="font-bold text-slate-200">{selectedIncident.passengerName}</p>
                                                <p className="text-[10px] text-slate-500 font-bold">Priority: {selectedIncident.priority}</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="bg-panel-dark border border-border-dark rounded-2xl p-6">
                                        <p className="text-[10px] text-slate-500 uppercase font-black tracking-widest mb-4">Current Status</p>
                                        <div className="flex items-center justify-between">
                                            <span className={`text-xs font-black px-3 py-1 rounded-lg uppercase ${selectedIncident.status === 'open' ? 'bg-red-500/10 text-red-500 border border-red-500/20' : 'bg-green-500/10 text-green-500 border border-green-500/20'
                                                }`}>
                                                {selectedIncident.status}
                                            </span>
                                            {selectedIncident.status === 'open' && (
                                                <button
                                                    onClick={() => resolveIncident(selectedIncident.id)}
                                                    className="text-[10px] font-black text-primary hover:underline uppercase"
                                                >
                                                    Resolve Case
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </section>

                            <section className="bg-panel-dark/50 border border-border-dark rounded-2xl p-6">
                                <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-3">Incident Brief</h4>
                                <p className="text-sm text-slate-300 leading-relaxed font-medium italic">
                                    "{selectedIncident.description}"
                                </p>
                            </section>

                            <section className="bg-panel-dark/50 border border-border-dark rounded-2xl overflow-hidden">
                                <div className="grid grid-cols-2 h-96">
                                    <div className="border-r border-border-dark flex flex-col">
                                        <div className="p-4 border-b border-border-dark dark:bg-white/5">
                                            <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">Telemetry & Logs</span>
                                        </div>
                                        <div className="flex-1 p-6 space-y-4 overflow-y-auto">
                                            <div className="flex items-center justify-between p-3 bg-background-dark/50 rounded-lg border border-border-dark">
                                                <span className="text-[10px] font-bold text-slate-500">GPS ACCURACY</span>
                                                <span className="text-xs font-bold text-green-500">1.2m</span>
                                            </div>
                                            <div className="flex items-center justify-between p-3 bg-background-dark/50 rounded-lg border border-border-dark">
                                                <span className="text-[10px] font-bold text-slate-500">SPEED</span>
                                                <span className="text-xs font-bold text-white">0 km/h (Stopped)</span>
                                            </div>
                                            <div className="flex items-center justify-between p-3 bg-background-dark/50 rounded-lg border border-border-dark">
                                                <span className="text-[10px] font-bold text-slate-500">HEARTBEAT</span>
                                                <span className="text-xs font-bold text-primary">Active</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="bg-slate-900 relative">
                                        <div className="absolute inset-0 bg-slate-800 flex items-center justify-center">
                                            <Navigation size={48} className="text-primary animate-pulse" />
                                        </div>
                                        <div className="absolute bottom-4 left-4 right-4 bg-panel-dark/80 backdrop-blur rounded-lg p-3 border border-border-dark">
                                            <p className="text-[10px] font-bold text-slate-300">GEO-STAMP: {selectedIncident.driverName}'s Last Known Position</p>
                                        </div>
                                    </div>
                                </div>
                            </section>
                        </>
                    ) : (
                        <div className="flex-1 flex flex-col items-center justify-center">
                            <ShieldAlert size={64} className="text-slate-800 mb-4" />
                            <p className="text-slate-500 font-bold uppercase tracking-widest">Select an incident to view details</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default SafetyDisputes;
