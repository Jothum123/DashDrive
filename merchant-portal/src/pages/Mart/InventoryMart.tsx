import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Plus, Package, MoreHorizontal } from 'lucide-react';
import { cn } from '../../lib/utils';

const martInventory = [
    { id: 'SKU-001', name: 'Fresh Milk 2L', category: 'Dairy', priceUSD: 2.10, priceZiG: 54.60, stock: 124, unit: 'Bottle', pricingType: 'Unit' },
    { id: 'SKU-002', name: 'Brown Sugar 2kg', category: 'Pantry', priceUSD: 1.80, priceZiG: 46.80, stock: 45, unit: 'Bag', pricingType: 'Unit' },
    { id: 'SKU-003', name: 'Bulk Rice 5kg', category: 'Grains', priceUSD: 0.90, priceZiG: 23.40, stock: 12, unit: 'kg', pricingType: 'Weight' },
    { id: 'SKU-004', name: 'Potatoes (per kg)', category: 'Produce', priceUSD: 0.90, priceZiG: 23.40, stock: 250, unit: 'kg', pricingType: 'Weight' },
];

export const InventoryMart = () => {
    const [items] = useState(martInventory);

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-6"
        >
            <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-zinc-900">Mart Inventory (SKU)</h2>
                <div className="flex gap-3">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" size={18} />
                        <input
                            type="text"
                            placeholder="Scan barcode or search SKU..."
                            className="bg-zinc-100 border border-zinc-200 rounded-xl py-2 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-brand-green/20 w-80 text-zinc-900"
                        />
                    </div>
                    <button className="bg-brand-green text-zinc-950 px-4 py-2 rounded-xl font-bold flex items-center gap-2 hover:scale-105 transition-all shadow-lg shadow-brand-green/20">
                        <Plus size={18} /> Add SKU
                    </button>
                </div>
            </div>

            <div className="bg-white rounded-3xl overflow-hidden border border-zinc-200 shadow-sm">
                <table className="w-full text-left">
                    <thead>
                        <tr className="bg-zinc-50 text-zinc-500 text-[10px] font-bold uppercase tracking-widest border-b border-zinc-100">
                            <th className="px-6 py-4">SKU / Item</th>
                            <th className="px-6 py-4">Category</th>
                            <th className="px-6 py-4">Stock Level</th>
                            <th className="px-6 py-4">Price (USD/ZiG)</th>
                            <th className="px-6 py-4 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-zinc-100">
                        {items.map((item) => (
                            <tr key={item.id} className="hover:bg-zinc-50/50 transition-colors group">
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-3">
                                        <div className="p-2 bg-zinc-100 rounded-lg text-zinc-400 group-hover:text-zinc-600 transition-colors">
                                            <Package size={16} />
                                        </div>
                                        <div>
                                            <p className="font-bold text-sm text-zinc-900">{item.name}</p>
                                            <p className="text-[10px] text-zinc-400 font-mono font-medium">{item.id}</p>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <span className="text-[10px] font-bold uppercase tracking-wider bg-zinc-100 px-2 py-1 rounded text-zinc-500">{item.category}</span>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="flex flex-col">
                                        <span className={cn(
                                            "font-bold text-sm",
                                            item.stock < 20 ? "text-red-500" : "text-zinc-900"
                                        )}>{item.stock} {item.unit}s</span>
                                        <div className="w-24 h-1 bg-zinc-100 rounded-full mt-1 overflow-hidden">
                                            <div
                                                className={cn("h-full", item.stock < 20 ? "bg-red-500" : "bg-brand-green")}
                                                style={{ width: `${Math.min(item.stock, 100)}%` }}
                                            ></div>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="flex flex-col">
                                        <div className="flex items-center gap-1">
                                            <span className="text-sm font-bold text-brand-green">${item.priceUSD.toFixed(2)}</span>
                                            <span className="text-[10px] text-zinc-400 font-medium">/{item.unit === 'kg' ? 'kg' : 'unit'}</span>
                                        </div>
                                        <span className="text-[10px] text-zinc-500 font-semibold uppercase tracking-tighter">ZWG {item.priceZiG.toFixed(2)}</span>
                                        {item.pricingType === 'Weight' && (
                                            <span className="text-[8px] text-zinc-400 font-bold uppercase mt-1 tracking-widest">Scale-Integrated</span>
                                        )}
                                    </div>
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <button className="text-zinc-400 hover:text-zinc-900 p-2 transition-colors">
                                        <MoreHorizontal size={20} />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </motion.div>
    );
};
