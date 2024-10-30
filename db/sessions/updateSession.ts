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
  const session_id = parseInt(formData.get('session_id')?.toString() || '0', 10);
  const note = formData.get('note')?.toString();
  const rating = parseInt(formData.get('rating')?.toString() || '0', 10);
  const session_date = formData.get('session_date')?.toString();
  const user_subscription_id = parseInt(formData.get('user_subscription_id')?.toString() || '0', 10);
  const parsedUserSubscriptionId = user_subscription_id === -1 ? null : user_subscription_id;

  const owner_id = await getOwnerId();

  await sql`
    UPDATE michaela_sessions
    SET
      note = ${note},
      rating = ${rating},
      session_date = ${session_date},
      user_subscription_id = ${parsedUserSubscriptionId}
    WHERE session_id = ${session_id} AND owner_id = ${owner_id}
    RETURNING *;
  `;
};
