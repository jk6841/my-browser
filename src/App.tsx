import { invoke } from '@tauri-apps/api/core';
import { type SyntheticEvent, useEffect, useState } from 'react';
import './index.css';
import { createClient } from '@lib/supabase/client';
import { Link, useNavigate } from 'react-router';

function App() {
  const [url, setUrl] = useState('https://www.google.com');
  const [loginState, setLoginState] = useState<boolean>(false);
  const nav = useNavigate();

  useEffect(() => {
    const checkLogin = async () => {
      const supabaseClient = createClient();
      const user = await supabaseClient.auth.getUser();
      if (user.data.user) {
        setLoginState(true);
      }
    };
    checkLogin();
  }, []);

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    let finalUrl = url.trim();
    if (!finalUrl) return;

    if (!finalUrl.match(/^https?:\/\//i)) {
      finalUrl = `https://${finalUrl}`;
    }

    await invoke('open_webpage', { url: finalUrl });
    setUrl(finalUrl);
  };

  if (!loginState) {
    return nav('/login');
  }

  return (
    <div className="overlay">
      <div className="toolbar">
        <form onSubmit={handleSubmit} className="url-form">
          <input
            type="text"
            className="url-input"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            onFocus={(e) => e.target.select()}
            spellCheck={false}
          />
        </form>
        <Link to={'/logout'}>로그아웃</Link>
      </div>
    </div>
  );
}

export default App;
