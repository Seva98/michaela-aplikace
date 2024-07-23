import Section from '@/components/containers/section';
import Typography from '@/components/ui/typography';
import { getUserByEmail } from '@/db/users/getUsers';
import { getSession } from '@auth0/nextjs-auth0';
import Bookings from './bookings';
import { Button } from '@/components/ui/button';
import { PlusIcon } from '@radix-ui/react-icons';
import EditUser from '@/components/user/editUser';

export default async function Home() {
  const session = await getSession();
  const user = await getUserByEmail(session?.user.email);

  return (
    <Section className="relevant">
      <Typography variant="h1">Rezervace</Typography>
      <Bookings />
      <EditUser action="create">
        <Button variant="outline" className="rounded-full p-0 h-12 w-12 shadow-lg border-gray-100 absolute top-4 right-4">
          <PlusIcon className="scale-150" />
        </Button>
      </EditUser>
    </Section>
  );
}
