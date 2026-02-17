
import { motion } from 'framer-motion';
import { BarChart3, TrendingUp, DollarSign, Calendar } from 'lucide-react';

export const Analytics = () => {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-6"
        >
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {[
                    { label: 'Total Revenue', value: '$12,450.00', icon: DollarSign, color: 'text-brand-green', bg: 'bg-brand-green/10' },
                    { label: 'Avg. Order Value', value: '$24.50', icon: TrendingUp, color: 'text-blue-600', bg: 'bg-blue-50' },
                    { label: 'Orders Completed', value: '542', icon: BarChart3, color: 'text-purple-600', bg: 'bg-purple-50' },
                    { label: 'Active Days', value: '28', icon: Calendar, color: 'text-amber-600', bg: 'bg-amber-50' },
                ].map((stat, i) => (
                    <div key={i} className="bg-white rounded-3xl p-6 border border-zinc-200 shadow-sm transition-shadow hover:shadow-md">
                        <div className={`p-3 w-fit rounded-2xl ${stat.bg} ${stat.color} mb-4`}>
                            <stat.icon size={20} />
                        </div>
                        <p className="text-zinc-500 text-sm font-medium">{stat.label}</p>
                        <p className="text-2xl font-bold mt-1 text-zinc-900">{stat.value}</p>
                    </div>
                ))}
            </div>

            <div className="bg-white rounded-3xl p-8 border border-zinc-200 h-96 flex flex-col items-center justify-center text-zinc-400 shadow-sm">
                <BarChart3 size={48} className="mb-4 opacity-10" />
                <p className="text-lg font-bold text-zinc-900">Advanced Charts Powered by Recharts</p>
                <p className="text-sm font-medium">Detailed financial breakdowns will appear here.</p>
            </div>
        </motion.div>
    );
};
