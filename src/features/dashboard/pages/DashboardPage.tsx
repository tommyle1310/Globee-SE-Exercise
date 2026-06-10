import { useEffect, useState } from 'react'
import { getMe } from '@/features/auth/services/auth.service'
import { useAuthStore } from '@/stores/useAuthStore'

const DashboardPage = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const user = useAuthStore((state) => state.user);
  const setUser = useAuthStore((state) => state.setUser);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userData = await getMe();
        setUser(userData);
      } catch (err) {
        console.error('Failed to fetch user:', err);
        setError('Failed to load user info');
      } finally {
        setLoading(false);
      }
    };

    if (!user) {
      fetchUser();
    } else {
      setLoading(false);
    }
  }, [user, setUser]);

  return (
    <div className="flex flex-col gap-6">
      <div className="rounded-lg border bg-card p-6 shadow-sm">
        <h2 className="text-lg font-semibold mb-4">User Information</h2>
        {loading ? (
          <p className="text-muted-foreground">Loading...</p>
        ) : error ? (
          <p className="text-destructive">{error}</p>
        ) : user ? (
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-muted-foreground">ID</p>
              <p className="font-medium">{user.id}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Name</p>
              <p className="font-medium">{user.name}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Email</p>
              <p className="font-medium">{user.email}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Status</p>
              <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${user.status === 'ACTIVE'
                ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                }`}>
                {user.status}
              </span>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  )
}

export default DashboardPage