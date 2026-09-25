---
name: readable-schematic
description: 人が読む回路図 (教科書・解説・記事・README の図) を、読みやすい配置で書く・直すときに使う。信号は左から右・電位の高いほうを上・4 方向の交点を作らない・計器は測る所の隣、といった回路図の一般的な流儀を出典つきでまとめ、描いた図を画像にして目で確かめる手順と点検表を添えてある。描く道具は問わない (circuitikz・Schemdraw・KiCad・Markdown のフェンスなど)。Use when drawing or cleaning up circuit schematics meant for human readers, in any tool — layout conventions (signal flow, power at top, ground at bottom, T-junctions, label placement, meter placement) with sources, plus a render-and-inspect checklist.
---

# 人が読みやすい回路図を書く

つながりは正しいのに読みにくい回路図を避けるための、配置の決めごと。
ネットリストや ERC は「つながり」しか見ないので、この skill の点検は**図を画像にして目で見て**行う。

- §1 は回路図の一般的な流儀 (出典は末尾)。どの道具で描いても通用する
- §2 は手順と点検表
- §3 は道具ごとの補足 (いまは circuit フェンスだけ)

## 1. 回路図の一般的な流儀

回路図の描き方に万人共通の決まりは無い。どれも**読み手が誤解しないため**の
慣習で、会社や分野ごとの流儀がある ([ト技])。回路図は目的 (動作の説明・設計・製作)
によって描き方が変わる ([高知工大])。この skill が扱うのは**動作を説明する図**。

「出典」の列は、本文を読んで確かめた出典の略号 (末尾の一覧)。
**「未確認」は、読めた出典のどの本文にも書かれていなかったもの**、
**「実測」は circuit フェンスで描き比べて決めたもの** (§3)。

