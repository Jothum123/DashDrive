import {
    AlertOctagon,
    CheckCircle,
    CheckCircle2,
    Clock,
    Gavel,
    Shield,
    ShieldAlert,
    ShieldCheck
} from 'lucide-react';
import { useState } from 'react';
import { Header } from '../components/layout/Header';
import type { SafetyIncident } from '../stores/adminStore';
import { useAdminStore } from '../stores/adminStore';

const priorityColors: Record<SafetyIncident['priority'], string> = {
    low: 'bg-zinc-800 text-zinc-400 border-zinc-700',
    medium: 'bg-amber-500/10 text-amber-500 border-amber-500/20',
    high: 'bg-orange-500/10 text-orange-500 border-orange-500/20',
    critical: 'bg-red-500/10 text-red-500 border-red-500/20',
};

const statusColors: Record<SafetyIncident['status'], string> = {
    open: 'bg-primary/10 text-primary border-primary/20',
    investigating: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
    resolved: 'bg-zinc-800 text-zinc-500 border-zinc-700',
    dismissed: 'bg-zinc-900 text-zinc-600 border-zinc-800',
};

export function SafetyCompliance() {
    const { incidents, updateIncidentStatus } = useAdminStore();
    const [filter, setFilter] = useState<SafetyIncident['priority'] | 'all'>('all');

    const filteredIncidents = incidents.filter(
        (i) => filter === 'all' || i.priority === filter
    );

    return (
        <div className="min-h-screen bg-black text-white flex flex-col">
            <Header title="Safety Center" subtitle="Safety Checks & Policy Rules" />

            <div className="flex-1 p-8 grid grid-cols-1 lg:grid-cols-4 gap-8">

                {/* Safety Dashboard & Active Incidents */}
                <div className="lg:col-span-3 space-y-8">

                    {/* Safety Metrics */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                        <SafetyMetric
                            label="Critical Issues"
                            value={incidents.filter(i => i.priority === 'critical').length}
                            icon={<ShieldAlert className="text-red-500" size={20} />}
                            isAlert={true}
                        />
                        <SafetyMetric
                            label="Driver Checks"
                            value="1,452"
                            icon={<ShieldCheck className="text-primary" size={20} />}
                        />
                        <SafetyMetric
                            label="Safety Rating"
                            value="99.8%"
                            icon={<CheckCircle2 className="text-primary" size={20} />}
                        />
                        <SafetyMetric
                            label="Active Cases"
                            value={incidents.filter(i => i.status !== 'resolved').length}
                            icon={<Gavel className="text-primary" size={20} />}
                        />
                    </div>

                    {/* Incident Log Table */}
                    <div className="bg-zinc-900/50 border border-zinc-800 rounded-[40px] overflow-hidden">
                        <div className="p-8 border-b border-zinc-800 flex flex-wrap items-center justify-between gap-6 bg-zinc-900/10">
                            <h3 className="text-lg font-black tracking-tighter">Incident List</h3>

                            <div className="flex p-1 bg-black rounded-xl border border-zinc-800">
                                {['all', 'low', 'medium', 'high', 'critical'].map((p) => (
                                    <button
                                        key={p}
                                        onClick={() => setFilter(p as any)}
                                        className={`px-4 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-wider transition-all ${filter === p
                                            ? 'bg-zinc-800 text-white shadow-sm'
                                            : 'text-zinc-500 hover:text-zinc-300'
                                            }`}
                                    >
                                        {p === 'all' ? 'Universal' : p}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="overflow-x-auto no-scrollbar">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="text-zinc-500 text-[10px] font-black uppercase tracking-widest border-b border-zinc-800 bg-zinc-900/20">
                                        <th className="px-8 py-5">Type / Context</th>
                                        <th className="px-8 py-5">Priority</th>
                                        <th className="px-8 py-5">Status</th>
                                        <th className="px-8 py-5">Timestamp</th>
                                        <th className="px-8 py-5 text-right">Action</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-zinc-800/50">
                                    {filteredIncidents.map((incident) => (
                                        <tr key={incident.id} className="hover:bg-zinc-800/20 transition-all group">
                                            <td className="px-8 py-5">
                                                <div>
                                                    <p className="text-sm font-black text-white capitalize">{incident.type.replace('_', ' ')}</p>
                                                    <div className="flex items-center gap-2 mt-1">
                                                        <span className="text-[9px] font-black text-zinc-600 uppercase">P: {incident.passengerName}</span>
                                                        <span className="w-1 h-1 bg-zinc-800 rounded-full" />
                                                        <span className="text-[9px] font-black text-zinc-600 uppercase">D: {incident.driverName}</span>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-8 py-5">
                                                <span className={`px-2 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest border ${priorityColors[incident.priority]}`}>
                                                    {incident.priority}
                                                </span>
                                            </td>
                                            <td className="px-8 py-5">
                                                <span className={`px-2 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest border ${statusColors[incident.status]}`}>
                                                    {incident.status}
                                                </span>
                                            </td>
                                            <td className="px-8 py-5">
                                                <div className="flex items-center gap-2 text-zinc-500 font-bold text-[10px]">
                                                    <Clock size={12} />
                                                    {incident.date}
                                                </div>
                                            </td>
                                            <td className="px-8 py-5 text-right">
                                                <div className="flex justify-end gap-2">
                                                    {incident.status !== 'resolved' && (
                                                        <>
                                                            <button
                                                                onClick={() => updateIncidentStatus(incident.id, 'investigating')}
                                                                className="px-3 py-1.5 bg-zinc-800 text-white text-[9px] font-black uppercase tracking-widest rounded-lg hover:bg-zinc-700 transition-all"
                                                            >
                                                                Investigate
                                                            </button>
                                                            <button
                                                                onClick={() => updateIncidentStatus(incident.id, 'resolved')}
                                                                className="px-3 py-1.5 bg-primary/10 text-primary text-[9px] font-black uppercase tracking-widest rounded-lg hover:bg-primary/20 transition-all"
                                                            >
                                                                Neutralize
                                                            </button>
                                                        </>
                                                    )}
                                                    {incident.status === 'resolved' && (
                                                        <span className="flex items-center gap-1.5 text-zinc-600 font-black text-[9px] uppercase tracking-widest">
                                                            <CheckCircle size={12} />
                                                            Closed
                                                        </span>
                                                    )}
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        {filteredIncidents.length === 0 && (
                            <div className="py-20 text-center">
                                <ShieldCheck size={40} className="mx-auto text-zinc-800 mb-4" />
                                <p className="text-sm font-black text-zinc-600 uppercase tracking-widest">No safety anomalies detected</p>
                            </div>
                        )}
                    </div>
                </div>

                {/* Right Column: Policies & Quick Info */}
                <aside className="space-y-6">
                    <div className="bg-zinc-900/50 border border-zinc-800 rounded-[40px] p-8 space-y-6 text-left">
                        <div className="flex items-center gap-3">
                            <Shield className="text-primary" size={20} />
                            <h3 className="text-sm font-black uppercase tracking-widest">Company Rules</h3>
                        </div>

                        <div className="space-y-4">
                            <PolicyItem title="GDPR Compliance" status="Active" date="Updated 2d ago" />
                            <PolicyItem title="Zero Tolerance" status="Strict" date="Jan 2026" />
                            <PolicyItem title="Data Retention" status="Standard" date="Mar 2026" />
                        </div>

                        <button className="w-full py-4 bg-zinc-950 border border-zinc-800 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:border-primary/50 transition-all">
                            View All Rules
                        </button>
                    </div>

                    <div className="p-8 bg-zinc-900 border border-zinc-800 rounded-[40px] flex flex-col items-center text-center space-y-4 text-left">
                        <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-full">
                            <AlertOctagon className="text-red-500" size={32} />
                        </div>
                        <div>
                            <h4 className="text-sm font-black uppercase tracking-widest text-white">Fraud Risk Detected</h4>
                            <p className="text-[11px] text-zinc-500 font-medium mt-2 leading-relaxed">
                                Abnormal signup patterns detected in <span className="text-red-400 font-black">Zone B-4</span>. Temporary lock recommended.
                            </p>
                        </div>
                        <button className="w-full py-3 bg-red-500 text-black text-[10px] font-black uppercase tracking-widest rounded-xl hover:bg-red-600 transition-all">
                            Initiate Lockdown
                        </button>
                    </div>
                </aside>
            </div>
        </div>
    );
}

function SafetyMetric({ label, value, icon, isAlert = false }: any) {
    return (
        <div className={`p-6 bg-zinc-900/50 border border-zinc-800 rounded-[32px] group hover:border-zinc-700 transition-all overflow-hidden relative text-left`}>
            <div className={`w-10 h-10 rounded-2xl bg-black border border-zinc-800 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                {icon}
            </div>
            <p className={`text-2xl font-black tracking-tighter mb-1 leading-none ${isAlert && parseInt(value as string) > 0 ? 'text-red-500' : 'text-white'}`}>{value}</p>
            <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">{label}</p>
            {isAlert && parseInt(value as string) > 0 && (
                <div className="absolute top-0 right-0 w-1.5 h-full bg-red-500 animate-pulse" />
            )}
        </div>
    );
}

function PolicyItem({ title, status, date }: any) {
    return (
        <div className="p-4 bg-zinc-950 border border-white/5 rounded-2xl flex justify-between items-center group cursor-pointer hover:border-primary/30 transition-all">
            <div className="text-left">
                <p className="text-xs font-black text-white lowercase first-letter:uppercase tracking-tight">{title}</p>
                <p className="text-[9px] text-zinc-600 font-bold uppercase">{date}</p>
            </div>
            <span className="px-2 py-0.5 bg-zinc-900 border border-zinc-800 rounded text-[9px] font-black text-primary uppercase">{status}</span>
        </div>
    );
}
