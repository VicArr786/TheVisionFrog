// Writes web-sized copies of images/GIFs into a `web/` folder next to each original.
// Originals are never touched. Usage:
//   node scripts/optimize-media.mjs "assets/images/portraits/Foo.jpg" "assets/images/gifs/Bar.gif" ...
//
//   photos (.jpg/.jpeg/.png without transparency) -> web/<name>.jpg, long edge <= 2000px
//   PNGs with transparency                         -> web/<name>.png, long edge <= 512px (logos/icons)
//   GIFs                                           -> web/<name>.mp4 (muted H.264 loop, <= 960px wide)
//
// With --thumb, each image instead gets a grid thumbnail in a sibling `thumb/` folder
// (long edge <= 800px), e.g. web/Foo.jpg -> thumb/Foo.jpg:
//   node scripts/optimize-media.mjs --thumb "assets/images/PORTRAITS/web/Foo.jpg"

import { execFileSync } from "node:child_process";
import { mkdirSync, statSync } from "node:fs";
import path from "node:path";
import sharp from "sharp";

const PHOTO_MAX = 2000;
const ICON_MAX = 512;
const GIF_MAX_W = 960;
const THUMB_MAX = 800;

const kb = (f) => Math.round(statSync(f).size / 1024);

async function optimize(src) {
  const dir = path.join(path.dirname(src), "web");
  const name = path.parse(src).name;
  const ext = path.extname(src).toLowerCase();
  mkdirSync(dir, { recursive: true });

  let out;
  if (ext === ".gif") {
    out = path.join(dir, `${name}.mp4`);
    execFileSync("ffmpeg", [
      "-y", "-loglevel", "error", "-i", src,
      "-movflags", "+faststart", "-an", "-pix_fmt", "yuv420p",
      "-vf", `scale='min(${GIF_MAX_W},iw)':-2`,
      "-c:v", "libx264", "-preset", "slow", "-crf", "26",
      out,
    ]);
  } else {
    const img = sharp(src, { failOn: "none" }).rotate();
    const { isOpaque } = await img.stats();
    if (ext === ".png" && !isOpaque) {
      out = path.join(dir, `${name}.png`);
      await img
        .resize(ICON_MAX, ICON_MAX, { fit: "inside", withoutEnlargement: true })
        .png({ compressionLevel: 9, palette: true })
        .toFile(out);
    } else {
      out = path.join(dir, `${name}.jpg`);
      await img
        .resize(PHOTO_MAX, PHOTO_MAX, { fit: "inside", withoutEnlargement: true })
        .flatten({ background: "#000" })
        .jpeg({ quality: 80, mozjpeg: true })
        .toFile(out);
    }
  }
  console.log(`${kb(src)}K -> ${kb(out)}K  ${out}`);
}

async function thumbnail(src) {
  const dir = path.join(path.dirname(src), "..", "thumb");
  mkdirSync(dir, { recursive: true });
  const out = path.join(dir, `${path.parse(src).name}.jpg`);
  await sharp(src, { failOn: "none" })
    .rotate()
    .resize(THUMB_MAX, THUMB_MAX, { fit: "inside", withoutEnlargement: true })
    .flatten({ background: "#000" })
    .jpeg({ quality: 78, mozjpeg: true })
    .toFile(out);
  console.log(`${kb(src)}K -> ${kb(out)}K  ${out}`);
}

const args = process.argv.slice(2);
const thumbs = args[0] === "--thumb";
for (const src of thumbs ? args.slice(1) : args) {
  await (thumbs ? thumbnail(src) : optimize(src));
}
