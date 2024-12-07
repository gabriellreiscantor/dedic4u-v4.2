import { supabase } from '../config/supabase';

export const initializeDatabase = async () => {
  try {
    // Verifica se a tabela pages existe
    const { error: checkError } = await supabase
      .from('pages')
      .select('count')
      .limit(1);

    if (checkError && checkError.code === '42P01') {
      // Tabela não existe, vamos criar
      const { error: createError } = await supabase.rpc('exec_sql', {
        sql: `
          create table if not exists public.pages (
            id uuid default uuid_generate_v4() primary key,
            slug text unique not null,
            title text not null,
            message text not null,
            relationship_date text not null,
            youtube_link text,
            images text[] default '{}',
            plan_id text not null,
            plan_name text not null,
            expiration_date timestamp with time zone,
            is_active boolean default true,
            created_at timestamp with time zone default timezone('utc'::text, now()),
            updated_at timestamp with time zone default timezone('utc'::text, now())
          );

          -- Índices
          create index if not exists pages_slug_idx on public.pages (slug);
          create index if not exists pages_is_active_idx on public.pages (is_active);

          -- RLS
          alter table public.pages enable row level security;

          -- Políticas
          create policy "Permitir leitura pública"
            on public.pages for select
            using (is_active = true);

          create policy "Permitir inserção pública"
            on public.pages for insert
            with check (true);

          create policy "Permitir atualização pública"
            on public.pages for update
            using (true);
        `
      });

      if (createError) {
        console.error('Erro ao criar tabela:', createError);
        return false;
      }

      console.log('Tabela pages criada com sucesso');
    }

    // Cria o bucket para armazenar as imagens se não existir
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
    console.error('Erro ao inicializar banco de dados:', error);
    return false;
  }
};