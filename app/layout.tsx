'use client'

import '@/lib/ui/styles/main.scss';
import Footer from '@/components/Footer';
import { inter } from '@/lib/ui/styles/utils/fonts';
import QueryProvider from "@/lib/providers/QueryProvider";

export const metadata = {
  title: 'Recipe AI Chat',
  description: 'Save, explore, and manage your favorite recipes with AI assistance.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {

  return (
    <html lang="en" className={inter.className}>
      <QueryProvider>
        <body className="antialiased theme-light dark:theme-dark">
          <div className="flex flex-col min-h-screen">
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
        </body>
      </QueryProvider>
    </html>
  );
}
