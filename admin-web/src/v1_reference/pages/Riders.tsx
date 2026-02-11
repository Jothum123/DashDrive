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
    suspended: 'bg-amber-500/10 text-amber-500 border-amber-500/20',
    banned: 'bg-zinc-800 text-zinc-500 border-zinc-700',
};

export function Riders() {
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
            navigate(`/riders/${passengerId}`);
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
        <div className="min-h-screen bg-transparent text-zinc-900 dark:text-white flex flex-col font-uber">
            <Header
                title="Rider Matrix"
                subtitle="Passenger Registry & Global Oversight"
                actions={
                    <button
                        onClick={() => {
                            setEditingPassenger(null);
                            setFormData({ name: '', email: '', phone: '' });
                            setIsModalOpen(true);
                        }}
                        className="bg-primary text-black font-uber-bold px-6 py-3.5 rounded-[22px] flex items-center gap-2 hover:scale-[1.02] active:scale-95 transition-all shadow-xl shadow-primary/20 text-[10px] uppercase tracking-widest"
                    >
                        <Plus size={16} />
                        Enroll New Rider
                    </button>
                }
            />

            <div className="flex-1 p-8 grid grid-cols-1 lg:grid-cols-4 gap-10">
                {/* User Directory */}
                <div className="lg:col-span-3 space-y-10">
                    {/* Categories */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <UserCategoryCard
                            title="Active Riders"
                            value={passengers.length}
                            icon={<Users className="text-primary" size={24} />}
                        />
                        <UserCategoryCard
                            title="Corporate Accounts"
                            value="124"
                            icon={<Building2 className="text-primary" size={24} />}
                        />
                        <UserCategoryCard
                            title="Outstanding Balance"
                            value="£2,450"
                            icon={<CreditCard className="text-rose-500" size={24} />}
                            isWarning={true}
                        />
                    </div>

                    {/* Table */}
                    <div className="bg-white dark:bg-zinc-900/50 border border-zinc-100 dark:border-zinc-800 rounded-[40px] overflow-hidden shadow-sm">
                        <div className="p-10 border-b border-zinc-100 dark:border-zinc-800 flex flex-wrap items-center justify-between gap-8 bg-zinc-50/30 dark:bg-zinc-950/30">
                            <div className="relative group max-w-xs w-full">
                                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400 group-focus-within:text-primary transition-colors" size={18} />
                                <input
                                    type="text"
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    placeholder="Search by identity or contact..."
                                    className="pl-12 pr-4 py-3.5 bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-[20px] text-[11px] font-uber-bold uppercase tracking-wider focus:border-primary outline-none transition-all w-full shadow-inner"
                                />
                            </div>

                            <div className="flex p-1.5 bg-zinc-100 dark:bg-zinc-950 rounded-[22px] border border-zinc-200 dark:border-zinc-800">
                                {['all', 'active', 'suspended', 'banned'].map((status) => (
                                    <button
                                        key={status}
                                        onClick={() => setStatusFilter(status as any)}
                                        className={`px-5 py-2.5 rounded-[18px] text-[10px] font-uber-bold uppercase tracking-widest transition-all ${statusFilter === status
                                            ? 'bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white shadow-md'
                                            : 'text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300'
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
                                    <tr className="text-zinc-400 text-[10px] font-uber-bold uppercase tracking-[0.2em] border-b border-zinc-100 dark:border-zinc-800 bg-zinc-50/20 dark:bg-zinc-950/10">
                                        <th className="px-10 py-6">Rider Identity</th>
                                        <th className="px-10 py-6">Comm Link</th>
                                        <th className="px-10 py-6">Trust Score</th>
                                        <th className="px-10 py-6">Status</th>
                                        <th className="px-10 py-6 text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800">
                                    {filteredPassengers.map((rider) => (
                                        <tr key={rider.id} className="hover:bg-zinc-50 dark:hover:bg-white/[0.02] transition-all group">
                                            <td className="px-10 py-6">
                                                <div className="flex items-center gap-5">
                                                    <div className="w-11 h-11 rounded-2xl bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-white/5 flex items-center justify-center overflow-hidden grayscale group-hover:grayscale-0 transition-all shadow-sm">
                                                        <img
                                                            src={`https://api.dicebear.com/7.x/pixel-art/svg?seed=${rider.name}`}
                                                            className="w-8 h-8 opacity-60 group-hover:opacity-100 transition-opacity"
                                                            alt=""
                                                        />
                                                    </div>
                                                    <div>
                                                        <p className="text-sm font-uber-bold text-zinc-900 dark:text-white leading-tight">{rider.name}</p>
                                                        <p className="text-[10px] text-zinc-500 font-uber-medium uppercase tracking-wider">{rider.email}</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-10 py-6">
                                                <p className="text-[11px] font-uber-bold text-zinc-500 tracking-wider font-mono">{rider.phone}</p>
                                            </td>
                                            <td className="px-10 py-6">
                                                <div className="flex items-center gap-2 font-uber-bold">
                                                    <Zap size={14} className="text-primary" />
                                                    <span className="text-zinc-900 dark:text-white text-sm">{rider.rating.toFixed(2)}</span>
                                                </div>
                                                <p className="text-[9px] text-zinc-500 font-uber-bold uppercase tracking-wider">{rider.totalTrips} Trips</p>
                                            </td>
                                            <td className="px-10 py-6">
                                                <span className={`inline-flex px-3 py-1.5 rounded-xl text-[9px] font-uber-bold uppercase tracking-widest border ${statusColors[rider.status]}`}>
                                                    {rider.status}
                                                </span>
                                            </td>
                                            <td className="px-10 py-6">
                                                <div className="relative flex justify-end">
                                                    <button
                                                        onClick={() => setOpenMenu(openMenu === rider.id ? null : rider.id)}
                                                        className="p-2.5 rounded-2xl text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 hover:text-zinc-900 dark:hover:text-white transition-all border border-transparent hover:border-zinc-200 dark:hover:border-white/5"
                                                    >
                                                        <MoreVertical size={22} />
                                                    </button>

                                                    {openMenu === rider.id && (
                                                        <div className="absolute right-0 top-full mt-3 w-56 bg-white dark:bg-zinc-900 rounded-[28px] border border-zinc-200 dark:border-zinc-800 shadow-2xl z-50 overflow-hidden py-2">
                                                            <button
                                                                onClick={() => handleAction(rider.id, 'view')}
                                                                className="w-full flex items-center gap-4 px-5 py-3.5 text-left text-[10px] font-uber-bold uppercase tracking-[0.15em] text-zinc-600 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-white/5 transition-colors"
                                                            >
                                                                <Eye size={18} className="text-primary" />
                                                                Identity Scan
                                                            </button>
                                                            <button
                                                                onClick={() => handleAction(rider.id, 'edit')}
                                                                className="w-full flex items-center gap-4 px-5 py-3.5 text-left text-[10px] font-uber-bold uppercase tracking-[0.15em] text-zinc-600 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-white/5 transition-colors"
                                                            >
                                                                <Pencil size={18} />
                                                                Overwrite Identity
                                                            </button>
                                                            {rider.status === 'active' && (
                                                                <button
                                                                    onClick={() => handleAction(rider.id, 'suspend')}
                                                                    className="w-full flex items-center gap-4 px-5 py-3.5 text-left text-[10px] font-uber-bold uppercase tracking-[0.15em] text-amber-600 hover:bg-amber-500/10 transition-colors"
                                                                >
                                                                    <Ban size={18} />
                                                                    Revoke Access
                                                                </button>
                                                            )}
                                                            {rider.status === 'suspended' && (
                                                                <>
                                                                    <button
                                                                        onClick={() => handleAction(rider.id, 'unsuspend')}
                                                                        className="w-full flex items-center gap-4 px-5 py-3.5 text-left text-[10px] font-uber-bold uppercase tracking-[0.15em] text-primary hover:bg-primary/10 transition-colors"
                                                                    >
                                                                        <CheckCircle size={18} />
                                                                        Reauthorize
                                                                    </button>
                                                                    <button
                                                                        onClick={() => handleAction(rider.id, 'ban')}
                                                                        className="w-full flex items-center gap-4 px-5 py-3.5 text-left text-[10px] font-uber-bold uppercase tracking-[0.15em] text-rose-600 hover:bg-rose-600/10 transition-colors"
                                                                    >
                                                                        <Ban size={18} />
                                                                        Terminate Link
                                                                    </button>
                                                                </>
                                                            )}
                                                            <div className="border-t border-zinc-100 dark:border-zinc-800 mt-2 pt-2">
                                                                <button
                                                                    onClick={() => handleAction(rider.id, 'delete')}
                                                                    className="w-full flex items-center gap-4 px-5 py-3.5 text-left text-[10px] font-uber-bold uppercase tracking-[0.15em] text-rose-400 hover:bg-rose-500/10 transition-colors"
                                                                >
                                                                    <Trash2 size={18} />
                                                                    Purge History
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
                            <div className="py-28 text-center bg-zinc-50/50 dark:bg-transparent">
                                <Search size={56} className="mx-auto text-zinc-100 dark:text-zinc-800 mb-6" />
                                <p className="text-[10px] font-uber-bold text-zinc-400 uppercase tracking-[0.25em]">No rider identity matches your query</p>
                            </div>
                        )}
                    </div>
                </div>

                {/* Right Column */}
                <aside className="space-y-10">
                    <div className="bg-white dark:bg-zinc-900/50 border border-zinc-100 dark:border-zinc-800 rounded-[44px] p-10 space-y-8 text-left shadow-sm">
                        <div className="flex items-center gap-4">
                            <Building2 className="text-primary" size={24} />
                            <h3 className="text-[11px] font-uber-bold uppercase tracking-[0.2em] text-zinc-500">Corporate Sector</h3>
                        </div>

                        <div className="p-6 bg-zinc-50 dark:bg-zinc-950/80 border border-zinc-100 dark:border-zinc-800 rounded-[28px] space-y-3">
                            <p className="text-[9px] font-uber-bold text-zinc-400 uppercase tracking-[0.15em]">Alpha Account</p>
                            <p className="text-xl font-uber-bold leading-tight tracking-tight text-zinc-900 dark:text-white">London Tech Park</p>
                            <div className="flex justify-between items-center text-[11px] font-uber-medium pt-2">
                                <span className="text-zinc-500">Cycle yield</span>
                                <span className="text-primary font-uber-bold tracking-tight">£14,500</span>
                            </div>
                        </div>

                        <button className="w-full py-4.5 bg-primary text-black text-[10px] font-uber-bold uppercase tracking-widest rounded-[22px] hover:scale-[1.02] transition-all shadow-lg shadow-primary/10">
                            Enterprise Matrix
                        </button>
                    </div>

                    <div className="bg-white dark:bg-zinc-900/50 border border-zinc-100 dark:border-zinc-800 rounded-[44px] p-10 space-y-8 text-left shadow-sm">
                        <div className="flex items-center gap-4">
                            <History className="text-zinc-400" size={24} />
                            <h3 className="text-[11px] font-uber-bold uppercase tracking-[0.2em] text-zinc-500">Global Activity</h3>
                        </div>
                        <div className="space-y-6">
                            <ActivityItem icon={<UserCircle size={14} />} text="New registration: Birmingham Cluster" time="2m ago" />
                            <ActivityItem icon={<CreditCard size={14} />} text="Refund processed: Ride #842A" time="15m ago" />
                            <ActivityItem icon={<Building2 size={14} />} text="Enterprise agreement signed: CW Hub" time="1h ago" />
                        </div>
                    </div>
                </aside>
            </div>

            {/* Rider Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/70 backdrop-blur-xl">
                    <div className="relative w-full max-w-md bg-white dark:bg-zinc-950 border border-white/10 rounded-[48px] shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-300">
                        <div className="px-10 py-8 border-b border-zinc-100 dark:border-white/5 flex items-center justify-between bg-zinc-50/50 dark:bg-zinc-900/50">
                            <div>
                                <h3 className="text-xl font-uber-bold tracking-tight text-zinc-900 dark:text-white uppercase">{editingPassenger ? 'Modify Identity' : 'Enrollment Registry'}</h3>
                                <p className="text-[9px] font-uber-bold text-zinc-500 uppercase tracking-widest mt-1">{editingPassenger ? 'System Record Update' : 'New Identity Creation'}</p>
                            </div>
                            <button onClick={() => setIsModalOpen(false)} className="p-3 hover:bg-zinc-100 dark:hover:bg-white/5 rounded-2xl transition-all">
                                <X size={24} className="text-zinc-400" />
                            </button>
                        </div>
                        <form onSubmit={handleSubmit} className="p-10 space-y-8">
                            <div className="space-y-6">
                                <div>
                                    <label className="text-[9px] font-uber-bold text-zinc-500 uppercase tracking-[0.2em] mb-3 block ml-2">Full Legal Name</label>
                                    <input
                                        required
                                        type="text"
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        className="w-full px-6 py-4 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-[22px] text-sm font-uber-medium focus:border-primary outline-none transition-all shadow-inner"
                                        placeholder="Full Name"
                                    />
                                </div>
                                <div>
                                    <label className="text-[9px] font-uber-bold text-zinc-500 uppercase tracking-[0.2em] mb-3 block ml-2">Digital Comm Link</label>
                                    <input
                                        required
                                        type="email"
                                        value={formData.email}
                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                        className="w-full px-6 py-4 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-[22px] text-sm font-uber-medium focus:border-primary outline-none transition-all shadow-inner"
                                        placeholder="email@provider.com"
                                    />
                                </div>
                                <div>
                                    <label className="text-[9px] font-uber-bold text-zinc-500 uppercase tracking-[0.2em] mb-3 block ml-2">Contact Frequency</label>
                                    <input
                                        required
                                        type="text"
                                        value={formData.phone}
                                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                        className="w-full px-6 py-4 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-[22px] text-sm font-uber-medium focus:border-primary outline-none transition-all shadow-inner"
                                        placeholder="+44 0000 000000"
                                    />
                                </div>
                            </div>
                            <div className="flex gap-4 pt-4">
                                <button
                                    type="button"
                                    onClick={() => setIsModalOpen(false)}
                                    className="flex-1 py-4.5 bg-zinc-100 dark:bg-zinc-900 text-zinc-500 text-[10px] font-uber-bold uppercase tracking-widest rounded-3xl hover:text-zinc-900 dark:hover:text-white transition-all"
                                >
                                    Abort
                                </button>
                                <button
                                    type="submit"
                                    className="flex-1 py-4.5 bg-primary text-black text-[10px] font-uber-bold uppercase tracking-widest rounded-3xl hover:scale-[1.02] active:scale-95 transition-all shadow-xl shadow-primary/20"
                                >
                                    {editingPassenger ? 'Commit Identity' : 'Grant Clearance'}
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
        <div className={`p-8 bg-white dark:bg-zinc-900/50 border border-zinc-100 dark:border-zinc-800 rounded-[36px] group hover:border-zinc-300 dark:hover:border-zinc-600 transition-all text-left shadow-sm`}>
            <div className={`w-12 h-12 rounded-[20px] bg-zinc-50 dark:bg-zinc-950 border border-zinc-100 dark:border-zinc-800 flex items-center justify-center mb-6`}>
                {icon}
            </div>
            <p className={`text-3xl font-uber-bold tracking-tighter mb-1.5 ${isWarning ? 'text-rose-500' : 'text-zinc-900 dark:text-white'}`}>{value}</p>
            <p className="text-[10px] font-uber-bold text-zinc-500 uppercase tracking-[0.15em]">{title}</p>
        </div>
    );
}

function ActivityItem({ icon, text, time }: any) {
    return (
        <div className="flex gap-4 items-start">
            <div className="w-8 h-8 rounded-xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-100 dark:border-zinc-800 flex items-center justify-center text-zinc-400 shrink-0 mt-0.5">
                {icon}
            </div>
            <div className="flex-1">
                <p className="text-[11px] font-uber-bold text-zinc-700 dark:text-zinc-300 leading-snug">{text}</p>
                <p className="text-[9px] text-zinc-500 font-uber-bold uppercase tracking-widest mt-1">{time}</p>
            </div>
        </div>
    );
}
