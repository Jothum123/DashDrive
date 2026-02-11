import {
    Filter,
    Navigation,
    Scale,
    Search
} from 'lucide-react';
import { useState } from 'react';
import LiveLeafletMap from '../components/maps/LiveLeafletMap';

export function Disputes() {
    const [selectedDispute, setSelectedDispute] = useState<any>(null);

    return (
        <div className="flex h-[calc(100vh-120px)] gap-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            {/* Left Column: Dispute Queue */}
            <div className="w-[450px] flex flex-col gap-8 h-full">
                <div className="bg-white dark:bg-zinc-900 rounded-[40px] border border-gray-200 dark:border-zinc-800 shadow-xl flex flex-col h-full overflow-hidden">
                    <header className="p-10 border-b border-gray-100 dark:border-zinc-800">
                        <div className="flex items-center gap-2 mb-2">
                            <Scale size={14} className="text-primary" />
                            <span className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Adjudication Queue</span>
                        </div>
                        <h2 className="text-3xl font-uber-bold dark:text-white leading-none">Dispute Center</h2>

                        <div className="mt-8 flex items-center gap-4">
                            <div className="relative group flex-1">
                                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-primary transition-colors" size={16} />
                                <input
                                    type="text"
                                    placeholder="Search Case ID / User..."
                                    className="w-full pl-12 pr-6 py-3.5 bg-gray-50 dark:bg-zinc-800 border-none rounded-2xl text-sm font-uber-bold focus:ring-2 focus:ring-primary/20"
                                />
                            </div>
                            <button className="p-3.5 bg-gray-50 dark:bg-zinc-800 rounded-2xl hover:bg-gray-100 transition-all">
                                <Filter size={18} className="text-gray-400" />
                            </button>
                        </div>
                    </header>

                    <div className="flex-1 overflow-y-auto custom-scrollbar">
                        <div className="divide-y divide-gray-50 dark:divide-zinc-800">
                            <DisputeRow
                                id="CASE_8812"
                                user="Miguel P."
                                type="Overcharge Claim"
                                amount="$210"
                                time="2h ago"
                                status="Open"
                                isActive={selectedDispute?.id === 'CASE_8812'}
                                onClick={() => setSelectedDispute({ id: 'CASE_8812', user: 'Miguel P.', trip: '#TX_9122' })}
                            />
                            <DisputeRow
                                id="CASE_8815"
                                user="Ana G."
                                type="Route Deviation"
                                amount="$85"
                                time="5h ago"
                                status="Reviewing"
                            />
                            <DisputeRow
                                id="CASE_8818"
                                user="Julio R."
                                type="Unprofessional Behavior"
                                amount="---"
                                time="1d ago"
                                status="Escalated"
                                isUrgent
                            />
                            <DisputeRow
                                id="CASE_8820"
                                user="Sofia V."
                                type="Fare Discrepancy"
                                amount="$120"
                                time="1d ago"
                                status="Open"
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Right Column: Case Analysis & Adjudication */}
            <div className="flex-1 flex flex-col gap-8 h-full">
                {selectedDispute ? (
                    <div className="flex-1 flex flex-col gap-8 animate-in fade-in slide-in-from-right-4 duration-500">
                        {/* Case Details Header */}
                        <div className="bg-white dark:bg-zinc-900 p-10 rounded-[40px] border border-gray-200 dark:border-zinc-800 shadow-xl flex items-center justify-between">
                            <div className="flex items-center gap-6">
                                <div className="w-16 h-16 rounded-[28px] bg-primary/10 flex items-center justify-center text-primary">
                                    <Scale size={32} />
                                </div>
                                <div>
                                    <h3 className="text-2xl font-uber-bold dark:text-white leading-none">Case {selectedDispute.id} Analysis</h3>
                                    <p className="text-sm text-gray-500 mt-2 font-medium">Overcharge Claim initiated by <span className="text-gray-900 dark:text-white font-uber-bold">{selectedDispute.user}</span> for Trip <span className="text-primary font-uber-bold">{selectedDispute.trip}</span></p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <button className="px-6 py-3 border border-gray-200 dark:border-zinc-800 rounded-2xl text-[10px] font-black uppercase tracking-widest text-gray-400 hover:text-rose-500 transition-all">Dismiss Case</button>
                                <button className="px-8 py-3 bg-primary text-black rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-xl shadow-primary/20 hover:scale-[1.02] transition-transform">Issue Refund</button>
                            </div>
                        </div>

                        {/* Analysis Grid */}
                        <div className="flex-1 min-h-0 grid grid-cols-1 xl:grid-cols-2 gap-8">
                            {/* Visual Evidence: Route Map */}
                            <div className="bg-white dark:bg-zinc-900 rounded-[40px] border border-gray-200 dark:border-zinc-800 shadow-xl overflow-hidden relative flex flex-col">
                                <div className="p-8 border-b border-gray-100 dark:border-zinc-800 flex items-center justify-between bg-white/80 dark:bg-zinc-900/80 backdrop-blur-md z-10">
                                    <div className="flex items-center gap-3">
                                        <Navigation size={18} className="text-primary" />
                                        <span className="text-[11px] font-black uppercase tracking-[0.2em] text-gray-400">Recorded Path Analysis</span>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <div className="flex items-center gap-2">
                                            <div className="w-2 h-2 rounded-full bg-primary" />
                                            <span className="text-[9px] font-black text-gray-400">Actual</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <div className="w-2 h-2 rounded-full bg-gray-200" />
                                            <span className="text-[9px] font-black text-gray-400">Target</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex-1">
                                    <LiveLeafletMap />
                                </div>
                            </div>

                            {/* Negotiation Timeline Analysis */}
                            <div className="flex flex-col gap-8">
                                <div className="bg-zinc-950 p-10 rounded-[40px] text-white shadow-2xl flex-1 flex flex-col">
                                    <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 mb-8">Negotiation Timeline Nodes</h3>
                                    <div className="flex-1 space-y-8 relative">
                                        <div className="absolute left-[7px] top-2 bottom-2 w-[1px] bg-white/10" />
                                        <TimelineNode time="12:04 PM" label="Initial Quote" value="$180" desc="Platform suggestion based on traffic" />
                                        <TimelineNode time="12:04 PM" label="Rider Offer" value="$160" desc="Counter-offer submitted by Miguel P." />
                                        <TimelineNode time="12:05 PM" label="Highest Bid" value="$210" desc="Marco A. (Pilot) accepted auction" active />
                                        <TimelineNode time="12:06 PM" label="Deal Sealed" value="$210" desc="Participant agreed via instant accept" />
                                    </div>
                                    <div className="mt-10 pt-8 border-t border-white/10">
                                        <p className="text-xs text-gray-400 leading-relaxed italic">
                                            * Rider claims the final price was forced due to low liquidity at the time of request.
                                        </p>
                                    </div>
                                </div>

                                <div className="bg-white dark:bg-zinc-900 p-10 rounded-[40px] border border-gray-200 dark:border-zinc-800 shadow-xl">
                                    <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 mb-8">Communication Logs</h3>
                                    <div className="space-y-4">
                                        <ChatMessage user="Miguel P." msg="Why is the price so much higher than last time?" time="12:04" />
                                        <ChatMessage user="Marco A. (Pilot)" msg="Peak traffic in Condesa, amigo. This is the fair rate." time="12:05" />
                                        <ChatMessage user="System" msg="Price Discovery Gap: +14.2%" time="12:05" isSystem />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="flex-1 bg-gray-50 dark:bg-zinc-900/20 rounded-[40px] border border-dashed border-gray-200 dark:border-zinc-800 flex flex-col items-center justify-center text-center p-20">
                        <div className="w-24 h-24 rounded-[40px] bg-gray-100 dark:bg-zinc-800 flex items-center justify-center mb-8 text-gray-300">
                            <Scale size={48} />
                        </div>
                        <h3 className="text-2xl font-uber-bold text-gray-400 mb-4">Select a Dispute Case</h3>
                        <p className="text-sm text-gray-500 max-w-sm">Use the directory on the left to review pending claims and initiate adjudication.</p>
                    </div>
                )}
            </div>
        </div>
    );
}

