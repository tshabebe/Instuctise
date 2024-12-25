import type { Metadata } from 'next';
import './globals.css';
import { TRPCProvider } from '@/lib/trpc/client';
import { GeistSans } from 'geist/font/sans';
import { ThemeProvider } from '@/provider/theme.provider';

export const metadata: Metadata = {
  title: 'Instructise',
  description: 'Personalized Boarding Platform for Instructors',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={GeistSans.className}>
        <TRPCProvider>
          <ThemeProvider
            attribute="class"
            enableSystem
            disableTransitionOnChange
            defaultTheme="dark"
          >
            {children}
          </ThemeProvider>
        </TRPCProvider>
      </body>
    </html>
  );
}
