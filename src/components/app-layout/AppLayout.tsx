import React from 'react';
import { Button } from '../ui/button';

// Định nghĩa kiểu dữ liệu (interface) cho Props của Component
interface AppLayoutProps {
  children: React.ReactNode;
  isLoggedIn: boolean;
}

const AppLayout: React.FC<AppLayoutProps> = ({ children, isLoggedIn }) => {
  return (
    <div className="min-h-screen w-full flex flex-col bg-background text-foreground">
      {/* Nếu đã login thì render Header (thay giao diện Header của team bạn vào đây) */}
      {isLoggedIn && (
        <header className="border-b bg-card px-6 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-bold">My Application</h1>
            <Button variant="destructive" className='cursor-pointer'>Logout</Button>
          </div>
        </header>
      )}

      {/* Phần nội dung chính của từng trang (Dashboard, Profile, v.v.) */}
      <main className="flex-1 p-6">
        {children}
      </main>

      {/* Thêm Footer chung nếu team bạn cần */}
    </div>
  );
};

export default AppLayout;