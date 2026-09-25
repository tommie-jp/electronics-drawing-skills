// skill 集の形を確かめる (CI と手元の両方で走らせる)。
//
// 1. SKILL.md の front matter を**厳密な YAML** として読む。Claude Code と
//    `claude plugin validate` は寛容に読むので、description にコロンと空白の並びが
//    あっても通してしまう。GitHub は厳密に読んで表示で止まる (copper-board で踏んだ)。
// 2. front matter に name と description があり、name がフォルダ名と同じか。
// 3. marketplace.json の各エントリの source が在り、plugin.json の name と揃っているか
//    (揃っていないと、名前で入れようとしたときに見つからない)。
import { existsSync, readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';
import { parseDocument } from 'yaml';

const problems = [];
const say = (where, what) => problems.push(`${where}: ${what}`);

const FRONT_MATTER = /^---\n([\s\S]*?)\n---\n/;

function checkSkill(path, folder) {
  const match = FRONT_MATTER.exec(readFileSync(path, 'utf8'));
  if (!match) return say(path, 'front matter (--- で囲んだ頭) がありません');
  const doc = parseDocument(match[1], { strict: true, uniqueKeys: true });
  for (const error of doc.errors) say(path, `front matter が YAML として読めません: ${error.message.split('\n')[0]}`);
  if (doc.errors.length > 0) return;
  const data = doc.toJS() ?? {};
  if (typeof data.name !== 'string') say(path, 'name がありません');
  else if (data.name !== folder) say(path, `name (${data.name}) がフォルダ名 (${folder}) と違います`);
  if (typeof data.description !== 'string' || data.description.trim() === '') say(path, 'description がありません');
}

const readJson = (path) => {
  try {
    return JSON.parse(readFileSync(path, 'utf8'));
  } catch (error) {
    say(path, `JSON として読めません: ${error.message}`);
    return null;
  }
};

const market = readJson('.claude-plugin/marketplace.json');
const listed = new Set();
for (const entry of market?.plugins ?? []) {
  const where = `.claude-plugin/marketplace.json (${entry.name})`;
  listed.add(entry.name);
  if (typeof entry.source !== 'string' || !existsSync(entry.source)) {
    say(where, `source (${entry.source}) のフォルダがありません`);
    continue;
  }
  const manifest = readJson(join(entry.source, '.claude-plugin', 'plugin.json'));
  if (manifest && manifest.name !== entry.name) say(where, `plugin.json の name (${manifest.name}) と揃っていません`);
}

for (const plugin of readdirSync('plugins')) {
  if (!listed.has(plugin)) say(`plugins/${plugin}`, 'marketplace.json に載っていません');
  const skills = join('plugins', plugin, 'skills');
  if (!existsSync(skills)) continue;
  for (const skill of readdirSync(skills)) checkSkill(join(skills, skill, 'SKILL.md'), skill);
}

if (problems.length > 0) {
  for (const problem of problems) console.error(problem);
  process.exit(1);
}
console.log(`ok: プラグイン ${listed.size} 個、SKILL.md の front matter はすべて読めました`);
