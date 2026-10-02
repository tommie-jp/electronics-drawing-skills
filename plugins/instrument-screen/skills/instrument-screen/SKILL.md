---
name: instrument-screen
description: 計器の画面 (オシロスコープの時間波形・スペクトラムアナライザのスペクトル・VNA (NanoVNA) の S パラメータ・ロジックアナライザのレーンとバス) を、人が読めるように書く・直すときに使う。画面の並べ方は道具が決めるので、読みやすさは設定の選び方で決まる — 見せたい物が画面の大半を占める尺度、本文の数字の所に置くマーカーとカーソル、隣の線を分ける RBW、特性の幅に合わせた掃引、見る物で選ぶ表示形式、比べる 2 本は同じ尺度、標本化を最速の変化の 4 倍以上にしカーソルはビットの真ん中に置くロジックの画面、といった流儀を出典つきでまとめ、読み値を数で突き合わせてから画像で確かめる手順と点検表を添えてある。描く道具は問わない。Use when writing or fixing oscilloscope, spectrum analyser, VNA or logic analyser screen figures for human readers, in any tool — sourced conventions for choosing scale, time base, trigger, reference level, RBW, sweep span, trace format, sample rate, bus radix, markers and cursors, plus a numbers-first render-and-inspect checklist.
---

# 人が読める計器の画面を書く

計器の画面の図 (オシロスコープの時間波形、スペクトラムアナライザのスペクトル、VNA の S パラメータ、ロジックアナライザのレーンとバス) は、
格子も読み値の表も道具が描くので、回路図のような「並べ方」の余地はほぼ無い。
それでも読めない図はできる — 1 目盛しか振れない波、上端に張り付いた線、幅の 100 倍の掃引に
潰れた共振。読みやすさは**設定の選び方** (尺度・掃引・表示形式・マーカー) で決まる。
この skill の点検は、**読み値を数で本文と突き合わせてから**、図を画像にして目で見て行う。

- §1 は 4 つの計器に共通の流儀と、計器ごとの流儀 (出典は末尾)。どの道具で描いても通用する
- §2 は手順と点検表
- §3 は道具ごとの補足 (いまは tommie-fence の scope・spectrum・vna・logic フェンス)

## 1. 流儀

「出典」の列は、本文を読んで確かめた出典の略号 (末尾の一覧)。
**「未確認」は、読めた出典のどの本文にも書かれていなかったもの**、
**「実測」は tommie-fence のフェンスで描き比べて決めたもの** (§3)、
**「この skill の決め」は、文と図を 1 対 1 にするためにこの skill が置いた約束**。

### 4 つの計器に共通

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
| 18 | **入力の上限を超える信号を書かない** (tinySA Ultra は +6 dBm が絶対最大で推奨は +0 dBm 以下。Basic は +10 dBm)。書くなら本文で受ける | 読者が同じ設定で実機を壊す | [tinySA-First] |
| 19 | 同じ信号を FFT 型 (Analog Discovery) と掃引型 (tinySA) で並べるなら、縦軸の単位 (dBm) を揃える | 同じ線が同じ高さに出る | #5 から |

### VNA (S パラメータ)

