import React from 'react';
import { Link } from 'react-router-dom';

export const Header: React.FC = () => {
    return (
        <header className="h-16 flex items-center justify-between px-8 border-b border-slate-200 dark:border-zinc-800 bg-white/50 dark:bg-zinc-900/50 backdrop-blur-md sticky top-0 z-30">
            <div className="flex items-center gap-4">
                <Link to="/" className="text-lg font-bold text-slate-900 dark:text-white hover:text-primary transition-colors">Dashboard Overview</Link>
                <div className="h-4 w-[1px] bg-slate-300 dark:bg-zinc-700"></div>
                <span className="text-sm text-slate-500 dark:text-slate-400 flex items-center gap-2">
                    <span className="w-2 h-2 bg-primary rounded-full"></span>
                    Last updated: Just now
                </span>
            </div>

            <div className="flex items-center gap-6">
                <div className="relative group">
                    <span className="material-icons absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary">search</span>
                    <input
                        type="text"
                        placeholder="Search rides, drivers..."
                        className="bg-slate-100 dark:bg-zinc-800 border-none rounded-lg pl-10 pr-4 py-2 text-sm focus:ring-2 focus:ring-primary w-64 transition-all text-slate-900 dark:text-white"
                    />
                </div>

                <button className="relative text-slate-500 hover:text-primary transition-colors">
                    <span className="material-icons">notifications</span>
                    <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full border-2 border-white dark:border-zinc-900"></span>
                </button>

                <Link to="/dispatch" className="flex items-center gap-2 bg-primary text-black px-4 py-2 rounded-lg text-sm font-semibold shadow-lg shadow-primary/20 hover:bg-primary/90 transition-all">
                    <span className="material-icons text-sm">add</span>
                    Manual Dispatch
                </Link>
            </div>
        </header>
    );
};

export default Header;
