import { getSession, Session } from '@auth0/nextjs-auth0';
import { redirect } from 'next/navigation';
import 'server-only';

export const isAdmin = (session?: Session | null) => {
  return (
    session?.user.email === process.env.ADMIN_EMAIL ||
    session?.user.email === process.env.OWNER_EMAIL ||
    session?.user.email === process.env.PLAYWRIGHT_USERNAME
  );
};

export const checkAdmin = async () => {
  const session = await auth0.getSession();
  if (!isAdmin(session)) {
    redirect('/');
  }
};
