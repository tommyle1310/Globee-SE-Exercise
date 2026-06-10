import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import AppLayout from "@/components/app-layout/AppLayout"; 
import LoginPage from "@/features/auth/pages/LoginPage";
import DashBoardPage from "@/features/dashboard/pages/DashboardPage";
import { useAuthStore } from "@/stores/useAuthStore";

export default function AppRouter() {
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);

  return (
    <BrowserRouter>
      <AppLayout>
        <Routes>
          <Route 
            path="/" 
            element={<Navigate to={isLoggedIn ? "/dashboard" : "/login"} replace />} 
          />

          <Route 
            path="/login" 
            element={!isLoggedIn ? <LoginPage /> : <Navigate to="/dashboard" replace />} 
          />

          <Route 
            path="/dashboard" 
            element={isLoggedIn ? <DashBoardPage /> : <Navigate to="/login" replace />} 
          />

          <Route 
            path="*" 
            element={<Navigate to={isLoggedIn ? "/dashboard" : "/login"} replace />} 
          />
        </Routes>
      </AppLayout>
    </BrowserRouter>
  );
}