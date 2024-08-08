-- View: public.michaela_user_active_subscription

-- DROP VIEW public.michaela_user_active_subscription;

CREATE OR REPLACE VIEW public.michaela_user_active_subscription
 AS
 SELECT u.user_id,
    u.first_name,
    u.last_name,
    us.user_subscription_id,
    s.name AS subscription_name,
    s.number_of_sessions,
    us.start_date + s.expiration_days::double precision * '1 day'::interval AS expiration_date,
    s.number_of_sessions - COALESCE(count(sess.session_id), 0::bigint) AS sessions_remaining
   FROM michaela_users u
     LEFT JOIN michaela_user_subscriptions us ON u.user_id = us.user_id
     LEFT JOIN michaela_subscriptions s ON us.subscription_id = s.subscription_id
     LEFT JOIN michaela_sessions sess ON us.user_subscription_id = sess.user_subscription_id
  GROUP BY u.user_id, u.first_name, u.last_name, us.user_subscription_id, s.name, s.number_of_sessions, us.start_date, s.expiration_days;

ALTER TABLE public.michaela_user_active_subscription
    OWNER TO "default";

