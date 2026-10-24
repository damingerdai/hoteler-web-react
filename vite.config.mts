import { defineConfig, loadEnv } from 'vite';
import react, { reactCompilerPreset } from '@vitejs/plugin-react';
import babel from '@rolldown/plugin-babel';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), 'BASE_URL');

  return {
    build: {
      outDir: './build'
    },
    plugins: [react(), babel({ presets: [reactCompilerPreset()] })],
    server: {
      proxy: {
        '/api': {
          target: env.BASE_URL ?? 'http://localhost:8090',
          changeOrigin: true
        }
      }
    }
  };
});
