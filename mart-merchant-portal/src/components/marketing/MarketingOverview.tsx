import {
    Megaphone, TrendingUp, Users,
    Star, Zap,
    MousePointer2
} from 'lucide-react';
import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
    ResponsiveContainer
} from 'recharts';

const promoData = [
    { name: 'Jan', redemptions: 400, sales: 2400 },
    { name: 'Feb', redemptions: 300, sales: 1398 },
    { name: 'Mar', redemptions: 200, sales: 9800 },
    { name: 'Apr', redemptions: 278, sales: 3908 },
    { name: 'May', redemptions: 189, sales: 4800 },
    { name: 'Jun', redemptions: 239, sales: 3800 },
];

export function MarketingOverview() {
    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            {/* Top Level Marketing Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {[
                    { label: 'Total Redemptions', value: '1,284', change: '+12.5%', icon: Megaphone, color: 'blue' },
                    { label: 'Promo Sales', value: '$8,432.00', change: '+18.2%', icon: TrendingUp, color: 'emerald' },
                    { label: 'New Customers', value: '342', change: '+5.4%', icon: Users, color: 'indigo' },
                    { label: 'Click Rate', value: '4.2%', change: '+0.8%', icon: MousePointer2, color: 'amber' },
                ].map((stat, i) => (
                    <div key={i} className="bg-white p-6 rounded-[32px] border border-gray-100 shadow-sm">
                        <div className="flex items-center justify-between mb-4">
                            <div className={`p-2.5 bg-${stat.color}-50 text-${stat.color}-600 rounded-xl`}>
                                <stat.icon size={20} />
                            </div>
                            <span className="text-[10px] font-black text-emerald-500 bg-emerald-50 px-2 py-1 rounded-lg">{stat.change}</span>
                        </div>
                        <p className="text-xs font-black text-gray-400 uppercase tracking-widest">{stat.label}</p>
                        <p className="text-2xl font-black text-gray-800 tracking-tighter mt-1">{stat.value}</p>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Promotion Performance Chart */}
                <div className="lg:col-span-2 bg-white rounded-[40px] border border-gray-100 shadow-sm p-8">
                    <div className="flex items-center justify-between mb-10">
                        <div>
                            <h3 className="text-xl font-black text-gray-800 tracking-tight">Campaign Impact</h3>
                            <p className="text-xs text-gray-400 font-medium mt-0.5">Incremental sales driven by promotions</p>
                        </div>
                    </div>
                    <div className="h-[300px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={promoData}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                                <XAxis
                                    dataKey="name"
                                    axisLine={false}
                                    tickLine={false}
                                    tick={{ fontSize: 10, fontWeight: 900, fill: '#94a3b8' }}
                                />
                                <YAxis
                                    axisLine={false}
                                    tickLine={false}
                                    tick={{ fontSize: 10, fontWeight: 900, fill: '#94a3b8' }}
                                />
                                <Tooltip
                                    contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                                    labelStyle={{ fontWeight: 900, color: '#1e293b' }}
                                />
                                <Bar dataKey="sales" fill="#3b82f6" radius={[4, 4, 0, 0]} barSize={32} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Featured / Boosted Items */}
                <div className="bg-white rounded-[40px] border border-gray-100 shadow-sm p-8">
                    <div className="flex items-center justify-between mb-8">
                        <h3 className="text-lg font-black text-gray-800 tracking-tight">Featured Items</h3>
                        <button className="text-xs font-black text-blue-600 hover:text-blue-700 uppercase tracking-widest">Manage</button>
                    </div>
                    <div className="space-y-6">
                        {[
                            { name: 'Organic Bananas', sales: 124, boost: '2.4x', image: 'https://images.unsplash.com/photo-1603833665858-e61d17a86224?auto=format&fit=crop&q=80&w=100&h=100' },
                            { name: 'Whole Milk 2L', sales: 89, boost: '1.8x', image: 'https://images.unsplash.com/photo-1550583726-2248277c63b2?auto=format&fit=crop&q=80&w=100&h=100' },
                            { name: 'Avocado Pack', sales: 212, boost: '3.1x', image: 'https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?auto=format&fit=crop&q=80&w=100&h=100' },
                        ].map((item, i) => (
                            <div key={i} className="flex items-center gap-4 group">
                                <img src={item.image} alt={item.name} className="size-12 rounded-xl object-cover shadow-sm group-hover:scale-105 transition-transform" />
                                <div className="flex-1">
                                    <p className="text-sm font-black text-gray-800 leading-tight">{item.name}</p>
                                    <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-1">{item.sales} sales</p>
                                </div>
                                <div className="text-right">
                                    <div className="flex items-center gap-1 text-emerald-500 bg-emerald-50 px-2 py-0.5 rounded-lg">
                                        <Zap size={10} className="fill-emerald-500" />
                                        <span className="text-[10px] font-black">{item.boost}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="mt-8 p-6 bg-blue-50/50 rounded-3xl border border-blue-50">
                        <div className="flex items-start gap-4">
                            <Star className="text-blue-500 mt-1 shrink-0" size={18} />
                            <div>
                                <p className="text-xs font-bold text-blue-900 leading-tight">Boost Visibility</p>
                                <p className="text-[10px] text-blue-700/70 mt-1 leading-normal">Boosted items appear 30% more often in search results.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
