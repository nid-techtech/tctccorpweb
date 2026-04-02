---

title: "公式Webサイトの運用を始めました"
created_at: "2026-04-03"
draft: false

subtitle: "We have launched our official website"
description: "GitHubは便利だねぇ"
updated_at: "2026-04-03"
cover: "https://imgur.com/U74XCeD.png"
tags: ["blog","web","p5.js","astro"]
author: "大渕凜"

---

こんにちは。
TECH☆TECHの大渕です。  

今更ながら、公式Webサイトをローンチしました。  

# 今までの状態
tctcの公式サイトはいくつかの変遷を辿っています。  

## Obsidian Publish
私がノートテイキングに[Obsidian](https://obsidian.md/)というマークダウンエディタを使っており、そのノート公開機能（純正）が[Obsidian Publish](https://obsidian.md/publish)です。  

![Obsidianドキュメント](https://i.imgur.com/2dME1KH.png)

これはObsidianの公式ドキュメントで、Obsidian Publishで作成されています。  
Obsidianは相互リンクを使ってページを繋いでいくことにより（脳のシナプスに形容されます）、自分の思考とか記録とかを拡張するという趣旨のソフトです。

Obsidian Publishは有料で、月額$8USDです。
日本円にして1200円くらい？  
これを使ってしばらくtctcの公式サイトを公開していましたが、特にObsidianを使う意味も無いのに結構高い料金払い続けるのが嫌だったので、やめました。  

## WordPress
昨年の新入生勧誘会のタイミングでやろうとしていたのが、自宅サーバーにWordPressをインストールして、Cloudflared tunnelで公開する手法です。  
これはWordPressの設定があまりにも難解で、さらにCloudflared tunnelとの相性も良くなくて、ついに公開することができませんでした。  

## Google Sites
一応、Google Sitesも作ってはありました。
しかし、Google Sitesは組織アカウント、つまり`st.nagaoka-id.ac.jp`のGoogleアカウントで作成すると、独自ドメインに紐付けられないという意味不明な機能制限があり、これも結局公開しないまま放置していました。  

# Astro
去年の夏に、[Astro](https://astro.build/)というフレームワークがアツいという話題がサークルのDiscordで出ました。  
[Astro学習ページ - 3ur3k4](https://3ur3k4-astro-tutorial.netlify.app/)  
それより以前から、VueとNuxt.jsを使ってWebサイトを作る方法について軽く調べてはいましたが、Astroを使うとどうやら軽くて簡単そうだという感じでした。  
![Astro](https://i.imgur.com/gO5ElXT.png)

とはいえ腐ってもjsフレームワークなので、運用は結構大変そうではありました。  

## Antigravityの登場
すると2025年11月、Googleから[**Antigravity**](https://antigravity.google/)というツールが登場しました。  
これはすごいです。
チャットを送るだけで自動でプロジェクトをまるっと作ってくれます。  

そうだ、これを使ってAstroでWebサイトを作ってもらえばよいのです！  

## 全然作らん
Webサイトはどういった運用方法にしたらいいか。
BlogとAboutは分割したほうがいいのか。
その他のフレームワーク、、、例えばDocusaurusとかは？  
などなど、、、会議を踊らせるばかりで、肝心のWebサイトの構築を全然始めていませんでした。

一応、別件で同じ方法でWebサイトを構築し始めていたので、そちらのノウハウも活かすことができています。  

## 重い腰を上げる
1月末、今年度の振り返りをしつつ来年度に向けた準備を始めようという会議のあと、ようやっとWebサイトを作り始めました。  
![当時の様子](https://i.imgur.com/vLUZV7i.png)  

ただ、そのままだといろいろと問題がありました。  
ヘッダーメニューになぜか2種類の矩形が使われていて、それがライトモードとダークモードの切り替えのイージングカーブが違うので切り替え時に浮いて見えたりとか。  

生方さんといっしょに手動で直したり。
コンテンツの構造はどうするのがいいのかとか。
あーでもないこーでもないと言いながら中身を詰めていきました。  

ちなみに前述の、別件のWebサイトは無事構築できて、公開までたどり着きました。
それについては[別記事](https://www.nid-techtech.com/lantern-tech-blog)で書いていますのでそちらをご覧ください。

## p5.js
トップページにp5.jsのスケッチを載せる案。  
![提案](https://i.imgur.com/Fbll220.png)

生方さんはp5.jsのコーディングに長けていますから、期待できます。  
これについては彼も[記事を書いている](https://www.nid-techtech.com/hp-motionlogo)のでそちらが詳しいです。  

# 4月3日ローンチ
![オンライン作業中](https://i.imgur.com/31wmaM3.png)

ホスティングにはCloudflare Pagesを使っています。  
tctcはCloudflareでドメインを管理していますので、公開は簡単です。  

無事、公開することができました。
お疲れ様！  

## 運用は終わらない
今後、もっとたくさん記事を書き続ける必要があります。  
記事の執筆自体は簡単です。
Obsidianにテンプレートを差し込んで文章を書いて、それをGitHubに`push`すれば簡単に公開できます。  

問題は中身ですよ。。。
無駄な記事を書いてもしょうがないですからね。  
とりあえず、現段階で構想しているのは、毎週の定期活動をまとめた日記（日じゃないけど。週だけど）かなぁ？  

