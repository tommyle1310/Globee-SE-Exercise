import { create } from 'zustand';

// Định nghĩa State và Actions của Store khớp với LoginResponse
interface AuthState {
  isLoggedIn: boolean;
  email: string | null;
  login: (email: string, accessToken: string, refreshToken: string) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  isLoggedIn: !!localStorage.getItem('accessToken'), 
  email: localStorage.getItem('userEmail'),
  
  login: (email, accessToken, refreshToken) => {
    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('refreshToken', refreshToken);
    localStorage.setItem('userEmail', email);
    
    set({ 
      isLoggedIn: true, 
      email: email 
    });
  },

  logout: () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('userEmail');
    
    set({ 
      isLoggedIn: false, 
      email: null 
    });
  },
}));