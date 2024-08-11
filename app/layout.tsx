import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { UserProvider } from '@auth0/nextjs-auth0/client';
import { getSession } from '@auth0/nextjs-auth0';
import { redirect } from 'next/navigation';
import { cn } from '@/utils/cn';
import PopupMenu from './popupMenu';
import { isAdmin } from '@/utils/roles';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getSession();
  // if (!session?.user) redirect('/api/auth/login');

  return (
    <html lang="en">
      <UserProvider>
        <body className={cn(inter.className)}>
          {children}
          {isAdmin(session) && <PopupMenu className="absolute top-4 right-4" />}
        </body>
      </UserProvider>
    </html>
  );
}
