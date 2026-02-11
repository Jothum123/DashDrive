import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';

export const LiveBidDetail: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();

    // Mock data based on the image
    const drivers = [
        {
            name: "Farai K.",
            car: "Toyota Corolla (2018)",
            dist: "1.2 km",
            time: "~ 4 MINS AWAY",
            rating: "4.9",
            bid: "$14.50",
            lastUpdate: "2 mins ago",
            avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuBB9j7JMGc3B_8jbEBKqpt-DbOilSsi8u1_khrbRYXrSqjDz9g5oqVkGwWnBCpLjU3ivH_EQcGSQUAJR8UKjZIfO8F7ZPd8kumw4GI6KWqF42dmXGCcxkKhSGFPJ-7ZFa64w82ME_CPLEHrcfuXDadPhxHUJWTkbzYH2c_v-BUYwUZMeIGYQKmFR8I-ax7TdB5BDOdbKLiHGUru7CBFrkLBzOpfvOUGJDRXKTiRgC_q7iQ_eujEQ4GtVpikaD-NnY2y4-7k5N7sEmwo"
        },
        {
            name: "Mercy Z.",
            car: "Honda Fit (2020)",
            dist: "0.8 km",
            time: "~ 2 MINS AWAY",
            rating: "4.7",
            bid: "$16.00",
            trending: true,
            avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuAAYdTYmKKsyhWpNthpN9PsiqLgk372qcebjStEsZ1L4TCK9RUv02qi41Nxmq25pH99YO1QbEysISz33DM93po_ZessoVZnx1JmXZGQ-DW5mXJUhArflEIHxYonN5UzGmvnFryy4rDoioPADIjiIkAEvTum67RIBA4OH3Kx6zN1-99c49_znUQ9T1p0CDDNzjtJxpTIOt-7jEc7uwXW3-M2QYtvnPiKckQVHl3yW0-FmT9r2bro597Wx6Yme6g9fIaiADfw14Qmh4LR"
        },
        {
            name: "Gift O.",
            car: "VW Polo (2015)",
            dist: "4.5 km",
            time: "~ 12 MINS AWAY",
            rating: "4.2",
            bid: "...",
            avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuBaonjLzI3O2zN_r8YQ8Y0P8H1X5R4yT7yL8XQ"
        }
    ];

    return (
        <div className="flex-1 flex flex-col min-w-0 h-full overflow-y-auto bg-[#0a120b] font-display transition-colors text-white">
            {/* Header */}
            <header className="px-8 py-4 flex items-center justify-between border-b border-white/5 bg-[#0a120b] sticky top-0 z-50">
                <div className="flex items-center gap-4">
                    <button
                        onClick={() => navigate('/bids')}
                        className="w-10 h-10 bg-primary/10 hover:bg-primary text-primary hover:text-black rounded-lg flex items-center justify-center transition-all group"
                    >
                        <span className="material-icons text-xl group-hover:-translate-x-1 transition-transform">arrow_back</span>
                    </button>
                    <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                        <span className="material-icons text-black text-2xl">grid_view</span>
                    </div>
                    <div>
                        <h1 className="text-sm font-black tracking-tight text-white uppercase">Admin Control</h1>
                        <p className="text-[10px] font-black text-primary uppercase tracking-widest leading-none">Live Negotiation Monitor</p>
                    </div>
                </div>

                <div className="flex items-center gap-8">
                    {/* Items removed per request */}
                </div>
            </header>

            <main className="p-8 space-y-8 max-w-[1600px] mx-auto w-full">
                {/* Top Section Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Console Card */}
                    <div className="lg:col-span-2 bg-[#0d1a0e] border border-white/5 rounded-3xl p-8 relative overflow-hidden">
                        <div className="flex justify-between items-start mb-12">
                            <div>
                                <div className="flex items-center gap-2 mb-2">
                                    <span className="bg-primary text-black text-[9px] font-black px-1.5 py-0.5 rounded uppercase tracking-tighter">Session #{id || "88291-ZB"}</span>
                                    <span className="text-slate-400 text-[9px] font-bold uppercase tracking-wider">• Active for 4m 12s</span>
                                </div>
                                <h2 className="text-3xl font-black flex items-center gap-4 tracking-tight text-white uppercase">
                                    Harare CBD
                                    <span className="material-icons text-primary text-2xl">trending_flat</span>
                                    Borrowdale Village
                                </h2>
                            </div>
                            <div className="text-right">
                                <p className="text-[8px] text-slate-500 font-black uppercase tracking-widest mb-1">Current Status</p>
                                <span className="px-3 py-1 bg-yellow-500/10 text-yellow-500 rounded-full text-[10px] font-black border border-yellow-500/20 italic uppercase tracking-tighter shadow-[0_0_15px_rgba(234,179,8,0.1)]">Price War Active</span>
                            </div>
                        </div>

                        <div className="flex justify-between items-end mb-12 text-center">
                            <div className="flex-1">
                                <p className="text-[10px] text-slate-500 font-black uppercase tracking-widest mb-2">Rider's Offer</p>
                                <p className="text-5xl font-black text-white">$12.00</p>
                                <p className="text-[9px] text-primary font-black uppercase tracking-tight mt-1">Lowest Limit</p>
                            </div>
                            <div className="flex-1 pb-2">
                                <p className="text-[10px] text-slate-500 font-black uppercase tracking-widest mb-1">Market Gap</p>
                                <p className="text-3xl font-black text-primary">+$4.50</p>
                            </div>
                            <div className="flex-1">
                                <p className="text-[10px] text-slate-500 font-black uppercase tracking-widest mb-2">High Driver Bid</p>
                                <p className="text-5xl font-black text-red-500">$18.50</p>
                                <p className="text-[9px] text-red-500 font-black uppercase tracking-tight mt-1">Ceiling Reached</p>
                            </div>
                        </div>

                        {/* Tug of War Gauge */}
                        <div className="relative h-4 bg-zinc-900 rounded-full p-0.5 border border-white/5 mb-8">
                            <div className="h-full rounded-full bg-gradient-to-r from-primary via-yellow-500 to-red-500 w-[65%] shadow-[0_0_20px_rgba(0,255,144,0.1)]"></div>
                            {/* Pin */}
                            <div className="absolute left-[65%] top-1/2 -translate-y-1/2 -translate-x-1/2 h-14 w-[3px] bg-white shadow-[0_0_15px_white] z-20">
                                <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-white text-black text-[9px] font-black px-2 py-0.5 rounded uppercase tracking-tighter">Current</div>
                                <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-white rotate-45"></div>
                            </div>
                            {/* Ghost bar track */}
                            <div className="absolute inset-0 bg-white/5 rounded-full -z-10"></div>
                        </div>

                        <div className="flex justify-between items-center text-[10px] font-black text-slate-500 uppercase tracking-widest pt-4 border-t border-white/5">
                            <div className="flex items-center gap-2">
                                <span className="material-icons text-sm">person</span>
                                <span>Tendayi M. (Rider)</span>
                            </div>
                            <div className="flex items-center gap-1.5">
                                <span>5 Active Driver Counters</span>
                                <span className="material-icons text-sm">bolt</span>
                            </div>
                        </div>
                    </div>

                    {/* Right Stacked Column */}
                    <div className="flex flex-col gap-8">
                        {/* Rider Profile Card */}
                        <div className="bg-[#0d1a0e] border border-white/5 rounded-3xl p-6 relative overflow-hidden flex-1">
                            <h3 className="text-[11px] font-black uppercase tracking-widest text-white mb-6">Rider Profile</h3>
                            <div className="flex items-center gap-4 mb-8">
                                <img className="w-16 h-16 rounded-2xl object-cover border-2 border-primary/20 shadow-xl" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBu1S98AYS4swRqiAEQoW0ukRhFOxVd7AB2PvH71mn-AfYkcMFaExs-dhrhYM0XlOO-NfsdLwg8ldniYgZaERm83-QmhOQd2yUm-dJyegu2HULRRlo9bWvQErM7qP0AZI6otLPbTqexmyDxZREUjipx6BTgMPA05AfLs1A57k6KMf3fqFXiHynZmbnn-aC4QBOfyuR2-VxS3Uxce4k-V7fGLmGDKjswdnjMhvO9xR-lGeLhCGEZlJdckpPc5wGSRU9-OOFdHWFFR303" alt="Tendayi M." />
                                <div>
                                    <p className="font-black text-xl text-white uppercase tracking-tighter">Tendayi M.</p>
                                    <div className="flex items-center text-primary mt-1">
                                        {[1, 2, 3, 4].map(star => <span key={star} className="material-icons text-[10px]">star</span>)}
                                        <span className="material-icons text-[10px] text-slate-600">star</span>
                                        <span className="ml-2 text-[10px] font-black text-slate-400 uppercase">4.8 (124 rides)</span>
                                    </div>
                                </div>
                            </div>
                            <div className="space-y-4">
                                <div className="flex justify-between items-center text-[10px] uppercase tracking-widest">
                                    <span className="text-slate-500 font-bold">Account Age</span>
                                    <span className="font-black text-white">2.4 Years</span>
                                </div>
                                <div className="flex justify-between items-center text-[10px] uppercase tracking-widest">
                                    <span className="text-slate-500 font-bold">Payment Pref</span>
                                    <span className="font-black text-primary">USD (Cash)</span>
                                </div>
                                <div className="flex justify-between items-center text-[10px] uppercase tracking-widest">
                                    <span className="text-slate-500 font-bold">Trust Score</span>
                                    <span className="font-black text-primary">98% High</span>
                                </div>
                            </div>
                        </div>

                        {/* Admin Override Card */}
                        <div className="bg-[#0d1a0e] border border-white/5 rounded-3xl p-6 relative overflow-hidden">
                            <h3 className="text-[11px] font-black uppercase tracking-widest text-white mb-6 flex items-center gap-2">
                                <span className="material-icons text-sm text-red-500">security</span>
                                Admin Override
                            </h3>
                            <div className="space-y-3">
                                <button className="w-full bg-[#e11d48] hover:bg-red-700 text-white font-black py-4 rounded-xl transition-all flex items-center justify-center gap-3 uppercase text-[10px] tracking-widest active:scale-95 shadow-lg shadow-red-900/20">
                                    <span className="material-icons text-base">cancel</span>
                                    Force Close Session
                                </button>
                                <button className="w-full border border-slate-700 hover:bg-white/5 text-white font-black py-4 rounded-xl transition-all flex items-center justify-center gap-3 uppercase text-[10px] tracking-widest active:scale-95">
                                    <span className="material-icons text-base">support_agent</span>
                                    Intervene Manually
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Middle Section: Full Width Participating Drivers */}
                <div className="bg-[#0d1a0e] border border-white/5 rounded-3xl overflow-hidden shadow-2xl relative">
                    <div className="p-8 border-b border-white/5 flex justify-between items-center">
                        <h2 className="text-xl font-black flex items-center gap-4 uppercase tracking-tight text-white">
                            <span className="material-symbols-outlined text-primary font-bold text-2xl">hail</span>
                            Participating Drivers
                            <span className="bg-primary/20 text-primary text-[10px] px-3 py-1 rounded-full font-black uppercase tracking-tight ml-2">6 Online</span>
                        </h2>
                        <div className="flex gap-2">
                            <button className="bg-primary text-black px-5 py-2 text-[10px] font-black uppercase rounded-lg shadow-lg shadow-primary/20">All</button>
                            <button className="text-slate-500 px-5 py-2 text-[10px] font-black uppercase rounded-lg hover:text-white transition-colors">Nearby</button>
                            <button className="text-slate-500 px-5 py-2 text-[10px] font-black uppercase rounded-lg hover:text-white transition-colors">Lowest Bid</button>
                        </div>
                    </div>

                    <div className="overflow-x-auto relative">
                        <table className="w-full text-left">
                            <thead className="bg-[#0a120b] border-y border-white/5">
                                <tr className="text-[9px] text-slate-500 uppercase font-black tracking-widest">
                                    <th className="px-8 py-5">Driver Details</th>
                                    <th className="px-8 py-5">Proximity</th>
                                    <th className="px-8 py-5">Rating</th>
                                    <th className="px-8 py-5">Current Bid</th>
                                    <th className="px-8 py-5">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-white/5">
                                {drivers.map((driver, i) => (
                                    <tr key={i} className="hover:bg-white/5 transition-colors group">
                                        <td className="px-8 py-6">
                                            <div className="flex items-center gap-4">
                                                <img className="w-12 h-12 rounded-full object-cover border border-white/10" src={driver.avatar} alt={driver.name} />
                                                <div>
                                                    <p className="font-black text-white uppercase tracking-tighter">{driver.name}</p>
                                                    <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">{driver.car}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-8 py-6">
                                            <div className="flex flex-col">
                                                <span className="font-black text-white">{driver.dist}</span>
                                                <span className="text-[10px] text-primary uppercase font-black mt-1">{driver.time}</span>
                                            </div>
                                        </td>
                                        <td className="px-8 py-6">
                                            <div className="flex items-center gap-1.5 text-primary">
                                                <span className="font-black text-lg">{driver.rating}</span>
                                                <span className="material-icons text-base">star</span>
                                            </div>
                                        </td>
                                        <td className="px-8 py-6">
                                            <div className="flex flex-col">
                                                <span className={`text-2xl font-black ${driver.trending ? 'text-white' : 'text-white/40'}`}>{driver.bid}</span>
                                                {driver.lastUpdate && <span className="text-[9px] text-slate-500 uppercase font-black mt-1">{driver.lastUpdate}</span>}
                                                {driver.trending && <span className="text-[9px] text-yellow-500 uppercase font-black mt-1">Trending Up</span>}
                                            </div>
                                        </td>
                                        <td className="px-8 py-6">
                                            <div className="flex gap-2">
                                                <button className="px-6 py-2.5 bg-[#14532d] text-primary hover:bg-primary hover:text-black rounded-lg font-black text-[10px] uppercase transition-all tracking-widest active:scale-95 shadow-lg shadow-primary/5">Select</button>
                                                <button className="w-10 h-10 border border-white/10 rounded-lg flex items-center justify-center text-slate-400 hover:bg-white/5 transition-colors">
                                                    <span className="material-icons text-sm">chat_bubble_outline</span>
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>

                        {/* Recommendation Card Embedded overlay style per image */}
                        <div className="absolute bottom-6 right-6 z-10">
                            <div className="bg-[#0a2e1d] border border-primary/40 p-4 pl-6 pr-12 rounded-2xl shadow-2xl relative animate-pulse flex items-center gap-4">
                                <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center">
                                    <span className="material-icons text-primary">insights</span>
                                </div>
                                <div>
                                    <p className="text-[8px] font-black text-primary uppercase tracking-widest leading-none mb-1">Strategy Recommendation</p>
                                    <p className="text-[11px] text-white font-black uppercase tracking-tight">Accept Farai K. bid ($14.50) to optimize time.</p>
                                </div>
                                <button className="absolute right-4 top-1/2 -translate-y-1/2 text-white/40 hover:text-white transition-colors">
                                    <span className="material-icons text-sm">close</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom Section Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Event Log */}
                    <div className="bg-[#0d1a0e] border border-white/5 rounded-3xl p-8 relative overflow-hidden h-[360px] flex flex-col">
                        <div className="flex justify-between items-center mb-8">
                            <h3 className="text-[11px] font-black uppercase tracking-widest text-white">Live Event Log</h3>
                            <span className="w-2 h-2 rounded-full bg-primary shadow-[0_0_10px_#00ff90]"></span>
                        </div>
                        <div className="space-y-6 overflow-y-auto flex-1 pr-4 custom-scrollbar">
                            {[
                                { status: "red", text: "Driver Gift O. counter-offered $18.50", sub: "14:22:45 • Zimbabwe Standard Time" },
                                { status: "yellow", text: "Rider Tendayi M. rejected $17.00 offer", sub: "14:22:12 • Zimbabwe Standard Time" },
                                { status: "green", text: "Driver Farai K. entered negotiation", sub: "14:21:55 • Zimbabwe Standard Time" }
                            ].map((log, i) => (
                                <div key={i} className="flex gap-4">
                                    <div className={`w-1 h-12 ${log.status === 'red' ? 'bg-red-500' : log.status === 'yellow' ? 'bg-yellow-500' : 'bg-primary'} rounded-full`}></div>
                                    <div>
                                        <p className="font-black text-white text-sm uppercase tracking-tight">{log.text}</p>
                                        <p className="text-[9px] text-slate-500 font-black uppercase mt-1 tracking-widest">{log.sub}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Location Data */}
                    <div className="bg-[#0d1a0e] border border-white/5 rounded-3xl p-8 relative overflow-hidden h-[360px] flex flex-col">
                        <h3 className="text-[11px] font-black uppercase tracking-widest text-white mb-6">Location Data</h3>
                        <div className="relative flex-1 rounded-2xl overflow-hidden border border-white/5 bg-zinc-900/50">
                            {/* Mock Map Image */}
                            <img className="w-full h-full object-cover opacity-60 grayscale brightness-75 contrast-125" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBNEfHefkMy4Fusz_a7DByWI7T0rIGCmT0qf60LXpprAsK0J8ueMV-rbGcghfk61-DbsHlA9N3bN_vhzg1_-a9vLjRGFGs3mQQfS-VYPLq-GKyHKURLJ6_ARucIsuOvNQMwMvcYlwFCvltTxUO0fq3Hsie5NOvMzBnBxng9Hgk-aawGc3hKg2i6aBTR__8OpignNNsB_s5oKuySckS4VTRoYWcp-3_lwtfGy0Yx1Hj19-maLgMpubKm7LMG8lKeLvDMcqHizuTf_7PU" alt="Map" />

                            {/* Markers */}
                            <div className="absolute top-1/2 left-1/2 -translate-x-12 -translate-y-6">
                                <div className="relative">
                                    <div className="bg-primary text-black text-[8px] font-black px-1.5 py-0.5 rounded-full absolute -top-4 left-1/2 -translate-x-1/2">Rider</div>
                                    <div className="w-4 h-4 bg-primary rounded-full ring-4 ring-primary/20 animate-pulse border-2 border-white"></div>
                                </div>
                            </div>
                            <div className="absolute top-1/3 left-1/4">
                                <span className="material-icons text-primary animate-bounce">location_on</span>
                            </div>
                            <div className="absolute bottom-1/4 right-1/3">
                                <div className="w-3 h-3 bg-white rounded-full border-2 border-primary shadow-lg"></div>
                            </div>

                            <div className="absolute bottom-3 right-3 bg-black/80 px-2 py-1 rounded-lg text-[8px] font-black text-slate-300 uppercase letter-spacing-wider border border-white/10">
                                GPS Precision: ±4m
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default LiveBidDetail;
