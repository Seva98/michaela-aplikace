import 'server-only';
import { sql } from '@vercel/postgres';
import { UserSubscription } from './userSubscription';

export const getAllUsersSubscriptions = async () => {
  try {
    const result = await sql`
    WITH session_counts AS (
        SELECT user_subscription_id, COUNT(*) AS session_count
        FROM michaela_sessions
        GROUP BY user_subscription_id
    )
    SELECT
        u.user_id,
        u.color,
        CONCAT(u.first_name, ' ', u.last_name) AS name,
        CASE
            WHEN v.user_subscription_id IS NOT NULL THEN
                json_build_object(
                    'subscription_name', v.subscription_name,
                    'expiration_date', v.expiration_date,
                    'number_of_sessions', v.number_of_sessions,
                    'is_completed', v.is_completed,
                    'subscription_sessions', (
                        SELECT json_agg(json_build_object(
                            'session_id', sess.session_id,
                            'session_date', sess.session_date,
                            'session_count', sc.session_count
                        ))
                        FROM michaela_sessions sess
                        JOIN session_counts sc ON sess.user_subscription_id = sc.user_subscription_id
                        WHERE sess.user_subscription_id = v.user_subscription_id
                    ),
                    'user_subscription_id', v.user_subscription_id
                )
            ELSE NULL
        END AS active_subscription
    FROM
        michaela_users u
    LEFT JOIN
        (
            SELECT us.*, s.name AS subscription_name, s.expiration_days, s.number_of_sessions,
                CASE 
                   WHEN s.expiration_days = 0 THEN NULL
                   ELSE (us.start_date + s.expiration_days * INTERVAL '1 day')
                END AS expiration_date
            FROM michaela_user_subscriptions us
            JOIN michaela_subscriptions s ON us.subscription_id = s.subscription_id
            WHERE us.is_completed = FALSE
        ) v ON u.user_id = v.user_id;

    `;
    return result.rows as UserSubscription[];
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getUserSubscriptions = async (user_id: number) => {
  try {
    const result = await sql`
   WITH session_counts AS (
        SELECT user_subscription_id, COUNT(*) AS session_count
        FROM michaela_sessions
        GROUP BY user_subscription_id
    )
    SELECT
        u.user_id,
        u.color,
        CONCAT(u.first_name, ' ', u.last_name) AS name,
        CASE
            WHEN v.user_subscription_id IS NOT NULL THEN
                json_build_object(
                    'subscription_name', v.subscription_name,
                    'expiration_date', v.expiration_date,
                    'number_of_sessions', v.number_of_sessions,
                    'is_completed', v.is_completed,
                    'subscription_sessions', (
                        SELECT json_agg(json_build_object(
                            'session_id', sess.session_id,
                            'session_date', sess.session_date,
                            'session_count', sc.session_count
                        ))
                        FROM michaela_sessions sess
                        JOIN session_counts sc ON sess.user_subscription_id = sc.user_subscription_id
                        WHERE sess.user_subscription_id = v.user_subscription_id
                    ),
                    'user_subscription_id', v.user_subscription_id
                )
            ELSE NULL
        END AS active_subscription
    FROM
        michaela_users u
    LEFT JOIN
        (
            SELECT us.*, s.name AS subscription_name, s.expiration_days, s.number_of_sessions,
                CASE 
                   WHEN s.expiration_days = 0 THEN NULL
                   ELSE (us.start_date + s.expiration_days * INTERVAL '1 day')
                END AS expiration_date
            FROM michaela_user_subscriptions us
            JOIN michaela_subscriptions s ON us.subscription_id = s.subscription_id
            WHERE us.is_completed = FALSE
        ) v ON u.user_id = v.user_id
    WHERE
        u.user_id = ${user_id};

            `;
    console.log(result.rows);
    return result.rows[0] as UserSubscription;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
