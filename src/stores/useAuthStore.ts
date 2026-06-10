import { create } from 'zustand';

// 1. Định nghĩa kiểu dữ liệu cho User (có thể clear hơn tùy backend của bạn)
interface User {
  id: string;
  email: string;
  name?: string;
}

// 2. Định nghĩa State và Actions của Store
interface AuthState {
  isLoggedIn: boolean;
  user: User | null;
  login: (userData: User, token: string) => void;
  logout: () => void;
}

// 3. Khởi tạo Store
export const useAuthStore = create<AuthState>((set) => ({
  // Trạng thái ban đầu
  isLoggedIn: !!localStorage.getItem('access_token'), // Tự động check nếu đã có token từ trước
  user: null,

  // Hành động khi login thành công
  login: (userData, token) => {
    localStorage.setItem('access_token', token);
    set({ isLoggedIn: true, user: userData });
  },

  // Hành động khi logout
  logout: () => {
    localStorage.removeItem('access_token');
    set({ isLoggedIn: false, user: null });
  },
}));