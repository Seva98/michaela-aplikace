-- FUNCTION: public.update_is_completed()

-- DROP FUNCTION IF EXISTS public.update_is_completed();

CREATE OR REPLACE FUNCTION public.update_is_completed()
    RETURNS trigger
    LANGUAGE 'plpgsql'
    COST 100
    VOLATILE NOT LEAKPROOF
AS $BODY$
BEGIN
    -- Check if the number of sessions equals or exceeds the number_of_sessions defined in michaela_subscriptions
    IF (
        SELECT COUNT(*) 
        FROM michaela_sessions 
        WHERE user_subscription_id = NEW.user_subscription_id
    ) >= (
        SELECT number_of_sessions 
        FROM michaela_subscriptions s
        WHERE s.subscription_id = (
            SELECT us.subscription_id 
            FROM michaela_user_subscriptions us 
            WHERE us.user_subscription_id = NEW.user_subscription_id
        )
    ) THEN
        -- Mark as completed and set completion_date to NOW()
        UPDATE michaela_user_subscriptions
        SET is_completed = TRUE,
            completion_date = NOW()
        WHERE user_subscription_id = NEW.user_subscription_id;
    ELSE
        -- Mark as not completed and set completion_date to NULL
        UPDATE michaela_user_subscriptions
        SET is_completed = FALSE,
            completion_date = NULL
        WHERE user_subscription_id = NEW.user_subscription_id;
    END IF;
    
    RETURN NEW;
END;
$BODY$;

ALTER FUNCTION public.update_is_completed()
    OWNER TO "default";
