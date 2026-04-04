// @ts-check
import { defineConfig } from 'astro/config';

import mdx from '@astrojs/mdx';
import { remarkJapaneseItalic } from './src/utils/remark-japanese-italic.mjs';

// https://astro.build/config
export default defineConfig({
  markdown: {
    remarkPlugins: [remarkJapaneseItalic],
    // Shiki によるシンタックスハイライト（言語指定ありのコードブロックに自動適用）
    // ライト/ダーク両対応テーマを CSS カスタムプロパティで切り替える
    shikiConfig: {
      themes: {
        light: 'github-light',
        dark: 'github-dark',
      },
      // 言語が指定されていない場合はハイライトしない
      wrap: false,
    },
  },
  integrations: [mdx()]
});