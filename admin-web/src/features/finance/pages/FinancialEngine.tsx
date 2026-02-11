import {
    ArrowDownRight,
    Calendar,
    CheckCircle2,
    ChevronRight,
    Clock,
    DollarSign,
    Download,
    Search,
    TrendingUp
} from 'lucide-react';
import { Header } from '../../../components/shared/Header';
import { useAdminStore } from '../../../stores/adminStore';
import { calculateSettlement } from '../../../utils/finance';

export const FinancialEngine: React.FC = () => {
    const { recentRides, getStats } = useAdminStore();
    const stats = getStats();

    return (
        <div className="flex-1 flex flex-col overflow-y-auto bg-background-light dark:bg-zinc-950 min-h-full">
            <Header title="Financial Hub" />
            <div className="p-8 space-y-8">
                <div className="flex items-center justify-between">
                    <div>
                        <h2 className="text-2xl font-black text-white tracking-tight">System Ledger</h2>
                        <p className="text-slate-500 text-sm font-medium">Real-time commission tracking & payout management</p>
                    </div>
                    <div className="flex gap-3">
                        <button className="px-4 py-2 bg-panel-dark border border-border-dark rounded-xl text-slate-300 text-xs font-bold hover:bg-white/5 transition-all flex items-center gap-2">
                            <Download size={14} /> EXPORT LEDGER
                        </button>
                        <button className="px-4 py-2 bg-primary text-black rounded-xl text-xs font-bold hover:shadow-lg hover:shadow-primary/20 transition-all flex items-center gap-2">
                            <DollarSign size={14} /> DISBURSE PAYOUTS
                        </button>
                    </div>
                </div>

                {/* KPI Cards */}
                <div className="grid grid-cols-4 gap-6">
                    {[
                        { label: "Gross Volume", value: `$${stats.totalRevenue.toLocaleString()}`, change: "+12.4%", trend: "up", icon: TrendingUp },
                        { label: "Net Commission", value: `$${(stats.totalRevenue * 0.1).toLocaleString()}`, change: "+10.2%", trend: "up", icon: DollarSign },
                        { label: "Driver Payouts", value: `$${(stats.totalRevenue * 0.9).toLocaleString()}`, change: "-2.1%", trend: "down", icon: ArrowDownRight },
                        { label: "Pending Settlements", value: "$12,405", change: "42 items", trend: "neutral", icon: Clock },
                    ].map((kpi, i) => (
                        <div key={i} className="bg-panel-dark border border-border-dark rounded-2xl p-6 shadow-sm">
                            <div className="flex justify-between items-start mb-4">
                                <div className="p-3 bg-background-dark/50 rounded-xl border border-border-dark">
                                    <kpi.icon size={20} className="text-primary" />
                                </div>
                                <span className={`text-[10px] font-black px-2 py-1 rounded-full ${kpi.trend === 'up' ? 'bg-green-500/10 text-green-500' :
                                    kpi.trend === 'down' ? 'bg-red-500/10 text-red-500' : 'bg-slate-500/10 text-slate-500'
                                    }`}>
                                    {kpi.change}
                                </span>
                            </div>
                            <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-1">{kpi.label}</p>
                            <p className="text-2xl font-black text-white">{kpi.value}</p>
                        </div>
                    ))}
                </div>

                <div className="grid grid-cols-12 gap-8">
                    {/* Main Transaction Table */}
                    <div className="col-span-8 bg-panel-dark border border-border-dark rounded-2xl overflow-hidden shadow-sm">
                        <div className="p-6 border-b border-border-dark flex items-center justify-between bg-white/5">
                            <h3 className="text-sm font-bold text-white uppercase tracking-widest">Commission Ledger</h3>
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 w-4 h-4" />
                                <input
                                    type="text"
                                    placeholder="Search by Driver ID..."
                                    className="bg-background-dark/50 border border-border-dark text-white rounded-lg pl-10 pr-4 py-2 text-xs focus:ring-1 focus:ring-primary focus:outline-none w-64"
                                />
                            </div>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full text-left">
                                <thead className="bg-background-dark/30 text-[10px] uppercase font-black text-slate-500 tracking-tighter">
                                    <tr>
                                        <th className="px-6 py-4">Transaction ID</th>
                                        <th className="px-6 py-4">Driver</th>
                                        <th className="px-6 py-4">Fare</th>
                                        <th className="px-6 py-4">Commission (10%)</th>
                                        <th className="px-6 py-4">Status</th>
                                        <th className="px-6 py-4"></th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-border-dark">
                                    {recentRides.map((ride) => {
                                        const settlement = calculateSettlement(ride.fare);
                                        return (
                                            <tr key={ride.id} className="hover:bg-white/5 transition-colors group">
                                                <td className="px-6 py-4">
                                                    <p className="text-xs font-mono text-slate-400">#{ride.id}</p>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="flex items-center gap-3">
                                                        <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary font-bold text-[10px]">
                                                            {ride.passenger.charAt(0)}
                                                        </div>
                                                        <div>
                                                            <p className="text-xs font-bold text-slate-200">{ride.passenger}</p>
                                                            <p className="text-[10px] text-slate-500">{ride.vehicleType}</p>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 text-xs font-bold text-slate-200">${ride.fare.toFixed(2)}</td>
                                                <td className="px-6 py-4 text-xs font-bold text-primary">${settlement.platformCommission}</td>
                                                <td className="px-6 py-4">
                                                    <span className={`text-[10px] font-bold px-2 py-1 rounded border uppercase ${ride.status === 'completed' ? 'bg-green-500/10 text-green-500 border-green-500/20' :
                                                        ride.status === 'cancelled' ? 'bg-red-500/10 text-red-500 border-red-500/20' :
                                                            'bg-amber-500/10 text-amber-500 border-amber-500/20'
                                                        }`}>
                                                        {ride.status}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 text-right">
                                                    <button className="text-slate-500 hover:text-white transition-colors">
                                                        <ChevronRight size={18} />
                                                    </button>
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* Secondary: Tier Adjustment & Settings */}
                    <div className="col-span-4 space-y-8">
                        <section className="bg-panel-dark border border-border-dark rounded-2xl p-6 shadow-sm">
                            <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-6">Commission Engine Logic</h3>
                            <div className="space-y-6">
                                <div className="p-4 bg-background-dark/50 rounded-xl border border-border-dark">
                                    <div className="flex justify-between items-center mb-3">
                                        <span className="text-sm font-bold text-slate-200">Base Commission</span>
                                        <span className="text-lg font-black text-primary">10.0%</span>
                                    </div>
                                    <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                                        <div className="h-full bg-primary w-[40%]"></div>
                                    </div>
                                </div>

                                <div className="space-y-3">
                                    <div className="flex items-center justify-between p-3 rounded-lg border border-white/5 hover:border-primary/20 transition-all cursor-pointer group">
                                        <div className="flex items-center gap-3">
                                            <div className="p-2 bg-amber-500/10 rounded-lg text-amber-500">
                                                <Calendar size={16} />
                                            </div>
                                            <span className="text-xs font-bold text-slate-300">Rush Hour Multiplier</span>
                                        </div>
                                        <span className="text-xs font-black text-slate-500 group-hover:text-primary active">1.2x</span>
                                    </div>
                                    <div className="flex items-center justify-between p-3 rounded-lg border border-white/5 hover:border-primary/20 transition-all cursor-pointer group">
                                        <div className="flex items-center gap-3">
                                            <div className="p-2 bg-primary/10 rounded-lg text-primary">
                                                <CheckCircle2 size={16} />
                                            </div>
                                            <span className="text-xs font-bold text-slate-300">Loyalty Rebate</span>
                                        </div>
                                        <span className="text-xs font-black text-slate-500 group-hover:text-primary">-2%</span>
                                    </div>
                                </div>
                            </div>
                        </section>

                        <section className="bg-background-dark border border-primary/20 rounded-2xl p-6 relative overflow-hidden group">
                            <div className="absolute -top-4 -right-4 w-24 h-24 bg-primary/5 rounded-full blur-2xl group-hover:bg-primary/10 transition-all"></div>
                            <h3 className="text-xs font-black text-primary uppercase tracking-widest mb-2 flex items-center gap-2">
                                <TrendingUp size={16} /> REVENUE ADVISORY
                            </h3>
                            <p className="text-sm text-slate-400 font-medium mb-4">
                                Global marketplace liquidity is high. Increasing commission floor to <span className="text-white font-bold">12%</span> in high-density zones could yield <span className="text-green-500 font-bold">+$4.2k</span> daily.
                            </p>
                            <button className="w-full py-3 bg-primary/10 border border-primary/30 text-primary font-bold text-xs rounded-xl hover:bg-primary/20 transition-all uppercase tracking-widest">
                                Simulate Impact
                            </button>
                        </section>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FinancialEngine;
