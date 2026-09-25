# electronics-drawing-skills

[English](README.md)

[![check](https://github.com/tommie-jp/electronics-drawing-skills/actions/workflows/check.yml/badge.svg)](https://github.com/tommie-jp/electronics-drawing-skills/actions/workflows/check.yml)

人が読む電子工作の図を、AI エージェントに描かせるための skill 集。
形式は [Agent Skills](https://agentskills.io/) の `SKILL.md` で、Claude Code ではプラグインとして入れられる。

つながりが正しくても読めない図 (配線が間延びした回路図、色がでたらめな実体配線図、
寸法が交差した寸法図) を避けるための流儀を、**本文を読んで確かめた出典つき**でまとめてある。

## skill の一覧

| skill | 描く図 | 流儀の中身 |
| --- | --- | --- |
| [readable-schematic](plugins/readable-schematic/skills/readable-schematic/SKILL.md) | 回路図 | 信号は左から右、電位の高いほうを上、4 方向の交点を作らない、計器は測る所の隣 |
| [breadboard-wiring](plugins/breadboard-wiring/skills/breadboard-wiring/SKILL.md) | ブレッドボードの実体配線図 | 赤は + だけ・黒は GND だけ、電源レールの使い方、部品と線の置き方 |
| [perfboard-wiring](plugins/perfboard-wiring/skills/perfboard-wiring/SKILL.md) | ユニバーサル基板の配線図 | 先に紙で段取り、部品の足で配線、交差は被覆線かジャンパ、部品面と半田面 (左右が逆) |
| [copper-board](plugins/copper-board/skills/copper-board/SKILL.md) | 銅張り基板の寸法図 (マイクロストリップ・Manhattan の島など) | 寸法線を交差させない・長い寸法を外、線路の図に幅・厚さ・比誘電率・周りの銅との間隔を書く |

どれも版は 0.1.0。

## skill の中身の形

4 つとも同じ形にしてある。

- **§1 流儀** — 決め・なぜ・出典の表。出典の列は、本文を読んで確かめた出典の略号。
  どの本文にも無かったものは「未確認」、描き比べて決めたものは「実測」と書き分ける
- **§2 手順と点検表** — 描いた図を**画像 (PNG など) にして目で見て**確かめる。
  ネットリストや ERC はつながりしか見ないので、字の重なりや間延びは画像でしか分からない
- **§3 道具ごとの補足** — 特定の道具で描き比べて測った目安。いまは
  [tommie-fence](https://github.com/tommie-jp/tommie-fence) の Markdown のフェンス
  (` ```circuit ` ` ```bread ` ` ```perf ` ` ```copper `) のもの。§1 と §2 は道具を問わない

本文は日本語。各 `SKILL.md` の頭の `description` には英語も併記してあるので、
英語で話しかけても選ばれる。

## 入れ方

### Claude Code (プラグイン)

マーケットプレイスを 1 度登録し、使う skill を選んで入れる。

```text
/plugin marketplace add tommie-jp/electronics-drawing-skills
/plugin install readable-schematic@electronics-drawing-skills
/plugin install breadboard-wiring@electronics-drawing-skills
/plugin install perfboard-wiring@electronics-drawing-skills
/plugin install copper-board@electronics-drawing-skills
```

### ほかのエージェント・手で置く

`plugins/<名前>/skills/<名前>/` のフォルダを、使うエージェントの skill の置き場
(Claude Code なら `~/.claude/skills/` かプロジェクトの `.claude/skills/`) へ写す。

## 置き場

```text
.claude-plugin/marketplace.json          マーケットプレイスの目録 (4 つのプラグインを載せる)
plugins/<名前>/.claude-plugin/plugin.json プラグインの名前・版
plugins/<名前>/skills/<名前>/SKILL.md     skill の本体
scripts/check.mjs                        形の確認 (下の「確かめ方」)
```

## 作り方の約束

- 流儀は**出典の本文を読んで確かめたもの**だけを出典つきで書く。検索結果の要約だけでは書かない。
  本文を読めなかった出典は、各 skill の末尾に「読めなかったもの」として分けて書く
- 道具で決まる目安 (間隔など) は、実際に描き比べて測ってから書く。測った道具と版を書く
- 本文は日本語が正。README は日本語 (この文書) が正で、英語 ([README.md](README.md)) が追随する

## 確かめ方

```bash
npm install
npm run all                  # markdownlint と、下の形の確認 (CI の check と同じ)
claude plugin validate .     # Claude Code のプラグインとして読めるか
```

`npm run check` (`scripts/check.mjs`) は次を確かめる。

- `SKILL.md` の頭 (front matter) を**厳密な YAML** として読む。`description` の中にコロンのすぐ後に
  空白が続く並びがあると、GitHub は表示で止まるが、Claude Code と `claude plugin validate` は
  寛容に読むので見つけられない
- `name` と `description` があり、`name` がフォルダ名と同じか
- マーケットプレイスの目録の各プラグインが在り、`plugin.json` の `name` と揃っているか

## ライセンス

[MIT](LICENSE)
