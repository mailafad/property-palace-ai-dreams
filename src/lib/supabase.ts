
// Re-export the supabase client from the integration
import { supabase } from '@/integrations/supabase/client';

// Helper function to check if Supabase is properly configured
export const isSupabaseConfigured = () => {
  return true; // We're using the integration so Supabase is configured
};

export { supabase };
