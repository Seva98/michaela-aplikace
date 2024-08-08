import 'server-only';
import { sql } from '@vercel/postgres';
import { Subscription } from './subscription';
import { getOwnerId } from '@/utils/db/owner/getOwnerId';

export const getSubscriptions = async () => {
  const owner_id = await getOwnerId();

  const result = await sql`
      SELECT * FROM michaela_subscriptions
      WHERE is_hidden = false AND owner_id = ${owner_id}
      ORDER BY "order";
    `;
  return result.rows as Subscription[];
};

export const getAllSbuscriptions = async () => {
  const owner_id = await getOwnerId();

  const result = await sql`
      SELECT * FROM michaela_subscriptions
      WHERE owner_id = ${owner_id}
      ORDER BY "order";
    `;
  return result.rows as Subscription[];
};
