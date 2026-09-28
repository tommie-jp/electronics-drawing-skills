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
| [readable-schematic](plugins/readable-schematic/skills/readable-schematic/SKILL.md) | Circuit schematics | Signals left to right, higher potential on top, no four-way junctions, meters next to what they measure, purchasable part values (E24) |
| [breadboard-wiring](plugins/breadboard-wiring/skills/breadboard-wiring/SKILL.md) | Breadboard wiring diagrams | Red only for +, black only for ground; power rails; placing parts and wires |
| [perfboard-wiring](plugins/perfboard-wiring/skills/perfboard-wiring/SKILL.md) | Perfboard wiring diagrams | Plan on paper first, wire with component leads, cross with insulated wire or jumpers, component side vs solder side (mirrored) |
| [copper-board](plugins/copper-board/skills/copper-board/SKILL.md) | Copper-clad board dimension drawings (microstrip, Manhattan islands) | No crossing dimensions, longer dimensions outside; on line drawings, state width, thickness, permittivity and gap to nearby copper |
| [instrument-screen](plugins/instrument-screen/skills/instrument-screen/SKILL.md) | Instrument screens (oscilloscope, spectrum analyser, VNA) | A scale that lets the subject fill the screen, markers and cursors at the numbers in the text, an RBW that separates neighbouring lines, a sweep matched to the width of the feature, a trace format chosen by what is being read; match the readings to the text before looking at the image |
| [readable-graph](plugins/readable-graph/skills/readable-graph/SKILL.md) | x-y graphs (frequency responses, Bode plots, characteristic curves) | Quantity and unit on every axis, log frequency axes stated as such, zero-based axes for magnitudes, measured data as symbols and theory as lines, compared curves on one graph, the numbers in the text marked on the graph |

readable-schematic is at version 0.3.0, breadboard-wiring and perfboard-wiring are at 0.2.0, readable-graph is at 0.1.2, copper-board is at 0.1.1, and instrument-screen is at 0.1.0.

## How each skill is laid out

All six share the same shape.

- **§1 Conventions** — a table of rule, reason and source. The source column holds abbreviations of
  sources whose text was read. Rules found in none of them are marked "unconfirmed"; rules settled by
  drawing and comparing are marked "measured"
- **§2 Procedure and checklist** — check the drawing **as an image (PNG or similar)**. Netlists and
  ERC only see connectivity; overlapping labels and sprawl only show up in the image
