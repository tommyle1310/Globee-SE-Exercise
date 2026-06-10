import React from 'react';
import { useAuthStore } from '@/stores/useAuthStore'; 
import { logout as logoutApi } from '@/features/auth/services/auth.service';
import Header from '../Header';
import { useNavigate } from 'react-router';

interface AppLayoutProps {
  children: React.ReactNode;
}

const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
  const user = useAuthStore((state) => state.user);
  const logoutStore = useAuthStore((state) => state.logout);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logoutApi();
    } catch (error) {
      console.error('Logout API failed:', error);
    } finally {
      logoutStore();
      navigate('/login');
    }
  };

  const handleLoginRedirect = () => {
    navigate('/login');
  };

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
    <Header
      isLoggedIn={isLoggedIn}
      userName={user?.name ?? null}
      logout={handleLogout}
      handleLoginRedirect={handleLoginRedirect}
    />

      <main className="flex-1 p-6">
        {children}
      </main>
    </div>
  );
};

export default AppLayout;