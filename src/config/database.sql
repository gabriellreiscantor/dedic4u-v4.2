-- Criar função para executar SQL dinâmico
CREATE OR REPLACE FUNCTION exec_sql(sql text)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  EXECUTE sql;
END;
$$;

-- Criar função para inicializar a tabela pages
CREATE OR REPLACE FUNCTION create_pages_table()
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  -- Criar a tabela se não existir
  CREATE TABLE IF NOT EXISTS public.pages (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    slug TEXT UNIQUE NOT NULL,
    title TEXT NOT NULL,
    message TEXT NOT NULL,
    relationship_date TEXT NOT NULL,
    youtube_link TEXT,
    images TEXT[] DEFAULT '{}',
    plan_id TEXT NOT NULL,
    plan_name TEXT NOT NULL,
    expiration_date TIMESTAMPTZ,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now())
  );

  -- Criar índices
  CREATE INDEX IF NOT EXISTS pages_slug_idx ON public.pages (slug);
  CREATE INDEX IF NOT EXISTS pages_is_active_idx ON public.pages (is_active);

  -- Habilitar RLS
  ALTER TABLE public.pages ENABLE ROW LEVEL SECURITY;

  -- Criar políticas
  DROP POLICY IF EXISTS "Permitir leitura pública" ON public.pages;
  CREATE POLICY "Permitir leitura pública"
    ON public.pages FOR SELECT
    USING (is_active = true);

  DROP POLICY IF EXISTS "Permitir inserção pública" ON public.pages;
  CREATE POLICY "Permitir inserção pública"
    ON public.pages FOR INSERT
    WITH CHECK (true);

  DROP POLICY IF EXISTS "Permitir atualização pública" ON public.pages;
  CREATE POLICY "Permitir atualização pública"
    ON public.pages FOR UPDATE
    USING (true);
END;
$$;