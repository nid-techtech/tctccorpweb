# Implementation Plan - Astro Site Construction

## Goal
Obsidian Vault のバックアップ (`obsidian_backup/techtechsite`) を元に、メンテナンスが容易で軽量な静的Webサイトを Astro で構築する。

## Requirements
- デスクトップ・モバイル対応レスポンシブデザイン
- ライト/ダークモード切り替え (デフォルト: ライト)
- ハンバーガーメニューによる階層ナビゲーション
- フォント: Noto Sans CJK JP (本文), Fira Code (コード)
- ファイルベースルーティング (mdファイル = ページ)
- メタデータ表示 (タイトル, カバー画像, 日付, 著者など)
- 新着記事ウィジェット
- 埋め込みコンポーネント (Imgur, YouTube, Link Preview)

## Tech Stack
- **Framework**: Astro (Latest)
- **Styling**: Vanilla CSS (Scoped) + CSS Variables (Theme)
- **Content**: Astro Content Collections or Pages (Markdown)

## Proposed Changes

### Project Structure
- `src/content` に Markdown を配置し、`src/pages/[...slug].astro` で動的にレンダリングする方式を採用。
- メタデータの型安全な取得とディレクトリ構造の維持を両立。

### Design & Layout
- **BaseLayout.astro**: Head設定, テーマスクリプト
- **Header.astro**: ハンバーガーメニュー, ロゴ
- **Footer.astro**: コピーライト

### Feature Implementation
- **テーマ切り替え**: CSS Custom Properties
- **ナビゲーション**: 再帰的メニュー生成
- **新着ウィジェット**: コレクションから日付順取得

## Verification Plan
1. `npm run dev` でローカルプレビュー確認
2. レスポンシブ表示の確認 (Chrome DevTools Mobile View)
3. ライト/ダークモードの切り替え動作確認
4. Obsidianバックアップからのコンテンツコピーと表示確認
