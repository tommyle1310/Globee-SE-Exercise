import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useAuthStore } from "@/stores/useAuthStore";
import AppLayout from "@/components/app-layout/AppLayout"; // Đường dẫn đến file AppLayout của bạn
import LoginPage from "@/features/auth/pages/LoginPage";
import DashBoardPage from "@/features/dashboard/pages/DashboardPage";

export default function AppRouter() {
  // 1. Lấy trạng thái đăng nhập thực tế từ Zustand store
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);

  return (
    <BrowserRouter>
      {/* 2. Bọc toàn bộ Routes trong AppLayout để Header luôn hiển thị tương ứng */}
      <AppLayout>
        <Routes>
          {/* Mặc định vào trang chủ (/) sẽ điều hướng dựa theo trạng thái login */}
          <Route 
            path="/" 
            element={<Navigate to={isLoggedIn ? "/dashboard" : "/login"} replace />} 
          />

          {/* Giao diện Login: Nếu ĐÃ đăng nhập rồi thì không cho ở lại đây, đá qua dashboard */}
          <Route 
            path="/login" 
            element={!isLoggedIn ? <LoginPage /> : <Navigate to="/dashboard" replace />} 
          />

          {/* Giao diện Dashboard: Nếu CHƯA đăng nhập thì chặn lại, đá về trang login */}
          <Route 
            path="/dashboard" 
            element={isLoggedIn ? <DashBoardPage /> : <Navigate to="/login" replace />} 
          />

          {/* Fallback khi gõ bậy route không tồn tại */}
          <Route 
            path="*" 
            element={<Navigate to={isLoggedIn ? "/dashboard" : "/login"} replace />} 
          />
        </Routes>
      </AppLayout>
    </BrowserRouter>
  );
}