import React from 'react';
import { useAuthStore } from '@/stores/useAuthStore'; 
import { Button } from '@/components/ui/button'; 

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
      <header className="border-b bg-card px-6 py-4 flex items-center justify-between">
        <h1 className="text-xl font-bold tracking-tight">My Application</h1>
        
        {isLoggedIn ? (
          <Button variant="destructive" onClick={logout} size="sm">
            Logout
          </Button>
        ) : (
          <Button variant="default" onClick={handleLoginRedirect} size="sm">
            Login
          </Button>
        )}
      </header>

      <main className="flex-1 p-6">
        {children}
      </main>
    </div>
  );
};

export default AppLayout;