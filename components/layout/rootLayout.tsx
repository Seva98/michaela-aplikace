import '../../app/globals.css';
import { Merriweather_Sans } from 'next/font/google';
import Footer from './footer';
import Navbar from './navbar';
import { UserProvider } from '@auth0/nextjs-auth0/client';
import { getSession } from '@auth0/nextjs-auth0';
import { getUserByEmail } from '@/db/users/getUsers';
import { cn } from '@/utils/cn';
import Unauthorized from '@/app/unauthorized';
import PopupMenu from '@/app/popupMenu';
import { isAdmin } from '@/utils/roles';

export const metadata = {
  title: 'Michaela Ševčík - Osobní trénink, Plzeň',
  description: 'Osobní trenér Plzeň',
};

const merriweather = Merriweather_Sans({
  subsets: ['latin-ext'],
  variable: '--font-merriweather',
  display: 'swap',
});

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const session = await getSession();
  const user = await getUserByEmail(session?.user.email);

  return (
    <html lang="en">
      <UserProvider>
        <body className={cn(merriweather.className)}>
          <Navbar adminPadding={isAdmin(session)} />
          <main className="min-h-screen-w-header">
            {user || !isAdmin(session) ? children : <Unauthorized />}
            {isAdmin(session) && <PopupMenu className="absolute top-0 right-4" />}
          </main>
          <Footer />
        </body>
      </UserProvider>
    </html>
  );
}
