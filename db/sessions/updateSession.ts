'use server';

import { getOwnerId } from '@/utils/db/owner/getOwnerId';
import { sql } from '@vercel/postgres';

export const updateSession = async (formData: FormData) => {
  const { session_id, note, rating } = {
    session_id: parseInt(formData.get('session_id')?.toString() || '0', 10),
    note: formData.get('note')?.toString(),
    rating: parseInt(formData.get('rating')?.toString() || '0', 10),
  };
  const owner_id = await getOwnerId();

  await sql`
    UPDATE michaela_sessions
    SET
      note = ${note},
      rating = ${rating}
    WHERE session_id = ${session_id} AND owner_id = ${owner_id}
    RETURNING *;
  `;
};
