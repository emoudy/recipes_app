import '@/lib/styles/main.scss';
import { inter } from '@/lib/styles/utils/fonts';
import QueryProvider from "@/lib/providers/QueryProvider";
import Footer from './ui/Footer';

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
          </div>
          <Footer />
        </body>
      </QueryProvider>
    </html>
  );
}
