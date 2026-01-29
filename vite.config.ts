import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

const host = process.env.TAURI_DEV_HOST;

export default defineConfig(async () => ({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: [
      { find: '@', replacement: '/src' },
      {
        find: '@lib',
        replacement: '/src/lib',
      },
      {
        find: '@page',
        replacement: '/src/page',
      },
      {
        find: '@component',
        replacement: '/src/component',
      },
    ],
  },
  clearScreen: false,

  server: {
    port: 1420,
    strictPort: true,
    host: host || false,
    hmr: host
      ? {
          protocol: 'ws',
          host,
          port: 1421,
        }
      : undefined,
    watch: {
      // 3. tell Vite to ignore watching `src-tauri`
      ignored: ['**/src-tauri/**'],
    },
  },
}));
