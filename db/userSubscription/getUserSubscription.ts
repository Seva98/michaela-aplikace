import 'server-only';
import { sql } from '@vercel/postgres';
import { ActivatedSubscription, UserSubscription } from './userSubscription';
import { getOwnerId } from '@/utils/db/owner/getOwnerId';
import { checkValidUser } from '@/utils/db/user/checkValidUser';

export const getLatestSubscriptionOfAllUsers = async () => {
  try {
    const owner_id = await getOwnerId();
    const result = await sql`
        WITH session_counts AS (
            SELECT user_subscription_id, COUNT(*) AS session_count
            FROM michaela_sessions
            GROUP BY user_subscription_id
        ),
        latest_subscriptions AS (
            SELECT DISTINCT ON (us.user_id) us.*, s.name AS subscription_name, s.expiration_days, s.number_of_sessions,
                (us.start_date + NULLIF(s.expiration_days, 0) * INTERVAL '1 day') AS expiration_date
            FROM michaela_user_subscriptions us
            JOIN michaela_subscriptions s ON us.subscription_id = s.subscription_id
            ORDER BY us.user_id, us.start_date DESC
        )
        SELECT
            u.user_id,
            u.color,
            CONCAT(u.first_name, ' ', u.last_name) AS name,
            CASE
                WHEN v.user_subscription_id IS NOT NULL THEN
                    json_build_object(
                        'subscription_name', v.subscription_name,
                        'start_date', v.start_date,
                        'expiration_date', v.expiration_date,
                        'number_of_sessions', v.number_of_sessions,
                        'is_completed', v.is_completed,
                        'subscription_sessions', (
                            SELECT json_agg(json_build_object(
                                'session_id', sess.session_id,
                                'session_date', sess.session_date,
                                'session_count', sc.session_count,
                                'note', sess.note,
                                'rating', sess.rating
                            ) ORDER BY sess.session_date)
                            FROM michaela_sessions sess
                            LEFT JOIN session_counts sc ON sess.user_subscription_id = sc.user_subscription_id
                            WHERE sess.user_subscription_id = v.user_subscription_id
                        ),
                        'user_subscription_id', v.user_subscription_id
                    )
                ELSE NULL
            END AS active_subscription
        FROM
            michaela_users u
        LEFT JOIN
            latest_subscriptions v ON u.user_id = v.user_id
        WHERE u.is_hidden = FALSE AND u.owner_id = ${owner_id}
        ORDER BY
            u.user_id;
        `;
    return result.rows as UserSubscription[];
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getUserSubscriptions = async (user_id: number) => {
  try {
    await checkValidUser(user_id);
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
                    'start_date', v.start_date,
                    'expiration_date', v.expiration_date,
                    'number_of_sessions', v.number_of_sessions,
                    'is_completed', v.is_completed,
                    'subscription_sessions', (
                        SELECT json_agg(json_build_object(
                            'session_id', sess.session_id,
                            'session_date', sess.session_date,
                            'session_count', sc.session_count,
                            'note', sess.note,
                            'rating', sess.rating
                        ) ORDER BY sess.session_date)
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
    return result.rows[0] as UserSubscription;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getAllPastSubscriptionsOfUser = async (user_id: number) => {
  await checkValidUser(user_id);
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
        v.completion_date::text,
        (
            SELECT json_agg(json_build_object(
                'session_id', sess.session_id,
                'session_date', sess.session_date,
                'session_count', sc.session_count,
                'note', sess.note,
                'rating', sess.rating
            ) ORDER BY sess.session_date)
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
    return result.rows as ActivatedSubscription[];
  } catch (error) {
    console.error(error);
    throw error;
  }
};
