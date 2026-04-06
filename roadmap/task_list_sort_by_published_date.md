# タスクリスト：記事一覧ページのソート順を公開日基準に変更

## 概要
全記事一覧ページ（`/all`）において、記事のソート順をアップデート日（`updated_at`）基準から公開日（`created_at`）基準に変更する。

## 対象ファイル
- `astroprojects/src/pages/all/index.astro`

## 変更内容

### 変更前
```typescript
.sort((a, b) => {
    const dateA = new Date(a.data.updated_at ?? a.data.created_at);
    const dateB = new Date(b.data.updated_at ?? b.data.created_at);
    return dateB.getTime() - dateA.getTime();
});
```

### 変更後
```typescript
.sort((a, b) => {
    // 公開日（created_at）基準で降順ソート
    // updated_at は更新管理には使うが、一覧の並び順には影響させない
    const dateA = new Date(a.data.created_at);
    const dateB = new Date(b.data.created_at);
    return dateB.getTime() - dateA.getTime();
});
```

## タスク

- [x] `/all/index.astro` のソートロジックを `created_at` 基準に修正

## ステータス
完了
