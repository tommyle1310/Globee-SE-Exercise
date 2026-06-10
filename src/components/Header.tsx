import { Button } from './ui/button'

const Header = ({ isLoggedIn, logout, handleLoginRedirect }: { isLoggedIn: boolean; logout: () => void; handleLoginRedirect: () => void }) => {
  return (
      <header className="border-b bg-card px-6 py-4 flex items-center justify-between">
        <h1 className="text-xl font-bold tracking-tight">Beer2Bee</h1>
        
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
  )
}

export default Header