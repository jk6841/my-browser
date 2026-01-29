import { invoke } from '@tauri-apps/api/core';

export const openWebPage = async (url: string) => {
  await invoke('open_webpage', { url });
};
