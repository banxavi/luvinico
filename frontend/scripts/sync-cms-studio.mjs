import { cpSync, existsSync, mkdirSync, rmSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const frontendDir = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const cmsDir = path.join(frontendDir, '..', 'cms');
const vendorDir = path.join(frontendDir, 'src', 'sanity', '_cms');

const copies = [
  { from: path.join(cmsDir, 'schemaTypes'), to: path.join(vendorDir, 'schemaTypes') },
  {
    from: path.join(cmsDir, 'components', 'ProductMenuSelect.jsx'),
    to: path.join(vendorDir, 'components', 'ProductMenuSelect.jsx'),
  },
];

if (!existsSync(cmsDir)) {
  console.error('[sync-cms-studio] Missing cms package at', cmsDir);
  process.exit(1);
}

if (existsSync(vendorDir)) {
  rmSync(vendorDir, { recursive: true, force: true });
}

for (const { from, to } of copies) {
  mkdirSync(path.dirname(to), { recursive: true });
  cpSync(from, to, { recursive: true });
}

console.info('[sync-cms-studio] Synced CMS studio files to src/sanity/_cms');
