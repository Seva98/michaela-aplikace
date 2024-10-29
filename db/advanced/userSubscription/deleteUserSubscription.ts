'use server';

import { sql } from '@vercel/postgres';

export const deleteUserSubscription = async (formData: FormData) => {
  const id = parseInt(formData.get('user_subscription_id')?.toString() || '0', 10);

  await sql`
      DELETE FROM michaela_user_subscriptions
      WHERE user_subscription_id = ${id}
    `;
};
