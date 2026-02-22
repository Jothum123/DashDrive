import React, { useState } from 'react';
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';
import { motion, AnimatePresence } from 'motion/react';
import { 
  MapPin, Info, Search, Filter, Layers, Calendar, 
  Maximize2, Globe, CheckSquare, Square, RefreshCcw,
  ChevronDown, TrendingUp
} from 'lucide-react';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, 
  Tooltip, ResponsiveContainer, Area, AreaChart 
} from 'recharts';
import { cn } from '../utils';

const heatPoints = [
  { id: 1, x: 200, y: 300, radius: 80, intensity: 0.8, rides: 48, label: 'Downtown' },
  { id: 2, x: 500, y: 200, radius: 100, intensity: 0.9, rides: 82, label: 'Airport' },
  { id: 3, x: 800, y: 450, radius: 70, intensity: 0.6, rides: 28, label: 'Suburbs' },
  { id: 4, x: 350, y: 600, radius: 90, intensity: 0.7, rides: 54, label: 'Business Dist' },
  { id: 5, x: 700, y: 150, radius: 60, intensity: 0.5, rides: 19, label: 'North Port' },
  { id: 6, x: 150, y: 700, radius: 75, intensity: 0.75, rides: 38, label: 'West End' },
];

const compareData = [
  { 
    year: '2023', 
    range: '01 Oct – 31 Dec', 
    rides: 1, 
    parcels: 2, 
    points: [
      { x: 100, y: 150, val: 12 },
      { x: 250, y: 200, val: 8 }
    ]
  },
  { 
    year: '2024', 
    range: '01 Jan – 31 Dec', 
    rides: 11, 
    parcels: 16, 
    points: [
      { x: 120, y: 140, val: 45 },
      { x: 200, y: 220, val: 32 },
      { x: 50, y: 80, val: 18 }
    ]
  },
  { 
    year: '2025', 
    range: '01 Jan – 31 Dec', 
    rides: 6, 
    parcels: 0, 
    points: [
      { x: 150, y: 100, val: 24 },
      { x: 80, y: 180, val: 15 }
    ]
  },
];

const tripStatsData = [
  { year: '2023', trips: 15 },
  { year: '2024', trips: 42 },
  { year: '2025', trips: 36 },
  { year: '2026', trips: 28 },
];

const zones = [
  { id: 'all', name: 'All Zone', rides: 26, parcels: 22, checked: true },
  { id: 'world3', name: 'All Over The World #3', rides: 18, parcels: 18, checked: true },
  { id: 'asia4', name: 'Asia #4', rides: 8, parcels: 4, checked: false },
  { id: 'europe2', name: 'Europe #2', rides: 12, parcels: 10, checked: false },
  { id: 'america1', name: 'America #1', rides: 15, parcels: 12, checked: false },
];

const MiniMap: React.FC<{ points: any[], year: string, range: string }> = ({ points, year, range }) => (
  <div className="flex-1 min-w-[300px] bg-slate-50 rounded-2xl border border-slate-100 overflow-hidden relative group">
    <div className="absolute top-3 left-3 z-10 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-lg shadow-sm border border-slate-100">
      <p className="text-[10px] font-bold text-slate-800">{year}</p>
      <p className="text-[8px] text-slate-500">{range}</p>
    </div>
    
    <svg width="100%" height="150" className="opacity-10">
      <defs>
        <pattern id={`grid-mini-${year}`} width="20" height="20" patternUnits="userSpaceOnUse">
          <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#94a3b8" strokeWidth="0.5"/>
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#grid-mini-${year})`} />
      <path d="M 0 75 L 400 75" stroke="#cbd5e1" strokeWidth="10" fill="none" />
      <path d="M 150 0 L 150 150" stroke="#cbd5e1" strokeWidth="10" fill="none" />
    </svg>

    {points.map((p, i) => (
      <div 
        key={i}
        className="absolute w-12 h-12 rounded-full bg-primary/30 blur-xl"
        style={{ left: p.x, top: p.y, transform: 'translate(-50%, -50%)' }}
      />
    ))}
    {points.map((p, i) => (
      <div 
        key={`dot-${i}`}
        className="absolute w-6 h-6 rounded-full bg-primary border-2 border-white shadow-sm flex items-center justify-center text-[8px] font-bold text-white"
        style={{ left: p.x, top: p.y, transform: 'translate(-50%, -50%)' }}
      >
        {p.val}
      </div>
    ))}
  </div>
);

