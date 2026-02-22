import { Sidebar } from './Sidebar';
import { Header } from './Header';

interface LayoutProps {
    children: React.ReactNode;
    activeTab: string;
    setActiveTab: (tab: string) => void;
}

export function Layout({ children, activeTab, setActiveTab }: LayoutProps) {
    const titles: Record<string, { title: string; subtitle: string }> = {
        dashboard: { title: 'Dashboard Overview', subtitle: "Welcome back! Your grocery store's performance view" },
        orders: { title: 'Order Management', subtitle: 'Track and manage all grocery orders in real time.' },
        inventory: { title: 'Inventory Management', subtitle: 'Manage your stock and products.' },
        customers: { title: 'Customer Base', subtitle: 'Detailed view of your customers.' },
        performance: { title: 'Performance Reports & Analytics', subtitle: 'Performance metrics and insights.' },
        addProduct: { title: 'Add Product', subtitle: 'Home > Add Product' },
        financials: { title: 'Financials & Payouts', subtitle: 'Track your earnings and payout schedule.' },
        stores: { title: 'Store Management', subtitle: 'Overview of all your locations and their real-time status.' },
        'store-hours': { title: 'Trading Hours', subtitle: 'Manage standard weekly operating hours for your stores.' },
        'holiday-hours': { title: 'Holiday Exceptions', subtitle: 'Set special operating hours for holidays and events.' },
        'marketing-overview': { title: 'Marketing Dashboard', subtitle: 'Track the performance of your promotional campaigns.' },
        offers: { title: 'Offers & Discounts', subtitle: 'Create and manage active promotions for your stores.' },
    };

    const { title, subtitle } = titles[activeTab] || titles.dashboard;

    return (
        <div className="flex min-h-screen bg-background">
            <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
            <div className="flex-1 flex flex-col min-w-0">
                <Header title={title} subtitle={subtitle} />
                <main className="p-8 pb-12 overflow-y-auto">
                    {children}
                </main>
            </div>
        </div>
    );
}
