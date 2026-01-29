import { type SyntheticEvent, useEffect, useState } from 'react';
import '../index.css';
import BookmarkGrid from '@component/BookmarkGrid.tsx';
import ErrorUi from '@component/ErrorUi.tsx';
import Loading from '@component/Loading.tsx';
import type { Bookmark } from '@lib/bookmark.ts';
import { type Folder, getFolder } from '@lib/folder.ts';
import { openWebPage } from '@lib/tauri.ts';
import { getFinalUrl } from '@lib/url.ts';
import { useUser } from '@lib/user.ts';
import { Link, useSearchParams } from 'react-router';

export default function Home() {
  const [searchParams] = useSearchParams();
  const folderId = searchParams.get('folderId') || 'root';

  const [url, setUrl] = useState('');
  const [folder, setFolder] = useState<{
    bookmarks: Bookmark[];
    folders: Folder[];
  }>({ bookmarks: [], folders: [] });

  useEffect(() => {
    const initFolder = async () => {
      const folder = await getFolder(folderId);
      setFolder(folder);
    };
    initFolder();
  }, [folderId]);

  const { data, isLoading, error } = useUser();

  if (!data) {
    return <ErrorUi />;
  }

  if (error) {
    return <ErrorUi />;
  }
  if (isLoading) {
    return <Loading />;
  }

  const { id: userId, email } = data;

  console.log(data);

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    const finalUrl = getFinalUrl(url);
    await openWebPage(finalUrl);
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
            placeholder="웹 주소 입력..."
          />
        </form>

        <div className="flex items-center gap-4">
          {userId && (
            <div className="text-gray-300 hover:text-white text-sm">
              {email}
            </div>
          )}
          <Link
            to={userId ? '/logout' : '/login'}
            className="text-gray-300 hover:text-white text-sm"
          >
            {userId ? '로그아웃' : '로그인'}
          </Link>
        </div>
      </div>

      {/* 메인 컨텐츠 - 즐겨찾기 그리드 */}
      <BookmarkGrid bookmarks={folder.bookmarks} folders={folder.folders} />
    </div>
  );
}
