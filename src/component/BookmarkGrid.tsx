import BookmarkGridBookmark from '@component/BookmarkGridBookmark.tsx';
import BookmarkGridFolder from '@component/BookmarkGridFolder.tsx';
import ErrorUi from '@component/ErrorUi.tsx';
import Loading from '@component/Loading.tsx';
import type { Bookmark } from '@lib/bookmark.ts';
import type { Folder } from '@lib/folder.ts';
import { useUser } from '@lib/user.ts';
import { type SyntheticEvent, useState } from 'react';
import { useNavigate } from 'react-router';

export type BookmarkGridProps = {
  bookmarks: Bookmark[];
  folders: Folder[];
};

export default ({ bookmarks, folders }: BookmarkGridProps) => {
  const [isModifiable, setIsModifiable] = useState(false);
  const nav = useNavigate();
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

  const { id: userId } = data;

  const handleClickAddFolder = async (e: SyntheticEvent) => {
    e.preventDefault();
    nav({
      pathname: '/folders',
      search: location.search,
    });
  };

  const handleClickAddBookmark = async (e: SyntheticEvent) => {
    e.preventDefault();
    nav({
      pathname: '/bookmarks',
      search: location.search,
    });
  };

  return (
    <div className="flex-1 flex flex-col items-center justify-start pt-16 px-6">
      <div className="w-full max-w-7xl">
        <div className="flex items-center justify-between mb-4">
          {userId && (
            <>
              <button
                onClick={handleClickAddFolder}
                type="button"
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-md text-sm font-medium transition"
              >
                폴더 추가
              </button>
              <button
                onClick={handleClickAddBookmark}
                type="button"
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-md text-sm font-medium transition"
              >
                북마크 추가
              </button>
              <button
                type="button"
                onClick={() => setIsModifiable(!isModifiable)}
                className={`
            px-4 py-2 rounded-lg font-medium transition-colors
            ${
              isModifiable
                ? 'bg-red-600 hover:bg-red-700 text-white'
                : 'bg-gray-700 hover:bg-gray-600 text-gray-200'
            }
          `}
              >
                {isModifiable ? '작업 모드 해제' : '작업 모드'}
              </button>
            </>
          )}
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-5">
          {folders.map((folder) => (
            <BookmarkGridFolder
              key={folder.id}
              id={folder.id}
              name={folder.name}
              modifiable={isModifiable}
            />
          ))}
          {bookmarks.map((bm) => (
            <BookmarkGridBookmark
              key={bm.id}
              id={bm.id}
              url={bm.url}
              name={bm.name}
              modifiable={isModifiable}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
