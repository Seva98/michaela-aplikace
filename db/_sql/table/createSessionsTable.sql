-- Table: public.michaela_sessions

-- DROP TABLE IF EXISTS public.michaela_sessions;

CREATE TABLE IF NOT EXISTS public.michaela_sessions
(
    session_id integer NOT NULL DEFAULT nextval('michaela_sessions_session_id_seq'::regclass),
    user_subscription_id integer NOT NULL,
    session_date date NOT NULL,
    note character varying(1000) COLLATE pg_catalog."default",
    rating integer NOT NULL DEFAULT 1,
    CONSTRAINT michaela_sessions_pkey PRIMARY KEY (session_id),
    CONSTRAINT fk_user_subscription_id FOREIGN KEY (user_subscription_id)
        REFERENCES public.michaela_user_subscriptions (user_subscription_id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE CASCADE,
    CONSTRAINT michaela_sessions_user_subscription_id_fkey FOREIGN KEY (user_subscription_id)
        REFERENCES public.michaela_user_subscriptions (user_subscription_id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT rating_check CHECK (rating >= 1 AND rating <= 10)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.michaela_sessions
    OWNER to "default";

-- Trigger: trigger_check_session_count

-- DROP TRIGGER IF EXISTS trigger_check_session_count ON public.michaela_sessions;

CREATE OR REPLACE TRIGGER trigger_check_session_count
    BEFORE INSERT
    ON public.michaela_sessions
    FOR EACH ROW
    EXECUTE FUNCTION public.check_session_count();

-- Trigger: trigger_update_is_completed

-- DROP TRIGGER IF EXISTS trigger_update_is_completed ON public.michaela_sessions;

CREATE OR REPLACE TRIGGER trigger_update_is_completed
    AFTER INSERT OR UPDATE 
    ON public.michaela_sessions
    FOR EACH ROW
    EXECUTE FUNCTION public.update_is_completed();