| # | 決め | なぜ | 出典 |
| --- | --- | --- | --- |
| 20 | **形式は見る物で選ぶ**: 通過・損失 → S21 LOGMAG、反射の大きさ → S11 LOGMAG、アンテナの同調と帯域 → SWR と REACTANCE、部品の値 → R / X / \|Z\|、整合と校正の 3 点 → SMITH、ケーブル → TDR。1 枚に **2 形式まで** | 実機のメニューの名前で読者が同じ画面を出せる。3 形式以上は縦に長い | [cho45] (11 の形式、トレース 4。アンテナは SWR・REACTANCE・SMITH)。2 形式は実測 (§3) |
| 21 | 掃引は見せたい特性 (共振・カットオフ・帯) を**中心 (CENTER) に置き、幅 (SPAN) は特性の 3 dB 幅の 3〜10 倍**。広い掃引の後に狭い掃引、なら 2 枚 | 点は 101 で、広い掃引では狭い特性を点が跨いで見落とす。狭すぎると平らに見える | [cho45] (「合わせたい周波数を CENTER に、SPAN を適切に」)、[HexFlex] (「101 点しか無く、広帯域の掃引では狭帯域の特徴を見落とす」)。3〜10 倍は実測 (§3) |
| 22 | マーカーは本文の周波数 (共振点・−3 dB 点・帯の端)。**帯 (band)・印 (mark)・一言 (text) で「どこを見るか」を図の上で言う** | 図から数字と見る所が読める | この skill の決め |
| 23 | Smith は「1 点を見る」図。マーカーの周波数と R + jX を添え、S11 LOGMAG か SWR と対にする | 円だけでは読者が読めない | [cho45] (SWR が足りないときに Smith で整合)。対にするのはこの skill の決め |
| 24 | 反射の**小さな**変化 (数 dB の谷) は LOGMAG ではなく SWR か R / X で見せる | LOGMAG の 0〜−80 dB の枠では数 dB の谷が上端に張り付いて見えない | 実測 (§3) |

### ロジックアナライザ (レーンとバス)

オシロ (アナログ) は電圧の形、ロジックは**高低の並びと時刻**を見る。
出典が「未確認」の行は、Digilent の WaveForms・AD3 の本文を読めなかった (403) ので、この skill の決めとして置いた。

