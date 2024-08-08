-- FUNCTION: public.adjust_subscription_order(integer, integer)

-- DROP FUNCTION IF EXISTS public.adjust_subscription_order(integer, integer);

CREATE OR REPLACE FUNCTION public.adjust_subscription_order(
	p_subscription_id integer,
	p_amount integer)
    RETURNS void
    LANGUAGE 'plpgsql'
    COST 100
    VOLATILE PARALLEL UNSAFE
AS $BODY$
DECLARE
    current_order INT;
    new_order INT;
BEGIN
    -- Get the current order of the passed subscription_id
    SELECT "order" INTO current_order
    FROM michaela_subscriptions
    WHERE subscription_id = p_subscription_id;

    -- Calculate the new order
    new_order := current_order + p_amount;

    -- Check if the new order is valid
    IF new_order < 1 THEN
        RAISE EXCEPTION 'The new order value must be greater than or equal to 1.';
    END IF;

    -- Check if the new order is greater or less
    IF p_amount > 0 THEN
        -- Increment orders of all subscriptions between current_order and new_order
        UPDATE michaela_subscriptions
        SET "order" = "order" - 1
        WHERE "order" > current_order AND "order" <= new_order;
    ELSE
        -- Decrement orders of all subscriptions between new_order and current_order
        UPDATE michaela_subscriptions
        SET "order" = "order" + 1
        WHERE "order" < current_order AND "order" >= new_order;
    END IF;

    -- Update the order of the passed subscription_id
    UPDATE michaela_subscriptions
    SET "order" = new_order
    WHERE subscription_id = p_subscription_id;
END;
$BODY$;

ALTER FUNCTION public.adjust_subscription_order(integer, integer)
    OWNER TO "default";
