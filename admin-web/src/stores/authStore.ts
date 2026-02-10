import { create } from 'zustand';

export interface AdminUser {
    id: string;
    email: string;
    name: string;
    role: 'super_admin' | 'admin' | 'moderator';
    avatar?: string;
}

interface AuthState {
    user: AdminUser | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
    logout: () => void;
    checkSession: () => void;
}

// Mock admin credentials
const MOCK_ADMINS = [
    {
        id: 'admin-001',
        email: 'admin@dashdrive.com',
        password: 'admin123',
        name: 'System Admin',
        role: 'super_admin' as const,
    },
    {
        id: 'admin-002',
        email: 'moderator@dashdrive.com',
        password: 'mod123',
        name: 'Content Moderator',
        role: 'moderator' as const,
    },
];

export const useAuthStore = create<AuthState>((set) => ({
    user: null,
    isAuthenticated: false,
    isLoading: true,

    login: async (email: string, password: string) => {
        // Simulate network delay
        await new Promise((resolve) => setTimeout(resolve, 800));

        const admin = MOCK_ADMINS.find(
            (a) => a.email.toLowerCase() === email.toLowerCase() && a.password === password
        );

        if (admin) {
            const { password: _, ...userWithoutPassword } = admin;
            set({
                user: userWithoutPassword,
                isAuthenticated: true,
                isLoading: false,
            });
            localStorage.setItem('adminSession', JSON.stringify(userWithoutPassword));
            return { success: true };
        }

        return { success: false, error: 'Invalid email or password' };
    },

    logout: () => {
        localStorage.removeItem('adminSession');
        set({
            user: null,
            isAuthenticated: false,
            isLoading: false,
        });
    },

    checkSession: () => {
        const session = localStorage.getItem('adminSession');
        if (session) {
            try {
                const user = JSON.parse(session);
                set({ user, isAuthenticated: true, isLoading: false });
            } catch {
                set({ isLoading: false });
            }
        } else {
            set({ isLoading: false });
        }
    },
}));
