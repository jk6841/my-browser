import { getSupabasePublishableKey, getSupabaseUrl } from '@lib/env';
import { createBrowserClient } from '@supabase/ssr';

export const createClient = () => {
  return createBrowserClient(getSupabaseUrl(), getSupabasePublishableKey());
};
