'use server';

import { sql } from '@vercel/postgres';
import { getOwnerIdByEmail } from '../owners/getOwner';
import { auth0 } from '@/utils/auth0';
import { OwnerSettings } from './ownerSettings';

export const getOwnerSettings = async () => {
  const session = await auth0.getSession();
  const owner_id = await getOwnerIdByEmail(session?.user.email);

  if (!owner_id) throw new Error('Owner not found');

  const result = await sql`SELECT * FROM michaela_owner_settings WHERE owner_id = ${owner_id}`;

  if (!result.rows[0]) throw new Error('Owner settings not found');

  return result.rows[0] as OwnerSettings;
};
