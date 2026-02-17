
import { motion } from 'framer-motion';
import { Wallet as WalletIcon, ArrowUpRight, ArrowDownLeft, CreditCard } from 'lucide-react';

export const Wallet = () => {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-6"
        >
            <div className="grid grid-cols-12 gap-6">
                <div className="col-span-12 lg:col-span-4 glass-morphism rounded-3xl p-8 border border-white/5 bg-gradient-to-br from-brand-green/10 to-transparent">
                    <div className="flex justify-between items-start mb-12">
                        <div className="p-3 bg-brand-green/20 rounded-2xl text-brand-green">
                            <WalletIcon size={24} />
                        </div>
                        <CreditCard size={24} className="text-white/20" />
                    </div>
                    <div>
                        <p className="text-zinc-400 text-sm font-medium">Available Balance</p>
                        <p className="text-4xl font-bold mt-2">$1,240.50</p>
                    </div>
                    <button className="w-full mt-8 py-4 bg-brand-green text-zinc-950 rounded-2xl font-bold hover:scale-[1.02] transition-all glow-accent">
                        Withdraw Funds
                    </button>
                </div>

                <div className="col-span-12 lg:col-span-8 glass-morphism rounded-3xl p-8 border border-white/5">
                    <h3 className="text-xl font-bold mb-6">Recent Transactions</h3>
                    <div className="space-y-4">
                        {[
                            { type: 'in', label: 'Order #4503 Payout', date: 'Oct 24, 2026', amount: '+$14.20', status: 'Completed' },
                            { type: 'in', label: 'Order #4502 Payout', date: 'Oct 24, 2026', amount: '+$17.80', status: 'Completed' },
                            { type: 'out', label: 'Withdrawal to Bank', date: 'Oct 22, 2026', amount: '-$500.00', status: 'Pending' },
                        ].map((tx, i) => (
                            <div key={i} className="flex items-center justify-between p-4 rounded-2xl hover:bg-white/5 transition-colors">
                                <div className="flex items-center gap-4">
                                    <div className={cn(
                                        "p-2 rounded-xl",
                                        tx.type === 'in' ? "bg-brand-green/10 text-brand-green" : "bg-red-500/10 text-red-500"
                                    )}>
                                        {tx.type === 'in' ? <ArrowDownLeft size={18} /> : <ArrowUpRight size={18} />}
                                    </div>
                                    <div>
                                        <p className="font-bold">{tx.label}</p>
                                        <p className="text-xs text-zinc-500">{tx.date}</p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className={cn("font-bold", tx.type === 'in' ? "text-brand-green" : "text-white")}>{tx.amount}</p>
                                    <p className="text-[10px] text-zinc-500 uppercase tracking-widest">{tx.status}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

// Supporting cn for Wallet
import { cn } from '../lib/utils';
