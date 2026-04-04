# タスクリスト：記事コードブロックのシンタックスハイライト対応

## 目的
`[...slug].astro` で表示されるMarkdown/MDX記事内のコードブロックに対して、言語が指定されている場合のみシンタックスハイライトを有効にする。

## 実施内容

### 1. `astro.config.mjs` の更新
- [x] `shikiConfig` を `markdown` セクションに明示的に追加
- [x] `themes.light: 'github-light'` / `themes.dark: 'github-dark'` のデュアルテーマ設定
- [x] `wrap: false` でコードブロックの自動折り返しを無効化

### 2. `src/styles/global.css` の更新
- [x] `.prose pre` のベーススタイル追加（border-radius、padding、overflow-x、margin）
- [x] Shikiデュアルテーマ用CSS変数の適用
  - ライトモード（デフォルト）：`--shiki-light` / `--shiki-light-bg`
  - ダークモード：`@media (prefers-color-scheme: dark)` 内で `--shiki-dark` / `--shiki-dark-bg`
- [x] `font-style`、`font-weight`、`text-decoration` のCSS変数も適用（斜体・太字・取り消し線などのトークン装飾対応）

## 変更ファイル
- `astroprojects/astro.config.mjs`
- `astroprojects/src/styles/global.css`

## 注意事項
- `[...slug].astro` 自体の変更は不要。Shikiによるハイライトはビルド時に自動適用される。
- 言語指定なし（例：` ``` `）のコードブロックはハイライトされない（Shikiのデフォルト動作）。
- ダークモード切り替えは現在 `prefers-color-scheme` ベースのみ。将来的に手動トグルを追加する場合は、`.dark` クラスへの対応も追加が必要。
