import { getUserByEmail } from '@/db/users/getUsers';
import { getSession } from '@auth0/nextjs-auth0';
import { redirect } from 'next/navigation';

export const getUserId = async () => {
  const session = await getSession();
  if (!session) redirect('/api/auth/login');

  const user = await getUserByEmail(session?.user.email);

  if (!user) throw new Error('User not found');

  return user.user_id;
};
