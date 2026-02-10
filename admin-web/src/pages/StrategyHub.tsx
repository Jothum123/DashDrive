import {
    Activity,
    Circle,
    Gavel,
    Percent,
    Sliders,
    Zap
} from 'lucide-react';
import { Header } from '../components/layout/Header';
import { useAdminStore } from '../stores/adminStore';

export function StrategyHub() {
    const { strategy, negotiations, updateStrategy } = useAdminStore();

    return (
        <div className="min-h-screen bg-black text-white flex flex-col">
            <Header title="Pricing Management" subtitle="Automatic Bids & Price Rules" />

            <div className="flex-1 p-8 grid grid-cols-1 lg:grid-cols-4 gap-8">

                {/* Main Content: Live Bid Stream & Performance */}
                <div className="lg:col-span-3 space-y-8">

                    {/* Strategy Metrics */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <StrategyMetric
                            title="Bid Success Rate"
                            value="84.2%"
                            change={+2.1}
                            icon={<Gavel className="text-primary" size={20} />}
                        />
                        <StrategyMetric
                            title="Counter Offer Margin"
                            value="+12.5%"
                            change={-0.8}
                            trend="down"
                            icon={<Percent className="text-primary" size={20} />}
                        />
                        <StrategyMetric
                            title="Active Surge Zones"
                            value="14"
                            change={+3}
                            icon={<Zap className="text-primary" size={20} />}
                        />
                    </div>

                    {/* Live Bid Stream Table */}
                    <div className="bg-zinc-900/50 border border-zinc-800 rounded-[32px] overflow-hidden">
                        <div className="p-6 border-b border-zinc-800 flex justify-between items-center">
                            <h3 className="text-lg font-black tracking-tighter">Live Bids</h3>
                            <div className="flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                                <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Real-time Feed</span>
                            </div>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="text-zinc-500 text-[10px] font-black uppercase tracking-widest border-b border-zinc-800">
                                        <th className="px-6 py-4 font-black">City / Passenger</th>
                                        <th className="px-6 py-4 font-black">Proposed Fare</th>
                                        <th className="px-6 py-4 font-black">Avg Counter</th>
                                        <th className="px-6 py-4 font-black">Final Price</th>
                                        <th className="px-6 py-4 font-black text-right">Time to Match</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-zinc-800/50 text-[13px]">
                                    {negotiations.map((bid) => (
                                        <tr key={bid.id} className="hover:bg-zinc-800/20 transition-colors group">
                                            <td className="px-6 py-4">
                                                <div>
                                                    <p className="font-black text-white">{bid.passengerName}</p>
                                                    <p className="text-[10px] text-zinc-500 font-bold uppercase">{bid.city}</p>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 font-bold">£{bid.riderProposedFare.toFixed(2)}</td>
                                            <td className="px-6 py-4">
                                                <span className="px-2 py-1 bg-zinc-800 border border-zinc-700 rounded-lg text-zinc-400 font-bold">
                                                    £{bid.avgDriverCounter.toFixed(2)}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 font-black text-primary">
                                                {bid.matchPrice ? `£${bid.matchPrice.toFixed(2)}` : '--'}
                                            </td>
                                            <td className="px-6 py-4 text-right">
                                                <div className="flex items-center justify-end gap-2 text-zinc-500 font-bold">
                                                    <Activity size={12} className="text-primary" />
                                                    {bid.timeToMatch}
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                {/* Right Column: Strategy Controls */}
                <aside className="space-y-6">
                    <div className="bg-zinc-900/50 border border-zinc-800 rounded-[32px] p-6 space-y-8">
                        <div className="flex items-center gap-3">
                            <Sliders className="text-primary" size={20} />
                            <h3 className="text-sm font-black uppercase tracking-widest">Pricing Settings</h3>
                        </div>

                        {/* Bid Sensitivity */}
                        <div className="space-y-4">
                            <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest block">Bid Sensitivity</label>
                            <div className="grid grid-cols-3 gap-2">
                                {['Low', 'Medium', 'High'].map((level) => (
                                    <button
                                        key={level}
                                        onClick={() => updateStrategy({ bidSensitivity: level as any })}
                                        className={`py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${strategy.bidSensitivity === level
                                            ? 'bg-primary text-black'
                                            : 'bg-zinc-800 text-zinc-500 hover:text-white'
                                            }`}
                                    >
                                        {level}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Price Floor */}
                        <div className="space-y-4">
                            <div className="flex justify-between items-center">
                                <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">Minimum Price</label>
                                <span className="text-xs font-black text-primary">£{strategy.priceFloor.toFixed(2)}</span>
                            </div>
                            <input
                                type="range"
                                min="1"
                                max="10"
                                step="0.5"
                                value={strategy.priceFloor}
                                onChange={(e) => updateStrategy({ priceFloor: parseFloat(e.target.value) })}
                                className="w-full accent-primary bg-zinc-800 h-1.5 rounded-full appearance-none"
                            />
                        </div>

                        {/* Toggles */}
                        <div className="space-y-6 pt-4">
                            <StrategyToggle
                                label="Auto Price Adjustment"
                                active={strategy.autoAdjustFloor}
                                onToggle={() => updateStrategy({ autoAdjustFloor: !strategy.autoAdjustFloor })}
                            />
                            <StrategyToggle
                                label="Smart Offers"
                                active={strategy.smartCounterBids}
                                onToggle={() => updateStrategy({ smartCounterBids: !strategy.smartCounterBids })}
                            />
                        </div>
                    </div>

                    {/* Operational Message */}
                    <div className="p-6 bg-primary/5 border border-primary/20 rounded-[32px]">
                        <p className="text-[10px] font-black text-primary uppercase tracking-[0.2em] mb-2 italic">Smart Tip</p>
                        <p className="text-[11px] font-bold text-zinc-400 leading-relaxed">
                            Increasing bid sensitivity to <span className="text-primary">High</span> may improve match rate by <span className="text-white">+14.2%</span> during Peak Surge.
                        </p>
                    </div>
                </aside>
            </div>
        </div>
    );
}

function StrategyMetric({ title, value, change, trend = 'up', icon }: any) {
    return (
        <div className="p-6 bg-zinc-900/50 border border-zinc-800 rounded-[32px] group hover:border-primary/30 transition-all">
            <div className="flex justify-between items-start mb-4">
                <div className="p-3 bg-black rounded-2xl border border-zinc-800 group-hover:bg-primary group-hover:text-black transition-all">
                    {icon}
                </div>
                <div className={`px-2 py-1 rounded-lg text-[10px] font-black flex items-center gap-1 ${trend === 'up' ? 'bg-primary/10 text-primary' : 'bg-red-500/10 text-red-500'
                    }`}>
                    {change > 0 && '+'}
                    {change}%
                </div>
            </div>
            <p className="text-3xl font-black tracking-tighter mb-1">{value}</p>
            <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">{title}</p>
        </div>
    );
}

function StrategyToggle({ label, active, onToggle }: any) {
    return (
        <div className="flex items-center justify-between">
            <span className="text-[11px] font-black text-zinc-300 uppercase tracking-tight">{label}</span>
            <button
                onClick={onToggle}
                className={`w-10 h-5 rounded-full transition-all relative ${active ? 'bg-primary shadow-[0_0_10px_#00ff90]' : 'bg-zinc-800'}`}
            >
                <Circle
                    size={14}
                    fill="currentColor"
                    className={`absolute top-0.5 transition-all ${active ? 'right-0.5 text-black' : 'left-0.5 text-zinc-500'}`}
                />
            </button>
        </div>
    );
}
