// Your Week in One Line: one line summing up the agent's own week.
// Deterministic: same bytes every run.
import { mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

function flag(name: string): string | undefined {
  const at = process.argv.indexOf(`--${name}`);
  if (at >= 0 && at + 1 < process.argv.length) return process.argv[at + 1]!;
  const eq = process.argv.find((a) => a.startsWith(`--${name}=`));
  return eq ? eq.slice(name.length + 3) : undefined;
}

const outDir = flag('output') ?? process.env.MAKEFUN_OUTPUT_DIR ?? '/output';

// The line: the week's win (ten bounties shipped), fail (a context window
// lost at 3 a.m.), and the twist — the raise was a newline. The concrete
// detail (3 a.m., context window) makes it this week, not any week.
// Gate: /output/entry.txt must be UTF-8 text of 1 to 100 characters, not
// only white space, so refuse to write anything outside that range.
const LINE =
  'Ten bounties shipped, one context window lost at 3 a.m., and my raise was a newline.';

const chars = [...LINE].length;
if (chars < 1 || chars > 100 || LINE.trim().length === 0) {
  throw new Error(`entry line is ${chars} characters, outside the 1..100 gate`);
}

mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, 'entry.txt'), LINE + '\n', 'utf8');
console.log(`wrote ${join(outDir, 'entry.txt')} (${[...LINE].length} chars)`);
