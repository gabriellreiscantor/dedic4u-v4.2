import { FormData, Plan, PageData } from '../types';

const PAGES_KEY = 'dedic4u_pages';

interface StoredPage extends PageData {
  slug: string;
  expirationDate?: string;
  createdAt: string;
}

export const savePage = async (
  formData: FormData,
  selectedPlan: Plan,
  slug: string
): Promise<boolean> => {
  try {
    const pages = getStoredPages();
    
    // Converte as imagens File para URLs base64
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
      : undefined;

    const newPage: StoredPage = {
      slug,
      title: formData.title,
      message: formData.message,
      relationshipDate: formData.relationshipDate,
      youtubeLink: formData.youtubeLink,
      images: imageUrls,
      planId: selectedPlan.id,
      planName: selectedPlan.name,
      expirationDate,
      createdAt: new Date().toISOString()
    };

    // Remove página antiga com mesmo slug, se existir
    const filteredPages = pages.filter(p => p.slug !== slug);
    filteredPages.push(newPage);
    
    localStorage.setItem(PAGES_KEY, JSON.stringify(filteredPages));
    
    // Verifica se a página foi salva corretamente
    const savedPage = getPageBySlug(slug);
    return savedPage !== null;
  } catch (error) {
    console.error('Erro ao salvar página:', error);
    return false;
  }
};

export const getPageBySlug = (slug: string): PageData | null => {
  try {
    if (!slug) return null;
    
    const pages = getStoredPages();
    const page = pages.find(p => p.slug === slug);
    
    if (!page) return null;

    // Verifica expiração para plano básico
    if (page.expirationDate && new Date(page.expirationDate) < new Date()) {
      deletePage(slug);
      return null;
    }

    return {
      title: page.title,
      message: page.message,
      relationshipDate: page.relationshipDate,
      youtubeLink: page.youtubeLink,
      images: page.images,
      planId: page.planId,
      planName: page.planName
    };
  } catch (error) {
    console.error('Erro ao buscar página:', error);
    return null;
  }
};

const getStoredPages = (): StoredPage[] => {
  try {
    const stored = localStorage.getItem(PAGES_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error('Erro ao ler páginas:', error);
    return [];
  }
};

const deletePage = (slug: string): void => {
  try {
    const pages = getStoredPages().filter(p => p.slug !== slug);
    localStorage.setItem(PAGES_KEY, JSON.stringify(pages));
  } catch (error) {
    console.error('Erro ao deletar página:', error);
  }
};