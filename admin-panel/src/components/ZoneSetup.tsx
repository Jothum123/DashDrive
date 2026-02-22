import React, { useState } from 'react';
import { 
  Info, 
  Map as MapIcon, 
  Search, 
  Layers, 
  Maximize2, 
  Plus, 
  Minus, 
  RefreshCw, 
  Download, 
  MoreVertical, 
  Edit3, 
  Trash2, 
  CheckCircle2, 
  XCircle,
  X,
  Filter,
  Grid,
  ChevronRight,
  MousePointer2,
  MapPin,
  Car,
  DollarSign,
  AlertCircle
} from 'lucide-react';
import { cn } from '../utils';

// Helper to check if two line segments (p1,q1) and (p2,q2) intersect
const doIntersect = (p1: {x: number, y: number}, q1: {x: number, y: number}, p2: {x: number, y: number}, q2: {x: number, y: number}) => {
  const onSegment = (p: {x: number, y: number}, q: {x: number, y: number}, r: {x: number, y: number}) => {
    return q.x <= Math.max(p.x, r.x) && q.x >= Math.min(p.x, r.x) &&
           q.y <= Math.max(p.y, r.y) && q.y >= Math.min(p.y, r.y);
  };

  const orientation = (p: {x: number, y: number}, q: {x: number, y: number}, r: {x: number, y: number}) => {
    const val = (q.y - p.y) * (r.x - q.x) - (q.x - p.x) * (r.y - q.y);
    if (val === 0) return 0; // colinear
    return (val > 0) ? 1 : 2; // clock or counterclock
  };

  const o1 = orientation(p1, q1, p2);
  const o2 = orientation(p1, q1, q2);
  const o3 = orientation(p2, q2, p1);
  const o4 = orientation(p2, q2, q1);

  // General case
  if (o1 !== o2 && o3 !== o4) return true;

  // Special Cases
  if (o1 === 0 && onSegment(p1, p2, q1)) return true;
  if (o2 === 0 && onSegment(p1, q2, q1)) return true;
  if (o3 === 0 && onSegment(p2, p1, q2)) return true;
  if (o4 === 0 && onSegment(p2, q1, q2)) return true;

  return false;
};

const checkSelfIntersection = (points: {x: number, y: number}[]) => {
  if (points.length < 4) return false;
  
  const edges = [];
  for (let i = 0; i < points.length; i++) {
    edges.push({ p1: points[i], p2: points[(i + 1) % points.length] });
  }

  for (let i = 0; i < edges.length; i++) {
    for (let j = i + 2; j < edges.length; j++) {
      // Don't check adjacent edges (they share a vertex)
      if (i === 0 && j === edges.length - 1) continue;
      
      if (doIntersect(edges[i].p1, edges[i].p2, edges[j].p1, edges[j].p2)) {
        return true;
      }
    }
  }
  return false;
};

interface Zone {
  id: string;
  name: string;
  volume: 'Low' | 'Medium' | 'High';
  extraFareEnabled: boolean;
  extraFarePercent: number;
  status: 'Active' | 'Inactive';
}

const initialZones: Zone[] = [
  { id: '1', name: 'Dhanmondi', volume: 'High', extraFareEnabled: true, extraFarePercent: 15, status: 'Active' },
  { id: '2', name: 'Gulshan', volume: 'Medium', extraFareEnabled: false, extraFarePercent: 0, status: 'Active' },
  { id: '3', name: 'Uttara', volume: 'Low', extraFareEnabled: false, extraFarePercent: 0, status: 'Inactive' },
];

