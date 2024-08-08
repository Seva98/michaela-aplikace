-- FUNCTION: public.check_session_count()

-- DROP FUNCTION IF EXISTS public.check_session_count();

CREATE OR REPLACE FUNCTION public.check_session_count()
    RETURNS trigger
    LANGUAGE 'plpgsql'
    COST 100
    VOLATILE NOT LEAKPROOF
AS $BODY$
BEGIN
    -- Check the number of sessions already booked for the subscription
    IF (
        SELECT COUNT(*) 
        FROM michaela_sessions 
        WHERE user_subscription_id = NEW.user_subscription_id
    ) >= (
        SELECT number_of_sessions 
        FROM michaela_subscriptions 
        WHERE subscription_id = (SELECT subscription_id FROM michaela_user_subscriptions WHERE user_subscription_id = NEW.user_subscription_id)
    ) THEN
        RAISE EXCEPTION 'Cannot book more sessions than allowed for this subscription';
    END IF;
    
    RETURN NEW;
END;
$BODY$;

ALTER FUNCTION public.check_session_count()
    OWNER TO "default";
