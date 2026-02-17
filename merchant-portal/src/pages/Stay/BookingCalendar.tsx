import { motion } from 'framer-motion';
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight, Bed, User, ShieldCheck } from 'lucide-react';
import { cn } from '../../lib/utils';

const bookings = [
    { id: 1, room: 'Executive Suite 204', guest: 'Farai M.', date: 'Oct 24 - Oct 27', status: 'Confirmed', color: 'bg-brand-green/20 text-brand-green' },
    { id: 2, room: 'Deluxe Room 102', guest: 'Sarah J.', date: 'Oct 25 - Oct 26', status: 'Pending', color: 'bg-amber-500/20 text-amber-500' },
    { id: 3, room: 'Family Suite 301', guest: 'Robert T.', date: 'Oct 22 - Oct 28', status: 'Stay-over', color: 'bg-blue-500/20 text-blue-500' },
];

const rooms = [
    { number: '101', type: 'Deluxe', status: 'Available' },
    { number: '102', type: 'Deluxe', status: 'Occupied' },
    { number: '201', type: 'Executive', status: 'Maintenance' },
    { number: '202', type: 'Executive', status: 'Available' },
];

export const BookingCalendar = () => {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-6"
        >
            <div className="flex items-center justify-between mb-8">
                <h2 className="text-xl font-bold text-zinc-900">Booking & Reservation Flow</h2>
                <div className="flex items-center gap-4">
                    <div className="flex bg-white border border-zinc-200 rounded-xl p-1 shadow-sm">
                        <button className="p-2 hover:bg-zinc-50 rounded-lg text-zinc-400 hover:text-zinc-900 transition-colors"><ChevronLeft size={20} /></button>
                        <div className="px-4 py-2 text-sm font-bold flex items-center gap-2 text-zinc-900">
                            <CalendarIcon size={16} className="text-brand-green" /> October 2026
                        </div>
                        <button className="p-2 hover:bg-zinc-50 rounded-lg text-zinc-400 hover:text-zinc-900 transition-colors"><ChevronRight size={20} /></button>
                    </div>
                    <button className="bg-brand-green text-zinc-950 px-6 py-2 rounded-xl font-bold shadow-lg shadow-brand-green/20 hover:scale-105 transition-all">New Booking</button>
                </div>
            </div>

            <div className="grid grid-cols-12 gap-6">
                {/* Reservation List */}
                <div className="col-span-12 lg:col-span-8 bg-white rounded-3xl p-6 border border-zinc-200 shadow-sm">
                    <h3 className="text-[10px] font-black text-zinc-400 uppercase tracking-widest mb-6">Upcoming Check-ins</h3>
                    <div className="space-y-4">
                        {bookings.map((booking) => (
                            <div key={booking.id} className="flex items-center justify-between p-4 bg-zinc-50/50 rounded-2xl border border-zinc-100 hover:border-brand-green/30 hover:bg-white hover:shadow-md transition-all cursor-pointer group">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-xl bg-white border border-zinc-100 flex items-center justify-center text-zinc-400 group-hover:text-brand-green transition-colors shadow-sm">
                                        <Bed size={24} />
                                    </div>
                                    <div>
                                        <p className="font-bold text-zinc-900">{booking.room}</p>
                                        <p className="text-xs text-zinc-500 flex items-center gap-1 font-medium"><User size={12} className="text-zinc-400" /> {booking.guest} • {booking.date}</p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <span className={cn("px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider shadow-sm", booking.color)}>
                                        {booking.status}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Room Status Hub */}
                <div className="col-span-12 lg:col-span-4 bg-white rounded-3xl p-6 border border-zinc-200 shadow-sm">
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="text-[10px] font-black text-zinc-400 uppercase tracking-widest">Housekeeping</h3>
                        <ShieldCheck size={18} className="text-brand-green" />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                        {rooms.map((room) => (
                            <div key={room.number} className="p-3 bg-zinc-50 rounded-2xl border border-zinc-100 text-center shadow-sm">
                                <p className="text-lg font-black text-zinc-900">{room.number}</p>
                                <p className="text-[10px] text-zinc-400 uppercase font-black tracking-tighter">{room.type}</p>
                                <span className={cn(
                                    "mt-2 inline-block w-2 h-2 rounded-full",
                                    room.status === 'Available' ? 'bg-brand-green shadow-[0_0_8px_rgba(0,255,144,0.5)]' : room.status === 'Occupied' ? 'bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.5)]' : 'bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.5)]'
                                )}></span>
                                <p className="text-[10px] font-bold mt-1 text-zinc-600">{room.status}</p>
                            </div>
                        ))}
                    </div>
                    <button className="w-full mt-6 py-3 border border-zinc-200 rounded-xl text-zinc-500 text-sm font-bold hover:bg-zinc-50 hover:text-zinc-900 transition-all shadow-sm">
                        Manage Room Service
                    </button>
                </div>
            </div>
        </motion.div>
    );
};
