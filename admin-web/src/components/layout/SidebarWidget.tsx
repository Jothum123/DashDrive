import { LogOut } from "lucide-react";

export default function SidebarWidget() {
    return (
        <button
            className="flex items-center gap-3 w-full px-4 py-3 text-gray-500 hover:text-error-500 hover:bg-error-50 dark:text-gray-400 dark:hover:bg-error-500/10 transition-all rounded-xl font-bold text-sm mb-4"
        >
            <LogOut size={20} />
            <span>Sign Out</span>
        </button>
    );
}
