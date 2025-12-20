#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const imageHashModule = require('image-hash');
const imageHash = typeof imageHashModule === 'function' ? imageHashModule : (imageHashModule && (imageHashModule.imageHash || imageHashModule)) ;

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
      if (['.png', '.jpg', '.jpeg', '.webp', '.gif'].includes(ext)) results.push(p);
    }
  }
  return results;
}

function hashFile(file) {
  return new Promise((resolve, reject) => {
    if (typeof imageHash !== 'function') return reject(new Error('imageHash is not a function; check the image-hash package export'));
    imageHash(file, 16, true, (err, data) => {
      if (err) return reject(err);
      resolve(data);
    });
  });
}

function hamming(a, b) {
  const A = BigInt('0x' + a);
  const B = BigInt('0x' + b);
  const x = A ^ B;
  let dist = 0n;
  let v = x;
  while (v) {
    dist += v & 1n;
    v >>= 1n;
  }
  return Number(dist);
}

async function main() {
  const args = process.argv.slice(2);
  const doDelete = args.includes('--delete');
  const files = walk(baseDir);
  console.log('Found', files.length, 'image files to analyze');
  const entries = [];
  for (const f of files) {
    try {
      const h = await hashFile(f);
      entries.push({ file: f, hash: String(h) });
    } catch (e) {
      console.warn('Failed to hash', f, e.message || e);
    }
  }

  const groups = [];
  const used = new Set();
  const threshold = 8; // hamming distance
  for (let i = 0; i < entries.length; i++) {
    if (used.has(entries[i].file)) continue;
    const group = [entries[i]];
    for (let j = i+1; j < entries.length; j++) {
      if (used.has(entries[j].file)) continue;
      const dist = hamming(entries[i].hash, entries[j].hash);
      if (dist <= threshold) {
        group.push(entries[j]);
        used.add(entries[j].file);
      }
    }
    groups.push(group);
  }

  const duplicates = groups.filter(g => g.length > 1);
  console.log('Found', duplicates.length, 'groups of similar images');
  const date = new Date().toISOString().slice(0,10);
  const report = { date, baseDir, threshold, groups: [] };
  for (const g of duplicates) {
    const keeper = g[0];
    const others = g.slice(1);
    report.groups.push({ keeper: keeper.file, duplicates: others.map(o => o.file) });
    console.log('Group: keeper=', keeper.file);
    for (const d of others) console.log('  duplicate=', d.file);
  }

  const outDir = path.join(__dirname, 'output');
  fs.mkdirSync(outDir, { recursive: true });
  const outFile = path.join(outDir, `duplicates-${date}.json`);
  fs.writeFileSync(outFile, JSON.stringify(report, null, 2));
  console.log('Wrote report to', outFile);

  if (doDelete && duplicates.length > 0) {
    const archiveDir = path.join(archiveRoot, `duplicates-${date}`);
    fs.mkdirSync(archiveDir, { recursive: true });
    for (const g of duplicates) {
      const keep = g[0].file;
      for (let k = 1; k < g.length; k++) {
        const src = g[k].file;
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

main().catch((err) => { console.error(err); process.exit(1); });
