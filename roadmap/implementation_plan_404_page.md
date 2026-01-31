# Implementation Plan - 404ページ作成

## Goal Description
ユーザーが意図しないURLにアクセスした際に表示される404ページを作成します。
このページには、リンク切れである旨のメッセージと、サイト内のランダムなページへ遷移するボタンを配置します。

## Proposed Changes

### Pages
#### [NEW] [src/pages/404.astro](file:///c:/Users/etern/OneDrive/code/tctccorpweb/astroprojects/src/pages/404.astro)
- `BaseLayout` を使用してサイトの概観を統一します。
- `getCollection('docs')` を使用して記事一覧を取得し、ホームページ (`/`) も含めたURLリストを生成します。
- クライアントサイドの `<script>` タグで、ボタンクリック時にこのリストからランダムにURLを選択して遷移するロジックを実装します。

## Verification Plan

### Manual Verification
- `npm run dev` でサーバーを起動し、存在しないURL (例: `/random-string`) にアクセスして404ページが表示されるか確認します。
- 「ランダムなページへ」ボタンをクリックし、実際にサイト内の有効なページに遷移することを確認します。
- 遷移先が404ページ自身にならないようにする（リストに含まれていなければOK）ことを確認します。
