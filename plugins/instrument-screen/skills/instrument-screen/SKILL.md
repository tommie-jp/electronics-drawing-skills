---
name: instrument-screen
description: 計器の画面 (オシロスコープの時間波形・スペクトラムアナライザのスペクトル・VNA (NanoVNA) の S パラメータ) を、人が読めるように書く・直すときに使う。画面の並べ方は道具が決めるので、読みやすさは設定の選び方で決まる — 見せたい物が画面の大半を占める尺度、本文の数字の所に置くマーカーとカーソル、隣の線を分ける RBW、特性の幅に合わせた掃引、見る物で選ぶ表示形式、比べる 2 本は同じ尺度、といった流儀を出典つきでまとめ、読み値を数で突き合わせてから画像で確かめる手順と点検表を添えてある。描く道具は問わない。Use when writing or fixing oscilloscope, spectrum analyser or VNA screen figures for human readers, in any tool — sourced conventions for choosing scale, time base, trigger, reference level, RBW, sweep span, trace format, markers and cursors, plus a numbers-first render-and-inspect checklist.
---

# 人が読める計器の画面を書く

計器の画面の図 (オシロスコープの時間波形、スペクトラムアナライザのスペクトル、VNA の S パラメータ) は、
格子も読み値の表も道具が描くので、回路図のような「並べ方」の余地はほぼ無い。
それでも読めない図はできる — 1 目盛しか振れない波、上端に張り付いた線、幅の 100 倍の掃引に
潰れた共振。読みやすさは**設定の選び方** (尺度・掃引・表示形式・マーカー) で決まる。
この skill の点検は、**読み値を数で本文と突き合わせてから**、図を画像にして目で見て行う。

- §1 は 3 つの計器に共通の流儀と、計器ごとの流儀 (出典は末尾)。どの道具で描いても通用する
- §2 は手順と点検表
- §3 は道具ごとの補足 (いまは tommie-fence の scope・spectrum・vna フェンス)

## 1. 流儀

「出典」の列は、本文を読んで確かめた出典の略号 (末尾の一覧)。
**「未確認」は、読めた出典のどの本文にも書かれていなかったもの**、
**「実測」は tommie-fence のフェンスで描き比べて決めたもの** (§3)、
**「この skill の決め」は、文と図を 1 対 1 にするためにこの skill が置いた約束**。

### 3 つの計器に共通

| # | 決め | なぜ | 出典 |
| --- | --- | --- | --- |
| 1 | 題は計器の名前ではなく**何を見る図か**を言う (「カーソルで 1 τ を読む」「側波は搬送波の 28 dB 下」) | 図の下の読み値が何のための数かが分かる | この skill の決め |
| 2 | 本文の「見るべき値」は、マーカー・カーソル・Measurements で**図にも出す**。本文に無い値にマーカーを置かない | 文と図が同じ数を言う。読み値の表は数行しか無い | この skill の決め |
| 3 | **見せたい物が画面の大半を占める尺度**にする。オシロは波が縦 8 目盛のうち 4〜6 目盛、スペアナは一番高い山が上端 (REF) から 1〜2 目盛、VNA は特性の変化が縦の半分以上 | 1 目盛しか振れない波、上端に張り付いた線は目盛で読めない | [Tek] (「切れず歪まない範囲で、縦の目盛をできるだけ多く占めるように」)。スペアナ・VNA は準用で、数は実測 (§3) |
| 4 | **線を枠の縁に乗せない・切らない**。理想が 0 dB や −∞ で縁に乗る図 (Thru・Open・Short) は、題にそう書き、Smith かマーカーの表を主役にする | 縁に乗ると値が読めず、マーカーの番号も重なる | [Tek] (「切れない」)、実測 (§3) |
| 5 | **比べる 2 本は同じ尺度** (オシロの 2 ch の V/div、同じ信号を 2 機種で並べるスペアナの単位)。形だけ見せるなら別の尺度でよいが、題に書く | 尺度が違うと高さの比が嘘になる | [WikiMis] (別々の縦軸) |
| 6 | 同じ題・同じ文書の中で、**同じ種類の図は同じ設定** (time/div・REF・掃引) で並べ、変えた 1 つだけを題に書く | 読者は前の図と見比べる | 未確認 |
| 7 | 理想 (計算) と実測を重ねるときは線の種類で分ける (理想は破線、実測は実線)。理想だけの画面は実線 (分ける相手が無く、破線の切れ目で細い山が途切れて見える)。実測を重ねたら、読み値の表の見出しが実測に変わったのを確かめる | 読者は理想を見て測り、実測が重なれば合っている | この skill の決め |
| 8 | 道具のお知らせ (機種の範囲の外・マーカーが掃引の外・トリガが波形の外・既定で埋めた) は **0 にする**。残すなら本文に理由を書く | 既定で埋めた所は意図と違うことがある | この skill の決め |

