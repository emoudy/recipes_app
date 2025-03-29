'use client';

import {
  UserGroupIcon,
  DocumentDuplicateIcon,
} from '@heroicons/react/24/outline';
import LinkStyled from './ui/elements/LinkStyled';

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
  

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-3xl font-bold mb-6">Welcome to the Recipe Hub! 🍽️</h1>
      <p className="text-lg mb-4">What would you like to do?</p>
      <div className="flex flex-col gap-4">
        {links.map((link) => {
          return (
            <LinkStyled
              key={link.name}
              type="primary"
              href={link.href}
              title={link.name}
              icon={<link.icon className="w-6 h-6" />}
            />
          );
        })}
      </div>
    </div>
  );
}
