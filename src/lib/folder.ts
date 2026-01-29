import { getServer } from '@lib/env.ts';
import { fetch } from '@tauri-apps/plugin-http';

export type Folder = {
  id: string;
  name: string;
};

export const createFolder = async (name: string, folderId: string) => {
  const res = await fetch(`${getServer()}/api/folders`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name,
      folderId,
    }),
  });
  if (!res.ok) {
    throw new Error(`Failed to create folder ${name}`);
  }
  await res.json();
};

export const getFolder = async (folderId: string) => {
  const res = await fetch(`${getServer()}/api/folders/${folderId}`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
    },
  });
  return await res.json();
};

export const deleteFolder = async (folderId: string) => {
  const res = await fetch(`${getServer()}/api/folders/${folderId}`, {
    method: 'DELETE',
  });
  await res.json();
};