- **§3 Tool notes** — figures measured by drawing and comparing in a specific tool. For now, the
  Markdown fences of [tommie-fence](https://github.com/tommie-jp/tommie-fence)
  (` ```circuit ` ` ```bread ` ` ```perf ` ` ```copper ` ` ```scope ` ` ```spectrum ` ` ```vna `; ` ```graph ` is still being built). §1 and §2 work with any tool

The skill text is written in Japanese. The `description` at the head of each `SKILL.md` also has an
English part, so agents pick them up in English conversations too.

## Install

How you install depends on where you use Claude Code. Source: the Claude Code docs,
[Install plugins](https://code.claude.com/docs/en/plugins/install).

### Claude Code in a terminal (also the terminal inside JetBrains IDEs)

Start Claude Code with `claude` and type these **in Claude Code's prompt**, not in your shell.

```text
/plugin marketplace add tommie-jp/electronics-drawing-skills
/plugin install readable-schematic@electronics-drawing-skills
```

- The first line (registering the marketplace) is needed only once
- The second line does not install right away: it opens the plugin's details, where you choose the
  **install scope** (table below). Install the other five the same way with their names
- If it prints `Run /reload-plugins to activate.`, a reload is needed (the panel runs it for you)

### From your shell

You can also install without starting Claude Code — for scripts, or when you use Claude Code
non-interactively such as `claude -p` (where `/plugin` is not available).

```bash
claude plugin marketplace add tommie-jp/electronics-drawing-skills
claude plugin install readable-schematic@electronics-drawing-skills
claude plugin install breadboard-wiring@electronics-drawing-skills
claude plugin install perfboard-wiring@electronics-drawing-skills
claude plugin install copper-board@electronics-drawing-skills
```

Pick the scope with `--scope user` (default), `--scope project` or `--scope local`. Check with `claude plugin list`.

### Desktop app

In a local (or SSH) session in the **Code** tab: **+** next to the prompt box → **Plugins** → **Add plugin**.
Register the marketplace first (the first line of either section above).

### VS Code

Type `/plugins` in the Claude Code panel's prompt box to open **Manage plugins**.
Add `tommie-jp/electronics-drawing-skills` on the **Marketplaces** tab, then install on the **Plugins** tab.

### Cloud sessions (claude.ai/code and the like)

Plugins are not available there, and plugins installed on your machine are not loaded.
Instead, copy the skills into the repository's `.claude/skills/` (see "by hand" below) and commit them;
sessions on that repository can then use them. Your local `~/.claude/skills/` is not loaded
([Configure cloud environments](https://code.claude.com/docs/en/cloud-environments), "What carries over from your setup").

### Install scope

| Scope | Applies to | Recorded in |
| --- | --- | --- |
| user | All your projects on this machine | `~/.claude/settings.json` |
| project | Everyone working in this repository | `.claude/settings.json` (committed) |
| local | Only you, only in this repository | `.claude/settings.local.json` |

The terminal, the desktop app (local sessions) and VS Code read the same settings, so installing at
user scope in one makes it available in the other two.

### Other agents, or by hand

Copy `plugins/<name>/skills/<name>/` into your agent's skills folder
(for Claude Code, `~/.claude/skills/` or a project's `.claude/skills/`).

## Making sure the agent uses the skills

Installing a skill does not mean it is read every time. Claude Code reads a skill's content
**only when it judges, from the `description`, that the skill fits the task at hand**
([Skills], "Control who invokes a skill"). "Draw a schematic" usually selects it; a request where
**the figure is only part of the job** (write a textbook problem, fix an article) or **work handed to
a subagent** may not. The author has seen a subagent, asked to write textbook problems, skip the
skill and draw five schematics with wires running through instrument boxes (the connectivity was
right, so the checks did not catch it).

Layer the following, from lightest to most reliable.

1. **Call it by name.** Type `/readable-schematic:readable-schematic`, or write "read the
   readable-schematic skill before drawing" in the request. A plugin skill's name is
   `plugin-name:skill-name`
2. **Put it in the project instructions.** Add an item like this to `CLAUDE.md` (or `AGENTS.md`
   for other agents), which Claude Code reads every session:

   ```markdown
   - Before drawing or changing a figure meant for people (schematic, breadboard, board drawing,
     instrument screen, graph), read the electronics-drawing-skills skill for it (readable-schematic /
     breadboard-wiring / perfboard-wiring / copper-board / instrument-screen / readable-graph), render the figure to an image and go through the checklist
     item by item. Check an existing figure against the checklist before using it as a model
   ```

3. **When handing work to a subagent, name the skills in the request.** Skills read in the parent
   conversation are not passed on. Write "read these skills before drawing" and "report the
   checklist result for each figure" in the request. If you define the subagent in a file
   (`.claude/agents/*.md`), list the skills under `skills:` and their full content is loaded at
   startup ([Subagents], "Preload skills into subagents"):

   ```yaml
   ---
   name: figure-writer
   description: Draws electronics figures meant for people
   skills:
     - readable-schematic:readable-schematic
     - breadboard-wiring:breadboard-wiring
   ---
   ```

4. **Ask for the checklist result in the report, and do not accept a figure without it.** Treat a
   figure whose report has no per-item result as not checked. Check any existing figure you offer
   as a model first (a broken model spreads)
5. **Remind with a hook.** Claude Code hooks can add context for Claude before or after a tool runs
   ([Hooks], "PreToolUse" and "Decision control").
   [examples/hooks/drawing-skill-reminder.sh](examples/hooks/drawing-skill-reminder.sh) adds
   "read the skill, render to an image and go through the checklist" when the content being written
   contains a drawing fence (` ```circuit ` and so on) or a drawing file (`.kicad_sch` and so on).
   Copy it to the project's `.claude/hooks/` and add this to `.claude/settings.json` (needs jq):

   ```json
   {
     "hooks": {
       "PreToolUse": [
         {
           "matcher": "Write|Edit",
           "hooks": [
             {
               "type": "command",
               "command": "${CLAUDE_PROJECT_DIR}/.claude/hooks/drawing-skill-reminder.sh",
               "args": []
             }
           ]
         }
       ]
     }
   }
   ```

6. **Look at the image in the end.** Hooks and instructions only get the skill read; they do not
   judge the figure. Netlists and ERC only see connectivity. Before merging, a person or a reviewer
   opens the image and goes through the checklist

[Skills]: https://code.claude.com/docs/en/skills
[Subagents]: https://code.claude.com/docs/en/sub-agents
[Hooks]: https://code.claude.com/docs/en/hooks

## Layout

```text
.claude-plugin/marketplace.json          Marketplace catalog (lists the six plugins)
plugins/<name>/.claude-plugin/plugin.json Plugin name and version
plugins/<name>/skills/<name>/SKILL.md     The skill itself
scripts/check.mjs                        Shape checks (see "Checking")
examples/hooks/                          Example hook that reminds the agent of the skills (see above)
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
