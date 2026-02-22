import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  Map, 
  Car, 
  MapPin, 
  Navigation, 
  Package, 
  Image as ImageIcon, 
  Ticket, 
  Percent, 
  Bell,
  Rocket,
  Utensils,
  ShoppingBag,
  ShoppingCart,
  CreditCard,
  Users,
  UserCheck,
  ShieldCheck,
  UserPlus,
  Briefcase,
  Wallet,
  Send,
  AlertCircle,
  FileText,
  Mail,
  Settings,
  List,
  ClipboardList,
  PlusCircle,
  DollarSign,
  BarChart,
  PieChart,
  Activity,
  PenTool,
  FileCode,
  Image,
  MessageSquare,
  Building,
  Sliders,
  Lock,
  Settings2,
  ChevronDown,
  ChevronRight,
  BarChart3
} from 'lucide-react';
import { cn } from '../utils';

interface SidebarItem {
  icon: any;
  label: string;
  subItems?: string[];
}

interface SidebarGroup {
  title: string;
  items: SidebarItem[];
}

const sidebarGroups: SidebarGroup[] = [
  {
    title: 'MAIN DASHBOARD',
    items: [
      { icon: LayoutDashboard, label: 'Dashboard' },
      { icon: Map, label: 'Heat Map' },
      { icon: Car, label: 'Fleet View' },
      { icon: BarChart3, label: 'Analytics' },
    ]
  },
  {
    title: 'SERVICES',
    items: [
      {
        icon: Rocket,
        label: 'Ride Hailing',
        subItems: ['Trips', 'Ride Requests', 'Drivers', 'Fare Setup', 'Surge Pricing']
      },
      {
        icon: Utensils,
        label: 'Food Delivery',
        subItems: ['Orders', 'Restaurants', 'Menu Management', 'Delivery Zones', 'Promotions']
      },
      {
        icon: ShoppingBag,
        label: 'Mart Delivery',
        subItems: ['Mart Orders', 'Stores', 'Products / Inventory', 'Categories', 'Delivery Fees']
      },
      {
        icon: ShoppingCart,
        label: 'Shopping',
        subItems: ['Products', 'Categories', 'Orders', 'Vendors / Merchants', 'Reviews & Ratings']
      },
      {
        icon: Package,
        label: 'Parcel Delivery',
        subItems: ['Parcel Orders', 'Parcel Categories', 'Parcel Weights', 'Parcel Attributes', 'Refund Requests']
      },
      {
        icon: CreditCard,
        label: 'Payments & Fintech',
        subItems: ['Transactions', 'Customer Wallet', 'Driver Wallet', 'Withdraw Requests', 'Cashless Payments', 'Pay Bills', 'PayLater', 'Donations', 'Payment Reports']
      }
    ]
  },
  {
    title: 'USER MANAGEMENT',
    items: [
      { icon: Users, label: 'Customers' },
      { icon: UserCheck, label: 'Drivers' },
      { icon: ShieldCheck, label: 'Driver Level Setup' },
      { icon: UserPlus, label: 'Customer Level Setup' },
      { icon: Briefcase, label: 'Employees' },
      { icon: Wallet, label: 'User Wallet' },
    ]
  },
  {
    title: 'OPERATIONS',
    items: [
      { icon: MapPin, label: 'Zone Setup' },
      { icon: Send, label: 'Dispatch Management' },
      { icon: AlertCircle, label: 'Solved Alert List' },
      { icon: Navigation, label: 'Live Tracking' },
      { icon: FileText, label: 'System Logs' },
    ]
  },
  {
    title: 'PROMOTION & MARKETING',
    items: [
      { icon: ImageIcon, label: 'Banner Setup' },
      { icon: Ticket, label: 'Coupon Setup' },
      { icon: Percent, label: 'Discount Setup' },
      { icon: Bell, label: 'Send Notifications' },
      { icon: Mail, label: 'Newsletter' },
    ]
  },
  {
    title: 'VEHICLE MANAGEMENT',
    items: [
      { icon: Settings, label: 'Vehicle Attribute' },
      { icon: List, label: 'Vehicle List' },
      { icon: ClipboardList, label: 'Vehicle Request' },
      { icon: PlusCircle, label: 'Add New Vehicle' },
    ]
  },
  {
    title: 'FINANCE & REPORTS',
    items: [
      { icon: DollarSign, label: 'Transactions' },
      { icon: BarChart, label: 'Earnings Reports' },
      { icon: PieChart, label: 'Commission Reports' },
      { icon: Activity, label: 'Financial Analytics' },
    ]
  },
  {
    title: 'CONTENT MANAGEMENT',
    items: [
      { icon: PenTool, label: 'Blog Setup' },
      { icon: FileCode, label: 'Pages' },
      { icon: Image, label: 'Media Library' },
    ]
  },
  {
    title: 'HELP & SUPPORT',
    items: [
      { icon: MessageSquare, label: 'Support Tickets' },
    ]
  },
  {
    title: 'BUSINESS & CONFIG',
    items: [
      { icon: Building, label: 'Business Setup' },
      { icon: Sliders, label: 'Configuration' },
      { icon: Lock, label: 'Roles & Permissions' },
      { icon: Settings2, label: 'System Settings' },
    ]
  }
];

