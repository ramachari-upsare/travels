import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Vercel settings for this project must be:
//   Framework preset: Vite   •   Build command: npm run build   •   Output: dist
export default defineConfig({
  plugins: [react()],
  // Allow the sandbox preview host (and any host) while developing.
  server: { host: true, allowedHosts: true },
  preview: { host: true, allowedHosts: true },
  build: {
    target: 'es2019',
    assetsInlineLimit: 4096
  }
});
