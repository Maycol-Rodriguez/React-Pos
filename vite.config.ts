import react from '@vitejs/plugin-react-swc';
import path from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@/app': path.resolve(__dirname, './src/modules/app'),
      '@/auth': path.resolve(__dirname, './src/modules/auth'),
      '@/brand': path.resolve(__dirname, './src/modules/brand'),
      '@/categories': path.resolve(__dirname, './src/modules/categories'),
      '@/products': path.resolve(__dirname, './src/modules/products'),
      '@/shared': path.resolve(__dirname, './src/modules/shared'),
      '@/units': path.resolve(__dirname, './src/modules/units'),
    },
  },
});
