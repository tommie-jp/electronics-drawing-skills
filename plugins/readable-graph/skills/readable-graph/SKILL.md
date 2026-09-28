---
name: readable-graph
description: 測った値や式を x-y のグラフ (周波数応答・ボード線図・共振曲線・I-V などの特性曲線) にして、人が読めるように書く・直すときに使う。軸には量の名前と単位 (単位は 1 か所)、横軸は読者が決める量、周波数は対数軸でそう明記、大きさの縦軸は 0 から、比べる線は同じ図に、実測は記号で理論は線で、本文の数字は印で図に出す、といった流儀を出典つきでまとめ、読み値を数で突き合わせてから画像で確かめる手順と点検表を添えてある。描く道具は問わない (matplotlib・gnuplot・表計算・Markdown のフェンスなど)。Use when drawing or cleaning up x-y graphs — frequency responses, Bode plots, resonance and characteristic curves — for human readers, in any tool — sourced conventions for axis labels and units, log and zero-based axes, legends, measured points vs fitted lines and annotations, plus a numbers-first render-and-inspect checklist.
---

# 人が読めるグラフを書く

教科書や記事のグラフ (周波数と電流の共振曲線、利得と位相のボード線図、ダイオードの I-V) は、
読者が**方眼紙に描く物をそのまま図にした物**。軸に単位が無い、対数と書いていない対数軸、
0 から始まらない縦軸、別々の尺度で重ねた 2 本 — どれも線は正しいのに読み違える図になる。
この skill の点検は、**印の読み値を数で本文と突き合わせてから**、図を画像にして目で見て行う。

- §1 はグラフの一般的な流儀 (出典は末尾)。どの道具で描いても通用する
- §2 は手順と点検表
- §3 は道具ごとの補足 (いまは tommie-fence の graph フェンス)

計器の画面 (オシロスコープ・スペクトラムアナライザ・VNA) は別の skill
([instrument-screen](../../../instrument-screen/skills/instrument-screen/SKILL.md))。
「画面を見せる図」は計器の skill、「値を集めて描く図」はこの skill。

## 1. 流儀

「出典」の列は、本文を読んで確かめた出典の略号 (末尾の一覧)。
**「未確認」は、読めた出典のどの本文にも書かれていなかったもの**、
**「実測」は graph フェンスで描き比べて決めたもの** (§3)、
**「この skill の決め」は、文と図を 1 対 1 にするためにこの skill が置いた約束**。

