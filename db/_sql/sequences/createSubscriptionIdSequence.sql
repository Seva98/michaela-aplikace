-- SEQUENCE: public.michaela_subscriptions_subscription_id_seq

-- DROP SEQUENCE IF EXISTS public.michaela_subscriptions_subscription_id_seq;

CREATE SEQUENCE IF NOT EXISTS public.michaela_subscriptions_subscription_id_seq
    INCREMENT 1
    START 1
    MINVALUE 1
    MAXVALUE 2147483647
    CACHE 1;

ALTER SEQUENCE public.michaela_subscriptions_subscription_id_seq
    OWNED BY public.michaela_subscriptions.subscription_id;

ALTER SEQUENCE public.michaela_subscriptions_subscription_id_seq
    OWNER TO "default";