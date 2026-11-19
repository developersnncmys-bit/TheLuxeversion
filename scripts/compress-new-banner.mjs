// One-shot compressor for public/images/new-banner.
// PNG -> WebP (quality 82), MP4 -> smaller MP4 (CRF 24, slow). Overwrites
// originals (backup at .image-backup-new-banner-20261119/ at repo root).
//
// Run from repo root:  node scripts/compress-new-banner.mjs

import { promises as fs } from "node:fs";
import path from "node:path";
import { spawn } from "node:child_process";
import sharp from "sharp";

const DIR = "public/images/new-banner";

function fmt(bytes) {
  return (bytes / 1024 / 1024).toFixed(2) + " MB";
}

function runFfmpeg(args) {
  return new Promise((resolve, reject) => {
    const p = spawn("ffmpeg", args, { stdio: ["ignore", "ignore", "pipe"] });
    let stderr = "";
    p.stderr.on("data", (c) => (stderr += c.toString()));
    p.on("close", (code) =>
      code === 0 ? resolve() : reject(new Error(`ffmpeg exit ${code}: ${stderr.slice(-800)}`))
    );
  });
}

async function convertPng(file) {
  const inPath = path.join(DIR, file);
  const outPath = path.join(DIR, file.replace(/\.png$/i, ".webp"));
  const before = (await fs.stat(inPath)).size;

  await sharp(inPath)
    .webp({ quality: 82, effort: 6 })
    .toFile(outPath);

  const after = (await fs.stat(outPath)).size;
  await fs.unlink(inPath);
  console.log(
    `  PNG->WebP  ${file.padEnd(28)} ${fmt(before).padStart(9)} -> ${fmt(after).padStart(9)}  (-${Math.round((1 - after / before) * 100)}%)`
  );
  return { before, after };
}

async function compressMp4(file) {
  const inPath = path.join(DIR, file);
  const tmpPath = path.join(DIR, file + ".tmp.mp4");
  const before = (await fs.stat(inPath)).size;

  await runFfmpeg([
    "-y",
    "-i", inPath,
    "-c:v", "libx264",
    "-crf", "24",
    "-preset", "slow",
    "-pix_fmt", "yuv420p",
    "-movflags", "+faststart",
    "-c:a", "aac",
    "-b:a", "128k",
    tmpPath
  ]);

  const after = (await fs.stat(tmpPath)).size;
  // Only replace if we actually shrunk the file; if ffmpeg made it bigger,
  // the original was already well-compressed — keep the original.
  if (after < before) {
    await fs.rename(tmpPath, inPath);
    console.log(
      `  MP4        ${file.padEnd(28)} ${fmt(before).padStart(9)} -> ${fmt(after).padStart(9)}  (-${Math.round((1 - after / before) * 100)}%)`
    );
    return { before, after };
  } else {
    await fs.unlink(tmpPath);
    console.log(
      `  MP4        ${file.padEnd(28)} ${fmt(before).padStart(9)} -> (kept original, re-encode was larger)`
    );
    return { before, after: before };
  }
}

async function main() {
  const entries = await fs.readdir(DIR);
  const pngs = entries.filter((f) => f.toLowerCase().endsWith(".png"));
  const mp4s = entries.filter((f) => f.toLowerCase().endsWith(".mp4"));

  console.log(`\nPNG -> WebP (${pngs.length} files)`);
  let pngBefore = 0, pngAfter = 0;
  for (const f of pngs) {
    const r = await convertPng(f);
    pngBefore += r.before;
    pngAfter += r.after;
  }

  console.log(`\nMP4 compression (${mp4s.length} files)`);
  let mp4Before = 0, mp4After = 0;
  for (const f of mp4s) {
    const r = await compressMp4(f);
    mp4Before += r.before;
    mp4After += r.after;
  }

  const totalBefore = pngBefore + mp4Before;
  const totalAfter = pngAfter + mp4After;
  console.log("\n== TOTALS ==");
  console.log(`  PNGs:  ${fmt(pngBefore)} -> ${fmt(pngAfter)} (-${Math.round((1 - pngAfter / pngBefore) * 100)}%)`);
  console.log(`  MP4s:  ${fmt(mp4Before)} -> ${fmt(mp4After)} (-${Math.round((1 - mp4After / mp4Before) * 100)}%)`);
  console.log(`  All :  ${fmt(totalBefore)} -> ${fmt(totalAfter)} (-${Math.round((1 - totalAfter / totalBefore) * 100)}%)`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
