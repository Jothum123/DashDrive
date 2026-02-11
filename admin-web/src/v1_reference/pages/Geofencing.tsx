import {
    Activity,
    Check,
    Layers,
    MousePointer2,
    Plus,
    Shield,
    X,
    Zap
} from 'lucide-react';
import { useEffect, useState } from 'react';
import GeofenceMap from '../components/maps/GeofenceMap';
import { useAdminStore } from '../../stores/adminStore';

export function Geofencing() {
    const {
        initializeSocket,
        addGeofence,
        showH3Grid,
        toggleH3Grid,
        h3Density,
        setH3Density
    } = useAdminStore();

    const [selectedGeofenceId] = useState<string | null>(null);
    const [isDrawingMode, setIsDrawingMode] = useState(false);
    const [pendingCoords, setPendingCoords] = useState<[number, number][] | null>(null);
    const [newZone, setNewZone] = useState({
        name: '',
        type: 'standard' as 'restricted' | 'surge' | 'preferred' | 'standard',
        active: true,
        dispatchRule: 'FIFO' as 'FIFO' | 'Nearest' | 'Balanced'
    });

    useEffect(() => {
        initializeSocket();
    }, [initializeSocket]);

    const handleGeofenceDrawn = (coords: [number, number][]) => {
        setPendingCoords(coords);
        setIsDrawingMode(false);
    };

    const handleSaveZone = () => {
        if (!pendingCoords || !newZone.name) return;

        addGeofence({
            ...newZone,
            coordinates: pendingCoords
        });

        setPendingCoords(null);
        setNewZone({
            name: '',
            type: 'standard',
            active: true,
            dispatchRule: 'FIFO'
        });
    };

    return (
        <div className="flex h-screen bg-[#F8F9FA] overflow-hidden">
            <div className="flex-1 relative">
                <GeofenceMap
                    selectedGeofenceId={selectedGeofenceId}
                    isDrawingMode={isDrawingMode}
                    onGeofenceDrawn={handleGeofenceDrawn}
                />

                {/* Floating Action HUD - Top Right */}
                <div className="absolute top-8 right-8 flex flex-col gap-3 z-[1000]">
                    <button
                        onClick={() => setIsDrawingMode(!isDrawingMode)}
                        className={`group relative p-4 rounded-2xl shadow-2xl border transition-all ${isDrawingMode
                            ? 'bg-brand-500 text-white border-brand-400'
                            : 'bg-white text-gray-800 border-gray-100 hover:scale-110 active:scale-95'
                            }`}
                        title={isDrawingMode ? "Cancel Drawing" : "Sketch New Zone"}
                    >
                        {isDrawingMode ? <X size={24} /> : <Plus size={24} />}
                        {!isDrawingMode && (
                            <span className="absolute right-full mr-4 px-3 py-1 bg-zinc-900 text-white text-[10px] font-black uppercase tracking-widest rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                                Sketch Zone
                            </span>
                        )}
                    </button>

                    <button
                        onClick={toggleH3Grid}
                        className={`group relative p-4 rounded-2xl shadow-2xl border transition-all ${showH3Grid
                            ? 'bg-emerald-500 text-white border-emerald-400'
                            : 'bg-white text-gray-800 border-gray-100 hover:scale-110'
                            }`}
                        title="Toggle H3 Grid"
                    >
                        <Layers size={24} />
                        <span className="absolute right-full mr-4 px-3 py-1 bg-zinc-900 text-white text-[10px] font-black uppercase tracking-widest rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                            Industrial Mesh
                        </span>
                    </button>

                    {showH3Grid && (
                        <div className="p-4 bg-white/90 backdrop-blur-md rounded-2xl border border-gray-100 shadow-xl flex flex-col gap-2 animate-in slide-in-from-right-4 duration-300">
                            <p className="text-[8px] font-black text-gray-400 uppercase tracking-widest">Mesh Density</p>
                            <input
                                type="range"
                                min="0.05"
                                max="0.5"
                                step="0.05"
                                value={h3Density}
                                onChange={(e) => setH3Density(parseFloat(e.target.value))}
                                className="w-24 accent-emerald-500"
                            />
                        </div>
                    )}
                </div>

                {/* Drawing Mode Indicator */}
                {isDrawingMode && (
                    <div className="absolute top-8 left-1/2 -translate-x-1/2 px-6 py-3 bg-brand-500 text-white rounded-full shadow-2xl flex items-center gap-3 animate-bounce z-[1000]">
                        <MousePointer2 size={16} />
                        <span className="text-xs font-black uppercase tracking-widest">Sketching active boundary...</span>
                    </div>
                )}

                {/* New Zone Configuration Panel */}
                {pendingCoords && (
                    <div className="absolute inset-y-0 right-0 w-[400px] bg-white border-l border-gray-200 shadow-[-20px_0_50px_rgba(0,0,0,0.1)] z-[1000] p-10 flex flex-col animate-in slide-in-from-right-full duration-500">
                        <div className="flex items-center justify-between mb-8">
                            <h2 className="text-2xl font-uber-bold text-gray-800 tracking-tight">Zone Deployment</h2>
                            <button onClick={() => setPendingCoords(null)} className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
                                <X size={20} />
                            </button>
                        </div>

                        <div className="flex-1 space-y-8 overflow-y-auto no-scrollbar">
                            <section>
                                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em] mb-3 block">Identification</label>
                                <input
                                    type="text"
                                    placeholder="e.g., Heathrow North Terminal"
                                    className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-6 py-4 text-sm font-medium focus:outline-none focus:border-brand-500 focus:bg-white transition-all shadow-inner"
                                    value={newZone.name}
                                    onChange={e => setNewZone({ ...newZone, name: e.target.value })}
                                    autoFocus
                                />
                            </section>

                            <section>
                                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em] mb-3 block">Deployment Type</label>
                                <div className="grid grid-cols-2 gap-3">
                                    {[
                                        { id: 'standard', icon: Activity, color: 'emerald' },
                                        { id: 'restricted', icon: Shield, color: 'rose' },
                                        { id: 'surge', icon: Zap, color: 'amber' },
                                        { id: 'preferred', icon: Activity, color: 'brand' }
                                    ].map((t) => (
                                        <button
                                            key={t.id}
                                            onClick={() => setNewZone({ ...newZone, type: t.id as any })}
                                            className={`flex items-center gap-3 p-4 rounded-2xl border transition-all ${newZone.type === t.id
                                                ? `bg-${t.color}-50 border-${t.id === 'preferred' ? 'brand' : t.color}-500 shadow-lg shadow-${t.color}-500/10`
                                                : 'bg-white border-gray-100 hover:border-gray-200'
                                                }`}
                                        >
                                            <div className={`p-2 rounded-xl bg-white border border-gray-100 ${newZone.type === t.id ? `text-${t.id === 'preferred' ? 'brand' : t.color}-500` : 'text-gray-400'
                                                }`}>
                                                <t.icon size={16} />
                                            </div>
                                            <span className={`text-[10px] font-black uppercase tracking-widest ${newZone.type === t.id ? 'text-gray-800' : 'text-gray-400'
                                                }`}>{t.id}</span>
                                        </button>
                                    ))}
                                </div>
                            </section>

                            <section>
                                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em] mb-4 block">Fleet Logistics</label>
                                <div className="p-1 bg-gray-100 rounded-2xl flex">
                                    {['FIFO', 'Nearest', 'Balanced'].map((rule) => (
                                        <button
                                            key={rule}
                                            onClick={() => setNewZone({ ...newZone, dispatchRule: rule as any })}
                                            className={`flex-1 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${newZone.dispatchRule === rule ? 'bg-white text-gray-800 shadow-sm' : 'text-gray-400 hover:text-gray-600'
                                                }`}
                                        >
                                            {rule}
                                        </button>
                                    ))}
                                </div>
                            </section>
                        </div>

                        <div className="pt-8 border-t border-gray-100 mt-8">
                            <button
                                onClick={handleSaveZone}
                                disabled={!newZone.name}
                                className={`w-full py-5 rounded-[24px] flex items-center justify-center gap-3 text-sm font-black uppercase tracking-[0.25em] transition-all shadow-2xl ${newZone.name
                                    ? 'bg-zinc-900 text-white hover:bg-zinc-800 active:scale-95'
                                    : 'bg-gray-100 text-gray-300 cursor-not-allowed'
                                    }`}
                            >
                                <Check size={18} />
                                Finalize Polygon
                            </button>
                            <p className="text-center text-[8px] text-gray-400 font-bold uppercase tracking-widest mt-6 leading-relaxed">
                                Deploying this zone will synchronize boundaries across all PILOT units in real-time.
                            </p>
                        </div>
                    </div>
                )}

                {/* Visual Status Indicator - Bottom Center */}
                <div className="absolute bottom-8 left-1/2 -translate-x-1/2 px-8 py-4 bg-zinc-900/90 backdrop-blur-xl rounded-full border border-white/10 shadow-2xl flex items-center gap-10 z-[1000]">
                    <div className="flex items-center gap-3">
                        <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.5)] animate-pulse" />
                        <span className="text-[10px] font-black text-white/90 uppercase tracking-[0.2em]">Network Link Active</span>
                    </div>
                    <div className="w-[1px] h-4 bg-white/10" />
                    <div className="flex items-center gap-3">
                        <GlobeAltIcon />
                        <span className="text-[10px] font-black text-white/90 uppercase tracking-[0.2em]">Global Mesh Engine</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

// Inline Icon Helper
function GlobeAltIcon() {
    return (
        <svg className="w-4 h-4 text-brand-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 002 2 2 2 0 012 2v.627m3.232-3.191A9 9 0 115.158 3.158a9 9 0 0115.074 12.074z" />
        </svg>
    );
}

export default Geofencing;
