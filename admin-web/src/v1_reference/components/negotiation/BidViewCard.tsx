import { Star, Zap } from 'lucide-react';
import React from 'react';

interface DriverBid {
    driverId: string;
    name: string;
    rating: number;
    carModel: string;
    price: number;
    eta: string;
}

interface BidViewProps {
    bids: DriverBid[];
    onAccept: (bid: DriverBid) => void;
}

export const BidViewCard: React.FC<BidViewProps> = ({ bids, onAccept }) => {
    return (
        <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between px-2">
                <h3 className="text-xs font-black uppercase tracking-[0.2em] text-gray-400">Driver Counter-Offers</h3>
                <span className="text-[10px] font-bold text-brand-500 bg-brand-500/10 px-2 py-0.5 rounded-full">{bids.length} Active Bids</span>
            </div>

            <div className="space-y-3">
                {bids.map((bid) => (
                    <div
                        key={bid.driverId}
                        className="bg-white dark:bg-zinc-900 border border-gray-100 dark:border-white/10 p-5 rounded-[28px] shadow-sm hover:shadow-xl hover:border-brand-500/20 transition-all group relative overflow-hidden"
                    >
                        <div className="flex items-start justify-between relative z-10">
                            <div className="flex gap-4">
                                <div className="w-14 h-14 rounded-2xl bg-gray-100 dark:bg-white/5 flex items-center justify-center border border-gray-200 dark:border-white/10 group-hover:scale-105 transition-transform">
                                    <span className="text-lg font-black text-gray-400">JD</span>
                                </div>
                                <div>
                                    <div className="flex items-center gap-2">
                                        <p className="font-uber-bold text-gray-900 dark:text-white leading-none">{bid.name}</p>
                                        <div className="flex items-center gap-1">
                                            <Star size={10} className="fill-amber-400 text-amber-400" />
                                            <span className="text-[10px] font-black">{bid.rating}</span>
                                        </div>
                                    </div>
                                    <p className="text-[11px] font-medium text-gray-500 mt-1 uppercase tracking-wider">{bid.carModel}</p>
                                    <div className="flex items-center gap-2 mt-2">
                                        <Zap size={10} className="text-brand-500" />
                                        <span className="text-[10px] font-bold text-brand-500">Arriving in {bid.eta}</span>
                                    </div>
                                </div>
                            </div>

                            <div className="text-right">
                                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest leading-none mb-1">Final Offer</p>
                                <h4 className="text-2xl font-uber-bold text-gray-900 dark:text-white leading-none">${bid.price.toFixed(2)}</h4>
                                <button
                                    onClick={() => onAccept(bid)}
                                    className="mt-4 px-6 py-2 bg-brand-500 hover:bg-brand-600 text-white text-[10px] font-black uppercase tracking-widest rounded-xl transition-all shadow-lg shadow-brand-500/20 active:scale-95"
                                >
                                    Accept Fare
                                </button>
                            </div>
                        </div>

                        {/* Decorative background pulse */}
                        <div className="absolute -bottom-12 -right-12 w-32 h-32 bg-brand-500/5 rounded-full blur-3xl group-hover:bg-brand-500/10 transition-colors" />
                    </div>
                ))}
            </div>
        </div>
    );
};
