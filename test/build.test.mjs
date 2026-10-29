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
  assert.ok(existsSync(join(dist, 'dolce-colore.html')), 'dolce-colore.html exists');
  assert.ok(existsSync(join(dist, 'dolce-colore', 'index.html')), 'dolce-colore/index.html exists');
  assert.ok(existsSync(join(dist, 'sitemap.xml')), 'sitemap.xml exists');
  assert.ok(existsSync(join(dist, 'robots.txt')), 'robots.txt exists');
  assert.ok(existsSync(join(dist, 'CNAME')), 'CNAME exists');
  assert.equal(readFileSync(join(dist, 'CNAME'), 'utf8').trim(), 'revisitedlabs.com');
});

test('index.html links to all revisited tools including dolce-colore', () => {
  const index = readFileSync(join(dist, 'index.html'), 'utf8');
  assert.ok(index.includes('https://dolcecolore.com/'), 'links to dolcecolore.com');
  assert.ok(index.includes('https://hodokurevisited.com'), 'links to hodoku');
  assert.ok(index.includes('https://logisimrevisited.com'), 'links to logisim');
  assert.ok(index.includes('https://kakurorevisited.com'), 'links to kakuro');
  assert.ok(index.includes('https://nonogramrevisited.com'), 'links to nonogram');
});

test('dolce-colore page satisfies merchant compliance requirements', () => {
  const dolce = readFileSync(join(dist, 'dolce-colore.html'), 'utf8');
  assert.ok(dolce.includes('$39'), 'contains $39 price point');
  assert.ok(dolce.includes('support@revisitedlabs.com'), 'contains support email');
  assert.ok(dolce.includes('What is your refund policy?'), 'states a refund policy');
  assert.ok(dolce.includes('all sales are final'), 'refund policy says sales are final');
  assert.ok(!/money-back/i.test(dolce), 'no money-back claim');
  assert.ok(dolce.includes('DirectML'), 'contains DirectML specs');
  assert.ok(!dolce.includes('ai-colorer/releases'), 'no free download link to GitHub releases');
  assert.ok(dolce.includes('https://dolcecolore.com/download/windows'), 'links the Windows free download');
  assert.ok(dolce.includes('https://dolcecolore.com/download/windows-portable'), 'links the Windows portable download');
  assert.ok(dolce.includes('https://dolcecolore.com/download/macos'), 'links the macOS free download');
});

test('every page has a skip link, a labeled main nav and a main landmark', () => {
  for (const file of ['index.html', 'about.html', 'privacy.html', 'dolce-colore.html']) {
    const html = readFileSync(join(dist, file), 'utf8');
    assert.ok(html.includes('<a class="skip" href="#main">'), `${file} has a skip link`);
    assert.ok(html.includes('<main id="main"'), `${file} main is the skip target`);
    assert.ok(html.includes('<nav class="main-nav" aria-label="Main">'), `${file} nav is labeled`);
  }
  const about = readFileSync(join(dist, 'about.html'), 'utf8');
  assert.ok(about.includes('class="active" aria-current="page"'), 'current page is marked');
});

test('dolce-colore-latest.json is published and readable by the app', () => {
  const manifest = JSON.parse(readFileSync(join(dist, 'dolce-colore-latest.json'), 'utf8'));
  assert.match(manifest.version, /^\d+\.\d+\.\d+$/, 'version is x.y.z');
  const url = new URL(manifest.download_url);
  assert.equal(url.protocol, 'https:');
  assert.ok(/(^|\.)(revisitedlabs\.com|dolcecolore\.com|lemonsqueezy\.com)$/.test(url.hostname), 'download host is allowed by the app');
});

test('index.html copy no longer claims zero paywalls and lists the whole suite', () => {
  const index = readFileSync(join(dist, 'index.html'), 'utf8');
  assert.ok(!index.includes('No paywalls'), 'drops the "No paywalls" claim');
  assert.ok(index.includes('Dolce Colore'), 'names Dolce Colore in the suite copy');
  assert.ok(!index.includes('Four classic software engines'), 'drops the four-engine phrasing');
});

test('index.html ships hub social metadata and WebSite schema', () => {
  const index = readFileSync(join(dist, 'index.html'), 'utf8');
  assert.ok(index.includes('social-hub.png'), 'home page shares the hub image');
  assert.ok(index.includes('"@type":"WebSite"'), 'home page has WebSite JSON-LD');
  assert.ok(index.includes('"@type":"ItemList"'), 'home page lists the suite products');
});

test('dolce-colore page ships product and FAQ structured data', () => {
  const dolce = readFileSync(join(dist, 'dolce-colore.html'), 'utf8');
  assert.ok(dolce.includes('"@type":"Product"'), 'has Product JSON-LD');
  assert.ok(dolce.includes('"price":"39"'), 'Product offer price is 39');
  assert.ok(dolce.includes('"@type":"FAQPage"'), 'has FAQPage JSON-LD');
});
