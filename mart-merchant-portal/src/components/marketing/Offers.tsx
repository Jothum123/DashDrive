import {
    Tag, Plus, Calendar,
    CheckCircle2, ArrowRight,
    Filter, Search, ShoppingBag
} from 'lucide-react';
import { cn } from '../../utils/cn';

const offers = [
    {
        id: 'OFF-1024',
        name: 'Weekend Sizzler: 20% Off All Produce',
        type: 'Percentage Discount',
        value: '20% Off',
        status: 'Active',
        range: 'Feb 20 - Feb 22',
        redemptions: 142,
        stores: '2 Stores'
    },
    {
        id: 'OFF-1025',
        name: 'New User Welcome: $10 Credit',
        type: 'Fixed Amount',
        value: '$10.00 Off',
        status: 'Active',
        range: 'Permanent',
        redemptions: 89,
        stores: 'All Stores'
    },
    {
        id: 'OFF-1026',
        name: 'Holiday BOGO: Beverages',
        type: 'Buy One Get One',
        value: 'BOGO',
        status: 'Scheduled',
        range: 'Mar 17',
        redemptions: 0,
        stores: 'All Stores'
    }
];

export function Offers() {
    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            {/* Header Actions */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <h2 className="text-2xl font-black text-gray-800 tracking-tight">Offers & Discounts</h2>
                    <p className="text-sm text-gray-400 font-medium">Create and manage performance-based incentives</p>
                </div>
                <button className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-[20px] text-sm font-black uppercase tracking-widest hover:bg-blue-700 transition-all shadow-lg shadow-blue-100">
                    <Plus size={20} />
                    Create New Offer
                </button>
            </div>

            {/* Filters */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-4 rounded-2xl shadow-sm border border-gray-100">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                    <input
                        type="text"
                        placeholder="Search offers..."
                        className="w-full pl-10 pr-4 py-2 bg-gray-50 border-none rounded-xl text-sm focus:ring-2 focus:ring-blue-500/20 transition-all outline-none"
                    />
                </div>
                <div className="flex items-center gap-2">
                    <button className="flex items-center gap-2 px-4 py-2 text-sm font-bold text-gray-500 hover:bg-gray-50 rounded-xl transition-colors">
                        <Filter size={18} />
                        Status: All
                    </button>
                </div>
            </div>

            {/* Offers Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {offers.map((offer) => (
                    <div key={offer.id} className="bg-white rounded-[32px] border border-gray-100 shadow-sm p-8 group hover:shadow-xl hover:shadow-gray-100 transition-all border-t-4 border-t-emerald-500/0 hover:border-t-blue-500/100">
                        <div className="flex items-start justify-between mb-6">
                            <div className="p-3 bg-blue-50 text-blue-600 rounded-2xl">
                                <Tag size={24} />
                            </div>
                            <div className={cn(
                                "px-2.5 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest",
                                offer.status === 'Active' ? "bg-emerald-50 text-emerald-600" : "bg-blue-50 text-blue-600"
                            )}>
                                {offer.status}
                            </div>
                        </div>

                        <h3 className="text-xl font-black text-gray-800 tracking-tight leading-tight mb-2 group-hover:text-blue-600 transition-colors">
                            {offer.name}
                        </h3>

                        <div className="flex items-center gap-4 text-xs font-medium text-gray-400 mb-8">
                            <span className="flex items-center gap-1.5"><Calendar size={14} /> {offer.range}</span>
                            <span className="size-1 rounded-full bg-gray-200" />
                            <span className="flex items-center gap-1.5"><ShoppingBag size={14} /> {offer.stores}</span>
                        </div>

                        <div className="grid grid-cols-2 gap-4 pt-6 border-t border-gray-50">
                            <div>
                                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Type</p>
                                <p className="text-sm font-bold text-gray-800 mt-1">{offer.type}</p>
                            </div>
                            <div className="text-right">
                                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Redemptions</p>
                                <p className="text-sm font-bold text-gray-800 mt-1">{offer.redemptions}</p>
                            </div>
                        </div>

                        <button className="w-full mt-8 flex items-center justify-center gap-2 py-3 bg-gray-50 hover:bg-gray-100 text-gray-500 hover:text-gray-800 rounded-2xl text-xs font-black uppercase tracking-widest transition-all">
                            Manage Details <ArrowRight size={14} />
                        </button>
                    </div>
                ))}

                {/* Empty State / Create More */}
                <button className="bg-gray-50/50 rounded-[32px] border-2 border-dashed border-gray-200 p-8 flex flex-col items-center justify-center gap-4 group hover:bg-white hover:border-blue-200 transition-all">
                    <div className="p-4 bg-white rounded-2xl text-gray-300 group-hover:text-blue-500 transition-colors shadow-sm">
                        <Plus size={32} />
                    </div>
                    <div className="text-center">
                        <p className="text-sm font-black text-gray-800 tracking-tight">Create New Campaign</p>
                        <p className="text-xs text-gray-400 font-medium">Drive more orders during off-peak</p>
                    </div>
                </button>
            </div>

            {/* Marketing Tip */}
            <div className="bg-emerald-600 rounded-[40px] p-8 text-white shadow-xl shadow-emerald-100 flex flex-col md:flex-row items-center gap-8">
                <div className="size-24 bg-white/10 rounded-[32px] backdrop-blur-md border border-white/20 flex items-center justify-center shrink-0">
                    <CheckCircle2 size={40} className="text-white opacity-40" />
                </div>
                <div className="flex-1 space-y-2 text-center md:text-left">
                    <h4 className="text-2xl font-black tracking-tight italic">Boost Sales by 40%</h4>
                    <p className="text-sm opacity-80 leading-relaxed font-medium">Stores with active "New User Welcome" offers see an average 40% increase in weekly volume during the first 30 days.</p>
                </div>
                <button className="px-8 py-4 bg-white text-emerald-600 rounded-2xl text-xs font-black uppercase tracking-widest hover:scale-105 active:scale-95 transition-all shadow-xl">
                    View Guide
                </button>
            </div>
        </div>
    );
}
