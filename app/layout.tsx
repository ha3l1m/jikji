import type {Metadata} from 'next';
import './globals.css'; // Global styles
import { I18nProvider } from '@/components/i18n-provider';
import { Inter } from 'next/font/google';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
});

export const metadata: Metadata = {
  title: 'JIKJI AI',
  description: 'Accelerate Your AI Solutions with N3N',
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en" className={`${inter.variable} dark`}>
      <body className="bg-black text-white antialiased font-sans selection:bg-white/30" suppressHydrationWarning>
        <I18nProvider>
          {children}
        </I18nProvider>
      </body>
    </html>
  );
}
