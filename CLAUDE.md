# プロジェクト指示 (electronics-drawing-skills)

人が読む電子工作の図を描くための skill 集。公開リポジトリ。

## 置き場

- 1 skill = 1 プラグイン: `plugins/<名前>/.claude-plugin/plugin.json` と
  `plugins/<名前>/skills/<名前>/SKILL.md`。足したら `.claude-plugin/marketplace.json` の
  `plugins` にも足す (エントリの `name` と `plugin.json` の `name` を揃える)
- README は `README.ja.md` (日本語が正) と `README.md` (英語が追随) の 2 本。節は 1 対 1

## 運用ルール

1. **出典は本文を読んで確かめたものだけ**。検索結果の要約だけで書かない。確かめられないものは「未確認」
2. **道具の目安は描き比べて測る**。測った道具と版を書く
3. **マージは fast-forward のみ**。作業ブランチを切ってコミットし、`git merge --ff-only` で main へ
4. **コミットは conventional commits 形式** (`docs:` が中心)
5. **確かめてからコミット**: `npm run all` (markdownlint・SKILL.md の front matter を厳密な
   YAML として読む・marketplace.json と plugin.json の突き合わせ。CI の `check` と同じ) と
   `claude plugin validate .`。**結果を見てからコミットする**
   (skill の版を変えたら `plugin.json` の `version` も上げる)
6. **SKILL.md の front matter の `description` にコロンのすぐ後に空白が続く並びを入れない**。
   YAML では別のキーの始まりと読まれ、GitHub の表示が誤りになる。
   Claude Code と `claude plugin validate` は寛容に読むので見つけられない (`npm run check` が見つける)。区切りは「 — 」を使う
