import { invoke } from '@tauri-apps/api/core';
import { type SyntheticEvent, useEffect, useState } from 'react';
import '../index.css';
import { createClient } from '@lib/supabase/client.ts';
import { Link, useNavigate } from 'react-router';

export default function () {
  const [url, setUrl] = useState('https://www.google.com');
  const nav = useNavigate();

  useEffect(() => {
    const checkLogin = async () => {
      const supabaseClient = createClient();
      const user = await supabaseClient.auth.getUser();
      if (!user.data.user) {
        nav('/login');
      }
    };
    checkLogin();
  }, [nav]);

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
