import { supabase } from '../config/supabase';

export const setupSupabase = async () => {
  try {
    // 1. Criar a tabela pages se não existir
    const { error: tableError } = await supabase.rpc('exec_sql', {
      sql: `
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

        -- Índices
        CREATE INDEX IF NOT EXISTS pages_slug_idx ON public.pages (slug);
        CREATE INDEX IF NOT EXISTS pages_is_active_idx ON public.pages (is_active);
      `
    });

    if (tableError) {
      console.error('Erro ao criar tabela:', tableError);
      return false;
    }

    // 2. Habilitar RLS
    const { error: rlsError } = await supabase.rpc('exec_sql', {
      sql: `
        ALTER TABLE public.pages ENABLE ROW LEVEL SECURITY;
      `
    });

    if (rlsError) {
      console.error('Erro ao habilitar RLS:', rlsError);
      return false;
    }

    // 3. Criar políticas de acesso
    const { error: policiesError } = await supabase.rpc('exec_sql', {
      sql: `
        -- Política de leitura pública
        CREATE POLICY "Permitir leitura pública" ON public.pages
          FOR SELECT USING (is_active = true);

        -- Política de inserção pública
        CREATE POLICY "Permitir inserção pública" ON public.pages
          FOR INSERT WITH CHECK (true);

        -- Política de atualização pública
        CREATE POLICY "Permitir atualização pública" ON public.pages
          FOR UPDATE USING (true);
      `
    });

    if (policiesError) {
      console.error('Erro ao criar políticas:', policiesError);
      return false;
    }

    // 4. Criar bucket para imagens se não existir
    const { data: buckets } = await supabase.storage.listBuckets();
    const pagesBucket = buckets?.find(b => b.name === 'pages');

    if (!pagesBucket) {
      const { error: bucketError } = await supabase.storage.createBucket('pages', {
        public: true,
        fileSizeLimit: 5242880, // 5MB
        allowedMimeTypes: ['image/jpeg', 'image/png', 'image/gif']
      });

      if (bucketError) {
        console.error('Erro ao criar bucket:', bucketError);
        return false;
      }
    }

    return true;
  } catch (error) {
    console.error('Erro ao configurar Supabase:', error);
    return false;
  }
};