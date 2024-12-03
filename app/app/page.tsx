import Section from '@/components/containers/section';
import Pricing from '@/components/homepage/pricing/pricing';
import { getOwnerByEmail } from '@/db/owners/getOwner';
import { getUserByEmail } from '@/db/users/getUsers';
import { auth0 } from '@/utils/auth0';
import { redirect } from 'next/navigation';

const Page = async () => {
  const session = await auth0.getSession();
  const user = await getUserByEmail(session?.user.email);
  const owner = await getOwnerByEmail(session?.user.email);

  return (
    <Section title="Neaktivní účet">
      <Pricing />
    </Section>
  );

  if (owner) redirect('/trainer');
  if (user) redirect('/user');
};

export default Page;
