import React from 'react';
import { Link } from 'react-router-dom';
import { Header } from '../../../components/shared/Header';

export const ManualDispatch: React.FC = () => {
    return (
        <div className="flex-1 flex flex-col overflow-hidden bg-background-light dark:bg-zinc-950 font-display">
            <Header title="Manual Dispatch" />
            <div className="flex-1 flex overflow-hidden font-display">
                {/* Form Sidebar */}
                <div className="w-[450px] border-r border-slate-200 dark:border-zinc-800 flex flex-col bg-white dark:bg-zinc-900/40 shrink-0">
                    <header className="p-6 border-b border-slate-200 dark:border-zinc-800">
                        <div className="flex items-center gap-2 mb-1">
                            <Link to="/" className="text-slate-400 hover:text-primary transition-colors">
                                <span className="material-icons text-sm">arrow_back</span>
                            </Link>
                            <h1 className="text-xl font-bold text-slate-900 dark:text-white">Manual Trip Dispatch</h1>
                        </div>
                        <p className="text-sm text-slate-500">Create a new ride request on behalf of a user</p>
                    </header>

                    <div className="flex-1 overflow-y-auto p-6 space-y-8 scrollbar-hide pb-24">
                        {/* Step 1: Rider Information */}
                        <section className="relative">
                            <div className="step-line"></div>
                            <div className="flex items-start gap-4">
                                <div className="w-8 h-8 rounded-full bg-primary text-black flex items-center justify-center font-bold text-sm shrink-0 z-10 shadow-lg shadow-primary/20">1</div>
                                <div className="flex-1 space-y-4">
                                    <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400">Rider Information</h3>
                                    <div className="space-y-3">
                                        <div className="relative group">
                                            <label className="block text-xs font-bold text-slate-500 mb-1 pointer-events-none">Rider Phone Number</label>
                                            <div className="relative">
                                                <span className="material-icons absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary">search</span>
                                                <input
                                                    className="w-full pl-10 pr-4 py-3 bg-slate-100 dark:bg-slate-800/50 border-2 border-transparent focus:border-primary focus:ring-0 rounded-xl font-medium transition-all text-slate-900 dark:text-white"
                                                    placeholder="+263 7..."
                                                    type="text"
                                                    defaultValue="+263 77 123 4567"
                                                />
                                            </div>
                                        </div>
                                        <div className="grid grid-cols-2 gap-3">
                                            <div className="bg-slate-50 dark:bg-slate-800/50 p-3 rounded-xl border border-slate-200 dark:border-slate-700">
                                                <label className="block text-[10px] font-bold text-slate-500 uppercase">Rider Name</label>
                                                <p className="font-bold text-sm text-slate-900 dark:text-white">Blessing Mutasa</p>
                                            </div>
                                            <div className="bg-slate-50 dark:bg-slate-800/50 p-3 rounded-xl border border-slate-200 dark:border-slate-700">
                                                <label className="block text-[10px] font-bold text-slate-500 uppercase">Status</label>
                                                <p className="font-bold text-sm text-green-500">Verified</p>
                                            </div>
                                        </div>
                                        <div className="space-y-2">
                                            <label className="block text-xs font-bold text-slate-500 uppercase">Payment Method</label>
                                            <div className="flex gap-2">
                                                <button className="flex-1 py-2 px-3 rounded-lg border-2 border-primary bg-primary/10 text-primary font-bold text-sm flex items-center justify-center gap-2">
                                                    <span className="material-icons text-sm">payments</span> USD
                                                </button>
                                                <button className="flex-1 py-2 px-3 rounded-lg border-2 border-slate-200 dark:border-slate-700 hover:border-primary/50 transition-all font-bold text-sm text-slate-600 dark:text-slate-400 flex items-center justify-center gap-2">
                                                    <span className="material-symbols-outlined text-[18px]">currency_exchange</span> ZiG
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* Step 2: Trip Details */}
                        <section className="relative">
                            <div className="step-line"></div>
                            <div className="flex items-start gap-4">
                                <div className="w-8 h-8 rounded-full bg-primary text-black flex items-center justify-center font-bold text-sm shrink-0 z-10 shadow-lg shadow-primary/20">2</div>
                                <div className="flex-1 space-y-4">
                                    <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400">Trip Details</h3>
                                    <div className="space-y-4">
                                        <div className="space-y-1">
                                            <label className="block text-xs font-bold text-slate-500 uppercase">Pickup Location</label>
                                            <input
                                                className="w-full px-4 py-4 text-xl font-bold bg-slate-100 dark:bg-slate-800 border-2 border-transparent focus:border-primary focus:ring-0 rounded-xl placeholder:text-slate-400 text-slate-900 dark:text-white"
                                                placeholder="Where from?"
                                                type="text"
                                            />
                                            <div className="flex flex-wrap gap-2 mt-2">
                                                {['Robert Mugabe Int. Airport', 'Avondale Shopping Centre'].map(loc => (
                                                    <button key={loc} className="text-[11px] font-bold bg-slate-100 dark:bg-slate-800 px-3 py-1.5 rounded-full text-slate-500 hover:text-primary hover:bg-primary/10 border border-transparent hover:border-primary/20 transition-all">
                                                        {loc}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                        <div className="space-y-1">
                                            <label className="block text-xs font-bold text-slate-500 uppercase">Dropoff Destination</label>
                                            <input
                                                className="w-full px-4 py-4 text-xl font-bold bg-slate-100 dark:bg-slate-800 border-2 border-transparent focus:border-primary focus:ring-0 rounded-xl placeholder:text-slate-400 text-slate-900 dark:text-white"
                                                placeholder="Where to?"
                                                type="text"
                                            />
                                            <div className="flex flex-wrap gap-2 mt-2">
                                                {["Sam Levy's Village", 'CBD Post Office'].map(loc => (
                                                    <button key={loc} className="text-[11px] font-bold bg-slate-100 dark:bg-slate-800 px-3 py-1.5 rounded-full text-slate-500 hover:text-primary hover:bg-primary/10 border border-transparent hover:border-primary/20 transition-all">
                                                        {loc}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* Step 3: Pricing & Bidding */}
                        <section className="relative">
                            <div className="flex items-start gap-4">
                                <div className="w-8 h-8 rounded-full bg-primary text-black flex items-center justify-center font-bold text-sm shrink-0 z-10 shadow-lg shadow-primary/20">3</div>
                                <div className="flex-1 space-y-4">
                                    <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400">Pricing & Bidding</h3>
                                    <div className="bg-slate-50 dark:bg-slate-800/30 p-4 rounded-xl space-y-4 border border-slate-200 dark:border-slate-800">
                                        <div className="flex items-center justify-between p-1 bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-700">
                                            <button className="flex-1 py-2 px-4 rounded-md text-sm font-bold bg-primary text-black">Fixed Price</button>
                                            <button className="flex-1 py-2 px-4 rounded-md text-sm font-bold text-slate-500 hover:text-primary transition-colors">Bidding Mode</button>
                                        </div>
                                        <div className="space-y-2">
                                            <label className="block text-xs font-bold text-slate-500 uppercase">Initial Price Offering</label>
                                            <div className="relative">
                                                <span className="absolute left-4 top-1/2 -translate-y-1/2 font-bold text-xl text-primary">$</span>
                                                <input
                                                    className="w-full pl-10 pr-4 py-4 text-3xl font-bold bg-white dark:bg-slate-900 border-2 border-transparent focus:border-primary focus:ring-0 rounded-xl text-slate-900 dark:text-white"
                                                    type="number"
                                                    defaultValue="15.00"
                                                />
                                            </div>
                                            <div className="flex justify-between text-[11px] font-medium text-slate-400">
                                                <span>Est. Trip Distance: 8.4km</span>
                                                <span className="text-amber-500 font-bold uppercase tracking-tighter">Suggested: $12 - $18</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>

                    {/* Submit Action */}
                    <div className="p-6 border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-[0_-10px_30px_rgba(0,0,0,0.1)] sticky bottom-0">
                        <button className="w-full bg-primary hover:bg-primary/90 text-white py-5 rounded-xl font-bold text-lg shadow-xl shadow-primary/30 flex items-center justify-center gap-3 transition-all transform active:scale-[0.98]">
                            <span className="material-icons">local_taxi</span>
                            Create Manual Dispatch
                        </button>
                    </div>
                </div>

                {/* Map Preview */}
                <div className="flex-1 relative bg-slate-900 overflow-hidden">
                    <div className="absolute inset-0 map-bg opacity-40"></div>
                    <img
                        alt="Harare Map"
                        className="absolute inset-0 w-full h-full object-cover mix-blend-overlay grayscale opacity-40"
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuBUX9PFRZVuQIKXkclnpeisf47gjopDQSI7ikoRUOqC0b752rylx9Bsr1v__NhcPgOB-6cnOfQotGw-cETKL7pW23P1WcLcNzByKOFl57e11uKJil0VolbKxTs2TIxO2N7nhs1GPOFIusu1TRRfEQJgDYIvqpN5wA16Vz803iW0y4vcSGj7Espi85kJ-SRX-Wwc3j5lMYVvJGEdknb7-U-ZxkyWxXqyp1VALFLDpSbrkJ3nfz3pPMhdu7yWC_IM3bewYadWmA8mCk6V"
                    />

                    {/* Simulated Route */}
                    <svg className="absolute inset-0 w-full h-full pointer-events-none" xmlns="http://www.w3.org/2000/svg">
                        <path className="opacity-80" d="M300,200 Q500,250 600,450" fill="none" stroke="#00ff90" strokeDasharray="10 10" strokeLinecap="round" strokeWidth="6"></path>
                        <circle className="shadow-lg" cx="300" cy="200" fill="#00ff90" r="8"></circle>
                        <circle className="shadow-lg" cx="600" cy="450" fill="#ef4444" r="8"></circle>
                    </svg>

                    {/* Map Overlays */}
                    <div className="absolute top-6 left-6 right-6 flex justify-between items-start pointer-events-none">
                        <div className="bg-slate-900/90 backdrop-blur-md border border-slate-700/50 p-4 rounded-xl shadow-2xl pointer-events-auto">
                            <div className="flex items-center gap-4">
                                <div className="p-2 bg-amber-500/20 rounded-lg">
                                    <span className="material-icons text-amber-500">near_me</span>
                                </div>
                                <div>
                                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Available Near Pickup</p>
                                    <p className="text-xl font-bold text-white">14 Drivers</p>
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col gap-2 pointer-events-auto">
                            <div className="bg-green-500 text-white px-3 py-1.5 rounded-lg text-xs font-bold shadow-lg flex items-center gap-2">
                                <span className="w-2 h-2 bg-white rounded-full animate-pulse"></span>
                                GPS Signal: High Accuracy
                            </div>
                        </div>
                    </div>

                    {/* Legend */}
                    <div className="absolute bottom-6 left-6 bg-slate-900/90 backdrop-blur-md border border-slate-700/50 p-4 rounded-xl space-y-2 shadow-2xl">
                        <div className="flex items-center gap-3">
                            <span className="w-3 h-3 bg-amber-400 rounded-full shadow-[0_0_8px_rgba(251,191,36,0.6)]"></span>
                            <span className="text-xs font-medium text-slate-300">Driver (Available)</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <span className="w-3 h-3 bg-primary rounded-full shadow-[0_0_8px_rgba(0,255,144,0.6)]"></span>
                            <span className="text-xs font-medium text-slate-300">Pickup Location</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <span className="w-3 h-3 bg-red-500 rounded-full shadow-[0_0_8px_rgba(239,68,68,0.6)]"></span>
                            <span className="text-xs font-medium text-slate-300">Destination</span>
                        </div>
                    </div>

                    {/* Floating Drivers */}
                    {[
                        { t: '30%', l: '45%' }, { t: '40%', l: '60%' }, { t: '55%', l: '38%' }, { t: '25%', l: '70%' }, { t: '65%', l: '52%' }
                    ].map((pos, i) => (
                        <div key={i} className="absolute w-3 h-3 bg-amber-400 rounded-full shadow-lg" style={{ top: pos.t, left: pos.l }} />
                    ))}

                    {/* Map Controls */}
                    <div className="absolute bottom-6 right-6 flex flex-col gap-2">
                        <button className="bg-slate-900/90 hover:bg-primary text-white w-10 h-10 rounded-lg border border-slate-700/50 flex items-center justify-center transition-colors">
                            <span className="material-icons">add</span>
                        </button>
                        <button className="bg-slate-900/90 hover:bg-primary text-white w-10 h-10 rounded-lg border border-slate-700/50 flex items-center justify-center transition-colors">
                            <span className="material-icons">remove</span>
                        </button>
                        <button className="bg-slate-900/90 hover:bg-primary text-white w-10 h-10 rounded-lg border border-slate-700/50 flex items-center justify-center mt-2 transition-colors">
                            <span className="material-icons">my_location</span>
                        </button>
                        <button className="bg-slate-900/90 hover:bg-primary text-white w-10 h-10 rounded-lg border border-slate-700/50 flex items-center justify-center transition-colors">
                            <span className="material-icons">layers</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ManualDispatch;
