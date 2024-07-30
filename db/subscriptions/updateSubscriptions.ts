'use server';
import 'server-only';
import { sql } from '@vercel/postgres';
import { revalidatePath } from 'next/cache';

export const changeSubscriptionOrder = async (formData: FormData) => {
  const { subscription_id, amount } = {
    subscription_id: parseInt(formData.get('subscription_id')?.toString() || '0', 10),
    amount: parseInt(formData.get('amount')?.toString() || '0', 10),
  };

  await sql`SELECT adjust_subscription_order(${subscription_id}, ${amount});`;

  revalidatePath('/');
  revalidatePath('/users', 'page');
  revalidatePath('/users/[slug]', 'page');
};

export const toggleSubscriptionVisibility = async (formData: FormData) => {
  const { subscription_id, is_hidden } = {
    subscription_id: parseInt(formData.get('subscription_id')?.toString() || '0', 10),
    is_hidden: formData.get('is_hidden') === 'true',
  };

  await sql`UPDATE michaela_subscriptions SET is_hidden = ${!is_hidden} WHERE subscription_id = ${subscription_id};`;

  revalidatePath('/');
  revalidatePath('/users', 'page');
  revalidatePath('/users/[slug]', 'page');
  revalidatePath('/subscriptions', 'page');
};

export const updateSubscription = async (formData: FormData) => {
  const { subscription_id, name, number_of_sessions, price_per_session, expiration_days } = {
    subscription_id: parseInt(formData.get('subscription_id')?.toString() || '0', 10),
    name: formData.get('name')?.toString() || '',
    number_of_sessions: parseInt(formData.get('number_of_sessions')?.toString() || '0', 10),
    price_per_session: parseInt(formData.get('price_per_session')?.toString() || '0', 10),
    expiration_days: parseInt(formData.get('expiration_days')?.toString() || '0', 10),
  };

  await sql`
        UPDATE michaela_subscriptions
        SET name = ${name},
            number_of_sessions = ${number_of_sessions},
            price_per_session = ${price_per_session},
            expiration_days = ${expiration_days}
        WHERE subscription_id = ${subscription_id};
    `;

  revalidatePath('/');
  revalidatePath('/users', 'page');
  revalidatePath('/users/[slug]', 'page');
  revalidatePath('/subscriptions', 'page');
};
