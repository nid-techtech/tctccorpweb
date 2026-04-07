/**
 * サイト共通の定数
 */

// 記事のルートカテゴリ（tagsの中からこれに含まれるものをカテゴリとして扱う）
export const CATEGORIES = ["blog", "works", "info"];

export type Category = typeof CATEGORIES[number];