| # | 決め | なぜ | 出典 |
| --- | --- | --- | --- |
| 1 | **軸には量の名前と単位を書く**。書き方は「量/単位」「量 (単位)」「量, 単位」のどれかで、1 つの文書では 1 つに揃える。単位は 1 か所 (軸か線か。両方に書かない) | 単位の無い軸は読めない。「量/単位」は目盛の数が無次元になり曖昧さが無い | [NIST] §7.1 (`t/°C` の形)、[Truman] (3 つの書き方)、[Clemson] |
| 2 | **単位に条件を付けない** (「mA (50 Ω のとき)」ではなく、線の名前に「出力 50 Ω」) | 単位は量の条件を持たない | [NIST] §7.4 |
| 3 | 横軸は読者が決める量 (周波数・電圧・温度)、縦軸は測る量 | 原因が横、結果が縦 | [Truman] (「独立変数は必ず x 軸に」) |
| 4 | 尺度は**全部の点が入り、空白が最小**になるように選ぶ (グラフの大半を使う) | 隅に固まった点は読めない | [Clemson] (「方眼紙をできるだけ使う」)、[Truman] |
| 5 | **周波数の軸は対数** (2 桁以上にまたがる)。対数なら軸にそう書く。特性曲線 (I-V) は直線、指数の特性 (ダイオードの電流) は縦を対数 | 対数と言わない対数軸は、大きさの関係を誤読される | [WikiBode] (対数の周波数軸)、[WikiMis] (対数軸は明記) |
| 6 | **大きさを表す縦軸 (mA・V) は 0 から**。dB と deg は 0 から始めなくてよい (負の値を持つ)。切るなら題に書く | 0 から始めない軸は、小さな差を大きく見せる | [WikiMis] (切り詰めたグラフ) |
| 7 | ボード線図は利得 (dB) と位相 (deg) の **2 枠で横軸を共有**し、−3 dB と −45° の点に印を打つ | 定義そのもの | [WikiBode] |
| 8 | **実測は記号 (点) で、理論・近似の線は線で**。実測の点を折れ線で結ばない | 点と線が「測った物」と「合わせた物」を言い分ける | [Truman] (「データは記号、フィットは線」)、[Clemson] (「点を結ばず、最良の線か曲線を」) |
| 9 | 線が 2 本以上なら凡例で区別する (記号・線種・色)。**1 枠に 4 本まで**。5 本以上なら図を分ける | 見分けられない線は無いのと同じ | [Truman] (凡例で線とフィットを区別)。本数は実測 (§3。graph フェンスの色は 4 色で、5 本目は 1 本目と同じ色になる) |
| 10 | **比べる線は同じ図・同じ軸に**。単位が違えば枠を分けて横軸だけ共有する (別々の縦軸を 1 枠に重ねない) | 高さの比が見える。別々の縦軸は比を嘘にする | [WikiMis] (別々の縦軸) |
| 11 | 本文の数字 (共振点・−3 dB 点・0.707) は**印 (縦線・水準線) で図に出し**、印の読み値を本文と突き合わせる | 文と図が同じ数を言う | この skill の決め |
| 12 | 題は「何が読めるか」(「15.9 kHz で山になり、輪の抵抗が小さいほど高い」) | 読者の見る所を言う | この skill の決め ([Truman] は題を載せる場所を用途で分ける) |
| 13 | 縦横の比を極端にしない (道具の既定に任せ、幅で潰さない) | 比で傾きの印象が変わる | [WikiMis] (縦横比) |

## 2. 手順

