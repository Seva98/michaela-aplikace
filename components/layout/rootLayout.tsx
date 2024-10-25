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
import { getOwnerByEmail } from '@/db/owners/getOwner';
import { AdminMenu } from './adminMenu';

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
  const owner = await getOwnerByEmail(session?.user.email);

  return (
    <html lang="en">
      <UserProvider>
        <body className={cn(merriweather.className, 'flex')}>
          <div className="flex-1 flex flex-col min-h-screen">
            <Navbar />
            {isAdmin(session) && <AdminMenu />}
            <main className="min-h-screen-w-header flex-grow">{user || owner ? children : <Unauthorized />}</main>
            <Footer />
          </div>
        </body>
      </UserProvider>
    </html>
  );
}
