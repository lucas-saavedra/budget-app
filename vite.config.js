
import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import vue from '@vitejs/plugin-vue'
import path from 'path';

export default defineConfig({
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "resources/js/src/"),
        }
    },
    plugins: [
        laravel({
            input: [
                'resources/js/src/assets/sass/app.scss',
                'resources/js/src/main.js',
            ],
            refresh: true,
        }),
        vue({
            template: {
                transformAssetUrls: {
                    base: null,
                    includeAbsolute: false,
                },
            },
        }),
    ],
});
