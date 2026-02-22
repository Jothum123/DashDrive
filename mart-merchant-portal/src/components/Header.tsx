import { Search, Bell } from 'lucide-react';

interface HeaderProps {
    title: string;
    subtitle: string;
}

export function Header({ title, subtitle }: HeaderProps) {
    return (
        <header className="h-20 bg-white border-b border-gray-100 px-8 flex items-center justify-between sticky top-0 z-10">
            <div>
                <h1 className="text-xl font-bold text-gray-800">{title}</h1>
                <p className="text-xs text-gray-400 mt-0.5">{subtitle}</p>
            </div>

            <div className="flex items-center gap-6">
                <div className="relative group">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 size-4 group-focus-within:text-primary transition-colors" />
                    <input
                        type="text"
                        placeholder="Search users, orders, products..."
                        className="bg-gray-50 border border-transparent focus:border-primary/20 focus:bg-white rounded-xl py-2 pl-10 pr-4 text-sm w-80 outline-none transition-all"
                    />
                </div>

                <div className="flex items-center gap-4 border-l border-gray-100 pl-6">
                    <button className="relative p-2 text-gray-400 hover:bg-gray-50 rounded-lg transition-colors">
                        <Bell size={20} />
                        <span className="absolute top-2 right-2 size-2 bg-red-500 rounded-full border-2 border-white" />
                    </button>

                    <div className="flex items-center gap-3 pl-2">
                        <div className="text-right hidden sm:block">
                            <p className="text-sm font-bold text-gray-800 leading-none">Admin User</p>
                            <p className="text-[10px] text-gray-400 mt-1">admin@company.com</p>
                        </div>
                        <div className="relative group cursor-pointer">
                            <img
                                src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix"
                                alt="Profile"
                                className="size-10 rounded-xl bg-gray-100 border-2 border-white shadow-sm"
                            />
                            <div className="absolute -bottom-1 -right-1 size-3 bg-emerald-500 rounded-full border-2 border-white" />
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
}
