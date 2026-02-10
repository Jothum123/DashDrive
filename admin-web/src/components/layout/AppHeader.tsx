import { Bell, Menu, Search, X } from "lucide-react";
import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useSidebar } from "../../context/SidebarContext";

const AppHeader: React.FC = () => {
    const { isMobileOpen, toggleSidebar, toggleMobileSidebar } = useSidebar();

    const handleToggle = () => {
        if (window.innerWidth >= 1024) {
            toggleSidebar();
        } else {
            toggleMobileSidebar();
        }
    };

    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if ((event.metaKey || event.ctrlKey) && event.key === "k") {
                event.preventDefault();
                inputRef.current?.focus();
            }
        };

        document.addEventListener("keydown", handleKeyDown);
        return () => document.removeEventListener("keydown", handleKeyDown);
    }, []);

    return (
        <header className="sticky top-0 flex w-full bg-white border-b border-gray-200 z-40 dark:border-zinc-800 dark:bg-zinc-900/50 backdrop-blur-md">
            <div className="flex flex-col items-center justify-between grow lg:flex-row lg:px-6">
                <div className="flex items-center justify-between w-full gap-2 px-3 py-3 border-b border-gray-200 dark:border-zinc-800 sm:gap-4 lg:justify-normal lg:border-b-0 lg:px-0 lg:py-4">
                    <button
                        className="flex items-center justify-center w-10 h-10 text-gray-500 border border-gray-200 rounded-lg dark:border-zinc-800 dark:text-gray-400 lg:h-11 lg:w-11"
                        onClick={handleToggle}
                        aria-label="Toggle Sidebar"
                    >
                        {isMobileOpen ? <X size={20} /> : <Menu size={20} />}
                    </button>

                    <Link to="/" className="lg:hidden flex items-center gap-2">
                        <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
                            <span className="text-black font-black text-xs">D</span>
                        </div>
                        <span className="text-lg font-black text-white tracking-tighter">DashDrive</span>
                    </Link>

                    <div className="hidden lg:block ml-4">
                        <form onSubmit={(e) => e.preventDefault()}>
                            <div className="relative">
                                <span className="absolute -translate-y-1/2 pointer-events-none left-4 top-1/2">
                                    <Search size={18} className="text-gray-400" />
                                </span>
                                <input
                                    ref={inputRef}
                                    type="text"
                                    placeholder="Search or type command..."
                                    className="h-11 w-full rounded-xl border border-gray-200 bg-gray-50/50 py-2.5 pl-12 pr-14 text-sm text-gray-800 placeholder:text-gray-400 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/10 dark:border-zinc-800 dark:bg-zinc-950/50 dark:text-white xl:w-[400px]"
                                />
                                <div className="absolute right-2.5 top-1/2 -translate-y-1/2 flex gap-1 items-center px-1.5 py-1 rounded border border-gray-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-[10px] text-gray-400">
                                    <span>⌘</span>
                                    <span>K</span>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>

                <div className="flex items-center gap-4 px-5 py-3 lg:py-0">
                    <button className="p-2 text-gray-400 hover:text-primary transition-colors relative">
                        <Bell size={20} />
                        <span className="absolute top-2 right-2 w-2 h-2 bg-error-500 rounded-full border-2 border-white dark:border-zinc-900"></span>
                    </button>
                    <div className="flex items-center gap-3 pl-4">
                        <div className="text-right hidden sm:block">
                            <p className="text-[13px] font-bold text-gray-800 dark:text-white leading-none">Jothum Thomas</p>
                            <p className="text-[10px] text-gray-500 font-medium mt-1">Administrator</p>
                        </div>
                        <div className="w-10 h-10 rounded-full bg-[#4A3AFF]/10 flex items-center justify-center text-[#4A3AFF] font-bold text-sm">
                            JT
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default AppHeader;
