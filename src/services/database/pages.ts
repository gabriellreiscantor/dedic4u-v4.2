import { supabase } from '../../config/supabase';
import { FormData, Plan, PageData } from '../../types';
import { convertImagesToBase64 } from '../../utils/images';

export const savePage = async (
  formData: FormData,
  selectedPlan: Plan,
  slug: string
): Promise<boolean> => {
  try {
    const imageUrls = await convertImagesToBase64(formData.images as File[]);
    
    // Define a data de expiração para planos básicos
    // Para planos premium, usa a data máxima do PostgreSQL
    const expirationDate = selectedPlan.id === 'basic' 
      ? new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString()
      : '9999-12-31T23:59:59Z';

    const { error } = await supabase
      .from('pages')
      .upsert({
        slug,
        title: formData.title,
        message: formData.message,
        relationship_date: formData.relationshipDate,
        youtube_link: formData.youtubeLink || '',
        images: imageUrls,
        plan_id: selectedPlan.id,
        plan_name: selectedPlan.name,
        expiration_date: expirationDate,
        is_active: true
      });

    if (error) throw error;
    return true;
  } catch (error) {
    console.error('Erro ao salvar página:', error);
    return false;
  }
};

export const getPageBySlug = async (slug: string): Promise<PageData | null> => {
  try {
    const { data, error } = await supabase
      .from('pages')
      .select('*')
      .eq('slug', slug)
      .eq('is_active', true)
      .single();

    if (error || !data) return null;

    // Verifica expiração apenas para planos básicos
    if (data.plan_id === 'basic' && new Date(data.expiration_date) < new Date()) {
      await supabase
        .from('pages')
        .update({ is_active: false })
        .eq('slug', data.slug);
      return null;
    }

    return {
      title: data.title,
      message: data.message,
      relationshipDate: data.relationship_date,
      youtubeLink: data.youtube_link,
      images: data.images,
      planId: data.plan_id,
      planName: data.plan_name
    };
  } catch (error) {
    console.error('Erro ao buscar página:', error);
    return null;
  }
};