# Implementation Plan

1. **`src/components/Header.astro`の変更**
   - `<nav class="desktop-menu">` 内の `WORKS` のリンク（`href`）を `/works` から `/articles?category=works` に変更する。
   - `<nav class="desktop-menu">` 内の `ALL` を `ARTICLES` に変更する（テキスト部分）。
   - モバイル向けメニューの `<nav id="nav-menu" class="nav-menu">` 内の該当箇所についても同様に、`WORKS` のリンク変更と `ALL` から `ARTICLES` へのテキスト変更を行う。

2. **タグ検索用ページの削除**
   - 以前のタグ検索機能用に作成された動的ルーティングのディレクトリ `src/pages/[tag]` をディレクトリごと削除する。
