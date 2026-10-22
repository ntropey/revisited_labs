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

// Custom Dual-Tone SVG Icons
const ICONS = {
  hodoku: `<svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="40" height="40" rx="10" fill="#1E293B"/>
    <rect x="7" y="7" width="26" height="26" rx="4" stroke="#38BDF8" stroke-width="1.5" stroke-opacity="0.4"/>
    <line x1="15.5" y1="7" x2="15.5" y2="33" stroke="#38BDF8" stroke-width="1.5" stroke-opacity="0.4"/>
    <line x1="24.5" y1="7" x2="24.5" y2="33" stroke="#38BDF8" stroke-width="1.5" stroke-opacity="0.4"/>
    <line x1="7" y1="15.5" x2="33" y2="15.5" stroke="#38BDF8" stroke-width="1.5" stroke-opacity="0.4"/>
    <line x1="7" y1="24.5" x2="33" y2="24.5" stroke="#38BDF8" stroke-width="1.5" stroke-opacity="0.4"/>
    <rect x="16.5" y="16.5" width="7" height="7" rx="1.5" fill="#38BDF8"/>
    <circle cx="28.5" cy="11.5" r="2" fill="#818CF8"/>
    <circle cx="11.5" cy="28.5" r="2" fill="#818CF8"/>
  </svg>`,
  logisim: `<svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="40" height="40" rx="10" fill="#1E293B"/>
    <line x1="6" y1="14" x2="14" y2="14" stroke="#10B981" stroke-width="2" stroke-linecap="round"/>
    <line x1="6" y1="26" x2="14" y2="26" stroke="#10B981" stroke-width="2" stroke-linecap="round"/>
    <path d="M 14 10 L 22 10 C 28 10 32 14.5 32 20 C 32 25.5 28 30 22 30 L 14 30 Z" fill="rgba(16, 185, 129, 0.15)" stroke="#10B981" stroke-width="1.75" stroke-linejoin="round"/>
    <line x1="32" y1="20" x2="35" y2="20" stroke="#34D399" stroke-width="2" stroke-linecap="round"/>
    <circle cx="6" cy="14" r="2" fill="#34D399"/>
    <circle cx="6" cy="26" r="2" fill="#34D399"/>
    <circle cx="35" cy="20" r="2.5" fill="#F59E0B"/>
  </svg>`,
  kakuro: `<svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="40" height="40" rx="10" fill="#1E293B"/>
    <rect x="8" y="8" width="24" height="24" rx="4" fill="#0F172A" stroke="#818CF8" stroke-width="1.5" stroke-opacity="0.6"/>
    <line x1="8" y1="8" x2="32" y2="32" stroke="#818CF8" stroke-width="1.5" stroke-linecap="round"/>
    <text x="25" y="17" fill="#38BDF8" font-size="9" font-family="system-ui, sans-serif" font-weight="bold" text-anchor="middle">16</text>
    <text x="15" y="28" fill="#F472B6" font-size="9" font-family="system-ui, sans-serif" font-weight="bold" text-anchor="middle">4</text>
  </svg>`,
  nonogram: `<svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="40" height="40" rx="10" fill="#1E293B"/>
    <rect x="9" y="9" width="6" height="6" rx="1.5" fill="#FB7185"/>
    <rect x="17" y="9" width="6" height="6" rx="1.5" fill="#FB7185"/>
    <rect x="25" y="9" width="6" height="6" rx="1.5" fill="#FB7185"/>
    <rect x="9" y="17" width="6" height="6" rx="1.5" fill="none" stroke="#475569" stroke-width="1.2"/>
    <line x1="10.5" y1="18.5" x2="13.5" y2="21.5" stroke="#94A3B8" stroke-width="1.2" stroke-linecap="round"/>
    <line x1="13.5" y1="18.5" x2="10.5" y2="21.5" stroke="#94A3B8" stroke-width="1.2" stroke-linecap="round"/>
    <rect x="17" y="17" width="6" height="6" rx="1.5" fill="#FB7185"/>
    <rect x="25" y="17" width="6" height="6" rx="1.5" fill="#FB7185"/>
    <rect x="9" y="25" width="6" height="6" rx="1.5" fill="#FB7185"/>
    <rect x="17" y="25" width="6" height="6" rx="1.5" fill="#FB7185"/>
    <rect x="25" y="25" width="6" height="6" rx="1.5" fill="none" stroke="#475569" stroke-width="1.2"/>
    <line x1="26.5" y1="26.5" x2="29.5" y2="29.5" stroke="#94A3B8" stroke-width="1.2" stroke-linecap="round"/>
    <line x1="29.5" y1="26.5" x2="26.5" y2="29.5" stroke="#94A3B8" stroke-width="1.2" stroke-linecap="round"/>
  </svg>`,
  check: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>`
};

const TOOLS = [
  {
    name: 'Logisim Revisited',
    url: 'https://logisimrevisited.com',
    icon: ICONS.logisim,
    span: 'card-span-7',
    tag: 'Digital Logic Simulator & Circuit Coach',
    status: 'Flagship Tool',
    domain: 'logisimrevisited.com',
    desc: 'Modern web remaster of Carl Burch’s classic Logisim 2.7.1. Simulates 4-state multi-bit circuits, K-Maps, logic gates, flip-flops, and ALU schematics directly in your browser with zero Java installation required.',
    features: [
      '4-state multi-bit engine (0, 1, Floating Z, Error E)',
      'Backward signal root-cause prover & short-circuit diagnostics',
      'Quine-McCluskey minimal K-Map synthesis (SOP & POS)',
      'Complete Logisim 2.7.1 .circ XML import & export'
    ],
  },
  {
    name: 'Hodoku Revisited',
    url: 'https://hodokurevisited.com',
    icon: ICONS.hodoku,
    span: 'card-span-5',
    tag: 'Sudoku Solver & Socratic AI Coach',
    status: 'Flagship Tool',
    domain: 'hodokurevisited.com',
    desc: '100% faithful TypeScript port of Bernhard Hobiger’s legendary HoDoKu 2.2.0. Analyzes, rates, and teaches every step with a 4-stage Socratic Coach and contradiction prover.',
    features: [
      '70+ human solving techniques (Fish, Wings, Chains, ALS)',
      'Contradiction prover with minimal causal chains',
      'Daily Sudoku challenge with shareable result cards',
      'Offline-capable Progressive Web App'
    ],
  },
  {
    name: 'Kakuro Revisited',
    url: 'https://kakurorevisited.com',
    icon: ICONS.kakuro,
    span: 'card-span-6',
    tag: 'Cross-Sums & Sum Partitions',
    status: 'Puzzle Suite',
    domain: 'kakurorevisited.com',
    desc: 'Human-style Kakuro (Cross Sums) generator, solver, and trainer with complete sum-combination reference tables, magic blocks, and interactive step-by-step coaching.',
    features: [
      'Interactive Sum Combinations Cheat Sheet (sums 3 to 45)',
      'Unique sum partitions, cross-run intersections & bounds',
      'Sum-boundary contradiction proofs & forced placement',
      'Date-seeded Daily Kakuro challenge'
    ],
  },
  {
    name: 'Nonogram Revisited',
    url: 'https://nonogramrevisited.com',
    icon: ICONS.nonogram,
    span: 'card-span-6',
    tag: 'Picross & Griddlers Line-Logic',
    status: 'Puzzle Suite',
    domain: 'nonogramrevisited.com',
    desc: '100% deterministic Picross line-solver inspired by classic FreeNono. Features touch-friendly mobile grids, line overlap logic, and Socratic hint stepping.',
    features: [
      'FreeNono human line techniques (Overlap, Spaces, Glue, Mercury)',
      'Why not fill / Why not cross out? Contradiction prover',
      'Scales smoothly from 5×5 up to 30×30 boards',
      'Zero server tracking, offline-ready local compute'
    ],
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
    <div class="badge-tag">
      <span class="status-dot"></span>
      <span>Software Studio &middot; Open Source &middot; Zero Install</span>
    </div>
    <h1>Classic desktop software,<br>revisited for the modern web.</h1>
    <p class="lead">We take revered, abandoned desktop programs and rebuild them as fast, offline-capable progressive web apps powered by local symbolic AI coaches. No installs. No paywalls. 100% private.</p>
  </section>

  <section>
    <h2 class="section-title">The Revisited Suite</h2>
    <p class="section-desc">Four classic software engines modernized in TypeScript, running entirely inside your browser.</p>

    <div class="grid-bento">
      ${TOOLS.map(t => `
        <a href="${t.url}" class="card-tool ${t.span}" target="_blank" rel="noopener noreferrer">
          <div class="card-header-row">
            <div class="tool-icon-wrap">${t.icon}</div>
            <span class="live-pill">
              <span class="status-dot"></span>
              <span>${t.status}</span>
            </span>
          </div>
          <div class="tool-name">${t.name}</div>
          <div class="tool-tag">${t.tag}</div>
          <p class="tool-desc">${t.desc}</p>
          <ul class="tool-features">
            ${t.features.map(f => `<li>${ICONS.check} <span>${f}</span></li>`).join('')}
          </ul>
          <div class="tool-cta-row">
            <div class="tool-cta-btn">
              Launch application <span>&rarr;</span>
            </div>
            <span class="tool-ext-link">${t.domain}</span>
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
        <span class="pillar-icon">⚡</span>
        <h3>100% Client-Side Compute</h3>
        <p>No backend servers, no cloud queues, and zero downtime. Every solver, circuit simulator, and generator runs in high-performance Web Workers right on your device.</p>
      </div>
      <div class="pillar">
        <span class="pillar-icon">🧠</span>
        <h3>Local Symbolic AI</h3>
        <p>Instead of unpredictable LLMs, our AI coaches use deterministic symbolic constraint logic to provide 4-stage Socratic guidance and formal contradiction proofs.</p>
      </div>
      <div class="pillar">
        <span class="pillar-icon">🔒</span>
        <h3>Privacy-First by Design</h3>
        <p>Your circuits, puzzles, and game saves are stored in local storage on your device. We collect zero personal data, require no accounts, and never sell your telemetry.</p>
      </div>
      <div class="pillar">
        <span class="pillar-icon">📖</span>
        <h3>Preserving Open History</h3>
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
    <div class="badge-tag">
      <span class="status-dot"></span>
      <span>The Story</span>
    </div>
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
    <div class="badge-tag">
      <span class="status-dot"></span>
      <span>Transparency</span>
    </div>
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
