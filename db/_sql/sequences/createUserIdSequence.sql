-- SEQUENCE: public.michaela_users_user_id_seq

-- DROP SEQUENCE IF EXISTS public.michaela_users_user_id_seq;

CREATE SEQUENCE IF NOT EXISTS public.michaela_users_user_id_seq
    INCREMENT 1
    START 1
    MINVALUE 1
    MAXVALUE 2147483647
    CACHE 1;

ALTER SEQUENCE public.michaela_users_user_id_seq
    OWNED BY public.michaela_users.user_id;

ALTER SEQUENCE public.michaela_users_user_id_seq
    OWNER TO "default";