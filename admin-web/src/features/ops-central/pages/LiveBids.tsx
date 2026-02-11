import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const LiveBids: React.FC = () => {
    const navigate = useNavigate();
    const [selectedCity, setSelectedCity] = useState('Harare');
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const cities = ['All Cities', 'Harare', 'Bulawayo'];

    return (
        <div className="flex-1 flex flex-col h-full overflow-hidden bg-background-light dark:bg-zinc-950 text-slate-900 dark:text-zinc-100 font-display">
            {/* Sub-header for Bidding Status */}
            <div className="h-14 border-b border-primary/20 bg-background-light dark:bg-zinc-900/80 backdrop-blur-md flex items-center justify-between px-6 shrink-0 font-display">
                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2 bg-primary/10 px-3 py-1.5 rounded-full border border-primary/20">
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                        </span>
                        <span className="text-[10px] uppercase font-bold tracking-widest text-primary">Bidding Engine: Active</span>
                    </div>
                </div>
                <div className="flex items-center gap-6">
                    <div className="flex flex-col items-end text-[10px] font-bold uppercase tracking-wider">
                        <span className="text-slate-400">Exchange Rate</span>
                        <span className="text-primary">1 USD = 13.9 ZiG</span>
                    </div>
                    <div className="h-6 w-px bg-primary/20"></div>
                    <div className="flex items-center gap-2">
                        <span className="material-icons text-primary text-sm">sensors</span>
                        <span className="text-[10px] font-bold text-primary uppercase">Live Feeds: 24</span>
                    </div>
                </div>
            </div>

            <main className="flex-1 flex overflow-hidden font-display">
                {/* Active Bidding Sessions Sidebar */}
                <aside className="w-[400px] min-w-[400px] flex flex-col border-r border-primary/10 bg-white/5 dark:bg-zinc-900/40">
                    <div className="p-5 pb-3 flex items-center justify-between">
                        <div>
                            <h2 className="text-base font-bold flex items-center gap-2">
                                Active Bidding Sessions
                                <span className="bg-primary text-black text-[10px] px-2 py-0.5 rounded-full">24</span>
                            </h2>
                            <p className="text-[10px] text-slate-500 mt-0.5 font-medium uppercase tracking-tight">Real-time driver auctions in progress</p>
                        </div>
                        <button className="p-2 rounded bg-primary/10 hover:bg-primary/20 text-primary transition-colors">
                            <span className="material-icons text-sm">tune</span>
                        </button>
                    </div>

                    <div className="flex-1 overflow-y-auto custom-scrollbar px-5 space-y-4 pb-10">
                        {/* Critical Session */}
                        <div className="bg-background-light dark:bg-zinc-800/40 border border-primary/10 rounded-2xl p-4 hover:border-primary/40 transition-all group relative overflow-hidden">
                            <div className="absolute top-0 right-0 p-2">
                                <span className="text-[10px] font-bold text-red-500 bg-red-500/10 px-2 py-0.5 rounded border border-red-500/20">CRITICAL</span>
                            </div>
                            <div className="flex justify-between items-start mb-3">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                                        <span className="material-icons text-primary">hail</span>
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-sm tracking-tight text-slate-900 dark:text-white">Avondale → Harare CBD</h3>
                                        <p className="text-[10px] text-slate-400 font-medium tracking-tight">ID: #B-99201 • 2.4km away</p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <div className="text-[10px] font-bold tracking-widest text-slate-500 mb-0.5">ENDS IN</div>
                                    <div className="text-lg font-mono font-bold text-red-500 leading-none">00:12s</div>
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4 bg-black/20 rounded-lg p-3 mb-4">
                                <div>
                                    <p className="text-[10px] text-slate-500 uppercase font-bold tracking-wider mb-1">Rider Offer</p>
                                    <p className="text-base font-bold text-slate-900 dark:text-white">$4.50 <span className="text-[10px] text-slate-400 font-normal">/ 62.5 ZiG</span></p>
                                </div>
                                <div className="border-l border-primary/10 pl-4">
                                    <p className="text-[10px] text-primary uppercase font-bold tracking-wider mb-1">High Bid</p>
                                    <p className="text-base font-bold text-primary">$6.00 <span className="text-[10px] text-primary/70 font-normal">/ 83.4 ZiG</span></p>
                                </div>
                            </div>
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <div className="flex -space-x-2">
                                        {[1, 2].map(i => (
                                            <div key={i} className="w-6 h-6 rounded-full border-2 border-zinc-900 bg-slate-800 flex items-center justify-center text-[8px] font-bold text-white uppercase">DR</div>
                                        ))}
                                        <div className="w-6 h-6 rounded-full border-2 border-zinc-900 bg-slate-800 flex items-center justify-center text-[8px] font-bold text-primary">7+</div>
                                    </div>
                                    <span className="text-[10px] font-bold text-slate-400 tracking-tight">9 drivers bidding</span>
                                </div>
                                <button
                                    onClick={() => navigate('/bids/88291-ZB')}
                                    className="bg-primary hover:bg-primary/80 text-black text-[10px] font-bold px-3 py-1.5 rounded-lg transition-all transform active:scale-95 uppercase tracking-wider"
                                >
                                    VIEW DETAILS
                                </button>
                            </div>
                        </div>

                        {/* Additional Sessions */}
                        {[
                            { from: "Borrowdale", to: "Sam Levy", id: "#B-99205", dist: "0.8km", offer: "$12.00", bid: "$15.50", zigOffer: "166.8", zigBid: "215.4", time: "02:45s", drivers: 4, icon: "local_taxi" },
                            { from: "Delivery: Msasa Industrial", id: "#D-77281", dist: "4.1km", offer: "$8.00", bid: "$8.00", zigOffer: "111.2", zigBid: "111.2", time: "05:10s", drivers: 1, icon: "shopping_bag" }
                        ].map((s, i) => (
                            <div key={i} className={`bg-background-light dark:bg-zinc-800/40 border border-primary/10 rounded-2xl p-4 hover:border-primary/40 transition-all group ${s.drivers === 1 ? 'opacity-80' : ''}`}>
                                <div className="flex justify-between items-start mb-3">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                                            <span className="material-icons text-primary">{s.icon}</span>
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-sm text-slate-900 dark:text-white">{s.from}{s.to ? ` → ${s.to}` : ''}</h3>
                                            <p className="text-[10px] text-slate-400 font-medium">ID: {s.id} • {s.dist} away</p>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <div className="text-[10px] font-bold tracking-widest text-slate-500 mb-0.5 uppercase">ENDS IN</div>
                                        <div className="text-lg font-mono font-bold text-primary leading-none">{s.time}</div>
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-4 bg-black/20 rounded-lg p-3 mb-4">
                                    <div>
                                        <p className="text-[10px] text-slate-500 uppercase font-bold tracking-wider mb-1">Offer</p>
                                        <p className="text-base font-bold text-slate-900 dark:text-white">{s.offer}</p>
                                    </div>
                                    <div className="border-l border-primary/10 pl-4">
                                        <p className="text-[10px] text-primary uppercase font-bold tracking-wider mb-1">High Bid</p>
                                        <p className="text-base font-bold text-primary">{s.bid}</p>
                                    </div>
                                </div>
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <div className="flex -space-x-2">
                                            <div className="w-6 h-6 rounded-full border-2 border-zinc-900 bg-slate-800 flex items-center justify-center text-[8px] font-bold text-white uppercase">KM</div>
                                        </div>
                                        <span className="text-[10px] font-bold text-slate-400">{s.drivers} driver{s.drivers > 1 ? 's' : ''} bidding</span>
                                    </div>
                                    <button
                                        onClick={() => navigate(`/bids/${s.id.replace('#', '')}`)}
                                        className="bg-primary/20 hover:bg-primary text-primary hover:text-black border border-primary/30 text-[10px] font-bold px-3 py-1.5 rounded-lg transition-all tracking-wider uppercase"
                                    >
                                        VIEW DETAILS
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </aside>

                {/* Map Section */}
                <section className="flex-1 relative bg-zinc-950">
                    <div className="absolute inset-0 z-0 overflow-hidden">
                        <div
                            className="w-full h-full bg-[url('https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=2000&auto=format&fit=crop')] bg-cover bg-center opacity-40 grayscale contrast-125"
                        />
                        <div className="absolute inset-0 bg-gradient-to-r from-zinc-950 via-transparent to-transparent"></div>
                        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/80 via-transparent to-transparent"></div>

                        {/* Animated Markers for Live Bids */}
                        <div className="absolute top-[30%] left-[45%]">
                            <div className="relative flex items-center justify-center">
                                <div className="absolute h-4 w-4 bg-red-500 rounded-full animate-pulse-red"></div>
                                <div className="relative h-2 w-2 bg-red-600 rounded-full"></div>
                                <div className="absolute -top-12 left-1/2 -translate-x-1/2 bg-zinc-900/90 border border-red-500/30 px-2 py-1 rounded shadow-lg whitespace-nowrap">
                                    <p className="text-[10px] font-bold text-red-500 uppercase tracking-tighter">PENDING BID $6.00</p>
                                </div>
                            </div>
                        </div>

                        <div className="absolute top-[55%] left-[65%]">
                            <div className="relative flex items-center justify-center">
                                <div className="absolute h-3 w-3 bg-primary rounded-full opacity-50"></div>
                                <div className="relative h-2 w-2 bg-primary rounded-full"></div>
                                <div className="absolute -top-12 left-1/2 -translate-x-1/2 bg-zinc-900/90 border border-primary/30 px-2 py-1 rounded shadow-lg whitespace-nowrap">
                                    <p className="text-[10px] font-bold text-primary uppercase tracking-tighter">ACTIVE RIDE - KM552</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="absolute top-6 left-6 right-6 z-10 flex justify-between items-start pointer-events-none">
                        <div className="flex gap-2 pointer-events-auto">
                            <div className="relative">
                                <button
                                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                                    className="bg-zinc-950/80 backdrop-blur-md border border-primary/20 rounded-xl px-4 py-2 flex items-center gap-3 shadow-2xl text-primary font-bold text-xs uppercase tracking-wider transition-all hover:border-primary/50"
                                >
                                    <span className="material-icons text-sm">location_on</span>
                                    {selectedCity}
                                    <span className="material-icons text-sm transition-transform duration-200" style={{ transform: isDropdownOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}>expand_more</span>
                                </button>

                                {isDropdownOpen && (
                                    <div className="absolute top-full mt-2 w-48 bg-zinc-950 border border-primary/20 rounded-xl shadow-2xl py-2 z-50 overflow-hidden backdrop-blur-xl">
                                        {cities.map((city) => (
                                            <button
                                                key={city}
                                                onClick={() => {
                                                    setSelectedCity(city);
                                                    setIsDropdownOpen(false);
                                                }}
                                                className={`w-full text-left px-4 py-2.5 text-[10px] font-bold uppercase tracking-widest transition-colors ${selectedCity === city
                                                    ? 'bg-primary text-black'
                                                    : 'text-slate-400 hover:bg-primary/10 hover:text-primary'
                                                    }`}
                                            >
                                                {city}
                                            </button>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="flex flex-col gap-3 pointer-events-auto items-end">
                            <div className="bg-zinc-950/80 backdrop-blur-md border border-primary/20 rounded-2xl p-4 w-56 shadow-2xl">
                                <h4 className="text-[9px] font-bold text-slate-500 uppercase tracking-widest mb-3 leading-none underline decoration-primary/30 underline-offset-4">Live Fleet Stats</h4>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <p className="text-xl font-bold text-primary leading-none mb-1">142</p>
                                        <p className="text-[8px] text-slate-500 font-bold uppercase tracking-wider">Active Rides</p>
                                    </div>
                                    <div>
                                        <p className="text-xl font-bold text-white leading-none mb-1">48</p>
                                        <p className="text-[8px] text-slate-500 font-bold uppercase tracking-wider">Idle Drivers</p>
                                    </div>
                                </div>
                                <div className="mt-4 pt-4 border-t border-primary/10">
                                    <div className="flex justify-between items-center text-[8px] font-bold mb-1.5">
                                        <span className="text-slate-500 uppercase">System Capacity</span>
                                        <span className="text-primary">82%</span>
                                    </div>
                                    <div className="w-full h-1 bg-primary/10 rounded-full overflow-hidden">
                                        <div className="w-[82%] h-full bg-primary shadow-[0_0_8px_#00ff90]"></div>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-zinc-950/80 backdrop-blur-md border border-primary/20 rounded-xl p-2.5 flex flex-col gap-2.5 shadow-2xl">
                                <div className="flex items-center gap-2.5 px-1">
                                    <div className="w-2 h-2 rounded-full bg-primary"></div>
                                    <span className="text-[9px] font-bold text-slate-300 uppercase tracking-wider">Active Ride</span>
                                </div>
                                <div className="flex items-center gap-2.5 px-1">
                                    <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></div>
                                    <span className="text-[9px] font-bold text-slate-300 uppercase tracking-wider">Live Bid</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Map Controls */}
                    <div className="absolute bottom-6 right-6 z-10 flex flex-col gap-2 pointer-events-auto">
                        {['add', 'remove', 'my_location'].map(icon => (
                            <button key={icon} className="w-10 h-10 bg-zinc-950 border border-primary/20 text-primary rounded-xl flex items-center justify-center hover:bg-primary hover:text-black transition-all shadow-xl group">
                                <span className="material-icons text-xl group-hover:scale-110 transition-transform">{icon}</span>
                            </button>
                        ))}
                    </div>
                </section>
            </main>

            {/* Notice Footer */}
            <footer className="h-10 bg-primary flex items-center justify-between px-6 shrink-0 z-20 font-display">
                <div className="flex items-center gap-6">
                    <div className="flex items-center gap-2">
                        <span className="material-icons text-black text-xs font-bold animate-pulse">notification_important</span>
                        <span className="text-[9px] font-black text-black uppercase tracking-[0.05em]">System Notice: Heavy traffic detected in CBD North - Dynamic pricing automated</span>
                    </div>
                    <div className="h-4 w-px bg-black/20"></div>
                    <div className="text-[9px] font-black text-black uppercase tracking-[0.05em]">Server Latency: 42ms</div>
                </div>
                <div className="flex items-center gap-4">
                    <span className="text-[9px] font-black text-black uppercase tracking-[0.05em]">© 2026 DashDrive Ops v2.4.1</span>
                </div>
            </footer>
        </div>
    );
};

export default LiveBids;
