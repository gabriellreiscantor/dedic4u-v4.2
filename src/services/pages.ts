import { supabase } from '../config/supabase';
import { FormData, Plan, PageData } from '../types';

export const savePage = async (
  formData: FormData,
  selectedPlan: Plan,
  slug: string
): Promise<boolean> => {
  try {
    // Converte as imagens para base64
    const imagePromises = formData.images.map(image => {
      if (typeof image === 'string') return Promise.resolve(image);
      return new Promise<string>((resolve) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result as string);
        reader.readAsDataURL(image);
      });
    });

    const imageUrls = await Promise.all(imagePromises);
    
    const expirationDate = selectedPlan.id === 'basic' 
      ? new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString()
      : null;

    const { error } = await supabase
      .from('pages')
      .upsert({
        slug,
        title: formData.title,
        message: formData.message,
        relationship_date: formData.relationshipDate,
        youtube_link: formData.youtubeLink,
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

    // Verifica expiração para plano básico
    if (data.expiration_date && new Date(data.expiration_date) < new Date()) {
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