import { AlertCircle, CheckCircle2, Clock, CreditCard, Download, Filter, Search, Wallet } from 'lucide-react';
import { Header } from '../components/layout/Header';

export function Payouts() {
    return (
        <div className="min-h-screen bg-black text-white flex flex-col">
            <Header title="Payouts" subtitle="Driver Settlements & Payment Processing" />

            <div className="flex-1 p-8 space-y-8">

                {/* Stats Row */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="p-8 bg-zinc-900/50 border border-zinc-800 rounded-[40px] flex items-center justify-between group hover:border-primary/30 transition-all">
                        <div>
                            <p className="text-zinc-500 text-[10px] font-black uppercase tracking-widest mb-1">Pending Payouts</p>
                            <p className="text-3xl font-black tracking-tighter text-white">£42,500</p>
                        </div>
                        <div className="p-4 bg-black rounded-3xl border border-zinc-800 group-hover:scale-110 transition-transform">
                            <Clock className="text-orange-500" size={24} />
                        </div>
                    </div>
                    <div className="p-8 bg-zinc-900/50 border border-zinc-800 rounded-[40px] flex items-center justify-between group hover:border-primary/30 transition-all">
                        <div>
                            <p className="text-zinc-500 text-[10px] font-black uppercase tracking-widest mb-1">Settled (This Week)</p>
                            <p className="text-3xl font-black tracking-tighter text-white">£184.2k</p>
                        </div>
                        <div className="p-4 bg-black rounded-3xl border border-zinc-800 group-hover:scale-110 transition-transform">
                            <Wallet className="text-primary" size={24} />
                        </div>
                    </div>
                    <div className="p-8 bg-primary rounded-[40px] flex flex-col justify-between group overflow-hidden relative">
                        <div className="relative z-10">
                            <p className="text-black/60 text-[10px] font-black uppercase tracking-widest mb-1">Process All</p>
                            <p className="text-xl font-black text-black">Batch Release Payouts</p>
                        </div>
                        <button className="relative z-10 mt-4 py-2.5 bg-black text-primary text-[10px] font-black uppercase tracking-widest rounded-xl shadow-xl hover:scale-105 transition-all">
                            Initialize Batch
                        </button>
                        <CreditCard size={100} className="absolute -right-8 -bottom-8 text-black/10 rotate-12 group-hover:scale-110 transition-transform duration-700" />
                    </div>
                </div>

                {/* Main Table Section */}
                <div className="bg-zinc-900/50 border border-zinc-800 rounded-[40px] overflow-hidden">
                    <div className="p-8 border-b border-zinc-800 flex flex-wrap items-center justify-between gap-4 bg-zinc-900/20">
                        <h3 className="text-lg font-black tracking-tighter">Settlement History</h3>
                        <div className="flex items-center gap-3">
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" size={16} />
                                <input
                                    type="text"
                                    placeholder="Search driver ID..."
                                    className="pl-10 pr-4 py-2 bg-black border border-zinc-800 rounded-xl text-xs focus:border-primary outline-none transition-all w-64"
                                />
                            </div>
                            <button className="p-2.5 bg-zinc-800 border border-zinc-700 rounded-xl text-zinc-400 hover:text-white transition-all">
                                <Filter size={18} />
                            </button>
                            <button className="px-5 py-2.5 bg-zinc-800 border border-zinc-700 rounded-xl text-[10px] font-black uppercase tracking-widest flex items-center gap-2 hover:bg-zinc-700 transition-all">
                                <Download size={14} className="text-primary" />
                                Tax Export
                            </button>
                        </div>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead>
                                <tr className="text-zinc-500 text-[10px] font-black uppercase tracking-widest border-b border-zinc-800">
                                    <th className="px-8 py-5">Driver</th>
                                    <th className="px-8 py-5">Amount</th>
                                    <th className="px-8 py-5">Bank Account</th>
                                    <th className="px-8 py-5">Status</th>
                                    <th className="px-8 py-5 text-right">Reference</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-zinc-800/50 text-sm">
                                {[
                                    { name: 'Alex Thompson', amount: '£1,240.50', bank: 'HSBC •••• 4521', status: 'completed' },
                                    { name: 'Sarah Parker', amount: '£842.20', bank: 'Monzo •••• 8812', status: 'pending' },
                                    { name: 'Michael Chen', amount: '£2,150.00', bank: 'Barclays •••• 1092', status: 'completed' },
                                    { name: 'Ema Wilson', amount: '£540.00', bank: 'Revolut •••• 3341', status: 'failed' },
                                ].map((item, idx) => (
                                    <tr key={idx} className="hover:bg-zinc-800/20 transition-all group">
                                        <td className="px-8 py-5">
                                            <div className="flex items-center gap-3">
                                                <div className="w-8 h-8 rounded-lg bg-zinc-800 flex items-center justify-center font-black text-[10px] text-primary">
                                                    {item.name.charAt(0)}
                                                </div>
                                                <span className="font-black text-white">{item.name}</span>
                                            </div>
                                        </td>
                                        <td className="px-8 py-5 font-bold">{item.amount}</td>
                                        <td className="px-8 py-5 text-zinc-500 font-bold">{item.bank}</td>
                                        <td className="px-8 py-5">
                                            <div className="flex items-center gap-2">
                                                {item.status === 'completed' ? (
                                                    <CheckCircle2 size={14} className="text-primary" />
                                                ) : item.status === 'pending' ? (
                                                    <Clock size={14} className="text-orange-500" />
                                                ) : (
                                                    <AlertCircle size={14} className="text-red-500" />
                                                )}
                                                <span className={`text-[10px] font-black uppercase tracking-widest ${item.status === 'completed' ? 'text-primary' :
                                                        item.status === 'pending' ? 'text-orange-500' : 'text-red-500'
                                                    }`}>
                                                    {item.status}
                                                </span>
                                            </div>
                                        </td>
                                        <td className="px-8 py-5 text-right text-zinc-600 font-black text-[10px]">#TRX-8812-00{idx}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}
