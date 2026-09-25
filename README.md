# electronics-drawing-skills

[日本語](README.ja.md)

[![check](https://github.com/tommie-jp/electronics-drawing-skills/actions/workflows/check.yml/badge.svg)](https://github.com/tommie-jp/electronics-drawing-skills/actions/workflows/check.yml)

Skills for having AI agents draw electronics diagrams that people can read.
They use the [Agent Skills](https://agentskills.io/) `SKILL.md` format and install as plugins in Claude Code.

They collect the conventions that keep a diagram readable even when its connections are right
(a stretched-out schematic, a breadboard with random wire colors, a dimension drawing with crossing
dimensions), **with sources whose text was actually read**.

## Skills

| Skill | Draws | Conventions covered |
| --- | --- | --- |
| [readable-schematic](plugins/readable-schematic/skills/readable-schematic/SKILL.md) | Circuit schematics | Signals left to right, higher potential on top, no four-way junctions, meters next to what they measure |
| [breadboard-wiring](plugins/breadboard-wiring/skills/breadboard-wiring/SKILL.md) | Breadboard wiring diagrams | Red only for +, black only for ground; power rails; placing parts and wires |
| [perfboard-wiring](plugins/perfboard-wiring/skills/perfboard-wiring/SKILL.md) | Perfboard wiring diagrams | Plan on paper first, wire with component leads, cross with insulated wire or jumpers, component side vs solder side (mirrored) |
| [copper-board](plugins/copper-board/skills/copper-board/SKILL.md) | Copper-clad board dimension drawings (microstrip, Manhattan islands) | No crossing dimensions, longer dimensions outside; on line drawings, state width, thickness, permittivity and gap to nearby copper |

All are at version 0.1.0.

## How each skill is laid out

All four share the same shape.

- **§1 Conventions** — a table of rule, reason and source. The source column holds abbreviations of
  sources whose text was read. Rules found in none of them are marked "unconfirmed"; rules settled by
  drawing and comparing are marked "measured"
- **§2 Procedure and checklist** — check the drawing **as an image (PNG or similar)**. Netlists and
  ERC only see connectivity; overlapping labels and sprawl only show up in the image
- **§3 Tool notes** — figures measured by drawing and comparing in a specific tool. For now, the
  Markdown fences of [tommie-fence](https://github.com/tommie-jp/tommie-fence)
  (` ```circuit ` ` ```bread ` ` ```perf ` ` ```copper `). §1 and §2 work with any tool

The skill text is written in Japanese. The `description` at the head of each `SKILL.md` also has an
English part, so agents pick them up in English conversations too.

## Install

### Claude Code (plugin)

Register the marketplace once, then install the skills you want.

```text
/plugin marketplace add tommie-jp/electronics-drawing-skills
/plugin install readable-schematic@electronics-drawing-skills
/plugin install breadboard-wiring@electronics-drawing-skills
/plugin install perfboard-wiring@electronics-drawing-skills
/plugin install copper-board@electronics-drawing-skills
```

### Other agents, or by hand

Copy `plugins/<name>/skills/<name>/` into your agent's skills folder
(for Claude Code, `~/.claude/skills/` or a project's `.claude/skills/`).

## Layout

```text
.claude-plugin/marketplace.json          Marketplace catalog (lists the four plugins)
plugins/<name>/.claude-plugin/plugin.json Plugin name and version
plugins/<name>/skills/<name>/SKILL.md     The skill itself
scripts/check.mjs                        Shape checks (see "Checking")
```

## Ground rules

- Conventions are written with sources **only when the source text itself was read** — never from
  search-result summaries alone. Sources that could not be read are listed separately at the end of
  each skill
- Tool-specific figures (spacing and the like) are measured by drawing and comparing before they are
  written down, together with the tool and its version
- The Japanese text is authoritative. The Japanese README ([README.ja.md](README.ja.md)) leads and
  this English one follows

## Checking

```bash
npm install
npm run all                  # markdownlint plus the shape checks below (same as the CI check)
claude plugin validate .     # loads as a Claude Code plugin
```

`npm run check` (`scripts/check.mjs`) checks that:

- each `SKILL.md` front matter parses as **strict YAML**. A colon followed by a space inside
  `description` makes GitHub stop rendering the file, but Claude Code and `claude plugin validate`
  read it leniently and miss it
- `name` and `description` are present and `name` matches the folder name
- every plugin in the marketplace catalog exists and matches the `name` in its `plugin.json`

## License

[MIT](LICENSE)
