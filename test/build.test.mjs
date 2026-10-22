import test from 'node:test';
import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { execSync } from 'node:child_process';

const dist = join(process.cwd(), 'dist');

// Ensure build runs before assertions
test.before(() => {
  execSync('node src/build.mjs');
});

test('build outputs all pages and CNAME', () => {
  assert.ok(existsSync(join(dist, 'index.html')), 'index.html exists');
  assert.ok(existsSync(join(dist, 'about.html')), 'about.html exists');
  assert.ok(existsSync(join(dist, 'privacy.html')), 'privacy.html exists');
  assert.ok(existsSync(join(dist, 'sitemap.xml')), 'sitemap.xml exists');
  assert.ok(existsSync(join(dist, 'robots.txt')), 'robots.txt exists');
  assert.ok(existsSync(join(dist, 'CNAME')), 'CNAME exists');
  assert.equal(readFileSync(join(dist, 'CNAME'), 'utf8').trim(), 'revisitedlabs.com');
});

test('index.html links to all four revisited tools', () => {
  const index = readFileSync(join(dist, 'index.html'), 'utf8');
  assert.ok(index.includes('https://hodokurevisited.com'), 'links to hodoku');
  assert.ok(index.includes('https://logisimrevisited.com'), 'links to logisim');
  assert.ok(index.includes('https://kakurorevisited.com'), 'links to kakuro');
  assert.ok(index.includes('https://nonogramrevisited.com'), 'links to nonogram');
});
