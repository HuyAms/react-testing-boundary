import {defineConfig} from 'vite';
import react from '@vitejs/plugin-react';
import {configDefaults} from 'vitest/config';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./src/tests/setup.ts'],
    css: true,
    coverage: {
      provider: 'v8',
      reporter: ['text', 'html'],
      exclude: [
        ...(configDefaults.coverage.exclude || []),
        'postcss.config.js',
        'tailwind.config.js',
        'src/main.tsx',
        'src/apollo-client.ts',
        'src/data/**',
      ],
    },
  },
});
