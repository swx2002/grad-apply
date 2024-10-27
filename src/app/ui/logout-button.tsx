import { handleLogout } from '../services/auth-service';

export const LogoutButton = () => {
  return <button onClick={handleLogout} className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-gray-100">Logout</button>;
}