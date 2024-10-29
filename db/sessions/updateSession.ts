'use server';

import { getOwnerId } from '@/utils/db/owner/getOwnerId';
import { sql } from '@vercel/postgres';

export const updateSession = async (formData: FormData) => {
  const { session_id, note, rating, session_date } = {
    session_id: parseInt(formData.get('session_id')?.toString() || '0', 10),
    note: formData.get('note')?.toString(),
    rating: parseInt(formData.get('rating')?.toString() || '0', 10),
    session_date: formData.get('session_date')?.toString(),
  };
  const owner_id = await getOwnerId();

  await sql`
    UPDATE michaela_sessions
    SET
      note = ${note},
      rating = ${rating},
      session_date = ${session_date}
    WHERE session_id = ${session_id} AND owner_id = ${owner_id}
    RETURNING *;
  `;
};

export const updateSessionWithUserSubscriptionId = async (formData: FormData) => {
  const { session_id, note, rating, session_date, user_subscription_id } = {
    session_id: parseInt(formData.get('session_id')?.toString() || '0', 10),
    note: formData.get('note')?.toString(),
    rating: parseInt(formData.get('rating')?.toString() || '0', 10),
    session_date: formData.get('session_date')?.toString(),
    user_subscription_id: parseInt(formData.get('user_subscription_id')?.toString() || '0', 10),
  };
  const owner_id = await getOwnerId();

  await sql`
    UPDATE michaela_sessions
    SET
      note = ${note},
      rating = ${rating},
      session_date = ${session_date},
      user_subscription_id = ${user_subscription_id}
    WHERE session_id = ${session_id} AND owner_id = ${owner_id}
    RETURNING *;
  `;
};
