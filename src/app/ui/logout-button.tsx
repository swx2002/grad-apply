import { signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export const LogoutButton = () => {
  const router = useRouter();
  const handleLogout = async () => {
    await signOut({redirect: false});
    sessionStorage.removeItem('isLoggedIn');
    sessionStorage.removeItem('userName');
    window.location.reload();
  }
  return <button onClick={handleLogout}>Logout</button>;
}