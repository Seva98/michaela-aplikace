'use server';

import { getOwnerId } from '@/utils/db/owner/getOwnerId';
import { sql } from '@vercel/postgres';

export const deleteSession = async (formData: FormData) => {
  const id = parseInt(formData.get('session_id')?.toString() || '0', 10);
  const owner_id = await getOwnerId();

  await sql`DELETE FROM michaela_sessions WHERE session_id = ${id} AND owner_id=${owner_id}`;
};
