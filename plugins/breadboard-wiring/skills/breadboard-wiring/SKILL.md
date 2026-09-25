---
name: breadboard-wiring
description: ブレッドボードの実体配線図 (教科書・解説・記事・README の図) を、人が見て組めるように書く・直すときに使う。線の色 (赤は + だけ・黒は GND だけ)、電源レールの使い方、部品と線の置き方の流儀を出典つきでまとめ、描いた図を画像にして目で確かめる手順と点検表を添えてある。描く道具は問わない (Fritzing・Markdown のフェンス・手描きの清書など)。Use when drawing or cleaning up breadboard wiring diagrams for people to build from, in any tool — sourced wire-color conventions (red only for +, black only for ground), power-rail use, part and wire placement, plus a render-and-inspect checklist.
---

# 人が見て組めるブレッドボードの配線図を書く

実体配線図は、読み手がそのとおりに部品と線を挿して回路を組むための図。
回路図と 1 対 1 に対応していて、どの穴に何を挿すかまで決めてある ([Illinois])。
つながりが正しくても、色と置き方がばらばらだと組み間違え、動かないときに追えない。
この skill の点検は、**図を画像にして目で見て**行う。

- §1 はブレッドボードの配線の流儀 (出典は末尾)。どの道具で描いても通用する
- §2 は手順と点検表
- §3 は道具ごとの補足 (いまは breadboard フェンスだけ)

## 1. 配線の流儀

「出典」の列は、本文を読んで確かめた出典の略号 (末尾の一覧)。
**「実測」は breadboard フェンスで描き比べて決めたもの** (§3)。

### 線の色

| # | 決め | なぜ | 出典 |
| --- | --- | --- | --- |
| 1 | **赤は正の電源へつながる線だけ、黒は GND (電源の −) へつながる線だけ**。赤と黒をほかの線に使わない | 色は回路の動きには関係ないが、組み間違いと、動かないときの調べ直しに大きく効く。赤と黒がでたらめに混ざると、どこが電源か追えなくなる | [Illinois] [Rice] [NU] [denshi] |
| 2 | 2 つ目の電源 (負の電源) は青 | 赤 = +、黒 = GND と並べて覚えやすい。なお GND を緑、負の電源を黒にする流儀もある (家の配線の慣習)。図の中ではどちらか一方に揃える | [Rice] [denshi] |
| 3 | 信号の線は赤・黒以外の色。同じ役目の線 (ある節点へ行く線、計器へ行く線など) は同じ色に揃える | 色で節点や役目が見分けられると、回路図と照らし合わせるのが速い | [Illinois] [Rice] |

### 電源レール

| # | 決め | なぜ | 出典 |
| --- | --- | --- | --- |
| 4 | 電源とGND はまずレールへ入れ、部品へはレールから引く | 電源は回路のあちこちで要る。レールはそれを板じゅうに配る | [SparkFun] [NU] [keicode] |
| 5 | 板の上下 (左右) のレールは中でつながっていない。両側を使うなら **+ は +、− は − どうしを線でつなぐ** | つないでいないと、片側の部品に電源が来ない | [SparkFun] [Adafruit] [denshi] [NU] |
| 6 | レールの印 (赤の線 = +、青か黒の線 = −) のとおりに電源を入れる | 印に電気的な意味は無いが、印どおりにしておくのが順序だった作法 | [SparkFun] [Illinois] |
| 7 | 長いブレッドボードは、レールが途中で切れていることがある。印の線が途切れていたら、切れ目を線でまたぐ | 切れ目の先の部品に電源が来ない | [Adafruit] [SparkFun] |
| 8 | 正負の電源を使うなら、正の電源を上のレール、負の電源を下のレールに置く (オペアンプの 1 番ピンを左下に挿すと、正の電源ピンが上、負の電源ピンが下に来る) | 電源の配線が短く、交わらない | [Rice] |

### 部品と線の置き方

