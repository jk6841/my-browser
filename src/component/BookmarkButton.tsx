export default ({ title, url, onClick }: BookmarkButtonProps) => {
  const { protocol, hostname } = new URL(url);

  return (
    <div
      className="group bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-4 flex flex-col items-center text-center cursor-pointer hover:border-blue-500 hover:bg-gray-700/60 hover:shadow-xl transition-all duration-200 h-40"
      onClick={onClick}
    >
      <img
        src={`${protocol}${hostname}/favicon.ico`}
        alt={title}
        className="w-14 h-14 mb-3 rounded-lg shadow group-hover:scale-110 transition-transform"
      />
      <h3 className="text-sm font-medium line-clamp-2">{title}</h3>
      <p className="text-xs text-gray-400 mt-1 line-clamp-1 opacity-70 group-hover:opacity-100">
        {hostname}
      </p>
    </div>
  );
};

export type BookmarkButtonProps = {
  title: string;
  url: string;
  onClick?: () => void;
};
