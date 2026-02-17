import { Home, ClipboardList, LayoutGrid, BarChart3, Wallet, Settings, LogOut, Truck, ShoppingCart, BedSingle, Calendar, Package } from 'lucide-react';
import { cn } from '../lib/utils';
import { useMerchantContext, type ServiceType } from '../contexts/MerchantContext';

interface SidebarProps {
    activeTab: string;
    setActiveTab: (id: string) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab }) => {
    const { serviceType, setServiceType } = useMerchantContext();

    const getNavItems = () => {
        const items = [
            { icon: Home, label: 'Dashboard', id: 'dashboard' },
        ];

        if (serviceType === 'FOOD') {
            items.push({ icon: ClipboardList, label: 'Kitchen', id: 'orders' });
            items.push({ icon: LayoutGrid, label: 'Menu', id: 'menu' });
        } else if (serviceType === 'MART') {
            items.push({ icon: ShoppingCart, label: 'Pick & Pack', id: 'orders' });
            items.push({ icon: Package, label: 'SKU Inventory', id: 'menu' });
        } else if (serviceType === 'STAY') {
            items.push({ icon: Calendar, label: 'Reservations', id: 'orders' });
            items.push({ icon: BedSingle, label: 'Room List', id: 'menu' });
        }

        items.push({ icon: BarChart3, label: 'Analytics', id: 'analytics' });
        items.push({ icon: Wallet, label: 'Wallet', id: 'wallet' });
        items.push({ icon: Truck, label: 'Delivery', id: 'delivery' });

        return items;
    };

    const navItems = getNavItems();

    return (
        <aside className="w-64 h-screen bg-white border-r border-zinc-200 flex flex-col fixed left-0 top-0 z-50">
            <div className="p-8">
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-brand-green flex items-center justify-center shadow-sm">
                        <span className="text-zinc-950 font-bold text-xl">D</span>
                    </div>
                    <span className="text-xl font-bold tracking-tight text-zinc-900">DashDrive</span>
                </div>
                <div className="mt-2 ml-11 flex flex-col">
                    <p className="text-[10px] text-zinc-500 uppercase tracking-widest font-semibold">Merchant Portal</p>
                    <select
                        value={serviceType}
                        onChange={(e) => setServiceType(e.target.value as ServiceType)}
                        className="mt-1 bg-transparent text-[10px] font-bold text-brand-green uppercase focus:outline-none cursor-pointer"
                    >
                        <option value="FOOD">Food / Resto</option>
                        <option value="MART">Mart / Grocery</option>
                        <option value="STAY">Hospitality / Stay</option>
                    </select>
                </div>
            </div>

            <nav className="flex-1 px-4 py-4 space-y-2 overflow-y-auto">
                {navItems.map((item) => (
                    <button
                        key={item.id}
                        onClick={() => setActiveTab(item.id)}
                        className={cn(
                            "w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 group",
                            activeTab === item.id
                                ? "bg-brand-green text-zinc-950 active-nav-glow shadow-md shadow-brand-green/20"
                                : "text-zinc-500 hover:bg-zinc-100 hover:text-zinc-900"
                        )}
                    >
                        <item.icon size={20} className={cn(
                            "transition-transform",
                            activeTab === item.id ? "scale-110" : "group-hover:scale-110"
                        )} />
                        <span className="font-semibold">{item.label}</span>
                    </button>
                ))}
            </nav>

            <div className="p-4 border-t border-zinc-100 space-y-2">
                <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-zinc-500 hover:bg-zinc-100 hover:text-zinc-900 transition-all">
                    <Settings size={20} />
                    <span className="font-medium">Settings</span>
                </button>
                <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-zinc-500 hover:bg-red-50 hover:text-red-600 transition-all">
                    <LogOut size={20} />
                    <span className="font-medium">Logout</span>
                </button>
            </div>
        </aside>
    );
};
