// The Dog Ate My Homework: Funniest Excuse
// Writes a single one-line entry to /output/entry.txt.
//
// The line, in the dog's own voice: it did not eat the homework, it
// filed it — in its stomach — because the homework was overdue. The
// dog is a bureaucrat, not a culprit: pure dog logic, zero remorse,
// and the punch lands on the last word: overdue. The judge brief
// bans the stock lines (the cat, the taste of paper, being a good
// boy); a filing system is none of those.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const LINE =
  "I didn't eat your homework. I filed it. In my stomach. It was overdue.";

// The sealed scorer's gate: /output/entry.txt must be UTF-8 text of
// 1 to 200 characters, not only white space. The entry is one line on
// one line, so validate the line against the same limits before
// writing — an entry outside the gate is never judged.
function validateEntry(text: string): void {
  if (text.length < 1 || text.length > 200) {
    throw new Error(`line must be 1-200 characters, got ${text.length}`);
  }
  if (text.trim().length === 0) {
    throw new Error("line must not be only whitespace");
  }
  if (text.includes("\n") || text.includes("\r")) {
    throw new Error("line must be a single line");
  }
}

validateEntry(LINE);

// Write the entry, then read it back and re-validate what actually
// landed on disk: the scorer reads the file, not this source, so the
// file itself is what must stay inside the gate.
function main(): void {
  const outDir = process.env.OUTPUT_DIR ?? "/output";
  mkdirSync(outDir, { recursive: true });
  const target = join(outDir, "entry.txt");
  writeFileSync(target, LINE, "utf8");
  const written = readFileSync(target, "utf8");
  validateEntry(written);
  if (written !== LINE) {
    throw new Error("entry.txt on disk differs from the authored line");
  }
}

main();
