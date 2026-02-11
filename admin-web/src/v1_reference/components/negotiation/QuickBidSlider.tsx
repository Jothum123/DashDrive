import { ChevronRight, Gavel, Sparkles, TrendingUp } from 'lucide-react';
import React, { useState } from 'react';

interface QuickBidProps {
    initialPrice: number;
    recommendedPrice: number;
    onBid: (amount: number) => void;
}

export const QuickBidSlider: React.FC<QuickBidProps> = ({ initialPrice, recommendedPrice, onBid }) => {
    const [customAmount, setCustomAmount] = useState<number>(initialPrice);

    const bidOptions = [
        { label: '+10%', multiplier: 1.1 },
        { label: '+15%', multiplier: 1.15 },
        { label: '+20%', multiplier: 1.2 },
    ];

    return (
        <div className="bg-white dark:bg-zinc-900 border border-gray-100 dark:border-white/10 p-6 rounded-[32px] shadow-2xl space-y-6 max-w-sm">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <Gavel size={18} className="text-brand-500" />
                    <h3 className="text-sm font-uber-bold text-gray-900 dark:text-white">Active Bid</h3>
                </div>
                <div className="px-3 py-1 bg-amber-500/10 text-amber-600 dark:text-amber-400 text-[10px] font-black uppercase tracking-widest rounded-lg flex items-center gap-1.5">
                    <TrendingUp size={12} />
                    High Demand
                </div>
            </div>

            <div className="p-4 bg-gray-50 dark:bg-white/5 rounded-2xl border border-dashed border-gray-200 dark:border-white/10">
                <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Recommended Price</span>
                    <Sparkles size={12} className="text-amber-500" />
                </div>
                <p className="text-xl font-uber-bold text-gray-900 dark:text-white">${recommendedPrice.toFixed(2)}</p>
                <p className="text-[10px] text-gray-500 mt-1 font-medium italic">Based on 1.5x Peak Multiplier</p>
            </div>

            <div className="grid grid-cols-3 gap-2">
                {bidOptions.map((opt) => (
                    <button
                        key={opt.label}
                        onClick={() => onBid(initialPrice * opt.multiplier)}
                        className="py-3 bg-white dark:bg-white/5 border border-gray-100 dark:border-white/10 rounded-xl text-[10px] font-black text-gray-800 dark:text-gray-200 hover:border-brand-500 hover:text-brand-500 transition-all uppercase tracking-widest"
                    >
                        {opt.label}
                    </button>
                ))}
            </div>

            <div className="relative">
                <input
                    type="range"
                    min={initialPrice}
                    max={initialPrice * 2}
                    step={0.5}
                    value={customAmount}
                    onChange={(e) => setCustomAmount(parseFloat(e.target.value))}
                    className="w-full h-1.5 bg-gray-200 dark:bg-white/10 rounded-lg appearance-none cursor-pointer accent-brand-500"
                />
                <div className="flex justify-between mt-2">
                    <span className="text-[10px] font-black text-gray-400">$${initialPrice}</span>
                    <span className="text-[10px] font-black text-gray-400">$${initialPrice * 2}</span>
                </div>
            </div>

            <button
                onClick={() => onBid(customAmount)}
                className="w-full py-4 bg-zinc-950 dark:bg-white text-white dark:text-zinc-950 rounded-2xl font-uber-bold text-sm flex items-center justify-center gap-2 group transition-all active:scale-95"
            >
                Confirm Bid: $${customAmount.toFixed(2)}
                <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </button>
        </div>
    );
};
