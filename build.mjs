import { readFileSync, writeFileSync, readdirSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const docsDir = join(here, 'docs');
const template = readFileSync(join(here, 'template.html'), 'utf8');

const MAP = {
  'proposals-basic':         'proposal-basic.md',
  'proposals-professional':  'proposal-professional.md',
  'proposals-enterprise':    'proposal-enterprise.md',
  'prds-basic':              'prd-basic.md',
  'prds-professional':       'prd-professional.md',
  'prds-enterprise':         'prd-enterprise.md',
  'srs-basic':               'srs-basic.md',
  'srs-professional':        'srs-professional.md',
  'srs-enterprise':          'srs-enterprise.md',
  'maintenance-basic':       'maintenance-basic.md',
  'maintenance-professional':'maintenance-professional.md',
  'maintenance-enterprise':  'maintenance-enterprise.md',
};

const data = {};
let missing = 0;
for (const [key, file] of Object.entries(MAP)) {
  const path = join(docsDir, file);
  if (existsSync(path)) {
    data[key] = readFileSync(path, 'utf8');
    console.log(`✓ ${key.padEnd(28)} ${file} (${data[key].length} chars)`);
  } else {
    data[key] = `# Document Pending\n\nThe \`${file}\` document has not yet been generated.\n\nRun the doc-generation pipeline and rebuild.`;
    missing++;
    console.log(`✗ ${key.padEnd(28)} ${file} MISSING`);
  }
}

const json = JSON.stringify(data).replace(/<\/script>/g, '<\\/script>');
const out = template.replace('__DOCS_DATA__', json);
writeFileSync(join(here, 'index.html'), out, 'utf8');

const sizeKB = (out.length / 1024).toFixed(1);
console.log(`\n→ Wrote index.html  ·  ${sizeKB} KB  ·  ${Object.keys(MAP).length - missing}/${Object.keys(MAP).length} docs embedded`);
