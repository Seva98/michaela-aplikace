'use server';
import { getOwnerId } from '@/utils/db/owner/getOwnerId';
import { sql } from '@vercel/postgres';
import 'server-only';
import { z } from 'zod';

export const createSession = async (formData: FormData) => {
  const user_subscription_id = formData.get('user_subscription_id')?.toString();
  const session_date = formData.get('session_date')?.toString();
  const note = formData.get('note')?.toString();
  const rating = parseInt(formData.get('rating')?.toString() || '0', 10) + 1;
  const owner_id = await getOwnerId();

  z.number().int().min(1).max(10).parse(rating);

  if (!user_subscription_id || !session_date) {
    throw new Error('Missing required fields');
  }

  await sql`
    INSERT INTO michaela_sessions (user_subscription_id, session_date, note, rating, owner_id)
    VALUES (${user_subscription_id}, ${session_date}, ${note}, ${rating}, ${owner_id})
    RETURNING session_id;
  `;
};
