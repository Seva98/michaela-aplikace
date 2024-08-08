'use server';
import { sql } from '@vercel/postgres';

import { revalidatePath } from 'next/cache';
import { subscriptionSchema } from './subscription';
import { getOwnerId } from '@/utils/db/owner/getOwnerId';

export const createSubscription = async (formData: FormData) => {
  try {
    const subscriptionData = {
      name: formData.get('name')?.toString() || '',
      expiration_days: parseInt(formData.get('expiration_days')?.toString() || '0', 10),
      price_per_session: parseInt(formData.get('price_per_session')?.toString() || '0', 10),
      number_of_sessions: parseInt(formData.get('number_of_sessions')?.toString() || '0', 10),
    };
    const { name, expiration_days, price_per_session, number_of_sessions } = subscriptionSchema.parse(subscriptionData);
    const owner_id = await getOwnerId();

    await sql`
       INSERT INTO michaela_subscriptions (name, expiration_days, price_per_session, number_of_sessions, "order", owner_id)
      VALUES (
        ${name}, 
        ${expiration_days}, 
        ${price_per_session}, 
        ${number_of_sessions},
        COALESCE((SELECT MAX("order") FROM michaela_subscriptions), 0) + 1,
        ${owner_id}
      );
      `;
    revalidatePath('/');
    revalidatePath('/subscriptions', 'page');
    revalidatePath('/users', 'page');
    revalidatePath('/users/[slug]', 'page');
  } catch (error) {
    console.error(error);
    return error;
  }
};