export const HeatMapView = () => {
  const [hoveredPoint, setHoveredPoint] = useState<any>(null);
  const [activeTab, setActiveTab] = useState('Overview');
  const [zoneSearch, setZoneSearch] = useState('');
  const [locationSearch, setLocationSearch] = useState('');
  const [selectedZones, setSelectedZones] = useState(zones.map(z => z.id));

  const toggleZone = (id: string) => {
    setSelectedZones(prev => 
      prev.includes(id) ? prev.filter(zid => zid !== id) : [...prev, id]
    );
  };

  const [selectedYears, setSelectedYears] = useState(compareData.map(d => d.year));

  const toggleYear = (year: string) => {
    setSelectedYears(prev => 
      prev.includes(year) ? prev.filter(y => y !== year) : [...prev, year]
    );
  };

  return (
    <div className="flex flex-col h-full space-y-6">
      {/* Header & Main Filters */}
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-slate-800">Trip Heat Map</h2>
            <p className="text-sm text-slate-500">Geographical analytics for ride demand and parcel distribution</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex bg-white rounded-xl shadow-sm border border-slate-100 p-1">
              <button 
                onClick={() => setActiveTab('Overview')}
                className={cn(
                  "px-4 py-2 text-xs font-bold rounded-lg transition-all",
                  activeTab === 'Overview' ? "bg-primary/10 text-primary" : "text-slate-500 hover:bg-slate-50"
                )}
              >
                Overview
              </button>
              <button 
                onClick={() => setActiveTab('Compare')}
                className={cn(
                  "px-4 py-2 text-xs font-bold rounded-lg transition-all",
                  activeTab === 'Compare' ? "bg-primary/10 text-primary" : "text-slate-500 hover:bg-slate-50"
                )}
              >
                Compare
              </button>
            </div>
          </div>
        </div>

        {activeTab === 'Overview' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input 
                type="text" 
                placeholder="02/01/2026 - 02/22/2026" 
                className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-100 rounded-xl text-sm shadow-sm focus:ring-2 focus:ring-primary/20"
              />
            </div>
            <div className="relative md:col-span-2">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input 
                type="text" 
                value={locationSearch}
                onChange={(e) => setLocationSearch(e.target.value)}
                placeholder="Search for a location" 
                className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-100 rounded-xl text-sm shadow-sm focus:ring-2 focus:ring-primary/20"
              />
            </div>
          </div>
        )}
      </div>

      {activeTab === 'Overview' ? (
        <div className="flex-1 flex gap-6 min-h-0">
          {/* Zone List Panel */}
          <div className="w-80 bg-white rounded-[24px] shadow-soft border border-slate-100 flex flex-col overflow-hidden">
            <div className="p-5 border-b border-slate-50">
              <h3 className="text-sm font-bold text-slate-800 mb-4 uppercase tracking-wider">Zones</h3>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
                <input 
                  type="text" 
                  value={zoneSearch}
                  onChange={(e) => setZoneSearch(e.target.value)}
                  placeholder="Search zones..." 
                  className="w-full pl-9 pr-4 py-2 bg-slate-50 border-none rounded-lg text-xs focus:ring-2 focus:ring-primary/20"
                />
              </div>
            </div>
            <div className="flex-1 overflow-y-auto p-2 space-y-1 scrollbar-hide">
              {zones.filter(z => z.name.toLowerCase().includes(zoneSearch.toLowerCase())).map((zone) => (
                <div 
                  key={zone.id}
                  onClick={() => toggleZone(zone.id)}
                  className={cn(
                    "p-3 rounded-xl border transition-all cursor-pointer group",
                    selectedZones.includes(zone.id) 
                      ? "bg-primary/5 border-primary/10" 
                      : "bg-transparent border-transparent hover:bg-slate-50"
                  )}
                >
                  <div className="flex items-start gap-3">
                    <div className="mt-0.5">
                      {selectedZones.includes(zone.id) 
                        ? <CheckSquare className="w-4 h-4 text-primary" /> 
                        : <Square className="w-4 h-4 text-slate-300 group-hover:text-slate-400" />
                      }
                    </div>
                    <div className="flex-1">
                      <p className="text-xs font-bold text-slate-800 mb-1">{zone.name}</p>
                      <div className="flex items-center gap-3">
                        <div className="flex items-center gap-1">
                          <span className="text-[10px] text-slate-400">Ride:</span>
                          <span className="text-[10px] font-bold text-slate-700">{zone.rides}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <span className="text-[10px] text-slate-400">Parcel:</span>
                          <span className="text-[10px] font-bold text-slate-700">{zone.parcels}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Map Area */}
          <div className="flex-1 bg-white rounded-[24px] shadow-soft border border-slate-100 overflow-hidden relative">
            <TransformWrapper
              initialScale={1}
              minScale={0.5}
              maxScale={4}
              centerOnInit
            >
              {({ zoomIn, zoomOut, resetTransform }) => (
                <>
                  {/* Map Controls */}
                  <div className="absolute top-6 right-6 z-10 flex flex-col gap-2">
                    <div className="bg-white shadow-lg rounded-xl border border-slate-100 overflow-hidden flex flex-col">
                      <button onClick={() => zoomIn()} className="w-10 h-10 flex items-center justify-center text-slate-600 hover:text-primary hover:bg-slate-50 transition-colors border-b border-slate-50">+</button>
                      <button onClick={() => zoomOut()} className="w-10 h-10 flex items-center justify-center text-slate-600 hover:text-primary hover:bg-slate-50 transition-colors">-</button>
                    </div>
                    <button onClick={() => resetTransform()} className="w-10 h-10 bg-white shadow-lg rounded-xl flex items-center justify-center text-slate-600 hover:text-primary transition-colors border border-slate-100">
                      <Maximize2 className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="absolute top-6 left-6 z-10 flex gap-2">
                    <div className="bg-white shadow-lg rounded-xl border border-slate-100 p-1 flex">
                      <button className="px-3 py-1.5 text-[10px] font-bold bg-primary/10 text-primary rounded-lg">Map</button>
                      <button className="px-3 py-1.5 text-[10px] font-bold text-slate-500 hover:bg-slate-50 rounded-lg">Satellite</button>
                    </div>
                  </div>

                  <TransformComponent wrapperClass="!w-full !h-full cursor-grab active:cursor-grabbing">
                    <div className="relative w-[1200px] h-[800px] bg-slate-50">
                      {/* Stylized Map Background */}
                      <svg width="100%" height="100%" className="absolute inset-0 opacity-20">
                        <defs>
                          <pattern id="grid-heat" width="40" height="40" patternUnits="userSpaceOnUse">
                            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#94a3b8" strokeWidth="0.5"/>
                          </pattern>
                        </defs>
                        <rect width="100%" height="100%" fill="url(#grid-heat)" />
                        
                        {/* Stylized Roads */}
                        <path d="M 0 400 L 1200 400" stroke="#cbd5e1" strokeWidth="20" fill="none" />
                        <path d="M 600 0 L 600 800" stroke="#cbd5e1" strokeWidth="20" fill="none" />
                        <path d="M 200 0 L 200 800" stroke="#cbd5e1" strokeWidth="10" fill="none" />
                        <path d="M 1000 0 L 1000 800" stroke="#cbd5e1" strokeWidth="10" fill="none" />
                      </svg>

                      {/* Heat Points */}
                      {heatPoints.map((point) => (
                        <div
                          key={point.id}
                          className="absolute cursor-pointer group"
                          style={{
                            left: point.x,
                            top: point.y,
                            width: point.radius * 2,
                            height: point.radius * 2,
                            transform: 'translate(-50%, -50%)',
                          }}
                          onMouseEnter={() => setHoveredPoint(point)}
                          onMouseLeave={() => setHoveredPoint(null)}
                        >
                          <div 
                            className={cn(
                              "w-full h-full rounded-full transition-all duration-500 blur-2xl opacity-40 group-hover:opacity-60",
                              point.rides > 70 ? "bg-purple-600" : point.rides > 40 ? "bg-blue-600" : "bg-cyan-500"
                            )}
                          />
                          <div 
                            className={cn(
                              "absolute inset-0 m-auto w-10 h-10 rounded-full border-2 border-white shadow-lg flex items-center justify-center text-white text-xs font-bold",
                              point.rides > 70 ? "bg-purple-700" : point.rides > 40 ? "bg-blue-700" : "bg-cyan-600"
                            )}
                          >
                            {point.rides}
                          </div>
                        </div>
                      ))}

                      {/* Tooltip */}
                      <AnimatePresence>
                        {hoveredPoint && (
                          <motion.div
                            initial={{ opacity: 0, y: 10, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 10, scale: 0.95 }}
                            className="absolute z-20 bg-slate-900 text-white p-3 rounded-xl shadow-2xl pointer-events-none whitespace-nowrap"
                            style={{
                              left: hoveredPoint.x,
                              top: hoveredPoint.y - 70,
                              transform: 'translateX(-50%)',
                            }}
                          >
                            <div className="flex items-center gap-2 mb-1">
                              <div className={cn(
                                "w-2 h-2 rounded-full",
                                hoveredPoint.rides > 70 ? "bg-purple-500" : hoveredPoint.rides > 40 ? "bg-blue-500" : "bg-cyan-500"
                              )}></div>
                              <span className="text-xs font-bold uppercase tracking-wider">{hoveredPoint.label}</span>
                            </div>
                            <p className="text-xl font-bold">{hoveredPoint.rides} <span className="text-xs font-normal text-slate-400">active trips</span></p>
                            <div className="absolute bottom-[-6px] left-1/2 -translate-x-1/2 w-3 h-3 bg-slate-900 rotate-45"></div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </TransformComponent>
                </>
              )}
            </TransformWrapper>
          </div>
        </div>
      ) : (
        <div className="flex-1 flex gap-6 min-h-0">
          {/* Compare Filters & List */}
          <div className="w-80 flex flex-col gap-6 overflow-y-auto scrollbar-hide">
            <div className="bg-white rounded-[24px] shadow-soft border border-slate-100 p-6 space-y-4">
              <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider">Filter</h3>
              <div className="space-y-3">
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-400 uppercase">Select Zone</label>
                  <div className="relative">
                    <select className="w-full bg-slate-50 border-none rounded-xl px-4 py-2.5 text-xs appearance-none focus:ring-2 focus:ring-primary/20">
                      <option>All Over The World</option>
                      <option>Asia</option>
                      <option>Europe</option>
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                  </div>
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-400 uppercase">Select Time Frame</label>
                  <div className="relative">
                    <select className="w-full bg-slate-50 border-none rounded-xl px-4 py-2.5 text-xs appearance-none focus:ring-2 focus:ring-primary/20">
                      <option>All Time</option>
                      <option>Last Year</option>
                      <option>Last 3 Years</option>
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                  </div>
                </div>
                <div className="flex gap-2 pt-2">
                  <button className="flex-1 py-2.5 bg-slate-100 text-slate-600 rounded-xl text-xs font-bold hover:bg-slate-200 transition-colors">RESET</button>
                  <button className="flex-1 py-2.5 bg-primary text-white rounded-xl text-xs font-bold hover:bg-primary/90 transition-colors">SUBMIT</button>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-[24px] shadow-soft border border-slate-100 p-6 flex-1 flex flex-col min-h-0">
              <h3 className="text-sm font-bold text-slate-800 mb-4 uppercase tracking-wider">Comparison List</h3>
              <div className="space-y-3 overflow-y-auto pr-2 scrollbar-hide">
                {compareData.map((item) => (
                  <div 
                    key={item.year} 
                    onClick={() => toggleYear(item.year)}
                    className={cn(
                      "p-3 rounded-xl border transition-all cursor-pointer group",
                      selectedYears.includes(item.year) 
                        ? "bg-primary/5 border-primary/10" 
                        : "bg-transparent border-transparent hover:bg-slate-50"
                    )}
                  >
                    <div className="flex items-start gap-3">
                      <div className="mt-0.5">
                        {selectedYears.includes(item.year) 
                          ? <CheckSquare className="w-4 h-4 text-primary" /> 
                          : <Square className="w-4 h-4 text-slate-300 group-hover:text-slate-400" />
                        }
                      </div>
                      <div className="flex-1">
                        <p className="text-xs font-bold text-slate-800 mb-1">{item.year}</p>
                        <div className="flex items-center gap-3">
                          <div className="flex items-center gap-1">
                            <span className="text-[10px] text-slate-400">Ride:</span>
                            <span className="text-[10px] font-bold text-slate-700">{item.rides}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <span className="text-[10px] text-slate-400">Parcel:</span>
                            <span className="text-[10px] font-bold text-slate-700">{item.parcels}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Compare Content Area */}
          <div className="flex-1 flex flex-col gap-6 min-w-0 overflow-y-auto scrollbar-hide">
            {/* Side-by-Side Mini Maps */}
            <div className="bg-white rounded-[24px] shadow-soft border border-slate-100 p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider">Compare Heatmaps</h3>
                <div className="flex gap-2">
                  <button className="p-1.5 bg-slate-100 rounded-lg text-slate-500 hover:text-primary transition-colors">
                    <Maximize2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
              <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
                {compareData.filter(d => selectedYears.includes(d.year)).map((data) => (
                  <MiniMap key={data.year} points={data.points} year={data.year} range={data.range} />
                ))}
              </div>
            </div>

            {/* Trip Statistics Chart */}
            <div className="bg-white rounded-[24px] shadow-soft border border-slate-100 p-6 flex-1 min-h-[300px] flex flex-col">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider">Trip Statistics</h3>
                  <div className="flex items-center gap-2 mt-1">
                    <TrendingUp className="w-4 h-4 text-primary" />
                    <span className="text-lg font-bold text-slate-800">Total Trip: 36</span>
                  </div>
                </div>
                <div className="flex bg-slate-50 p-1 rounded-lg">
                  <button className="px-3 py-1 text-[10px] font-bold bg-white text-primary shadow-sm rounded-md">Yearly</button>
                  <button className="px-3 py-1 text-[10px] font-bold text-slate-500 hover:text-slate-700">Monthly</button>
                </div>
              </div>
              <div className="flex-1 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={tripStatsData}>
                    <defs>
                      <linearGradient id="colorTrips" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#00A884" stopOpacity={0.1}/>
                        <stop offset="95%" stopColor="#00A884" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                    <XAxis 
                      dataKey="year" 
                      axisLine={false} 
                      tickLine={false} 
                      tick={{ fill: '#94a3b8', fontSize: 10 }}
                      dy={10}
                    />
                    <YAxis 
                      axisLine={false} 
                      tickLine={false} 
                      tick={{ fill: '#94a3b8', fontSize: 10 }}
                    />
                    <Tooltip 
                      contentStyle={{ 
                        borderRadius: '12px', 
                        border: 'none', 
                        boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)',
                        fontSize: '10px'
                      }} 
                    />
                    <Area 
                      type="monotone" 
                      dataKey="trips" 
                      stroke="#00A884" 
                      strokeWidth={2}
                      fillOpacity={1} 
                      fill="url(#colorTrips)" 
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
