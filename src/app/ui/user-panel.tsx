'use client';

import { UserCircleIcon } from '@heroicons/react/24/solid';
import { LogoutButton } from './logout-button';
import { useSession } from 'next-auth/react';
import { useEffect, useRef, useState } from 'react';
export default function UserPanel() {
    const {data: session, status} = useSession();
    const logoutRef = useRef<HTMLDivElement>(null); 
    const [isLogoutVisible, setIsLogoutVisible] = useState(false);
    useEffect(() => {
      function handleClickOutside(event: MouseEvent) {
        if (logoutRef.current && !logoutRef.current.contains(event.target as Node)) {
          setIsLogoutVisible(false);
        }
      }
      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }, []);
    return (
        <div>
            {status === 'authenticated' &&(<div className="relative flex flex-row items-center justify-center" ref={logoutRef}>
        <button
          onClick={() => setIsLogoutVisible(!isLogoutVisible)}
          className="flex items-center w-full p-3 text-sm font-medium text-gray-700 rounded-md hover:bg-gray-100"
        >
          <UserCircleIcon className="w-10 h-10 text-gray-400 mr-2" />
          <span className="text-text-color">{session?.user?.email}</span>
        </button>
        {/* <p>{session?.user?.email}!</p> */}
        {isLogoutVisible && (
          <div className="absolute bottom-full left-0 w-full mb-2 bg-white border border-gray-200 rounded-md shadow-lg">
            <LogoutButton />
          </div>
        )}
        </div>
        )}
        {/* Show unlogged user panel */}
        {status === 'unauthenticated' && (<div className='flex flex-row items-center justify-center'>
          <p> No user logged in</p>
        </div>)}
        </div>
    );
  }