const DisputeRow = ({ id, user, type, amount, time, status, isActive, isUrgent, onClick }: any) => (
    <div
        onClick={onClick}
        className={`px-10 py-8 cursor-pointer transition-all border-l-[4px] relative group ${isActive ? 'bg-primary/5 border-primary shadow-inner' : 'border-transparent hover:bg-gray-50 dark:hover:bg-primary/[0.02]'
            }`}
    >
        <div className="flex justify-between items-start mb-4">
            <span className={`text-[10px] font-black px-2.5 py-1 rounded-xl ${isUrgent ? 'bg-rose-500/10 text-rose-500' : 'bg-gray-100 dark:bg-zinc-800 text-gray-500'
                }`}>{id}</span>
            <span className="text-[10px] text-gray-400 font-black uppercase tracking-widest">{time}</span>
        </div>
        <div className="flex items-center justify-between">
            <div>
                <h4 className={`text-base font-uber-bold transition-colors ${isActive ? 'text-primary' : 'dark:text-white group-hover:text-primary'}`}>{user}</h4>
                <p className="text-[11px] text-gray-400 font-medium uppercase tracking-widest mt-1">{type}</p>
            </div>
            <div className="text-right">
                <p className="text-sm font-uber-bold dark:text-white leading-none">{amount}</p>
                <p className={`text-[9px] font-black uppercase tracking-widest mt-2 ${status === 'Open' ? 'text-primary' :
                        status === 'Escalated' ? 'text-rose-500' :
                            'text-amber-500'
                    }`}>{status}</p>
            </div>
        </div>
    </div>
);

const TimelineNode = ({ time, label, value, desc, active }: any) => (
    <div className="flex gap-6 items-start group">
        <div className={`mt-1.5 w-3.5 h-3.5 rounded-full border-[3px] shadow-[0_0_10px_rgba(0,0,0,0.5)] z-10 transition-all ${active ? 'bg-primary border-white scale-125' : 'bg-zinc-800 border-zinc-700'
            }`} />
        <div className="flex-1 pb-2">
            <div className="flex items-center justify-between mb-1">
                <p className={`text-sm font-uber-bold ${active ? 'text-primary' : 'text-white'}`}>{label}</p>
                <span className="text-[10px] font-black text-gray-600 uppercase tracking-widest">{time}</span>
            </div>
            <div className="flex items-center justify-between gap-4">
                <p className="text-xs text-gray-400 line-clamp-1">{desc}</p>
                <span className="text-xs font-uber-bold text-white shrink-0">{value}</span>
            </div>
        </div>
    </div>
);

const ChatMessage = ({ user, msg, time, isSystem }: any) => (
    <div className={`p-4 rounded-2xl ${isSystem ? 'bg-gray-50 dark:bg-zinc-800/50' : 'bg-white dark:bg-zinc-800 border border-gray-100 dark:border-zinc-700'}`}>
        <div className="flex justify-between items-center mb-2">
            <span className={`text-[9px] font-black uppercase tracking-widest ${isSystem ? 'text-primary' : 'text-gray-400'}`}>{user}</span>
            <span className="text-[9px] text-gray-400 font-mono">{time}</span>
        </div>
        <p className="text-xs font-medium dark:text-white leading-relaxed">{msg}</p>
    </div>
);

export default Disputes;
