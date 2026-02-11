import {
    Activity,
    Bell,
    Clock,
    Download,
    Filter,
    LayoutDashboard,
    MoreVertical,
    Search,
    TrendingUp,
    User,
    Wallet
} from 'lucide-react';
import React, { useState } from 'react';

export const FinancialDashboard: React.FC = () => {
    const [timeframe, setTimeframe] = useState('30D');

    return (
        <div className="flex h-[calc(100vh-100px)] -m-10 bg-[#0a0f18] text-white overflow-hidden font-uber">
            {/* Sidebar Branding (Mini) */}
            <div className="w-[80px] border-r border-white/5 flex flex-col items-center py-10 gap-10 bg-[#0a0f18] z-20">
                <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center shadow-2xl shadow-blue-600/30">
                    <Activity className="text-white" size={24} />
                </div>
                <div className="flex flex-col gap-8 text-gray-500">
                    <LayoutDashboard size={24} className="cursor-pointer hover:text-white transition-colors" />
                    <Wallet size={24} className="text-blue-500" />
                    <Activity size={24} className="cursor-pointer hover:text-white transition-colors" />
                    <Clock size={24} className="cursor-pointer hover:text-white transition-colors" />
                </div>
                <div className="mt-auto flex flex-col items-center gap-6">
                    <SettingsIcon size={24} className="text-gray-600 cursor-pointer hover:text-white" />
                    <div className="w-10 h-10 rounded-full bg-blue-600/20 flex items-center justify-center border border-blue-500/20">
                        <User size={20} className="text-blue-500" />
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 flex flex-col overflow-hidden bg-[#0d131f]">
                {/* Header */}
                <header className="h-24 px-10 border-b border-white/5 flex items-center justify-between bg-[#0a0f18]">
                    <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center">
                            <Activity className="text-white" size={20} />
                        </div>
                        <h1 className="text-2xl font-bold tracking-tight">RevOps <span className="text-blue-500">Pro</span></h1>
                    </div>

                    <div className="flex-1 max-w-2xl px-12">
                        <div className="relative group">
                            <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-blue-500 transition-colors" size={18} />
                            <input
                                type="text"
                                placeholder="Search drivers, transaction IDs, or payouts..."
                                className="w-full bg-white/5 border border-transparent focus:border-blue-500/30 rounded-2xl py-3.5 pl-14 pr-6 text-sm outline-none transition-all placeholder:text-gray-600 font-medium"
                            />
                        </div>
                    </div>

                    <div className="flex items-center gap-8">
                        <div className="flex items-center gap-3 px-4 py-2 bg-white/5 rounded-full border border-white/5">
                            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                            <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Platform Live</span>
                        </div>
                        <button className="relative p-2.5 bg-white/5 rounded-xl text-gray-400 hover:text-white hover:bg-white/10 transition-all">
                            <Bell size={20} />
                            <span className="absolute top-2 right-2 w-2 h-2 bg-rose-500 rounded-full border-2 border-[#0a0f18]" />
                        </button>
                        <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-2xl flex items-center gap-3 font-bold text-xs shadow-2xl shadow-blue-600/20 transition-all active:scale-95">
                            <LayoutDashboard size={18} /> Process Bulk Payouts
                        </button>
                    </div>
                </header>

                <div className="flex-1 overflow-y-auto p-12 space-y-12 custom-scrollbar">
                    {/* Top Stats Cards */}
                    <div className="grid grid-cols-4 gap-8">
                        <FiscalCard
                            title="Total Platform Revenue"
                            value="$42,850.20"
                            trend="+12.4%"
                            icon={<Activity size={20} />}
                            subtext="10% Commission of $428,502.00 GMV"
                        />
                        <FiscalCard
                            title="Driver Net Earnings"
                            value="$385,651.80"
                            trend="Daily"
                            icon={<Wallet size={20} />}
                            subtext="Paid out to 1,240 active drivers"
                        />
                        <FiscalCard
                            title="Pending Commissions"
                            value="$5,240.50"
                            trend="Action Required"
                            icon={<Clock size={20} />}
                            subtext="From 482 unpayout settlements"
                        />
                        <FiscalCard
                            title="Avg. Price / Ride"
                            value="$18.45"
                            trend="High Growth"
                            icon={<TrendingUp size={20} />}
                            subtext="Negotiated average across platform"
                        />
                    </div>

                    {/* Charts Row */}
                    <div className="grid grid-cols-12 gap-10">
                        <div className="col-span-8 bg-[#0a0f18] rounded-[40px] border border-white/5 p-10 flex flex-col shadow-2xl">
                            <div className="flex items-center justify-between mb-12">
                                <div>
                                    <h3 className="text-xl font-bold tracking-tight">Revenue Growth</h3>
                                    <p className="text-xs text-gray-500 font-medium mt-1">Monthly breakdown of platform commissions</p>
                                </div>
                                <div className="flex gap-2 bg-white/5 p-1 rounded-xl border border-white/5">
                                    {['7D', '30D', '90D'].map(t => (
                                        <button
                                            key={t}
                                            onClick={() => setTimeframe(t)}
                                            className={`px-5 py-2 rounded-lg text-[10px] font-black tracking-widest uppercase transition-all ${timeframe === t ? 'bg-blue-600 text-white shadow-lg' : 'text-gray-500 hover:text-white'}`}
                                        >
                                            {t}
                                        </button>
                                    ))}
                                </div>
                            </div>
                            <div className="flex-1 flex items-end justify-between px-4 pb-4">
                                {[30, 45, 35, 60, 55, 75, 85].map((h, i) => (
                                    <div key={i} className="group relative flex flex-col items-center gap-4 w-12">
                                        <div className="w-full bg-blue-600 rounded-t-xl transition-all duration-700 shadow-xl shadow-blue-600/10 group-hover:bg-blue-500" style={{ height: `${h * 2.5}px` }} />
                                        <span className="text-[10px] font-black text-gray-600 uppercase tracking-widest">{['May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov'][i]}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="col-span-4 bg-[#0a0f18] rounded-[40px] border border-white/5 p-10 flex flex-col gap-10 shadow-2xl">
                            <div>
                                <h3 className="text-xl font-bold tracking-tight">Earnings Snapshot</h3>
                                <div className="h-64 relative flex items-center justify-center mt-6">
                                    <div className="w-40 h-40 rounded-full border-[12px] border-blue-600 border-t-transparent animate-[spin_3s_linear_infinite]" />
                                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                                        <span className="text-4xl font-bold">10%</span>
                                        <p className="text-[10px] text-gray-500 font-black uppercase tracking-widest text-center mt-2 px-10 leading-relaxed">Standard Platform Fee <br /> <span className="text-gray-600 font-medium normal-case tracking-normal">Auto-deducted from settlements</span></p>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-8">
                                <ProgressBar label="Fast-Payout Eligibility" progress={84} color="bg-blue-500" />
                                <ProgressBar label="KYC Verified Drivers" progress={92} color="bg-emerald-500" />
                            </div>

                            <p className="text-[10px] text-gray-500 italic leading-relaxed text-center font-medium">
                                "Peak hours (18:00 - 20:00) generated 32% of today's platform revenue."
                            </p>
                        </div>
                    </div>

                    {/* Table Section */}
                    <div className="bg-[#0a0f18] rounded-[40px] border border-white/5 overflow-hidden shadow-2xl">
                        <div className="p-10 border-b border-white/5 flex items-center justify-between">
                            <div>
                                <h3 className="text-xl font-bold tracking-tight">Driver Wallet Ledger</h3>
                                <p className="text-xs text-gray-500 font-medium mt-1">Manage earnings, fees, and balances for payout</p>
                            </div>
                            <div className="flex gap-4">
                                <button className="flex items-center gap-3 px-6 py-3 bg-white/5 rounded-2xl border border-white/5 text-xs font-bold text-gray-400 hover:text-white transition-all">
                                    <Filter size={16} /> Filter
                                </button>
                                <button className="flex items-center gap-3 px-6 py-3 bg-white/5 rounded-2xl border border-white/5 text-xs font-bold text-gray-400 hover:text-white transition-all">
                                    <Download size={16} /> Export CSV
                                </button>
                            </div>
                        </div>

                        <div className="overflow-x-auto">
                            <table className="w-full text-left">
                                <thead className="bg-[#0d131f]/50 text-[10px] font-black text-gray-500 uppercase tracking-widest">
                                    <tr>
                                        <th className="px-10 py-6 w-12"><input type="checkbox" className="rounded border-white/10 bg-white/5" /></th>
                                        <th className="px-10 py-6">Driver Name</th>
                                        <th className="px-10 py-6">Total Negotiated</th>
                                        <th className="px-10 py-6">Platform Fee (10%)</th>
                                        <th className="px-10 py-6">Net Balance</th>
                                        <th className="px-10 py-6">Status</th>
                                        <th className="px-10 py-6 text-right">Action</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-white/5">
                                    <LedgerRow
                                        name="Michael Chen"
                                        id="DRV-8821"
                                        total="$1,240.00"
                                        fee="-$124.00"
                                        net="$1,116.00"
                                        status="READY"
                                        img="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=100&auto=format&fit=crop"
                                    />
                                    <LedgerRow
                                        name="Sarah Jenkins"
                                        id="DRV-4105"
                                        total="$850.50"
                                        fee="-$85.05"
                                        net="$765.45"
                                        status="VERIFICATION"
                                        img="https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=100&auto=format&fit=crop"
                                    />
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const FiscalCard = ({ title, value, trend, icon, subtext }: any) => (
    <div className="bg-[#0a0f18] p-10 rounded-[35px] border border-white/5 bg-gradient-to-br from-white/5 to-transparent shadow-2xl group hover:border-blue-500/20 transition-all">
        <div className="flex items-center justify-between mb-8">
            <div className="w-10 h-10 bg-blue-600/10 rounded-xl flex items-center justify-center text-blue-500">
                {icon}
            </div>
            <span className={`text-[10px] font-black px-2.5 py-1 rounded-lg tracking-widest uppercase ${trend === 'Action Required' ? 'bg-amber-500/10 text-amber-500' : 'bg-blue-500/10 text-blue-500'}`}>
                {trend}
            </span>
        </div>
        <div>
            <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest block mb-1">{title}</span>
            <span className="text-3xl font-bold tracking-tight">{value}</span>
            <p className="text-[10px] text-gray-600 font-medium mt-4 leading-relaxed">{subtext}</p>
        </div>
    </div>
);

const ProgressBar = ({ label, progress, color }: any) => (
    <div className="space-y-2.5">
        <div className="flex items-center justify-between text-[10px] font-black uppercase tracking-widest">
            <span className="text-gray-500">{label}</span>
            <span className="text-white">{progress}%</span>
        </div>
        <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
            <div className={`h-full ${color} rounded-full transition-all duration-1000`} style={{ width: `${progress}%` }} />
        </div>
    </div>
);

const LedgerRow = ({ name, id, total, fee, net, status, img }: any) => (
    <tr className="group hover:bg-white/[0.02] transition-colors cursor-default">
        <td className="px-10 py-6"><input type="checkbox" className="rounded border-white/10 bg-white/5" /></td>
        <td className="px-10 py-6">
            <div className="flex items-center gap-4">
                <img src={img} className="w-10 h-10 rounded-full border border-white/5 bg-zinc-800 object-cover" alt="" />
                <div>
                    <span className="text-sm font-bold block">{name}</span>
                    <span className="text-[10px] text-gray-500 font-bold tracking-widest uppercase">{id}</span>
                </div>
            </div>
        </td>
        <td className="px-10 py-6 text-sm font-bold">{total}</td>
        <td className="px-10 py-6 text-sm font-medium text-gray-500">{fee}</td>
        <td className="px-10 py-6 text-sm font-bold text-blue-500">{net}</td>
        <td className="px-10 py-6">
            <span className={`text-[9px] font-black px-3 py-1.5 rounded-lg tracking-[0.1em] uppercase ${status === 'READY' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-amber-500/10 text-amber-500'}`}>
                {status}
            </span>
        </td>
        <td className="px-10 py-6 text-right text-gray-600">
            <MoreVertical size={18} className="ml-auto cursor-pointer hover:text-white" />
        </td>
    </tr>
);

const SettingsIcon = ({ size, className }: any) => (
    <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={className}
    >
        <circle cx="12" cy="12" r="3" />
        <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
    </svg>
);

export default FinancialDashboard;
