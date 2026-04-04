import { visit } from 'unist-util-visit';

/**
 * Remark plugin: コードブロックの言語指定から `:ファイル名` メタ情報を除去する
 *
 * Why: Shiki は言語名として "javascript:test.js" を受け取ると、
 * 未知の言語として plaintext にフォールバックしてしまう。
 * VSCode等では ``` javascript:filename.js という記法が一般的なため、
 * `:` 以降の部分をここで除去し、Shiki に純粋な言語名だけを渡すようにする。
 *
 * 例: "javascript:test.js" → "javascript"
 *     "python:example.py" → "python"
 *     "javascript"        → "javascript" (変化なし)
 */
export function remarkStripCodeLangMeta() {
  return (tree) => {
    visit(tree, 'code', (node) => {
      if (node.lang && node.lang.includes(':')) {
        const [lang, ...rest] = node.lang.split(':');
        // meta フィールドにファイル名を保存しておく（将来的な活用のため）
        node.meta = [rest.join(':'), node.meta].filter(Boolean).join(' ');
        node.lang = lang;
      }
    });
  };
}
