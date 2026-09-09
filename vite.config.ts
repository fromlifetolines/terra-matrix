import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
  base: '/terra-matrix/',
  server: {
    port: 3000,
    open: false,
    proxy: {
      '/api/osiris-flights': {
        target: 'https://osirisai.live',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/osiris-flights/, '/api/flights'),
      },
      '/api/noaa-storms': {
        target: 'https://www.nhc.noaa.gov',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/noaa-storms/, '/CurrentStorms.json'),
      },
    },
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: false,
    chunkSizeWarningLimit: 2000,
  },
  resolve: {
    dedupe: ['three'],
  },
});
