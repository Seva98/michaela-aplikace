import { sql } from '@vercel/postgres';
import { UserSubscriptionWithSessions } from './userSubscriptionWithSessions';

export const getUserSubscritpitonsWithSessions = async (user_id: number, limit: number, offset: number) => {
  const userSubSessions = await sql`SELECT get_user_subscriptions_with_sessions(1, 20, 0);`;
  if (!userSubSessions.rows[0].get_user_subscriptions_with_sessions) return [];

  return userSubSessions.rows[0].get_user_subscriptions_with_sessions as UserSubscriptionWithSessions[];
};
