import './globals.css';

import Header from '@/layout/Header';
// eslint-disable-next-line import/no-unresolved
import { montserrat } from '@/lib/fonts';
import JotaiProvider from '@/lib/providers/JotaiProvider';

import Footer from './components/Footer';

export const metadata = {
  title: 'The Huns',
  description: 'Huns-Esport',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={montserrat.className}>
      <body suppressHydrationWarning>
        <JotaiProvider>
          <Header />
          {children}
          <Footer />
        </JotaiProvider>
      </body>
    </html>
  );
}
