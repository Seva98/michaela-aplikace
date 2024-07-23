'use server';
import { sql } from '@vercel/postgres';
import { revalidatePath } from 'next/cache';
import 'server-only';

export const createSession = async (formData: FormData) => {
  const user_subscription_id = formData.get('user_subscription_id')?.toString();
  const session_date = formData.get('session_date')?.toString();

  if (!user_subscription_id || !session_date) {
    throw new Error('Missing required fields');
  }

  await sql`
    INSERT INTO michaela_sessions (user_subscription_id, session_date)
    VALUES (${user_subscription_id}, ${session_date})
    RETURNING session_id;
  `;
  revalidatePath('/');
};
