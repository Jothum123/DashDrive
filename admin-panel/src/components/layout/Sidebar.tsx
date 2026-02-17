import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
    LayoutDashboard,
    Activity,
    Truck,
    Handshake,
    ShoppingBag,
    Key,
    Wallet,
    Users,
    ShieldAlert,
    Settings,
    ChevronLeft,
    ChevronRight,
    Search,
    UserCircle
} from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

interface NavItem {
    id: string;
    label: string;
    icon: React.ElementType;
    category: 'Insights' | 'Management' | 'System';
    badge?: number;
    highlightColor?: string;
}

const navItems: NavItem[] = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, category: 'Insights' },
    { id: 'pulse', label: 'Live Pulse', icon: Activity, category: 'Insights' },

    { id: 'fleet', label: 'Fleet Command', icon: Truck, category: 'Management', highlightColor: '#00ff90' },
    { id: 'negotiation', label: 'Negotiation Hub', icon: Handshake, category: 'Management', badge: 12 },
    { id: 'marketplace', label: 'Marketplace', icon: ShoppingBag, category: 'Management', badge: 5 },
    { id: 'hospitality', label: 'Hospitality', icon: Key, category: 'Management' },
    { id: 'fintech', label: 'Fintech Suite', icon: Wallet, category: 'Management' },
    { id: 'users', label: 'User Directory', icon: Users, category: 'Management' },

    { id: 'sentinel', label: 'Sentinel Logs', icon: ShieldAlert, category: 'System' },
    { id: 'settings', label: 'Settings', icon: Settings, category: 'System' },
];

export const Sidebar: React.FC = () => {
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [activeItem, setActiveItem] = useState('dashboard');

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
                e.preventDefault();
                // Trigger global search
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, []);

    const groups = ['Insights', 'Management', 'System'] as const;

    return (
        <motion.aside
            animate={{ width: isCollapsed ? 80 : 280 }}
            className="glass-sidebar h-screen flex flex-col relative z-50 shrink-0 border-r border-white/5 shadow-[20px_0_50px_rgba(0,0,0,0.5)]"
        >
            {/* Brand Header */}
            <div className="p-6 pb-2 flex items-center justify-between">
                {!isCollapsed && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="flex flex-col"
                    >
                        <span className="text-xl font-black tracking-tighter text-white font-display leading-none">
                            DASH<span className="text-primary">DRIVE</span>
                        </span>
                        <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-[0.3em] mt-1">SUPER ADMIN</span>
                    </motion.div>
                )}
                <button
                    onClick={() => setIsCollapsed(!isCollapsed)}
                    className="w-8 h-8 flex items-center justify-center rounded-lg bg-white/5 border border-white/10 text-zinc-400 hover:text-white transition-colors"
                >
                    {isCollapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
                </button>
            </div>

            {/* Command Palette Trigger */}
            <div className="px-4 py-4">
                <button className={cn(
                    "w-full flex items-center gap-3 px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-zinc-500 hover:text-zinc-300 transition-all group",
                    isCollapsed ? "justify-center px-0" : ""
                )}>
                    <Search size={18} className="shrink-0" />
                    {!isCollapsed && (
                        <div className="flex flex-1 items-center justify-between text-xs font-medium">
                            <span>Quick Search...</span>
                            <span className="px-1.5 py-0.5 bg-white/5 rounded border border-white/10 text-[10px] font-mono">⌘K</span>
                        </div>
                    )}
                </button>
            </div>

            {/* Navigation Groups */}
            <div className="flex-1 overflow-y-auto custom-scrollbar px-3 space-y-6 py-4">
                {groups.map((group) => (
                    <div key={group} className="space-y-1">
                        {!isCollapsed && (
                            <h3 className="px-4 text-[10px] font-bold text-zinc-600 uppercase tracking-[0.2em] mb-3">
                                {group}
                            </h3>
                        )}
                        <div className="space-y-1">
                            {navItems
                                .filter((item) => item.category === group)
                                .map((item) => (
                                    <button
                                        key={item.id}
                                        onClick={() => {
                                            setActiveItem(item.id);
                                        }}
                                        className={cn(
                                            "w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 group relative",
                                            activeItem === item.id
                                                ? "bg-white/5 text-primary"
                                                : "text-zinc-500 hover:text-zinc-300 hover:bg-white/[0.02]",
                                            isCollapsed ? "justify-center px-0" : ""
                                        )}
                                    >
                                        <item.icon
                                            size={20}
                                            className={cn(
                                                "shrink-0 transition-transform duration-300 group-hover:scale-110",
                                                activeItem === item.id ? "text-primary drop-shadow-[0_0_8px_rgba(0,255,144,0.5)]" : ""
                                            )}
                                        />
                                        {!isCollapsed && (
                                            <span className={cn(
                                                "text-sm font-medium tracking-tight",
                                                activeItem === item.id ? "text-white" : ""
                                            )}>
                                                {item.label}
                                            </span>
                                        )}

                                        {/* Badge */}
                                        {!isCollapsed && item.badge && (
                                            <span className="ml-auto px-1.5 py-0.5 bg-primary/10 text-primary text-[10px] font-black rounded-md border border-primary/20">
                                                {item.badge}
                                            </span>
                                        )}

                                        {/* Active State Glow Indicator */}
                                        {activeItem === item.id && (
                                            <motion.div
                                                layoutId="activeIndicator"
                                                className="absolute left-0 w-1 h-6 bg-primary rounded-r-full shadow-[0_0_15px_rgba(0,255,144,0.6)]"
                                            />
                                        )}
                                    </button>
                                ))}
                        </div>
                    </div>
                ))}
            </div>

            {/* Profile / Context Switcher */}
            <div className="p-4 mt-auto">
                <div className={cn(
                    "flex items-center gap-3 p-3 bg-white/5 rounded-2xl border border-white/5 group hover:border-primary/20 transition-all relative overflow-hidden",
                    isCollapsed ? "justify-center p-2" : ""
                )}>
                    <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />

                    <div className="relative shrink-0">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-zinc-700 to-zinc-900 border border-white/10 flex items-center justify-center text-zinc-400">
                            <UserCircle size={24} />
                        </div>
                        <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-primary border-2 border-zinc-950 rounded-full animate-pulse shadow-[0_0_8px_rgba(0,255,144,0.5)]"></div>
                    </div>

                    {!isCollapsed && (
                        <div className="flex-1 min-w-0">
                            <p className="text-xs font-bold truncate text-white uppercase tracking-wider">Farai Moyo</p>
                            <p className="text-[9px] text-primary font-black uppercase tracking-tighter">Super Admin</p>
                        </div>
                    )}

                    {!isCollapsed && (
                        <button className="text-zinc-500 hover:text-white transition-colors">
                            <ChevronRight size={16} />
                        </button>
                    )}

                    {/* Quick Switch Overlay Tooltip placeholder */}
                    {isCollapsed && (
                        <div className="absolute left-full ml-4 bg-zinc-900 border border-white/10 p-2 rounded-lg opacity-0 group-hover:opacity-100 pointer-events-none whitespace-nowrap z-50 transition-opacity">
                            <p className="text-xs font-bold text-white uppercase">Profile Settings</p>
                            <p className="text-[10px] text-primary font-black uppercase tracking-tighter">Switch Context</p>
                        </div>
                    )}
                </div>
            </div>
        </motion.aside>
    );
};
