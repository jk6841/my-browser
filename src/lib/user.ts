import { createClient } from '@lib/supabase.ts';
import { useQuery } from '@tanstack/react-query';

const anonymousUser = {
  id: '',
  email: '',
  bookmarks: [],
} as const;

export const useUser = () =>
  useQuery({
    queryFn: async () => {
      const supabase = createClient();
      const userRes = await supabase.auth.getUser();

      if (!userRes?.data?.user) {
        return anonymousUser;
      }
      const { id, email } = userRes.data.user;

      if (!id) {
        return anonymousUser;
      }
      return {
        id,
        email,
      };
    },
    queryKey: ['user'],
  });
