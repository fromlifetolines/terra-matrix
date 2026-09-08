import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
  base: '/terra-matrix/',
  server: {
    port: 3000,
    open: false,
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: false,
    chunkSizeWarningLimit: 2000,
  }
});
