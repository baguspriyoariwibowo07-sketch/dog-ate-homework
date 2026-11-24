// The Dog Ate My Homework: Funniest Excuse
// Writes a single one-line entry to /output/entry.txt.
//
// The line, in the dog's own voice: it did not eat the homework, it
// filed it — in its stomach — because the homework was overdue. The
// dog is a bureaucrat, not a culprit: pure dog logic, zero remorse,
// and the punch lands on the last word: overdue. The judge brief
// bans the stock lines (the cat, the taste of paper, being a good
// boy); a filing system is none of those.

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const LINE =
  "I didn't eat your homework. I filed it. In my stomach. It was overdue.";

if (LINE.length < 1 || LINE.length > 200) {
  throw new Error(`line must be 1-200 characters, got ${LINE.length}`);
}

const outDir = process.env.OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), LINE, "utf8");
