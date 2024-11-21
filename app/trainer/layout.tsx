import { getUserByEmail } from '@/db/users/getUsers';
import Unauthorized from '@/app/trainer/unauthorized';
import { isAdmin } from '@/utils/roles';
import { getOwnerByEmail } from '@/db/owners/getOwner';
import { auth0 } from '@/utils/auth0';
import { AdminMenu } from '@/components/layout/adminMenu';

export const metadata = {
  title: 'Michaela Ševčík - Osobní trénink, Plzeň',
  description: 'Osobní trenér Plzeň',
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const session = await auth0.getSession();
  const user = await getUserByEmail(session?.user.email);
  const owner = await getOwnerByEmail(session?.user.email);

  return (
    <>
      {isAdmin(session) && <AdminMenu />}
      <main className="min-h-screen-w-header flex-grow">{user || owner ? children : <Unauthorized />}</main>
    </>
  );
}
