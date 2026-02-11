import React from 'react';
import { NavLink } from 'react-router-dom';

const navItems = [
    {
        name: "Dashboard",
        icon: "dashboard",
        path: "/",
        category: "Main"
    },
    {
        name: "Live Fleet Map",
        icon: 'map',
        path: "/fleet-map",
        category: "Marketplace"
    },
    {
        name: "Live Bids",
        icon: 'gavel',
        path: "/bids",
        category: "Marketplace",
        count: 24
    },
    {
        name: "User Management",
        icon: "people",
        path: "/users",
        category: "Main"
    },
    {
        name: "Driver Verification",
        icon: "verified_user",
        path: "/verification",
        category: "Main",
        count: 12
    },
    {
        name: "Financial Hub",
        icon: "account_balance_wallet",
        path: "/finance",
        category: "Main"
    },
    {
        name: "Settings",
        icon: "settings",
        path: "/settings",
        category: "System"
    },
    {
        name: "Support",
        icon: "help_outline",
        path: "/support",
        category: "System"
    }
];

export const Sidebar: React.FC = () => {
    return (
        <aside className="w-64 bg-slate-50 dark:bg-zinc-950 border-r border-slate-200 dark:border-zinc-800 flex flex-col shrink-0">
            <div className="p-6 flex items-center gap-3">
                <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center text-black">
                    <span className="material-icons">directions_car</span>
                </div>
                <span className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">
                    DashDrive <span className="text-primary">Admin</span>
                </span>
            </div>

            <nav className="flex-1 px-4 space-y-1 mt-4 overflow-y-auto scrollbar-hide">
                {navItems.map((item, index) => (
                    <React.Fragment key={item.path}>
                        {item.category === 'System' && navItems[index - 1]?.category === 'Main' && (
                            <div className="pt-6 pb-2 text-xs font-semibold text-slate-400 uppercase tracking-wider px-4">System</div>
                        )}
                        <SidebarItem item={item} />
                    </React.Fragment>
                ))}
            </nav>

            <div className="p-4 border-t border-slate-200 dark:border-zinc-800">
                <div className="flex items-center gap-3 p-2 bg-slate-100 dark:bg-zinc-900 rounded-xl">
                    <img
                        alt="Admin Profile"
                        className="w-10 h-10 rounded-full"
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuC2nLkmJzDtvmxHxM3faxVauhk9on1NlzAbJkoJzce_XbFtVFtbT_Uw6Kxqdkq9NSuhU2FYwuc9RTh-R8td7e8srAMFncLhbKUYSIiWtIMWvyBheG2qPKbn29BpVZAOX8DbSwmrhB1NIhJwKsovcO1v6aGHVHUFt5SBVhExH3fwvu9zjbcEoyYmjnTkc_gJ7SOI0TU0VVT5-4QnucAJYv-MBsY1HRZUZ0mdN84L2lRThEMGPfIfzMXsM0daVb7ZwkV87nEGy6ZvAFsI"
                    />
                    <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold truncate text-slate-900 dark:text-white">Farai Moyo</p>
                        <p className="text-xs text-slate-500 truncate">Super Admin</p>
                    </div>
                    <button className="text-slate-400 hover:text-primary transition-colors">
                        <span className="material-icons">logout</span>
                    </button>
                </div>
            </div>
        </aside>
    );
};

const SidebarItem: React.FC<{ item: any }> = ({ item }) => {
    return (
        <NavLink
            to={item.path}
            className={({ isActive }) => `
                flex items-center gap-3 px-4 py-3 rounded-lg transition-colors
                ${isActive
                    ? 'bg-primary text-black'
                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-zinc-900'}
            `}
        >
            {({ isActive }) => (
                <>
                    <span className="material-icons text-xl">{item.icon}</span>
                    <span className="font-medium text-sm">{item.name}</span>
                    {item.count && (
                        <span className={`ml-auto text-xs font-bold px-2 py-0.5 rounded-full ${isActive ? 'bg-black/20' : 'bg-primary/20 text-primary'}`}>
                            {item.count}
                        </span>
                    )}
                </>
            )}
        </NavLink>
    );
};

export default Sidebar;
