'use server';
import { getOwnerId } from '@/utils/db/owner/getOwnerId';
import { sql } from '@vercel/postgres';
import { revalidatePath } from 'next/cache';

export const deleteSubscription = async (formData: FormData) => {
  try {
    const id = parseInt(formData.get('subscription_id')?.toString() || '0', 10);
    const owner_id = await getOwnerId();

    await sql`
      DELETE FROM michaela_subscriptions
      WHERE subscription_id = ${id} AND owner_id = ${owner_id};
    `;

    await sql`
      SELECT resequence_orders('michaela_subscriptions', 'order', 'subscription_id');
    `;

    revalidatePath('/', 'page');
    revalidatePath('/users', 'page');
    revalidatePath('/users/[slug]', 'page');
    revalidatePath('/subscriptions', 'page');
  } catch (error) {
    console.error(error);
    throw error;
  }
};
