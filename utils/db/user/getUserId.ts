import { getUserByEmail } from '@/db/users/getUsers';
import { auth0 } from '@/utils/auth0';
import { LOGIN_URL } from '@/utils/constants';
import { redirect } from 'next/navigation';

export const getUserId = async () => {
  const session = await auth0.getSession();
  if (!session) redirect(LOGIN_URL);

  const user = await getUserByEmail(session?.user.email);

  if (!user) throw new Error('User not found');

  return user.user_id;
};
