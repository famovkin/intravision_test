import type { Metadata } from 'next';
import { Roboto, Ubuntu } from 'next/font/google';
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
    <html lang="ru">
      <body className={`${roboto.variable} ${ubuntu.variable}`}>
        {children}
      </body>
    </html>
  );
}
