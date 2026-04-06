# タスクリスト: articlesページを3列表示に拡大

1. `src/pages/articles/index.astro` の `main` コンテナの `max-width` を `1440px` 程度に拡張し、領域を拡げる。
2. `.post-list ul` のCSSを修正し、デスクトップ表示時に `grid-template-columns: repeat(3, 1fr);` などで3列固定または3列になりやすい幅設定に変更する。
3. モバイル表示の際は1列または2列になるようにメディアクエリを追加/調整する。
