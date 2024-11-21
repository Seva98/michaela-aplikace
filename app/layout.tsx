import './globals.css';
import { Merriweather_Sans } from 'next/font/google';
import { getUserByEmail } from '@/db/users/getUsers';
import { cn } from '@/utils/cn';
import { getOwnerByEmail } from '@/db/owners/getOwner';
import { auth0 } from '@/utils/auth0';
import Navbar from '@/components/layout/navbar';
import Footer from '@/components/layout/footer';
import NavbarTitle from '@/components/layout/navbarTitle';
import NavbarLinks from '@/components/layout/navbarLinks';

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
  const session = await auth0.getSession();
  const user = await getUserByEmail(session?.user.email);
  const owner = await getOwnerByEmail(session?.user.email);

  return (
    <html lang="en">
      <body className={cn(merriweather.className, 'flex')}>
        <div className="flex-1 flex flex-col min-h-screen">
          <Navbar titleComponent={<NavbarTitle />} linksComponent={<NavbarLinks />} />
          {children}
          <Footer />
        </div>
      </body>
    </html>
  );
}
