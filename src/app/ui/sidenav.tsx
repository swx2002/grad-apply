'use client';

import Link from 'next/link';
import { HomeIcon, DocumentDuplicateIcon, UserGroupIcon } from '@heroicons/react/24/outline';
import { useState } from 'react';
import { UserCircleIcon } from '@heroicons/react/20/solid';
import { signOut, useSession } from 'next-auth/react';
import { useEffect, useRef } from 'react';
import RegisterForm from './register-form';
const links = [
  { name: 'Dashboard', href: '/dashboard', icon: HomeIcon },
  { name: 'Application', href: '/dashboard/application', icon: DocumentDuplicateIcon },
  { name: 'Letters', href: '/dashboard/letters', icon: UserGroupIcon },
  { name: 'Essays', href: '/dashboard/essays', icon: DocumentDuplicateIcon},
];
export default function Sidenav() {
    const [showLogout, setShowLogout] = useState(false);
    const {data: session, status} = useSession();
    const logoutRef = useRef<HTMLDivElement>(null);
    const handleSignOut = async () => {
        await signOut({redirect: false});
        window.location.href = '/'; 
      };    
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
          if (logoutRef.current && !logoutRef.current.contains(event.target as Node)) {
            setShowLogout(false);
          }
        }
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
          document.removeEventListener('mousedown', handleClickOutside);
        };
      }, []);
  return (
    <div className="flex h-full flex-col px-3 py-4 md:px-2">
      <Link
        className="mb-2 flex h-20 items-end justify-start rounded-md bg-blue-600 p-4 md:h-40"
        href="/"
      >
        <div className="w-32 text-white md:w-40">
          <p className="text-2xl font-bold">ApplyNow</p>
        </div>
      </Link>
      <div className="flex flex-col space-y-2 mt-4">
        {links.map((link) => {
          const LinkIcon = link.icon;
          return (
            <Link
              key={link.name}
              href={link.href}
              className="flex h-[48px] items-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600"
            >
              <LinkIcon className="w-6" />
              <span>{link.name}</span>
            </Link>
          );
        })}
      </div>
      {/* Show logged user icon */}
      {session &&(<div className="relative flex flex-row items-center justify-center" ref={logoutRef}>
        <button
          onClick={() => setShowLogout(!showLogout)}
          className="flex items-center w-full p-3 text-sm font-medium text-gray-700 rounded-md hover:bg-gray-100"
        >
          <UserCircleIcon className="w-10 h-10 text-gray-400 mr-2" />
          <span>{session?.user?.email}</span>
        </button>
        <p>{session?.user?.email}!</p>
        {showLogout && (
          <div className="absolute bottom-full left-0 w-full mb-2 bg-white border border-gray-200 rounded-md shadow-lg">
            <button
              onClick={handleSignOut}
              className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-gray-100"
            >
              Log out
            </button>
          </div>
        )}
        </div>
        )}
        {/* Show unlogged user panel */}
        {!session && (<div className='flex flex-row items-center justify-center'>
            <RegisterForm />
        </div>)}
    </div>
  );
}