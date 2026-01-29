import { invoke } from '@tauri-apps/api/core';
import { type SyntheticEvent, useEffect, useState } from 'react';
import '../index.css';
import BookmarkButton from '@component/BookmarkButton.tsx';
import ErrorUi from '@component/ErrorUi.tsx';
import Loading from '@component/Loading.tsx';
import { useUser } from '@lib/supabase/query.ts';
import { Link, useNavigate } from 'react-router';

interface Bookmark {
  id: string;
  title: string;
  url: string;
  favicon?: string;
}

const initialBookmarks: Bookmark[] = [
  {
    id: 'google',
    title: 'Google',
    url: 'https://www.google.com',
  },
  {
    id: 'Github',
    title: 'Github',
    url: 'https://github.com',
  },
];

export default function Home() {
  const [url, setUrl] = useState('https://www.google.com');
  const [bookmarks, setBookmarks] = useState<Bookmark[]>(initialBookmarks);
  const nav = useNavigate();
  const { data, isLoading, error } = useUser();

  // 북마크 로드
  useEffect(() => {
    const saved = localStorage.getItem('mybrowser-bookmarks');
    if (saved) {
      try {
        setBookmarks(JSON.parse(saved));
      } catch {}
    }
  }, []);

  if (error) {
    return <ErrorUi />;
  }
  if (isLoading) {
    return <Loading />;
  }
  if (!data) {
    nav('/login');
    return <div />;
  }

  // 북마크 저장
  const saveBookmarks = (newBookmarks: Bookmark[]) => {
    setBookmarks(newBookmarks);
    localStorage.setItem('mybrowser-bookmarks', JSON.stringify(newBookmarks));
  };

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    let finalUrl = url.trim();
    if (!finalUrl) return;

    if (!finalUrl.match(/^https?:\/\//i)) {
      finalUrl = `https://${finalUrl}`;
    }

    await invoke('open_webpage', { url: finalUrl });
    // setUrl(''); ← 새로고침 느낌을 주기 위해 초기화 안 하는 것도 괜찮지만 원하면 주석 해제
  };

  // 북마크 열기
  const openBookmark = async (bmUrl: string) => {
    await invoke('open_webpage', { url: bmUrl });
  };

  // 새 북마크 추가 (임시 prompt 방식)
  const addBookmark = () => {
    const title = prompt('사이트 이름 (제목)을 입력하세요');
    const inputUrl = prompt('URL을 입력하세요 (예: https://example.com)');
    if (!title?.trim() || !inputUrl?.trim()) return;

    let finalUrl = inputUrl.trim();
    if (!finalUrl.match(/^https?:\/\//i)) {
      finalUrl = `https://${finalUrl}`;
    }

    const newBm: Bookmark = {
      id: Date.now().toString(),
      title: title.trim(),
      url: finalUrl,
    };

    saveBookmarks([...bookmarks, newBm]);
  };

  return (
    <div className="overlay min-h-screen bg-linear-to-br from-gray-950 via-gray-900 to-black text-white flex flex-col">
      {/* 상단 툴바 */}
      <div className="toolbar bg-gray-900/80 backdrop-blur-md border-b border-gray-800 px-6 py-3 flex items-center justify-between sticky top-0 z-10">
        <form
          onSubmit={handleSubmit}
          className="url-form flex-1 max-w-3xl mx-auto"
        >
          <input
            type="text"
            className="url-input w-full px-5 py-3 bg-gray-800/70 border border-gray-700 rounded-full text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 shadow-lg"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            onFocus={(e) => e.target.select()}
            spellCheck={false}
            placeholder="웹 주소 입력 또는 검색..."
          />
        </form>

        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={addBookmark}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-md text-sm font-medium transition"
          >
            + 즐겨찾기
          </button>
          <Link to="/logout" className="text-gray-300 hover:text-white text-sm">
            로그아웃
          </Link>
        </div>
      </div>

      {/* 메인 컨텐츠 - 즐겨찾기 그리드 */}
      <div className="flex-1 flex flex-col items-center justify-start pt-16 px-6">
        {bookmarks.length === 0 ? (
          <div className="text-center text-gray-400 mt-20">
            <p className="text-xl mb-4">즐겨찾기가 비어있습니다</p>
            <p className="text-sm">
              + 버튼을 눌러 자주 방문하는 사이트를 추가해보세요
            </p>
          </div>
        ) : (
          <div className="w-full max-w-7xl">
            <h2 className="text-2xl font-semibold mb-6 text-center md:text-left">
              즐겨찾기
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-5">
              {bookmarks.map((bm) => (
                <BookmarkButton
                  key={bm.id}
                  url={bm.url}
                  title={bm.title}
                  onClick={() => openBookmark(bm.url)}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
