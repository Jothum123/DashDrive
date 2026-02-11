import {
    Ban,
    Building2,
    CheckCircle,
    CreditCard,
    Eye,
    History,
    MoreVertical,
    Pencil,
    Plus,
    Search,
    Trash2,
    UserCircle,
    Users,
    X,
    Zap
} from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Header } from '../components/layout/Header';
import type { Passenger } from '../../stores/adminStore';
import { useAdminStore } from '../../stores/adminStore';

const statusColors: Record<Passenger['status'], string> = {
    active: 'bg-primary/10 text-primary border-primary/20',
    suspended: 'bg-red-500/10 text-red-500 border-red-500/20',
    banned: 'bg-zinc-800 text-zinc-500 border-zinc-700',
};

export function UserCenter() {
    const navigate = useNavigate();
    const { passengers, updatePassengerStatus, addPassenger, updatePassenger, removePassenger } = useAdminStore();
    const [search, setSearch] = useState('');
    const [statusFilter, setStatusFilter] = useState<Passenger['status'] | 'all'>('all');
    const [openMenu, setOpenMenu] = useState<string | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingPassenger, setEditingPassenger] = useState<Passenger | null>(null);
    const [formData, setFormData] = useState({ name: '', email: '', phone: '' });

    const filteredPassengers = passengers.filter((passenger) => {
        const matchesSearch =
            passenger.name.toLowerCase().includes(search.toLowerCase()) ||
            passenger.email.toLowerCase().includes(search.toLowerCase());
        const matchesStatus = statusFilter === 'all' || passenger.status === statusFilter;
        return matchesSearch && matchesStatus;
    });

    const handleAction = (passengerId: string, action: 'view' | 'suspend' | 'unsuspend' | 'ban' | 'edit' | 'delete') => {
        setOpenMenu(null);
        if (action === 'view') {
            navigate(`/passengers/${passengerId}`);
        } else if (action === 'suspend') {
            updatePassengerStatus(passengerId, 'suspended');
        } else if (action === 'unsuspend') {
            updatePassengerStatus(passengerId, 'active');
        } else if (action === 'ban') {
            updatePassengerStatus(passengerId, 'banned');
        } else if (action === 'edit') {
            const p = passengers.find(px => px.id === passengerId);
            if (p) {
                setEditingPassenger(p);
                setFormData({ name: p.name, email: p.email, phone: p.phone });
                setIsModalOpen(true);
            }
        } else if (action === 'delete') {
            if (confirm('Are you sure you want to purge this record? This action cannot be undone.')) {
                removePassenger(passengerId);
            }
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (editingPassenger) {
            updatePassenger(editingPassenger.id, formData);
        } else {
            addPassenger(formData);
        }
        setIsModalOpen(false);
        setEditingPassenger(null);
        setFormData({ name: '', email: '', phone: '' });
    };

    return (
        <div className="min-h-screen bg-black text-white flex flex-col">
            <Header
                title="User Center"
                subtitle="Passenger Registry & Account Oversight"
                actions={
                    <button
                        onClick={() => {
                            setEditingPassenger(null);
                            setFormData({ name: '', email: '', phone: '' });
                            setIsModalOpen(true);
                        }}
                        className="bg-primary text-black font-black px-6 py-3 rounded-2xl flex items-center gap-2 hover:scale-[1.02] active:scale-95 transition-all shadow-xl shadow-primary/10 text-[10px] uppercase tracking-widest"
                    >
                        <Plus size={14} />
                        Add New Passenger
                    </button>
                }
            />

            <div className="flex-1 p-8 grid grid-cols-1 lg:grid-cols-4 gap-8">

                {/* User Directory & Categories */}
                <div className="lg:col-span-3 space-y-8">

                    {/* User Categories */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <UserCategoryCard
                            title="Total Passengers"
                            value={passengers.length}
                            icon={<Users className="text-primary" size={20} />}
                        />
                        <UserCategoryCard
                            title="Business Accounts"
                            value="124"
                            icon={<Building2 className="text-primary" size={20} />}
                        />
                        <UserCategoryCard
                            title="Active Debt"
                            value="£2,450"
                            icon={<CreditCard className="text-red-500" size={20} />}
                            isWarning={true}
                        />
                    </div>

                    {/* Rider Table */}
                    <div className="bg-zinc-900/50 border border-zinc-800 rounded-[40px] overflow-hidden">
                        <div className="p-8 border-b border-zinc-800 flex flex-wrap items-center justify-between gap-6 bg-zinc-900/30">
                            <div className="relative group max-w-xs w-full">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500 group-focus-within:text-primary transition-colors" size={16} />
                                <input
                                    type="text"
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    placeholder="Search by name or email..."
                                    className="pl-10 pr-4 py-2.5 bg-black border border-zinc-800 rounded-xl text-xs focus:border-primary outline-none transition-all w-full"
                                />
                            </div>

                            <div className="flex p-1 bg-black rounded-xl border border-zinc-800">
                                {['all', 'active', 'suspended', 'banned'].map((status) => (
                                    <button
                                        key={status}
                                        onClick={() => setStatusFilter(status as any)}
                                        className={`px-4 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-wider transition-all ${statusFilter === status
                                            ? 'bg-zinc-800 text-white shadow-sm'
                                            : 'text-zinc-500 hover:text-zinc-300'
                                            }`}
                                    >
                                        {status === 'all' ? 'Universal' : status}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="overflow-x-auto no-scrollbar">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="text-zinc-500 text-[10px] font-black uppercase tracking-widest border-b border-zinc-800 bg-zinc-900/20">
                                        <th className="px-8 py-5">Passenger Identity</th>
                                        <th className="px-8 py-5">Comm Link</th>
                                        <th className="px-8 py-5">Trust Score</th>
                                        <th className="px-8 py-5">Status</th>
                                        <th className="px-8 py-5 text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-zinc-800/50">
                                    {filteredPassengers.map((rider) => (
                                        <tr key={rider.id} className="hover:bg-zinc-800/20 transition-all group">
                                            <td className="px-8 py-5">
                                                <div className="flex items-center gap-4">
                                                    <div className="w-10 h-10 rounded-xl bg-zinc-800 border border-white/5 flex items-center justify-center overflow-hidden grayscale group-hover:grayscale-0 transition-all">
                                                        <img
                                                            src={`https://api.dicebear.com/7.x/pixel-art/svg?seed=${rider.name}`}
                                                            className="w-full h-full opacity-60 group-hover:opacity-100 transition-opacity"
                                                            alt=""
                                                        />
                                                    </div>
                                                    <div>
                                                        <p className="text-sm font-black text-white">{rider.name}</p>
                                                        <p className="text-[10px] text-zinc-500 font-bold uppercase">{rider.email}</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-8 py-5">
                                                <p className="text-xs font-bold text-zinc-400">{rider.phone}</p>
                                            </td>
                                            <td className="px-8 py-5">
                                                <div className="flex items-center gap-1.5 font-bold">
                                                    <Zap size={12} className="text-primary" />
                                                    <span className="text-white text-sm">{rider.rating.toFixed(2)}</span>
                                                </div>
                                                <p className="text-[9px] text-zinc-600 font-black uppercase tracking-tighter">{rider.totalTrips} Rides</p>
                                            </td>
                                            <td className="px-8 py-5">
                                                <span className={`inline-flex px-2 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest border ${statusColors[rider.status]}`}>
                                                    {rider.status}
                                                </span>
                                            </td>
                                            <td className="px-8 py-5">
                                                <div className="relative flex justify-end">
                                                    <button
                                                        onClick={() => setOpenMenu(openMenu === rider.id ? null : rider.id)}
                                                        className="p-2.5 rounded-xl text-zinc-600 hover:bg-zinc-800 hover:text-white transition-all border border-transparent hover:border-white/5"
                                                    >
                                                        <MoreVertical size={18} />
                                                    </button>

                                                    {openMenu === rider.id && (
                                                        <div className="absolute right-0 top-full mt-2 w-52 bg-zinc-900/95 backdrop-blur-xl rounded-2xl border border-zinc-800 shadow-2xl z-50 overflow-hidden text-left">
                                                            <button
                                                                onClick={() => handleAction(rider.id, 'view')}
                                                                className="w-full flex items-center gap-3 px-4 py-3 text-left text-[10px] font-black uppercase tracking-widest text-zinc-400 hover:bg-primary hover:text-black transition-colors"
                                                            >
                                                                <Eye size={16} />
                                                                Diagnostics
                                                            </button>
                                                            <button
                                                                onClick={() => handleAction(rider.id, 'edit')}
                                                                className="w-full flex items-center gap-3 px-4 py-3 text-left text-[10px] font-black uppercase tracking-widest text-zinc-400 hover:bg-zinc-800 transition-colors"
                                                            >
                                                                <Pencil size={16} />
                                                                Modify Identity
                                                            </button>
                                                            {rider.status === 'active' && (
                                                                <button
                                                                    onClick={() => handleAction(rider.id, 'suspend')}
                                                                    className="w-full flex items-center gap-3 px-4 py-3 text-left text-[10px] font-black uppercase tracking-widest text-red-500 hover:bg-red-500/20 transition-colors"
                                                                >
                                                                    <Ban size={16} />
                                                                    Suspend Access
                                                                </button>
                                                            )}
                                                            {rider.status === 'suspended' && (
                                                                <>
                                                                    <button
                                                                        onClick={() => handleAction(rider.id, 'unsuspend')}
                                                                        className="w-full flex items-center gap-3 px-4 py-3 text-left text-[10px] font-black uppercase tracking-widest text-primary hover:bg-primary/20 transition-colors"
                                                                    >
                                                                        <CheckCircle size={16} />
                                                                        Restore Access
                                                                    </button>
                                                                    <button
                                                                        onClick={() => handleAction(rider.id, 'ban')}
                                                                        className="w-full flex items-center gap-3 px-4 py-3 text-left text-[10px] font-black uppercase tracking-widest text-red-600 hover:bg-red-600/20 transition-colors"
                                                                    >
                                                                        <Ban size={16} />
                                                                        Terminate Account
                                                                    </button>
                                                                </>
                                                            )}
                                                            <div className="border-t border-zinc-800 mt-1">
                                                                <button
                                                                    onClick={() => handleAction(rider.id, 'delete')}
                                                                    className="w-full flex items-center gap-3 px-4 py-3 text-left text-[10px] font-black uppercase tracking-widest text-red-400 hover:bg-red-500/10 transition-colors"
                                                                >
                                                                    <Trash2 size={16} />
                                                                    Purge Record
                                                                </button>
                                                            </div>
                                                        </div>
                                                    )}
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        {filteredPassengers.length === 0 && (
                            <div className="py-20 text-center">
                                <Search size={40} className="mx-auto text-zinc-800 mb-4" />
                                <p className="text-sm font-black text-zinc-600 uppercase tracking-widest">No passengers matching your query</p>
                            </div>
                        )}
                    </div>
                </div>

                {/* Right Column: Corporate & Quick Info */}
                <aside className="space-y-6">
                    <div className="bg-zinc-900/50 border border-zinc-800 rounded-[40px] p-8 space-y-6 text-left">
                        <div className="flex items-center gap-3 text-left">
                            <Building2 className="text-primary" size={20} />
                            <h3 className="text-sm font-black uppercase tracking-widest">Business Overview</h3>
                        </div>

                        <div className="p-5 bg-zinc-950 border border-zinc-800 rounded-2xl space-y-2">
                            <p className="text-[10px] font-black text-zinc-600 uppercase tracking-widest">Top Account</p>
                            <p className="text-lg font-black leading-tight">London Tech Park</p>
                            <div className="flex justify-between items-center text-xs">
                                <span className="text-zinc-500">Monthly spend</span>
                                <span className="text-primary font-black">£14,500</span>
                            </div>
                        </div>

                        <button className="w-full py-4 bg-primary text-black text-[10px] font-black uppercase tracking-widest rounded-2xl hover:scale-[1.02] transition-all">
                            Manage All Accounts
                        </button>
                    </div>

                    <div className="bg-zinc-900/50 border border-zinc-800 rounded-[40px] p-8 space-y-6 text-left">
                        <div className="flex items-center gap-3">
                            <History className="text-zinc-500" size={20} />
                            <h3 className="text-sm font-black uppercase tracking-widest">Recent Activity</h3>
                        </div>
                        <div className="space-y-4">
                            <ActivityItem icon={<UserCircle size={14} />} text="New registration from Manchester" time="2m ago" />
                            <ActivityItem icon={<CreditCard size={14} />} text="Refund processed for Ride #842" time="15m ago" />
                            <ActivityItem icon={<Building2 size={14} />} text="Enterprise invite accepted" time="1h ago" />
                        </div>
                    </div>
                </aside>
            </div>

            {/* Passenger Modal - Add/Edit */}
            {isModalOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
                    <div className="absolute inset-0 bg-black/80 backdrop-blur-md" onClick={() => setIsModalOpen(false)} />
                    <div className="relative w-full max-w-md bg-zinc-900 border border-white/10 rounded-[32px] shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
                        <div className="px-8 py-6 border-b border-white/5 flex items-center justify-between bg-zinc-900/50">
                            <div>
                                <h3 className="text-lg font-black tracking-tight">{editingPassenger ? 'Modify Identity' : 'Enrollment Registry'}</h3>
                                <p className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">{editingPassenger ? 'Updating Registry' : 'New Passenger Enrollment'}</p>
                            </div>
                            <button onClick={() => setIsModalOpen(false)} className="p-2 hover:bg-white/5 rounded-xl transition-colors">
                                <X size={20} className="text-zinc-500" />
                            </button>
                        </div>
                        <form onSubmit={handleSubmit} className="p-8 space-y-6">
                            <div className="space-y-4">
                                <div>
                                    <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest mb-2 block ml-1">Full Legal Name</label>
                                    <input
                                        required
                                        type="text"
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        className="w-full px-4 py-3 bg-black border border-zinc-800 rounded-xl text-sm focus:border-primary outline-none transition-all"
                                        placeholder="e.g. Alexander Pierce"
                                    />
                                </div>
                                <div>
                                    <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest mb-2 block ml-1">Communication Link (Email)</label>
                                    <input
                                        required
                                        type="email"
                                        value={formData.email}
                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                        className="w-full px-4 py-3 bg-black border border-zinc-800 rounded-xl text-sm focus:border-primary outline-none transition-all"
                                        placeholder="alex@dashdrive.com"
                                    />
                                </div>
                                <div>
                                    <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest mb-2 block ml-1">Contact Frequency (Phone)</label>
                                    <input
                                        required
                                        type="text"
                                        value={formData.phone}
                                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                        className="w-full px-4 py-3 bg-black border border-zinc-800 rounded-xl text-sm focus:border-primary outline-none transition-all"
                                        placeholder="+44 7000 000000"
                                    />
                                </div>
                            </div>
                            <div className="flex gap-4 pt-2">
                                <button
                                    type="button"
                                    onClick={() => setIsModalOpen(false)}
                                    className="flex-1 py-4 bg-zinc-950 border border-white/5 text-zinc-500 text-[10px] font-black uppercase tracking-widest rounded-2xl hover:text-white transition-all"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="flex-1 py-4 bg-primary text-black text-[10px] font-black uppercase tracking-widest rounded-2xl hover:scale-[1.02] active:scale-95 transition-all shadow-xl shadow-primary/20"
                                >
                                    {editingPassenger ? 'Commit Changes' : 'Grant Access'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}

function UserCategoryCard({ title, value, icon, isWarning = false }: any) {
    return (
        <div className={`p-6 bg-zinc-900/50 border border-zinc-800 rounded-[32px] group hover:border-zinc-700 transition-all text-left`}>
            <div className={`w-10 h-10 rounded-2xl bg-black border border-zinc-800 flex items-center justify-center mb-4`}>
                {icon}
            </div>
            <p className={`text-2xl font-black tracking-tighter mb-1 ${isWarning ? 'text-red-500' : 'text-white'}`}>{value}</p>
            <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">{title}</p>
        </div>
    );
}

function ActivityItem({ icon, text, time }: any) {
    return (
        <div className="flex gap-3">
            <div className="w-6 h-6 rounded-lg bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-600 shrink-0">
                {icon}
            </div>
            <div className="flex-1">
                <p className="text-[11px] font-bold text-zinc-300 leading-tight">{text}</p>
                <p className="text-[9px] text-zinc-600 font-bold uppercase">{time}</p>
            </div>
        </div>
    );
}
