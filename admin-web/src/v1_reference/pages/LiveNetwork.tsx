import {
    Activity,
    AlertTriangle,
    Bell,
    ChevronDown,
    Clock,
    Compass,
    Filter,
    LayoutDashboard,
    MapPin,
    Search,
    Settings,
    ShieldAlert,
    Truck,
    ZoomIn
} from 'lucide-react';
import React, { useState } from 'react';

const trips = [
    { id: '#TRP-88219', status: 'BIDDING', rider: 'Alex Johnson', rating: '4.9★', bids: 5, current: '$14.50', offer: '$12.00', color: 'blue' },
    { id: '#TRP-88210', status: 'PICKUP DELAYED', rider: 'Sarah Miller', rating: '4.7★', bids: 0, current: '$22.00', offer: 'Closed', color: 'amber' },
    { id: '#TRP-88288', status: 'EN ROUTE', rider: 'Tom Higgins', rating: '5.0★', bids: 0, current: '$18.50', offer: 'Arriving in 4m', color: 'emerald' },
    { id: '#TRP-88281', status: 'COMPLETED', rider: 'Jason Wu', rating: '4.8★', bids: 0, current: '$12.00', offer: 'Closed', color: 'gray' },
];

export const LiveNetwork: React.FC = () => {
    const [selectedTrip, setSelectedTrip] = useState(trips[0]);

    return (
        <div className="flex h-[calc(100vh-100px)] -m-10 bg-[#0a0f18] text-white overflow-hidden font-uber">
            {/* Sidebar Branding (Mini) */}
            <div className="w-[80px] border-r border-white/5 flex flex-col items-center py-10 gap-10 bg-[#0a0f18] z-20">
                <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center shadow-2xl shadow-blue-600/30">
                    <ShieldAlert className="text-white" size={24} />
                </div>
                <div className="flex flex-col gap-8 text-gray-500">
                    <LayoutDashboard size={24} className="cursor-pointer hover:text-white transition-colors" />
                    <Compass size={24} className="text-blue-500" />
                    <Activity size={24} className="cursor-pointer hover:text-white transition-colors" />
                    <Clock size={24} className="cursor-pointer hover:text-white transition-colors" />
                </div>
                <div className="mt-auto flex flex-col items-center gap-6">
                    <Settings size={24} className="text-gray-600" />
                    <div className="w-10 h-10 rounded-full bg-blue-600/20 flex items-center justify-center border border-blue-500/20">
                        <Activity size={20} className="text-blue-500" />
                    </div>
                </div>
            </div>

            {/* Main Content Area */}
            <div className="flex-1 flex flex-col overflow-hidden bg-[#0d131f]">
                {/* Header */}
                <header className="h-24 px-10 border-b border-white/5 flex items-center justify-between bg-[#0a0f18]">
                    <div className="flex items-center gap-6">
                        <div className="flex items-center gap-3">
                            <h1 className="text-2xl font-bold tracking-tight">SafeOps <span className="text-blue-500">Monitor</span></h1>
                            <div className="flex items-center gap-2 px-3 py-1 bg-emerald-500/10 rounded-full border border-emerald-500/10">
                                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                                <span className="text-[9px] font-black text-emerald-500 uppercase tracking-widest">System Live</span>
                            </div>
                        </div>

                        <div className="h-8 w-px bg-white/5 ml-4" />

                        <div className="flex items-center gap-10 ml-8">
                            <div className="space-y-0.5">
                                <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">Active Rides</p>
                                <p className="text-lg font-bold text-blue-500">1,284</p>
                            </div>
                            <div className="space-y-0.5">
                                <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">In Negotiation</p>
                                <p className="text-lg font-bold text-amber-500">342</p>
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center gap-6">
                        <div className="relative group">
                            <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-blue-500 transition-colors" size={16} />
                            <input
                                type="text"
                                placeholder="Search Trip ID, Rider or Driver..."
                                className="w-[300px] bg-white/5 border border-transparent focus:border-blue-500/30 rounded-2xl py-3 pl-12 pr-6 text-xs outline-none transition-all font-medium placeholder:text-gray-600"
                            />
                        </div>
                        <button className="flex items-center gap-3 px-5 py-3 bg-white/5 rounded-xl border border-white/5 text-[10px] font-black uppercase tracking-widest text-gray-400 hover:text-white transition-all">
                            <Filter size={14} /> Filters
                        </button>
                        <button className="flex items-center gap-3 px-5 py-3 bg-white/5 rounded-xl border border-white/5 text-[10px] font-black uppercase tracking-widest text-gray-400 hover:text-white transition-all">
                            All Cities <ChevronDown size={14} />
                        </button>
                        <button className="relative p-2.5 bg-white/5 rounded-xl text-gray-400 hover:text-white transition-all">
                            <Bell size={20} />
                            <span className="absolute top-2 right-2 w-2 h-2 bg-rose-500 rounded-full border-2 border-[#0a0f18]" />
                        </button>
                    </div>
                </header>

                <div className="flex-1 flex overflow-hidden">
                    {/* Left: Trip List & Log */}
                    <div className="flex-1 flex flex-col border-r border-white/5 overflow-hidden">
                        <div className="flex-1 overflow-y-auto custom-scrollbar p-10">
                            <table className="w-full text-left">
                                <thead className="text-[10px] font-black text-gray-500 uppercase tracking-widest border-b border-white/5">
                                    <tr>
                                        <th className="px-6 py-6 font-black uppercase tracking-[0.2em] opacity-50">Trip ID</th>
                                        <th className="px-6 py-6 font-black uppercase tracking-[0.2em] opacity-50">Status</th>
                                        <th className="px-6 py-6 font-black uppercase tracking-[0.2em] opacity-50">Participants</th>
                                        <th className="px-6 py-6 font-black uppercase tracking-[0.2em] opacity-50">Negotiation Status</th>
                                        <th className="px-6 py-6 font-black uppercase tracking-[0.2em] opacity-50">Current Bid</th>
                                        <th className="px-6 py-6 text-right font-black uppercase tracking-[0.2em] opacity-50">Action</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-white/5">
                                    {trips.map(trip => (
                                        <TripRow
                                            key={trip.id}
                                            trip={trip}
                                            isSelected={selectedTrip.id === trip.id}
                                            onClick={() => setSelectedTrip(trip)}
                                        />
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        {/* Bottom Log & Small Map */}
                        <div className="h-[400px] border-t border-white/10 flex bg-[#0a0f18]/50 overflow-hidden">
                            {/* Small Map */}
                            <div className="w-[350px] relative border-r border-white/5 group">
                                <img src="https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=1000&auto=format&fit=crop" className="w-full h-full object-cover grayscale brightness-50 contrast-125 opacity-40 group-hover:opacity-60 transition-all duration-700" alt="Map" />
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <div className="bg-zinc-950/80 backdrop-blur-md p-4 rounded-2xl border border-white/10 text-center shadow-2xl">
                                        <MapPin className="text-blue-500 mx-auto mb-2" size={20} />
                                        <p className="text-[10px] font-black uppercase tracking-widest">Current Location</p>
                                        <p className="text-[9px] text-gray-500 mt-1 font-medium italic">5th Ave, NY • 40.7128° N</p>
                                    </div>
                                </div>
                                <div className="absolute bottom-6 left-6 flex gap-2">
                                    <button className="p-2 bg-zinc-950/80 rounded-lg border border-white/10"><Compass size={14} /></button>
                                    <button className="p-2 bg-zinc-950/80 rounded-lg border border-white/10"><ZoomIn size={14} /></button>
                                </div>
                            </div>

                            {/* Negotiation Log */}
                            <div className="flex-1 flex flex-col overflow-hidden bg-[#0d131f]/30">
                                <div className="p-8 border-b border-white/5 flex items-center justify-between">
                                    <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 flex items-center gap-3">
                                        Negotiation Log <span className="text-white opacity-40">•</span> <span className="text-white">Trip {selectedTrip.id}</span>
                                    </h4>
                                    <span className="text-[9px] font-black text-blue-500 uppercase tracking-widest">Live Updates</span>
                                </div>
                                <div className="flex-1 overflow-y-auto p-10 space-y-8 custom-scrollbar">
                                    <LogItem
                                        role="Rider (Alex)"
                                        msg="Looking for a ride to JFK airport. My budget is $12."
                                        time="14:02:11"
                                    />
                                    <LogItem
                                        role="Driver (Mike)"
                                        msg="I can do it for $15. Traffic is heavy right now."
                                        time="14:02:25"
                                        align="right"
                                    />
                                    <LogItem
                                        role="Driver (Sara)"
                                        msg="I'm 2 mins away. $14.50 is my offer."
                                        time="14:02:40"
                                        align="right"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Side: Alerts & Rapid Response */}
                    <div className="w-[450px] flex flex-col bg-[#0a0f18]">
                        <div className="p-10 flex-1 overflow-y-auto custom-scrollbar space-y-12">
                            <div className="flex items-center justify-between">
                                <h3 className="text-[11px] font-black uppercase tracking-[0.2em] text-gray-500 flex items-center gap-3">
                                    <ShieldAlert className="text-rose-500" size={16} />
                                    Emergency Alerts
                                </h3>
                                <span className="px-3 py-1 bg-rose-500 text-white rounded-lg text-[10px] font-black tracking-widest animate-pulse">3 ACTIVE</span>
                            </div>

                            <div className="space-y-6">
                                <AlertCard
                                    title="SOS TRIGGERED"
                                    time="0m ago"
                                    content="Trip #88241. Driver: John Doe • Rider: Maria K. SOS button pressed by Rider. Vehicle stopped unexpectedly on Broadway Ave."
                                    actions={['Call Rider', 'Dispatch']}
                                    type="critical"
                                />
                                <AlertCard
                                    title="ROUTE DEVIATION"
                                    time="4m ago"
                                    content="Trip #88220. Driver: Liam N. Vehicle is 2.5km off-route. No response to automated system ping."
                                    actions={['Intervene', 'Dismiss']}
                                    type="warning"
                                />
                                <AlertCard
                                    title="LOGIN ANOMALY"
                                    time="12m ago"
                                    content="System Flag. Driver: Elena V. Driver logged in from new device with different biometric profile signature."
                                    type="info"
                                />
                            </div>

                            <div className="pt-10 border-t border-white/5">
                                <h4 className="text-[11px] font-black uppercase tracking-[0.2em] text-gray-500 mb-8">Rapid Response Contacts</h4>
                                <div className="space-y-4">
                                    <ContactItem label="Emergency Services" value="911" color="text-rose-500" />
                                    <ContactItem label="Legal Dept." value="Ext. 402" color="text-blue-500" />
                                </div>
                            </div>
                        </div>

                        {/* Footer Status */}
                        <div className="p-8 border-t border-white/5 bg-[#070b14] flex items-center justify-between">
                            <div className="flex gap-8">
                                <StatusDot label="Data Stream" status="Stable" />
                                <StatusDot label="Latency" status="42ms" />
                            </div>
                            <p className="text-[9px] text-gray-700 font-bold uppercase tracking-widest">© 2024 SafeOps Global</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const TripRow = ({ trip, isSelected, onClick }: any) => (
    <tr
        onClick={onClick}
        className={`group transition-all cursor-pointer ${isSelected ? 'bg-blue-600/5' : 'hover:bg-white/[0.02]'}`}
    >
        <td className="px-6 py-6 font-bold text-blue-500 text-sm tracking-tight">{trip.id}</td>
        <td className="px-6 py-6">
            <div className="flex items-center gap-3">
                <div className={`w-2 h-2 rounded-full ${trip.color === 'blue' ? 'bg-blue-500 animate-pulse' :
                    trip.color === 'amber' ? 'bg-amber-500' :
                        trip.color === 'emerald' ? 'bg-emerald-500' : 'bg-gray-500'}`} />
                <span className={`text-[9px] font-black tracking-widest uppercase ${trip.color === 'blue' ? 'text-blue-400' :
                    trip.color === 'amber' ? 'text-amber-500' :
                        trip.color === 'emerald' ? 'text-emerald-500' : 'text-gray-500'}`}>
                    {trip.status}
                </span>
            </div>
        </td>
        <td className="px-6 py-6">
            <div>
                <span className="text-sm font-bold block bg-gradient-to-r from-gray-200 to-gray-400 bg-clip-text text-transparent">{trip.rider}</span>
                <span className="text-[9px] text-gray-600 font-black tracking-widest uppercase mt-0.5">Rider • {trip.rating}</span>
            </div>
        </td>
        <td className="px-6 py-6 text-xs text-gray-500 font-medium">
            {trip.bids > 0 ? (
                <div className="flex items-center gap-3">
                    <div className="flex -space-x-2">
                        {[1, 2, 3].map(i => (
                            <div key={i} className="w-7 h-7 rounded-full border-2 border-[#0a0f18] bg-zinc-800 flex items-center justify-center text-[10px] font-black text-blue-400">
                                <Truck size={12} />
                            </div>
                        ))}
                    </div>
                    <span className="text-gray-400 font-bold text-[11px]">{trip.bids} Active Bids</span>
                </div>
            ) : (
                <span className="opacity-40">Negotiation Closed</span>
            )}
        </td>
        <td className="px-6 py-6">
            <span className="text-sm font-bold block">{trip.current}</span>
            <span className="text-[9px] text-gray-600 font-black tracking-widest uppercase opacity-60">Offer: {trip.offer}</span>
        </td>
        <td className="px-6 py-6 text-right">
            <button className="text-[10px] font-black text-blue-500 uppercase tracking-widest hover:underline px-4">View Logs</button>
        </td>
    </tr>
);

const LogItem = ({ role, msg, time, align }: any) => (
    <div className={`flex flex-col ${align === 'right' ? 'items-end' : 'items-start'}`}>
        <div className={`max-w-[80%] p-6 rounded-[25px] ${align === 'right' ? 'bg-blue-600/10 border border-blue-500/20 rounded-tr-none' : 'bg-white/5 border border-white/5 rounded-tl-none'}`}>
            <p className="text-[10px] font-black uppercase tracking-widest text-blue-500 mb-2 truncate">{role}</p>
            <p className="text-xs font-medium text-gray-300 leading-relaxed italic">"{msg}"</p>
            <p className="text-[9px] text-gray-600 font-medium mt-3 font-mono opacity-50">{time}</p>
        </div>
    </div>
);

const AlertCard = ({ title, time, content, actions, type }: any) => (
    <div className={`p-8 rounded-[30px] border relative overflow-hidden bg-gradient-to-br transition-all flex flex-col gap-6 ${type === 'critical' ? 'from-rose-500/10 to-transparent border-rose-500/20 shadow-2xl shadow-rose-500/10' :
        type === 'warning' ? 'from-amber-500/10 to-transparent border-amber-500/20 shadow-xl shadow-amber-500/5' :
            'from-white/5 to-transparent border-white/5'
        }`}>
        <div className="flex items-center justify-between">
            <h5 className={`text-[11px] font-black tracking-[0.1em] ${type === 'critical' ? 'text-rose-500' : type === 'warning' ? 'text-amber-500' : 'text-gray-400'}`}>{title}</h5>
            <span className="text-[10px] text-gray-600 font-bold uppercase tracking-widest">{time}</span>
        </div>

        <p className="text-[11px] text-gray-400 font-medium leading-relaxed italic">
            {content}
        </p>

        {actions && (
            <div className="flex gap-4 pt-2">
                {actions.map((action: string) => (
                    <button
                        key={action}
                        className={`flex-1 py-3 rounded-xl font-bold text-[10px] uppercase tracking-widest transition-all ${type === 'critical' ? 'bg-rose-500/20 text-rose-500 hover:bg-rose-500 hover:text-white' :
                            'border border-white/10 text-gray-400 hover:bg-white/5 hover:text-white'
                            }`}
                    >
                        {action}
                    </button>
                ))}
            </div>
        )}

        {type === 'critical' && <div className="absolute top-4 right-4"><AlertTriangle className="text-rose-500 animate-pulse" size={16} /></div>}
    </div>
);

const ContactItem = ({ label, value, color }: any) => (
    <div className="flex items-center justify-between p-5 bg-white/5 border border-white/5 rounded-2xl group cursor-pointer hover:border-white/10 transition-all">
        <span className="text-xs font-bold text-gray-400 group-hover:text-white transition-colors">{label}</span>
        <span className={`text-sm font-black tracking-widest ${color}`}>{value}</span>
    </div>
);

const StatusDot = ({ label, status }: any) => (
    <div className="flex items-center gap-3">
        <span className="text-[9px] font-black text-gray-600 uppercase tracking-widest">{label}:</span>
        <span className="text-[9px] font-black text-blue-500 uppercase tracking-widest">{status}</span>
    </div>
);

export default LiveNetwork;
