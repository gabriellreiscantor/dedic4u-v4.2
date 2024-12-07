import { FormData } from '../types';

export const validateYoutubeUrl = (url: string): boolean => {
  if (!url) return true;
  const pattern = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/.+$/;
  return pattern.test(url);
};

export const validateForm = (formData: FormData): string[] => {
  const errors: string[] = [];

  if (!formData.title.trim()) {
    errors.push('O título é obrigatório');
  }

  if (!formData.message.trim()) {
    errors.push('A mensagem é obrigatória');
  }

  if (!formData.relationshipDate) {
    errors.push('A data do relacionamento é obrigatória');
  }

  if (formData.youtubeLink && !validateYoutubeUrl(formData.youtubeLink)) {
    errors.push('O link do YouTube é inválido');
  }

  return errors;
};