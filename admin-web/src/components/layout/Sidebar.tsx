import {
    Activity,
    AlertOctagon,
    Award,
    BarChart3,
    Car,
    ChevronLeft,
    ChevronRight,
    FileText,
    Globe,
    History,
    Key,
    LayoutDashboard,
    LogOut,
    Megaphone,
    MessageSquare,
    PieChart,
    Settings,
    ShieldCheck,
    Star,
    TrendingUp,
    Users,
    Wallet,
    Zap
} from 'lucide-react';
import { NavLink } from 'react-router-dom';
import { useAuthStore } from '../../stores/authStore';

const navGroups = [
    {
        label: 'Operations',
        items: [
            { path: '/', icon: LayoutDashboard, label: 'Dashboard' },
            { path: '/network', icon: Globe, label: 'Live Network' },
            { path: '/rides', icon: History, label: 'Ride Oversight' },
            { path: '/strategy', icon: TrendingUp, label: 'Pricing Strategy' },
            { path: '/support', icon: MessageSquare, label: 'Support Desk' },
            { path: '/health', icon: Activity, label: 'System Health' },
        ]
    },
    {
        label: 'Prices & Bidding',
        items: [
            { path: '/surge', icon: Zap, label: 'Price Surge' },
            { path: '/analytics', icon: BarChart3, label: 'Price Insights' },
        ]
    },
    {
        label: 'Drivers & Vehicles',
        items: [
            { path: '/drivers', icon: Users, label: 'Pilot Registry' },
            { path: '/vehicles', icon: Car, label: 'Service Matrix' },
            { path: '/performance', icon: Award, label: 'Fleet Performance' },
        ]
    },
    {
        label: 'User Matrix',
        items: [
            { path: '/passengers', icon: Users, label: 'User Center' },
            { path: '/corporate', icon: Globe, label: 'Corporate Accounts' },
            { path: '/reviews', icon: Star, label: 'Review Analytics' },
        ]
    },
    {
        label: 'Safety & Rules',
        items: [
            { path: '/safety', icon: ShieldCheck, label: 'Safety Center' },
            { path: '/documents', icon: FileText, label: 'Document Matrix' },
            { path: '/compliance', icon: AlertOctagon, label: 'Policy Rules' },
            { path: '/rules', icon: Settings, label: 'System Rules' },
        ]
    },
    {
        label: 'Money & Growth',
        items: [
            { path: '/financials', icon: Wallet, label: 'Money' },
            { path: '/payouts', icon: PieChart, label: 'Payouts' },
            { path: '/promotions', icon: Megaphone, label: 'Promotions' },
            { path: '/growth', icon: TrendingUp, label: 'Growth' },
        ]
    },
    {
        label: 'System Settings',
        items: [
            { path: '/roles', icon: Key, label: 'Access Roles' },
            { path: '/audit', icon: History, label: 'Daily Logs' },
            { path: '/settings', icon: Settings, label: 'Settings' },
        ]
    }
];

interface SidebarProps {
    collapsed: boolean;
    onToggle: () => void;
}

export function Sidebar({ collapsed, onToggle }: SidebarProps) {
    const { user, logout } = useAuthStore();

    return (
        <aside
            className={`fixed left-0 top-0 h-screen bg-black border-r border-zinc-900 transition-all duration-300 z-50 flex flex-col ${collapsed ? 'w-20' : 'w-72'
                }`}
        >
            {/* Brand Logo */}
            <div className={`p-8 flex items-center gap-4 transition-all duration-300 ${collapsed ? 'px-4' : ''}`}>
                <div className="w-12 h-12 rounded-2xl bg-primary flex items-center justify-center shrink-0 shadow-lg shadow-primary/20 transition-all duration-500 hover:rotate-[360deg]">
                    <Zap className="text-black" size={24} strokeWidth={2.5} />
                </div>
                {!collapsed && (
                    <div className="overflow-hidden whitespace-nowrap text-left">
                        <h1 className="text-xl font-black text-white tracking-tighter hover:text-primary transition-colors cursor-default">DashDrive</h1>
                        <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-[0.2em] opacity-80">
                            Command Console
                        </p>
                    </div>
                )}
            </div>

            {/* Navigation Groups */}
            <nav className="flex-1 px-4 py-4 overflow-y-auto space-y-8 no-scrollbar scroll-smooth">
                {navGroups.map((group) => (
                    <div key={group.label} className="space-y-1.5">
                        {!collapsed && (
                            <h3 className="px-4 text-[10px] font-black text-zinc-600 uppercase tracking-[0.3em] mb-3">
                                {group.label}
                            </h3>
                        )}
                        {group.items.map((item) => (
                            <NavLink
                                key={item.path}
                                to={item.path}
                                title={collapsed ? item.label : undefined}
                                className={({ isActive }) =>
                                    `group flex items-center gap-4 px-4 py-3.5 rounded-2xl transition-all duration-300 ${isActive
                                        ? 'bg-primary text-black font-bold shadow-[0_0_30px_rgba(0,255,144,0.1)]'
                                        : 'text-zinc-500 hover:bg-zinc-900/80 hover:text-white'
                                    }`
                                }
                            >
                                <item.icon
                                    size={18}
                                    className={`shrink-0 transition-all duration-300 ${collapsed ? 'mx-auto' : ''}`}
                                    strokeWidth={2}
                                />
                                {!collapsed && (
                                    <span className="text-[13px] font-bold tracking-tight overflow-hidden whitespace-nowrap">
                                        {item.label}
                                    </span>
                                )}
                            </NavLink>
                        ))}
                    </div>
                ))}
            </nav>

            {/* User Section */}
            <div className="p-4 bg-zinc-950/20">
                {!collapsed && user && (
                    <div className="flex items-center gap-3 px-4 py-5 mb-4 bg-zinc-900/30 rounded-3xl border border-white/5 shadow-sm">
                        <div className="w-11 h-11 rounded-2xl bg-zinc-800 flex items-center justify-center border border-white/5 transition-transform hover:scale-105">
                            <span className="text-primary font-black text-lg">{user.name.charAt(0)}</span>
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-xs font-black text-white truncate tracking-wide">{user.name}</p>
                            <div className="flex items-center gap-1.5">
                                <div className="w-1 h-1 rounded-full bg-primary animate-pulse" />
                                <p className="text-[9px] text-zinc-500 uppercase tracking-widest font-black leading-none">{user.role.replace('_', ' ')}</p>
                            </div>
                        </div>
                    </div>
                )}

                <button
                    onClick={logout}
                    className={`group flex items-center gap-4 px-4 py-4 rounded-2xl text-zinc-500 hover:bg-red-500/10 hover:text-red-500 transition-all duration-300 w-full ${collapsed ? 'justify-center' : ''
                        }`}
                >
                    <LogOut size={22} className="group-hover:-translate-x-1 transition-transform" />
                    {!collapsed && <span className="text-xs font-black uppercase tracking-widest">Sign Out</span>}
                </button>
            </div>

            {/* Collapse Toggle */}
            <button
                onClick={onToggle}
                className="absolute -right-3 top-24 w-7 h-7 bg-zinc-900 text-zinc-400 border border-zinc-800 rounded-full flex items-center justify-center hover:bg-primary hover:text-black transition-all duration-300 shadow-xl focus:outline-none z-50 group"
            >
                {collapsed ? (
                    <ChevronRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
                ) : (
                    <ChevronLeft size={14} className="group-hover:-translate-x-0.5 transition-transform" />
                )}
            </button>
        </aside>
    );
}
