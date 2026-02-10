import {
    AlertTriangle,
    Ban,
    CheckCircle,
    Download,
    Eye,
    MoreVertical,
    Plus,
    Search,
    X,
    Zap
} from 'lucide-react';
import { useState } from 'react';
import PageBreadcrumb from '../components/common/PageBreadcrumb';
import type { Driver } from '../stores/adminStore';
import { useAdminStore } from '../stores/adminStore';

export function FleetManagement() {
    const { drivers, updateDriverStatus } = useAdminStore();
    const [search, setSearch] = useState('');
    const [statusFilter, setStatusFilter] = useState<Driver['status'] | 'all'>('all');
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
        const matchesStatus = statusFilter === 'all' || driver.status === statusFilter;
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
        <div className="min-h-screen bg-transparent dark:text-white/90 flex flex-col">
            <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
                <PageBreadcrumb pageTitle="Pilot Registry" />
                <div className="flex gap-3">
                    <button className="px-4 py-2 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-400 text-xs font-bold uppercase tracking-widest rounded-xl hover:bg-gray-50 dark:hover:bg-white/5 transition-all flex items-center gap-2">
                        <Download size={14} />
                        Export Registry
                    </button>
                    <button className="px-4 py-2 bg-primary text-black font-bold text-xs uppercase tracking-widest rounded-xl hover:scale-[1.02] active:scale-95 transition-all flex items-center gap-2">
                        <Plus size={14} />
                        Onboard Partner
                    </button>
                </div>
            </div>

            <div className="flex-1 space-y-6">
                {/* Pilot Directory */}
                <div className="card flex flex-col overflow-hidden shadow-sm">
                    <div className="p-6 border-b border-gray-100 dark:border-gray-800 flex flex-wrap items-center justify-between gap-6">
                        <div className="relative group max-w-xs w-full">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-primary transition-colors" size={16} />
                            <input
                                type="text"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                placeholder="Search by name or vehicle..."
                                className="pl-10 pr-4 py-2 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl text-sm focus:border-primary dark:focus:border-primary outline-none transition-all w-full text-gray-800 dark:text-white"
                            />
                        </div>

                        <div className="flex p-1 bg-gray-100 dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800">
                            {['all', 'active', 'pending', 'suspended'].map((status) => (
                                <button
                                    key={status}
                                    onClick={() => setStatusFilter(status as any)}
                                    className={`px-4 py-1.5 rounded-lg text-xs font-bold uppercase tracking-widest transition-all ${statusFilter === status
                                        ? 'bg-white dark:bg-gray-800 text-gray-800 dark:text-white shadow-sm'
                                        : 'text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'
                                        }`}
                                >
                                    {status === 'all' ? 'Universal' : status}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="overflow-x-auto no-scrollbar">
                        <table className="w-full text-left">
                            <thead className="bg-gray-50 dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800">
                                <tr className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">
                                    <th className="px-6 py-4">Pilot Identity</th>
                                    <th className="px-6 py-4">Deployment Assets</th>
                                    <th className="px-6 py-4">Operational Hub</th>
                                    <th className="px-6 py-4">KPI Score</th>
                                    <th className="px-6 py-4">Status</th>
                                    <th className="px-6 py-4 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                                {filteredDrivers.map((driver) => (
                                    <tr key={driver.id} className="hover:bg-gray-50 dark:hover:bg-white/[0.01] transition-colors group">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-4">
                                                <div className="w-10 h-10 rounded-xl bg-gray-100 dark:bg-gray-800 flex items-center justify-center font-bold text-sm text-gray-800 dark:text-primary">
                                                    {driver.name.charAt(0)}
                                                </div>
                                                <div>
                                                    <p className="text-sm font-bold text-gray-800 dark:text-white">{driver.name}</p>
                                                    <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">{driver.email}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <p className="text-sm font-bold text-gray-700 dark:text-gray-300">{driver.carModel}</p>
                                            <span className="text-[10px] font-mono font-bold text-gray-500">{driver.licensePlate}</span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="text-sm font-bold text-gray-600 dark:text-gray-400">{driver.city || 'Global'}</span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-1.5 font-bold">
                                                <Zap size={14} className="text-primary" />
                                                <span className="text-gray-800 dark:text-white text-sm">{driver.rating.toFixed(2)}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`badge ${driver.status === 'active' ? 'badge-success' :
                                                driver.status === 'pending' ? 'badge-warning' : 'badge-error'
                                                }`}>
                                                {driver.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <div className="relative flex justify-end">
                                                <button
                                                    onClick={() => setOpenMenu(openMenu === driver.id ? null : driver.id)}
                                                    className="p-2 rounded-xl text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-800 dark:hover:text-white transition-all"
                                                >
                                                    <MoreVertical size={18} />
                                                </button>

                                                {openMenu === driver.id && (
                                                    <div className="absolute right-0 top-full mt-2 w-48 bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 shadow-xl z-50 overflow-hidden">
                                                        <button
                                                            onClick={() => handleAction(driver.id, 'view')}
                                                            className="w-full flex items-center gap-3 px-4 py-3 text-left text-xs font-bold uppercase tracking-widest text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-white/5 transition-colors"
                                                        >
                                                            <Eye size={16} />
                                                            View Profile
                                                        </button>
                                                        {driver.status === 'pending' && (
                                                            <button
                                                                onClick={() => handleAction(driver.id, 'vet')}
                                                                className="w-full flex items-center gap-3 px-4 py-3 text-left text-xs font-bold uppercase tracking-widest text-warning-500 hover:bg-warning-500/10 transition-colors"
                                                            >
                                                                <CheckCircle size={16} />
                                                                Vet Pilot
                                                            </button>
                                                        )}
                                                        {driver.status === 'active' && (
                                                            <button
                                                                onClick={() => handleAction(driver.id, 'suspend')}
                                                                className="w-full flex items-center gap-3 px-4 py-3 text-left text-xs font-bold uppercase tracking-widest text-error-500 hover:bg-error-500/10 transition-colors"
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
                        <div className="py-20 text-center">
                            <Search size={40} className="mx-auto text-gray-200 dark:text-gray-800 mb-4" />
                            <p className="text-sm font-bold text-gray-400 uppercase tracking-widest">No pilots matching parameters</p>
                        </div>
                    )}
                </div>
            </div>

            {/* Modal Logic */}
            {isProfileOpen && selectedDriver && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/50 backdrop-blur-sm">
                    <div className="card w-full max-w-2xl overflow-hidden shadow-2xl animate-in zoom-in duration-200">
                        <div className="px-8 py-6 border-b border-gray-100 dark:border-gray-800 flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-2xl bg-gray-50 dark:bg-gray-800 flex items-center justify-center font-bold text-xl text-primary">
                                    {selectedDriver.name.charAt(0)}
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-gray-800 dark:text-white tracking-tight">{selectedDriver.name}</h3>
                                    <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">{selectedDriver.carType} • {selectedDriver.city}</p>
                                </div>
                            </div>
                            <button onClick={() => setIsProfileOpen(false)} className="p-2 hover:bg-gray-50 dark:hover:bg-white/5 rounded-xl transition-colors">
                                <X size={24} className="text-gray-400" />
                            </button>
                        </div>

                        <div className="p-8 grid grid-cols-1 md:grid-cols-3 gap-8 overflow-y-auto max-h-[70vh] no-scrollbar">
                            <div className="md:col-span-2 space-y-8">
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="p-5 bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl">
                                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Total Yield</p>
                                        <p className="text-2xl font-bold dark:text-white">£{selectedDriver.totalEarnings.toLocaleString()}</p>
                                    </div>
                                    <div className="p-5 bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl">
                                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Lifetime Rides</p>
                                        <p className="text-2xl font-bold dark:text-white">{selectedDriver.totalTrips}</p>
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <h4 className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Activity Ledger</h4>
                                    <div className="border border-gray-100 dark:border-gray-800 rounded-2xl overflow-hidden">
                                        <table className="w-full text-left text-xs">
                                            <thead>
                                                <tr className="bg-gray-50 dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800 text-[10px] font-bold uppercase tracking-widest text-gray-400">
                                                    <th className="px-5 py-3">Date</th>
                                                    <th className="px-5 py-3">Missions</th>
                                                    <th className="px-5 py-3 text-right">Earning</th>
                                                </tr>
                                            </thead>
                                            <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                                                {[
                                                    { date: 'Feb 08', rides: 14, earn: 245.50 },
                                                    { date: 'Feb 07', rides: 12, earn: 198.20 },
                                                    { date: 'Feb 06', rides: 18, earn: 312.00 },
                                                ].map((row, i) => (
                                                    <tr key={i} className="hover:bg-gray-50 dark:hover:bg-white/[0.01]">
                                                        <td className="px-5 py-3 font-bold text-gray-700 dark:text-gray-300">{row.date}</td>
                                                        <td className="px-5 py-3 font-bold text-gray-500">{row.rides}</td>
                                                        <td className="px-5 py-3 font-bold text-primary text-right">£{row.earn.toFixed(2)}</td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-6">
                                <h4 className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Credentials</h4>
                                <div className="space-y-3">
                                    {selectedDriver.documents.map((doc, i) => (
                                        <div key={i} className="p-4 bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl flex items-center justify-between group">
                                            <div>
                                                <p className="text-[10px] font-bold text-gray-800 dark:text-white uppercase tracking-tight">{doc.type}</p>
                                                <p className="text-[9px] font-bold text-primary uppercase">{doc.status}</p>
                                            </div>
                                            <button className="p-2 border border-gray-200 dark:border-gray-700 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity">
                                                <Download size={14} className="text-gray-400" />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                                <div className="p-6 bg-primary/5 dark:bg-primary/10 border border-primary/20 rounded-2xl space-y-2">
                                    <p className="text-[10px] font-bold text-primary uppercase tracking-widest">Global Status</p>
                                    <p className="text-xl font-bold text-primary capitalize">{selectedDriver.status}</p>
                                    <p className="text-[9px] font-bold text-primary/60">Partner since {selectedDriver.joinedAt}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Vetting Modal (Un-Approved Drivers) */}
            {isVettingOpen && selectedDriver && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/50 backdrop-blur-sm">
                    <div className="card w-full max-w-md overflow-hidden shadow-2xl animate-in slide-in-from-bottom-8 duration-300">
                        <div className="px-8 py-8 border-b border-gray-100 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-900/50">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="p-2 bg-warning-500/10 rounded-lg text-warning-500">
                                    <AlertTriangle size={20} />
                                </div>
                                <h3 className="text-lg font-bold text-gray-800 dark:text-white tracking-tight uppercase">Vetting Protocol</h3>
                            </div>
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 rounded-xl bg-gray-100 dark:bg-gray-800 flex items-center justify-center font-bold text-gray-400">
                                    {selectedDriver.name.charAt(0)}
                                </div>
                                <div>
                                    <p className="text-sm font-bold text-gray-800 dark:text-white">{selectedDriver.name}</p>
                                    <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">{selectedDriver.city} • Initial Enrollment</p>
                                </div>
                            </div>
                        </div>

                        <div className="p-8 space-y-8">
                            <div className="space-y-4">
                                <h4 className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Verification Assets</h4>
                                <div className="space-y-3">
                                    <div className="p-4 bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl flex items-center justify-between">
                                        <div>
                                            <p className="text-[10px] font-bold text-gray-800 dark:text-white uppercase tracking-tight">Vehicle Specs</p>
                                            <p className="text-sm font-bold text-gray-500 truncate max-w-[180px]">{selectedDriver.carModel} ({selectedDriver.licensePlate})</p>
                                        </div>
                                        <div className="px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded text-[9px] font-bold text-gray-400 uppercase">PENDING</div>
                                    </div>
                                    {selectedDriver.documents.map((doc, i) => (
                                        <div key={i} className="p-4 bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl flex items-center justify-between">
                                            <div>
                                                <p className="text-[10px] font-bold text-gray-800 dark:text-white uppercase tracking-tight">{doc.type}</p>
                                                <p className="text-xs font-bold text-gray-500">Digital Copy v1.0</p>
                                            </div>
                                            <button className="flex items-center gap-2 px-3 py-1.5 border border-gray-200 dark:border-gray-700 rounded-lg text-[10px] font-bold text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-white/5 transition-all uppercase">
                                                <Eye size={12} />
                                                Review
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="flex gap-4">
                                <button
                                    onClick={() => handleAction(selectedDriver.id, 'reject')}
                                    className="flex-1 py-3 border border-error-500/20 text-error-500 text-[10px] font-bold uppercase tracking-widest rounded-2xl hover:bg-error-500/10 transition-all"
                                >
                                    Reject
                                </button>
                                <button
                                    onClick={() => handleAction(selectedDriver.id, 'approve')}
                                    className="flex-1 py-3 bg-primary text-black text-[10px] font-bold uppercase tracking-widest rounded-2xl hover:scale-[1.02] active:scale-95 transition-all shadow-lg shadow-primary/20"
                                >
                                    Approve Pilot
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
