import { defineConfig } from 'vite';
import glob from 'glob';
import injectHTML from 'vite-plugin-html-inject';
import FullReload from 'vite-plugin-full-reload';

export default defineConfig(({ command }) => {
  return {
    base: '/zvigert-partner-2.0/',
    define: {
      [command === 'serve' ? 'global' : '_global']: {},
    },
    root: 'src',
    publicDir: '../public', // <--- ИЗМЕНИТЕ ЭТО, ЕСЛИ ВАША ПАПКА PUBLIC НАХОДИТСЯ НЕПОСРЕДСТВЕННО В КОРНЕ ПРОЕКТА.
                            // Если ваша папка public это 'project-root/src/public/',
                            // то здесь должно быть:
                            // publicDir: 'src/public', <--- ПОПРОБУЙТЕ ЭТОТ ВАРИАНТ

    build: {
      sourcemap: true,
      rollupOptions: {
        input: glob.sync('./src/*.html'), // Это уже настроено на src
        output: {
          manualChunks(id) {
            if (id.includes('node_modules')) {
              return 'vendor';
            }
          },
          entryFileNames: 'commonHelpers.js',
        },
      },
      outDir: '../dist', // Это корректно, результат сборки будет в project-root/dist
    },
    plugins: [injectHTML(), FullReload(['./src/**/**.html'])],
  };
});