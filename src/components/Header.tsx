import { Button } from './ui/button'

interface HeaderProps {
  isLoggedIn: boolean;
  userName: string | null;
  logout: () => void;
  handleLoginRedirect: () => void;
}

const Header = ({ isLoggedIn, userName, logout, handleLoginRedirect }: HeaderProps) => {
  return (
      <header className="border-b bg-card px-6 py-4 flex items-center justify-between">
        <h1 className="text-xl font-bold tracking-tight">Beer2Bee</h1>
        
        <div className="flex items-center gap-4">
          {isLoggedIn ? (
            <>
              {userName && (
                <span className="text-sm text-muted-foreground">
                  Welcome, <span className="font-medium text-foreground">{userName}</span>
                </span>
              )}
              <Button variant="destructive" onClick={logout} size="sm">
                Logout
              </Button>
            </>
          ) : (
            <Button variant="default" onClick={handleLoginRedirect} size="sm">
              Login
            </Button>
          )}
        </div>
      </header>
  )
}

export default Header