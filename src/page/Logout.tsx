import { createClient } from '@lib/supabase.ts';
import { useEffect } from 'react';
import { useNavigate } from 'react-router';

export default () => {
  const nav = useNavigate();

  useEffect(() => {
    const logout = async () => {
      const supabase = createClient();
      await supabase.auth.signOut();
      await nav('/');
    };
    logout();
  }, [nav]);

  return <div />;
};
