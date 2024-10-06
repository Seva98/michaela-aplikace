import { getSession, Session } from '@auth0/nextjs-auth0';
import { redirect } from 'next/navigation';
import 'server-only';

export const isAdmin = (session?: Session | null) => session?.user.email === process.env.ADMIN_EMAIL || session?.user.email === process.env.OWNER_EMAIL;

export const checkAdmin = async () => {
  const session = await getSession();
  if (!isAdmin(session)) {
    redirect('/');
  }
};
