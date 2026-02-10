import { Bell, Search, Settings } from 'lucide-react';
import { useAuthStore } from '../../stores/authStore';

interface HeaderProps {
    title: string;
    subtitle?: string;
    actions?: React.ReactNode;
}

export function Header({ title, subtitle, actions }: HeaderProps) {
    const { user } = useAuthStore();

    return (
        <header className="sticky top-0 z-40 w-full px-8 py-6 flex items-center justify-between bg-black/60 backdrop-blur-xl border-b border-zinc-800/50">
            <div>
                <h2 className="text-2xl font-black text-white tracking-tight">{title}</h2>
                {subtitle && <p className="text-xs font-medium text-zinc-500 mt-1 uppercase tracking-widest">{subtitle}</p>}
            </div>

            <div className="flex items-center gap-6">
                {/* Page Specific Actions */}
                {actions && (
                    <div className="flex items-center gap-3 pr-6 border-r border-zinc-800">
                        {actions}
                    </div>
                )}

                {/* Search */}
                <div className="relative group hidden lg:block">
                    <Search
                        size={18}
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500 group-focus-within:text-primary transition-colors"
                    />
                    <input
                        type="text"
                        placeholder="Search diagnostics..."
                        className="w-80 pl-12 pr-4 py-2.5 bg-zinc-900/50 border border-zinc-800 rounded-2xl text-sm text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/40 transition-all"
                    />
                </div>

                {/* Global Actions */}
                <div className="flex items-center gap-2 border-l border-zinc-800 pl-6">
                    <button className="p-2.5 rounded-xl text-zinc-400 hover:bg-zinc-800 hover:text-white transition-all">
                        <Bell size={20} />
                    </button>
                    <button className="p-2.5 rounded-xl text-zinc-400 hover:bg-zinc-800 hover:text-white transition-all">
                        <Settings size={20} />
                    </button>

                    <div className="ml-2 flex items-center gap-3 pl-4 border-l border-zinc-800/50">
                        <div className="text-right hidden sm:block">
                            <p className="text-sm font-bold text-white">{user?.name}</p>
                            <p className="text-[10px] font-bold text-primary uppercase tracking-tighter">Verified Access</p>
                        </div>
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-zinc-800 to-black border border-white/5 flex items-center justify-center overflow-hidden">
                            <img
                                src={`https://api.dicebear.com/7.x/shapes/svg?seed=${user?.name}`}
                                alt="Avatar"
                                className="w-full h-full object-cover opacity-80"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
}
