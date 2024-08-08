import { getOwnerIdByEmail } from '@/db/owners/getOwner';
import { getSession } from '@auth0/nextjs-auth0';
import { redirect } from 'next/navigation';

export const getOwnerId = async () => {
  const session = await getSession();
  if (!session) redirect('/api/auth/login');

  const owner_id = await getOwnerIdByEmail(session?.user.email);

  if (!owner_id) throw new Error('Owner not found');

  return owner_id;
};
