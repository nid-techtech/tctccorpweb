# タスクリスト: モバイル表示時のフィルターパネル表示位置の調整

1. `src/pages/articles/index.astro` にて、モバイル用の展開ボタン (`.mobile-filter-toggle`) を `.post-list-container` の外に移動させ、`.content-wrapper` の直下に配置する。
2. メディアクエリ (`max-width: 800px`) 内のCSSで `order` プロパティを使用して、
   - 1番目: 展開ボタン (`.mobile-filter-toggle`)
   - 2番目: フィルターパネル (`.filter-panel`)
   - 3番目: 記事一覧 (`.post-list-container`)
   の順に並び替える。
