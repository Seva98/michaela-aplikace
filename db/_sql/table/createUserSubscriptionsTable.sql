-- Table: public.michaela_user_subscriptions

-- DROP TABLE IF EXISTS public.michaela_user_subscriptions;

CREATE TABLE IF NOT EXISTS public.michaela_user_subscriptions
(
    user_subscription_id integer NOT NULL DEFAULT nextval('michaela_user_subscriptions_user_subscription_id_seq'::regclass),
    user_id integer NOT NULL,
    subscription_id integer NOT NULL,
    start_date date NOT NULL,
    is_completed boolean DEFAULT false,
    completion_date date,
    CONSTRAINT michaela_user_subscriptions_pkey PRIMARY KEY (user_subscription_id),
    CONSTRAINT fk_subscription_id FOREIGN KEY (subscription_id)
        REFERENCES public.michaela_subscriptions (subscription_id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE CASCADE,
    CONSTRAINT fk_user_id FOREIGN KEY (user_id)
        REFERENCES public.michaela_users (user_id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE CASCADE,
    CONSTRAINT michaela_user_subscriptions_subscription_id_fkey FOREIGN KEY (subscription_id)
        REFERENCES public.michaela_subscriptions (subscription_id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT michaela_user_subscriptions_user_id_fkey FOREIGN KEY (user_id)
        REFERENCES public.michaela_users (user_id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.michaela_user_subscriptions
    OWNER to "default";