### オシロスコープ (時間波形)

| # | 決め | なぜ | 出典 |
| --- | --- | --- | --- |
| 9 | 縦: 単極の波 (0〜5 V の方形波・充電) は **0 V を下から 1 目盛**に、双極 (正弦) は中央に置く | 振幅が目盛で読め、0 V の位置が分かる | [Tek] (位置の調整は「画面の上下の思う所に」)、実測 (§3) |
| 10 | 横: 繰り返す波は **2〜5 周期**、1 回の現象 (充電) は**現象が 5 目盛に入る** time/div (時定数 τ なら 5 τ)。トリガが中央 (t = 0) なら、左半分に「前の状態」が出るのを承知で使う | 1 周期未満では周期が測れず、10 周期では形が潰れる | [Tek] (sec/div は尺度)。2〜5 の数は実測 (§3) |
| 11 | トリガは見せたい ch の、**1 周期に 1 度しか通らない水準** (方形波なら中央)。充電は立ち上がり、放電は立ち下がり | 図が止まり、t = 0 が意味を持つ | [SparkFun] (「1 周期に 1 度だけ立ち上がりを見る点に」「一番高い山より上に置かない」) |
| 12 | カーソルは本文が読む 2 点 (0 と 1 τ)。Measurements は本文が言う物だけ **3〜4 つ** | 読み値の表が本文の表と 1 対 1 になる | [SparkFun] (カーソルは対で差を測る)、この skill の決め |
| 13 | 位相差の題は同じ time/div で 1〜2 周期。振幅が違えば 2 ch の V/div は別でよいが、Measurements に位相を出す | 位相は時間のずれの比で読む | 未確認 |

### スペクトラムアナライザ

| # | 決め | なぜ | 出典 |
| --- | --- | --- | --- |
| 14 | **REF (格子の上端) は一番高い山の 1〜2 目盛上**。10 dB/div なら 100 dB 入るので、フロアを見せる題も同じ画面に収まる | 山が上端で切れず、低い山も見える | [AN150] (格子の上端が基準レベル)、[tinySA-Screen] (REF と scale は自動か手動)。1〜2 目盛は実測 (§3) |
| 15 | **RBW は隣り合う線の間隔より狭く** (同じ高さの 2 線を分ける目安が RBW の 3 dB 幅。側波 1 kHz なら 200〜300 Hz)。高調波だけなら広くてよい。狭くするとフロアが下がる | 広いと線が 1 つに融け、狭いと掃引が遅い | [AN150] (「3 dB 幅が、同じ振幅の信号を分ける目安」)、[WikiSA] (「RBW を狭くすると測られるフロアが下がる」) |
| 16 | 掃引は見せたい線が全部入り、**一番高い次数が右端から 1 目盛以内**。側波を見せるなら中心 + スパン | 空の右半分・切れた線を作らない | 実測 (§3) |
| 17 | マーカーは山 (peak) を 1 番、あとは本文の順 (高調波の次数、側波の下・上)。4 まで | 読み値の表の順が本文と同じ | [tinySA-Screen] (マーカーは 4 つ、表は画面の上) |
| 18 | **入力の上限を超える信号を書かない** (tinySA は +10 dBm 未満)。書くなら本文で受ける | 読者が同じ設定で実機を壊す | [tinySA-First] |
| 19 | 同じ信号を FFT 型 (Analog Discovery) と掃引型 (tinySA) で並べるなら、縦軸の単位 (dBm) を揃える | 同じ線が同じ高さに出る | #5 から |

