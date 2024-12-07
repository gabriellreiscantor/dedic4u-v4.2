import { supabase } from '../../config/supabase';
import { initializeDatabase } from './initialize';
import { savePage, getPageBySlug } from './pages';

export {
  supabase,
  initializeDatabase,
  savePage,
  getPageBySlug
};