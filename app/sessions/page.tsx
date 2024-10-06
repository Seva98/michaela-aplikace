import Section from '@/components/containers/section';
import { getSession } from '@auth0/nextjs-auth0';
import { isAdmin } from '@/utils/roles';
import { redirect } from 'next/navigation';
import Calendar from './calendar';

export default async function Home() {
  const session = await getSession();

  if (isAdmin(session)) {
    return (
      <Section className="relevant" title="Kalendář">
        <Calendar />
      </Section>
    );
  }

  redirect('/profile');
}
