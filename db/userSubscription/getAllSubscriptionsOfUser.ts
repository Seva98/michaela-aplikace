import { sql } from '@vercel/postgres';
import { Subscription } from './userSubscription';

export const getAllPastSubscriptionsOfUser = async (user_id: number) => {
  try {
    const result = await sql`
    WITH session_counts AS (
        SELECT user_subscription_id, COUNT(*) AS session_count
        FROM michaela_sessions
        GROUP BY user_subscription_id
    )
    SELECT
        v.subscription_name,
        v.expiration_date::text AS expiration_date,
        v.number_of_sessions,
        v.is_completed,
        v.start_date::text,
        (
            SELECT json_agg(json_build_object(
                'session_id', sess.session_id,
                'session_date', sess.session_date,
                'session_count', sc.session_count
            ))
            FROM michaela_sessions sess
            JOIN session_counts sc ON sess.user_subscription_id = sc.user_subscription_id
            WHERE sess.user_subscription_id = v.user_subscription_id
        ) AS subscription_sessions,
        v.user_subscription_id
    FROM
        (
            SELECT us.*, s.name AS subscription_name, s.expiration_days, s.number_of_sessions,
                CASE 
                   WHEN s.expiration_days = 0 THEN NULL
                   ELSE (us.start_date + s.expiration_days * INTERVAL '1 day')
                END AS expiration_date
            FROM michaela_user_subscriptions us
            JOIN michaela_subscriptions s ON us.subscription_id = s.subscription_id
            WHERE us.is_completed = TRUE
        ) v
    WHERE
        v.user_id = ${user_id};

            `;
    return result.rows as Subscription[];
  } catch (error) {
    console.error(error);
    throw error;
  }
};
