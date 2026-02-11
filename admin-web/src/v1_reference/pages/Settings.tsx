import {
    Activity,
    Bell,
    ChevronRight,
    Copy,
    Key,
    Plus,
    RefreshCw,
    Save,
    Server,
    Settings as SettingsIcon,
    Shield,
    ToggleLeft,
    ToggleRight,
    Trash2,
    Webhook,
    Zap
} from 'lucide-react';
import { useState } from 'react';

export function Settings() {
    const [activeSection, setActiveSection] = useState('General');

    return (
        <div className="flex h-full gap-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            {/* Sidebar Navigation */}
            <aside className="w-[300px] flex flex-col gap-8 h-full">
                <div className="bg-white dark:bg-zinc-900 rounded-[40px] border border-gray-200 dark:border-zinc-800 p-8 shadow-xl flex flex-col gap-2">
                    <NavBtn icon={<SettingsIcon size={18} />} label="General" active={activeSection === 'General'} onClick={() => setActiveSection('General')} />
                    <NavBtn icon={<Zap size={18} />} label="Feature Flags" active={activeSection === 'Features'} onClick={() => setActiveSection('Features')} />
                    <NavBtn icon={<Key size={18} />} label="API Keys" active={activeSection === 'API'} onClick={() => setActiveSection('API')} />
                    <NavBtn icon={<Webhook size={18} />} label="Webhooks" active={activeSection === 'Webhooks'} onClick={() => setActiveSection('Webhooks')} />
                    <NavBtn icon={<Shield size={18} />} label="Security" active={activeSection === 'Security'} onClick={() => setActiveSection('Security')} />
                    <NavBtn icon={<Bell size={18} />} label="Notifications" active={activeSection === 'Notifications'} onClick={() => setActiveSection('Notifications')} />
                </div>

                {/* System Health Module */}
                <div className="bg-zinc-950 rounded-[40px] p-10 text-white shadow-2xl relative overflow-hidden group">
                    <div className="absolute -right-4 -bottom-4 opacity-5 group-hover:rotate-12 transition-transform duration-700">
                        <Server size={140} />
                    </div>
                    <div className="relative z-10">
                        <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 mb-8">System Pulse</h3>
                        <div className="space-y-6">
                            <HealthMetric label="API Gateway" status="Operational" color="text-primary" />
                            <HealthMetric label="Negotiation Engine" status="Scaling" color="text-amber-500" />
                            <HealthMetric label="Database Latency" status="12ms" color="text-white" />
                        </div>
                        <div className="mt-10 pt-8 border-t border-white/10">
                            <p className="text-[10px] text-gray-500 font-black uppercase tracking-widest mb-1">Engine Version</p>
                            <p className="font-mono text-xs opacity-80">v2.4.12-production</p>
                        </div>
                    </div>
                </div>
            </aside>

            {/* Main Configuration Area */}
            <main className="flex-1 bg-white dark:bg-zinc-900 rounded-[40px] border border-gray-200 dark:border-zinc-800 shadow-2xl flex flex-col overflow-hidden">
                <header className="p-10 border-b border-gray-100 dark:border-zinc-800 flex items-center justify-between">
                    <div>
                        <h2 className="text-2xl font-uber-bold dark:text-white leading-none">{activeSection} Configuration</h2>
                        <p className="text-sm text-gray-500 mt-2 font-medium">Control global platform behavior and infrastructure variables</p>
                    </div>
                    <div className="flex items-center gap-4">
                        <button className="text-[11px] font-black uppercase tracking-widest text-gray-400 hover:text-gray-900 transition-all flex items-center gap-2">
                            <RefreshCw size={14} />
                            Reset Defaults
                        </button>
                        <button className="bg-primary hover:bg-primary-dark text-black px-8 py-3.5 rounded-2xl flex items-center text-sm font-uber-bold transition-all shadow-xl shadow-primary/20 hover:scale-[1.02]">
                            <Save className="mr-2" size={18} />
                            Commit Changes
                        </button>
                    </div>
                </header>

                <div className="flex-1 overflow-y-auto p-10 custom-scrollbar">
                    {activeSection === 'General' && (
                        <div className="space-y-12 animate-in fade-in duration-500">
                            <ConfigSection title="Identity & Branding">
                                <div className="grid grid-cols-2 gap-8">
                                    <InputField label="Environment Name" value="DashDrive Production" />
                                    <InputField label="Primary Domain" value="api.dashdrive.io" />
                                </div>
                            </ConfigSection>
                            <ConfigSection title="Operational Defaults">
                                <div className="grid grid-cols-2 gap-8">
                                    <InputField label="Default Base Fare" value="$40.00 MXN" />
                                    <InputField label="Commission Rate (%)" value="10.0" />
                                </div>
                            </ConfigSection>
                        </div>
                    )}

                    {activeSection === 'Features' && (
                        <div className="grid grid-cols-2 gap-8 animate-in fade-in duration-500">
                            <FeatureToggle label="Multi-Stop Routes" description="Allow riders to add up to 3 intermediate destinations" active />
                            <FeatureToggle label="Automatic Surge" description="Enable dynamic pricing based on marketplace liquidity" active />
                            <FeatureToggle label="Driver Bidding" description="Allow drivers to counter-offer rider quotes" active />
                            <FeatureToggle label="Instant Settlements" description="Process payouts immediately after ride completion" />
                            <FeatureToggle label="Safety Shield AI" description="Real-time route monitoring for safety anomalies" active />
                            <FeatureToggle label="Promotional Nudges" description="Auto-send incentives during low demand periods" />
                        </div>
                    )}

                    {activeSection === 'API' && (
                        <div className="space-y-8 animate-in fade-in duration-500">
                            <div className="flex items-center justify-between">
                                <h3 className="text-sm font-black uppercase tracking-widest text-gray-400">Environment Keys</h3>
                                <button className="flex items-center gap-2 text-primary font-uber-bold text-xs hover:underline">
                                    <Plus size={16} /> Generate New Key
                                </button>
                            </div>
                            <div className="bg-gray-50 dark:bg-zinc-800/50 rounded-3xl border border-gray-100 dark:border-zinc-800 overflow-hidden">
                                <table className="w-full text-left font-uber">
                                    <thead className="bg-gray-100/50 dark:bg-zinc-800/50 text-[10px] font-black uppercase tracking-widest text-gray-400">
                                        <tr>
                                            <th className="px-8 py-4">Label</th>
                                            <th className="px-8 py-4">Key ID</th>
                                            <th className="px-8 py-4">Created</th>
                                            <th className="px-8 py-4 text-right">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-100 dark:divide-zinc-800">
                                        <KeyRow label="Public Web SDK" id="pk_live_*****9281" created="12 Jan 2024" />
                                        <KeyRow label="Admin Secret" id="sk_live_*****0012" created="08 Feb 2024" isSecret />
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}

                    {activeSection === 'Webhooks' && (
                        <div className="flex flex-col h-full animate-in fade-in duration-500 gap-8">
                            <div className="bg-zinc-950 rounded-3xl border border-zinc-800 flex flex-col min-h-[400px]">
                                <div className="p-6 border-b border-zinc-800 flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <Activity size={16} className="text-primary" />
                                        <span className="text-[10px] font-black uppercase tracking-widest text-gray-500">Webhook Monitoring Stream</span>
                                    </div>
                                    <div className="flex gap-2">
                                        <div className="w-2 h-2 rounded-full bg-primary" />
                                        <div className="w-2 h-2 rounded-full bg-zinc-800" />
                                    </div>
                                </div>
                                <div className="flex-1 p-6 font-mono text-[11px] space-y-4 overflow-y-auto">
                                    <WebhookLog type="POST" endpoint="/events/ride.created" code={200} time="Just now" />
                                    <WebhookLog type="POST" endpoint="/events/bid.accepted" code={201} time="2m ago" />
                                    <WebhookLog type="POST" endpoint="/events/auth.verify" code={200} time="5m ago" />
                                    <WebhookLog type="POST" endpoint="/events/payment.failed" code={402} time="12m ago" isError />
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
}

const NavBtn = ({ icon, label, active, onClick }: any) => (
    <button
        onClick={onClick}
        className={`flex items-center justify-between px-6 py-4 rounded-2xl transition-all group ${active ? 'bg-primary text-black font-uber-bold shadow-xl shadow-primary/20' : 'text-gray-500 hover:bg-gray-50 dark:hover:bg-zinc-800/50 hover:text-gray-900 dark:hover:text-white'
            }`}
    >
        <div className="flex items-center gap-4">
            {icon}
            <span className="text-sm font-uber-medium">{label}</span>
        </div>
        <ChevronRight size={14} className={active ? 'text-black' : 'text-gray-300 opacity-0 group-hover:opacity-100 transition-all'} />
    </button>
);

const HealthMetric = ({ label, status, color }: any) => (
    <div className="flex items-center justify-between">
        <span className="text-xs text-gray-500 font-medium">{label}</span>
        <span className={`text-xs font-uber-bold ${color}`}>{status}</span>
    </div>
);

const ConfigSection = ({ title, children }: any) => (
    <div className="space-y-6">
        <h3 className="text-[11px] font-black uppercase tracking-[0.2em] text-gray-400">{title}</h3>
        {children}
    </div>
);

const InputField = ({ label, value }: any) => (
    <div className="space-y-3">
        <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 block">{label}</label>
        <input
            type="text"
            defaultValue={value}
            className="w-full px-6 py-4 bg-gray-50 dark:bg-zinc-800 border-none rounded-2xl text-sm font-uber-bold focus:ring-2 focus:ring-primary/20 dark:text-white transition-all"
        />
    </div>
);

const FeatureToggle = ({ label, description, active }: any) => (
    <div className={`p-8 rounded-[32px] border transition-all flex items-start justify-between cursor-pointer group ${active ? 'border-primary/20 bg-primary/[0.02]' : 'border-gray-100 dark:border-zinc-800 bg-white dark:bg-zinc-900'
        }`}>
        <div className="space-y-2 pr-6">
            <h4 className={`text-sm font-uber-bold ${active ? 'text-primary' : 'text-gray-700 dark:text-white'}`}>{label}</h4>
            <p className="text-[11px] text-gray-500 leading-relaxed font-medium">{description}</p>
        </div>
        <button className={`mt-1 transition-colors ${active ? 'text-primary' : 'text-gray-300 dark:text-zinc-700'}`}>
            {active ? <ToggleRight size={32} /> : <ToggleLeft size={32} />}
        </button>
    </div>
);

const KeyRow = ({ label, id, created, isSecret }: any) => (
    <tr className="text-sm group hover:bg-white dark:hover:bg-zinc-700/20 transition-all">
        <td className="px-8 py-5 font-uber-bold dark:text-white">{label}</td>
        <td className="px-8 py-5 font-mono text-xs text-gray-500">{id}</td>
        <td className="px-8 py-5 text-[11px] text-gray-400 font-black uppercase">{created}</td>
        <td className="px-8 py-5 text-right">
            <div className="flex items-center justify-end gap-3">
                <button
                    onClick={() => {
                        if (isSecret) {
                            // Logic to copy masked secret
                        }
                    }}
                    className="p-2 hover:bg-gray-100 dark:hover:bg-zinc-700 rounded-xl transition-all text-gray-400 hover:text-primary"
                >
                    <Copy size={16} />
                </button>
                <button className="p-2 hover:bg-gray-100 dark:hover:bg-zinc-700 rounded-xl transition-all text-gray-400 hover:text-rose-500"><Trash2 size={16} /></button>
            </div>
        </td>
    </tr>
);

const WebhookLog = ({ type, endpoint, code, time, isError }: any) => (
    <div className="flex items-center justify-between group py-1">
        <div className="flex items-center gap-4">
            <span className="text-[10px] font-black text-blue-500">{type}</span>
            <span className="text-gray-400 font-mono">{endpoint}</span>
        </div>
        <div className="flex items-center gap-4">
            <span className={`text-[10px] font-black px-2 py-0.5 rounded ${isError ? 'bg-rose-500/10 text-rose-500' : 'bg-primary/10 text-primary'}`}>
                {code}
            </span>
            <span className="text-[10px] text-gray-600 font-mono">{time}</span>
        </div>
    </div>
);
