import {
    LayoutDashboard,
    ShoppingBag,
    Package,
    Users,
    BarChart3,
    Settings,
    HelpCircle,
    LogOut,
    Leaf,
    Wallet,
    Store,
    ChevronDown,
    ChevronRight,
    Clock,
    CalendarDays,
    Megaphone,
    Tag
} from 'lucide-react';
import { useState } from 'react';
import { cn } from '../utils/cn';

interface SidebarProps {
    activeTab: string;
    setActiveTab: (tab: string) => void;
}

interface NavItem {
    id: string;
    label: string;
    icon: any;
    subItems?: { id: string; label: string; icon: any }[];
}

const navItems: NavItem[] = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    {
        id: 'stores-group',
        label: 'Stores',
        icon: Store,
        subItems: [
            { id: 'stores', label: 'Stores', icon: Store },
            { id: 'store-hours', label: 'Store Hours', icon: Clock },
            { id: 'holiday-hours', label: 'Holiday Hours', icon: CalendarDays },
        ]
    },
    {
        id: 'marketing-group',
        label: 'Marketing',
        icon: Megaphone,
        subItems: [
            { id: 'marketing-overview', label: 'Overview', icon: Megaphone },
            { id: 'offers', label: 'Offers', icon: Tag },
        ]
    },
    { id: 'orders', label: 'Orders', icon: ShoppingBag },
    { id: 'inventory', label: 'Inventory', icon: Package },
    { id: 'customers', label: 'Customers', icon: Users },
    { id: 'performance', label: 'Performance', icon: BarChart3 },
    { id: 'financials', label: 'Financials', icon: Wallet },
];

const otherItems = [
    { id: 'settings', label: 'Settings', icon: Settings },
    { id: 'help', label: 'Help/Support', icon: HelpCircle },
    { id: 'logout', label: 'Logout', icon: LogOut },
];

export function Sidebar({ activeTab, setActiveTab }: SidebarProps) {
    const [expandedMenus, setExpandedMenus] = useState<string[]>(['stores-group', 'marketing-group']);

    const toggleMenu = (id: string) => {
        setExpandedMenus(prev =>
            prev.includes(id) ? prev.filter(m => m !== id) : [...prev, id]
        );
    };

    return (
        <aside className="w-64 bg-sidebar border-r border-gray-100 flex flex-col h-screen sticky top-0">
            <div className="p-6 flex items-center gap-2">
                <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-white">
                    <Leaf size={20} fill="currentColor" />
                </div>
                <span className="text-xl font-bold text-gray-800 tracking-tight">FreshCart</span>
            </div>

            <div className="flex-1 px-4 py-4 space-y-8 overflow-y-auto">
                <div>
                    <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4 px-2">Main</p>
                    <nav className="space-y-1">
                        {navItems.map((item) => {
                            const isExpanded = expandedMenus.includes(item.id);
                            const hasSubItems = item.subItems && item.subItems.length > 0;
                            const isActive = activeTab === item.id || (hasSubItems && item.subItems?.some(sub => sub.id === activeTab));

                            return (
                                <div key={item.id} className="space-y-1">
                                    <button
                                        onClick={() => hasSubItems ? toggleMenu(item.id) : setActiveTab(item.id)}
                                        className={cn(
                                            "w-full flex items-center justify-between px-3 py-2.5 rounded-xl transition-all duration-200 group",
                                            isActive && !hasSubItems
                                                ? "bg-emerald-50 text-primary font-medium"
                                                : "text-gray-500 hover:bg-gray-50 hover:text-gray-800"
                                        )}
                                    >
                                        <div className="flex items-center gap-3">
                                            <item.icon size={20} className={isActive ? "text-primary" : "text-gray-400 group-hover:text-gray-600"} />
                                            <span className="text-sm">{item.label}</span>
                                        </div>
                                        {hasSubItems && (
                                            isExpanded ? <ChevronDown size={14} /> : <ChevronRight size={14} />
                                        )}
                                    </button>

                                    {hasSubItems && isExpanded && (
                                        <div className="ml-9 space-y-1 mt-1 border-l border-gray-100 pl-2">
                                            {item.subItems?.map((sub) => (
                                                <button
                                                    key={sub.id}
                                                    onClick={() => setActiveTab(sub.id)}
                                                    className={cn(
                                                        "w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-all duration-200",
                                                        activeTab === sub.id
                                                            ? "text-primary font-bold shadow-sm"
                                                            : "text-gray-500 hover:text-gray-800"
                                                    )}
                                                >
                                                    {activeTab === sub.id && <div className="w-1 h-1 rounded-full bg-primary" />}
                                                    <span>{sub.label}</span>
                                                </button>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </nav>
                </div>

                <div>
                    <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4 px-2">Other</p>
                    <nav className="space-y-1">
                        {otherItems.map((item) => (
                            <button
                                key={item.id}
                                onClick={() => { }}
                                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-gray-500 hover:bg-gray-50 hover:text-gray-800 transition-all duration-200"
                            >
                                <item.icon size={20} className="text-gray-400" />
                                <span className="text-sm">{item.label}</span>
                            </button>
                        ))}
                    </nav>
                </div>
            </div>

            <div className="p-4">
                <div className="relative group overflow-hidden bg-gradient-to-br from-emerald-100/50 to-emerald-200/50 rounded-2xl p-4 border border-emerald-100">
                    <div className="absolute top-0 right-0 w-16 h-16 bg-white/20 blur-2xl rounded-full -mr-8 -mt-8" />
                    <p className="text-sm font-bold text-emerald-900 mb-1">Need Help?</p>
                    <p className="text-xs text-emerald-700/80 mb-4">Contact support team</p>
                    <button className="w-full bg-primary hover:bg-primary-hover text-white text-xs font-bold py-2.5 rounded-xl transition-colors shadow-lg shadow-emerald-200/50">
                        Get Support
                    </button>
                </div>
            </div>
        </aside>
    );
}
