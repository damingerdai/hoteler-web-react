import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';
import react from '@vitejs/plugin-react-swc';
import svgr from 'vite-plugin-svgr';

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    outDir: './build'
  },
  plugins: [tsconfigPaths(), svgr(), react()],
  server: {
    proxy: {
      "/api": {
        target: 'http://localhost:8090',
        changeOrigin: true,
      }
    }
  }
})
