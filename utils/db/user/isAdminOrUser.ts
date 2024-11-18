import { getOwnerIdByEmail } from '@/db/owners/getOwner';
import { getUserByEmail } from '@/db/users/getUsers';
import { auth0 } from '@/utils/auth0';
import { redirect } from 'next/navigation';
import { Role } from './role';

export const isOwnerOrUser = async () => {
  const session = await auth0.getSession();
  if (!session) redirect('/auth/login');

  const user_id = await getUserByEmail(session?.user.email);
  const owner_id = await getOwnerIdByEmail(session?.user.email);

  if (owner_id) {
    return Role.OWNER;
  }
  if (user_id) {
    return Role.USER;
  }
  throw new Error('Unauthorized');
};