export const ZoneSetup: React.FC = () => {
  const [view, setView] = useState<'setup' | 'trash'>('setup');
  const [activeTab, setActiveTab] = useState<'All' | 'Active' | 'Inactive'>('All');
  const [zones, setZones] = useState<Zone[]>(initialZones);
  const [deletedZones, setDeletedZones] = useState<Zone[]>([
    { id: '4', name: 'Old Town', volume: 'Medium', extraFareEnabled: false, extraFarePercent: 0, status: 'Inactive' }
  ]);
  const [zoneName, setZoneName] = useState('');
  const [points, setPoints] = useState<{x: number, y: number}[]>([]);
  const [mousePos, setMousePos] = useState<{x: number, y: number} | null>(null);
  const [isInvalid, setIsInvalid] = useState(false);
  const [isExtraFareModalOpen, setIsExtraFareModalOpen] = useState(false);
  const [isConfirmTurnOffModalOpen, setIsConfirmTurnOffModalOpen] = useState(false);
  const [hoveredZoneId, setHoveredZoneId] = useState<string | null>(null);
  const [globalExtraFare, setGlobalExtraFare] = useState({
    enabled: false,
    percent: 30,
    reason: 'Heavy Traffic'
  });

  const handleMapClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const newPoints = [...points, { x, y }];
    setPoints(newPoints);
    setIsInvalid(checkSelfIntersection(newPoints));
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setMousePos({ x, y });
    
    if (points.length >= 2) {
      const tempPoints = [...points, { x, y }];
      setIsInvalid(checkSelfIntersection(tempPoints));
    }
  };

  const handleSubmit = () => {
    if (!zoneName.trim()) {
      alert("Please enter a zone name.");
      return;
    }
    if (points.length < 3) {
      alert("Please draw a zone with at least 3 points on the map.");
      return;
    }
    if (isInvalid) {
      alert("The drawn zone is invalid (self-intersecting). Please redraw.");
      return;
    }

    const newZone: Zone = {
      id: Math.random().toString(36).substr(2, 9),
      name: zoneName,
      volume: 'Low',
      extraFareEnabled: false,
      extraFarePercent: 0,
      status: 'Active'
    };

    setZones(prev => [newZone, ...prev]);
    setZoneName('');
    setPoints([]);
  };

  const handleRestore = (id: string) => {
    const zoneToRestore = deletedZones.find(z => z.id === id);
    if (zoneToRestore) {
      setZones(prev => [...prev, zoneToRestore]);
      setDeletedZones(prev => prev.filter(z => z.id !== id));
    }
  };

  const handleDelete = (id: string) => {
    const zoneToDelete = zones.find(z => z.id === id);
    if (zoneToDelete) {
      setDeletedZones(prev => [...prev, zoneToDelete]);
      setZones(prev => prev.filter(z => z.id !== id));
    }
  };

  const filteredZones = zones.filter(zone => {
    if (activeTab === 'All') return true;
    return zone.status === activeTab;
  });

  if (view === 'trash') {
    return (
      <div className="space-y-8 pb-12">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setView('setup')}
              className="p-2 hover:bg-slate-100 rounded-xl transition-colors text-slate-400"
            >
              <ChevronRight className="w-6 h-6 rotate-180" />
            </button>
            <div>
              <h2 className="text-xl font-bold text-slate-800">Deleted Zone List</h2>
              <p className="text-sm text-slate-500">Restore or permanently remove zones</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-[20px] shadow-soft border border-slate-100 flex items-center justify-between gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search here by zone name" 
              className="w-full pl-10 pr-4 py-2 bg-slate-50 border-transparent rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-primary/20 transition-all outline-none"
            />
          </div>
        </div>

        <div className="bg-white rounded-[24px] shadow-soft border border-slate-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50/50">
                  <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-wider">SL</th>
                  <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-wider">Zone Name</th>
                  <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-wider">Trip Request Volume</th>
                  <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-wider text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {deletedZones.map((zone, idx) => (
                  <tr key={zone.id} className="hover:bg-slate-50/50 transition-colors group">
                    <td className="px-6 py-4 text-xs font-medium text-slate-400">{idx + 1}</td>
                    <td className="px-6 py-4 text-xs font-bold text-slate-800">{zone.name}</td>
                    <td className="px-6 py-4">
                      <span className={cn(
                        "text-[10px] font-bold px-2 py-1 rounded-lg uppercase",
                        zone.volume === 'High' ? "bg-emerald-50 text-emerald-600" :
                        zone.volume === 'Medium' ? "bg-amber-50 text-amber-600" : "bg-slate-100 text-slate-500"
                      )}>
                        {zone.volume}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button 
                        onClick={() => handleRestore(zone.id)}
                        className="p-2 hover:bg-primary/10 rounded-lg transition-all text-slate-400 hover:text-primary"
                        title="Restore"
                      >
                        <RefreshCw className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
                {deletedZones.length === 0 && (
                  <tr>
                    <td colSpan={4} className="px-6 py-12 text-center text-slate-400 italic">
                      No zones in trash
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 pb-12">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-slate-800">Zone Setup</h2>
          <p className="text-sm text-slate-500">Manage operational boundaries and pricing zones</p>
        </div>
      </div>

      {/* Zone Creation Card */}
      <div className="bg-white rounded-[24px] shadow-soft border border-slate-100 overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-12">
          {/* Left Side: Instructions */}
          <div className="lg:col-span-4 p-8 bg-slate-50/50 border-r border-slate-100">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                <Info className="w-4 h-4 text-primary" />
              </div>
              <h3 className="font-bold text-slate-800">Instructions</h3>
            </div>
            
            <ul className="space-y-6">
              {[
                "Create zone by click on map and connect the dots together",
                "Drag map to find proper area",
                "Click to start pin points and connect them to draw a zone (Minimum 3 points required)"
              ].map((instruction, idx) => (
                <li key={idx} className="flex gap-3">
                  <div className="mt-1 w-5 h-5 rounded-full bg-white border border-slate-200 flex items-center justify-center flex-shrink-0 text-[10px] font-bold text-slate-400">
                    {idx + 1}
                  </div>
                  <p className="text-sm text-slate-600 leading-relaxed">{instruction}</p>
                </li>
              ))}
            </ul>

            <div className="mt-12 p-4 bg-white rounded-2xl border border-slate-100 shadow-sm">
              <div className="aspect-video bg-slate-100 rounded-xl flex items-center justify-center overflow-hidden relative group">
                <img 
                  src="https://picsum.photos/seed/map-preview/400/225" 
                  alt="Map Preview" 
                  className="w-full h-full object-cover opacity-50 grayscale"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-12 h-12 rounded-full bg-white/80 flex items-center justify-center shadow-lg">
                    <MapIcon className="w-6 h-6 text-primary" />
                  </div>
                </div>
              </div>
              <p className="text-[10px] text-center text-slate-400 mt-3 font-medium uppercase tracking-wider">Preview Helper</p>
            </div>
          </div>

          {/* Right Side: Form + Map */}
          <div className="lg:col-span-8 p-8 flex flex-col">
            <div className="mb-6">
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                Zone Name <span className="text-red-500">*</span>
              </label>
              <input 
                type="text" 
                value={zoneName}
                onChange={(e) => setZoneName(e.target.value)}
                placeholder="Ex: Dhanmondi"
                className="w-full px-4 py-3 bg-slate-50 border-transparent rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-primary/20 transition-all outline-none"
              />
            </div>

            {/* Interactive Map Placeholder */}
            <div 
              onClick={handleMapClick}
              onMouseMove={handleMouseMove}
              onMouseLeave={() => setMousePos(null)}
              className="flex-1 min-h-[400px] bg-slate-200 rounded-[20px] relative overflow-hidden group border border-slate-100 shadow-inner cursor-crosshair"
            >
              {/* Map Background */}
              <div className="absolute inset-0 bg-[url('https://picsum.photos/seed/map-large/1200/800')] bg-cover bg-center opacity-80 grayscale-[0.2]" />
              
              {/* Map Grid Overlay */}
              <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '20px 20px' }} />

              {/* Map UI Controls */}
              <div className="absolute top-4 left-4 flex flex-col gap-2">
                <div className="bg-white p-1 rounded-xl shadow-lg border border-slate-100 flex flex-col">
                  <button className="p-2 hover:bg-slate-50 rounded-lg transition-colors text-slate-600">
                    <Plus className="w-4 h-4" />
                  </button>
                  <div className="h-px bg-slate-100 mx-2" />
                  <button className="p-2 hover:bg-slate-50 rounded-lg transition-colors text-slate-600">
                    <Minus className="w-4 h-4" />
                  </button>
                </div>
                <button className="bg-white p-2 rounded-xl shadow-lg border border-slate-100 text-slate-600 hover:bg-slate-50">
                  <Maximize2 className="w-4 h-4" />
                </button>
                <button 
                  onClick={(e) => { e.stopPropagation(); setPoints([]); setIsInvalid(false); }}
                  className="bg-white p-2 rounded-xl shadow-lg border border-slate-100 text-red-500 hover:bg-red-50"
                  title="Clear Drawing"
                >
                  <RefreshCw className="w-4 h-4" />
                </button>
              </div>

              <div className="absolute top-4 right-4 flex gap-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input 
                    type="text" 
                    placeholder="Search location..." 
                    onClick={(e) => e.stopPropagation()}
                    className="pl-10 pr-4 py-2 bg-white rounded-xl shadow-lg border border-slate-100 text-sm focus:ring-2 focus:ring-primary/20 outline-none w-64"
                  />
                </div>
                <button 
                  onClick={(e) => e.stopPropagation()}
                  className="bg-white px-3 py-2 rounded-xl shadow-lg border border-slate-100 text-sm font-bold text-slate-600 flex items-center gap-2 hover:bg-slate-50"
                >
                  <Layers className="w-4 h-4" /> Satellite
                </button>
              </div>

              {/* Drawing Tool Indicator */}
              <div className={cn(
                "absolute bottom-4 left-1/2 -translate-x-1/2 px-4 py-2 rounded-full shadow-xl border flex items-center gap-3 transition-all duration-300",
                isInvalid ? "bg-red-50 border-red-200" : "bg-white border-slate-100"
              )}>
                <div className={cn(
                  "flex items-center gap-2 px-2 py-1 rounded-lg",
                  isInvalid ? "bg-red-100" : "bg-primary/10"
                )}>
                  {isInvalid ? (
                    <AlertCircle className="w-3.5 h-3.5 text-red-500" />
                  ) : (
                    <MousePointer2 className="w-3.5 h-3.5 text-primary" />
                  )}
                  <span className={cn(
                    "text-[11px] font-bold",
                    isInvalid ? "text-red-500" : "text-primary"
                  )}>
                    {isInvalid ? "Invalid Zone" : "Drawing Mode"}
                  </span>
                </div>
                <div className="w-px h-4 bg-slate-100" />
                <span className={cn(
                  "text-[11px] font-medium",
                  isInvalid ? "text-red-400" : "text-slate-500"
                )}>
                  {isInvalid ? "Polygon self-intersects" : (points.length === 0 ? "Click on map to start drawing" : `${points.length} points added`)}
                </span>
              </div>

              {/* Dynamic Polygon */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none">
                {points.length > 0 && (
                  <>
                    <polygon 
                      points={points.map(p => `${p.x},${p.y}`).join(' ')} 
                      fill={isInvalid ? "rgba(239, 68, 68, 0.1)" : "rgba(0, 196, 180, 0.2)"} 
                      stroke={isInvalid ? "#EF4444" : "#00C4B4"} 
                      strokeWidth="2" 
                      strokeDasharray={points.length < 3 ? "4" : "0"}
                    />
                    {/* Hover line to cursor */}
                    {mousePos && points.length > 0 && (
                      <line 
                        x1={points[points.length - 1].x} 
                        y1={points[points.length - 1].y} 
                        x2={mousePos.x} 
                        y2={mousePos.y} 
                        stroke={isInvalid ? "#EF4444" : "#00C4B4"} 
                        strokeWidth="1" 
                        strokeDasharray="4"
                      />
                    )}
                    {/* Closing line preview */}
                    {mousePos && points.length >= 2 && (
                      <line 
                        x1={points[0].x} 
                        y1={points[0].y} 
                        x2={mousePos.x} 
                        y2={mousePos.y} 
                        stroke={isInvalid ? "#EF4444" : "#00C4B4"} 
                        strokeWidth="1" 
                        strokeDasharray="4"
                        opacity="0.5"
                      />
                    )}
                    {points.map((p, i) => (
                      <circle key={i} cx={p.x} cy={p.y} r="4" fill="white" stroke={isInvalid ? "#EF4444" : "#00C4B4"} strokeWidth="2" />
                    ))}
                  </>
                )}
              </svg>
            </div>

            <div className="mt-6 flex justify-end">
              <button 
                onClick={handleSubmit}
                className="px-8 py-3 bg-primary text-white rounded-xl font-bold shadow-lg shadow-primary/20 hover:bg-primary/90 transition-all active:scale-95"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Zone List Section */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <h3 className="text-lg font-bold text-slate-800">Zone List</h3>
            <span className="px-2 py-0.5 bg-slate-100 text-slate-500 text-[10px] font-bold rounded-md uppercase">
              Total Zones: {zones.length}
            </span>
          </div>
          
          <div className="flex bg-slate-100 p-1 rounded-xl">
            {(['All', 'Active', 'Inactive'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={cn(
                  "px-4 py-1.5 text-xs font-bold rounded-lg transition-all",
                  activeTab === tab 
                    ? "bg-white text-primary shadow-sm" 
                    : "text-slate-500 hover:text-slate-700"
                )}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Search & Action Bar */}
        <div className="bg-white p-4 rounded-[20px] shadow-soft border border-slate-100 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4 w-full md:w-auto">
            <div className="relative flex-1 md:w-80">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input 
                type="text" 
                placeholder="Search here by zone name" 
                className="w-full pl-10 pr-4 py-2 bg-slate-50 border-transparent rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-primary/20 transition-all outline-none"
              />
            </div>
            <button className="px-6 py-2 bg-primary text-white rounded-xl text-sm font-bold hover:bg-primary/90 transition-all">
              Search
            </button>
          </div>

          <div className="flex items-center gap-4 w-full md:w-auto justify-between md:justify-end">
            <div 
              onClick={() => setIsExtraFareModalOpen(true)}
              className="flex items-center gap-2 cursor-pointer group"
            >
              <div className={cn(
                "w-9 h-5 rounded-full transition-all relative",
                globalExtraFare.enabled ? "bg-primary" : "bg-slate-200"
              )}>
                <div className={cn(
                  "absolute top-[2px] left-[2px] w-4 h-4 bg-white rounded-full transition-transform",
                  globalExtraFare.enabled ? "translate-x-4" : ""
                )} />
              </div>
              <span className="text-xs font-bold text-slate-600">Apply For All Zone Extra Fare</span>
              <Info className="w-3.5 h-3.5 text-slate-400 group-hover:text-primary transition-colors" />
            </div>

            <div className="flex items-center gap-2">
              <button className="p-2 bg-slate-50 text-slate-400 rounded-lg hover:bg-slate-100 hover:text-slate-600 transition-all">
                <RefreshCw className="w-4 h-4" />
              </button>
              <button 
                onClick={() => setView('trash')}
                className="p-2 bg-slate-50 text-slate-400 rounded-lg hover:bg-slate-100 hover:text-slate-600 transition-all"
              >
                <Trash2 className="w-4 h-4" />
              </button>
              <button className="p-2 bg-slate-50 text-slate-400 rounded-lg hover:bg-slate-100 hover:text-slate-600 transition-all">
                <Download className="w-4 h-4" />
              </button>
              <div className="w-px h-6 bg-slate-100 mx-1" />
              <button className="flex items-center gap-2 px-4 py-2 bg-slate-50 text-slate-600 rounded-xl text-xs font-bold hover:bg-slate-100 transition-all">
                Download <ChevronRight className="w-3 h-3 rotate-90" />
              </button>
            </div>
          </div>
        </div>

        {/* Data Table */}
        <div className="bg-white rounded-[24px] shadow-soft border border-slate-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50/50">
                  <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-wider">SL</th>
                  <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-wider">Zone Name</th>
                  <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-wider">Trip Request Volume</th>
                  <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-wider">Extra Fare Status</th>
                  <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-wider">Extra Fare (%)</th>
                  <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-wider text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {filteredZones.map((zone, idx) => (
                  <tr key={zone.id} className="hover:bg-slate-50/50 transition-colors group">
                    <td className="px-6 py-4 text-xs font-medium text-slate-400">{idx + 1}</td>
                    <td className="px-6 py-4">
                      <button className="text-xs font-bold text-slate-800 hover:text-primary transition-colors">
                        {zone.name}
                      </button>
                    </td>
                    <td className="px-6 py-4">
                      <span className={cn(
                        "text-[10px] font-bold px-2 py-1 rounded-lg uppercase",
                        zone.volume === 'High' ? "bg-emerald-50 text-emerald-600" :
                        zone.volume === 'Medium' ? "bg-amber-50 text-amber-600" : "bg-slate-100 text-slate-500"
                      )}>
                        {zone.volume}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div 
                        className="relative inline-flex items-center"
                        onMouseEnter={() => setHoveredZoneId(zone.id)}
                        onMouseLeave={() => setHoveredZoneId(null)}
                      >
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input type="checkbox" checked={zone.extraFareEnabled} className="sr-only peer" readOnly />
                          <div className="w-9 h-5 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-primary"></div>
                        </label>

                        {/* Tooltip Popover */}
                        {hoveredZoneId === zone.id && zone.extraFareEnabled && (
                          <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-48 bg-white rounded-2xl shadow-xl border border-slate-100 p-4 z-20 animate-in fade-in slide-in-from-bottom-2 duration-200">
                            <div className="space-y-2">
                              <div className="flex justify-between items-center">
                                <span className="text-[10px] font-bold text-slate-400 uppercase">Extra Fare</span>
                                <span className="text-xs font-bold text-primary">{zone.extraFarePercent}%</span>
                              </div>
                              <div className="flex justify-between items-center">
                                <span className="text-[10px] font-bold text-slate-400 uppercase">Reason</span>
                                <span className="text-[10px] font-medium text-slate-600 truncate max-w-[80px]">Heavy Traffic</span>
                              </div>
                              <button 
                                onClick={() => setIsExtraFareModalOpen(true)}
                                className="w-full mt-2 py-1.5 bg-slate-50 text-primary text-[10px] font-bold rounded-lg hover:bg-primary hover:text-white transition-all flex items-center justify-center gap-1"
                              >
                                <Edit3 className="w-3 h-3" /> Edit
                              </button>
                            </div>
                            {/* Arrow */}
                            <div className="absolute top-full left-1/2 -translate-x-1/2 border-8 border-transparent border-t-white" />
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-xs font-bold text-slate-800">{zone.extraFarePercent}%</span>
                    </td>
                    <td className="px-6 py-4">
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" checked={zone.status === 'Active'} className="sr-only peer" readOnly />
                        <div className="w-9 h-5 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-emerald-500"></div>
                      </label>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button className="p-2 hover:bg-primary/10 rounded-lg transition-all text-slate-400 hover:text-primary">
                          <Edit3 className="w-4 h-4" />
                        </button>
                        <button 
                          onClick={() => handleDelete(zone.id)}
                          className="p-2 hover:bg-red-50 rounded-lg transition-all text-slate-400 hover:text-red-500"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Extra Fare Setup Modal */}
      {isExtraFareModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
          <div className="bg-white w-full max-w-2xl rounded-[32px] shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
            {/* Modal Header */}
            <div className="p-8 border-b border-slate-50 flex items-center justify-between">
              <div>
                <h3 className="text-xl font-bold text-slate-800">Extra Fare Setup - All Zone</h3>
                <p className="text-sm text-slate-500 mt-1">
                  Enabling this option will apply the extra fare to all rides and parcels across all Zones when conditions change or heavy traffic.
                </p>
              </div>
              <button 
                onClick={() => setIsExtraFareModalOpen(false)}
                className="p-2 hover:bg-slate-100 rounded-xl transition-colors text-slate-400"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="p-8 space-y-8">
              {/* Global Toggle */}
              <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100">
                <span className="text-sm font-bold text-slate-700">Enable Extra Fare Globally</span>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input 
                    type="checkbox" 
                    checked={globalExtraFare.enabled} 
                    onChange={(e) => {
                      if (!e.target.checked) {
                        setIsConfirmTurnOffModalOpen(true);
                      } else {
                        setGlobalExtraFare(prev => ({ ...prev, enabled: true }));
                      }
                    }}
                    className="sr-only peer" 
                  />
                  <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                </label>
              </div>

              {/* Form Fields */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Extra Fare (%)</label>
                    <Info className="w-3 h-3 text-slate-300" />
                  </div>
                  <input 
                    type="number" 
                    value={globalExtraFare.percent}
                    onChange={(e) => setGlobalExtraFare(prev => ({ ...prev, percent: parseInt(e.target.value) || 0 }))}
                    className="w-full px-4 py-3 bg-slate-50 border-transparent rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-primary/20 transition-all outline-none"
                    placeholder="30"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Reasons For Extra Fare</label>
                  <input 
                    type="text" 
                    value={globalExtraFare.reason}
                    onChange={(e) => setGlobalExtraFare(prev => ({ ...prev, reason: e.target.value }))}
                    className="w-full px-4 py-3 bg-slate-50 border-transparent rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-primary/20 transition-all outline-none"
                    placeholder="Heavy Traffic"
                  />
                </div>
              </div>

              {/* Instruction Section */}
              <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100 space-y-4">
                <div className="flex items-center gap-2 text-primary">
                  <Info className="w-4 h-4" />
                  <span className="text-xs font-bold uppercase tracking-wider">Admin Guidance</span>
                </div>
                <ul className="space-y-3">
                  <li className="flex gap-3 text-xs text-slate-500 leading-relaxed">
                    <div className="w-1 h-1 rounded-full bg-slate-300 mt-1.5 flex-shrink-0" />
                    When Allow Extra Fare Setup - All Zone, the Extra Fare (%) will be applicable to all the active zones.
                  </li>
                  <li className="flex gap-3 text-xs text-slate-500 leading-relaxed">
                    <div className="w-1 h-1 rounded-full bg-slate-300 mt-1.5 flex-shrink-0" />
                    If want to set up separately for each zone:
                  </li>
                  <li className="ml-4 flex gap-3 text-xs text-slate-400 leading-relaxed italic">
                    a. Popup for Extra Fare & Reason
                  </li>
                  <li className="ml-4 flex gap-3 text-xs text-slate-400 leading-relaxed italic">
                    b. Configure zone-level surcharge
                  </li>
                  <li className="ml-4 flex gap-3 text-xs text-slate-400 leading-relaxed italic">
                    c. Update from Zone Settings page
                  </li>
                </ul>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-8 bg-slate-50 border-t border-slate-100 flex items-center justify-end gap-4">
              <button 
                onClick={() => setIsExtraFareModalOpen(false)}
                className="px-6 py-2.5 text-sm font-bold text-slate-500 hover:text-slate-700 transition-colors"
              >
                Cancel
              </button>
              <button 
                onClick={() => setIsExtraFareModalOpen(false)}
                className="px-8 py-2.5 bg-primary text-white rounded-xl text-sm font-bold shadow-lg shadow-primary/20 hover:bg-primary/90 transition-all active:scale-95"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Confirmation Modal: Turn Off Extra Fare */}
      {isConfirmTurnOffModalOpen && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
          <div className="bg-white w-full max-w-md rounded-[32px] shadow-2xl overflow-hidden p-8 text-center animate-in fade-in zoom-in duration-200">
            <div className="w-20 h-20 bg-amber-50 rounded-full flex items-center justify-center mx-auto mb-6">
              <div className="relative">
                <Car className="w-10 h-10 text-amber-500" />
                <DollarSign className="w-6 h-6 text-amber-600 absolute -top-2 -right-2 bg-white rounded-full shadow-sm" />
              </div>
            </div>
            
            <h3 className="text-xl font-bold text-slate-800 mb-2">
              Are you sure to turn off Extra Fare for All Zones?
            </h3>
            <p className="text-sm text-slate-500 mb-8">
              This action will revert all pricing to standard rates across all active service areas.
            </p>

            <div className="flex items-center gap-4">
              <button 
                onClick={() => setIsConfirmTurnOffModalOpen(false)}
                className="flex-1 py-3 border-2 border-red-100 text-red-500 rounded-xl font-bold hover:bg-red-50 transition-all"
              >
                Cancel
              </button>
              <button 
                onClick={() => {
                  setGlobalExtraFare(prev => ({ ...prev, enabled: false }));
                  setIsConfirmTurnOffModalOpen(false);
                }}
                className="flex-1 py-3 bg-emerald-500 text-white rounded-xl font-bold shadow-lg shadow-emerald-500/20 hover:bg-emerald-600 transition-all"
              >
                Turn Off
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
