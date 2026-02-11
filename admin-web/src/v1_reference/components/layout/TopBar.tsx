import { Bell, Search, User } from 'lucide-react';
import React from 'react';

export const TopBar: React.FC = () => {
    return (
        <header className="h-20 bg-white/80 dark:bg-zinc-950/80 backdrop-blur-xl border-b border-gray-100 dark:border-white/5 px-10 flex items-center justify-between sticky top-0 z-40 shadow-[0_1px_10px_rgba(0,0,0,0.02)]">
            <div className="flex-1 max-w-xl relative group">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-primary transition-colors" size={18} />
                <input
                    type="text"
                    placeholder="Search entities, trips or users..."
                    className="w-full pl-12 pr-4 py-3 bg-gray-50 dark:bg-white/5 border border-transparent focus:border-primary/20 rounded-2xl text-sm focus:outline-none transition-all font-uber-bold text-gray-800 dark:text-white"
                />
            </div>

            <div className="flex items-center gap-6">
                <button className="relative p-2.5 rounded-2xl hover:bg-gray-100 dark:hover:bg-white/10 transition-all group">
                    <Bell size={20} className="text-gray-400 group-hover:text-primary transition-colors" />
                    <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-rose-500 rounded-full border-2 border-white dark:border-zinc-950" />
                </button>

                <div className="w-[1px] h-6 bg-gray-100 dark:bg-white/10" />

                <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-zinc-100 dark:bg-zinc-800 border border-gray-200 dark:border-white/10 flex items-center justify-center overflow-hidden">
                        <User size={20} className="text-gray-400" />
                    </div>
                </div>
            </div>
        </header>
    );
};
