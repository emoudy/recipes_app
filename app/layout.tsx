import './ui/styles/globals.css';
import Footer from '@/components/Footer';
import { inter } from './ui/styles/fonts';

export const metadata = {
  title: 'Recipe AI Chat',
  description: 'Save, explore, and manage your favorite recipes with AI assistance.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.className}>
      <body className={`${inter.className} antialiased`}>
        <div className="flex flex-col min-h-screen">
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}