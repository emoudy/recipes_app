'use client';

import { links } from '@/lib/variables/links';
import LinkStyled from '@/app/ui/elements/LinkStyled';

export default function App() {
  const filteredLinks = links.filter((link) => link.name !== 'Home');
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-3xl font-bold mb-6">Welcome to the Recipe Hub! 🍽️</h1>
      <div className="flex flex-col gap-4">
        {filteredLinks.map((link) => {
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
