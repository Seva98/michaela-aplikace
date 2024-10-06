import Section from '@/components/containers/section';
import { Button } from '@/components/ui/button';
import Typography from '@/components/ui/typography';
import { getSession } from '@auth0/nextjs-auth0';
import Link from 'next/link';

const Unauthorized = async () => {
  const session = await getSession();

  return (
    <Section title={'Neznámy klient'}>
      {session ? (
        <Typography>Tvůj účet neexistuje, pro více informací kontaktuj Míšu</Typography>
      ) : (
        <Link href="/api/auth/login">
          <Button>Příhlásit se</Button>
        </Link>
      )}
    </Section>
  );
};

export default Unauthorized;
