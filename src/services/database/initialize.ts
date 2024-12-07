import { supabase } from '../../config/supabase';

export const initializeDatabase = async () => {
  try {
    // Verifica se a tabela pages existe
    const { error: checkError } = await supabase
      .from('pages')
      .select('count')
      .limit(1);

    // Se a tabela não existir, cria ela
    if (checkError && checkError.code === '42P01') {
      const { error: createError } = await supabase.rpc('create_table_pages', {
        sql: `
          CREATE TABLE IF NOT EXISTS public.pages (
            id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
            slug TEXT UNIQUE NOT NULL,
            title TEXT NOT NULL,
            message TEXT NOT NULL,
            relationship_date TEXT NOT NULL,
            youtube_link TEXT DEFAULT '',
            images TEXT[] DEFAULT '{}',
            plan_id TEXT NOT NULL,
            plan_name TEXT NOT NULL,
            expiration_date TIMESTAMPTZ NOT NULL DEFAULT '9999-12-31 23:59:59Z',
            is_active BOOLEAN DEFAULT TRUE,
            created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()),
            updated_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now())
          );

          -- Índices
          CREATE INDEX IF NOT EXISTS pages_slug_idx ON public.pages (slug);
          CREATE INDEX IF NOT EXISTS pages_is_active_idx ON public.pages (is_active);

          -- RLS
          ALTER TABLE public.pages ENABLE ROW LEVEL SECURITY;

          -- Políticas
          CREATE POLICY "Permitir leitura pública" ON public.pages
            FOR SELECT USING (is_active = true);

          CREATE POLICY "Permitir inserção pública" ON public.pages
            FOR INSERT WITH CHECK (true);

          CREATE POLICY "Permitir atualização pública" ON public.pages
            FOR UPDATE USING (true);
        `
      });

      if (createError) {
        console.error('Erro ao criar tabela:', createError);
        return false;
      }
    }

    return true;
  } catch (error) {
    console.error('Erro ao inicializar banco de dados:', error);
    return false;
  }
};