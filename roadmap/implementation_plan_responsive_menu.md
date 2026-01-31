# Responsive Menu & Styling

## Goal Description
デスクトップでのリボンメニュー表示と、モバイルでの改善されたハンバーガーメニュー表示を実装します。また、メニュー項目の視認性を向上させます。

## Proposed Changes
### [Nav]
#### [MODIFY] [Header.astro](file:///c:/Users/etern/OneDrive/code/tctccorpweb/astroprojects/src/components/Header.astro)
- CSSメディアクエリを追加して表示を切り替える
    - `@media (min-width: 768px)`: リボンメニューを表示、ハンバーガーボタンを非表示
    - `@media (max-width: 767px)`: リボンメニューを非表示、ハンバーガーボタンを表示
- リボンメニューの実装（デスクトップ用）
    - `nav-menu` クラスとは別の、あるいはスタイル上書きでヘッダー内に表示するメニューを作成。
    - 既存のメニュー構造を再利用できるか検討するが、スタイルが大きく異なるため、分離または条件分岐CSSクラスで対応。
- ハンバーガーメニューの改善
    - リスト項目のサイズ拡大（padding増加など）
    - 画面幅の20%の余白を左側に設ける（`width: 80%; margin-left: auto;` または `left: 20%; right: 0;`）
    - 中央揃えではなく左揃え (`text-align: left; padding-left: 2rem;`)
- タイポグラフィ
    - ロゴテキストとメニュー項目に `font-weight: 700` (Bold) を適用

## Verification Plan
### Manual Verification
- ブラウザのウィンドウサイズを変更して、リボンメニューとハンバーガーメニューが適切に切り替わるか確認。
- モバイル表示時、ハンバーガーメニューが左端に20%の余白を持ち、左揃えで表示されるか確認。リスト項目が押しやすい大きさか確認。
- 全体のメニューテキストが太字になっているか確認。
