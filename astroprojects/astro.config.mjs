// @ts-check
import { defineConfig } from 'astro/config';

import mdx from '@astrojs/mdx';
import { remarkJapaneseItalic } from './src/utils/remark-japanese-italic.mjs';
import { remarkStripCodeLangMeta } from './src/utils/remark-strip-code-lang-meta.mjs';

// https://astro.build/config
export default defineConfig({
  markdown: {
    remarkPlugins: [
      remarkJapaneseItalic,
      // コードブロックの "javascript:test.js" 形式の言語指定から ":ファイル名" を除去し、
      // Shiki が正しく言語を認識できるようにする（必ず remarkPlugins の末尾に置く）
      remarkStripCodeLangMeta,
    ],
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