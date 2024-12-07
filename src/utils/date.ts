import { formatDistanceToNow } from 'date-fns';
import { ptBR } from 'date-fns/locale';

export const formatRelationshipTime = (date: string): string => {
  if (!date) return '';
  
  try {
    return formatDistanceToNow(new Date(date), {
      locale: ptBR,
      addSuffix: true,
    });
  } catch {
    return '';
  }
};