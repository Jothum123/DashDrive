import React, { useState, useEffect, useRef } from 'react';
import { TransformWrapper, TransformComponent, ReactZoomPanPinchRef } from 'react-zoom-pan-pinch';
import { motion, AnimatePresence } from 'motion/react';
import {
  Car, User, Navigation, MapPin, Phone, MessageSquare,
  X, ChevronRight, Search, Globe, ShieldAlert,
  AlertCircle, LayoutGrid, Layers, Maximize2
} from 'lucide-react';
import { cn } from '../utils';

const INITIAL_VEHICLES = [
  { id: 'V-101', driver: 'Alex Rivera', status: 'Active', trip: 'Airport Transfer', x: 300, y: 250, type: 'Luxury', rating: 4.9, phone: '+1 555-0101', model: 'Tesla Model S', level: 'Gold', alerts: [] },
  { id: 'V-102', driver: 'Sarah Chen', status: 'On Trip', trip: 'Downtown Express', x: 600, y: 400, type: 'Standard', rating: 4.8, phone: '+1 555-0102', model: 'Toyota Camry', level: 'Silver', alerts: ['Abrupt Braking'] },
  { id: 'V-103', driver: 'Marco Rossi', status: 'Idle', trip: 'None', x: 850, y: 150, type: 'Bike', rating: 4.7, phone: '+1 555-0103', model: 'Yamaha R1', level: 'Bronze', alerts: [] },
  { id: 'V-104', driver: 'Elena Petrova', status: 'Active', trip: 'Shopping Mall', x: 450, y: 550, type: 'Standard', rating: 4.9, phone: '+1 555-0104', model: 'Honda Accord', level: 'Gold', alerts: [] },
  { id: 'V-105', driver: 'James Wilson', status: 'On Trip', trip: 'Corporate Office', x: 200, y: 650, type: 'Luxury', rating: 5.0, phone: '+1 555-0105', model: 'BMW 7 Series', level: 'Platinum', alerts: [] },
  { id: 'V-106', driver: 'Yuki Tanaka', status: 'Active', trip: 'Station Pick-up', x: 950, y: 600, type: 'Standard', rating: 4.6, phone: '+1 555-0106', model: 'Nissan Altima', level: 'Silver', alerts: [] },
];

const INITIAL_CUSTOMERS = [
  { id: 'C-201', name: 'Devid Jack', x: 400, y: 300, phone: '+1 555-0201', trips: 12, status: 'Waiting' },
  { id: 'C-202', name: 'Test User', x: 700, y: 500, phone: '+1 555-0202', trips: 5, status: 'On Trip', alerts: ['Safety Alert'] },
  { id: 'C-203', name: 'Emma Watson', x: 100, y: 400, phone: '+1 555-0203', trips: 28, status: 'Idle' },
];