| # | 決め | なぜ | 出典 |
| --- | --- | --- | --- |
| 9 | DIP の IC は中央の溝をまたいで挿す | 溝の左右は別の行なので、足どうしがつながらない | [SparkFun] |
| 10 | 1 つの部品の両足を、同じ番号の行 (同じ 5 穴の組) に挿さない | その部品が短絡されて、働かない | [keicode] [Illinois] |
| 11 | 回路を小さなまとまりに分け、まとまりごとに板の一画にまとめて置く。まとまりの間は外しやすい線でつなぐ | 動かないとき、まとまりごとに切り離して調べられる | [Rice] |
| 12 | 線は、それぞれ色と長さを合わせて作り、板に沿わせて 90 度に曲げる ("manhattan style") | 長く垂れた線は引っかけて抜けやすく、どこへ行くか追いにくい | [NU] |
| 13 | 線は少なく、場所は狭く。ただし**調べやすさを線の少なさより優先する**。節点の目印になる線は、電気的に要らなくても残してよい | 散らかった図は読めないが、詰めすぎて追えない図も困る | [Illinois] |
| 14 | 回路図を、ループ (電源の + から部品を通って − へ戻る道) ごとに板へ写していく。回路図の節点に色を塗っておくと写しやすい | 写し漏れと写し間違いが減る | [Illinois] |
| 15 | 部品のラベル (ID と値) が、隣の部品やラベルに重ならない間隔で置く | 重なると、どれがどの部品か分からない | 実測 (§3) |

## 2. 手順

1. 回路図を見て、電源 (と負の電源) と GND をどのレールに入れるか決める (§1 #4〜#8)
2. 回路をまとまりに分け、板のどこに置くか決める (§1 #11)
3. ループごとに部品を挿し、線を引く。色は §1 #1〜#3 に従う
4. 道具の検査 (ネットリスト) で、回路図と同じつながりかを確かめる
5. **図を画像 (PNG など) にして見る**。下の点検表で見る
6. 引っかかった所は、部品の位置と線の道筋で直し、5 に戻る

### 点検表 (画像を見て)

- [ ] 赤い線はすべて正の電源、黒い線はすべて GND につながっているか。ほかの線に赤・黒が無いか
- [ ] 両側のレールを使うとき、+ どうし・− どうしがつながっているか (逆につないでいないか)
- [ ] 部品の両足が同じ行に入っていないか。IC は溝をまたいでいるか
- [ ] 極性のある部品 (LED・電解コンデンサ・ダイオード) の向きが、回路図と合っているか
- [ ] 部品のラベルがほかのラベル・部品・線に重なっていないか。**1 字ずつ読めるか**
- [ ] 線が斜めに部品の上を横切っていないか。遠回りの長い線が無いか
- [ ] 回路図と見比べて、部品と節点が 1 対 1 に対応しているか

## 3. 道具ごとの補足

### breadboard フェンス ([tommie-fence](https://github.com/tommie-jp/tommie-fence))

Markdown の ` ```bread ` フェンスでは、次を描き比べて確かめた (breadboard-fence 0.13.0、`board: half`)。
書き方は tommie-fence の `packages/breadboard-fence/docs/02-cheatsheet.md`。

| 見たこと | 目安 |
| --- | --- |
| 部品のラベルは部品の 1 行下に出る。抵抗を b 行、LED をすぐ隣の c 行に置くと「R1 330」と「D1 red」が重なった | 次の部品は 2 行以上下げる (b の次は d)、か列をずらす |
| 端点どうしが斜めの位置にある線は、斜めの直線で描かれる | 線の両端は同じ行か同じ列に置く。避けられないときは迂回ヒント (`[h…, v…]`) で曲げる |
| 線の色は `red` `black` `blue` などを 1 本ずつ書ける | §1 #1〜#3 のとおりに書く。省かない |

## 出典 (§1)

本文を読んで確かめたもの (略号は §1 の表の「出典」の列):

- [Illinois] [Schematics and Breadboards: A First-Circuit Build — ECE 110, University of Illinois](https://courses.grainger.illinois.edu/ece110/fa2021/content/labs/Experiments/BB_HowTo.pdf)
- [Rice] [ELEC 242 Lab — Organizing Your Breadboard, Rice University](https://www.ece.rice.edu/~jdw/242_lab4/file.4.html)
- [NU] [Circuit Building — Northwestern University](https://wildfire.mech.northwestern.edu/EDIbook2021/ch01_00.html)
- [SparkFun] [How to Use a Breadboard — SparkFun Learn](https://learn.sparkfun.com/tutorials/how-to-use-a-breadboard/all)
- [Adafruit] [Breadboard Tips & Tricks — Adafruit Learning System](https://learn.adafruit.com/breadboards-for-beginners/breadboard-tips-and-tricks)
- [keicode] [ブレッドボードの使い方 — 基礎からの IoT 入門](https://iot.keicode.com/electronics/what-is-breadboard.php)
- [denshi] [ブレッドボードの配線 — 作りながら学ぶ Arduino+ 電子工作入門](https://www.denshi.club/cookbook/breadboard.html)

本文を読めなかったもの (サイトの確認画面で止まった、か見つからなかった):
All About Circuits の掲示板、Adafruit Forums、Digilent の Fritzing の記事、函館高専の資料。
