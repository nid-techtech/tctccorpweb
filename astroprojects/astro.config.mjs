// @ts-check
import { defineConfig } from 'astro/config';

import mdx from '@astrojs/mdx';
import { remarkJapaneseItalic } from './src/utils/remark-japanese-italic.mjs';

// https://astro.build/config
export default defineConfig({
  markdown: {
    remarkPlugins: [remarkJapaneseItalic]
  },
  integrations: [mdx()]
});