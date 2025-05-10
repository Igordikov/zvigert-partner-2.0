import { defineConfig } from 'vite';
import glob from 'glob';
import injectHTML from 'vite-plugin-html-inject';
import FullReload from 'vite-plugin-full-reload';

export default defineConfig(({ command }) => {
  return {
    // --- КЛЮЧЕВАЯ НАСТРОЙКА для GitHub Pages ---
    // Указывает базовый путь, по которому будет доступен ваш сайт.
    // Для https://username.github.io/repository-name/ это должно быть '/repository-name/'
    base: '/zvigert-partner-2.0/', // Это уже корректно установлено вами!

    define: {
      // Эта настройка специфична для вашего проекта, оставляем как есть
      [command === 'serve' ? 'global' : '_global']: {},
    },

    // --- Настройки путей проекта ---
    // Указывает, что корень вашего исходного кода находится в папке 'src'
    // Это значит, что Vite будет искать index.html и другие входные точки в 'src/'
    root: 'src',

    build: {
      sourcemap: true, // Генерировать sourcemaps (полезно для отладки)

      rollupOptions: {
        // Указывает, что все HTML-файлы в папке 'src' являются входными точками для сборки
        // Это позволяет создавать многостраничные сайты
        input: glob.sync('./src/*.html'),
        output: {
          manualChunks(id) {
            if (id.includes('node_modules')) {
              return 'vendor';
            }
          },
          // Имя для основного JS-файла, если у вас есть общие модули
          entryFileNames: 'commonHelpers.js',
        },
      },
      // --- КУДА БУДЕТ СОБИРАТЬСЯ ПРОЕКТ ---
      // Указывает, что собранный сайт будет помещен в папку 'dist'
      // которая будет создана в корне вашего проекта (на один уровень выше 'src')
      outDir: '../dist',
    },

    plugins: [
      injectHTML(), // Плагин для вставки HTML (если используется)
      FullReload(['./src/**/**.html']) // Плагин для перезагрузки при изменениях HTML
    ],
  };
});