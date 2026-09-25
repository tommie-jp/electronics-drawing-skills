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

版は copper-board が 0.1.1、ほかは 0.1.0。

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

どこで Claude Code を使っているかで、入れ方が違う。出典は Claude Code の公式文書
[Install plugins](https://code.claude.com/docs/en/plugins/install)。

### ターミナルの Claude Code (JetBrains の IDE の中のターミナルも同じ)

`claude` で Claude Code を起動し、**Claude Code の入力欄**に打つ (シェルに打つのではない)。

```text
/plugin marketplace add tommie-jp/electronics-drawing-skills
/plugin install readable-schematic@electronics-drawing-skills
```

- 1 行目 (マーケットプレイスの登録) は最初の 1 回だけ
- 2 行目は、すぐには入らず、プラグインの説明の画面が開く。そこで**入れる範囲 (スコープ)** を選ぶ
  (下の表)。ほかの 3 つも名前を替えて同じように入れる
- 入れたあと「`Run /reload-plugins to activate.`」と出たら、読み込み直しが要る (画面は自動でやる)

### シェルのコマンドで入れる

Claude Code を起動せず、シェルで入れることもできる。スクリプトに書くときや、
`claude -p` のように対話しない使い方をしているときはこちら (その中では `/plugin` が使えない)。

```bash
claude plugin marketplace add tommie-jp/electronics-drawing-skills
claude plugin install readable-schematic@electronics-drawing-skills
claude plugin install breadboard-wiring@electronics-drawing-skills
claude plugin install perfboard-wiring@electronics-drawing-skills
claude plugin install copper-board@electronics-drawing-skills
```

範囲は `--scope user` (既定)・`--scope project`・`--scope local` で選ぶ。入ったかは `claude plugin list` で見る。

### デスクトップアプリ

**Code** タブのローカル (か SSH) のセッションで、入力欄の横の **+** → **Plugins** → **Add plugin**。
マーケットプレイスを先に登録しておく (上のどちらかの 1 行目)。

### VS Code

Claude Code のパネルの入力欄に `/plugins` と打つと **Manage plugins** が開く。
**Marketplaces** タブで `tommie-jp/electronics-drawing-skills` を足し、**Plugins** タブで入れる。

### クラウドのセッション (claude.ai/code など)

プラグインは使えない。手元で入れたプラグインも読み込まれない。
代わりに、下の「手で置く」でリポジトリの `.claude/skills/` に写してコミットしておくと、
そのリポジトリのセッションで使える。手元の `~/.claude/skills/` は読み込まれない
([Configure cloud environments](https://code.claude.com/docs/en/cloud-environments) の「What carries over from your setup」)。

### 入れる範囲 (スコープ)

| 範囲 | 効く所 | 記録される所 |
| --- | --- | --- |
| user (自分) | この PC のすべてのプロジェクト | `~/.claude/settings.json` |
| project (このリポジトリの全員) | このリポジトリを使う人みんな | `.claude/settings.json` (コミットする) |
| local (自分、このリポジトリだけ) | このリポジトリの自分だけ | `.claude/settings.local.json` |

ターミナル・デスクトップアプリ (ローカル)・VS Code は同じ設定を読むので、1 か所で user に
入れれば、ほかの 2 つでも使える。

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
