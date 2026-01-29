import { getServer } from '@lib/env.ts';
import { fetch } from '@tauri-apps/plugin-http';

export type Bookmark = {
  id: string;
  name: string;
  url: string;
};
export const createBookmark = async (
  name: string,
  url: string,
  folderId: string
) => {
  try {
    const _parsedUrl = new URL(url);
    const res = await fetch(`${getServer()}/api/bookmarks`, {
      method: 'POST',
      body: JSON.stringify({
        name,
        url,
        folderId,
      }),
    });
    await res.json();
    return;
  } catch {
    throw Error(`Invalid URL: ${url}`);
  }
};

export const deleteBookmark = async (bookmarkId: string) => {
  const res = await fetch(`${getServer()}/api/bookmarks/${bookmarkId}`, {
    method: 'DELETE',
  });
  await res.json();
  return;
};
