
import { motion } from 'framer-motion';
import { ShoppingBag, Users, Wallet as WalletIcon, TrendingUp, Clock, AlertCircle } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
    { name: '08:00', sales: 400 },
    { name: '10:00', sales: 700 },
    { name: '12:00', sales: 1200 },
    { name: '14:00', sales: 900 },
    { name: '16:00', sales: 1500 },
    { name: '18:00', sales: 1800 },
    { name: '20:00', sales: 1300 },
];

export const Dashboard = () => {
    return (
        <div className="grid grid-cols-12 gap-6">
            {/* Top Stats */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="col-span-12 lg:col-span-4 glass-morphism rounded-3xl p-6 relative overflow-hidden group shadow-sm hover:shadow-md transition-shadow"
            >
                <div className="flex items-center justify-between mb-4">
                    <div className="p-3 bg-brand-green/10 rounded-2xl">
                        <ShoppingBag className="text-brand-green" size={24} />
                    </div>
                    <span className="text-xs font-bold text-brand-green bg-brand-green/10 px-2 py-1 rounded-full">+12%</span>
                </div>
                <h3 className="text-zinc-500 text-sm font-medium">Orders Today</h3>
                <p className="text-3xl font-bold mt-1 text-zinc-900">42</p>
                <div className="absolute -right-4 -bottom-4 w-32 h-32 bg-brand-green/5 rounded-full blur-3xl group-hover:bg-brand-green/10 transition-colors"></div>
            </motion.div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="col-span-12 lg:col-span-4 glass-morphism rounded-3xl p-6 relative overflow-hidden group shadow-sm hover:shadow-md transition-shadow"
            >
                <div className="flex items-center justify-between mb-4">
                    <div className="p-3 bg-blue-500/10 rounded-2xl">
                        <Users className="text-blue-500" size={24} />
                    </div>
                    <span className="text-xs font-bold text-blue-500 bg-blue-500/10 px-2 py-1 rounded-full">8 Active</span>
                </div>
                <h3 className="text-zinc-500 text-sm font-medium">Active Drivers</h3>
                <p className="text-3xl font-bold mt-1 text-zinc-900">12</p>
                <div className="absolute -right-4 -bottom-4 w-32 h-32 bg-blue-500/5 rounded-full blur-3xl group-hover:bg-blue-500/10 transition-colors"></div>
            </motion.div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="col-span-12 lg:col-span-4 glass-morphism rounded-3xl p-6 relative overflow-hidden group shadow-sm hover:shadow-md transition-shadow"
            >
                <div className="flex items-center justify-between mb-4">
                    <div className="p-3 bg-amber-500/10 rounded-2xl">
                        <WalletIcon className="text-amber-500" size={24} />
                    </div>
                    <TrendingUp className="text-zinc-400" size={20} />
                </div>
                <h3 className="text-zinc-500 text-sm font-medium">Wallet Balance</h3>
                <p className="text-3xl font-bold mt-1 text-zinc-900">$1,240.50</p>
                <p className="text-xs text-zinc-400 mt-1">Paynow Escrow: $450.00</p>
                <div className="absolute -right-4 -bottom-4 w-32 h-32 bg-amber-500/5 rounded-full blur-3xl group-hover:bg-amber-500/10 transition-colors"></div>
            </motion.div>

            {/* Main Chart */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="col-span-12 lg:col-span-8 glass-morphism rounded-3xl p-6 shadow-sm"
            >
                <div className="flex items-center justify-between mb-6">
                    <h3 className="text-lg font-bold text-zinc-900">Revenue Distribution</h3>
                    <div className="flex gap-2">
                        <button className="px-3 py-1 rounded-full bg-brand-green text-zinc-950 text-xs font-bold shadow-sm shadow-brand-green/20">USD</button>
                        <button className="px-3 py-1 rounded-full bg-zinc-100 text-zinc-500 text-xs font-bold border border-zinc-200 hover:text-zinc-900 transition-colors">ZiG</button>
                    </div>
                </div>
                <div className="h-64 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={data}>
                            <defs>
                                <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#00ff90" stopOpacity={0.3} />
                                    <stop offset="95%" stopColor="#00ff90" stopOpacity={0} />
                                </linearGradient>
                            </defs>
                            <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#71717a', fontSize: 12 }} />
                            <YAxis hide />
                            <Tooltip
                                contentStyle={{ backgroundColor: '#ffffff', border: '1px solid #e4e4e7', borderRadius: '12px', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}
                                itemStyle={{ color: '#00cc74' }}
                            />
                            <Area type="monotone" dataKey="sales" stroke="#00ff90" strokeWidth={3} fillOpacity={1} fill="url(#colorSales)" />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
            </motion.div>

            {/* Status Widget */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="col-span-12 lg:col-span-4 glass-morphism rounded-3xl p-6 flex flex-col justify-between shadow-sm"
            >
                <div>
                    <h3 className="text-lg font-bold mb-4 text-zinc-900">Store Status</h3>
                    <div className="space-y-4">
                        <div className="flex items-center gap-3 p-3 rounded-2xl bg-brand-green/5 border border-brand-green/10">
                            <div className="w-2 h-2 rounded-full bg-brand-green animate-pulse"></div>
                            <span className="text-sm font-medium text-zinc-800">Accepting Orders</span>
                            <button className="ml-auto text-xs font-bold text-zinc-400 hover:text-zinc-600 transition-colors">Switch Busy</button>
                        </div>
                        <div className="flex items-center gap-3 p-3 rounded-2xl bg-zinc-100 border border-zinc-200">
                            <Clock size={16} className="text-zinc-400" />
                            <div className="flex flex-col">
                                <span className="text-sm font-medium text-zinc-700">Auto-Pause</span>
                                <span className="text-[10px] text-zinc-500">Enable during peak hours</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mt-8 p-4 rounded-2xl bg-red-50 border border-red-100">
                    <div className="flex items-center gap-2 mb-1">
                        <AlertCircle size={16} className="text-red-500" />
                        <span className="text-sm font-bold text-red-600">2 Low Stock Items</span>
                    </div>
                    <p className="text-xs text-red-500/70 font-medium">Wagyu Patty, Brioche Buns</p>
                </div>
            </motion.div>
        </div>
    );
};
