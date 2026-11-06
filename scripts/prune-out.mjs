// Runs after `next build`. public/assets is a symlink to assets/, so the export copies every
// local master into out/ — including ones the site never loads. Cloudflare Pages rejects any
// file over 25 MiB, which fails the whole upload, so those are dropped from out/ only.
// Originals in assets/ are never touched.

import { readdirSync, rmSync, statSync } from "node:fs";
import path from "node:path";

const LIMIT = 25 * 1024 * 1024;

function walk(dir) {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const file = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(file);
    else if (statSync(file).size > LIMIT) {
      rmSync(file);
      console.log(`prune-out: removed ${file} (over the Cloudflare Pages 25 MiB limit)`);
    }
  }
}

walk("out");
