'use server';
import 'server-only';
import { sql } from '@vercel/postgres';
import { revalidatePath } from 'next/cache';

const activateSubscription = async (formData: FormData, subscription_id: number) => {
  const user_id = formData.get('user_id')?.toString() || '';
  const start_date = formData.get('start_date')?.toString() || '';

  const checkSubscription = await sql`SELECT * FROM michaela_user_subscriptions WHERE user_id = ${user_id} AND is_completed = false`;

  if (checkSubscription.rows.length > 0) {
    return 'User already has an active subscription';
  }

  await sql`
    INSERT INTO michaela_user_subscriptions (user_id, subscription_id, start_date)
    VALUES (${user_id}, ${subscription_id}, ${start_date});
    `;

  revalidatePath('/');
  revalidatePath('/users', 'page');
  revalidatePath('/users/[slug]', 'page');
  return 'Subscription activated';
};

export default activateSubscription;
