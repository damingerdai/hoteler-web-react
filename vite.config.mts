import 'dotenv/config';
import { defineConfig } from 'vite';
import react, { reactCompilerPreset } from '@vitejs/plugin-react';
import babel from '@rolldown/plugin-babel';
import tailwindcss from '@tailwindcss/vite';
import svgr from 'vite-plugin-svgr';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    outDir: './build'
  },
  plugins: [
    svgr(),
    react(),
    // tailwindcss(),
    babel({ presets: [reactCompilerPreset()] })
  ],
  resolve: {
    alias: {
      '@/': path.resolve(__dirname, './src'),
      '@/atom': path.resolve(__dirname, './src/atom'),
      '@/components': path.resolve(__dirname, './src/components'),
      '@/hooks': path.resolve(__dirname, './src/hooks'),
      '@/lib': path.resolve(__dirname, './src/lib'),
      '@/slice': path.resolve(__dirname, './src/slice'),
      '@/types': path.resolve(__dirname, './src/types'),
      '@/styles': path.resolve(__dirname, './src/styles')
    }
  },
  server: {
    proxy: {
      '/api': {
        target: process.env.BASE_URL ?? 'http://localhost:8090',
        changeOrigin: true
      }
    }
  }
});
