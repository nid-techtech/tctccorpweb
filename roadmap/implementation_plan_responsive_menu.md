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

---

# Improved Mobile Menu & Overlay (New Requirement)

## Goal Description
モバイルメニュー（ハンバーガーメニュー）のUX/UIを大幅に改善します。オーバーレイ背景による視覚的な分離、右側からのスライドアニメーション、および右寄せのレイアウト変更を行います。

## Proposed Changes
### [Nav]
#### [MODIFY] [Header.astro](file:///c:/Users/etern/OneDrive/code/tctccorpweb/astroprojects/src/components/Header.astro)
- **HTML構造の変更（必要であれば）**
    - `nav-menu` 内に背景用オーバーレイと、メニューコンテンツ（リンク集）を分離する構造を検討、またはCSS擬似要素で対応。
    - `nav-menu` 自体は全画面（ヘッダー以下）を覆うコンテナとして機能させる。

- **CSSスタイルの変更**
    - **コンテナ (`.nav-menu`)**:
        - `top: 100%` (ヘッダーの直下)
        - `left: 0`, `right: 0`, `bottom: 0` (画面下端まで)
        - `height: calc(100vh - [header-height])` (スクロール追従または固定)
        - `position: fixed` または `absolute` (画面全体を覆うため)
        - `visibility` または `pointer-events` で開閉制御
    
    - **オーバーレイ (Backdrop)**:
        - `nav-menu` の擬似要素 `::before` または子要素を使用。
        - 背景色: `var(--color-bg)`
        - 透明度: `opacity: 0.7` (これによりライト/ダーク両モードで自然な見た目にする)
        - トランジション: `opacity`
    
    - **メニューリスト (`ul`)**:
        - 右寄せ配置: `margin-left: auto`
        - 幅: `fit-content` (テキスト幅 + パディング)
            - *Note: ユーザー要望により「メニュー項目の単語幅の1.5倍程度の距離」を右側から離すとあるが、文脈的に「左側に十分な余白を取る＝右寄せ」と解釈。右端配置で左側に大きな余白を作る。*
            - 修正: 「全体をもっと右側に寄せたいので、メニュー項目の単語幅の1.5倍程度の距離だけ右側から離した位置にテキストを左揃えで配置する」
            - つまりメニューコンテナを右に寄せつつ、テキスト自体の配置にも気を使う。
        - 高さ: `100%` (画面下端まで背景色を維持)
        - 背景色: `var(--color-bg)`
        - トランジション: `transform` (スライド動作)
        - 初期状態: `transform: translateX(100%)` (画面外右側)
        - 表示状態: `transform: translateX(0)`

- **アニメーション**
    - メニューオープン時 (`body.menu-open`):
        - オーバーレイ: `opacity: 1`
        - メニューリスト: `transform: translateX(0)`
    - クローズ時:
        - オーバーレイ: `opacity: 0`
        - メニューリスト: `transform: translateX(100%)`

- **その他**
    - メニュー項目のテキストアラインは `left` を維持しつつ、コンテナ自体は右に寄せる。
    - 閉じるボタン以外の領域（オーバーレイ部分）クリックでの閉じる挙動の実装（JS追加）。

## Verification Plan
### Manual Verification
- **レイアウト確認**
    - モバイル表示でハンバーガーメニューをクリックした際、背景に半透明の黒い膜（オーバーレイ）が表示されること。
    - メニュー本体が画面右側からスライドインしてくること。
    - メニューの背景が画面下端まで伸びていること。
    - 左側に十分な余白（オーバーレイが見える領域）があること。
- **動作確認**
    - メニュー開閉のアニメーションが「右から左へ（開く）」「左から右へ（閉じる）」になっていること。
    - 黒いオーバーレイ部分をクリックするとメニューが閉じること（JS追加実装分）。
