import { sql } from '@vercel/postgres';
import { CalendarSession } from './calendarSession';
import { getOwnerId } from '@/utils/db/owner/getOwnerId';

export const getCalendarSessions = async (start_date: string, end_date: string) => {
  try {
    const owner_id = await getOwnerId();
    const result = await sql`
    SELECT 
        sess.session_id,
        sess.user_subscription_id,
        sess.session_date::text,
        sess.note,
        sess.rating,
        u.first_name,
        u.last_name,
        u.color
    FROM 
        public.michaela_sessions sess
    LEFT JOIN 
        public.michaela_user_subscriptions us ON sess.user_subscription_id = us.user_subscription_id
    LEFT JOIN 
        public.michaela_users u ON us.user_id = u.user_id
    WHERE
        sess.session_date >= ${start_date} AND sess.session_date <= ${end_date} AND sess.owner_id = ${owner_id}
    ORDER BY 
        sess.session_date ASC;
    `;
    return result.rows as CalendarSession[];
  } catch (error) {
    console.error(error);
    throw error;
  }
};
