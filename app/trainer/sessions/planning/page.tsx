import Section from '@/components/containers/section';
import { auth0 } from '@/utils/auth0';
import { isAdmin } from '@/utils/roles';
import { redirect } from 'next/navigation';

export default async function Home() {
  const session = await auth0.getSession();

  if (isAdmin(session)) {
    return (
      <Section className="relevant" title="Plánování termínů">
        TEST
      </Section>
    );
  }

  redirect('/profile');
}