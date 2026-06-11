import { useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import AppLayout from "@/components/app-layout/AppLayout"; 
import LoginPage from "@/features/auth/pages/LoginPage";
import DashBoardPage from "@/features/dashboard/pages/DashboardPage";
import NotFoundPage from "@/features/error/pages/NotFoundPage";
import { useAuthStore } from "@/stores/useAuthStore";
import { getMe } from "@/features/auth/services/auth.service";

export default function AppRouter() {
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
  const isChecking = useAuthStore((state) => state.isChecking);
  const loginStore = useAuthStore((state) => state.login);
  const logoutStore = useAuthStore((state) => state.logout);
  const setChecking = useAuthStore((state) => state.setChecking);

  useEffect(() => {
    const checkSession = async () => {
      try {
        const userData = await getMe();
        loginStore(userData);
      } catch (error) {
        logoutStore();
      } finally {
        setChecking(false);
      }
    };
    checkSession();
  }, [loginStore, logoutStore, setChecking]);

  if (isChecking) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-background text-foreground">
        <div className="flex flex-col items-center gap-4">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-primary border-t-transparent" />
          <p className="text-sm font-semibold tracking-wide text-muted-foreground animate-pulse">
            Verifying session...
          </p>
        </div>
      </div>
    );
  }

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
            element={<NotFoundPage />} 
          />
        </Routes>
      </AppLayout>
    </BrowserRouter>
  );
}