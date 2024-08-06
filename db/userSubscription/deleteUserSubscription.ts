'use server';

import { sql } from '@vercel/postgres';
import { revalidatePath } from 'next/cache';

export const deleteUserSubscription = async (formData: FormData) => {
  try {
    const id = parseInt(formData.get('user_subscription_id')?.toString() || '0', 10);

    await sql`
      DELETE FROM michaela_user_subscriptions
      WHERE user_subscription_id = ${id}
    `;

    revalidatePath('/', 'page');
    revalidatePath('/users', 'page');
    revalidatePath('/users/[slug]', 'page');
  } catch (error) {
    console.error(error);
    throw error;
  }
};
