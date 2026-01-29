import { createClient } from '@lib/supabase/client.ts';
import { useEffect } from 'react';
import { useNavigate } from 'react-router';

export default () => {
  const nav = useNavigate();

  useEffect(() => {
    const supabase = createClient();

    const logOut = async () => {
      await supabase.auth.signOut();
      nav('/login');
    };

    logOut();
  }, [nav]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <p>로그아웃 중...</p>
    </div>
  );
};
