import Section from '@/components/containers/section';
import { getSession } from '@auth0/nextjs-auth0';
import { isAdmin } from '@/utils/roles';
import { redirect } from 'next/navigation';

export default async function Home() {
  const session = await getSession();

  if (isAdmin(session)) {
    return (
      <Section className="relevant" title="Plánování termínů">
        TEST
      </Section>
    );
  }

  redirect('/profile');
}