| # | 決め | なぜ | 出典 |
| --- | --- | --- | --- |
| 25 | **標本化は、見せる一番速い変化 (クロックの周波数) の 4 倍以上**。`sample:` を書く。アナログの形まで見るなら 10 倍で、その場合は scope の図にする (#34)。標本化を上げすぎると同じバッファで撮れる時間が縮む (AD3 は 1 本 32,768 標本まで、標本化 ÷ 32,768 が撮れる長さ) | 標本が粗いと短いパルスと edge の時刻を取りこぼす | [Saleae-SR] (デジタルは帯域の 4 倍以上、アナログは 10 倍以上)。AD3 の 32,768 標本は logic-fence の文書 (§3) の引用で、Digilent の本文は未確認 |
| 26 | 時間軸は、**本文が言う区間が画面の 10 目盛に収まり、クロックなら 2〜10 周期が入る** `time:` にする。UART は 1 フレーム (10 bit) が 3〜6 目盛。変わり目が 3 px より近いレーンが出たら (塗りになる) `time:` を細かくする | 1 周期未満では周期が測れず、細かすぎると線が塗りになって読めない | 2〜10 周期は未確認 (#10 の 2〜5 周期を準用)。3 px は logic-fence の処理系の決め (§3) |
| 27 | トリガは**現象を始める edge** (フレームならスタートビットの立ち下がり、カウンタなら CLK の edge) に置き、**その前を少し見せる** (`start:` を負に)。`trigger:` は、図に載る edge が本当にある時刻に置く | 図が止まり、原因の前の状態 (アイドル) が読める | [WikiLA] (トリガ条件は単一信号の立ち上がり・立ち下がりから)。前を見せる数は未確認 (この skill の決め) |
| 28 | バスは**基数を 1 つに決め、題かバス名で言う**: アドレス・データは `hex`、制御線は `bin`、カウンタの段数は `dec`。1 枚の中で同じ物は同じ基数 | 0x4 と 4 と 0b0100 が混ざると本文の値と突き合わせられない | この skill の決め (未確認) |
| 29 | レーンの順は**固定**: クロックが一番上、次にデータ (MSB → LSB。バスは `A3..A0` のように MSB が先)、最後に読み下し。同じ文書の図は同じ順 | 読者はクロックを基準に下へ読む。バスの桁が逆だと値が変わる | この skill の決め (未確認)。バスの MSB 先は logic-fence の書式 (§3) |
| 30 | **カーソルは edge の真上に置かない**。ビットの真ん中 (1 ビットの半分の時刻) に置く | 変わり目ちょうどは新しい値と古い値のどちらにも読め、読み値が 1 つ違う | logic-fence の読み値の決め (「変わり目ちょうどの時刻は新しい値」、§3)。実機の WaveForms は未確認 |
| 31 | カーソルは 2 つ (X1・X2) で、**本文が引く ΔX と 1/ΔX の数**を図に出す。周期や baud の読み値は、計算した数と表の数を突き合わせる | #2 と同じ。1/ΔX は周波数・baud を直接言う | #2 から。カーソルが対で差を測ることは [SparkFun] |
| 32 | **レーンの本数と名前は回路図のネット名と同じ** (`CLK` `QA`…)。DIO の番号は `dioN` で書く。測らないネットは載せない | 図と回路図が 1 対 1 になり、配線を間違えない | この skill の決め (未確認) |
| 33 | 電圧の水準を書く: AD3 の DIO は **LVCMOS 3.3 V で 5 V 耐性**。5 V の回路を直接つなげる、と書くなら「耐性」まで。入力のしきい値 (VIH・VIL) は Digilent の本文を読むまで書かない | 読者が水準の違う回路に直接つないで壊す | 3.3 V・5 V 耐性は logic-fence の文書が引く Digilent の AD3 Specifications (Rev. 11/2023) の引用で、本文は**未確認**。しきい値は未確認 |
| 34 | **電圧の形 (レベル・立ち上がり・雑音・なまり) が大事なら scope、多数の線の値・順序・時刻の関係が大事なら logic**。両方が大事なら両方を載せ、時間軸を揃える | ロジックは高低に丸めるので、なまりや雑音は見えない | [Saleae-SR] (アナログの形は 10 倍) を根拠にした使い分け。線引きはこの skill の決め |
| 35 | UART の読み下しは **baud・形式 (8N1 など)・バイト値を 16 進と ASCII の両方**で言う。1 bit の時間 (9600 baud なら 104.17 µs) は本文と同じ数にする。窓に全部入るフレームだけを箱にする | 読者が同じ設定で受信機を組め、文字と値を突き合わせられる | この skill の決め (未確認)。窓に全部入るフレームだけが箱になるのは logic-fence の処理系 (§3) |
| 36 | **計算していない時刻を書かない**。edge の時刻・バスの値の並び・カーソルの読みは、先に数で決めてから図にする (§2) | 実機の画面と食い違う図は、実機を組む読者を迷わせる | この skill の決め |
| 37 | **1 ビットのレーンは、H の区間を線と同じ色で薄く塗る** (全レーン同じ色)。logic-fence は既定でそうする。他の道具でも H の下を塗る | 線だけだと、どちらが H か、H がどれだけ続くかが一目で読めない。塗りがあれば幅がそのまま H の長さに見える | この skill の決め (読者の指摘による。未確認) |

## 2. 手順

1. 本文 (題) の「計器の設定」と「見るべき値」を読み、図に出す数 (マーカー・カーソル・Measurements) を決める (§1 #2)
2. 見せたい物が画面の大半を占める尺度と掃引を選ぶ (§1 #3。オシロは #9〜#10、スペアナは #14〜#16、VNA は #20〜#21、ロジックは #25〜#27)
3. **道具の読み値 (`check` など) を本文の数と突き合わせる。合うまで画像は見ない** — 数の食い違い (1000 倍・位相の符号) は画像では見落とす。ロジックは、edge の時刻・バスの値の並び・カーソルの読み・ΔX と 1/ΔX を**先に計算**してから図にする (§1 #36)
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
- [ ] (ロジック) 標本化が最速の変化の 4 倍以上か。`sample:` を書いたか (#25)
- [ ] (ロジック) 時間軸に本文の区間が収まり、クロックが 2〜10 周期か。塗りになったレーンが無いか (#26)
- [ ] (ロジック) トリガが現象を始める edge で、その前が少し見えるか (#27)
- [ ] (ロジック) バスの基数が 1 つで言ってあるか。レーンの順はクロック → データ MSB → LSB か (#28・#29)
- [ ] (ロジック) カーソルが edge の真上でなくビットの真ん中か。ΔX と 1/ΔX が本文の数か (#30・#31)
- [ ] (ロジック) 1 ビットのレーンの H が塗ってあるか (#37)
- [ ] (ロジック) レーン名が回路図のネット名か。3.3 V の水準を書いたか。UART は baud・形式・16 進と ASCII か (#32・#33・#35)

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

### logic フェンス ([tommie-fence](https://github.com/tommie-jp/tommie-fence))

Markdown の ` ```logic ` フェンス (logic-fence 0.1.0) は、WaveForms (Analog Discovery 3) の Logic の画面を写す。
文法は tommie-fence の `packages/logic-fence/docs/01-syntax.md` と `02-cheatsheet.md`
(この skill はその文書を読んで書いた。フェンスで描き比べてはいない)。§1 #25〜#36 との対応:

| 見たこと | 目安 |
| --- | --- |
| `device:` は必須 (`ad3` は 16 本・標本化 125 MS/s まで・1 本 32,768 標本、`generic` は 32 本まで検査なし)。`sample:` を書けば上限・バッファ・2 標本より短い区間を確かめる | `sample:` は必ず書く (#25)。書かなければ検査されない |
| 窓は `time: 1s/div` か `window: 10s` の**どちらか片方**で、目盛は 10 で固定。`start:` が窓の左端で、負ならトリガ前が見える。**横 60 px が 1 目盛、変わり目が 3 px より近いレーンは塗りになり**お知らせが出る | `start:` を負にして前を見せる (#27)。塗りになったら `time:` を細かくする (#26)。`start:` の既定 (0) が WaveForms の Position の既定と同じかは確かめていない (文書の言う通り) |
| `signals:` の行の順が図の順。`clock` は t = 0 で立ち上がる。`counter` の元のレーンは前に書く。`buses:` は `名前: レーン… 基数` で **MSB が先・基数は最後に必ず書く** (`hex` `bin` `dec` `sint`)、レーン → バス → 読み下しの順に描く | 順は #29、基数は #28。レーン名は回路図のネット名に (#32) |
| `cursors: [X1, X2]` は 2 つまで。表に行ごとの値と、2 つなら ΔX と 1/ΔX が出る。**変わり目ちょうどの時刻は新しい値** | 変わり目から離し、ビットの真ん中に (#30・#31)。例: 1 Hz の CLK は 4 s で立ち上がり 4.5 s で立ち下がるので、4.5 s ちょうどは避け、high の真ん中の **4.25 s** と low の真ん中の **4.75 s** に置く |
| `trigger: レーン rising\|falling [at 時刻]`。`at` の時刻にその向きの edge が無ければお知らせ | お知らせ 0 にする (#8・#27) |
| `decode: 名前: uart レーン baud 9600 8N1 [hex\|ascii]` (この版は UART だけ。SPI・I2C は「まだ書けません」)。窓に全部入るフレームだけ箱になり、窓の左端で線が low なら途中のフレームとみなす | `hex` と `ascii` は 1 つしか選べないので、**16 進と ASCII の両方を言うには本文か題に片方を書く** (#35)。1 フレーム = 10 bit ÷ 9600 = 1.04 ms なので `200us/div` (窓 2 ms) が収まる |
| CLI の `check` が出す読み値 (カーソルの表・レーンの変わり目の数・バスの `0x0@0 s …` の並び・フレームの並び) | 先に計算した数と突き合わせる (§2 の 3、#36) |

- この文書の例 (図 04 の 9600 baud の "H" = 0x48、`time: 200us/div`・`sample: 1MHz`) は標本化が 1 bit の約 100 倍で、#25 を十分に満たす
- 図を PNG に焼く手順は tommie-fence の `.claude/skills/tommie-fence`

## 標準の計器と選び方

この教科書の標準は、作者が持っていて、広く使われている次の機種にする (機種の仕様の数字は、確認できたものだけを本文に書く)。

| 種類 | 標準 | 理由 |
| --- | --- | --- |
| スペクトラムアナライザ | tinySA Ultra ZS405 | 作者が持っている。広く使われている |
| VNA | LiteVNA64 | 同上 |
| USB 計測器 (オシロ・波形発生器・電源) | Analog Discovery 3 (AD3) | 同上。三相電源の確認には、AD を 2 台使う測り方も紹介する |

### どの計器で確かめるか

| 確かめたいもの | 計器 | 範囲 |
| --- | --- | --- |
| 時間の波形が大事 (形・立ち上がり・包絡線・パルス) | Analog Discovery のオシロ | 10 MHz 以下 |
| スペクトルが大事 (搬送波・高調波・像・側帯波) | 10 MHz 以下は Analog Discovery、それより上は tinySA | tinySA は通常モードで 100 kHz〜800 MHz |
| S11・S21・インピーダンス・SWR・LOGMAG・位相・Smith | VNA | 機種の周波数範囲 |
| 直流の電圧・電流・抵抗 | テスター。電源は Analog Discovery の Supplies | |

- RF の出力は、オシロと tinySA の両方で確かめる。10 MHz を超える出力の波形は、教科書のオシロでは見えないので、tinySA のスペクトルで確かめる
- 波形とスペクトルの両方が大事な題は、10 MHz 以下なら両方を載せる
- 入力インピーダンスの違いを書く。Analog Discovery は 1 MΩ で回路にほとんど負荷をかけない。tinySA と VNA は 50 Ω なので、高インピーダンスの節点には直接つなげない
- 入力の上限を書く。tinySA Ultra の入力は絶対最大 +6 dBm、推奨は +0 dBm 以下、直流は ±5 V までで、超えるときは SMA の減衰器を先に挟む (tinySA Basic は +10 dBm)
- 電波を出す題は、アンテナから出さず、同軸ケーブルで直接つなぐか、近くの短い線で拾う。微弱無線局の範囲を守る
- 各題の「計器の設定」の頭に、選んだ計器と理由を 1 行書く
- 図の種類との対応: 波形は scope、スペクトルは spectrum、S パラメータは vna、多数の線の高低・バス・UART は logic

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
- [Saleae-SR] [What Sampling Rate Should I Use? — Saleae](https://www.saleae.com/support/logic-software/capturing-data/what-sample-rate-is-required)。
  「you will need to sample digital signals at least 4 times faster than their bandwidth」「Analog signals must be
  sampled at least 10 times faster than their bandwidth」。長い捕捉ではメモリと CPU の都合で上げすぎない、とも書く
- [WikiLA] [Logic analyzer — Wikipedia (英語)](https://en.wikipedia.org/wiki/Logic_analyzer)。timing モードは一定の間隔で
  標本化する。トリガ条件は「単一信号の立ち上がり・立ち下がり」から複雑なものまで

§1 の「未確認」(同じ文書で設定を揃える、位相差の題の周期数) は、上のどの本文にも書かれていなかったもの。
本文を読めなかったもの: nanovna.com のユーザーガイド (404)、Keysight の AN 150 の現行版
(ランディングページしか返らない — 上の旧版で代えた)。

ロジック (#25〜#37) で本文を読めなかったもの: Digilent の WaveForms Reference Manual・Logic Analyzer の
ガイド・Analog Discovery 3 の Reference Manual (いずれも 403)、Saleae のトリガの FAQ (404)、sigrok の Sample rate の頁 (404)。
このため WaveForms のカーソル・トリガ位置・バスの基数の実機の挙動、AD3 の DIO のしきい値 (VIH・VIL)、
3.3 V・5 V 耐性・32,768 標本 (logic-fence の文書の引用としてのみ) は「未確認」または「この skill の決め」とした。
