import {
    ArrowUpRight,
    Car,
    Users,
    Wallet,
    Zap
} from 'lucide-react';
import {
    Area,
    AreaChart,
    CartesianGrid,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis
} from 'recharts';
import { useAdminStore } from '../stores/adminStore';



export function Dashboard() {
    const { getStats, recentRides, drivers } = useAdminStore();
    const stats = getStats();

    const activeDrivers = drivers
        .filter(d => d.onlineStatus === 'online')
        .slice(0, 3);

    return (
        <div className="min-h-screen bg-[#F8F9FA] dark:bg-zinc-950 p-4 lg:p-8">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Dashboard</h1>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 uppercase tracking-wider font-medium">Real-time fleet overview and performance metrics.</p>
                </div>
            </div>

            {/* KPI Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <KPICard
                    title="Total Revenue"
                    value={`$${stats.totalRevenue.toLocaleString()}`}
                    change={+12.5}
                    changeText="Total earnings to date"
                    icon={<Wallet size={40} />}
                />
                <KPICard
                    title="Active Trips"
                    value={stats.activeDrivers > 0 ? "1" : "0"}
                    change={+4}
                    changeText="Currently in progress"
                    icon={<Zap size={40} />}
                />
                <KPICard
                    title="Total Drivers"
                    value={stats.totalDrivers}
                    change={stats.activeDrivers}
                    changeText="currently online"
                    icon={<Car size={40} />}
                />
                <KPICard
                    title="Total Riders"
                    value={stats.totalPassengers}
                    change={+18}
                    changeText="Registered accounts"
                    icon={<Users size={40} />}
                />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Revenue Overview */}
                <div className="lg:col-span-2 space-y-8">
                    <div className="bg-white dark:bg-white/5 rounded-3xl p-8 border border-gray-100 dark:border-white/5">
                        <div className="flex items-center justify-between mb-8">
                            <h3 className="text-lg font-bold text-gray-800 dark:text-white">Revenue Overview</h3>
                        </div>
                        <div className="h-[300px] w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={revenueData}>
                                    <defs>
                                        <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#4A3AFF" stopOpacity={0.1} />
                                            <stop offset="95%" stopColor="#4A3AFF" stopOpacity={0} />
                                        </linearGradient>
                                    </defs>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                                    <XAxis
                                        dataKey="name"
                                        axisLine={false}
                                        tickLine={false}
                                        tick={{ fontSize: 12, fill: '#9ca3af' }}
                                        dy={10}
                                    />
                                    <YAxis
                                        axisLine={false}
                                        tickLine={false}
                                        tick={{ fontSize: 12, fill: '#9ca3af' }}
                                        tickFormatter={(value) => `$${value}`}
                                    />
                                    <Tooltip
                                        contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)' }}
                                    />
                                    <Area
                                        type="monotone"
                                        dataKey="amount"
                                        stroke="#4A3AFF"
                                        strokeWidth={4}
                                        fillOpacity={1}
                                        fill="url(#colorRev)"
                                    />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    {/* Active Drivers List */}
                    <div className="bg-white dark:bg-white/5 rounded-3xl p-8 border border-gray-100 dark:border-white/5">
                        <div className="flex items-center justify-between mb-8">
                            <div>
                                <h3 className="text-lg font-bold text-gray-800 dark:text-white">Active Drivers</h3>
                                <p className="text-sm text-gray-500 dark:text-gray-400">Currently online fleet members</p>
                            </div>
                            <span className="bg-emerald-50 text-emerald-600 px-3 py-1 rounded-lg text-xs font-bold border border-emerald-100 italic">
                                {stats.activeDrivers} Online
                            </span>
                        </div>
                        <div className="space-y-6">
                            {activeDrivers.map((driver) => (
                                <div key={driver.id} className="flex items-center justify-between group">
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 rounded-full bg-[#4A3AFF]/10 flex items-center justify-center text-[#4A3AFF] font-bold relative">
                                            {driver.name.split(' ').map(n => n[0]).join('')}
                                            <div className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 rounded-full border-2 border-white dark:border-zinc-900"></div>
                                        </div>
                                        <div>
                                            <p className="text-sm font-bold text-gray-800 dark:text-white">{driver.name}</p>
                                            <div className="flex items-center gap-2 mt-0.5">
                                                <span className="text-xs text-gray-400">{driver.totalTrips} Trips</span>
                                                <span className="w-1 h-1 rounded-full bg-gray-300"></span>
                                                <span className="text-xs text-amber-500 font-bold flex items-center gap-0.5">
                                                    ★ {driver.rating}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    <span className="text-[10px] font-bold text-emerald-600 uppercase tracking-widest bg-emerald-50 px-2 py-0.5 rounded">Online</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Live Activity Feed */}
                <div className="space-y-8">
                    <div className="bg-white dark:bg-white/5 rounded-3xl p-8 border border-gray-100 dark:border-white/5 h-full">
                        <div className="flex items-center justify-between mb-8">
                            <div>
                                <h3 className="text-lg font-bold text-gray-800 dark:text-white">Live Activity</h3>
                                <p className="text-sm text-gray-500 dark:text-gray-400">Recent trip requests and updates</p>
                            </div>
                        </div>

                        <div className="space-y-10">
                            {recentRides.slice(0, 3).map((ride, idx) => (
                                <div key={ride.id} className="relative pl-8">
                                    {/* Timeline Line */}
                                    {idx !== 2 && <div className="absolute left-[3px] top-4 w-[1px] h-full bg-gray-100 dark:bg-white/5"></div>}

                                    <div className="flex items-center justify-between mb-4">
                                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase ${ride.status === 'completed' ? 'bg-emerald-50 text-emerald-600' : 'bg-blue-50 text-blue-600'
                                            }`}>
                                            {ride.status}
                                        </span>
                                        <div className="flex items-center gap-2 text-xs text-gray-400">
                                            <ArrowUpRight size={12} />
                                            <span>17 minutes ago</span>
                                            <span className="font-bold text-gray-800 dark:text-white ml-2">${ride.fare.toFixed(2)}</span>
                                        </div>
                                    </div>

                                    <div className="space-y-4">
                                        <div className="flex items-start gap-3 relative">
                                            <div className="w-2 h-2 rounded-full border-2 border-[#4A3AFF] mt-1.5 z-10 bg-white"></div>
                                            <div>
                                                <p className="text-xs font-bold text-gray-800 dark:text-white">{ride.pickupAddress.split(',')[0]}</p>
                                                <p className="text-[10px] text-gray-400 uppercase font-medium">Pickup</p>
                                            </div>
                                        </div>
                                        <div className="flex items-start gap-3 relative">
                                            <div className="w-2 h-2 rounded-full border-2 border-gray-950 mt-1.5 z-10 bg-white dark:bg-zinc-900 border-black dark:border-white"></div>
                                            <div>
                                                <p className="text-xs font-bold text-gray-800 dark:text-white">{ride.destinationAddress.split(',')[0]}</p>
                                                <p className="text-[10px] text-gray-400 uppercase font-medium">Dropoff</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="mt-6 flex items-center justify-between p-3 bg-gray-50 dark:bg-white/5 rounded-2xl">
                                        <div className="flex items-center gap-2">
                                            <Users size={12} className="text-gray-400" />
                                            <span className="text-[11px] text-gray-500 font-medium">Rider: {ride.passenger}</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <span className="text-[11px] text-gray-500 font-medium">Driver: {ride.driver}</span>
                                            <div className="w-6 h-6 rounded-full bg-[#4A3AFF]/10 flex items-center justify-center">
                                                <ArrowUpRight size={12} className="text-[#4A3AFF]" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Revenue Trend Section at bottom like screenshot */}
                    <div className="bg-white dark:bg-white/5 rounded-3xl p-8 border border-gray-100 dark:border-white/5">
                        <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-2">Revenue Trend</h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Weekly income overview</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

const revenueData = [
    { name: '$1000', amount: 1500 },
    { name: '$2000', amount: 3500 },
    { name: '$3000', amount: 2000 },
    { name: '$4000', amount: 2800 },
    { name: '$5000', amount: 1800 },
    { name: '$6000', amount: 3200 },
];

function KPICard({ title, value, change, changeText, icon }: any) {
    return (
        <div className="bg-white dark:bg-white/5 rounded-3xl p-8 border border-gray-100 dark:border-white/5 relative overflow-hidden group hover:shadow-xl transition-all duration-300">
            {/* Watermark Icon */}
            <div className="absolute top-4 right-4 text-gray-50 dark:text-white/5 group-hover:scale-110 transition-transform duration-500 pointer-events-none">
                {icon}
            </div>

            <div className="relative z-10">
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">{title}</p>
                <h4 className="text-3xl font-black text-gray-800 dark:text-white mt-4 mb-2">{value}</h4>
                <div className="flex items-center gap-2">
                    <span className="text-[11px] font-bold text-emerald-500 flex items-center gap-0.5">
                        <ArrowUpRight size={12} />
                        +{change}%
                    </span>
                    <span className="text-[11px] text-gray-400 font-medium">{changeText}</span>
                </div>
            </div>
        </div>
    );
}

