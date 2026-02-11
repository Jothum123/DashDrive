import {
    ChevronDown,
    DollarSign,
    Globe,
    LayoutDashboard,
    MoreHorizontal,
    Settings,
    ShieldCheck,
    Users as UsersIcon,
    Zap
} from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useSidebar } from "../../../context/SidebarContext";

type NavItem = {
    name: string;
    icon: any;
    path?: string;
    subItems?: { name: string; path: string; }[];
};

const navItems: NavItem[] = [
    {
        name: "Marketplace Health",
        icon: LayoutDashboard,
        path: "/",
    },
    {
        name: "Driver Fleet",
        icon: UsersIcon,
        path: "/users",
    },
    {
        name: "Rider Base",
        icon: ShieldCheck,
        path: "/negotiation",
    },
    {
        name: "Verification Center",
        icon: ShieldCheck,
        path: "/verification",
    },
    {
        name: "Transactions",
        icon: DollarSign,
        path: "/financials",
    },
    {
        name: "Territories",
        icon: Globe,
        path: "/geofencing",
    },
];

const othersItems: NavItem[] = [
    {
        name: "Fare Strategy",
        icon: Zap,
        path: "/fare-control",
    },
    {
        name: "System Settings",
        icon: Settings,
        path: "/settings",
    },
];

