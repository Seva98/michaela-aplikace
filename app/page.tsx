import Section from '@/components/containers/section';
import UsersSummary from './usersSummary';
import { getSession } from '@auth0/nextjs-auth0';
import { isAdmin } from '@/utils/roles';
import Unauthorized from './unauthorized';
import { redirect } from 'next/navigation';

export default async function Home() {
  const session = await getSession();
  if (!session) return <Unauthorized />;

  if (isAdmin(session)) {
    return (
      <Section className="relevant" title="Rezervace">
        <UsersSummary />
      </Section>
    );
  }

  return redirect('/profile');
}
