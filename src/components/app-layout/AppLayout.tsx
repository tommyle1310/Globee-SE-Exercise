import React from 'react';
import { useAuthStore } from '@/stores/useAuthStore'; 
import { Button } from '@/components/ui/button'; 
import Header from '../Header';

interface AppLayoutProps {
  children: React.ReactNode;
}

const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
  const logout = useAuthStore((state) => state.logout);

  const handleLoginRedirect = () => {
    console.log('Redirect to login page');
  };

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
    <Header
      isLoggedIn={isLoggedIn}
      logout={logout}
      handleLoginRedirect={handleLoginRedirect}
    />

      <main className="flex-1 p-6">
        {children}
      </main>
    </div>
  );
};

export default AppLayout;