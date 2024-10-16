'use server';
import 'server-only';
import { sql } from '@vercel/postgres';
import { revalidatePath } from 'next/cache';
import { getOwnerId } from '@/utils/db/owner/getOwnerId';

export const activateSubscription = async (formData: FormData, subscription_id: number) => {
  const user_id = formData.get('user_id')?.toString() || '';
  const start_date = formData.get('start_date')?.toString() || '';
  const owner_id = await getOwnerId();

  const checkSubscription = await sql`SELECT * FROM michaela_user_subscriptions WHERE user_id = ${user_id} AND is_completed = false`;

  if (checkSubscription.rows.length > 0) {
    return 'User already has an active subscription';
  }

  await sql`
    INSERT INTO michaela_user_subscriptions (user_id, subscription_id, start_date, owner_id)
    VALUES (${user_id}, ${subscription_id}, ${start_date}, ${owner_id});
    `;

  revalidatePath('/');
  revalidatePath('/users', 'page');
  revalidatePath('/users/[slug]', 'page');
  return 'Subscription activated';
};

export const updateSubscriptionState = async (formData: FormData) => {
  const user_subscription_id = formData.get('user_subscription_id')?.toString() || '';
  const new_state = formData.get('new_state')?.toString() || '';
  const owner_id = await getOwnerId();

  if (!new_state || !['active', 'completed'].includes(new_state)) {
    throw new Error('Invalid new subscription state');
  }

  // Verify the subscription belongs to the owner
  const subscriptionCheck = await sql`
    SELECT owner_id 
    FROM michaela_user_subscriptions 
    WHERE user_subscription_id = ${user_subscription_id} 
      AND owner_id = ${owner_id}
  `;

  if (subscriptionCheck.rowCount === 0) {
    throw new Error('Subscription not found or you do not have permission to complete this subscription');
  }

  await sql`
    UPDATE michaela_user_subscriptions
    SET is_completed = ${new_state === 'completed'},
      completion_date = NOW()
    WHERE user_subscription_id = ${user_subscription_id} AND owner_id = ${owner_id};
    `;

  revalidatePath('/');
  revalidatePath('/users', 'page');
  revalidatePath('/users/[slug]', 'page');
  return 'Subscription deactivated';
};
