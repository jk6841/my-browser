import ErrorUi from '@component/ErrorUi.tsx';
import Loading from '@component/Loading.tsx';
import { createClient } from '@lib/supabase/client.ts';
import { useUser } from '@lib/supabase/query.ts';
import { useNavigate } from 'react-router';

export default () => {
  const nav = useNavigate();
  const { data, isLoading, error } = useUser();
  if (error) {
    return <ErrorUi />;
  }

  if (isLoading) {
    return <Loading />;
  }

  if (data) {
    const logout = async () => {
      const supabase = createClient();
      await supabase.auth.signOut();
      await nav('/login');
    };
    logout();
  }

  return <div />;
};
