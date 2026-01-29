import TextInput from '@component/TextInput.tsx';
import { createFolder } from '@lib/folder.ts';
import { type SyntheticEvent, useState } from 'react';
import { useSearchParams } from 'react-router';
import { useNavigate } from 'react-router-dom';

export default () => {
  const [searchParam] = useSearchParams();
  const [name, setName] = useState('');
  const navigate = useNavigate();
  const folderId = searchParam.get('folderId') || 'root';

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();

    const finalName = name.trim();

    await createFolder(finalName, folderId);

    // 성공 후 홈으로 이동 (또는 toast 보여주기)
    navigate(`/?folderId=${folderId}`);
  };

  return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center p-6">
      <div className="bg-gray-800/80 backdrop-blur-md border border-gray-700 rounded-2xl p-8 w-full max-w-md shadow-2xl">
        <h2 className="text-2xl font-bold mb-6 text-center text-white">
          새 폴더 추가
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          <TextInput
            title={'이름'}
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder={'예: Google'}
          />

          <div className="flex gap-4 mt-8">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="flex-1 py-3 bg-gray-700 hover:bg-gray-600 rounded-lg transition text-white font-medium"
            >
              취소
            </button>
            <button
              type="submit"
              className="flex-1 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg transition font-medium text-white"
            >
              추가
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
