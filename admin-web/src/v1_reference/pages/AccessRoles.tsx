import { CheckCircle2, Edit2, Key, MoreVertical, Plus, Shield, Trash2, Users } from 'lucide-react';
import { Header } from '../components/layout/Header';

export function AccessRoles() {
    const roles = [
        { name: 'Global Admin', users: 3, permissions: 'All', status: 'Active' },
        { name: 'Regional Manager', users: 12, permissions: 'Regional Fleet, Pricing', status: 'Active' },
        { name: 'Safety Officer', users: 8, permissions: 'Incidents, Compliance', status: 'Active' },
        { name: 'Support Lead', users: 24, permissions: 'User Management', status: 'Active' },
    ];

    return (
        <div className="min-h-screen bg-black text-white flex flex-col">
            <Header title="Access Roles" subtitle="Administrative Permissions & Team Management" />

            <div className="flex-1 p-8 space-y-8">

                {/* Top Actions */}
                <div className="flex justify-between items-center">
                    <div className="flex items-center gap-6">
                        <div className="flex items-center gap-3">
                            <Users className="text-primary" size={20} />
                            <div>
                                <p className="text-xl font-black leading-none">47</p>
                                <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Active Admins</p>
                            </div>
                        </div>
                        <div className="w-px h-8 bg-zinc-800" />
                        <div className="flex items-center gap-3">
                            <Shield className="text-primary" size={20} />
                            <div>
                                <p className="text-xl font-black leading-none">4</p>
                                <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Defined Roles</p>
                            </div>
                        </div>
                    </div>
                    <button className="px-6 py-3 bg-primary text-black text-[10px] font-black uppercase tracking-widest rounded-2xl shadow-lg shadow-primary/20 hover:scale-[1.02] transition-all flex items-center gap-2">
                        <Plus size={16} />
                        Create New Role
                    </button>
                </div>

                {/* Roles Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {roles.map((role) => (
                        <div key={role.name} className="p-8 bg-zinc-900/50 border border-zinc-800 rounded-[40px] flex flex-col justify-between group hover:border-primary/30 transition-all">
                            <div className="space-y-6">
                                <div className="flex justify-between items-start">
                                    <div className="p-3 bg-black rounded-2xl border border-zinc-800 group-hover:scale-105 transition-transform">
                                        <Key className="text-primary" size={20} />
                                    </div>
                                    <button className="text-zinc-700 hover:text-white transition-colors">
                                        <MoreVertical size={18} />
                                    </button>
                                </div>
                                <div>
                                    <h3 className="text-lg font-black tracking-tighter mb-1">{role.name}</h3>
                                    <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-[0.2em]">{role.users} Users Attached</p>
                                </div>
                                <div className="space-y-3">
                                    <p className="text-[10px] font-black text-zinc-600 uppercase tracking-widest">Permissions</p>
                                    <p className="text-xs font-bold text-zinc-300 leading-relaxed">{role.permissions}</p>
                                </div>
                            </div>
                            <div className="pt-8 flex items-center gap-3">
                                <button className="p-2 bg-zinc-800 rounded-lg text-zinc-500 hover:text-white transition-all"><Edit2 size={14} /></button>
                                <button className="p-2 bg-zinc-800 rounded-lg text-zinc-500 hover:text-red-500 transition-all"><Trash2 size={14} /></button>
                                <div className="flex-1" />
                                <div className="flex items-center gap-1.5 px-2 py-1 bg-primary/10 rounded-lg">
                                    <CheckCircle2 size={10} className="text-primary" />
                                    <span className="text-[9px] font-black text-primary uppercase">{role.status}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Security Message */}
                <div className="p-8 bg-zinc-900/30 border border-dashed border-zinc-800 rounded-[40px] flex items-center gap-6">
                    <div className="p-4 bg-zinc-800 rounded-full">
                        <Shield className="text-zinc-500" size={32} />
                    </div>
                    <div>
                        <h4 className="text-sm font-black uppercase tracking-widest text-white">Security Recommendation</h4>
                        <p className="text-[11px] text-zinc-500 font-medium mt-1 leading-relaxed max-w-2xl">
                            We recommend enabling <span className="text-primary font-black">2FA Enforcement</span> for all roles with "Financial" or "Global Admin" permissions to ensure maximum security of the DashDrive platform.
                        </p>
                    </div>
                    <div className="flex-1" />
                    <button className="px-5 py-2.5 bg-zinc-800 text-white text-[10px] font-black uppercase tracking-widest rounded-xl hover:bg-zinc-700 transition-all">
                        Update Policy
                    </button>
                </div>
            </div>
        </div>
    );
}
