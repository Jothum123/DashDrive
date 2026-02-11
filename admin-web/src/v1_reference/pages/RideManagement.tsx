import {
    Calendar,
    ChevronRight,
    Clock,
    Download,
    History,
    MapPin,
    MoreVertical,
    Plus,
    Search,
    Send,
    X,
    XCircle
} from 'lucide-react';
import { useState } from 'react';
import PageBreadcrumb from '../components/common/PageBreadcrumb';
import { useAdminStore } from '../../stores/adminStore';

type RideTab = 'all' | 'scheduled' | 'cancelled';

export function RideManagement() {
    const { recentRides, drivers, createManualBooking } = useAdminStore();
    const [activeTab, setActiveTab] = useState<RideTab>('all');
    const [searchQuery, setSearchQuery] = useState('');
    const [isDispatchModalOpen, setIsDispatchModalOpen] = useState(false);

    // Dispatch Form State
    const [formData, setFormData] = useState({
        passenger: '',
        passengerPhone: '',
        pickupAddress: '',
        destinationAddress: '',
        fare: '',
        vehicleType: 'Standard',
        driverId: '',
        scheduledDate: '',
        scheduledTime: ''
    });

    const filteredRides = recentRides.filter(ride => {
        const matchesTab =
            activeTab === 'all' ||
            (activeTab === 'scheduled' && ride.status === 'scheduled') ||
            (activeTab === 'cancelled' && ride.status === 'cancelled');

        const matchesSearch =
            ride.passenger.toLowerCase().includes(searchQuery.toLowerCase()) ||
            (ride.driver && ride.driver.toLowerCase().includes(searchQuery.toLowerCase())) ||
            ride.pickupAddress.toLowerCase().includes(searchQuery.toLowerCase()) ||
            ride.destinationAddress.toLowerCase().includes(searchQuery.toLowerCase());

        return matchesTab && matchesSearch;
    });

    const handleDispatchSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const selectedDriver = drivers.find(d => d.id === formData.driverId);

        createManualBooking({
            passenger: formData.passenger,
            passengerPhone: formData.passengerPhone,
            pickupAddress: formData.pickupAddress,
            destinationAddress: formData.destinationAddress,
            fare: parseFloat(formData.fare),
            vehicleType: formData.vehicleType,
            driver: selectedDriver ? selectedDriver.name : 'Searching...',
            scheduledTime: formData.scheduledDate ? `${formData.scheduledDate} ${formData.scheduledTime}` : undefined
        });

        setIsDispatchModalOpen(false);
        setFormData({
            passenger: '',
            passengerPhone: '',
            pickupAddress: '',
            destinationAddress: '',
            fare: '',
            vehicleType: 'Standard',
            driverId: '',
            scheduledDate: '',
            scheduledTime: ''
        });
    };

    return (
        <div className="min-h-screen bg-transparent dark:text-white/90 flex flex-col">
            <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
                <PageBreadcrumb pageTitle="Ride Oversight" />
                <div className="flex gap-3">
                    <button className="px-4 py-2 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-400 text-xs font-bold uppercase tracking-widest rounded-xl hover:bg-gray-50 dark:hover:bg-white/5 transition-all flex items-center gap-2">
                        <Download size={14} />
                        Ledger
                    </button>
                    <button
                        onClick={() => setIsDispatchModalOpen(true)}
                        className="px-4 py-2 bg-primary text-black font-bold text-xs uppercase tracking-widest rounded-xl hover:scale-[1.02] active:scale-95 transition-all flex items-center gap-2"
                    >
                        <Plus size={14} />
                        Initiate Dispatch
                    </button>
                </div>
            </div>

            <div className="flex-1 space-y-6">
                {/* Operational HUD */}
                <div className="flex flex-wrap items-center justify-between gap-6">
                    <div className="flex p-1 bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl">
                        {[
                            { id: 'all', label: 'All Missions', icon: History },
                            { id: 'scheduled', label: 'Forward Bookings', icon: Calendar },
                            { id: 'cancelled', label: 'Incidents', icon: XCircle }
                        ].map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id as RideTab)}
                                className={`flex items-center gap-2 px-6 py-2 rounded-lg text-xs font-bold uppercase tracking-widest transition-all ${activeTab === tab.id
                                    ? 'bg-white dark:bg-gray-800 text-gray-800 dark:text-white shadow-sm'
                                    : 'text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'
                                    }`}
                            >
                                <tab.icon size={14} />
                                {tab.label}
                            </button>
                        ))}
                    </div>

                    <div className="relative group max-w-md w-full">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-primary transition-colors" size={16} />
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Filter missions..."
                            className="w-full pl-12 pr-4 py-2 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl text-sm focus:border-primary dark:focus:border-primary outline-none transition-all placeholder:text-gray-400"
                        />
                    </div>
                </div>

                {/* Ride Ledger Table */}
                <div className="card overflow-hidden shadow-sm">
                    <div className="overflow-x-auto no-scrollbar">
                        <table className="w-full text-left">
                            <thead className="bg-gray-50 dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800">
                                <tr className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">
                                    <th className="px-6 py-4">Mission Identity</th>
                                    <th className="px-6 py-4">Logistics</th>
                                    <th className="px-6 py-4">Yield & Asset</th>
                                    <th className="px-6 py-4">{activeTab === 'cancelled' ? 'Cancellation Insight' : 'Operational Status'}</th>
                                    <th className="px-6 py-4 text-right">Control</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                                {filteredRides.map((ride) => (
                                    <tr key={ride.id} className="hover:bg-gray-50 dark:hover:bg-white/[0.01] transition-colors group">
                                        <td className="px-6 py-4">
                                            <div className="space-y-1">
                                                <div className="flex items-center gap-2">
                                                    <span className="text-sm font-bold text-gray-800 dark:text-white">{ride.passenger}</span>
                                                    <ChevronRight size={10} className="text-gray-400" />
                                                    <span className="text-xs font-bold text-gray-500">{ride.driver}</span>
                                                </div>
                                                <p className="text-[10px] font-mono text-primary font-bold uppercase tracking-tight">{ride.id}</p>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="space-y-1.5 min-w-[250px]">
                                                <div className="flex items-start gap-2">
                                                    <div className="mt-1 w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                                                    <p className="text-[11px] font-bold text-gray-600 dark:text-gray-400 leading-tight">{ride.pickupAddress}</p>
                                                </div>
                                                <div className="flex items-start gap-2">
                                                    <div className="mt-1 w-1.5 h-1.5 rounded-full bg-error-500 shrink-0" />
                                                    <p className="text-[11px] font-bold text-gray-500 leading-tight">{ride.destinationAddress}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="space-y-1">
                                                <p className="text-sm font-bold text-gray-800 dark:text-white">£{ride.fare.toFixed(2)}</p>
                                                <p className="text-[10px] font-bold text-gray-500 uppercase">{ride.vehicleType}</p>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            {activeTab === 'cancelled' ? (
                                                <div className="space-y-1">
                                                    <p className="text-[10px] font-bold text-error-500 uppercase tracking-tight">Canceled by {ride.canceledBy}</p>
                                                    <p className="text-[11px] text-gray-400 font-bold max-w-[200px] truncate" title={ride.cancellationReason}>
                                                        {ride.cancellationReason}
                                                    </p>
                                                </div>
                                            ) : (
                                                <div className="space-y-1">
                                                    <span className={`badge ${ride.status === 'completed' ? 'badge-success' :
                                                        ride.status === 'in_progress' ? 'badge-info' :  // Assuming badge-info for in_progress
                                                            ride.status === 'scheduled' ? 'badge-warning' :
                                                                'badge-error'
                                                        }`}>
                                                        {ride.status.replace('_', ' ')}
                                                    </span>
                                                    <p className="text-[10px] text-gray-400 font-bold flex items-center gap-1.5">
                                                        <Clock size={10} />
                                                        {ride.status === 'scheduled' ? ride.scheduledTime : ride.timestamp}
                                                    </p>
                                                </div>
                                            )}
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <button className="p-2 rounded-xl text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-800 dark:hover:text-white transition-all">
                                                <MoreVertical size={18} />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    {filteredRides.length === 0 && (
                        <div className="py-24 text-center">
                            <div className="w-16 h-16 bg-zinc-950 rounded-[20px] border border-zinc-800 flex items-center justify-center mx-auto mb-6 transform rotate-12 transition-transform group-hover:rotate-0">
                                <Search className="text-zinc-800" size={32} />
                            </div>
                            <h3 className="text-sm font-black text-white uppercase tracking-[0.2em] mb-2">No logistical archives</h3>
                            <p className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest">Adjust your filters to scan a different mission segment</p>
                        </div>
                    )}
                </div>
            </div>

            {/* Manual Dispatch Modal */}
            {isDispatchModalOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/50 backdrop-blur-sm">
                    <div className="card w-full max-w-lg overflow-hidden shadow-2xl animate-in zoom-in duration-200">
                        <div className="px-8 py-6 border-b border-gray-100 dark:border-gray-800 flex items-center justify-between bg-gray-50/50 dark:bg-gray-900/50">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-primary/10 rounded-lg text-primary">
                                    <Send size={20} />
                                </div>
                                <h3 className="text-xl font-bold text-gray-800 dark:text-white tracking-tight uppercase">Initiate Dispatch</h3>
                            </div>
                            <button onClick={() => setIsDispatchModalOpen(false)} className="p-2 hover:bg-gray-100 dark:hover:bg-white/5 rounded-xl transition-colors">
                                <X size={24} className="text-gray-400" />
                            </button>
                        </div>

                        <form onSubmit={handleDispatchSubmit} className="p-8 space-y-6 overflow-y-auto max-h-[80vh] no-scrollbar">
                            <div className="grid grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest ml-1">Passenger Name</label>
                                    <input
                                        required
                                        type="text"
                                        value={formData.passenger}
                                        onChange={e => setFormData({ ...formData, passenger: e.target.value })}
                                        className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl text-sm focus:border-primary outline-none transition-all placeholder:text-gray-400"
                                        placeholder="Full legal name"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest ml-1">Contact Number</label>
                                    <input
                                        required
                                        type="tel"
                                        value={formData.passengerPhone}
                                        onChange={e => setFormData({ ...formData, passengerPhone: e.target.value })}
                                        className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl text-sm focus:border-primary outline-none transition-all placeholder:text-gray-400"
                                        placeholder="+44 7XXX XXXXXX"
                                    />
                                </div>
                            </div>

                            <div className="space-y-4">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest ml-1">Pickup Vector (Origin)</label>
                                    <div className="relative">
                                        <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-primary" size={14} />
                                        <input
                                            required
                                            type="text"
                                            value={formData.pickupAddress}
                                            onChange={e => setFormData({ ...formData, pickupAddress: e.target.value })}
                                            className="w-full pl-10 pr-4 py-3 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl text-sm focus:border-primary outline-none transition-all placeholder:text-gray-400"
                                            placeholder="Enter precise pickup address"
                                        />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest ml-1">Mission Goal (Destination)</label>
                                    <div className="relative">
                                        <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-red-500" size={14} />
                                        <input
                                            required
                                            type="text"
                                            value={formData.destinationAddress}
                                            onChange={e => setFormData({ ...formData, destinationAddress: e.target.value })}
                                            className="w-full pl-10 pr-4 py-3 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl text-sm focus:border-primary outline-none transition-all placeholder:text-gray-400"
                                            placeholder="Enter precise destination address"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest ml-1">Estimated Fare (£)</label>
                                    <input
                                        required
                                        type="number"
                                        step="0.01"
                                        value={formData.fare}
                                        onChange={e => setFormData({ ...formData, fare: e.target.value })}
                                        className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl text-sm focus:border-primary outline-none transition-all placeholder:text-gray-400"
                                        placeholder="0.00"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest ml-1">Vehicle Asset</label>
                                    <select
                                        value={formData.vehicleType}
                                        onChange={e => setFormData({ ...formData, vehicleType: e.target.value })}
                                        className="w-full px-4 py-3 bg-black border border-zinc-800 rounded-xl text-xs focus:border-primary outline-none transition-all appearance-none"
                                    >
                                        <option value="Standard">Standard Economic</option>
                                        <option value="Luxury Executive">Luxury Executive</option>
                                        <option value="Electric High Performance">Electric Tesla/Lucid</option>
                                        <option value="Large SUV">Large Capacity SUV</option>
                                    </select>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest ml-1">Manual Asset Assignment (Pilot)</label>
                                <select
                                    required
                                    value={formData.driverId}
                                    onChange={e => setFormData({ ...formData, driverId: e.target.value })}
                                    className="w-full px-4 py-3 bg-black border border-zinc-800 rounded-xl text-xs focus:border-primary outline-none transition-all appearance-none"
                                >
                                    <option value="">Select Nearest Online Pilot</option>
                                    {drivers.filter(d => d.onlineStatus === 'online' && d.status === 'active').map(driver => (
                                        <option key={driver.id} value={driver.id}>
                                            {driver.name} • {driver.carModel} ({driver.rating} ★)
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div className="p-6 bg-zinc-950 border border-zinc-800 rounded-3xl space-y-4">
                                <div className="flex items-center gap-2">
                                    <Clock size={14} className="text-zinc-500" />
                                    <h4 className="text-[10px] font-black uppercase tracking-widest text-zinc-300">Scheduled Dispatch (Optional)</h4>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <input
                                        type="date"
                                        value={formData.scheduledDate}
                                        onChange={e => setFormData({ ...formData, scheduledDate: e.target.value })}
                                        className="w-full px-4 py-3 bg-zinc-900 border border-white/5 rounded-xl text-xs focus:border-primary outline-none transition-all text-zinc-400"
                                    />
                                    <input
                                        type="time"
                                        value={formData.scheduledTime}
                                        onChange={e => setFormData({ ...formData, scheduledTime: e.target.value })}
                                        className="w-full px-4 py-3 bg-zinc-900 border border-white/5 rounded-xl text-xs focus:border-primary outline-none transition-all text-zinc-400"
                                    />
                                </div>
                            </div>

                            <button
                                type="submit"
                                className="w-full py-4 bg-primary text-black text-[11px] font-black uppercase tracking-[0.2em] rounded-2xl hover:scale-[1.01] active:scale-[0.98] transition-all shadow-xl shadow-primary/20 flex items-center justify-center gap-3"
                            >
                                <Send size={18} />
                                Confirm Deployment
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
