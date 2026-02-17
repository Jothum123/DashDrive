import { TrendingUp, ArrowDownLeft, ArrowUpRight, DollarSign, RefreshCw } from 'lucide-react';
import { cn } from '../lib/utils';

export const ZimWallet = () => {
    return (
        <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* USD Balance */}
                {/* USD Balance */}
                <div className="bg-white rounded-3xl p-8 border border-zinc-200 relative overflow-hidden group shadow-sm">
                    <div className="flex justify-between items-start mb-12">
                        <div className="p-3 bg-brand-green/10 rounded-2xl text-brand-green group-hover:scale-110 transition-transform">
                            <DollarSign size={24} />
                        </div>
                        <p className="text-[10px] font-bold text-brand-green bg-brand-green/10 px-2 py-1 rounded-full uppercase tracking-tighter">USD Account</p>
                    </div>
                    <p className="text-zinc-500 text-sm font-medium">Available Balance (USD)</p>
                    <p className="text-4xl font-bold mt-2 text-zinc-900">$840.50</p>
                    <div className="mt-8 flex gap-3">
                        <button className="flex-1 py-3 bg-brand-green text-zinc-950 rounded-xl font-bold text-sm shadow-lg shadow-brand-green/20 hover:opacity-90 transition-all">Withdraw</button>
                        <button className="px-4 py-3 bg-zinc-100 rounded-xl text-zinc-400 hover:text-zinc-900 transition-all border border-zinc-200"><RefreshCw size={18} /></button>
                    </div>
                </div>

                {/* ZiG Balance */}
                <div className="bg-white rounded-3xl p-8 border border-zinc-200 relative overflow-hidden group shadow-sm">
                    <div className="flex justify-between items-start mb-12">
                        <div className="p-3 bg-amber-500/10 rounded-2xl text-amber-500 group-hover:scale-110 transition-transform">
                            <TrendingUp size={24} />
                        </div>
                        <p className="text-[10px] font-bold text-amber-500 bg-amber-500/10 px-2 py-1 rounded-full uppercase tracking-tighter">ZiG Account</p>
                    </div>
                    <p className="text-zinc-500 text-sm font-medium">Available Balance (ZWG)</p>
                    <p className="text-4xl font-bold mt-2 text-zinc-900">24,500.00</p>
                    <div className="mt-8 flex gap-3">
                        <button className="flex-1 py-3 bg-amber-500 text-zinc-950 rounded-xl font-bold text-sm shadow-lg shadow-amber-500/20 hover:opacity-90 transition-all">Settle to Bank</button>
                        <button className="px-4 py-3 bg-zinc-100 rounded-xl text-zinc-400 hover:text-zinc-900 transition-all border border-zinc-200"><RefreshCw size={18} /></button>
                    </div>
                </div>
            </div>

            <div className="bg-white rounded-3xl p-8 border border-zinc-200 shadow-sm">
                <h3 className="text-lg font-bold mb-6 text-zinc-900">Settlement Ledger</h3>
                <div className="space-y-4">
                    {[
                        { type: 'in', label: 'Order #4509 (Supermarket)', date: 'Oct 26, 2026', amount: '+$42.50', currency: 'USD', status: 'Settled' },
                        { type: 'in', label: 'Order #4508 (Bakery)', date: 'Oct 26, 2026', amount: '+1,240.00', currency: 'ZWG', status: 'In Escrow' },
                        { type: 'out', label: 'Batch Payout - EcoCash', date: 'Oct 25, 2026', amount: '-$200.00', currency: 'USD', status: 'Completed' },
                    ].map((tx, i) => (
                        <div key={i} className="flex items-center justify-between p-4 rounded-2xl hover:bg-zinc-50 transition-all border border-transparent hover:border-zinc-100">
                            <div className="flex items-center gap-4">
                                <div className={cn(
                                    "p-2 rounded-xl",
                                    tx.type === 'in' ? "bg-brand-green/10 text-brand-green" : "bg-red-50 text-red-500"
                                )}>
                                    {tx.type === 'in' ? <ArrowDownLeft size={18} /> : <ArrowUpRight size={18} />}
                                </div>
                                <div>
                                    <p className="font-bold text-sm text-zinc-900">{tx.label}</p>
                                    <p className="text-[10px] text-zinc-500 font-medium">{tx.date} • {tx.currency}</p>
                                </div>
                            </div>
                            <div className="text-right">
                                <p className={cn(
                                    "font-bold",
                                    tx.type === 'in' ? "text-brand-green" : "text-zinc-900"
                                )}>{tx.amount}</p>
                                <span className="text-[10px] text-zinc-400 uppercase tracking-widest font-bold">{tx.status}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};
