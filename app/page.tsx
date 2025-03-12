'use client';

import {
  UserGroupIcon,
  DocumentDuplicateIcon,
} from '@heroicons/react/24/outline';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from "clsx";

const links = [
  {
    name: 'Chat',
    href: '/chat',
    icon: UserGroupIcon,
  },
  {
    name: 'Recipes',
    href: '/recipes',
    icon: DocumentDuplicateIcon,
  },
];

export default function MainPage() {
  const pathname = usePathname();

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-3xl font-bold mb-6">Welcome to the Recipe Hub! 🍽️</h1>
      <p className="text-lg mb-4">What would you like to do?</p>
      <div className="flex flex-col gap-4">
        {links.map((link) => {
          const LinkIcon = link.icon;
          return (
            <Link
              key={link.name}
              href={link.href}
              className={clsx(
                'flex items-center justify-center gap-2 rounded-lg px-6 py-3 text-lg font-semibold transition-all duration-300 shadow-md',
                'hover:scale-105',
                pathname === link.href
                  ? 'bg-[var(--accent)] text-[var(--background)]'
                  : 'bg-[var(--foreground)] text-[var(--background)]'
              )}
            >
              <LinkIcon className="w-6" />
              <span>{link.name}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
