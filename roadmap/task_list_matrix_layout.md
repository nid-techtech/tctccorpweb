# 記事マトリクス表示化 (Matrix Layout)

- [x] `src/pages/articles/index.astro` の `.post-list ul` を `display: grid` に変更。
- [x] 画面幅に応じたカラム切り替え用として `grid-template-columns: repeat(auto-fill, minmax(240px, 1fr))` を適用。
- [x] `.post-card` を縦並び（`flex-direction: column`）にし、画像の横幅合わせとホバー時のシャドウ・リフトアニメーションを追加。
- [x] カードデザインをスッキリさせるため、説明文（description）を非表示設定に変更。
- [x] 不要なモバイル向けメディアクエリ（flex-direction変更等のオーバーライド）を削除。
