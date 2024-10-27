import Section from '@/components/containers/section';
import { getSession } from '@auth0/nextjs-auth0';
import { isAdmin } from '@/utils/roles';
import { redirect } from 'next/navigation';
import Calendar from './calendar';
import Card from '@/components/ui/card';

export default async function Home() {
  const session = await getSession();

  if (isAdmin(session)) {
    return (
      <Section className="relevant" title="Kalendář">
        <Card className="p-0" padding="none">
          <Calendar />
        </Card>
      </Section>
    );
  }

  redirect('/profile');
}
