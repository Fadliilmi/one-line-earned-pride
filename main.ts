// One Line of Earned Pride — make.fun entry for Fadli Ilmi (@fadli-ilmi).
// The program writes a single line of text to /output/entry.txt:
// a quiet, earned moment of pride for someone in a scene.

import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";

// The line. One read, one scene: eleven months of saving, a new motorbike,
// and a father who says nothing because the moment says it for him.
// Revised: "rode home, switched it off" lands the long effort in three quiet
// beats instead of one static image, and the keys stay in his hand.
const LINE =
  "After eleven months of coins in a Milo tin, my father rode his new " +
  "motorbike home, switched it off, and just stood there, keys in his hand.";

const OUT = process.env.ENTRY_OUTPUT ?? join("/output", "entry.txt");

function main(): void {
  const text = LINE.trim();
  // Count code points, not UTF-16 units, so the gate's 1-240 holds exactly.
  const length = [...text].length;
  if (length < 1 || length > 240) {
    throw new Error(`entry must be 1-240 characters, got ${length}`);
  }
  if (!/\S/.test(text)) {
    throw new Error("entry must not be only whitespace");
  }
  mkdirSync(dirname(OUT), { recursive: true });
  // No trailing newline: the file holds exactly the line, nothing else.
  writeFileSync(OUT, text, "utf8");
  console.log(`wrote ${[...text].length} characters to ${OUT}`);
}

main();