const AppSidebar: React.FC = () => {
    const { isExpanded, isMobileOpen, isHovered, setIsHovered } = useSidebar();
    const location = useLocation();

    const [openSubmenu, setOpenSubmenu] = useState<{
        type: "main" | "others";
        index: number;
    } | null>(null);
    const [subMenuHeight, setSubMenuHeight] = useState<Record<string, number>>({});
    const subMenuRefs = useRef<Record<string, HTMLDivElement | null>>({});

    const isActive = useCallback(
        (path: string) => location.pathname === path,
        [location.pathname]
    );

    useEffect(() => {
        let submenuMatched = false;
        ["main", "others"].forEach((menuType) => {
            const items = menuType === "main" ? navItems : othersItems;
            items.forEach((nav, index) => {
                if (nav.subItems) {
                    nav.subItems.forEach((subItem) => {
                        if (isActive(subItem.path)) {
                            setOpenSubmenu({
                                type: menuType as "main" | "others",
                                index,
                            });
                            submenuMatched = true;
                        }
                    });
                }
            });
        });

        if (!submenuMatched) {
            // setOpenSubmenu(null);
        }
    }, [location, isActive]);

    useEffect(() => {
        if (openSubmenu !== null) {
            const key = `${openSubmenu.type}-${openSubmenu.index}`;
            if (subMenuRefs.current[key]) {
                setSubMenuHeight((prevHeights) => ({
                    ...prevHeights,
                    [key]: subMenuRefs.current[key]?.scrollHeight || 0,
                }));
            }
        }
    }, [openSubmenu]);

    const handleSubmenuToggle = (index: number, menuType: "main" | "others") => {
        setOpenSubmenu((prevOpenSubmenu) => {
            if (
                prevOpenSubmenu &&
                prevOpenSubmenu.type === menuType &&
                prevOpenSubmenu.index === index
            ) {
                return null;
            }
            return { type: menuType, index };
        });
    };

    const renderMenuItems = (items: NavItem[], menuType: "main" | "others") => (
        <ul className="flex flex-col gap-2">
            {items.map((nav, index) => (
                <li key={nav.name}>
                    {nav.subItems ? (
                        <button
                            onClick={() => handleSubmenuToggle(index, menuType)}
                            className={`menu-item group ${openSubmenu?.type === menuType && openSubmenu?.index === index
                                ? "menu-item-active"
                                : "menu-item-inactive"
                                } cursor-pointer ${!isExpanded && !isHovered
                                    ? "lg:justify-center"
                                    : "lg:justify-start"
                                }`}
                        >
                            <span
                                className={`flex items-center justify-center shrink-0 ${openSubmenu?.type === menuType && openSubmenu?.index === index
                                    ? "text-brand-500 dark:text-brand-400"
                                    : "text-gray-500 group-hover:text-gray-700 dark:text-gray-400 dark:group-hover:text-gray-300"
                                    }`}
                            >
                                <nav.icon size={20} />
                            </span>
                            {(isExpanded || isHovered || isMobileOpen) && (
                                <>
                                    <span className="flex-1 text-left ml-3 text-[13px] font-uber-bold tracking-tight">
                                        {nav.name}
                                    </span>
                                    <ChevronDown
                                        size={16}
                                        className={`ml-auto transition-transform duration-200 ${openSubmenu?.type === menuType &&
                                            openSubmenu?.index === index
                                            ? "rotate-180 text-brand-500"
                                            : ""
                                            }`}
                                    />
                                </>
                            )}
                        </button>
                    ) : (
                        nav.path && (
                            <Link
                                to={nav.path}
                                className={`menu-item group ${isActive(nav.path) ? "menu-item-active" : "menu-item-inactive"
                                    }`}
                            >
                                <span
                                    className={`flex items-center justify-center shrink-0 ${isActive(nav.path)
                                        ? "text-brand-500 dark:text-brand-400"
                                        : "text-gray-500 group-hover:text-gray-700 dark:text-gray-400 dark:group-hover:text-gray-300"
                                        }`}
                                >
                                    <nav.icon size={20} />
                                </span>
                                {(isExpanded || isHovered || isMobileOpen) && (
                                    <span className="ml-3 text-[13px] font-uber-bold tracking-tight">
                                        {nav.name}
                                    </span>
                                )}
                            </Link>
                        )
                    )}
                    {nav.subItems && (isExpanded || isHovered || isMobileOpen) && (
                        <div
                            ref={(el) => {
                                subMenuRefs.current[`${menuType}-${index}`] = el;
                            }}
                            className="overflow-hidden transition-all duration-300"
                            style={{
                                height:
                                    openSubmenu?.type === menuType && openSubmenu?.index === index
                                        ? `${subMenuHeight[`${menuType}-${index}`]}px`
                                        : "0px",
                            }}
                        >
                            <ul className="mt-1 space-y-1 ml-9 border-l border-gray-100 dark:border-zinc-800">
                                {nav.subItems.map((subItem) => (
                                    <li key={subItem.name}>
                                        <Link
                                            to={subItem.path}
                                            className={`menu-dropdown-item pl-4 ${isActive(subItem.path)
                                                ? "menu-dropdown-item-active"
                                                : "menu-dropdown-item-inactive"
                                                } text-[12px]`}
                                        >
                                            {subItem.name}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </li>
            ))}
        </ul>
    );

    return (
        <aside
            className={`fixed flex flex-col top-0 left-0 bg-white dark:bg-zinc-950 h-screen transition-all duration-300 ease-in-out z-50 border-r border-gray-200 dark:border-zinc-900 
262:         ${isExpanded || isMobileOpen || isHovered
                    ? "w-[290px]"
                    : "w-[90px]"
                }
266:         ${isMobileOpen ? "translate-x-0" : "-translate-x-full"}
267:         lg:translate-x-0`}
            onMouseEnter={() => !isExpanded && setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div
                className={`py-8 px-6 flex items-center transition-all duration-300 ${!isExpanded && !isHovered ? "lg:justify-center px-0" : "justify-start"
                    }`}
            >
                <Link to="/" className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-brand-500 flex items-center justify-center shrink-0 shadow-lg shadow-brand-500/20">
                        <Zap className="text-white" size={20} strokeWidth={2.5} />
                    </div>
                    {(isExpanded || isHovered || isMobileOpen) && (
                        <div className="overflow-hidden whitespace-nowrap">
                            <h1 className="text-xl font-bold text-gray-800 dark:text-white tracking-tight">inDrive <span className="text-primary font-black ml-1">HQ</span></h1>
                            <p className="text-[10px] font-medium text-gray-500 uppercase tracking-widest opacity-80 pl-0.5">
                                Fleet Console
                            </p>
                        </div>
                    )}
                </Link>
            </div>

            <div className="flex flex-col flex-1 overflow-y-auto px-4 duration-300 ease-linear no-scrollbar">
                <nav className="mb-6">
                    <div className="flex flex-col gap-6">
                        <div>
                            {renderMenuItems(navItems, "main")}
                        </div>
                        {othersItems.length > 0 && (
                            <div>
                                <h2
                                    className={`mb-4 px-3 text-[10px] font-black uppercase text-gray-400 tracking-[0.2em] ${!isExpanded && !isHovered
                                        ? "lg:justify-center px-0 flex"
                                        : "justify-start"
                                        }`}
                                >
                                    {isExpanded || isHovered || isMobileOpen ? (
                                        "Management"
                                    ) : (
                                        <MoreHorizontal size={16} />
                                    )}
                                </h2>
                                {renderMenuItems(othersItems, "others")}
                            </div>
                        )}
                    </div>
                </nav>
            </div>

            {(isExpanded || isHovered || isMobileOpen) && (
                <div className="p-6 border-t border-gray-100 dark:border-zinc-900 mt-auto">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-zinc-800 border-2 border-primary/20 flex items-center justify-center overflow-hidden">
                                <div className="w-full h-full bg-emerald-500/10 flex items-center justify-center">
                                    <UsersIcon size={20} className="text-primary opacity-50" />
                                </div>
                            </div>
                            <div>
                                <p className="text-sm font-uber-bold dark:text-white leading-none">Alex Rivera</p>
                                <p className="text-[10px] text-gray-500 font-medium mt-1">Senior Operations</p>
                            </div>
                        </div>
                        <button className="p-2 hover:bg-gray-100 dark:hover:bg-zinc-900 rounded-lg transition-colors text-gray-400">
                            <Settings size={18} />
                        </button>
                    </div>
                </div>
            )}
        </aside>
    );
};

export default AppSidebar;
