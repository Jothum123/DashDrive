import { create } from 'zustand';

export type UserRole = 'owner' | 'manager' | 'staff';

interface UserProfile {
    id: string;
    role: UserRole;
    name: string;
}

interface AuthState {
    user: UserProfile | null;
    setUser: (user: UserProfile | null) => void;
    hasRole: (roles: UserRole[]) => boolean;
}

export const useAuthStore = create<AuthState>((set, get) => ({
    // Mocking a manager user for demo purposes
    user: {
        id: 'manager_01',
        role: 'manager',
        name: 'Jothum Manager',
    },
    setUser: (user) => set({ user }),
    hasRole: (roles) => {
        const user = get().user;
        if (!user) return false;
        return roles.includes(user.role);
    },
}));
