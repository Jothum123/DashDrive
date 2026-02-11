import { Outlet } from "react-router-dom";
import { SidebarProvider, useSidebar } from "../../../context/SidebarContext";
import AppSidebar from "./AppSidebar";
import Backdrop from "./Backdrop";
import { TopBar } from "./TopBar";

const LayoutContent: React.FC = () => {
    const { isExpanded, isHovered, isMobileOpen } = useSidebar();

    return (
        <div className="min-h-screen xl:flex bg-white dark:bg-zinc-950 text-gray-900 dark:text-white font-uber">
            <div>
                <AppSidebar />
                <Backdrop />
            </div>
            <div
                className={`flex-1 transition-all duration-300 ease-in-out ${isExpanded || isHovered ? "lg:ml-[290px]" : "lg:ml-[90px]"
                    } ${isMobileOpen ? "ml-0" : ""}`}
            >
                <TopBar />
                <div className="p-8 mx-auto max-w-[1600px] min-h-[calc(100vh-64px)]">
                    <Outlet />
                </div>
            </div>
        </div>
    );
};

const AppLayout: React.FC = () => {
    return (
        <SidebarProvider>
            <LayoutContent />
        </SidebarProvider>
    );
};

export default AppLayout;
