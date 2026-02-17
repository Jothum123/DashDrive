
import { motion, AnimatePresence } from 'framer-motion';
import { Clock, CheckCircle2, Play, MapPin } from 'lucide-react';


const orders = [
    { id: '#4501', customer: 'John Doe', items: '2x Double Smash Burger', status: 'new', time: '2m ago', total: '$24.00' },
    { id: '#4502', customer: 'Sarah Smith', items: '1x Veggie Wrap, 1x Fries', status: 'preparing', time: '12m ago', total: '$18.50' },
    { id: '#4503', customer: 'Mike Ross', items: '3x Caramel Milkshake', status: 'ready', time: '25m ago', total: '$15.00' },
];

const OrderCard = ({ order }: { order: any }) => (
    <motion.div
        layout
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="glass-morphism rounded-2xl p-4 mb-4 border border-zinc-200 hover:border-brand-green/30 transition-shadow shadow-sm hover:shadow-md group cursor-pointer"
    >
        <div className="flex justify-between items-start mb-3">
            <div>
                <span className="text-xs font-bold text-brand-green bg-brand-green/10 px-2 py-0.5 rounded-full mb-1 inline-block">{order.id}</span>
                <h4 className="font-bold text-zinc-900">{order.customer}</h4>
            </div>
            <span className="text-xs text-zinc-400 flex items-center gap-1">
                <Clock size={12} /> {order.time}
            </span>
        </div>
        <p className="text-sm text-zinc-500 mb-4">{order.items}</p>
        <div className="flex items-center justify-between border-t border-zinc-100 pt-3">
            <span className="font-bold text-sm text-zinc-900">{order.total}</span>
            <div className="flex gap-2">
                {order.status === 'new' && (
                    <button className="p-2 rounded-lg bg-brand-green text-zinc-950 hover:shadow-lg shadow-brand-green/20 transition-all">
                        <Play size={16} fill="currentColor" />
                    </button>
                )}
                {order.status === 'preparing' && (
                    <button className="p-2 rounded-lg bg-blue-500 text-white hover:shadow-lg shadow-blue-500/20 transition-all">
                        <CheckCircle2 size={16} />
                    </button>
                )}
                <button className="p-2 rounded-lg bg-zinc-100 text-zinc-400 hover:text-zinc-600 transition-colors">
                    <MapPin size={16} />
                </button>
            </div>
        </div>
    </motion.div>
);

export const Orders = () => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-[calc(100vh-160px)]">
            {/* New Orders */}
            <div className="flex flex-col h-full">
                <div className="flex items-center justify-between mb-4 px-2">
                    <div className="flex items-center gap-2">
                        <h3 className="font-bold text-lg text-zinc-900">New Orders</h3>
                        <span className="bg-brand-green text-zinc-950 text-xs font-bold px-2 py-0.5 rounded-full shadow-sm shadow-brand-green/20">1</span>
                    </div>
                </div>
                <div className="flex-1 overflow-y-auto pr-2 space-y-4">
                    <AnimatePresence>
                        {orders.filter(o => o.status === 'new').map(order => (
                            <OrderCard key={order.id} order={order} />
                        ))}
                    </AnimatePresence>
                </div>
            </div>

            {/* Preparing */}
            <div className="flex flex-col h-full border-x border-zinc-200 px-4">
                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                        <h3 className="font-bold text-lg text-zinc-900">Preparing</h3>
                        <span className="bg-blue-500 text-white text-xs font-bold px-2 py-0.5 rounded-full shadow-sm shadow-blue-500/20">1</span>
                    </div>
                </div>
                <div className="flex-1 overflow-y-auto space-y-4">
                    <AnimatePresence>
                        {orders.filter(o => o.status === 'preparing').map(order => (
                            <OrderCard key={order.id} order={order} />
                        ))}
                    </AnimatePresence>
                </div>
            </div>

            {/* Ready */}
            <div className="flex flex-col h-full">
                <div className="flex items-center justify-between mb-4 px-2">
                    <div className="flex items-center gap-2">
                        <h3 className="font-bold text-lg text-zinc-900">Ready</h3>
                        <span className="bg-purple-500 text-white text-xs font-bold px-2 py-0.5 rounded-full shadow-sm shadow-purple-500/20">1</span>
                    </div>
                </div>
                <div className="flex-1 overflow-y-auto pr-2 space-y-4">
                    <AnimatePresence>
                        {orders.filter(o => o.status === 'ready').map(order => (
                            <OrderCard key={order.id} order={order} />
                        ))}
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
};
