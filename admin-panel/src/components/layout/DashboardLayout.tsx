import React from 'react';
import { Sidebar } from './Sidebar';
import { motion } from 'framer-motion';

export const DashboardLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return (
        <div className="flex h-screen bg-background-dark text-zinc-100 overflow-hidden font-sans">
            <Sidebar />

            <div className="flex-1 flex flex-col min-w-0 overflow-hidden relative">
                {/* Top Header */}
                <header className="h-20 flex items-center justify-between px-10 shrink-0 relative z-10">
                    <div className="flex items-center gap-4">
                        <h2 className="text-sm font-bold text-zinc-500 uppercase tracking-[0.3em]">System Health</h2>
                        <div className="flex items-center gap-2 px-3 py-1 bg-primary/10 rounded-full border border-primary/20">
                            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></span>
                            <span className="text-[10px] font-black text-primary uppercase">99.9% UPTIME</span>
                        </div>
                    </div>

                    <div className="flex items-center gap-6">
                        <div className="flex flex-col items-end">
                            <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-tighter">Marketplace Balance</span>
                            <span className="text-sm font-black text-white">$4,285,120.00</span>
                        </div>
                        <button className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 transition-colors cursor-pointer">
                            <span className="material-icons-outlined text-zinc-400">notifications</span>
                        </button>
                    </div>
                </header>

                <main className="flex-1 overflow-x-hidden overflow-y-auto custom-scrollbar relative z-0 p-10 pt-0">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        {children}
                    </motion.div>
                </main>
            </div>

            {/* Column 3: Global Feed (Placeholder) */}
            <div className="w-80 h-full border-l border-white/5 bg-zinc-950/20 backdrop-blur-md hidden xl:flex flex-col">
                <div className="p-6 border-b border-white/5">
                    <h2 className="text-lg font-bold text-white tracking-tight font-display">THE LIVE FEED</h2>
                    <p className="text-[10px] text-primary font-bold uppercase tracking-widest">Global Ops v2.0</p>
                </div>
                <div className="flex-1 p-6 text-zinc-600 text-[10px] font-bold uppercase tracking-[0.2em] flex items-center justify-center">
                    Awaiting Stream Connection...
                </div>
            </div>
        </div>
    );
};
