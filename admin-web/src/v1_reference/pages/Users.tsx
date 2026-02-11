import {
    AlertCircle,
    Bell,
    Car,
    CheckCircle2,
    ChevronDown,
    ChevronLeft,
    ChevronRight,
    Eye,
    FileText,
    Filter,
    Fingerprint,
    MessageSquare,
    MoreVertical,
    Plus,
    Search,
    ShieldCheck,
    UserCheck,
    Users as UsersIcon,
    XCircle
} from 'lucide-react';
import React, { useState } from 'react';

const users = [
    { id: '1', name: 'Johnathan Doe', email: 'john.doe@example.com', type: 'Driver', date: 'Oct 12, 2023', status: 'PENDING', img: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=100&auto=format&fit=crop' },
    { id: '2', name: 'Sarah Jenkins', email: 'sarah.j@gmail.com', type: 'Rider', date: 'Nov 04, 2023', status: 'VERIFIED', img: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=100&auto=format&fit=crop' },
    { id: '3', name: 'Marcus Thompson', email: 'm.thompson@web.com', type: 'Driver', date: 'Jan 15, 2024', status: 'SUSPENDED', img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=100&auto=format&fit=crop' },
    { id: '4', name: 'Elena Rodriguez', email: 'elena.rod@outlook.com', type: 'Driver', date: 'Feb 02, 2024', status: 'VERIFIED', img: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=100&auto=format&fit=crop' },
    { id: '5', name: 'Kevin Smith', email: 'kevin.smith@provider.net', type: 'Driver', date: 'Feb 11, 2024', status: 'REJECTED', img: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?q=80&w=100&auto=format&fit=crop' },
];

export const Users: React.FC = () => {
    const [selectedUser, setSelectedUser] = useState(users[0]);

    return (
        <div className="flex h-[calc(100vh-100px)] -m-10 bg-[#0a0f18] text-white overflow-hidden font-uber">
            {/* Sidebar Branding (Mini) */}
            <div className="w-[80px] border-r border-white/5 flex flex-col items-center py-10 gap-10 bg-[#0a0f18] z-20">
                <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center shadow-2xl shadow-blue-600/30">
                    <UsersIcon className="text-white" size={24} />
                </div>
                <div className="flex flex-col gap-8 text-gray-500">
                    <UserCheck size={24} className="text-blue-500" />
                    <ClockIcon size={24} className="cursor-pointer hover:text-white transition-colors" />
                    <ShieldCheck size={24} className="cursor-pointer hover:text-white transition-colors" />
                    <MessageSquare size={24} className="cursor-pointer hover:text-white transition-colors" />
                </div>
                <div className="mt-auto flex flex-col items-center gap-6">
                    <SettingsIcon size={24} className="text-gray-600" />
                    <div className="w-10 h-10 rounded-full bg-blue-600/20 flex items-center justify-center border border-blue-500/20">
                        <UserCheck size={20} className="text-blue-500" />
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 flex flex-col overflow-hidden bg-[#0d131f]">
                {/* Header */}
                <header className="h-24 px-10 border-b border-white/5 flex items-center justify-between bg-[#0a0f18]">
                    <div>
                        <h1 className="text-2xl font-bold tracking-tight">User Management</h1>
                        <p className="text-xs text-gray-500 font-medium mt-1">Manage and verify platform participants</p>
                    </div>

                    <div className="flex items-center gap-8">
                        <button className="relative p-2.5 bg-white/5 rounded-xl text-gray-400 hover:text-white hover:bg-white/10 transition-all">
                            <Bell size={20} />
                            <span className="absolute top-2 right-2 w-2 h-2 bg-rose-500 rounded-full border-2 border-[#0a0f18]" />
                        </button>
                        <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-2xl flex items-center gap-3 font-bold text-xs shadow-2xl shadow-blue-600/20 transition-all active:scale-95">
                            <Plus size={18} /> Register User
                        </button>
                    </div>
                </header>

                <div className="flex-1 overflow-y-auto p-12 space-y-12 custom-scrollbar">
                    {/* Top Stats Cards */}
                    <div className="grid grid-cols-4 gap-8">
                        <UserStatCard title="Total Users" value="12,845" trend="+12%" icon={<UsersIcon size={20} />} />
                        <UserStatCard title="Pending Verifications" value="42" icon={<ShieldCheck size={20} />} active={true} />
                        <UserStatCard title="Active Drivers" value="3,201" icon={<Car size={20} />} />
                        <UserStatCard title="Suspended Accounts" value="18" icon={<AlertCircle size={20} />} />
                    </div>

                    {/* Filter & Table Section */}
                    <div className="bg-[#0a0f18] rounded-[40px] border border-white/5 overflow-hidden shadow-2xl">
                        <div className="p-10 flex items-center gap-6">
                            <div className="flex-1 relative group">
                                <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-blue-500 transition-colors" size={18} />
                                <input
                                    type="text"
                                    placeholder="Search by name, email or phone..."
                                    className="w-full bg-white/5 border border-transparent focus:border-blue-500/30 rounded-2xl py-4 pl-16 pr-6 text-sm outline-none transition-all placeholder:text-gray-600 font-medium"
                                />
                            </div>
                            <div className="flex gap-4">
                                <Dropdown label="All User Types" />
                                <Dropdown label="All Statuses" />
                                <button className="flex items-center gap-3 px-6 py-4 bg-white/5 rounded-2xl border border-white/5 text-xs font-bold text-gray-400 hover:text-white transition-all">
                                    <Filter size={16} /> More Filters
                                </button>
                            </div>
                        </div>

                        <div className="overflow-x-auto">
                            <table className="w-full text-left">
                                <thead className="bg-[#0d131f]/50 text-[10px] font-black text-gray-500 uppercase tracking-widest">
                                    <tr>
                                        <th className="px-10 py-6">User Details</th>
                                        <th className="px-10 py-6">Account Type</th>
                                        <th className="px-10 py-6">Joined Date</th>
                                        <th className="px-10 py-6">Verification Status</th>
                                        <th className="px-10 py-6 text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-white/5 text-sm">
                                    {users.map(user => (
                                        <UserRow
                                            key={user.id}
                                            user={user}
                                            isSelected={selectedUser.id === user.id}
                                            onClick={() => setSelectedUser(user)}
                                        />
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        <div className="p-8 border-t border-white/5 flex items-center justify-between">
                            <span className="text-xs text-gray-500 font-medium tracking-tight">Showing 1 to 5 of 12,845 users</span>
                            <div className="flex items-center gap-4">
                                <button className="p-2 text-gray-600 hover:text-white"><ChevronLeft size={20} /></button>
                                <div className="flex gap-2">
                                    <button className="w-8 h-8 rounded-lg bg-blue-600 text-white text-xs font-bold">1</button>
                                    <button className="w-8 h-8 rounded-lg bg-white/5 text-gray-500 text-xs font-bold hover:bg-white/10">2</button>
                                    <button className="w-8 h-8 rounded-lg bg-white/5 text-gray-500 text-xs font-bold hover:bg-white/10">3</button>
                                    <span className="text-gray-600">...</span>
                                    <button className="w-8 h-8 rounded-lg bg-white/5 text-gray-500 text-xs font-bold hover:bg-white/10">428</button>
                                </div>
                                <button className="p-2 text-gray-600 hover:text-white"><ChevronRight size={20} /></button>
                            </div>
                        </div>
                    </div>

                    {/* Verification Queue Preview (Bottom Row) */}
                    <div className="grid grid-cols-12 gap-10">
                        <div className="col-span-8 bg-[#0a0f18] rounded-[40px] border border-white/5 p-10 flex flex-col shadow-2xl">
                            <div className="flex items-center justify-between mb-10">
                                <div className="flex items-center gap-4">
                                    <FileText className="text-blue-500" size={24} />
                                    <h3 className="text-xl font-bold tracking-tight">Verification Queue: {selectedUser.name}</h3>
                                </div>
                                <div className="flex gap-4">
                                    <button className="px-8 py-3 bg-rose-500 text-white rounded-xl font-bold text-xs uppercase tracking-widest hover:bg-rose-600 transition-all">Reject All</button>
                                    <button className="px-8 py-3 bg-blue-600 text-white rounded-xl font-bold text-xs uppercase tracking-widest hover:bg-blue-700 transition-all">Approve All</button>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-8">
                                <VerifCard label="ID CARD (FRONT)" icon={<Fingerprint size={32} />} filename="National_ID_Front.jpg" />
                                <VerifCard label="DRIVING LICENSE" icon={<FileText size={32} />} filename="License_Exp_2026.png" />
                            </div>
                        </div>

                        <div className="col-span-4 bg-[#0a0f18] rounded-[40px] border border-white/5 p-10 flex flex-col shadow-2xl">
                            <div className="flex items-center gap-4 mb-8">
                                <ClockIcon className="text-blue-500" size={20} />
                                <h3 className="text-xl font-bold tracking-tight">Verification Notes</h3>
                            </div>
                            <div className="flex-1 space-y-6">
                                <VerificationNote
                                    author="System Bot"
                                    time="2 hours ago"
                                    content="Automated face-matching score: 94%. All biometric checks passed."
                                    type="success"
                                />
                                <VerificationNote
                                    author="System Bot"
                                    time="2 hours ago"
                                    content="Warning: Driving license is expiring in 4 months. Recommend manual review."
                                    type="warning"
                                />
                            </div>
                            <div className="mt-8 space-y-4">
                                <textarea
                                    placeholder="Add a private note for other admins..."
                                    className="w-full h-32 bg-[#0d131f] border border-white/5 rounded-2xl p-4 text-xs italic focus:outline-none focus:border-blue-500/30 transition-all resize-none font-medium"
                                />
                                <button className="w-full bg-white/10 hover:bg-white/20 text-white py-4 rounded-xl font-bold text-xs uppercase tracking-widest transition-all">Post Note</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const UserStatCard = ({ title, value, trend, icon, active }: any) => (
    <div className={`p-10 rounded-[35px] border border-white/5 bg-[#0a0f18] shadow-2xl group transition-all ${active ? 'bg-gradient-to-br from-blue-600/10 to-transparent border-blue-500/20' : 'hover:border-blue-500/20'}`}>
        <div className="flex items-center justify-between mb-8">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${active ? 'bg-blue-600 text-white' : 'bg-blue-600/10 text-blue-500 group-hover:bg-blue-500 group-hover:text-white transition-all'}`}>
                {icon}
            </div>
            {trend && <span className="text-[10px] font-black text-emerald-500 bg-emerald-500/10 px-2 py-0.5 rounded-lg tracking-widest">{trend}</span>}
            {active && !trend && <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />}
        </div>
        <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest block mb-1">{title}</span>
        <span className="text-3xl font-bold tracking-tight">{value}</span>
    </div>
);

const UserRow = ({ user, isSelected, onClick }: any) => (
    <tr
        onClick={onClick}
        className={`group transition-all cursor-pointer ${isSelected ? 'bg-blue-600/5' : 'hover:bg-white/[0.02]'}`}
    >
        <td className="px-10 py-6">
            <div className="flex items-center gap-4">
                <img src={user.img} className="w-10 h-10 rounded-full border border-white/5 object-cover" alt="" />
                <div>
                    <span className="text-sm font-bold block">{user.name}</span>
                    <span className="text-[11px] text-gray-500 font-medium">{user.email}</span>
                </div>
            </div>
        </td>
        <td className="px-10 py-6">
            <div className="flex items-center gap-3 px-4 py-2 bg-white/5 rounded-xl border border-white/5 w-fit">
                {user.type === 'Driver' ? <Car size={14} className="text-gray-500" /> : <UsersIcon size={14} className="text-gray-500" />}
                <span className="text-xs font-bold text-gray-400">{user.type}</span>
            </div>
        </td>
        <td className="px-10 py-6 text-xs font-medium text-gray-400">{user.date}</td>
        <td className="px-10 py-6">
            <span className={`text-[10px] font-black px-4 py-1.5 rounded-lg tracking-widest uppercase ${user.status === 'VERIFIED' ? 'bg-emerald-500/10 text-emerald-500' :
                    user.status === 'PENDING' ? 'bg-amber-500/10 text-amber-500' :
                        user.status === 'SUSPENDED' ? 'bg-rose-500/20 text-rose-500' :
                            'bg-zinc-800 text-gray-500'
                }`}>
                {user.status}
            </span>
        </td>
        <td className="px-10 py-6 text-right">
            <div className="flex items-center justify-end gap-6 text-gray-500 group-hover:text-blue-500 transition-colors">
                <FileText size={18} className="cursor-pointer hover:text-white" />
                <Eye size={18} className="cursor-pointer hover:text-white" />
                <MoreVertical size={18} className="cursor-pointer hover:text-white transition-colors" />
            </div>
        </td>
    </tr>
);

const Dropdown = ({ label }: { label: string }) => (
    <div className="px-6 py-4 bg-white/5 border border-white/5 rounded-2xl flex items-center gap-4 text-xs font-bold text-gray-400 cursor-pointer hover:text-white hover:border-blue-500/20 transition-all">
        <span>{label}</span>
        <ChevronDown size={16} className="text-gray-600" />
    </div>
);

const VerifCard = ({ label, icon, filename }: any) => (
    <div className="space-y-4">
        <div className="flex items-center justify-between">
            <span className="text-[9px] font-black text-gray-600 uppercase tracking-widest">{label}</span>
        </div>
        <div className="aspect-[4/3] bg-[#0d131f] border border-white/5 rounded-[30px] flex items-center justify-center p-12 group cursor-pointer hover:border-blue-500/20 transition-all">
            <div className="text-gray-700 group-hover:text-blue-500 transition-all">
                {icon}
            </div>
        </div>
        <div className="flex items-center justify-between px-6 py-3 bg-[#0d131f] rounded-2xl border border-white/5">
            <span className="text-[10px] font-medium text-gray-500">{filename}</span>
            <div className="flex gap-2">
                <CheckCircle2 size={16} className="text-emerald-500" />
                <XCircle size={16} className="text-rose-500/30 hover:text-rose-500 transition-colors" />
            </div>
        </div>
    </div>
);

const VerificationNote = ({ author, time, content, type }: any) => (
    <div className="relative pl-6 border-l-2" style={{ borderColor: type === 'success' ? '#10b981' : '#f59e0b' }}>
        <div className="flex items-center gap-2 mb-2">
            <span className="text-[10px] font-bold text-white">{author}</span>
            <span className="text-[10px] text-gray-600 font-medium tracking-tight">• {time}</span>
        </div>
        <p className="text-xs text-gray-400 font-medium leading-relaxed">{content}</p>
    </div>
);

const SettingsIcon = ({ size, className }: any) => (
    <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={className}
    >
        <circle cx="12" cy="12" r="3" />
        <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
    </svg>
);

const ClockIcon = ({ size, className }: any) => (
    <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={className}
    >
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 6 12 12 16 14" />
    </svg>
);

export default Users;
