'use client';

import Link from 'next/link';
import { HomeIcon, DocumentDuplicateIcon, UserGroupIcon } from '@heroicons/react/24/solid';
import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { useEffect, useRef } from 'react';

const navigationItems = [
  { name: 'Dashboard', href: '/dashboard', icon: HomeIcon },
  { name: 'Application', href: '/dashboard/application', icon: DocumentDuplicateIcon },
  { name: 'Letters', href: '/dashboard/letters', icon: UserGroupIcon },
  { name: 'Essays', href: '/dashboard/essays', icon: DocumentDuplicateIcon},
];

function Logo(){
  return (
    <Link
      className="mb-2 flex items-end justify-start bg-white p-4"
      href="/"
    > 
      <div className = "bg-theme-color rounded-full w-10 h-10 flex items-center justify-center pr-3">
      </div>
        <p className="text-2xl font-bold text-text-color pl-3">GradApply</p>
    </Link>
  )
}

function NavigationItems(){
  return (
    <div className="flex flex-col space-y-2 mt-4">
        {navigationItems.map((item) => {
          const LinkIcon = item.icon;
          return (
            <Link
              key={item.name}
              href={item.href}
              className="flex h-[48px] items-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-bold text-text-color hover:bg-theme-color hover:text-white"
            >
              <LinkIcon className="w-6" />
              <span>{item.name}</span>
            </Link>
          );
        })}
      </div>)
}

export default function Sidenav() {
    const [isLogoutVisible, setIsLogoutVisible] = useState(false);
    const {data: session, status} = useSession();
    const logoutRef = useRef<HTMLDivElement>(null);   

    /* Handle click outside of logout button to hide it */


  return (
    <div className="flex h-full flex-col px-3 py-4 md:px-2 bg-white">
      <Logo />
      <NavigationItems />
    </div>
  );
}