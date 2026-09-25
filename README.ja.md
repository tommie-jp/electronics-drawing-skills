# schematic-skill

[English](README.md)

人が読む電子工作の図を描くための、AI エージェント向けの skill 集
([Agent Skills](https://agentskills.io/) の `SKILL.md` 形式)。
Claude Code ではプラグインとして入れられる。

| skill | 何をするか | 状態 |
| --- | --- | --- |
| [readable-schematic](plugins/readable-schematic/skills/readable-schematic/SKILL.md) | 回路図を読みやすく配置する。流儀を出典つきでまとめ、画像にして確かめる点検表を添える。描く道具は問わない | 公開 |
| breadboard-wiring | ブレッドボードの実体配線図 | 予定 |
| perfboard-wiring | ユニバーサル基板の配線図 | 予定 |
| copper-board | 銅張り基板 (マイクロストリップなど) の寸法図 | 予定 |

## 入れ方

### Claude Code (プラグイン)

```text
/plugin marketplace add tommie-jp/schematic-skill
/plugin install readable-schematic@schematic-skill
```

### ほかのエージェント・手で置く

`plugins/<名前>/skills/<名前>/` のフォルダを、使うエージェントの skill の置き場
(Claude Code なら `~/.claude/skills/` かプロジェクトの `.claude/skills/`) へ写す。

## 作り方の約束

- 流儀は**出典の本文を読んで確かめたもの**だけを出典つきで書く。確かめられなかったものは「未確認」と書き分ける
- 道具で決まる目安 (間隔など) は、実際に描き比べて測ってから書く
- 本文は日本語が正

## ライセンス

[MIT](LICENSE)