| # | 決め | なぜ | 出典 |
| --- | --- | --- | --- |
| 1 | **信号は左から右**。入力を左、出力を右に置く | 横書きの字と同じ向きで、目線を一方向に流すだけで読める | [高知工大] [ト技] [zepto] [Schemalyzer] [Flux] |
| 2 | 逆向き (帰還など) や上下に流れる所は、そうと分かる形にする | #1 の例外。アナログ回路は帰還の輪を除けばほぼ #1 で描ける | [高知工大] |
| 3 | **電位の高いほうを上、低いほうを下**。正の電源は上、負の電源は下 | 多くの技術者は正の電源が上にあると直感で読む。逆に描くと読み違える | [高知工大] [ト技] [Schemalyzer] [Flux] |
| 4 | 単電源の回路なら GND の線は一番下。正負の電源なら GND は間 (0 V を中心に上が +、下が −) | #3 から決まる。なお [ト技] は「グラウンドは自由に置いてよい」とする | [高知工大] |
| 5 | GND の記号は下向き、正の電源の記号は上向きにする | 上下の約束 (#3) と揃う | [Flux]。[SparkFun] は「正の電源は上向きの矢、GND は横棒 (か下向きの矢・三角)」と記号の慣習を書く |
| 6 | 信号の線は短く、まっすぐに。縦と横だけで曲がり角は直角 | 短い直線の線は目で追える | 短く直線: [zepto]。直角: 未確認 |
| 7 | **4 方向の交点 (十字の結線) を作らない**。枝分かれはすべて T 字にし、つながる所には黒丸を打つ | 十字の交点は、つながっているかどうかが黒丸の有無だけで決まる。黒丸は小さく、全体を引いて見たり縮小して刷ったりすると見落とす。黒丸の打ち忘れもよくある誤り。T 字だけなら黒丸が無くても意味が変わらない | [zepto] [Schemalyzer] [Flux] |
| 8 | 線の交差を減らす。避けられない交差には黒丸を打たない | 交差の少ない図が読みやすい図の条件の 1 つ。黒丸の無い交差は「つながっていない」と読まれる | [zepto] [Schemalyzer] [Flux] [SparkFun] |
| 9 | 関係する部品をまとめて置く (電源、測定、負荷など) | 同じ仲間がまとまっていることが読みやすい図の条件の 1 つ。機能ごとに塊にして (枠や間隔で) 示すと、図の構成が読める | [zepto] [ト技] の図 1 [Schemalyzer] [Flux] |
| 10 | 部品には ID と値を必ず添える。字は横書きで正立させ、縦や逆さにしない。ID と値は部品のすぐ横に置く | ID と値で部品が特定できる。回した字は読みにくい。隣の部品の近くに流れた字は、どの部品のものか分からなくなる | ID と値: [SparkFun] [Schemalyzer]。横書き・正立: [Schemalyzer]。すぐ横: 未確認 |
| 11 | 詰めすぎず、空けすぎない | 詰めると字が重なり、空けると部品が小さく線ばかりになる | 詰めすぎない: [Flux]。空けすぎない: 実測 (§3) |
| 12 | 電流計は測る線に直列、電圧計は測る部品のすぐ横に並列に置く | 直列・並列は計器の測り方そのもの。「すぐ横」は、何を測る計器かを位置だけで分からせるための、この skill の決め | 直列・並列: [LibreTexts]。すぐ横: 実測 (§3) |

## 2. 手順

1. 回路をまとまり (電源・測定・負荷など) に分け、左から右の順を決める (§1 #1・#9)
2. 電源の線と GND の線の高さを決める (§1 #3・#4)。各まとまりの位置を決めて置く
3. 道具の検査 (ネットリスト・ERC) で、つながりが意図どおりかを確かめる
4. **図を画像 (PNG など) にして見る**。SVG や道具の出力の文字列を読むだけでは、
   字の重なりも間延びも分からない。下の点検表で見る
5. 引っかかった所は、字ではなく**部品の置き場所と間隔**で直し、4 に戻る

### 点検表 (画像を見て)

- [ ] 信号は左から右、電源は上・GND は下に並んでいるか
- [ ] 字 (ID・値・電流や電圧の記号・計器のラベル) がほかの字・線・記号に重なっていないか。**1 字ずつ読めるか**
- [ ] 矢が黒丸や記号に重なっていないか
- [ ] 4 方向から線が集まる点が無いか。交差に黒丸が付いていないか
- [ ] 計器は測る部品のすぐ横か。遠回りの大きな輪になっていないか
- [ ] 部品に比べて線が長すぎないか (図の大半が空白になっていないか)
- [ ] 同じ文書の中で、同じ種類の回路が同じ向き・同じ並びで描かれているか

**「重なりなし」と報告する前に、字の 1 つ 1 つが読めるかを見る** (見落としやすい)。
画像にした環境にフォントが無いと、字が別の字に化けることがある (TeX のフォントの Ω が `¬` になるなど)。
化けたのが図の誤りか、画像にした環境のせいかを分けて報告する。

## 3. 道具ごとの補足

### circuit フェンス ([tommie-fence](https://github.com/tommie-jp/tommie-fence))

Markdown の ` ```circuit ` フェンス (番地で部品を置く) では、次の目安を描き比べて測った
(circuit-fence 0.11.0、`standard: jis`)。書き方と確かめ方は tommie-fence の
`.claude/skills/tommie-fence` と `.claude/skills/readable-schematic`。

| 何と何の間 | 目安 | 実測で見たこと |
| --- | --- | --- |
| 縦に並べた枝どうし (左に ID、右に値が出る部品) | 2.4 cm 以上 (`pitch: 1.2` で 2 マス) | 2 cm では左の枝の値と右の枝の ID がくっついた |
| 電流の矢を付けた部品の番地の間 | 2 マス以上 | 1 マスだと矢が分岐の黒丸に重なった |
| 部品と、それに並列に置く計器 | 1 マス | 既定の `pitch` で半マスだと、部品の値と計器のラベルが重なった |

2 端子部品の記号は 1 マスに収まる大きさなので、番地の間を 3〜4 マス取ると線ばかりの図になる (§1 #11)。

## 出典 (§1)

本文を読んで確かめたもの (略号は §1 の表の「出典」の列):

- [ト技] [回路図の描き方作法 その① [共通基本編] — トランジスタ技術 2018 年 6 月号 p.63](https://toragi.cqpub.co.jp/Portals/0/backnumber/2018/06/p063.pdf)。
  公開されているのは 1 ページ目だけで、「7 つの作法」のうち読めたのは ① と ②
- [高知工大] [回路図 Schematics — 高知工科大学 橘 昌良](https://www.ele.kochi-tech.ac.jp/tacibana/etc/analog-intro/schematics.html)
- [zepto] [見やすい電子回路図の書き方とは？【５つのポイントを紹介します】 — ZeptoElectronicDesign](https://zeptoelecdesign.com/schematics/)
- [Schemalyzer] [Schematic Design Best Practices: 30 Rules for Clear, Professional Circuits — Schemalyzer](https://www.schemalyzer.com/en/blog/schematic-review/best-practices/schematic-design-best-practices)
- [Flux] [PCB Schematic Design Best Practices for Clean Circuit Diagrams — Flux](https://www.flux.ai/p/blog/pcb-schematic-best-practices)
- [SparkFun] [How to Read a Schematic — SparkFun Learn](https://learn.sparkfun.com/tutorials/how-to-read-a-schematic/all)
- [LibreTexts] [20.4: Voltmeters and Ammeters — Physics LibreTexts](https://phys.libretexts.org/Bookshelves/University_Physics/Physics_(Boundless)/20:_Circuits_and_Direct_Currents/20.4:_Voltmeters_and_Ammeters)

§1 の「未確認」(曲がり角を直角にする、ID と値を部品のすぐ横に置く) は、
上のどの本文にも書かれていなかったもの。回路図の慣習として広く見かけるが、出典では確かめていない。
