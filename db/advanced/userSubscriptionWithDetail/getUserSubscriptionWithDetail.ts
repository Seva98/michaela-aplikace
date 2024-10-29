import { sql } from '@vercel/postgres';
import { UserSubscriptionDetail } from './userSubscriptionDetail';

export const getAllUsersLatestSubscriptionWithDetail = async () => {
  const result = await sql`
   WITH latest_subscriptions AS (
      SELECT 
          us.user_subscription_id,
          us.user_id,
          us.subscription_id,
          us.start_date,
          s.number_of_sessions AS total_sessions,
          s.name AS subscription_name,
          ROW_NUMBER() OVER (PARTITION BY us.user_id ORDER BY us.start_date DESC) AS row_num
      FROM 
          public.michaela_user_subscriptions us
      JOIN 
          public.michaela_subscriptions s ON us.subscription_id = s.subscription_id
    )
    SELECT 
        ls.user_subscription_id,
        ls.user_id,
        u.first_name,
        u.last_name,
        ls.subscription_id,
        ls.subscription_name,
        ls.total_sessions,
        COALESCE(session_counts.used_sessions, 0)::int AS used_sessions,
        (COALESCE(session_counts.used_sessions, 0) >= ls.total_sessions) AS is_fully_booked 
    FROM 
        latest_subscriptions ls
    JOIN 
        public.michaela_users u ON ls.user_id = u.user_id
    LEFT JOIN (
        SELECT 
            user_subscription_id,
            COUNT(*) AS used_sessions
        FROM 
            public.michaela_sessions
        GROUP BY 
            user_subscription_id
    ) AS session_counts ON ls.user_subscription_id = session_counts.user_subscription_id
    WHERE 
        ls.row_num = 1
    ORDER BY 
        (used_sessions < total_sessions) DESC, -- Valid subscriptions first
        u.last_name ASC; -- Sort by last_name within each group
 
`;

  return result.rows as UserSubscriptionDetail[];
};
