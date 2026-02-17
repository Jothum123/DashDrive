import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, Plus, Edit2, ToggleLeft, ToggleRight, Trash2 } from 'lucide-react';
import { cn } from '../lib/utils';

const menuItems = [
    { id: 1, name: 'Double Smash Burger', category: 'Burgers', price: '$12.00', status: 'In Stock' },
    { id: 2, name: 'Truffle Fries', category: 'Sides', price: '$6.50', status: 'In Stock' },
    { id: 3, name: 'Wagyu Burger', category: 'Burgers', price: '$18.00', status: 'Out of Stock' },
    { id: 4, name: 'Caramel Milkshake', category: 'Drinks', price: '$5.00', status: 'In Stock' },
];

export const Menu = () => {
    const [items, setItems] = useState(menuItems);

    const toggleStatus = (id: number) => {
        setItems(items.map(item => {
            if (item.id === id) {
                const newStatus = item.status === 'In Stock' ? 'Out of Stock' : 'In Stock';
                console.log(`[MerchantPortal] Item ${item.name} synced to Customer App: ${newStatus}`);
                return { ...item, status: newStatus };
            }
            return item;
        }));
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-6"
        >
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" size={18} />
                        <input
                            type="text"
                            placeholder="Filter menu..."
                            className="bg-zinc-100 border border-zinc-200 rounded-xl py-2 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-brand-green/20 w-64 text-zinc-900"
                        />
                    </div>
                    <button className="flex items-center gap-2 px-4 py-2 bg-white border border-zinc-200 rounded-xl text-sm font-medium hover:bg-zinc-50 transition-all text-zinc-600 hover:text-zinc-900 shadow-sm">
                        <Filter size={16} /> Filter
                    </button>
                </div>
                <button className="flex items-center gap-2 px-6 py-2 bg-brand-green text-zinc-950 rounded-xl font-bold hover:scale-105 transition-all shadow-lg shadow-brand-green/20">
                    <Plus size={18} /> Add Item
                </button>
            </div>

            <div className="bg-white rounded-3xl overflow-hidden border border-zinc-200 shadow-sm">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="border-b border-zinc-100 bg-zinc-50/50">
                            <th className="px-6 py-4 text-xs font-bold text-zinc-500 uppercase tracking-widest">Item Name</th>
                            <th className="px-6 py-4 text-xs font-bold text-zinc-500 uppercase tracking-widest">Category</th>
                            <th className="px-6 py-4 text-xs font-bold text-zinc-500 uppercase tracking-widest">Price</th>
                            <th className="px-6 py-4 text-xs font-bold text-zinc-500 uppercase tracking-widest">Status</th>
                            <th className="px-6 py-4 text-xs font-bold text-zinc-500 uppercase tracking-widest text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-zinc-100">
                        {items.map((item) => (
                            <tr key={item.id} className="hover:bg-zinc-50/50 transition-colors group">
                                <td className="px-6 py-4 font-bold text-zinc-900">{item.name}</td>
                                <td className="px-6 py-4 text-zinc-500">{item.category}</td>
                                <td className="px-6 py-4 font-bold text-brand-green">{item.price}</td>
                                <td className="px-6 py-4">
                                    <span className={cn(
                                        "px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider",
                                        item.status === 'In Stock' ? "bg-brand-green/10 text-brand-green" : "bg-red-50 text-red-600"
                                    )}>
                                        {item.status}
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <div className="flex items-center justify-end gap-2">
                                        <button
                                            onClick={() => toggleStatus(item.id)}
                                            className={cn(
                                                "p-2 rounded-lg transition-colors",
                                                item.status === 'In Stock' ? "text-brand-green hover:bg-brand-green/10" : "text-zinc-400 hover:bg-zinc-100"
                                            )}
                                        >
                                            {item.status === 'In Stock' ? <ToggleRight size={20} /> : <ToggleLeft size={20} />}
                                        </button>
                                        <button className="p-2 rounded-lg text-zinc-400 hover:bg-zinc-100 hover:text-zinc-900 transition-all">
                                            <Edit2 size={18} />
                                        </button>
                                        <button className="p-2 rounded-lg text-zinc-400 hover:bg-red-50 hover:text-red-600 transition-all">
                                            <Trash2 size={18} />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </motion.div>
    );
};