1. 本文の「見るべき値」の表から、横軸の量と範囲、線 (式か点列か実測)、印を置く数を決める (§1 #3・#11)
2. 単位と目盛を決める。周波数は対数、大きさは 0 から、単位が違う線は枠を分ける (§1 #1・#5・#6・#10)
3. **道具の読み値 (印の所の値) を本文の数と突き合わせる。合うまで画像は見ない** — 1000 倍のずれ (A と mA) は画像では見落とす
4. **図を画像 (PNG など) にして見る**。下の点検表で見る
5. 引っかかった所は範囲・目盛・印で直し、3 に戻る

### 点検表 (数 → 画像)

- [ ] 印の読み値が本文の表と同じ数か (単位・桁まで)
- [ ] 軸に量と単位があり、対数なら log が見えるか
- [ ] 0 から始まらない縦軸 (dB・deg を除く) は題に書いたか
- [ ] 線の名前と単位が凡例で読めるか。実測の記号と理論の線の区別が付くか
- [ ] 対数の目盛の字が詰まって読めなくなっていないか
- [ ] 印の縦線と読み値が線や凡例に重なっていないか。**1 字ずつ読めるか**
- [ ] 比べる線が同じ図にあるか。単位が違う枠は横軸が揃っているか

## 3. 道具ごとの補足

### graph フェンス ([tommie-fence](https://github.com/tommie-jp/tommie-fence))

Markdown の ` ```graph ` フェンスで、次を描き比べて確かめた (graph-fence 0.1.0、2026-09-28)。書き方は
`packages/graph-fence/docs/02-cheatsheet.md`、読み値は `graph-fence check`。
§1 のうち、軸の名札を「量/単位」にする (#1)、大きさの縦軸を 0 から始める (#6)、実測を ○ で打って結ばない (#8) は、
フェンスが自分でする。

| 見たこと | 目安 |
| --- | --- |
| `y:` を省くと名札は単位だけ (`dB`) で、2 枠目の位相は「°」の 1 字になって読めなかった | **`y:` に量の名前を必ず書く** (`y: 電流 mA`、2 枠なら `- 利得 dB` と `- 位相 deg`) (§1 #1) |
| 対数の横軸は 1.2 桁 (`2k..32k`) でも 6 桁 (`10..10M`) でも目盛の字が詰まらなかった。1.2 桁では 1-2-5 の目盛 (2k・5k・10k・20k) に字が付き、6 桁では 10 倍ごとだけ | 対数の範囲は測った点を包む 1-2-5 の値で切る。桁数で字の心配は要らない (§1 #5) |
| `mark` を 1k・1.59k・2k・2.5k と 3 桁の軸の 0.4 桁に 4 本並べると、図の上の字は最初の 1 本 (1.00 kHz) だけで、残りの 3 本は線だけになった。読み値の表には 4 行とも出る | 図の上で字を読ませたい印は、3 桁の軸で **0.3 桁 (約 2 倍) 以上**離す。近い値は表で読ませる (§1 #11) |
| 線を 5 本にすると、5 本目が 1 本目と同じ色 (琥珀) になり、凡例でしか分けられなかった | 1 枠に 4 本まで (§1 #9) |
| `style: width: 400` で 2 枠のボード線図を描いても、目盛の字は 100〜100k の 10 個とも読めた | 幅は既定でよい。狭めるのは本の段組みに合わせるときだけ (§1 #13) |
| 式だけの図は `x:` に範囲が無いと断られる | 式の線には `x:` の範囲を書く (`100..100k`)。範囲の区切りは `..` |

### その他の道具

matplotlib・gnuplot・表計算のどれでも §1 と §2 はそのまま。対数軸は道具の設定で入れ、
軸の名札は「量/単位」か「量 (単位)」を文書で揃える (§1 #1)。

## 出典 (§1)

本文を読んで確かめたもの (略号は §1 の表の「出典」の列):

- [NIST] [NIST SP 811 §7 — Rules and Style Conventions for Expressing Values of Quantities](https://www.nist.gov/pml/special-publication-811/nist-guide-si-chapter-7-rules-and-style-conventions-expressing-values)。
  §7.1 軸の名札は `t/°C` の形 (「`t (°C)` や `Temperature (°C)` ではなく」)、§7.4 単位に条件を付けない
- [Truman] [Preparing Graphs — Truman State University ChemLab](https://chemlab.truman.edu/data-analysis/preparing-graphs/)。
  「the independent variable is always on the 'x-axis'」、名札は「parameter name (unit); parameter name, unit;
  parameter name/unit」、「selecting a scale that shows all of the data and minimizes large regions of blank space」、
  「Data are always shown as symbols and fits to the data are shown as lines or curves. Do not connect the data
  points with lines」、凡例、題を載せる場所
- [Clemson] [Graphing — Clemson University Physics Tutorial](https://science.clemson.edu/physics/labs/tutorials/graph/index.html)。
  「Each axis should be clearly labeled with titles and units」「The graph should use as much of the graph paper as
  possible」「Never connect the dots on a graph, but rather give a best-fit line or curve」
- [WikiBode] [Bode plot — Wikipedia (英語)](https://en.wikipedia.org/wiki/Bode_plot)。利得 (dB) と位相の 2 枚、対数の
  周波数軸、折れ線の近似、角周波数で −45°
- [WikiMis] [Misleading graph — Wikipedia (英語)](https://en.wikipedia.org/wiki/Misleading_graph)。切り詰めた軸、縦横比、
  目盛の無いグラフ、対数軸の明記、別々の縦軸

§1 の「未確認」(線は 5 本まで) は、上のどの本文にも書かれていなかったもの。
本文を読めなかったもの: Indiana University East の化学実験の手引きの Graphing (403)。
