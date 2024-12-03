import { getOwnerIdByEmail } from '@/db/owners/getOwner';
import { auth0 } from '@/utils/auth0';
import { LOGIN_URL } from '@/utils/constants';
import { redirect } from 'next/navigation';

export const getOwnerId = async () => {
  const session = await auth0.getSession();
  if (!session) redirect(LOGIN_URL);

  const owner_id = await getOwnerIdByEmail(session?.user.email);

  if (!owner_id) throw new Error('Owner not found');

  return owner_id;
};
