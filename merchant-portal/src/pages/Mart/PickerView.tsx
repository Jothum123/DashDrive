import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, Circle, ShoppingBag, Clock, User, ArrowRight } from 'lucide-react';
import { cn } from '../../lib/utils';

const pickList = [
    { id: 1, name: 'Fresh Milk 2L', category: 'Dairy', qty: 2, picked: true },
    { id: 2, name: 'Brown Sugar 2kg', category: 'Pantry', qty: 1, picked: false },
    { id: 3, name: 'Bulk Rice 5kg', category: 'Grains', qty: 1, picked: false },
];

export const PickerView = () => {
    const [items, setItems] = useState(pickList);
    const [orderId] = useState('#MART-4509');

    const togglePick = (id: number) => {
        setItems(items.map(item =>
            item.id === id ? { ...item, picked: !item.picked } : item
        ));
    };

    const allPicked = items.every(i => i.picked);

    return (
        <div className="max-w-4xl mx-auto space-y-6">
            <div className="flex items-center justify-between bg-white p-6 rounded-3xl border border-zinc-200 shadow-sm">
                <div className="flex items-center gap-4">
                    <div className="p-3 bg-brand-green/10 rounded-2xl text-brand-green">
                        <ShoppingBag size={24} />
                    </div>
                    <div>
                        <h2 className="text-xl font-bold text-zinc-900">Pick & Pack: {orderId}</h2>
                        <p className="text-zinc-500 text-sm flex items-center gap-2 font-medium">
                            <User size={14} className="text-zinc-400" /> Assigned to: Blessing K. • <Clock size={14} className="text-zinc-400" /> 8m remaining
                        </p>
                    </div>
                </div>
                <div className="text-right">
                    <p className="text-2xl font-black text-brand-green">{items.filter(i => i.picked).length}/{items.length}</p>
                    <p className="text-[10px] text-zinc-400 uppercase font-bold tracking-widest">Items Picked</p>
                </div>
            </div>

            <div className="bg-white rounded-3xl overflow-hidden border border-zinc-200 shadow-sm">
                <div className="p-4 bg-zinc-50 border-b border-zinc-100 flex justify-between text-[10px] font-bold text-zinc-400 uppercase tracking-widest">
                    <span>Item Description</span>
                    <span>Quantity</span>
                </div>
                <div className="divide-y divide-zinc-100">
                    {items.map((item) => (
                        <button
                            key={item.id}
                            onClick={() => togglePick(item.id)}
                            className="w-full flex items-center justify-between p-6 hover:bg-zinc-50 transition-all group"
                        >
                            <div className="flex items-center gap-4">
                                <div className={cn(
                                    "p-2 rounded-full transition-all duration-300",
                                    item.picked
                                        ? "bg-brand-green text-zinc-950 scale-110 shadow-lg shadow-brand-green/20"
                                        : "bg-zinc-100 text-zinc-300 border border-zinc-200"
                                )}>
                                    {item.picked ? <CheckCircle2 size={24} /> : <Circle size={24} />}
                                </div>
                                <div className="text-left">
                                    <p className={cn("font-bold text-lg transition-all", item.picked ? "text-zinc-300 line-through" : "text-zinc-900")}>
                                        {item.name}
                                    </p>
                                    <p className="text-xs text-zinc-500 font-medium">{item.category}</p>
                                </div>
                            </div>
                            <div className="text-right">
                                <p className={cn("text-xl font-black transition-colors", item.picked ? "text-zinc-300" : "text-zinc-900")}>x{item.qty}</p>
                            </div>
                        </button>
                    ))}
                </div>
            </div>

            <AnimatePresence>
                {allPicked && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 20 }}
                        className="p-1 px-1"
                    >
                        <button className="w-full py-5 bg-brand-green text-zinc-950 rounded-2xl font-black text-lg flex items-center justify-center gap-2 shadow-xl shadow-brand-green/20 hover:scale-[1.02] transition-all">
                            Handover to Driver <ArrowRight size={24} />
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};
