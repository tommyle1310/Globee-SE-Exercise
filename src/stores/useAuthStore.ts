import { create } from 'zustand';
import type { User } from '@/features/auth/services/auth.service';

interface AuthState {
  isLoggedIn: boolean;
  isChecking: boolean;
  user: User | null;
  login: (user: User) => void;
  logout: () => void;
  setUser: (user: User) => void;
  setChecking: (isChecking: boolean) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  isLoggedIn: !!localStorage.getItem('isLoggedIn'),
  isChecking: true,
  user: null,

  login: (user) => {
    localStorage.setItem('isLoggedIn', 'true');
    set({
      isLoggedIn: true,
      user,
    });
  },

  logout: () => {
    localStorage.removeItem('isLoggedIn');
    set({
      isLoggedIn: false,
      user: null,
    });
  },

  setUser: (user) => {
    set({ user });
  },

  setChecking: (isChecking) => {
    set({ isChecking });
  },
}));