export const FleetView = ({
  onCustomerClick,
  onDriverClick,
  initialTab = 'Drivers'
}: {
  onCustomerClick?: (id: string) => void,
  onDriverClick?: (id: string) => void,
  initialTab?: 'Drivers' | 'Customers'
}) => {
  const [vehicles, setVehicles] = useState(INITIAL_VEHICLES);
  const [customers] = useState(INITIAL_CUSTOMERS);
  const [activeTab, setActiveTab] = useState<'Drivers' | 'Customers'>(initialTab);
  const [driverFilter, setDriverFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedEntityId, setSelectedEntityId] = useState<string | null>(null);
  const [scale, setScale] = useState(1);
  const [mapType, setMapType] = useState<'Map' | 'Satellite'>('Map');
  const transformRef = useRef<ReactZoomPanPinchRef>(null);

  const filteredVehicles = vehicles.filter(v => {
    const matchesFilter = driverFilter === 'All' || v.status === driverFilter;
    const matchesSearch = v.driver.toLowerCase().includes(searchQuery.toLowerCase()) || v.id.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const filteredCustomers = customers.filter(c =>
    c.name.toLowerCase().includes(searchQuery.toLowerCase()) || c.id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const selectedEntity = activeTab === 'Drivers'
    ? vehicles.find(v => v.id === selectedEntityId)
    : customers.find(c => c.id === selectedEntityId);

  // Simple clustering algorithm
  const getClusters = (items: any[], threshold: number) => {
    const clusters: any[][] = [];
    const processed = new Set<number>();

    items.forEach((item, i) => {
      if (processed.has(i)) return;
      const cluster = [item];
      processed.add(i);
      items.forEach((other, j) => {
        if (processed.has(j)) return;
        const dist = Math.sqrt(Math.pow(item.x - other.x, 2) + Math.pow(item.y - other.y, 2));
        if (dist < threshold) {
          cluster.push(other);
          processed.add(j);
        }
      });
      clusters.push(cluster);
    });
    return clusters;
  };

  const currentItems = activeTab === 'Drivers' ? filteredVehicles : filteredCustomers;
  const clusters = scale < 0.8 ? getClusters(currentItems, 150) : currentItems.map(v => [v]);

  // Simulate vehicle movement
  useEffect(() => {
    const interval = setInterval(() => {
      setVehicles(prev => prev.map(v => {
        if (v.status === 'Idle') return v;
        const dx = (Math.random() - 0.5) * 40;
        const dy = (Math.random() - 0.5) * 40;
        return {
          ...v,
          x: Math.max(50, Math.min(1150, v.x + dx)),
          y: Math.max(50, Math.min(750, v.y + dy)),
        };
      }));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const handleEntitySelect = (id: string, x: number, y: number) => {
    setSelectedEntityId(id);
    if (transformRef.current) {
      transformRef.current.zoomToElement(id, 2, 500);
    }
  };

  return (
    <div className="flex flex-col h-full space-y-6">
      {/* Header & Main Tabs */}
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-slate-800">Fleet Map</h2>
            <p className="text-sm text-slate-500">Real-time operational tracking for drivers and customers</p>
          </div>
          <div className="flex bg-white rounded-xl shadow-sm border border-slate-100 p-1">
            <button
              onClick={() => { setActiveTab('Drivers'); setSelectedEntityId(null); }}
              className={cn(
                "px-6 py-2 text-xs font-bold rounded-lg transition-all",
                activeTab === 'Drivers' ? "bg-primary/10 text-primary" : "text-slate-500 hover:bg-slate-50"
              )}
            >
              All Drivers
            </button>
            <button
              onClick={() => { setActiveTab('Customers'); setSelectedEntityId(null); }}
              className={cn(
                "px-6 py-2 text-xs font-bold rounded-lg transition-all",
                activeTab === 'Customers' ? "bg-primary/10 text-primary" : "text-slate-500 hover:bg-slate-50"
              )}
            >
              Customers
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="relative md:col-span-2">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search for a location, driver or customer"
              className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-100 rounded-xl text-sm shadow-sm focus:ring-2 focus:ring-primary/20"
            />
          </div>
          <div className="relative">
            <Globe className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <select className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-100 rounded-xl text-sm shadow-sm appearance-none focus:ring-2 focus:ring-primary/20">
              <option>All Over The World</option>
              <option>Asia</option>
              <option>Europe</option>
            </select>
          </div>
          <div className="flex bg-white rounded-xl shadow-sm border border-slate-100 p-1">
            <button
              onClick={() => setMapType('Map')}
              className={cn(
                "flex-1 py-1.5 text-[10px] font-bold rounded-lg transition-all",
                mapType === 'Map' ? "bg-slate-100 text-slate-800" : "text-slate-500"
              )}
            >
              Map
            </button>
            <button
              onClick={() => setMapType('Satellite')}
              className={cn(
                "flex-1 py-1.5 text-[10px] font-bold rounded-lg transition-all",
                mapType === 'Satellite' ? "bg-slate-100 text-slate-800" : "text-slate-500"
              )}
            >
              Satellite
            </button>
          </div>
        </div>
      </div>

      <div className="flex-1 flex gap-6 min-h-0">
        {/* Left Panel: Entity List */}
        <div className="w-80 bg-white rounded-[24px] shadow-soft border border-slate-100 flex flex-col overflow-hidden">
          {activeTab === 'Drivers' && (
            <div className="p-4 border-b border-slate-50 flex gap-2">
              {['All', 'On Trip', 'Idle'].map(f => (
                <button
                  key={f}
                  onClick={() => setDriverFilter(f)}
                  className={cn(
                    "flex-1 py-1.5 text-[10px] font-bold rounded-lg border transition-all",
                    driverFilter === f ? "bg-primary/5 border-primary/20 text-primary" : "bg-slate-50 border-transparent text-slate-500 hover:bg-slate-100"
                  )}
                >
                  {f}
                </button>
              ))}
            </div>
          )}

          <div className="flex-1 overflow-y-auto p-2 space-y-1 scrollbar-hide">
            {activeTab === 'Drivers' ? (
              filteredVehicles.map(v => (
                <div
                  key={v.id}
                  onClick={() => handleEntitySelect(v.id, v.x, v.y)}
                  className={cn(
                    "p-3 rounded-xl border transition-all cursor-pointer group",
                    selectedEntityId === v.id ? "bg-primary/5 border-primary/10" : "bg-transparent border-transparent hover:bg-slate-50"
                  )}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-slate-100 overflow-hidden border border-slate-200">
                      <img src={`https://picsum.photos/seed/${v.id}/100/100`} alt="" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-bold text-slate-800 truncate">{v.driver}</p>
                      <p className="text-[10px] text-slate-500 truncate">{v.phone}</p>
                      <p className="text-[9px] text-primary font-medium">{v.model}</p>
                    </div>
                    {v.alerts.length > 0 && <ShieldAlert className="w-4 h-4 text-red-500" />}
                  </div>
                </div>
              ))
            ) : (
              filteredCustomers.map(c => (
                <div
                  key={c.id}
                  onClick={() => handleEntitySelect(c.id, c.x, c.y)}
                  className={cn(
                    "p-3 rounded-xl border transition-all cursor-pointer group",
                    selectedEntityId === c.id ? "bg-primary/5 border-primary/10" : "bg-transparent border-transparent hover:bg-slate-50"
                  )}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-slate-100 overflow-hidden border border-slate-200">
                      <img src={`https://picsum.photos/seed/${c.id}/100/100`} alt="" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-bold text-slate-800 truncate">{c.name}</p>
                      <p className="text-[10px] text-slate-500 truncate">{c.phone}</p>
                    </div>
                    {c.alerts && c.alerts.length > 0 && <AlertCircle className="w-4 h-4 text-red-500" />}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Right Panel: Map Area */}
        <div className="flex-1 bg-white rounded-[24px] shadow-soft border border-slate-100 overflow-hidden relative">
          <TransformWrapper
            ref={transformRef}
            initialScale={1}
            minScale={0.5}
            maxScale={4}
            centerOnInit
            doubleClick={{ disabled: true }}
            onTransformed={(ref) => setScale(ref.state.scale)}
          >
            {({ zoomIn, zoomOut, resetTransform }) => (
              <>
                <div className="absolute top-6 left-6 z-10 flex flex-col gap-2">
                  <div className="bg-white shadow-lg rounded-xl border border-slate-100 overflow-hidden flex flex-col">
                    <button onClick={() => zoomIn()} className="w-10 h-10 flex items-center justify-center text-slate-600 hover:text-primary hover:bg-slate-50 transition-colors border-b border-slate-50">+</button>
                    <button onClick={() => zoomOut()} className="w-10 h-10 flex items-center justify-center text-slate-600 hover:text-primary hover:bg-slate-50 transition-colors">-</button>
                  </div>
                  <button onClick={() => resetTransform()} className="w-10 h-10 bg-white shadow-lg rounded-xl flex items-center justify-center text-slate-600 hover:text-primary transition-colors border border-slate-100">
                    <Maximize2 className="w-4 h-4" />
                  </button>
                </div>

                <TransformComponent wrapperClass="!w-full !h-full cursor-grab active:cursor-grabbing">
                  <div className={cn(
                    "relative w-[1200px] h-[800px] transition-colors duration-500",
                    mapType === 'Map' ? "bg-slate-50" : "bg-slate-800"
                  )}>
                    {/* Stylized Grid Map Background */}
                    <svg width="100%" height="100%" className={cn("absolute inset-0", mapType === 'Map' ? "opacity-10" : "opacity-20")}>
                      <defs>
                        <pattern id="grid-fleet" width="60" height="60" patternUnits="userSpaceOnUse">
                          <path d="M 60 0 L 0 0 0 60" fill="none" stroke={mapType === 'Map' ? "#94a3b8" : "#475569"} strokeWidth="1" />
                        </pattern>
                      </defs>
                      <rect width="100%" height="100%" fill="url(#grid-fleet)" />

                      {/* Stylized Buildings/Features */}
                      <rect x="100" y="100" width="100" height="150" fill={mapType === 'Map' ? "#cbd5e1" : "#334155"} rx="8" />
                      <rect x="400" y="50" width="150" height="100" fill={mapType === 'Map' ? "#cbd5e1" : "#334155"} rx="8" />
                      <rect x="800" y="300" width="120" height="200" fill={mapType === 'Map' ? "#cbd5e1" : "#334155"} rx="8" />
                    </svg>

                    {/* Entity/Cluster Markers */}
                    {clusters.map((cluster, idx) => {
                      const isCluster = cluster.length > 1;
                      const representative = cluster[0];
                      const avgX = cluster.reduce((sum, v) => sum + v.x, 0) / cluster.length;
                      const avgY = cluster.reduce((sum, v) => sum + v.y, 0) / cluster.length;

                      if (isCluster) {
                        return (
                          <motion.div
                            key={`cluster-${idx}`}
                            className="absolute cursor-pointer z-20"
                            initial={false}
                            animate={{ left: avgX, top: avgY }}
                            style={{ transform: 'translate(-50%, -50%)' }}
                          >
                            <div className="w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center shadow-2xl border-4 border-white text-white font-bold text-sm">
                              {cluster.length}
                            </div>
                          </motion.div>
                        );
                      }

                      const item = representative;
                      const isSelected = selectedEntityId === item.id;
                      return (
                        <motion.div
                          key={item.id}
                          id={item.id}
                          className="absolute cursor-pointer z-10"
                          initial={false}
                          animate={{
                            left: item.x,
                            top: item.y,
                            scale: isSelected ? 1.3 : 1
                          }}
                          transition={{ type: "spring", stiffness: 100, damping: 15 }}
                          style={{ transform: 'translate(-50%, -50%)' }}
                          onClick={() => setSelectedEntityId(item.id)}
                        >
                          <div className={cn(
                            "w-10 h-10 rounded-full flex items-center justify-center shadow-lg border-2 border-white transition-colors relative",
                            activeTab === 'Drivers'
                              ? (item.status === 'On Trip' ? "bg-primary" : "bg-blue-500")
                              : "bg-amber-500"
                          )}>
                            {activeTab === 'Drivers' ? <Car className="w-5 h-5 text-white" /> : <User className="w-5 h-5 text-white" />}

                            {item.alerts && item.alerts.length > 0 && (
                              <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center border-2 border-white">
                                <ShieldAlert className="w-2 h-2 text-white" />
                              </div>
                            )}
                          </div>
                          <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 bg-white/90 backdrop-blur-sm px-2 py-0.5 rounded-full shadow-sm border border-slate-100 whitespace-nowrap">
                            <span className="text-[9px] font-bold text-slate-700">{activeTab === 'Drivers' ? item.driver : item.name}</span>
                          </div>
                        </motion.div>
                      );
                    })}

                    {/* Detail Pop-up */}
                    <AnimatePresence>
                      {selectedEntity && (
                        <motion.div
                          key={`popup-${selectedEntity.id}`}
                          initial={{ opacity: 0, scale: 0.9, y: 20 }}
                          animate={{
                            opacity: 1,
                            scale: 1,
                            y: 0,
                            left: selectedEntity.x + 30,
                            top: selectedEntity.y - 150,
                          }}
                          exit={{ opacity: 0, scale: 0.9, y: 20 }}
                          className="absolute z-30 bg-white rounded-2xl shadow-2xl border border-slate-100 w-72 overflow-hidden"
                        >
                          <div className="p-4 bg-slate-50 border-b border-slate-100 flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 rounded-full bg-white border border-slate-200 overflow-hidden">
                                <img src={`https://picsum.photos/seed/${selectedEntity.id}/100/100`} alt="" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                              </div>
                              <div>
                                <h4 className="text-sm font-bold text-slate-800">{activeTab === 'Drivers' ? selectedEntity.driver : selectedEntity.name}</h4>
                                <p className="text-[10px] text-slate-500 font-medium uppercase tracking-wider">
                                  {activeTab === 'Drivers' ? `${selectedEntity.level} • ${selectedEntity.id}` : `Customer • ${selectedEntity.id}`}
                                </p>
                              </div>
                            </div>
                            <button onClick={(e) => { e.stopPropagation(); setSelectedEntityId(null); }} className="p-1 hover:bg-slate-200 rounded-full transition-colors">
                              <X className="w-4 h-4 text-slate-400" />
                            </button>
                          </div>

                          <div className="p-4 space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                              <div className="bg-slate-50 p-2 rounded-xl border border-slate-100">
                                <p className="text-[10px] text-slate-400 font-bold uppercase mb-1">
                                  {activeTab === 'Drivers' ? 'Status' : 'Trips'}
                                </p>
                                <span className="text-xs font-bold text-slate-800">
                                  {activeTab === 'Drivers' ? selectedEntity.status : selectedEntity.trips}
                                </span>
                              </div>
                              <div className="bg-slate-50 p-2 rounded-xl border border-slate-100">
                                <p className="text-[10px] text-slate-400 font-bold uppercase mb-1">Rating</p>
                                <span className="text-xs font-bold text-slate-800 flex items-center gap-1">
                                  {activeTab === 'Drivers' ? selectedEntity.rating : '4.5'} <span className="text-yellow-400">★</span>
                                </span>
                              </div>
                            </div>

                            {activeTab === 'Drivers' && (
                              <div className="bg-slate-50 p-2 rounded-xl border border-slate-100">
                                <p className="text-[10px] text-slate-400 font-bold uppercase mb-1">Vehicle</p>
                                <p className="text-xs font-bold text-slate-800">{selectedEntity.model}</p>
                              </div>
                            )}

                            {selectedEntity.alerts && selectedEntity.alerts.length > 0 && (
                              <div className="bg-red-50 p-2 rounded-xl border border-red-100 flex items-center gap-2">
                                <ShieldAlert className="w-4 h-4 text-red-500" />
                                <span className="text-[10px] font-bold text-red-600 uppercase tracking-tight">
                                  {selectedEntity.alerts[0]}
                                </span>
                              </div>
                            )}

                            <div className="flex gap-2 pt-2">
                              {activeTab === 'Customers' ? (
                                <button
                                  onClick={() => onCustomerClick?.(selectedEntity.id)}
                                  className="flex-1 bg-primary/10 text-primary py-2 rounded-xl text-xs font-bold flex items-center justify-center gap-2 hover:bg-primary/20 transition-colors"
                                >
                                  <User className="w-3 h-3" /> View Profile
                                </button>
                              ) : (
                                <button
                                  onClick={() => onDriverClick?.(selectedEntity.id)}
                                  className="flex-1 bg-primary/10 text-primary py-2 rounded-xl text-xs font-bold flex items-center justify-center gap-2 hover:bg-primary/20 transition-colors"
                                >
                                  <Car className="w-3 h-3" /> View Profile
                                </button>
                              )}
                              <button className="flex-1 bg-primary text-white py-2 rounded-xl text-xs font-bold flex items-center justify-center gap-2 hover:bg-primary/90 transition-colors">
                                <Phone className="w-3 h-3" /> Call
                              </button>
                              <button className="flex-1 bg-slate-100 text-slate-700 py-2 rounded-xl text-xs font-bold flex items-center justify-center gap-2 hover:bg-slate-200 transition-colors">
                                <MessageSquare className="w-3 h-3" /> Chat
                              </button>
                            </div>
                          </div>
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
    </div>
  );
};
