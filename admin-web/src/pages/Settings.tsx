import { Bell, Cpu, CreditCard, Globe, RefreshCw, Save, Settings as SettingsIcon, Shield } from 'lucide-react';
import { Header } from '../components/layout/Header';

export function Settings() {
    return (
        <div className="min-h-screen bg-black text-white flex flex-col">
            <Header title="Settings" subtitle="Global Platform Configuration & System Controls" />

            <div className="flex-1 p-8 grid grid-cols-1 lg:grid-cols-4 gap-8">

                {/* Left: Settings Navigation */}
                <aside className="lg:col-span-1 space-y-2">
                    <SettingsNavButton active icon={<SettingsIcon size={18} />} label="General Config" />
                    <SettingsNavButton icon={<Bell size={18} />} label="Notifications" />
                    <SettingsNavButton icon={<Shield size={18} />} label="Security" />
                    <SettingsNavButton icon={<Globe size={18} />} label="Regional Rules" />
                    <SettingsNavButton icon={<Cpu size={18} />} label="API Integration" />
                    <SettingsNavButton icon={<CreditCard size={18} />} label="Payments" />
                </aside>

                {/* Center: Configuration Content */}
                <div className="lg:col-span-3 space-y-8">
                    <div className="bg-zinc-900/50 border border-zinc-800 rounded-[40px] p-10 space-y-10">

                        {/* Section 1: Platform Branding */}
                        <section className="space-y-6">
                            <h3 className="text-sm font-black uppercase tracking-[0.2em] text-zinc-500">Platform Branding</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="space-y-3">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-zinc-600 block">Organization Name</label>
                                    <input type="text" defaultValue="DashDrive Logistics" className="w-full px-6 py-4 bg-black border border-zinc-800 rounded-2xl text-sm focus:border-primary outline-none transition-all font-bold" />
                                </div>
                                <div className="space-y-3">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-zinc-600 block">Support Email</label>
                                    <input type="email" defaultValue="admin@dashdrive.io" className="w-full px-6 py-4 bg-black border border-zinc-800 rounded-2xl text-sm focus:border-primary outline-none transition-all font-bold" />
                                </div>
                            </div>
                        </section>

                        <div className="h-px bg-zinc-800" />

                        {/* Section 2: Global Service Limits */}
                        <section className="space-y-6">
                            <h3 className="text-sm font-black uppercase tracking-[0.2em] text-zinc-500">Service Defaults</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <ToggleSetting label="Maintenance Mode" description="Temporarily disable all passenger requests" active={false} />
                                <ToggleSetting label="Auto-Approve Drivers" description="Bypass manual verification for new pilots" active={false} />
                                <ToggleSetting label="Debug Logging" description="Capture detailed system activity for 24h" active={true} />
                                <ToggleSetting label="Strict Policy Checks" description="Enforce zero-tolerance safety rules" active={true} />
                            </div>
                        </section>

                        <div className="h-px bg-zinc-800" />

                        {/* Actions */}
                        <footer className="flex items-center justify-between pt-4">
                            <button className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-zinc-500 hover:text-white transition-all">
                                <RefreshCw size={14} />
                                Reset to Default
                            </button>
                            <div className="flex gap-4">
                                <button className="px-8 py-4 bg-zinc-800 text-white text-[10px] font-black uppercase tracking-widest rounded-2xl hover:bg-zinc-700 transition-all">
                                    Cancel
                                </button>
                                <button className="px-8 py-4 bg-primary text-black text-[10px] font-black uppercase tracking-widest rounded-2xl shadow-xl shadow-primary/20 hover:scale-[1.02] transition-all flex items-center gap-2">
                                    <Save size={16} />
                                    Save Changes
                                </button>
                            </div>
                        </footer>
                    </div>
                </div>
            </div>
        </div>
    );
}

function SettingsNavButton({ icon, label, active = false }: any) {
    return (
        <button className={`w-full flex items-center gap-4 px-6 py-4 rounded-2xl transition-all ${active
                ? 'bg-primary text-black font-black shadow-lg shadow-primary/10'
                : 'text-zinc-500 hover:bg-zinc-900 hover:text-white'
            }`}>
            {icon}
            <span className="text-[13px] tracking-tight">{label}</span>
        </button>
    );
}

function ToggleSetting({ label, description, active }: any) {
    return (
        <div className="flex items-start justify-between gap-6 p-1">
            <div className="space-y-1">
                <p className="text-xs font-black text-white">{label}</p>
                <p className="text-[10px] text-zinc-500 leading-relaxed font-bold">{description}</p>
            </div>
            <button className={`w-10 h-5 rounded-full mt-1 shrink-0 relative transition-all ${active ? 'bg-primary shadow-[0_0_10px_#00ff90]' : 'bg-zinc-800'
                }`}>
                <div className={`absolute top-0.5 w-4 h-4 bg-black rounded-full transition-all ${active ? 'right-0.5' : 'left-0.5'
                    }`} />
            </button>
        </div>
    );
}
