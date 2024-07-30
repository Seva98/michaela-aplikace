import 'server-only';
import { sql } from '@vercel/postgres';
import { Subscription } from './subscription';

export const getSubscriptions = async () => {
  const result = await sql`
      SELECT * FROM michaela_subscriptions
      WHERE is_hidden = false
      ORDER BY "order";
    `;
  return result.rows as Subscription[];
};

export const getAllSbuscriptions = async () => {
  const result = await sql`
      SELECT * FROM michaela_subscriptions
      ORDER BY "order";
    `;
  return result.rows as Subscription[];
};
