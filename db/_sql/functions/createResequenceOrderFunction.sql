-- FUNCTION: public.resequence_orders(text, text, text)

-- DROP FUNCTION IF EXISTS public.resequence_orders(text, text, text);

CREATE OR REPLACE FUNCTION public.resequence_orders(
	table_name text,
	order_column text,
	id_column text)
    RETURNS void
    LANGUAGE 'plpgsql'
    COST 100
    VOLATILE PARALLEL UNSAFE
AS $BODY$
DECLARE
    r RECORD;
    i INT := 1;
    dynamic_query TEXT;
BEGIN
    dynamic_query := format('SELECT %I as id FROM %I ORDER BY %I', id_column, table_name, order_column);
    
    FOR r IN EXECUTE dynamic_query LOOP
        EXECUTE format('UPDATE %I SET %I = %L WHERE %I = %L', table_name, order_column, i, id_column, r.id);
        i := i + 1;
    END LOOP;
END;
$BODY$;

ALTER FUNCTION public.resequence_orders(text, text, text)
    OWNER TO "default";
