import { AlertOctagon, Download, Filter, Info, Search, User } from 'lucide-react';
import { Header } from '../components/layout/Header';

export function AuditLogs() {
    const logs = [
        { id: 1, user: 'James Wilson', role: 'Global Admin', action: 'Changed Surge Multiplier to x2.4', target: 'Prices', time: '2m ago', level: 'critical' },
        { id: 2, user: 'Sarah Chen', role: 'Regional Manager', action: 'Approved 12 Driver Payouts', target: 'Money', time: '14m ago', level: 'info' },
        { id: 3, user: 'System Bot', role: 'Automated', action: 'Safety Lockdown: Zone B-4', target: 'Safety', time: '1h ago', level: 'warning' },
        { id: 4, user: 'Emma Parker', role: 'Safety Officer', action: 'Resolved Incident #84210', target: 'Safety', time: '2h ago', level: 'info' },
        { id: 5, user: 'James Wilson', role: 'Global Admin', action: 'Updated System Policy Rules', target: 'Rules', time: '4h ago', level: 'warning' },
    ];

    return (
        <div className="min-h-screen bg-black text-white flex flex-col">
            <Header title="Daily Logs" subtitle="Audit Trail & Administrative Activity History" />

            <div className="flex-1 p-8 space-y-8">

                {/* Search & Filters */}
                <div className="flex flex-wrap items-center justify-between gap-4">
                    <div className="flex flex-1 items-center gap-4 max-w-2xl">
                        <div className="relative flex-1">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500" size={18} />
                            <input
                                type="text"
                                placeholder="Search logs by user, action or target..."
                                className="w-full pl-12 pr-4 py-3 bg-zinc-900/50 border border-zinc-800 rounded-2xl text-sm focus:border-primary outline-none transition-all"
                            />
                        </div>
                        <button className="px-5 py-3 bg-zinc-900 border border-zinc-800 rounded-2xl text-[10px] font-black uppercase tracking-widest flex items-center gap-2 hover:bg-zinc-800 transition-all">
                            <Filter size={14} className="text-primary" />
                            Filter
                        </button>
                    </div>
                    <button className="px-6 py-3 bg-zinc-800 text-white text-[10px] font-black uppercase tracking-widest rounded-2xl flex items-center gap-2 hover:bg-zinc-700 transition-all">
                        <Download size={16} className="text-primary" />
                        Export Log CSV
                    </button>
                </div>

                {/* Logs Table */}
                <div className="bg-zinc-900/50 border border-zinc-800 rounded-[40px] overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead>
                                <tr className="text-zinc-500 text-[10px] font-black uppercase tracking-widest border-b border-zinc-800 bg-zinc-900/20">
                                    <th className="px-8 py-6 font-black">User / Role</th>
                                    <th className="px-8 py-6 font-black">Action Performed</th>
                                    <th className="px-8 py-6 font-black">Target Hub</th>
                                    <th className="px-8 py-6 font-black">Level</th>
                                    <th className="px-8 py-6 font-black text-right">Time</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-zinc-800/50 text-sm">
                                {logs.map((log) => (
                                    <tr key={log.id} className="hover:bg-zinc-800/20 transition-all group">
                                        <td className="px-8 py-6">
                                            <div className="flex items-center gap-3">
                                                <div className="w-9 h-9 rounded-xl bg-zinc-800 flex items-center justify-center border border-white/5">
                                                    <User size={16} className="text-zinc-500" />
                                                </div>
                                                <div>
                                                    <p className="font-black text-white leading-tight">{log.user}</p>
                                                    <p className="text-[10px] text-zinc-600 font-bold uppercase tracking-tighter">{log.role}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-8 py-6 font-bold text-zinc-300">{log.action}</td>
                                        <td className="px-8 py-6">
                                            <span className="px-2 py-1 bg-zinc-800 border border-zinc-700 rounded-lg text-zinc-500 text-[10px] font-black uppercase">
                                                {log.target}
                                            </span>
                                        </td>
                                        <td className="px-8 py-6">
                                            <div className="flex items-center gap-2">
                                                {log.level === 'critical' ? (
                                                    <AlertOctagon size={14} className="text-red-500" />
                                                ) : (
                                                    <Info size={14} className={log.level === 'warning' ? 'text-orange-500' : 'text-primary'} />
                                                )}
                                                <span className={`text-[10px] font-black uppercase tracking-widest ${log.level === 'critical' ? 'text-red-500' :
                                                        log.level === 'warning' ? 'text-orange-500' : 'text-primary'
                                                    }`}>
                                                    {log.level}
                                                </span>
                                            </div>
                                        </td>
                                        <td className="px-8 py-6 text-right text-zinc-600 font-black text-xs">{log.time}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Pagination (Simplified) */}
                <div className="flex justify-center items-center gap-4">
                    <button className="p-3 bg-zinc-900 border border-zinc-800 rounded-2xl text-zinc-500 hover:text-white transition-all disabled:opacity-20 cursor-not-allowed" disabled>Prev</button>
                    <span className="text-xs font-black text-zinc-500">Page 1 of 42</span>
                    <button className="p-3 bg-zinc-900 border border-zinc-800 rounded-2xl text-zinc-500 hover:text-white transition-all">Next</button>
                </div>
            </div>
        </div>
    );
}
