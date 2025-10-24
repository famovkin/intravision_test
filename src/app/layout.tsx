import type { Metadata } from 'next';
import { Roboto, Ubuntu } from 'next/font/google';

import Navbar from '@/components/Navbar/Navbar';
import Search from '@/components/Search/Search';
import StoreProvider from './StoreProvider';

import './globals.css';

const roboto = Roboto({
  variable: '--font-roboto',
  subsets: ['latin', 'cyrillic'],
});

const ubuntu = Ubuntu({
  variable: '--font-ubuntu',
  subsets: ['latin', 'cyrillic'],
  weight: ['300', '400', '500', '700'],
});

export const metadata: Metadata = {
  title: 'IntraVision',
  description: 'Тестовое задание в IntraVision',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <StoreProvider>
      <html lang="ru">
        <body className={`${roboto.variable} ${ubuntu.variable}`}>
          <Navbar />
          <main className="main">
            <Search />
            {children}
          </main>
        </body>
      </html>
    </StoreProvider>
  );
}