### VNA (S パラメータ)

| # | 決め | なぜ | 出典 |
| --- | --- | --- | --- |
| 20 | **形式は見る物で選ぶ**: 通過・損失 → S21 LOGMAG、反射の大きさ → S11 LOGMAG、アンテナの同調と帯域 → SWR と REACTANCE、部品の値 → R / X / \|Z\|、整合と校正の 3 点 → SMITH、ケーブル → TDR。1 枚に **2 形式まで** | 実機のメニューの名前で読者が同じ画面を出せる。3 形式以上は縦に長い | [cho45] (11 の形式、トレース 4。アンテナは SWR・REACTANCE・SMITH)。2 形式は実測 (§3) |
| 21 | 掃引は見せたい特性 (共振・カットオフ・帯) を**中心 (CENTER) に置き、幅 (SPAN) は特性の 3 dB 幅の 3〜10 倍**。広い掃引の後に狭い掃引、なら 2 枚 | 点は 101 で、広い掃引では狭い特性を点が跨いで見落とす。狭すぎると平らに見える | [cho45] (「合わせたい周波数を CENTER に、SPAN を適切に」)、[HexFlex] (「101 点しか無く、広帯域の掃引では狭帯域の特徴を見落とす」)。3〜10 倍は実測 (§3) |
| 22 | マーカーは本文の周波数 (共振点・−3 dB 点・帯の端)。**帯 (band)・印 (mark)・一言 (text) で「どこを見るか」を図の上で言う** | 図から数字と見る所が読める | この skill の決め |
| 23 | Smith は「1 点を見る」図。マーカーの周波数と R + jX を添え、S11 LOGMAG か SWR と対にする | 円だけでは読者が読めない | [cho45] (SWR が足りないときに Smith で整合)。対にするのはこの skill の決め |
| 24 | 反射の**小さな**変化 (数 dB の谷) は LOGMAG ではなく SWR か R / X で見せる | LOGMAG の 0〜−80 dB の枠では数 dB の谷が上端に張り付いて見えない | 実測 (§3) |

## 2. 手順

