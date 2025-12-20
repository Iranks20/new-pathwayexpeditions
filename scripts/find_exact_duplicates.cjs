#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const baseDir = path.resolve(__dirname, '..', 'attached_assets', 'generated_images');
const archiveRoot = path.resolve(__dirname, '..', 'attached_assets', 'archive');

function walk(dir) {
  const results = [];
  const items = fs.readdirSync(dir, { withFileTypes: true });
  for (const it of items) {
    const p = path.join(dir, it.name);
    if (it.isDirectory()) {
      if (p.includes(path.join('attached_assets','archive'))) continue;
      results.push(...walk(p));
    } else {
      const ext = path.extname(it.name).toLowerCase();
      if (['.png', '.jpg', '.jpeg', '.webp', '.gif', '.mp4', '.webm'].includes(ext)) results.push(p);
    }
  }
  return results;
}

function sha1(file) {
  const s = fs.readFileSync(file);
  return crypto.createHash('sha1').update(s).digest('hex');
}

function main() {
  const args = process.argv.slice(2);
  const doDelete = args.includes('--delete');
  const files = walk(baseDir);
  console.log('Found', files.length, 'files');
  const map = new Map();
  for (const f of files) {
    try {
      const h = sha1(f);
      if (!map.has(h)) map.set(h, []);
      map.get(h).push(f);
    } catch (e) {
      console.warn('Failed to hash', f, e.message || e);
    }
  }

  const duplicates = [];
  for (const [h, arr] of map.entries()) {
    if (arr.length > 1) duplicates.push(arr);
  }

  console.log('Found', duplicates.length, 'groups of exact duplicates');
  const date = new Date().toISOString().slice(0,10);
  const report = { date, baseDir, groups: duplicates.map(g => ({ keeper: g[0], duplicates: g.slice(1) })) };
  const outDir = path.join(__dirname, 'output');
  fs.mkdirSync(outDir, { recursive: true });
  const outFile = path.join(outDir, `exact-duplicates-${date}.json`);
  fs.writeFileSync(outFile, JSON.stringify(report, null, 2));
  console.log('Wrote report to', outFile);

  if (doDelete && duplicates.length > 0) {
    const archiveDir = path.join(archiveRoot, `exact-duplicates-${date}`);
    fs.mkdirSync(archiveDir, { recursive: true });
    for (const g of duplicates) {
      const keep = g[0];
      for (let i = 1; i < g.length; i++) {
        const src = g[i];
        const rel = path.relative(path.join(__dirname, '..', 'attached_assets'), src);
        const dest = path.join(archiveDir, rel);
        fs.mkdirSync(path.dirname(dest), { recursive: true });
        fs.renameSync(src, dest);
        console.log('Moved', src, '->', dest);
      }
    }
    console.log('Moved duplicates to', archiveDir);
  } else if (doDelete) {
    console.log('No duplicates to move');
  } else {
    console.log('Dry run complete. Re-run with --delete to move duplicates to attached_assets/archive');
  }
}

main();
