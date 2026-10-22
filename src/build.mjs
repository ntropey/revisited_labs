/**
 * Revisited Labs static site generator.
 * Zero-dependency build script that outputs the complete portal to dist/.
 */
import { existsSync, mkdirSync, readFileSync, readdirSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');
const out = join(root, 'dist');

if (!existsSync(out)) mkdirSync(out, { recursive: true });

// Copy public assets
const publicDir = join(root, 'public');
for (const file of readdirSync(publicDir)) {
  writeFileSync(join(out, file), readFileSync(join(publicDir, file)));
}

// Copy CNAME
const cnamePath = join(root, 'CNAME');
if (existsSync(cnamePath)) {
  writeFileSync(join(out, 'CNAME'), readFileSync(cnamePath));
}

const TOOLS = [
  {
    name: 'Hodoku Revisited',
    url: 'https://hodokurevisited.com',
    icon: '🧩',
    tag: 'Sudoku Solver & AI Coach',
    desc: 'Faithful TypeScript port of Bernhard Hobiger’s legendary HoDoKu 2.2.0 solver, generator, and analyzer with a 4-stage Socratic AI Coach and contradiction prover.',
    features: ['70+ human solving techniques', 'Zero Java runtime required', 'Daily Sudoku challenge', 'Offline-capable PWA'],
  },
  {
    name: 'Logisim Revisited',
    url: 'https://logisimrevisited.com',
    icon: '⚡',
    tag: 'Digital Logic Simulator',
    desc: 'Modern web remaster of Carl Burch’s classic Logisim 2.7.1. Simulates 4-state multi-bit circuits, K-Maps, logic gates, flip-flops, and ALU schematics in your browser.',
    features: ['4-state multi-bit engine (0/1/Z/E)', 'Backward signal root-cause prover', 'Quine-McCluskey K-Map synthesis', '.circ file import & export'],
  },
  {
    name: 'Kakuro Revisited',
    url: 'https://kakurorevisited.com',
    icon: '🔢',
    tag: 'Cross-Sums & Sum Partitions',
    desc: 'Human-style Kakuro (Cross Sums) generator, solver, and trainer with complete sum-combination reference tables and interactive step-by-step coaching.',
    features: ['Magic block sum partitions', 'Interactive combinations cheat sheet', 'Sum-boundary contradiction proofs', 'Daily Kakuro puzzle'],
  },
  {
    name: 'Nonogram Revisited',
    url: 'https://nonogramrevisited.com',
    icon: '⬛',
    tag: 'Picross & Griddlers Trainer',
    desc: '100% deterministic Picross line-solver inspired by FreeNono. Features touch-friendly mobile grids, line overlap logic, and Socratic hint stepping.',
    features: ['FreeNono human line techniques', 'Why not fill / Why not cross out?', '5×5 up to 30×30 boards', 'Zero-tracking & offline ready'],
  },
];

function shell({ title, description, path, active, body }) {
  const canonical = `https://revisitedlabs.com${path === '/' ? '/' : path}`;
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${title} | Revisited Labs</title>
<meta name="description" content="${description}">
<meta property="og:type" content="website">
<meta property="og:site_name" content="Revisited Labs">
<meta property="og:title" content="${title} | Revisited Labs">
<meta property="og:description" content="${description}">
<meta property="og:url" content="${canonical}">
<meta property="og:image" content="https://revisitedlabs.com/favicon.svg">
<meta name="twitter:card" content="summary">
<link rel="canonical" href="${canonical}">
<link rel="icon" href="/favicon.svg" type="image/svg+xml">
<link rel="stylesheet" href="/site.css">
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Revisited Labs",
  "url": "https://revisitedlabs.com",
  "logo": "https://revisitedlabs.com/favicon.svg",
  "description": "Modern remasters of classic desktop software. Zero install, privacy-first, powered by local symbolic AI.",
  "sameAs": [
    "https://github.com/ntropey"
  ]
}
</script>
</head>
<body>
<header class="site-header">
  <a href="/" class="brand">
    <img src="/favicon.svg" width="32" height="32" alt="Revisited Labs Logo">
    <span>Revisited Labs</span>
  </a>
  <nav class="main-nav">
    <a href="/" ${active === 'home' ? 'class="active"' : ''}>Suite</a>
    <a href="/about.html" ${active === 'about' ? 'class="active"' : ''}>About</a>
    <a href="/privacy.html" ${active === 'privacy' ? 'class="active"' : ''}>Privacy</a>
    <a href="https://github.com/ntropey" target="_blank" rel="noopener noreferrer">GitHub</a>
  </nav>
</header>

<main class="container">
${body}
</main>

<footer class="site-footer">
  <div class="footer-top">
    <p><strong>Revisited Labs</strong> &middot; Open-source remasters of classic desktop software under the GPL-3.0 license.</p>
    <div class="footer-links">
      <a href="https://hodokurevisited.com">Hodoku Revisited</a>
      <a href="https://logisimrevisited.com">Logisim Revisited</a>
      <a href="https://kakurorevisited.com">Kakuro Revisited</a>
      <a href="https://nonogramrevisited.com">Nonogram Revisited</a>
    </div>
  </div>
  <div class="footer-bottom">
    <p>&copy; ${new Date().getFullYear()} Revisited Labs &middot; Built with zero server tracking and 100% client-side compute &middot; <a href="/privacy.html">Privacy Policy</a> &middot; <a href="https://github.com/ntropey">Source Code</a></p>
  </div>
</footer>
</body>
</html>
`;
}

// 1. Home Page
const homeHtml = shell({
  title: 'Modern Remasters of Classic Desktop Software',
  description: 'Revisited Labs modernizes beloved classic desktop tools (HoDoKu, Logisim, Kakuro, Nonograms) into zero-install web apps with local symbolic AI coaches.',
  path: '/',
  active: 'home',
  body: `
  <section class="hero">
    <span class="badge-tag">Studio &middot; Open Source &middot; Zero Install</span>
    <h1>Classic desktop software,<br>revisited for the modern web.</h1>
    <p class="lead">We take revered, abandoned desktop programs and rebuild them as fast, offline-capable progressive web apps powered by local symbolic AI coaches. No installs. No paywalls. 100% private.</p>
  </section>

  <section>
    <h2 class="section-title">The Revisited Suite</h2>
    <p class="section-desc">Four classic software engines modernized in TypeScript, running entirely inside your browser.</p>

    <div class="grid-suite">
      ${TOOLS.map(t => `
        <a href="${t.url}" class="card-tool" target="_blank" rel="noopener noreferrer">
          <span class="tool-icon">${t.icon}</span>
          <div class="tool-name">
            <span>${t.name}</span>
            <span class="tool-tag">${t.tag}</span>
          </div>
          <p class="tool-desc">${t.desc}</p>
          <ul class="tool-features">
            ${t.features.map(f => `<li>${f}</li>`).join('')}
          </ul>
          <div class="tool-cta">
            Launch app <span>&rarr;</span>
          </div>
        </a>
      `).join('')}
    </div>
  </section>

  <section>
    <h2 class="section-title">Why Revisited?</h2>
    <p class="section-desc">Our core engineering principles and architectural commitments.</p>

    <div class="pillars">
      <div class="pillar">
        <h3>⚡ 100% Client-Side Compute</h3>
        <p>No backend servers, no cloud queues, and zero downtime. Every solver, circuit simulator, and generator runs in high-performance Web Workers right on your device.</p>
      </div>
      <div class="pillar">
        <h3>🧠 Local Symbolic AI</h3>
        <p>Instead of unpredictable LLMs, our AI coaches use deterministic symbolic constraint logic to provide 4-stage Socratic guidance and formal contradiction proofs.</p>
      </div>
      <div class="pillar">
        <h3>🔒 Privacy-First by Design</h3>
        <p>Your circuits, puzzles, and game saves are stored in local storage on your device. We collect zero personal data, require no accounts, and never sell your telemetry.</p>
      </div>
      <div class="pillar">
        <h3>📖 Preserving Open History</h3>
        <p>We honor the original creators by keeping all engine ports strictly open source under the GPL-3.0 license with full technique guides, manuals, and worked examples.</p>
      </div>
    </div>
  </section>
  `,
});
writeFileSync(join(out, 'index.html'), homeHtml);

// 2. About Page
const aboutHtml = shell({
  title: 'About the Studio & Philosophy',
  description: 'The story behind Revisited Labs: why we rescue classic Java and desktop software and how we build zero-install web tools.',
  path: '/about.html',
  active: 'about',
  body: `
  <section class="hero" style="margin-bottom:3rem">
    <span class="badge-tag">The Story</span>
    <h1>Rescuing the golden age<br>of desktop software.</h1>
  </section>

  <div style="max-width:760px;margin:0 auto;line-height:1.75;font-size:1.1rem;display:flex;flex-direction:column;gap:1.5rem">
    <p>Between 2000 and 2015, independent developers and computer science researchers created some of the most algorithmically brilliant software in history: Bernhard Hobiger's <strong>HoDoKu</strong>, Carl Burch's <strong>Logisim</strong>, and dozens of meticulous logic engines.</p>

    <p>As the web moved forward and mobile devices took over, those tools became trapped inside legacy Java <code>.jar</code> files. Modern macOS blocks unsigned executables, iPads and Chromebooks cannot run Java desktop apps, and HiDPI screens break old Swing interfaces.</p>

    <p><strong>Revisited Labs</strong> was born to solve that problem. We rescue these masterpieces, modernize them with clean TypeScript and modern Web Standards, and enhance them with <strong>Symbolic AI Coaches</strong> that help students, puzzle lovers, and engineers understand <em>why</em> a move works.</p>

    <h2 style="font-family:var(--font-serif);font-size:1.75rem;margin-top:1.5rem">Our Open Source Commitment</h2>
    <p>Every tool in our suite is free and open-source under the GNU General Public License (GPL-3.0). We believe essential educational tools should never be locked behind subscriptions or restrictive accounts.</p>

    <p><a href="/" style="color:var(--accent);font-weight:600">&larr; Return to Suite Overview</a></p>
  </div>
  `,
});
writeFileSync(join(out, 'about.html'), aboutHtml);

// 3. Privacy Page
const privacyHtml = shell({
  title: 'Privacy Policy',
  description: 'Revisited Labs privacy policy: 100% client-side compute, no personal tracking, and complete user control.',
  path: '/privacy.html',
  active: 'privacy',
  body: `
  <section class="hero" style="margin-bottom:3rem">
    <span class="badge-tag">Transparency</span>
    <h1>Your device. Your data.<br>Zero server tracking.</h1>
  </section>

  <div style="max-width:760px;margin:0 auto;line-height:1.75;font-size:1.1rem;display:flex;flex-direction:column;gap:1.5rem">
    <p>At <strong>Revisited Labs</strong>, we build client-side software that respects your privacy by default.</p>

    <h2 style="font-family:var(--font-serif);font-size:1.5rem;margin-top:1rem">1. No User Accounts & No Passwords</h2>
    <p>We do not collect names, email addresses, or phone numbers. You never need an account to use any tool in the Revisited Suite.</p>

    <h2 style="font-family:var(--font-serif);font-size:1.5rem;margin-top:1rem">2. Local Storage Only</h2>
    <p>Your games, settings, circuits, and progress are stored entirely inside your browser's <code>localStorage</code> on your local device. We have no servers recording your circuit designs or puzzle solutions.</p>

    <h2 style="font-family:var(--font-serif);font-size:1.5rem;margin-top:1rem">3. Advertising & Cookies</h2>
    <p>Some of our companion tools show non-intrusive ads via Google AdSense to offset domain and development costs. We support Google Consent Mode v2 and comply with regional privacy laws (GDPR, UK-GDPR, CCPA). You can review or revoke your cookie choices at any time via the "Cookie settings" button on each site.</p>

    <p><a href="/" style="color:var(--accent);font-weight:600">&larr; Return to Suite Overview</a></p>
  </div>
  `,
});
writeFileSync(join(out, 'privacy.html'), privacyHtml);

// 4. Sitemap.xml & Robots.txt
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url><loc>https://revisitedlabs.com/</loc></url>
  <url><loc>https://revisitedlabs.com/about.html</loc></url>
  <url><loc>https://revisitedlabs.com/privacy.html</loc></url>
</urlset>
`;
writeFileSync(join(out, 'sitemap.xml'), sitemap);

const robots = `User-agent: *
Allow: /
Sitemap: https://revisitedlabs.com/sitemap.xml
`;
writeFileSync(join(out, 'robots.txt'), robots);

console.log('Revisited Labs site successfully built to dist/!');
