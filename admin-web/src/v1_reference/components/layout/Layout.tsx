import { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import { useAdminStore } from '../../../stores/adminStore';
import { Sidebar } from './Sidebar';

export function Layout() {
    const [collapsed, setCollapsed] = useState(false);
    const { simulateMovement } = useAdminStore();

    useEffect(() => {
        const interval = setInterval(() => {
            simulateMovement();
        }, 3000);
        return () => clearInterval(interval);
    }, [simulateMovement]);

    return (
        <div className="min-h-screen bg-black flex transition-all duration-300">
            <Sidebar collapsed={collapsed} onToggle={() => setCollapsed(!collapsed)} />

            <main className={`flex-1 flex flex-col min-w-0 transition-all duration-300 ${collapsed ? 'ml-20' : 'ml-72'
                }`}>
                <div className="flex-1 flex flex-col w-full max-w-[1600px] mx-auto">
                    <Outlet />
                </div>
            </main>
        </div>
    );
}
