import Section from '@/components/containers/section';
import UsersSummary from './usersSummary';
import { getSession } from '@auth0/nextjs-auth0';
import { isAdmin } from '@/utils/roles';

export default async function Home() {
  const session = await getSession();
  if (!isAdmin(session)) throw new Error('Unauthorized');

  return (
    <Section className="relevant" title="Rezervace">
      <UsersSummary />
    </Section>
  );
}
