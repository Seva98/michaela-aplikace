-- Table: public.michaela_users

-- DROP TABLE IF EXISTS public.michaela_users;

CREATE TABLE IF NOT EXISTS public.michaela_users
(
    user_id integer NOT NULL DEFAULT nextval('michaela_users_user_id_seq'::regclass),
    first_name character varying(50) COLLATE pg_catalog."default" NOT NULL,
    last_name character varying(50) COLLATE pg_catalog."default" NOT NULL,
    email character varying(100) COLLATE pg_catalog."default" NOT NULL,
    phone character varying(20) COLLATE pg_catalog."default",
    bio text COLLATE pg_catalog."default",
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    birthday date,
    address character varying(255) COLLATE pg_catalog."default",
    image character varying(255) COLLATE pg_catalog."default",
    color character varying(7) COLLATE pg_catalog."default" DEFAULT '#000000'::character varying,
    "order" integer NOT NULL,
    is_hidden boolean NOT NULL DEFAULT false,
    CONSTRAINT michaela_users_pkey PRIMARY KEY (user_id),
    CONSTRAINT michaela_users_email_key UNIQUE (email)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.michaela_users
    OWNER to "default";