import { invoke } from '@tauri-apps/api/core';
import { type SyntheticEvent, useState } from 'react';
import './index.css';

function App() {
  const [url, setUrl] = useState('https://www.google.com');

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
      </div>
    </div>
  );
}

export default App;
