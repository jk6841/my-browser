import { deleteBookmark } from '@lib/bookmark.ts';
import { openWebPage } from '@lib/tauri.ts';

export default ({ id, name, url, modifiable }: BookmarkButtonProps) => {
  const handleDelete = async () => {
    await deleteBookmark(id);
  };

  return (
    <div
      className="group bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-4 flex flex-col items-center text-center cursor-pointer hover:border-blue-500 hover:bg-gray-700/60 hover:shadow-xl transition-all duration-200 h-20"
      onClick={() => openWebPage(url)}
    >
      {modifiable && (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation(); // 클릭이 폴더 선택으로 전파되지 않게
            handleDelete();
          }}
          className="
            absolute -top-2 -right-2 w-6 h-6 bg-red-600 text-white rounded-full
            flex items-center justify-center text-sm font-bold shadow-md
            hover:bg-red-700 transition-colors z-10
          "
        >
          ×
        </button>
      )}
      <h3 className="text-sm font-medium line-clamp-2">{name}</h3>
      <p className="text-xs text-gray-400 mt-1 line-clamp-1 opacity-70 group-hover:opacity-100">
        {url}
      </p>
    </div>
  );
};

export type BookmarkButtonProps = {
  id: string;
  name: string;
  url: string;
  modifiable: boolean;
};
