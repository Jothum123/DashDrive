import { Map } from '@vis.gl/react-google-maps';
import {
    Info,
    Layers,
    MousePointer2,
    Navigation,
    Plus,
    Save,
    Search,
    Trash2
} from 'lucide-react';
import React, { useState } from 'react';

const defaultCenter = { lat: 40.7128, lng: -74.0060 }; // NYC

const geofenceZones = [
    { id: '1', name: 'Downtown Core', area: '1.2 SQ MILES', multiplier: '1.5x', color: '#f97316' },
    { id: '2', name: 'Airport (JFK)', area: '0.8 SQ MILES', multiplier: '2.0x', color: '#3b82f6' },
];

export const FareConfiguration: React.FC = () => {
    const [sensitivity, setSensitivity] = useState(60);
    const [activeTab, setActiveTab] = useState('Live');

    return (
        <div className="flex h-[calc(100vh-100px)] -m-10 bg-[#070b14] text-white overflow-hidden font-uber">
            {/* Left Sidebar: Pricing Controls */}
            <div className="w-[450px] border-r border-white/5 flex flex-col z-20 shadow-2xl bg-[#0a0f18]">
                {/* Header Section */}
                <div className="p-8 border-b border-white/5">
                    <div className="flex items-center justify-between mb-8 text-xs font-black uppercase tracking-[0.2em] text-gray-500">
                        <span>Global Pricing Logic</span>
                        <Info size={14} className="cursor-pointer hover:text-white transition-colors" />
                    </div>

                    <div className="space-y-8">
                        <div>
                            <label className="text-2xl font-bold block mb-6">Min_Fare =</label>
                            <div className="space-y-4">
                                <div>
                                    <p className="text-[10px] text-gray-500 uppercase font-black tracking-widest mb-2">Distance Multiplier (Rate/Mile)</p>
                                    <div className="relative">
                                        <span className="absolute left-6 top-1/2 -translate-y-1/2 text-lg text-gray-500 font-bold">$</span>
                                        <input
                                            type="text"
                                            value="2.45"
                                            className="w-full bg-blue-600/5 border border-blue-500/20 rounded-2xl py-5 pl-12 pr-6 text-xl font-bold outline-none focus:border-blue-500/40 transition-all font-mono"
                                        />
                                    </div>
                                </div>
                                <div className="flex justify-center py-2">
                                    <Plus size={20} className="text-gray-700" />
                                </div>
                                <div>
                                    <p className="text-[10px] text-gray-500 uppercase font-black tracking-widest mb-2">Fixed Base Fee</p>
                                    <div className="relative">
                                        <span className="absolute left-6 top-1/2 -translate-y-1/2 text-lg text-gray-500 font-bold">$</span>
                                        <input
                                            type="text"
                                            value="5.00"
                                            className="w-full bg-blue-600/5 border border-blue-500/20 rounded-2xl py-5 pl-12 pr-6 text-xl font-bold outline-none focus:border-blue-500/40 transition-all font-mono"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="pt-6 border-t border-white/5 flex justify-between items-center text-sm">
                            <span className="text-gray-500 font-medium">Preview: 5.0 miles</span>
                            <span className="text-blue-500 font-black text-lg">$17.25</span>
                        </div>
                    </div>
                </div>

                {/* Sensitivity Section */}
                <div className="p-8 border-b border-white/5 space-y-8">
                    <div className="flex items-center justify-between">
                        <h4 className="text-[11px] font-black uppercase tracking-widest text-gray-500">Negotiation Sensitivity</h4>
                        <span className="px-2 py-0.5 bg-blue-600/20 text-blue-500 rounded text-[8px] font-black tracking-widest">AI ACTIVE</span>
                    </div>

                    <div className="space-y-6">
                        <input
                            type="range"
                            min="0"
                            max="100"
                            value={sensitivity}
                            onChange={(e) => setSensitivity(parseInt(e.target.value))}
                            className="w-full h-1 bg-zinc-800 rounded-full appearance-none cursor-pointer accent-blue-600"
                        />
                        <div className="flex justify-between text-[9px] font-black uppercase tracking-widest text-gray-600">
                            <span>Conservative</span>
                            <span>Balanced</span>
                            <span>Aggressive</span>
                        </div>
                    </div>

                    <p className="text-[11px] text-gray-500 italic leading-relaxed font-medium">
                        Controls how aggressively the system nudges prices upward during high volatility. Current setting results in a <span className="text-blue-500 font-bold italic">12% max nudge</span> per session.
                    </p>
                </div>

                {/* Geofence Zones */}
                <div className="p-8 flex-1 overflow-y-auto custom-scrollbar">
                    <div className="flex items-center justify-between mb-8">
                        <h4 className="text-[11px] font-black uppercase tracking-widest text-gray-500">Geofence Zones</h4>
                        <button className="text-[11px] font-black text-blue-600 uppercase tracking-widest hover:underline">Clear All</button>
                    </div>

                    <div className="space-y-4">
                        {geofenceZones.map(zone => (
                            <div key={zone.id} className="p-5 bg-white/5 border border-white/5 rounded-2xl flex items-center justify-between group hover:border-blue-500/20 transition-all cursor-pointer">
                                <div className="flex items-center gap-4">
                                    <div className="w-1.5 h-10 rounded-full" style={{ backgroundColor: zone.color }} />
                                    <div>
                                        <p className="font-bold text-sm tracking-tight">{zone.name}</p>
                                        <p className="text-[10px] text-gray-500 font-black uppercase tracking-widest mt-0.5">{zone.area}</p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className="text-sm font-black text-white">{zone.multiplier}</p>
                                    <p className="text-[9px] text-gray-600 font-black uppercase tracking-widest">Multiplier</p>
                                </div>
                            </div>
                        ))}

                        <button className="w-full py-5 border-2 border-dashed border-white/5 hover:border-blue-500/20 rounded-2xl flex items-center justify-center gap-3 transition-all group mt-6">
                            <Plus size={18} className="text-gray-600 group-hover:text-blue-500 transition-colors" />
                            <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest group-hover:text-blue-500 transition-colors">Add New Zone</span>
                        </button>
                    </div>
                </div>
            </div>

            {/* Main Area: Map and Visuals */}
            <div className="flex-1 flex flex-col relative overflow-hidden bg-black">
                {/* Header Info Overlay */}
                <div className="absolute top-8 left-8 right-8 z-30 flex justify-between items-start pointer-events-none">
                    <div className="bg-zinc-950/80 backdrop-blur-xl p-6 rounded-[30px] border border-white/5 flex items-center gap-6 shadow-2xl pointer-events-auto">
                        <div className="relative group">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-blue-500 transition-colors" size={16} />
                            <input
                                type="text"
                                placeholder="Search location or zone..."
                                className="bg-white/5 border-none rounded-2xl pl-12 pr-6 py-3 text-sm outline-none w-[350px] font-medium"
                            />
                        </div>
                    </div>

                    <div className="flex gap-4 pointer-events-auto">
                        <div className="bg-zinc-900/50 backdrop-blur-md p-1.5 rounded-2xl border border-white/10 flex gap-1">
                            {['Draft', 'Live'].map(tab => (
                                <button
                                    key={tab}
                                    onClick={() => setActiveTab(tab)}
                                    className={`px-8 py-2.5 rounded-xl text-xs font-bold tracking-wider transition-all ${activeTab === tab ? 'bg-zinc-800 text-white' : 'text-gray-500 hover:text-white'}`}
                                >
                                    {tab}
                                </button>
                            ))}
                        </div>
                        <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3.5 rounded-2xl flex items-center gap-3 font-bold text-xs shadow-2xl shadow-blue-600/30 transition-all active:scale-95">
                            <Save size={18} /> Apply Changes
                        </button>
                    </div>
                </div>

                {/* Map Component */}
                <div className="flex-1 relative grayscale brightness-[0.6] contrast-[1.2] invert opacity-40">
                    <Map
                        defaultCenter={defaultCenter}
                        defaultZoom={12}
                        disableDefaultUI={true}
                        mapId="4504f994bd057f0"
                        className="w-full h-full"
                    >
                    </Map>
                </div>

                {/* SVG Overlay for Geofences (Manual representation as per screenshot) */}
                <div className="absolute inset-0 z-2 pointer-events-none">
                    <svg className="w-full h-full opacity-60">
                        {/* Example Polygon Overlay */}
                        <path
                            d="M600,300 L750,350 L700,550 L550,500 Z"
                            fill="rgba(249, 115, 22, 0.2)"
                            stroke="#f97316"
                            strokeWidth="3"
                        />
                        <circle cx="850" cy="250" r="80" fill="rgba(59, 130, 246, 0.1)" stroke="#3b82f6" strokeWidth="3" />
                    </svg>
                </div>

                {/* Map Tools Sidebar */}
                <div className="absolute top-32 right-8 z-30 flex flex-col gap-3">
                    <MapTool icon={<Layers size={18} />} />
                    <MapTool icon={<MousePointer2 size={18} />} />
                    <MapTool icon={<Navigation size={18} />} active={true} />
                    <MapTool icon={<Trash2 size={18} />} />

                    <div className="mt-8 flex flex-col gap-2">
                        <MapTool icon={<span className="text-xl font-medium">+</span>} />
                        <MapTool icon={<span className="text-xl font-medium">-</span>} />
                    </div>
                </div>

                {/* Bottom Stats Panel */}
                <div className="absolute bottom-8 left-8 right-8 z-30 bg-[#0a0f18]/90 backdrop-blur-2xl p-8 rounded-[35px] border border-white/5 flex items-center justify-between shadow-2xl">
                    <div className="flex gap-16">
                        <div className="space-y-2">
                            <p className="text-[10px] text-gray-500 uppercase font-bold tracking-[0.2em]">Active Geofences</p>
                            <p className="text-2xl font-bold">12 <span className="text-gray-500 text-sm font-medium">Total</span></p>
                        </div>
                        <div className="space-y-2">
                            <p className="text-[10px] text-gray-500 uppercase font-bold tracking-[0.2em]">Avg Surge Multiplier</p>
                            <p className="text-2xl font-bold text-[#f59e0b]">1.34x</p>
                        </div>
                        <div className="space-y-2">
                            <p className="text-[10px] text-gray-500 uppercase font-bold tracking-[0.2em]">Coverage</p>
                            <p className="text-2xl font-bold">84% <span className="text-gray-500 text-sm font-medium uppercase tracking-widest ml-1">Citywide</span></p>
                        </div>
                    </div>

                    <div className="flex items-center gap-3 px-6 py-3 bg-white/5 rounded-2xl border border-white/5">
                        <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                        <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Last sync: 2 minutes ago</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

const MapTool = ({ icon, active }: { icon: any, active?: boolean }) => (
    <button className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all shadow-2xl ${active ? 'bg-blue-600 text-white' : 'bg-[#0a0f18]/90 text-gray-500 hover:text-white border border-white/5 backdrop-blur-md'}`}>
        {icon}
    </button>
);

export default FareConfiguration;
