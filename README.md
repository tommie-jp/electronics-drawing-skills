# electronics-drawing-skills

[日本語](README.ja.md)

Agent skills (the [Agent Skills](https://agentskills.io/) `SKILL.md` format) for drawing
electronics diagrams that people can read. In Claude Code they install as plugins.

| Skill | What it does | Status |
| --- | --- | --- |
| [readable-schematic](plugins/readable-schematic/skills/readable-schematic/SKILL.md) | Lays out circuit schematics for human readers: sourced conventions and a check-by-image checklist. Works with any drawing tool | Published |
| [breadboard-wiring](plugins/breadboard-wiring/skills/breadboard-wiring/SKILL.md) | Draws breadboard wiring diagrams people can build from: sourced wire-color, rail and placement conventions | Published |
| [perfboard-wiring](plugins/perfboard-wiring/skills/perfboard-wiring/SKILL.md) | Draws perfboard wiring diagrams people can solder from: sourced planning, wiring, and component-side vs solder-side conventions | Published |
| copper-board | Dimension drawings of copper-clad boards (microstrip and the like) | Planned |

The skill text is written in Japanese (the English description in each `SKILL.md`
front matter lets agents pick it up in English conversations too).

## Install

### Claude Code (plugin)

```text
/plugin marketplace add tommie-jp/electronics-drawing-skills
/plugin install readable-schematic@electronics-drawing-skills
```

### Other agents, or by hand

Copy `plugins/<name>/skills/<name>/` into your agent's skills folder
(for Claude Code, `~/.claude/skills/` or a project's `.claude/skills/`).

## Ground rules

- Conventions are written with sources only when the source text itself was read; anything that
  could not be confirmed is marked as unconfirmed
- Tool-specific spacing figures are measured by drawing and comparing before they are written down
- The Japanese text is authoritative

## License

[MIT](LICENSE)
