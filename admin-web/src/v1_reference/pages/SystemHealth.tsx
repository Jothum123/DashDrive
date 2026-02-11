import { Activity, Cpu, Database, Globe, RefreshCw, ShieldCheck } from 'lucide-react';
import PageBreadcrumb from '../components/common/PageBreadcrumb';

export function SystemHealth() {
    return (
        <div className="min-h-screen bg-transparent dark:text-white/90 flex flex-col">
            <PageBreadcrumb pageTitle="System Health" />

            <div className="flex-1 space-y-6">

                {/* Status Tickers */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                    <StatusCard
                        label="Main API"
                        status="Healthy"
                        uptime="99.98%"
                        latency="42ms"
                        icon={<Activity className="text-primary" size={18} />}
                    />
                    <StatusCard
                        label="Mapping Engine"
                        status="Healthy"
                        uptime="99.95%"
                        latency="15ms"
                        icon={<Globe className="text-primary" size={18} />}
                    />
                    <StatusCard
                        label="Bidding Engine"
                        status="Heavy Load"
                        uptime="99.20%"
                        latency="124ms"
                        isWarning={true}
                        icon={<Cpu className="text-warning-500" size={18} />}
                    />
                    <StatusCard
                        label="Auth Service"
                        status="Healthy"
                        uptime="100%"
                        latency="8ms"
                        icon={<ShieldCheck className="text-primary" size={18} />}
                    />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                    {/* Database Performance */}
                    <div className="lg:col-span-2 card p-6 md:p-8 space-y-8 shadow-sm">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="p-2.5 bg-gray-50 dark:bg-gray-800 rounded-xl">
                                    <Database className="text-primary" size={20} />
                                </div>
                                <h3 className="text-lg font-bold text-gray-800 dark:text-white tracking-tight">Database Performance</h3>
                            </div>
                            <button className="p-2 border border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-white/5 rounded-xl transition-all">
                                <RefreshCw size={16} className="text-gray-400" />
                            </button>
                        </div>

                        <div className="space-y-6">
                            <ResourceMetric label="CPU Utilization" value={42} />
                            <ResourceMetric label="Memory Usage" value={68} />
                            <ResourceMetric label="Active Connections" value={84} />
                            <ResourceMetric label="Read/Write IOPS" value={15} />
                        </div>
                    </div>

                    {/* Infrastructure Logs */}
                    <div className="card flex flex-col shadow-sm">
                        <div className="p-6 border-b border-gray-100 dark:border-gray-800">
                            <h3 className="text-sm font-bold uppercase tracking-widest text-gray-800 dark:text-white">System Logs</h3>
                        </div>
                        <div className="flex-1 overflow-y-auto p-6 space-y-5 max-h-[400px] no-scrollbar">
                            <LogItem type="info" message="API Scale-up: Cluster-Northeast-1 added 2 nodes" time="2m ago" />
                            <LogItem type="warning" message="High Latency detected in Bidding Engine" time="15m ago" />
                            <LogItem type="success" message="Security patch applied to Auth-DB" time="1h ago" />
                            <LogItem type="info" message="Weekly backup completed successfully" time="3h ago" />
                            <LogItem type="info" message="Log rotation executed" time="5h ago" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

function StatusCard({ label, status, uptime, latency, icon, isWarning = false }: any) {
    return (
        <div className="card p-5 space-y-4 group hover:bg-gray-50 dark:hover:bg-white/[0.04] transition-all shadow-sm">
            <div className="flex items-center justify-between">
                <div className="p-2.5 bg-gray-100 dark:bg-gray-800 rounded-xl transition-transform group-hover:scale-105">
                    {icon}
                </div>
                <div className={`badge ${isWarning ? 'badge-warning' : 'badge-success'}`}>
                    {status}
                </div>
            </div>
            <div>
                <p className="text-gray-400 text-[10px] font-bold uppercase tracking-widest mb-1">{label}</p>
                <div className="flex items-end justify-between">
                    <p className="text-xl font-bold dark:text-white">{uptime}</p>
                    <p className="text-[10px] font-bold text-gray-500 uppercase">{latency}</p>
                </div>
            </div>
        </div>
    );
}

function ResourceMetric({ label, value }: any) {
    return (
        <div className="space-y-3">
            <div className="flex justify-between items-center text-[10px] font-bold uppercase tracking-widest">
                <span className="text-gray-400">{label}</span>
                <span className={value > 80 ? 'text-error-500' : 'text-primary'}>{value}%</span>
            </div>
            <div className="h-1.5 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                <div
                    className={`h-full transition-all duration-1000 ${value > 80 ? 'bg-error-500 shadow-[0_0_8px_rgba(239,68,68,0.4)]' : 'bg-primary shadow-[0_0_8px_rgba(0,255,144,0.4)]'}`}
                    style={{ width: `${value}%` }}
                />
            </div>
        </div>
    );
}

function LogItem({ type, message, time }: any) {
    return (
        <div className="flex gap-4 group">
            <div className={`w-1.5 h-1.5 rounded-full mt-1.5 shrink-0 ${type === 'warning' ? 'bg-warning-500' : type === 'success' ? 'bg-primary' : 'bg-secondary'
                }`} />
            <div className="space-y-1">
                <p className="text-[12px] font-bold text-gray-700 dark:text-gray-300 transition-colors group-hover:text-primary leading-relaxed">{message}</p>
                <p className="text-[9px] text-gray-400 font-bold uppercase tracking-widest">{time}</p>
            </div>
        </div>
    );
}

