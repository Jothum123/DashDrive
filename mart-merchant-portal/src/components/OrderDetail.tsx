import {
    Clock, MapPin, CreditCard,
    ChevronLeft, Printer, FileText, Share2,
    CheckCircle2, Send, AlertCircle,
    Undo2, MessageCircle
} from 'lucide-react';
import { cn } from '../utils/cn';

interface OrderDetailProps {
    orderId: string;
    onBack: () => void;
}

export function OrderDetail({ orderId, onBack }: OrderDetailProps) {
    // Mock data for the single order view
    const order = {
        id: orderId,
        status: 'Processing',
        date: 'Feb 21, 2026 at 11:45 AM',
        customer: {
            name: 'Darrell Steward',
            email: 'darrell.s@example.com',
            phone: '+1 (555) 000-0000',
            avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Darrell'
        },
        shippingAddress: {
            street: '123 Grocery Lane, Suite 400',
            city: 'London',
            state: 'UK',
            zip: 'E1 6AN'
        },
        billingAddress: {
            street: '123 Grocery Lane, Suite 400',
            city: 'London',
            state: 'UK',
            zip: 'E1 6AN'
        },
        items: [
            { id: 1, name: 'Coconut Clarity', price: 25.00, qty: 4, total: 100.00, image: 'https://images.unsplash.com/photo-1548943487-a2e4e43b4853?w=100&h=100&fit=crop', status: 'Picked' },
            { id: 2, name: 'Fresh Butter', price: 12.00, qty: 3, total: 36.00, image: 'https://images.unsplash.com/photo-1549392848-d42edee1af20?w=100&h=100&fit=crop', status: 'In Stock' }
        ],
        summary: {
            subtotal: 136.00,
            tax: 12.50,
            shipping: 5.00,
            total: 153.50
        },
        timeline: [
            { time: '11:45 AM', date: 'Feb 21', event: 'Order Placed', desc: 'Order received via Mart App', current: false },
            { time: '12:10 PM', date: 'Feb 21', event: 'Payment Confirmed', desc: 'Transaction authorized via Mastercard', current: false },
            { time: '01:30 PM', date: 'Feb 21', event: 'Processing Started', desc: 'Merchant acknowledged order', current: true }
        ]
    };

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* Header Actions */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <button
                    onClick={onBack}
                    className="flex items-center gap-2 text-sm font-bold text-gray-400 hover:text-gray-800 transition-colors w-fit"
                >
                    <ChevronLeft size={20} /> Back to Orders
                </button>
                <div className="flex items-center gap-3">
                    <button className="p-2.5 bg-white border border-gray-100 rounded-xl text-gray-500 hover:text-gray-800 transition-all shadow-sm">
                        <Share2 size={18} />
                    </button>
                    <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-100 rounded-xl text-sm font-bold text-gray-600 hover:bg-gray-50 transition-all shadow-sm">
                        <Printer size={18} /> Print Packing Slip
                    </button>
                    <button className="flex items-center gap-2 px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-sm font-bold transition-all shadow-lg shadow-blue-100">
                        <CheckCircle2 size={18} /> Mark as Shipped
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left Column: Order Stats & Items */}
                <div className="lg:col-span-2 space-y-8">
                    {/* Order Snapshot */}
                    <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-8">
                        <div className="flex items-center justify-between mb-8">
                            <div>
                                <h1 className="text-2xl font-black text-gray-800 uppercase tracking-tighter">Order {order.id}</h1>
                                <p className="text-sm text-gray-400 mt-1 flex items-center gap-2 font-medium">
                                    <Clock size={14} /> {order.date}
                                </p>
                            </div>
                            <span className="px-5 py-2 bg-blue-50 text-blue-600 rounded-2xl text-xs font-black uppercase tracking-widest">
                                {order.status}
                            </span>
                        </div>

                        <div className="overflow-x-auto mt-8">
                            <table className="w-full">
                                <thead>
                                    <tr className="text-left border-b border-gray-50">
                                        <th className="pb-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">Item Detail</th>
                                        <th className="pb-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">Price</th>
                                        <th className="pb-4 text-[10px] font-black text-gray-400 uppercase tracking-widest text-center">Qty</th>
                                        <th className="pb-4 text-[10px] font-black text-gray-400 uppercase tracking-widest text-right">Total</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-50">
                                    {order.items.map((item) => (
                                        <tr key={item.id} className="group">
                                            <td className="py-5">
                                                <div className="flex items-center gap-4">
                                                    <img src={item.image} alt="" className="size-14 rounded-2xl object-cover border border-gray-50" />
                                                    <div>
                                                        <p className="text-sm font-bold text-gray-800">{item.name}</p>
                                                        <span className="text-[10px] font-bold px-2 py-0.5 bg-emerald-50 text-emerald-600 rounded-full mt-1 inline-block uppercase tracking-tight">
                                                            {item.status}
                                                        </span>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="py-5 text-sm font-bold text-gray-800">${item.price.toFixed(2)}</td>
                                            <td className="py-5 text-sm font-bold text-gray-800 text-center">{item.qty}</td>
                                            <td className="py-5 text-sm font-black text-gray-800 text-right">${item.total.toFixed(2)}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        <div className="mt-8 pt-8 border-t border-gray-50 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                            <div className="flex flex-wrap gap-3">
                                <button className="flex items-center gap-2 px-4 py-2 border border-blue-50 text-blue-600 rounded-xl text-xs font-bold hover:bg-blue-50 transition-colors">
                                    <FileText size={16} /> Packing Slip PDF
                                </button>
                                <button className="flex items-center gap-2 px-4 py-2 border border-purple-50 text-purple-600 rounded-xl text-xs font-bold hover:bg-purple-50 transition-colors">
                                    <Send size={16} /> Email Customer
                                </button>
                            </div>
                            <div className="w-full md:w-64 space-y-3">
                                <div className="flex justify-between text-sm text-gray-400 font-medium">
                                    <span>Subtotal</span>
                                    <span className="text-gray-800 font-bold">${order.summary.subtotal.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between text-sm text-gray-400 font-medium">
                                    <span>Estimated Tax</span>
                                    <span className="text-gray-800 font-bold">${order.summary.tax.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between text-sm text-gray-400 font-medium">
                                    <span>Shipping Fee</span>
                                    <span className="text-gray-800 font-bold">${order.summary.shipping.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between text-lg font-black pt-2 border-t border-dashed border-gray-100 uppercase tracking-tighter">
                                    <span className="text-gray-400">Total</span>
                                    <span className="text-blue-600">${order.summary.total.toFixed(2)}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-8">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="p-2 bg-blue-50 text-blue-600 rounded-xl">
                                    <MapPin size={20} />
                                </div>
                                <h3 className="font-bold text-gray-800">Shipping Address</h3>
                            </div>
                            <div className="text-sm text-gray-500 font-medium leading-relaxed">
                                <p className="text-gray-800 font-bold mb-1">{order.customer.name}</p>
                                <p>{order.shippingAddress.street}</p>
                                <p>{order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.zip}</p>
                            </div>
                        </div>
                        <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-8">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="p-2 bg-purple-50 text-purple-600 rounded-xl">
                                    <CreditCard size={20} />
                                </div>
                                <h3 className="font-bold text-gray-800">Billing Address</h3>
                            </div>
                            <div className="text-sm text-gray-500 font-medium leading-relaxed">
                                <p className="text-gray-800 font-bold mb-1">{order.customer.name}</p>
                                <p>{order.billingAddress.street}</p>
                                <p>{order.billingAddress.city}, {order.billingAddress.state} {order.billingAddress.zip}</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Column: Customer & Timeline */}
                <div className="space-y-8">
                    {/* Customer Profile */}
                    <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-8">
                        <div className="flex items-center justify-between mb-8">
                            <h3 className="font-bold text-gray-800">Customer Details</h3>
                            <button className="p-2 hover:bg-gray-50 rounded-xl text-gray-400 hover:text-blue-600 transition-colors">
                                <MessageCircle size={18} />
                            </button>
                        </div>
                        <div className="flex items-center gap-4 mb-8">
                            <img src={order.customer.avatar} alt="" className="size-16 rounded-full border-4 border-gray-50" />
                            <div>
                                <h4 className="font-black text-gray-800 uppercase tracking-tighter">{order.customer.name}</h4>
                                <p className="text-xs text-gray-400 font-medium">{order.customer.email}</p>
                            </div>
                        </div>
                        <div className="space-y-4">
                            <div className="flex justify-between items-center bg-gray-50 p-3 rounded-2xl">
                                <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Order Count</span>
                                <span className="text-sm font-bold text-gray-800">12 Orders</span>
                            </div>
                            <div className="flex justify-between items-center bg-gray-50 p-3 rounded-2xl text-emerald-600">
                                <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Lifetime Value</span>
                                <span className="text-sm font-bold">$1,452.00</span>
                            </div>
                        </div>
                    </div>

                    {/* Timeline Audit Trail */}
                    <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-8">
                        <h3 className="font-bold text-gray-800 mb-8 flex items-center gap-2">
                            <Activity size={18} className="text-amber-500" /> Order History
                        </h3>
                        <div className="space-y-8 relative">
                            <div className="absolute left-[11px] top-2 bottom-6 w-0.5 bg-gray-50" />
                            {order.timeline.map((event, idx) => (
                                <div key={idx} className="flex gap-4 relative">
                                    <div className={cn(
                                        "size-6 rounded-full flex items-center justify-center shrink-0 z-10",
                                        event.current ? "bg-blue-600 text-white shadow-lg shadow-blue-100" : "bg-gray-100 text-gray-400"
                                    )}>
                                        <div className={cn("size-2 rounded-full", event.current ? "bg-white" : "bg-gray-400")} />
                                    </div>
                                    <div className="flex-1 -mt-1">
                                        <p className="text-sm font-bold text-gray-800">{event.event}</p>
                                        <p className="text-xs text-gray-400 font-medium mt-0.5">{event.desc}</p>
                                        <p className="text-[10px] font-bold text-gray-300 mt-2 uppercase tracking-tighter">
                                            {event.date}, {event.time}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Quick Actions Support */}
                    <div className="bg-amber-50 rounded-3xl p-8 border border-amber-100">
                        <div className="p-3 bg-amber-400 text-white rounded-2xl w-fit mb-4">
                            <AlertCircle size={20} />
                        </div>
                        <h3 className="font-bold text-amber-900 mb-2">Issue with Order?</h3>
                        <p className="text-sm text-amber-800/70 font-medium mb-6">Handle returns or partial refunds directly from here.</p>
                        <button className="w-full flex items-center justify-center gap-2 py-3 bg-amber-900 text-white rounded-2xl text-sm font-bold hover:bg-amber-950 transition-all">
                            <Undo2 size={18} /> Initiate Refund
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

// Minimal missing component for the single order view
function Activity({ size, className }: { size: number, className?: string }) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={size}
            height={size}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={className}
        >
            <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
        </svg>
    );
}
