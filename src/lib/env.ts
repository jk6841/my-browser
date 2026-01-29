// server
export const getServer = () => {
  const ret = import.meta.env.VITE_SERVER;
  if (!ret) {
    console.error('No VITE_SERVER');
  }
  return ret || '';
};

// supabase
export const getSupabaseUrl = () => {
  const ret = import.meta.env.VITE_SUPABASE_URL;
  if (!ret) {
    console.error('No VITE_SUPABASE_URL');
  }
  return ret || '';
};

export const getSupabasePublishableKey = () => {
  const ret = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;
  if (!ret) {
    console.error('No VITE_SUPABASE_PUBLISHABLE_KEY');
  }
  return ret || '';
};