1. 本文 (題) の「計器の設定」と「見るべき値」を読み、図に出す数 (マーカー・カーソル・Measurements) を決める (§1 #2)
2. 見せたい物が画面の大半を占める尺度と掃引を選ぶ (§1 #3。オシロは #9〜#10、スペアナは #14〜#16、VNA は #20〜#21)
3. **道具の読み値 (`check` など) を本文の数と突き合わせる。合うまで画像は見ない** — 数の食い違い (1000 倍・位相の符号) は画像では見落とす
4. 道具のお知らせを 0 にする (§1 #8)
5. **図を画像 (PNG など) にして見る**。下の点検表で見る
6. 引っかかった所は尺度・掃引・マーカーで直し、3 に戻る

### 点検表 (数 → お知らせ → 画像)

- [ ] 道具の読み値が本文の「見るべき値」の表と同じ数か (単位・桁まで)
- [ ] お知らせが 0 か。残すなら本文に理由があるか
- [ ] 見せたい物が画面の大半か (オシロ 4〜6 目盛、スペアナは山が上端から 1〜2 目盛、VNA は変化が縦の半分)
- [ ] 線が枠の縁に乗っていないか、上下に切れていないか
- [ ] マーカー・カーソルは本文の値の所か。番号は本文の順か
- [ ] 比べる 2 本は同じ尺度か。違うなら題に書いたか
- [ ] 同じ題の前の図と設定が揃っているか。変えた物は題にあるか
- [ ] 字の重なり (マーカーの番号どうし、カーソルの名札、基準の印)。**1 字ずつ読めるか**
- [ ] 凡例が理想と実測を言い分け、実測を重ねたなら読み値の表の見出しが実測か

**「重なりなし」と報告する前に、字の 1 つ 1 つが読めるかを見る** (見落としやすい)。

## 3. 道具ごとの補足

### scope・spectrum・vna フェンス ([tommie-fence](https://github.com/tommie-jp/tommie-fence))

Markdown の ` ```scope ` ` ```spectrum ` ` ```vna ` フェンスで、次を描き比べて確かめた
(scope-fence 0.1.0・spectrum-fence 0.1.0・vna-fence 0.2.0、2026-09-28)。書き方と確かめ方
(`check` の読み値、PNG に焼く手順) は tommie-fence の `.claude/skills/tommie-fence`。

| フェンス | 見たこと | 目安 |
| --- | --- | --- |
| scope | 0〜5 V の方形波と、それを RC に通した三角に近い波 (1.89〜3.11 V) を同じ `1V/div` で描くと、後者は **1.2 目盛**しか振れない。`range: 200mV/div` と `position: -12.5div` にすると 6 目盛に広がる (0 V は画面の外で、基準の印 ▶ は下端に貼り付く)。`500mV/div` と `position: -4div` なら 2.4 目盛で 0 V が下端 | 波の中央の電圧を V<sub>c</sub>、V/div を R とすると **`position:` は −V<sub>c</sub> ÷ R** で波が中央に来る。単極の波は `position: -3div` (0 V が下から 1 目盛)。比べる 2 ch は同じ `range:` のまま、形を見せる ch だけ変えて題に書く (§1 #5) |
| scope | 1 kHz を `200us/div` (2 周期)・`500us/div` (5 周期)・`1ms/div` (10 周期) で描き比べた | 2 周期が形を一番よく見せ、5 周期まで読める。10 周期は三角が潰れる (§1 #10) |
| scope | 同じ `range:` と `position:` の 2 ch は、基準の印 (▶1 ▶2) が同じ位置に重なって「12▶」に見える | 図の誤りではなく処理系の側 (0.1.0)。気になるなら `position:` を 0.5 目盛ずらす |
| vna | 直列 RLC (R 10 Ω・L 1 µH・C 100 pF、共振 15.9 MHz、3 dB 幅 1.6 MHz ほど) を `1M-300M` / `10M-22M` / `15M-17M` で描き比べた | 幅の 100 倍 (1〜300 MHz) では谷が左端に潰れ、1 倍 (15〜17 MHz) では平らに見える。**8 倍 (10〜22 MHz) で形が出る** (§1 #21) |
| vna | 同じ図で S11 LOGMAG の谷は −3.5 dB で、0〜−80 dB の枠 (10 dB/目盛、変えられない) では上端に張り付く。SWR の枠では 9 → 5 と動きが見える | 反射の小さな変化は `S11 swr` か `S11 r` / `S11 x` で (§1 #24) |
| vna | `traces:` を 3 つ (LOGMAG・SWR・SMITH) にすると Smith が 2 段目に落ち、図が縦に 2 倍になる | 1 枚に 2 形式まで。3 つ目は別の図に (§1 #20) |
| vna | Thru (`dut: series R 0`) は S21 が 0 dB で上端、S11 が −∞ で下端に乗り、両端のマーカーの番号が枠の角で重なる | `notes:` の `text` で「理想は平ら」と書き、`S11 smith` を対にすると中心の 1 点 (50.0 Ω + j0.0 Ω) が読み値で出る (§1 #4・#23) |
| vna | `band 15.1M 16.7M: SWR 2 の幅` は値の単位が無いので SWR の枠に、`text 19M 20: …` も SWR の枠に、`text 150M -40dB: …` は LOGMAG の枠に置かれる | 注釈は**値の単位で枠が決まる**。見せたい枠の単位で書く (§1 #22) |
| spectrum | 方形波の高調波 (`sweep: 100k-4M 450`、`rbw: 10kHz`、`ref: -20dBm`、基本波 −27 dBm) は山が上端から 1 目盛弱で、5 次が右端から 1 目盛以内。AM の側波 (`center: 686kHz`、`span: 10kHz`、`rbw: 200Hz`) は 1 kHz 離れた側波が分かれて見える | `ref:` は一番高い山の dBm を 10 の倍数に切り上げて +10 (§1 #14)。側波の間隔 ÷ 3 以下の `rbw:` をメニューから選ぶ (§1 #15) |

## 出典 (§1)

本文を読んで確かめたもの (略号は §1 の表の「出典」の列):

- [Tek] [XYZs of Oscilloscopes — Tektronix (Primer)](https://www.tek.com/en/documents/primer/xyzs-oscilloscopes-primer)。
  PDF (`03W_8605_7`) の本文。「Adjust channel 1 volts/division such that the signal occupies as much of the
  10 vertical divisions as possible without clipping or signal distortion」(Setting Up)、垂直位置の調整、sec/div、
  格子は 8×10 か 10×10
- [SparkFun] [How to Use an Oscilloscope — SparkFun Learn](https://learn.sparkfun.com/tutorials/how-to-use-an-oscilloscope)。
  「Make sure the trigger isn't higher than the tallest peak of your waveform」「set the trigger level to a point on
  your waveform that only sees a rising edge once per period」「Cursors usually come in pairs」
- [AN150] Spectrum Analysis Basics — Agilent / Keysight Application Note 150 (旧版の PDF。
  [Rose-Hulman 工科大学の写し](https://www.rose-hulman.edu/class/ee/hoover/ECE342/Labs/Lab%201%20Spectrum%20Analyzer%20and%20LPF%20Design/spectrum%20analysis%20basics%20AN%20150%20HP.pdf))。
  「the 3-dB bandwidth is a good rule of thumb for resolution of equal-amplitude signals」「we give the top line of
  the graticule, the reference level, an absolute value」
- [WikiSA] [Spectrum analyzer — Wikipedia (英語)](https://en.wikipedia.org/wiki/Spectrum_analyzer)。RBW は
  「how close two signals can be and still be resolved」を決め、「Decreasing the bandwidth of an RBW filter decreases
  the measured noise floor」
- [tinySA-Screen] [Screen Info — tinySA wiki](https://tinysa.org/wiki/pmwiki.php?n=Main.ScreenInfo)。マーカーの表は
  画面の上に 4 つまで、REF・scale・RBW・ATT は左の欄 (手動なら緑)
- [tinySA-First] [First Use — tinySA wiki](https://tinysa.org/wiki/pmwiki.php?n=Main.FirstUse)。「The input signal must
  be below +10dBm otherwise the tinySA can be damaged」
- [cho45] [NanoVNA User Guide — cho45](https://cho45.github.io/NanoVNA-manual/) と、その英訳の PDF
  ([NanoVNA User Guide, Oct 2019](https://www.qsl.net/g0ftd/other/nano-vna-original/docs/NanoVNA%20User%20Guide-English-reformat-Oct-2-19.pdf))。
  形式 11 種、トレースとマーカーは 4 つまで、101 点、アンテナの例 (「Set the frequency you want to tune the antenna
  to CENTER and set SPAN appropriately」、トレースは SWR・REACTANCE・SMITH、SWR が足りなければ Smith で整合)
- [HexFlex] [Getting Started with the NanoVNA — part 1 — HexAndFlex](https://hexandflex.com/2019/08/31/getting-started-with-the-nanovna-part-1/)。
  「101 sweep points only … on a wideband sweep, you can easily miss narrowband features」
- [WikiMis] [Misleading graph — Wikipedia (英語)](https://en.wikipedia.org/wiki/Misleading_graph)。別々の縦軸で
  重ねると比が嘘になる

§1 の「未確認」(同じ文書で設定を揃える、位相差の題の周期数) は、上のどの本文にも書かれていなかったもの。
本文を読めなかったもの: nanovna.com のユーザーガイド (404)、Keysight の AN 150 の現行版
(ランディングページしか返らない — 上の旧版で代えた)。
