import {
    AlertTriangle,
    Ban,
    CheckCircle,
    Download,
    Eye,
    MoreVertical,
    Plus,
    Search,
    Star,
    X
} from 'lucide-react';
import { useState } from 'react';
import type { Driver } from '../../stores/adminStore';
import { useAdminStore } from '../../stores/adminStore';

export function Drivers() {
    const { drivers, updateDriverStatus } = useAdminStore();
    const [search, setSearch] = useState('');
    const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'online' | 'offline' | 'suspended' | 'pending'>('all');
    const [openMenu, setOpenMenu] = useState<string | null>(null);
    const [selectedDriver, setSelectedDriver] = useState<Driver | null>(null);
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const [isVettingOpen, setIsVettingOpen] = useState(false);

    const filteredDrivers = drivers.filter((driver) => {
        const matchesSearch =
            driver.name.toLowerCase().includes(search.toLowerCase()) ||
            driver.email.toLowerCase().includes(search.toLowerCase()) ||
            driver.carModel.toLowerCase().includes(search.toLowerCase()) ||
            driver.licensePlate.toLowerCase().includes(search.toLowerCase());

        const matchesStatus = statusFilter === 'all' ||
            (statusFilter === 'active' && driver.status === 'active') ||
            (statusFilter === 'suspended' && driver.status === 'suspended') ||
            (statusFilter === 'pending' && driver.status === 'pending') ||
            (statusFilter === 'online' && driver.onlineStatus === 'online') ||
            (statusFilter === 'offline' && driver.onlineStatus === 'offline');

        return matchesSearch && matchesStatus;
    });

    const handleAction = (driverId: string, action: 'view' | 'approve' | 'suspend' | 'reject' | 'vet') => {
        setOpenMenu(null);
        const driver = drivers.find(d => d.id === driverId);
        if (!driver) return;

        if (action === 'view') {
            setSelectedDriver(driver);
            setIsProfileOpen(true);
        } else if (action === 'vet') {
            setSelectedDriver(driver);
            setIsVettingOpen(true);
        } else if (action === 'approve') {
            updateDriverStatus(driverId, 'active');
            setIsVettingOpen(false);
        } else if (action === 'suspend') {
            updateDriverStatus(driverId, 'suspended');
        } else if (action === 'reject') {
            updateDriverStatus(driverId, 'rejected');
            setIsVettingOpen(false);
        }
    };


    return (
        <div className="min-h-screen bg-transparent dark:text-white/90 flex flex-col font-uber">
            <div className="p-8 pb-0">
                <h2 className="text-2xl font-black text-zinc-900 dark:text-white tracking-tight">Drivers</h2>
                <p className="text-sm text-zinc-500 mt-1">Manage your fleet and view driver details.</p>
            </div>

            <div className="flex-1 p-8 space-y-6">
                {/* Directory Card */}
                <div className="bg-white dark:bg-zinc-900/50 border border-zinc-100 dark:border-zinc-800 rounded-[32px] flex flex-col overflow-hidden shadow-sm">
                    <div className="p-8 border-b border-zinc-100 dark:border-zinc-800 flex flex-wrap items-center justify-between gap-6">
                        <div className="relative group max-w-xs w-full">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400 group-focus-within:text-primary transition-colors" size={18} />
                            <input
                                type="text"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                placeholder="Search drivers, cars, plates..."
                                className="pl-12 pr-4 py-3 bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-[18px] text-sm font-uber-medium focus:border-primary dark:focus:border-primary outline-none transition-all w-full text-zinc-800 dark:text-white"
                            />
                        </div>

                        <div className="flex items-center gap-3">
                            <select
                                value={statusFilter}
                                onChange={(e) => setStatusFilter(e.target.value as any)}
                                className="px-4 py-2.5 bg-zinc-100 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-2xl text-sm font-uber-medium outline-none focus:border-primary transition-all text-zinc-700 dark:text-zinc-300 appearance-none min-w-[140px]"
                            >
                                <option value="all">All statuses</option>
                                <option value="active">Active</option>
                                <option value="online">Online</option>
                                <option value="offline">Offline</option>
                                <option value="suspended">Suspended</option>
                                <option value="pending">Pending</option>
                            </select>

                            <button className="w-10 h-10 flex items-center justify-center border border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-400 rounded-2xl hover:bg-zinc-50 dark:hover:bg-white/5 transition-all">
                                <Download size={16} />
                            </button>
                            <button className="px-5 py-3 bg-primary text-black font-uber-bold text-[10px] uppercase tracking-widest rounded-2xl hover:scale-[1.02] active:scale-95 transition-all flex items-center gap-2 shadow-lg shadow-primary/20">
                                <Plus size={14} />
                                <span className="hidden sm:inline">Onboard</span>
                            </button>
                        </div>
                    </div>

                    <div className="overflow-x-auto no-scrollbar">
                        <table className="w-full text-left">
                            <thead>
                                <tr className="text-[10px] font-uber-bold text-zinc-400 border-b border-zinc-100 dark:border-zinc-800">
                                    <th className="px-8 py-6 capitalize tracking-widest">System ID</th>
                                    <th className="px-8 py-6 capitalize tracking-widest">Driver Name</th>
                                    <th className="px-8 py-6 capitalize tracking-widest">Vehicle Info</th>
                                    <th className="px-8 py-6 capitalize tracking-widest">Offer Type</th>
                                    <th className="px-8 py-6 capitalize tracking-widest">Rating</th>
                                    <th className="px-8 py-6 capitalize tracking-widest">Session</th>
                                    <th className="px-8 py-6 capitalize tracking-widest">Status</th>
                                    <th className="px-8 py-6 capitalize tracking-widest">Created</th>
                                    <th className="px-8 py-6 text-right capitalize tracking-widest">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800">
                                {filteredDrivers.map((driver) => (
                                    <tr key={driver.id} className="hover:bg-zinc-50 dark:hover:bg-white/[0.02] transition-colors group">
                                        <td className="px-8 py-6">
                                            <span className="text-xs font-mono font-uber-medium text-zinc-500">{driver.id}</span>
                                        </td>
                                        <td className="px-8 py-6">
                                            <div className="flex items-center gap-4">
                                                <div className="w-11 h-11 rounded-2xl bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center font-uber-bold text-sm text-zinc-800 dark:text-primary border border-zinc-200 dark:border-white/5">
                                                    {driver.name.charAt(0)}
                                                </div>
                                                <div>
                                                    <p className="text-sm font-uber-bold text-zinc-900 dark:text-white leading-tight">{driver.name}</p>
                                                    <p className="text-[10px] text-zinc-500 font-uber-medium lowercase">{driver.email}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-8 py-6">
                                            <p className="text-sm font-uber-bold text-zinc-700 dark:text-zinc-300">{driver.carModel}</p>
                                            <span className="text-[10px] font-mono font-uber-medium text-zinc-400 bg-zinc-100 dark:bg-zinc-800 px-1.5 py-0.5 rounded uppercase">{driver.licensePlate}</span>
                                        </td>
                                        <td className="px-8 py-6">
                                            <span className="text-sm font-uber-medium text-zinc-600 dark:text-zinc-400">{driver.serviceType || 'Standard'}</span>
                                        </td>
                                        <td className="px-8 py-6">
                                            <div className="flex items-center gap-1">
                                                <div className="flex gap-0.5">
                                                    {[1, 2, 3, 4, 5].map((star) => (
                                                        <Star
                                                            key={star}
                                                            size={12}
                                                            className={`${driver.rating > 0 ? 'text-yellow-400 fill-yellow-400' : 'text-zinc-600 dark:text-zinc-700 fill-zinc-600 dark:fill-zinc-700'}`}
                                                        />
                                                    ))}
                                                </div>
                                                <span className={`text-xs font-uber-bold ml-1.5 ${driver.rating > 0 ? 'text-zinc-900 dark:text-white' : 'text-zinc-500'}`}>
                                                    {driver.rating > 0 ? driver.rating.toFixed(2) : 'No rating'}
                                                </span>
                                            </div>
                                        </td>
                                        <td className="px-8 py-6">
                                            <div className="flex items-center gap-2">
                                                <div className={`w-2 h-2 rounded-full ${driver.onlineStatus === 'online' ? 'bg-primary' : 'bg-zinc-400'}`} />
                                                <span className="text-sm font-uber-medium text-zinc-600 dark:text-zinc-400 capitalize">{driver.onlineStatus}</span>
                                            </div>
                                        </td>
                                        <td className="px-8 py-6">
                                            <span className={`inline-flex px-2.5 py-1 rounded-lg text-[10px] font-uber-bold capitalize border ${driver.status === 'active' ? 'bg-primary/10 text-primary border-primary/20' :
                                                driver.status === 'pending' ? 'bg-amber-500/10 text-amber-500 border-amber-500/20' :
                                                    'bg-rose-500/10 text-rose-500 border-rose-500/20'
                                                }`}>
                                                {driver.status}
                                            </span>
                                        </td>
                                        <td className="px-8 py-6">
                                            <span className="text-sm font-uber-medium text-zinc-600 dark:text-zinc-400">{driver.joinedAt}</span>
                                        </td>
                                        <td className="px-8 py-6 text-right">
                                            <div className="relative flex justify-end">
                                                <button
                                                    onClick={() => setOpenMenu(openMenu === driver.id ? null : driver.id)}
                                                    className="p-2.5 rounded-xl text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 hover:text-zinc-900 dark:hover:text-white transition-all border border-transparent hover:border-zinc-200 dark:hover:border-white/5"
                                                >
                                                    <MoreVertical size={20} />
                                                </button>

                                                {openMenu === driver.id && (
                                                    <div className="absolute right-0 top-full mt-2 w-52 bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-2xl z-50 overflow-hidden py-1.5">
                                                        <button
                                                            onClick={() => handleAction(driver.id, 'view')}
                                                            className="w-full flex items-center gap-3 px-4 py-3 text-left text-[10px] font-uber-bold uppercase tracking-widest text-zinc-600 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-white/5 transition-colors"
                                                        >
                                                            <Eye size={16} />
                                                            Operations Review
                                                        </button>
                                                        {driver.status === 'pending' && (
                                                            <button
                                                                onClick={() => handleAction(driver.id, 'vet')}
                                                                className="w-full flex items-center gap-3 px-4 py-3 text-left text-[10px] font-uber-bold uppercase tracking-widest text-amber-500 hover:bg-amber-500/10 transition-colors"
                                                            >
                                                                <CheckCircle size={16} />
                                                                Vet Candidate
                                                            </button>
                                                        )}
                                                        {driver.status === 'active' && (
                                                            <button
                                                                onClick={() => handleAction(driver.id, 'suspend')}
                                                                className="w-full flex items-center gap-3 px-4 py-3 text-left text-[10px] font-uber-bold uppercase tracking-widest text-rose-500 hover:bg-rose-500/10 transition-colors"
                                                            >
                                                                <Ban size={16} />
                                                                Suspend Access
                                                            </button>
                                                        )}
                                                    </div>
                                                )}
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {filteredDrivers.length === 0 && (
                        <div className="py-24 text-center">
                            <Search size={48} className="mx-auto text-zinc-100 dark:text-zinc-800 mb-6" />
                            <p className="text-[10px] font-uber-bold text-zinc-400 uppercase tracking-[0.2em]">No driver profiles matching parameters</p>
                        </div>
                    )}
                </div>
            </div>

            {/* Profile Modal */}
            {isProfileOpen && selectedDriver && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/60 backdrop-blur-md">
                    <div className="bg-white dark:bg-zinc-900 rounded-[40px] border border-white/10 w-full max-w-2xl overflow-hidden shadow-2xl animate-in zoom-in duration-300">
                        <div className="px-10 py-8 border-b border-zinc-100 dark:border-zinc-800 flex items-center justify-between bg-zinc-50/50 dark:bg-zinc-950/50">
                            <div className="flex items-center gap-5">
                                <div className="w-14 h-14 rounded-2xl bg-white dark:bg-zinc-800 flex items-center justify-center font-uber-bold text-2xl text-primary border border-zinc-200 dark:border-white/10">
                                    {selectedDriver.name.charAt(0)}
                                </div>
                                <div>
                                    <h3 className="text-2xl font-uber-bold text-zinc-900 dark:text-white tracking-tight leading-none mb-1">{selectedDriver.name}</h3>
                                    <p className="text-[10px] font-uber-bold text-zinc-500 uppercase tracking-[0.1em]">{selectedDriver.carType} • {selectedDriver.city}</p>
                                </div>
                            </div>
                            <button onClick={() => setIsProfileOpen(false)} className="p-3 hover:bg-zinc-100 dark:hover:bg-white/5 rounded-2xl transition-all">
                                <X size={24} className="text-zinc-400" />
                            </button>
                        </div>

                        <div className="p-10 grid grid-cols-1 md:grid-cols-3 gap-10 overflow-y-auto max-h-[75vh] no-scrollbar">
                            <div className="md:col-span-2 space-y-10">
                                <div className="grid grid-cols-2 gap-6">
                                    <div className="p-6 bg-zinc-50 dark:bg-zinc-950/50 border border-zinc-100 dark:border-zinc-800 rounded-[28px]">
                                        <p className="text-[9px] font-uber-bold text-zinc-400 uppercase tracking-widest mb-2">Total Earnings</p>
                                        <p className="text-3xl font-uber-bold text-zinc-900 dark:text-white tracking-tighter">£{selectedDriver.totalEarnings.toLocaleString()}</p>
                                    </div>
                                    <div className="p-6 bg-zinc-50 dark:bg-zinc-950/50 border border-zinc-100 dark:border-zinc-800 rounded-[28px]">
                                        <p className="text-[9px] font-uber-bold text-zinc-400 uppercase tracking-widest mb-2">Lifetime Rides</p>
                                        <p className="text-3xl font-uber-bold text-zinc-900 dark:text-white tracking-tighter">{selectedDriver.totalTrips}</p>
                                    </div>
                                </div>

                                <div className="space-y-6">
                                    <h4 className="text-[10px] font-uber-bold uppercase tracking-[0.2em] text-zinc-400">Activity Ledger</h4>
                                    <div className="border border-zinc-100 dark:border-zinc-800 rounded-[32px] overflow-hidden">
                                        <table className="w-full text-left text-xs">
                                            <thead>
                                                <tr className="bg-zinc-50 dark:bg-zinc-950 border-b border-zinc-100 dark:border-zinc-800 text-[9px] font-uber-bold uppercase tracking-[0.15em] text-zinc-400">
                                                    <th className="px-6 py-4">Date</th>
                                                    <th className="px-6 py-4">Quantity</th>
                                                    <th className="px-6 py-4 text-right">Revenue</th>
                                                </tr>
                                            </thead>
                                            <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800">
                                                {[
                                                    { date: 'Feb 08', rides: 14, earn: 245.50 },
                                                    { date: 'Feb 07', rides: 12, earn: 198.20 },
                                                    { date: 'Feb 06', rides: 18, earn: 312.00 },
                                                ].map((row, i) => (
                                                    <tr key={i} className="hover:bg-zinc-50 dark:hover:bg-white/[0.01]">
                                                        <td className="px-6 py-4 font-uber-bold text-zinc-700 dark:text-zinc-300">{row.date}</td>
                                                        <td className="px-6 py-4 font-uber-medium text-zinc-500">{row.rides} Missions</td>
                                                        <td className="px-6 py-4 font-uber-bold text-primary text-right">£{row.earn.toFixed(2)}</td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-8">
                                <h4 className="text-[10px] font-uber-bold uppercase tracking-[0.2em] text-zinc-400">Credentials</h4>
                                <div className="space-y-4">
                                    {selectedDriver.documents.map((doc, i) => (
                                        <div key={i} className="p-5 bg-zinc-50 dark:bg-zinc-950 border border-zinc-100 dark:border-zinc-800 rounded-[24px] flex items-center justify-between group">
                                            <div>
                                                <p className="text-[10px] font-uber-bold text-zinc-800 dark:text-white uppercase tracking-tight mb-1">{doc.type}</p>
                                                <p className="text-[9px] font-uber-bold text-primary uppercase tracking-widest">{doc.status}</p>
                                            </div>
                                            <button className="p-2 border border-zinc-200 dark:border-zinc-700 rounded-xl opacity-0 group-hover:opacity-100 transition-all">
                                                <Download size={14} className="text-zinc-400" />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                                <div className="p-8 bg-primary/5 dark:bg-primary/10 border border-primary/20 rounded-[32px] space-y-4">
                                    <div>
                                        <p className="text-[10px] font-uber-bold text-primary/60 uppercase tracking-widest mb-1">Global Authorization</p>
                                        <p className="text-3xl font-uber-bold text-primary tracking-tighter capitalize">{selectedDriver.status}</p>
                                    </div>
                                    <p className="text-[10px] font-uber-bold text-primary/50 uppercase tracking-widest">Partner since {selectedDriver.joinedAt}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Vetting Modal */}
            {isVettingOpen && selectedDriver && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/70 backdrop-blur-xl">
                    <div className="bg-white dark:bg-zinc-950 border border-white/10 w-full max-w-md overflow-hidden shadow-2xl rounded-[48px] animate-in slide-in-from-bottom-12 duration-500">
                        <div className="px-10 py-10 border-b border-zinc-100 dark:border-white/5 bg-zinc-50/50 dark:bg-zinc-900/50">
                            <div className="flex items-center gap-4 mb-6">
                                <div className="p-3 bg-amber-500/10 rounded-2xl text-amber-500">
                                    <AlertTriangle size={24} />
                                </div>
                                <h3 className="text-xl font-uber-bold text-zinc-900 dark:text-white tracking-tight uppercase">Vetting Protocol</h3>
                            </div>
                            <div className="flex items-center gap-5">
                                <div className="w-12 h-12 rounded-2xl bg-white dark:bg-zinc-800 flex items-center justify-center font-uber-bold text-zinc-400 border border-zinc-200 dark:border-white/10">
                                    {selectedDriver.name.charAt(0)}
                                </div>
                                <div>
                                    <p className="text-lg font-uber-bold text-zinc-900 dark:text-white leading-none mb-1">{selectedDriver.name}</p>
                                    <p className="text-[10px] font-uber-bold text-zinc-500 uppercase tracking-widest">{selectedDriver.city} • Enrollment Stage</p>
                                </div>
                            </div>
                        </div>

                        <div className="p-10 space-y-10">
                            <div className="space-y-6">
                                <h4 className="text-[10px] font-uber-bold uppercase tracking-[0.2em] text-zinc-400">Verification Assets</h4>
                                <div className="space-y-4">
                                    <div className="p-5 bg-zinc-50 dark:bg-zinc-900 border border-zinc-100 dark:border-white/5 rounded-[28px] flex items-center justify-between">
                                        <div>
                                            <p className="text-[10px] font-uber-bold text-zinc-800 dark:text-white uppercase tracking-tight mb-1">Vehicle Data</p>
                                            <p className="text-[11px] font-uber-bold text-zinc-500 truncate max-w-[200px]">{selectedDriver.carModel} • {selectedDriver.licensePlate}</p>
                                        </div>
                                        <div className="px-2.5 py-1 bg-zinc-200 dark:bg-zinc-800 rounded-lg text-[8px] font-uber-bold text-zinc-500 uppercase tracking-widest">PENDING</div>
                                    </div>
                                    {selectedDriver.documents.map((doc, i) => (
                                        <div key={i} className="p-5 bg-zinc-50 dark:bg-zinc-900 border border-zinc-100 dark:border-white/5 rounded-[28px] flex items-center justify-between">
                                            <div>
                                                <p className="text-[10px] font-uber-bold text-zinc-800 dark:text-white uppercase tracking-tight mb-1">{doc.type}</p>
                                                <p className="text-[11px] font-uber-bold text-zinc-500">Document Metadata v1.0</p>
                                            </div>
                                            <button className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-xl text-[10px] font-uber-bold text-zinc-600 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-white/5 transition-all uppercase tracking-widest">
                                                <Eye size={12} />
                                                Inspect
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="flex gap-4">
                                <button
                                    onClick={() => handleAction(selectedDriver.id, 'reject')}
                                    className="flex-1 py-4 border border-rose-500/20 text-rose-500 text-[10px] font-uber-bold uppercase tracking-widest rounded-3xl hover:bg-rose-500/5 transition-all"
                                >
                                    Deny Access
                                </button>
                                <button
                                    onClick={() => handleAction(selectedDriver.id, 'approve')}
                                    className="flex-1 py-4 bg-primary text-black text-[10px] font-uber-bold uppercase tracking-widest rounded-3xl hover:scale-[1.02] active:scale-95 transition-all shadow-xl shadow-primary/20"
                                >
                                    Authorize Partner
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