interface SidebarProps {
  currentView: string;
  onNavigate: (view: string) => void;
}

export const Sidebar = ({ currentView, onNavigate }: SidebarProps) => {
  const [expandedItems, setExpandedItems] = useState<string[]>(['SERVICES', 'MAIN DASHBOARD']);

  const toggleExpand = (label: string) => {
    setExpandedItems(prev => 
      prev.includes(label) 
        ? prev.filter(i => i !== label) 
        : [...prev, label]
    );
  };

  return (
    <aside className="w-64 h-screen bg-bg-sidebar border-r border-slate-200 fixed left-0 top-0 flex flex-col overflow-y-auto scrollbar-hide z-50">
      <div className="p-6 sticky top-0 bg-bg-sidebar z-10 border-b border-slate-100/50">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center shadow-lg shadow-primary/20">
            <Car className="text-white w-5 h-5" />
          </div>
          <span className="text-xl font-bold text-slate-800 tracking-tight">GoGrab</span>
        </div>
      </div>

      <nav className="flex-1 px-3 py-4 space-y-6">
        {sidebarGroups.map((group) => (
          <div key={group.title} className="space-y-1">
            <div className="px-4 mb-2">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.15em]">
                {group.title}
              </span>
            </div>
            
            <div className="space-y-0.5">
              {group.items.map((item) => {
                const isExpanded = expandedItems.includes(item.label);
                const hasSubItems = item.subItems && item.subItems.length > 0;
                const isActive = currentView === item.label || (hasSubItems && item.subItems?.includes(currentView));

                return (
                  <div key={item.label} className="space-y-0.5">
                    <button
                      onClick={() => {
                        if (hasSubItems) {
                          toggleExpand(item.label);
                        } else {
                          onNavigate(item.label);
                        }
                      }}
                      className={cn(
                        "w-full flex items-center justify-between px-4 py-2.5 rounded-xl transition-all duration-200 group",
                        isActive && !hasSubItems
                          ? "bg-primary/10 text-primary font-semibold" 
                          : "text-slate-600 hover:bg-slate-100/80 hover:text-slate-900"
                      )}
                    >
                      <div className="flex items-center gap-3">
                        <item.icon className={cn(
                          "w-4.5 h-4.5 transition-colors",
                          isActive ? "text-primary" : "text-slate-400 group-hover:text-slate-600"
                        )} />
                        <span className="text-[13px] font-medium">{item.label}</span>
                      </div>
                      {hasSubItems && (
                        <div className={cn(
                          "transition-transform duration-200",
                          isExpanded ? "rotate-180" : ""
                        )}>
                          <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                        </div>
                      )}
                    </button>

                    {hasSubItems && isExpanded && (
                      <div className="ml-9 mt-0.5 space-y-0.5 border-l border-slate-100">
                        {item.subItems?.map((subItem) => (
                          <button
                            key={subItem}
                            onClick={() => onNavigate(subItem)}
                            className={cn(
                              "w-full text-left px-4 py-2 text-[12px] rounded-lg transition-all",
                              currentView === subItem
                                ? "text-primary font-bold bg-primary/5"
                                : "text-slate-500 hover:text-slate-800 hover:bg-slate-50"
                            )}
                          >
                            {subItem}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </nav>

      <div className="p-4 mt-auto sticky bottom-0 bg-bg-sidebar border-t border-slate-100/50">
        <div className="bg-slate-50 p-3 rounded-2xl border border-slate-100">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
              <Settings2 className="w-4 h-4 text-primary" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[11px] font-bold text-slate-800 truncate">System Admin</p>
              <p className="text-[9px] text-slate-400 truncate">admin@gograb.com</p>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
};
