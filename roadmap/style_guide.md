# Style Guide

このドキュメントは、TECH☆TECH CorpWebプロジェクトの一貫したデザインと開発を保証するためのスタイルガイドです。

## 1. カラーパレット (Color Palette)

色の変数は `src/styles/global.css` の `:root` で定義します。

| 用途 | 色 | HEXコード | CSS変数 |
| :--- | :--- | :--- | :--- |
| **Primary** | Teal | `#2DD4BF` | `var(--color-primary)` |
| **Secondary** | Dark Blue | `#0F172A` | `var(--color-secondary)` |
| **Accent** | Bright Pink | `#EC4899` | `var(--color-accent)` |
| **Text (Dark)** | Slate Gray | `#334155` | `var(--color-text-dark)` |
| **Text (Light)** | White | `#FFFFFF` | `var(--color-text-light)` |
| **Background** | Light Gray | `#F1F5F9` | `var(--color-bg)` |
| **Success** | Green | `#10B981` | `var(--color-success)` |
| **Warning** | Amber | `#F59E0B` | `var(--color-warning)` |
| **Error** | Red | `#EF4444` | `var(--color-error)` |

## 2. タイポグラフィ (Typography)

### フォントファミリー
- **見出し**: `var(--font-family-heading)` - 'Helvetica Neue', Arial, sans-serif
- **本文**: `var(--font-family-body)` - 'Georgia', serif

### フォントサイズ
- `<h1>`: 2.5rem (40px)
- `<h2>`: 2rem (32px)
- `<h3>`: 1.75rem (28px)
- `<h4>`: 1.5rem (24px)
- `<p>` (本文): 1rem (16px)
- `small`: 0.875rem (14px)

### フォントウェイト
- **Regular**: 400
- **Bold**: 700

## 3. スペーシング (Spacing)

一貫性を保つため、`0.25rem` (4px) を基本単位とするスペーシングシステムを使用します。

- `space-xs`: 0.25rem (4px)
- `space-sm`: 0.5rem (8px)
- `space-md`: 1rem (16px)
- `space-lg`: 2rem (32px)
- `space-xl`: 4rem (64px)

## 4. ブレークポイント (Breakpoints)

レスポンシブデザインのためのブレークポイントです。

- `sm`: 640px
- `md`: 768px
- `lg`: 1024px
- `xl`: 1280px

## 5. コンポーネント (Components)

### ボタン (Buttons)

- **Primary Button**: 背景色がプライマリカラー、テキストがライトカラー。
- **Secondary Button**: ボーダーがプライマリカラー、背景が透明、テキストがプライマリカラー。
- **Hover State**: ホバー時にはアクセントカラーに変化させるなど、視覚的なフィードバックを提供します。

### カード (Cards)

- 角丸 (`border-radius`) を使用し、ドロップシャドウで奥行きを表現します。
- パディングは `space-md` を基本とします。

## 6. CSSファイル構成

- `src/styles/global.css`: 全体的なスタイル、CSS変数、基本的な要素のスタイルを定義します。
- `src/components/*.astro`: 各コンポーネントに閉じたスコープのスタイルを `<style>` タグ内に記述します。

---

このガイドはプロジェクトの進行に合わせて更新されます。
