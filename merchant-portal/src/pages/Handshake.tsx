import { motion } from 'framer-motion';
import { Truck, CheckCircle2, Navigation, ShieldCheck, MapPin } from 'lucide-react';
import { cn } from '../lib/utils';

const activeDrivers = [
    { id: 'DR-902', name: 'Tendai M.', order: '#4503', distance: '0.4 km', eta: '2 mins', status: 'Arrived' },
    { id: 'DR-881', name: 'Kudzai C.', order: '#4501', distance: '1.2 km', eta: '8 mins', status: 'En Route' },
];

export const Handshake = () => {
    return (
        <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Verification Widget */}
                {/* Verification Widget */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="bg-white rounded-3xl p-8 border border-zinc-200 shadow-sm"
                >
                    <div className="flex items-center gap-3 mb-6">
                        <div className="p-3 bg-brand-green/10 rounded-2xl text-brand-green">
                            <ShieldCheck size={24} />
                        </div>
                        <div>
                            <h3 className="text-xl font-bold text-zinc-900">Secure Handshake</h3>
                            <p className="text-zinc-500 text-sm">Verify driver identity before handoff</p>
                        </div>
                    </div>

                    <div className="bg-zinc-50 rounded-2xl p-6 border border-zinc-200 mb-6 text-center">
                        <p className="text-zinc-500 text-[10px] uppercase tracking-widest font-bold mb-4">Order #4503 Verification Code</p>
                        <div className="flex justify-center gap-4">
                            {['8', '4', '0', '2'].map((digit, i) => (
                                <div key={i} className="w-12 h-16 bg-white rounded-xl border border-zinc-200 flex items-center justify-center text-3xl font-black text-brand-green shadow-sm">
                                    {digit}
                                </div>
                            ))}
                        </div>
                        <p className="mt-6 text-xs text-zinc-400 font-medium italic">"Ask the driver for this code or show them this screen"</p>
                    </div>

                    <button className="w-full py-4 bg-brand-green text-zinc-950 rounded-2xl font-bold flex items-center justify-center gap-2 hover:scale-[1.02] shadow-lg shadow-brand-green/20 transition-all">
                        <CheckCircle2 size={20} /> Complete Verification
                    </button>
                </motion.div>

                {/* Live Driver Tracking Map Placeholder */}
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="bg-white rounded-3xl p-8 border border-zinc-200 relative overflow-hidden group shadow-sm"
                >
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="text-xl font-bold text-zinc-900">Driver Tracking</h3>
                        <span className="text-[10px] font-black text-brand-green bg-brand-green/10 px-2 py-0.5 rounded-full animate-pulse uppercase tracking-wider">Live</span>
                    </div>

                    <div className="h-64 bg-zinc-100 rounded-2xl border border-zinc-200 relative overflow-hidden shadow-inner">
                        {/* Grid Pattern Background */}
                        <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(circle, #888 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>

                        {/* Mock Map Markers */}
                        <motion.div
                            animate={{
                                x: [100, 120, 110],
                                y: [50, 40, 60]
                            }}
                            transition={{ repeat: Infinity, duration: 10, ease: "linear" }}
                            className="absolute text-brand-green"
                        >
                            <Navigation size={24} fill="currentColor" />
                        </motion.div>

                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                            <MapPin size={32} fill="#00ff90" className="drop-shadow-[0_2px_4px_rgba(0,0,0,0.1)]" />
                        </div>

                        <div className="absolute bottom-4 left-4 right-4 bg-white/90 backdrop-blur-md p-3 rounded-xl border border-zinc-200 flex items-center justify-between shadow-lg">
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-full bg-zinc-200" />
                                <div className="text-left">
                                    <p className="text-xs font-bold text-zinc-900">Tendai M.</p>
                                    <p className="text-[10px] text-zinc-500 font-medium">Toyota Aqua (ABX-1234)</p>
                                </div>
                            </div>
                            <div className="text-right text-brand-green font-bold">
                                <p className="text-[10px]">2 mins away</p>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>

            {/* Driver List */}
            <div className="bg-white rounded-3xl p-8 border border-zinc-200 shadow-sm">
                <h3 className="text-xl font-bold mb-6 text-zinc-900">Active Deliveries</h3>
                <div className="space-y-4">
                    {activeDrivers.map((driver) => (
                        <div key={driver.id} className="flex items-center justify-between p-4 rounded-2xl hover:bg-zinc-50 transition-colors border border-transparent hover:border-zinc-100">
                            <div className="flex items-center gap-4">
                                <div className={cn(
                                    "p-3 rounded-xl",
                                    driver.status === 'Arrived' ? "bg-brand-green/10 text-brand-green" : "bg-zinc-100 text-zinc-400"
                                )}>
                                    <Truck size={20} />
                                </div>
                                <div>
                                    <div className="flex items-center gap-2">
                                        <p className="font-bold text-zinc-900">{driver.name}</p>
                                        <span className="text-[10px] bg-zinc-100 px-2 py-0.5 rounded text-zinc-500 font-bold">{driver.id}</span>
                                    </div>
                                    <p className="text-sm text-zinc-500 font-medium">Assigned to {driver.order}</p>
                                </div>
                            </div>
                            <div className="text-right">
                                <p className={cn(
                                    "font-bold",
                                    driver.status === 'Arrived' ? "text-brand-green" : "text-zinc-900"
                                )}>{driver.status}</p>
                                <p className="text-xs text-zinc-400 font-medium">{driver.eta} • {driver.distance}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};
