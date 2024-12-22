import {create} from 'zustand';

export const useAuthStore = create((set) => ({
    user: null,
    role: "user", 
    setUser: (user) => set({ user }),
    setRole: (role) => set({ role }), 
}));