import { createClient } from '@lib/supabase/client.ts';
import { useQuery } from '@tanstack/react-query';

export const useUser = () =>
  useQuery({
    queryFn: async () => {
      const supabaseClient = createClient();
      const userRes = await supabaseClient.auth.getUser();
      if (!userRes) {
        return Promise.reject();
      }
      const { user } = userRes.data;
      if (!user) {
        return null;
      }
      return user.id;
    },
    queryKey: ['user'],
  });
