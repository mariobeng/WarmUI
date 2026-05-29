import { defineConfig } from 'vite';
import { resolve } from 'path';
import { copyFileSync, mkdirSync, existsSync, readFileSync, writeFileSync } from 'fs';

export default defineConfig({
    base: '',
    build: {
        outDir: 'dist',
        emptyOutDir: true,
        rollupOptions: {
            input: {
                popup: resolve(__dirname, 'popup/popup.html'),
                content: resolve(__dirname, 'content/content.js'),
                'service-worker': resolve(__dirname, 'background/service-worker.js')
            },
            output: {
                entryFileNames: '[name].js',
                chunkFileNames: 'chunks/[name]-[hash].js',
                assetFileNames: 'assets/[name]-[hash][extname]'
            }
        },
        minify: false
    },
    plugins: [
        {
            name: 'copy-extension-files',
            writeBundle() {
                const distDir = resolve(__dirname, 'dist');

                // 复制 manifest.json（修正 content_scripts 路径）
                const manifestSrc = resolve(__dirname, 'manifest.json');
                const manifestDest = resolve(distDir, 'manifest.json');
                if (existsSync(manifestSrc)) {
                    const manifest = JSON.parse(readFileSync(manifestSrc, 'utf-8'));
                    // 构建后 content.js 在根目录，修正路径
                    if (manifest.content_scripts && manifest.content_scripts[0]) {
                        manifest.content_scripts[0].js = ['content.js'];
                    }
                    // 构建后 service-worker 在根目录
                    if (manifest.background) {
                        manifest.background.service_worker = 'service-worker.js';
                        delete manifest.background.type;
                    }
                    writeFileSync(manifestDest, JSON.stringify(manifest, null, 2));
                }

                // 复制 icons 目录
                const iconsDir = resolve(distDir, 'icons');
                if (!existsSync(iconsDir)) {
                    mkdirSync(iconsDir, { recursive: true });
                }
                const iconFiles = ['icon16.png', 'icon48.png', 'icon128.png'];
                for (const file of iconFiles) {
                    const src = resolve(__dirname, 'icons', file);
                    const dest = resolve(iconsDir, file);
                    if (existsSync(src)) {
                        copyFileSync(src, dest);
                    }
                }
            }
        }
    ]
});
