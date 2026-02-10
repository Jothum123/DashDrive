import { CreditCard, Download, RefreshCw, TrendingUp, Wallet } from 'lucide-react';
import {
    Area,
    AreaChart,
    CartesianGrid,
    Cell,
    Pie,
    PieChart,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from 'recharts';
import PageBreadcrumb from '../components/common/PageBreadcrumb';
import { useAdminStore } from '../stores/adminStore';

// Mock data for charts
const monthlyRevenue = [
    { name: 'Jan', revenue: 45000, payouts: 38000 },
    { name: 'Feb', revenue: 52000, payouts: 44000 },
    { name: 'Mar', revenue: 48000, payouts: 41000 },
    { name: 'Apr', revenue: 61000, payouts: 52000 },
    { name: 'May', revenue: 55000, payouts: 47000 },
    { name: 'Jun', revenue: 67000, payouts: 57000 },
];

const revenueBreakdown = [
    { name: 'Ride Commission', value: 65, color: '#00ff90' },
    { name: 'Surge Pricing', value: 20, color: '#465fff' },
    { name: 'Cancellation Fees', value: 10, color: '#f59e0b' },
    { name: 'Other', value: 5, color: '#64748b' },
];

export function Financials() {
    const { transactions, getStats } = useAdminStore();
    const stats = getStats();

    const recentTransactions = transactions.slice(0, 10);

    return (
        <div className="min-h-screen bg-transparent dark:text-white/90 flex flex-col">
            <PageBreadcrumb pageTitle="Fiscal Oversight" />

            <div className="space-y-6">
                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                    <FinancialStat
                        title="Total Gross Revenue"
                        value={`£${(stats.totalRevenue * 100).toLocaleString(undefined, { minimumFractionDigits: 2 })}`}
                        change="+12.5%"
                        icon={<TrendingUp size={20} className="text-primary" />}
                        trend="up"
                    />
                    <FinancialStat
                        title="Aggregate Payouts"
                        value={`£${stats.totalPayouts.toLocaleString(undefined, { minimumFractionDigits: 2 })}`}
                        icon={<Wallet size={20} className="text-secondary" />}
                    />
                    <FinancialStat
                        title="Pending Settlements"
                        value={transactions.filter((t) => t.status === 'pending').length.toString()}
                        icon={<CreditCard size={20} className="text-warning-500" />}
                    />
                    <FinancialStat
                        title="Refund Quarantine"
                        value={transactions.filter((t) => t.type === 'refund').length.toString()}
                        icon={<RefreshCw size={20} className="text-gray-400" />}
                    />
                </div>

                {/* Charts Row */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Revenue Chart */}
                    <div className="lg:col-span-2 card p-6 shadow-sm">
                        <div className="flex items-center justify-between mb-8">
                            <div>
                                <h3 className="text-lg font-bold text-gray-800 dark:text-white tracking-tight">Earnings Trajectory</h3>
                                <p className="text-xs text-gray-500 dark:text-gray-400">Revenue vs Settlement Analysis</p>
                            </div>
                            <button className="flex items-center gap-2 px-4 py-2 border border-gray-100 dark:border-gray-800 rounded-xl text-xs font-bold text-gray-500 hover:text-primary transition-all">
                                <Download size={14} />
                                EXPORT
                            </button>
                        </div>
                        <div className="h-[300px]">
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={monthlyRevenue}>
                                    <defs>
                                        <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#00ff90" stopOpacity={0.15} />
                                            <stop offset="95%" stopColor="#00ff90" stopOpacity={0} />
                                        </linearGradient>
                                        <linearGradient id="colorPay" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#465fff" stopOpacity={0.1} />
                                            <stop offset="95%" stopColor="#465fff" stopOpacity={0} />
                                        </linearGradient>
                                    </defs>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} className="dark:stroke-gray-800" />
                                    <XAxis dataKey="name" axisLine={false} tickLine={false} stroke="#94a3b8" fontSize={10} fontWeight="bold" dy={10} />
                                    <YAxis axisLine={false} tickLine={false} stroke="#94a3b8" fontSize={10} fontWeight="bold" />
                                    <Tooltip
                                        contentStyle={{ backgroundColor: '#101828', border: 'none', borderRadius: '12px' }}
                                        labelStyle={{ color: '#fff', fontWeight: 'bold' }}
                                        itemStyle={{ fontSize: '11px' }}
                                    />
                                    <Area
                                        type="monotone"
                                        dataKey="revenue"
                                        stroke="#00ff90"
                                        strokeWidth={3}
                                        fillOpacity={1}
                                        fill="url(#colorRev)"
                                    />
                                    <Area
                                        type="monotone"
                                        dataKey="payouts"
                                        stroke="#465fff"
                                        strokeWidth={2}
                                        fillOpacity={1}
                                        fill="url(#colorPay)"
                                    />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    {/* Revenue Breakdown */}
                    <div className="card p-6 flex flex-col shadow-sm">
                        <div className="mb-6">
                            <h3 className="text-lg font-bold text-gray-800 dark:text-white tracking-tight">Vector Distribution</h3>
                            <p className="text-xs text-gray-500 dark:text-gray-400">Revenue source allocation</p>
                        </div>
                        <div className="flex-1 min-h-[220px]">
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie
                                        data={revenueBreakdown}
                                        cx="50%"
                                        cy="50%"
                                        innerRadius={65}
                                        outerRadius={85}
                                        paddingAngle={6}
                                        dataKey="value"
                                        stroke="none"
                                    >
                                        {revenueBreakdown.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={entry.color} />
                                        ))}
                                    </Pie>
                                </PieChart>
                            </ResponsiveContainer>
                        </div>
                        <div className="space-y-3 mt-6 p-4 bg-gray-50 dark:bg-white/[0.03] rounded-2xl border border-gray-100 dark:border-gray-800">
                            {revenueBreakdown.map((item) => (
                                <div key={item.name} className="flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <div
                                            className="w-2.5 h-2.5 rounded-full"
                                            style={{ backgroundColor: item.color }}
                                        />
                                        <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">{item.name}</span>
                                    </div>
                                    <span className="text-xs font-bold text-gray-800 dark:text-white">{item.value}%</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Recent Transactions */}
                <div className="card overflow-hidden shadow-sm">
                    <div className="p-6 border-b border-gray-100 dark:border-gray-800 flex items-center justify-between">
                        <div>
                            <h3 className="text-lg font-bold text-gray-800 dark:text-white tracking-tight">Live Transaction Log</h3>
                            <p className="text-xs text-gray-500 dark:text-gray-400">Real-time fiscal activity feed</p>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Live Feed</span>
                        </div>
                    </div>
                    <div className="overflow-x-auto no-scrollbar">
                        <table className="w-full text-left">
                            <thead>
                                <tr className="text-gray-400 text-[11px] font-bold uppercase tracking-widest border-b border-gray-100 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-900/50">
                                    <th className="py-4 px-6">Transaction ID</th>
                                    <th className="py-4 px-6">Type</th>
                                    <th className="py-4 px-6">Context</th>
                                    <th className="py-4 px-6">Status</th>
                                    <th className="py-4 px-6 text-right">Capital Delta</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                                {recentTransactions.map((txn) => (
                                    <tr
                                        key={txn.id}
                                        className="group hover:bg-gray-50 dark:hover:bg-white/[0.01] transition-colors"
                                    >
                                        <td className="py-5 px-6">
                                            <span className="text-[12px] font-bold text-gray-500 dark:text-gray-400 font-mono tracking-tighter">#{txn.id}</span>
                                        </td>
                                        <td className="py-5 px-6">
                                            <span
                                                className={`badge ${txn.type === 'ride'
                                                    ? 'badge-success'
                                                    : txn.type === 'payout'
                                                        ? 'badge-warning'
                                                        : 'badge-error'
                                                    }`}
                                            >
                                                {txn.type}
                                            </span>
                                        </td>
                                        <td className="py-5 px-6 text-sm font-bold text-gray-700 dark:text-gray-300">{txn.description}</td>
                                        <td className="py-5 px-6">
                                            <div className="flex items-center gap-2">
                                                <div className={`w-1.5 h-1.5 rounded-full ${txn.status === 'completed' ? 'bg-primary' : 'bg-warning-500'}`} />
                                                <span className={`text-[10px] font-bold uppercase tracking-widest ${txn.status === 'completed' ? 'text-primary' : 'text-warning-500'}`}>
                                                    {txn.status}
                                                </span>
                                            </div>
                                        </td>
                                        <td className={`py-5 px-6 text-right font-bold text-sm tracking-tight ${txn.type === 'refund' || txn.type === 'payout' ? 'text-gray-400' : 'text-primary'}`}>
                                            {txn.type === 'refund' || txn.type === 'payout' ? '-' : '+'}£
                                            {txn.amount.toFixed(2)}
                                        </td>
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

function FinancialStat({ title, value, change, icon, trend }: any) {
    return (
        <div className="card p-5 group flex flex-col justify-between shadow-sm hover:bg-gray-50 dark:hover:bg-white/[0.04] transition-all">
            <div className="flex items-start justify-between mb-4">
                <div className="p-3 rounded-xl bg-gray-100 dark:bg-gray-800 transition-transform group-hover:scale-105">
                    {icon}
                </div>
                {change && (
                    <span className={`badge ${trend === 'up' ? 'badge-success' : 'badge-error'}`}>
                        {change}
                    </span>
                )}
            </div>
            <div>
                <p className="text-2xl font-bold text-gray-800 dark:text-white tracking-tight leading-none mb-1">
                    {value}
                </p>
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{title}</p>
            </div>
        </div>
    );
}

