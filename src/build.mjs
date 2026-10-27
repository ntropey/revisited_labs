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
  dolce: `<svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="40" height="40" rx="10" fill="#1E293B"/>
    <path d="M12 13C12 11.3431 13.3431 10 15 10H25C26.6569 10 28 11.3431 28 13V27C28 28.6569 26.6569 30 25 30H15C13.3431 30 12 28.6569 12 27V13Z" stroke="#F59E0B" stroke-width="1.75"/>
    <circle cx="20" cy="20" r="5" stroke="#38BDF8" stroke-width="1.75"/>
    <circle cx="16" cy="15" r="1.5" fill="#EC4899"/>
    <circle cx="24" cy="25" r="1.5" fill="#10B981"/>
  </svg>`,
  check: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>`
};

const TOOLS = [
  {
    name: 'Dolce Colore',
    url: 'https://dolcecolore.com/',
    icon: ICONS.dolce,
    span: 'card-span-12',
    tag: '1-Click Historical Photo & Video AI Colorizer',
    status: 'Native AI Desktop Suite',
    domain: 'dolcecolore.com',
    cta: 'Explore Dolce Colore',
    desc: 'Native desktop neural restoration suite for Windows and macOS. Re-animates monochrome family photos and historical footage with local DDColor AI, DirectML GPU acceleration, and CIE L*a*b* micro-sharpness preservation. Private and local.',
    features: [
      '100% offline local neural inference (DirectML GPU, Apple Silicon MPS & CPU)',
      'CIE L*a*b* color space separation: zero lost sharpness or altered grain',
      'Cinema Video Colorizer with 60 FPS temporal smoothing & frame interpolation',
      'Single-file Windows .exe installer and native macOS .dmg package'
    ],
  },
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

function shell({ title, description, path, active, image, imageAlt, schema = [], canonical: canonicalOverride, body }) {
  const canonical = canonicalOverride || `https://revisitedlabs.com${path === '/' ? '/' : path}`;
  const ogImg = image || 'https://revisitedlabs.com/social-hub.png';
  const ogAlt = imageAlt || 'Revisited Labs software suite';
  const esc = (value) => String(value).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;');
  const extraSchema = schema
    .map((obj) => `<script type="application/ld+json">
${JSON.stringify(obj).replace(/</g, '\\u003c')}
</script>`)
    .join('\n');
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(title)} | Revisited Labs</title>
<meta name="description" content="${esc(description)}">
<meta property="og:type" content="website">
<meta property="og:site_name" content="Revisited Labs">
<meta property="og:title" content="${esc(title)} | Revisited Labs">
<meta property="og:description" content="${esc(description)}">
<meta property="og:url" content="${canonical}">
<meta property="og:image" content="${ogImg}">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta property="og:image:alt" content="${esc(ogAlt)}">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${esc(title)} | Revisited Labs">
<meta name="twitter:description" content="${esc(description)}">
<meta name="twitter:image" content="${ogImg}">
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
  "description": "Modern remasters of classic desktop software: four free browser apps and one native desktop studio, built to run locally.",
  "sameAs": [
    "https://github.com/ntropey"
  ]
}
</script>
${extraSchema}
</head>
<body>
<a class="skip" href="#main">Skip to content</a>
<header class="site-header">
  <a href="/" class="brand">
    <img src="/favicon.svg" width="32" height="32" alt="">
    <span>Revisited Labs</span>
  </a>
  <nav class="main-nav" aria-label="Main">
    <a href="/" ${active === 'home' ? 'class="active" aria-current="page"' : ''}>Suite</a>
    <a href="https://dolcecolore.com/" target="_blank" rel="noopener noreferrer">Dolce Colore</a>
    <a href="https://revisitedlabs.lemonsqueezy.com/" target="_blank" rel="noopener noreferrer">Store</a>
    <a href="/about" ${active === 'about' ? 'class="active" aria-current="page"' : ''}>About</a>
    <a href="/privacy" ${active === 'privacy' ? 'class="active" aria-current="page"' : ''}>Privacy</a>
    <a href="https://github.com/ntropey" target="_blank" rel="noopener noreferrer">GitHub</a>
  </nav>
</header>

<main id="main" class="container">
${body}
</main>

<footer class="site-footer">
  <div class="footer-top">
    <p><strong>Revisited Labs</strong> &middot; Remasters of classic desktop software. Four browser apps are GPL-3.0; Dolce Colore is a commercial desktop app.</p>
    <div class="footer-links">
      <a href="https://dolcecolore.com/" target="_blank" rel="noopener noreferrer">Dolce Colore Pro</a>
      <a href="https://revisitedlabs.lemonsqueezy.com/" target="_blank" rel="noopener noreferrer">LemonSqueezy Store</a>
      <a href="https://hodokurevisited.com">Hodoku Revisited</a>
      <a href="https://logisimrevisited.com">Logisim Revisited</a>
      <a href="https://kakurorevisited.com">Kakuro Revisited</a>
      <a href="https://nonogramrevisited.com">Nonogram Revisited</a>
    </div>
  </div>
  <div class="footer-bottom">
    <p>&copy; ${new Date().getFullYear()} Revisited Labs &middot; Built with zero server tracking and 100% client-side compute &middot; <a href="/privacy">Privacy Policy</a> &middot; <a href="https://github.com/ntropey">Source Code</a></p>
  </div>
</footer>
</body>
</html>
`;
}

// 1. Home Page
const homeHtml = shell({
  title: 'Classic Desktop Software, Remastered',
  description: 'Revisited Labs rebuilds classic desktop tools (HoDoKu, Logisim, Kakuro, Nonogram) as free web apps, plus Dolce Colore, a private local AI colorizer.',
  path: '/',
  active: 'home',
  image: 'https://revisitedlabs.com/social-hub.png',
  schema: [
    {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: 'Revisited Labs',
      url: 'https://revisitedlabs.com',
      description: 'Revisited Labs rebuilds classic desktop tools as free web apps, plus Dolce Colore, a private local AI colorizer.',
      inLanguage: 'en',
    },
    {
      '@context': 'https://schema.org',
      '@type': 'ItemList',
      name: 'Revisited Labs software suite',
      itemListElement: [
        { '@type': 'ListItem', position: 1, url: 'https://dolcecolore.com/' },
        { '@type': 'ListItem', position: 2, url: 'https://logisimrevisited.com' },
        { '@type': 'ListItem', position: 3, url: 'https://hodokurevisited.com' },
        { '@type': 'ListItem', position: 4, url: 'https://kakurorevisited.com' },
        { '@type': 'ListItem', position: 5, url: 'https://nonogramrevisited.com' },
      ],
    },
  ],
  body: `
  <section class="hero">
    <div class="badge-tag">
      <span class="status-dot"></span>
      <span>Classic Software &middot; Local AI &middot; Private</span>
    </div>
    <h1>Classic desktop software,<br>revisited for the modern web.</h1>
    <p class="lead">We take revered, abandoned desktop programs and rebuild them as fast, offline-capable apps powered by local symbolic AI coaches. Four free browser apps and one native desktop studio. No cloud, no telemetry.</p>
  </section>

  <section>
    <h2 class="section-title">The Revisited Suite</h2>
    <p class="section-desc">Four browser remasters plus a native desktop colorizer, built to run locally.</p>

    <div class="grid-bento">
      ${TOOLS.map(t => `
        <a href="${t.url}" class="card-tool ${t.span}" ${t.target ? `target="${t.target}"` : 'target="_blank" rel="noopener noreferrer"'}>
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
              ${t.cta || 'Launch application'} <span>&rarr;</span>
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
  path: '/about',
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
    <p>All four browser apps in our suite are free and open-source under the GNU General Public License (GPL-3.0). Dolce Colore is a separate commercial desktop product sold under its own license. We believe essential educational tools should never be locked behind subscriptions or restrictive accounts.</p>

    <p><a href="/" style="color:var(--accent);font-weight:600">&larr; Return to Suite Overview</a></p>
  </div>
  `,
});
writeFileSync(join(out, 'about.html'), aboutHtml);

// 3. Privacy Page
const privacyHtml = shell({
  title: 'Privacy Policy',
  description: 'Revisited Labs privacy policy: 100% client-side compute, no personal tracking, and complete user control.',
  path: '/privacy',
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

// 4. Dolce Colore Product Page
const LEMONSQUEEZY_STORE_URL = 'https://revisitedlabs.lemonsqueezy.com/';
// Free Community Edition is delivered by two LemonSqueezy lead-magnet variants.
const COMMUNITY_WINDOWS_URL = 'https://revisitedlabs.lemonsqueezy.com/checkout/buy/b9068f99-8a33-400f-a1aa-bcd03424b193';
const COMMUNITY_MACOS_URL = 'https://revisitedlabs.lemonsqueezy.com/checkout/buy/faed4610-6a87-4641-b7cb-9b16065c1470';
// No paid variant is published yet, so Pro points at the store until it exists.
const PRO_CHECKOUT_URL = LEMONSQUEEZY_STORE_URL;

const dolceHtml = shell({
  title: 'Dolce Colore - AI Photo & Video Colorizer',
  description: '100% private, native desktop AI colorizer for Windows & macOS. Restore historical photos and vintage cinema locally with DirectML GPU acceleration.',
  path: '/dolce-colore',
  active: 'dolce',
  image: 'https://revisitedlabs.com/dolce-social.png',
  imageAlt: 'Dolce Colore before-and-after photo colorization comparison',
  canonical: 'https://dolcecolore.com/',
  schema: [
    {
      '@context': 'https://schema.org',
      '@type': 'Product',
      name: 'Dolce Colore',
      description: 'Native desktop AI colorizer for Windows and macOS. Restores monochrome photos and vintage video locally, with no cloud uploads.',
      image: 'https://revisitedlabs.com/dolce-social.png',
      brand: { '@type': 'Brand', name: 'Revisited Labs' },
      category: 'MultimediaApplication',
      operatingSystem: 'Windows 10, Windows 11, macOS 12+',
      offers: {
        '@type': 'Offer',
        price: '39',
        priceCurrency: 'USD',
        availability: 'https://schema.org/InStock',
        url: 'https://dolcecolore.com/',
      },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://revisitedlabs.com/' },
        { '@type': 'ListItem', position: 2, name: 'Dolce Colore', item: 'https://dolcecolore.com/' },
      ],
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'How does the licensing key work? Can I use it offline?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'You receive a license key by email after purchase. Enter it once while online to activate the app. The activation is stored on your device, so afterwards you can work fully offline; the app sends no usage telemetry.',
          },
        },
        {
          '@type': 'Question',
          name: 'What is your refund policy?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Dolce Colore Pro is a one-time digital purchase and all sales are final. The full-featured Community Edition is free, so you can test it on your own photos and hardware before buying. If you hit a technical problem, contact support@revisitedlabs.com.',
          },
        },
        {
          '@type': 'Question',
          name: 'Is there a recurring subscription fee?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'No. Dolce Colore Pro is a one-time purchase of $39 USD. You own your license permanently with lifetime access to all v2.x updates.',
          },
        },
      ],
    },
  ],
  body: `
  <section class="hero" style="margin-bottom:3rem">
    <div class="badge-tag badge-pro">
      <span class="status-dot" style="background:#f59e0b;box-shadow:0 0 8px #f59e0b"></span>
      <span>v2.0 Native Desktop Suite &middot; Windows &amp; macOS &middot; 100% Offline</span>
    </div>
    <h1>Breathe life into history.<br>1-Click AI Photo &amp; Video Colorizer.</h1>
    <p class="lead">Dolce Colore restores black-and-white family portraits, historical archives, and vintage cinema with local neural networks. Zero cloud uploads, zero subscription lock-in, 100% private on your own device. One of five Revisited Labs products.</p>

    <div class="btn-group">
      <a href="#pricing" class="btn btn-primary">
        <span>Get Dolce Colore Pro &mdash; $39 Lifetime</span> &rarr;
      </a>
      <a href="https://revisitedlabs.lemonsqueezy.com/checkout/buy/b9068f99-8a33-400f-a1aa-bcd03424b193" target="_blank" rel="noopener noreferrer" class="btn btn-secondary">
        Download Free &mdash; Windows
      </a>
      <a href="https://revisitedlabs.lemonsqueezy.com/checkout/buy/faed4610-6a87-4641-b7cb-9b16065c1470" target="_blank" rel="noopener noreferrer" class="btn btn-secondary">
        Download Free &mdash; macOS
      </a>
    </div>
    <p style="font-size:0.85rem;color:var(--text-muted);margin-top:-0.5rem">
      One-time payment &middot; Online activation, then fully offline &middot; Free Community Edition, delivered by LemonSqueezy
    </p>
  </section>

  <!-- Interactive Showcase Window -->
  <div class="showcase-banner">
    <div class="showcase-header">
      <div class="showcase-controls">
        <span class="window-dot dot-red"></span>
        <span class="window-dot dot-yellow"></span>
        <span class="window-dot dot-green"></span>
      </div>
      <div class="showcase-title">Dolce Colore v2.0 &mdash; Studio Edition [DirectML GPU Active]</div>
      <div style="font-size:0.75rem;color:var(--green);font-weight:600">● OFFLINE LOCAL INFERENCE</div>
    </div>
    <div class="showcase-body">
      <img src="/dolce-sample.png" alt="Dolce Colore AI Colorization Sample" class="showcase-img">
      <div class="showcase-caption">
        <strong>Real neural output:</strong> High-precision color synthesis using CIE L*a*b* space isolation. Original film grain, edge sharpness, and luminance depth are 100% preserved.
      </div>
    </div>
  </div>

  <!-- Core Architectural Pillars -->
  <section style="margin-bottom:5rem">
    <h2 class="section-title">Engineered for Quality &amp; Absolute Privacy</h2>
    <p class="section-desc">Why historians, photographers, and archivists choose Dolce Colore over cloud web services.</p>

    <div class="pillars">
      <div class="pillar">
        <span class="pillar-icon">🔒</span>
        <h3>100% Offline &amp; Private</h3>
        <p>Your sensitive family albums and copyrighted archives never touch third-party servers. All neural networks run 100% locally on your computer.</p>
      </div>
      <div class="pillar">
        <span class="pillar-icon">⚡</span>
        <h3>DirectML GPU Acceleration</h3>
        <p>Native hardware acceleration across Windows (DirectX 12 / DirectML on NVIDIA, AMD, Intel Arc) and macOS (Apple Silicon MPS). Instant renders without GPU cloud queues.</p>
      </div>
      <div class="pillar">
        <span class="pillar-icon">🎨</span>
        <h3>CIE L*a*b* Sharpness Retention</h3>
        <p>Only the chromatic color channels (a*, b*) are synthesized. The original luminance (L*) remains unaltered, preventing the muddy blur of typical web filters.</p>
      </div>
      <div class="pillar">
        <span class="pillar-icon">🎬</span>
        <h3>Cinema Video Colorizer</h3>
        <p>Colorize historical film reels and clips up to 60 FPS with temporal consistency filters that minimize frame flicker between shots.</p>
      </div>
    </div>
  </section>

  <!-- Pricing & Edition Comparison (LemonSqueezy & Merchant Compliance) -->
  <section id="pricing" style="margin-bottom:5rem">
    <div style="text-align:center;max-width:720px;margin:0 auto 2rem">
      <div class="badge-tag">
        <span class="status-dot"></span>
        <span>Transparent Pricing</span>
      </div>
      <h2 class="section-title">Choose Your Edition</h2>
      <p class="section-desc">No subscriptions. No credit meters. Own your creative tools for life.</p>
    </div>

    <div class="pricing-grid">
      <!-- Community Edition -->
      <div class="pricing-card">
        <h3 style="font-size:1.4rem;font-weight:700">Community Edition</h3>
        <p style="color:var(--text-muted);font-size:0.92rem;margin-top:0.35rem">Essential local colorization for casual personal projects.</p>
        <div class="price-amount">
          <span class="price-currency">$</span>0
          <span class="price-period">free &amp; open source</span>
        </div>
        <ul class="pricing-features">
          <li>${ICONS.check} <span>100% Offline local neural inference</span></li>
          <li>${ICONS.check} <span>Single photo colorization</span></li>
          <li>${ICONS.check} <span>Standard export resolution (up to 1080p)</span></li>
          <li>${ICONS.check} <span>Local CPU or GPU inference</span></li>
          <li>${ICONS.check} <span>Free Community Edition license</span></li>
          <li>${ICONS.check} <span>Batch runs of up to 10 photos</span></li>
          <li class="disabled">&times; <span>Cinema video colorizer engine</span></li>
          <li class="disabled">&times; <span>4K exports and unlimited batches</span></li>
          <li class="disabled">&times; <span>Priority customer support</span></li>
        </ul>
        <div class="btn-stack">
          <a href="${COMMUNITY_WINDOWS_URL}" target="_blank" rel="noopener noreferrer" class="btn btn-secondary">
            Download Free &mdash; Windows
          </a>
          <a href="${COMMUNITY_MACOS_URL}" target="_blank" rel="noopener noreferrer" class="btn btn-secondary">
            Download Free &mdash; macOS
          </a>
        </div>
        <p class="cta-note">Free download. LemonSqueezy asks for an email address so we can send the file and release notes.</p>
      </div>

      <!-- Pro Lifetime Edition -->
      <div class="pricing-card featured">
        <div class="pricing-badge-popular">Lifetime Deal</div>
        <h3 style="font-size:1.4rem;font-weight:700;color:var(--accent)">Dolce Colore Pro</h3>
        <p style="color:var(--text-muted);font-size:0.92rem;margin-top:0.35rem">Full studio powerhouse for archivists, studios, and creators.</p>
        <div class="price-amount">
          <span class="price-currency">$</span>39
          <span class="price-period">one-time payment &middot; USD</span>
        </div>
        <ul class="pricing-features">
          <li>${ICONS.check} <span><strong>Everything in Community</strong></span></li>
          <li>${ICONS.check} <span><strong>Cinema Video Colorizer</strong> (up to 4K / 60 FPS)</span></li>
          <li>${ICONS.check} <span><strong>Unlimited batch processing</strong> of photo folders</span></li>
          <li>${ICONS.check} <span><strong>GPU acceleration on Windows and macOS</strong></span></li>
          <li>${ICONS.check} <span><strong>One-time online activation</strong>, then fully offline</span></li>
          <li>${ICONS.check} <span><strong>Windows 1-click installer &amp; native macOS .dmg</strong></span></li>
          <li>${ICONS.check} <span><strong>All v2.x updates included for life</strong></span></li>
          <li>${ICONS.check} <span><strong>Priority email support</strong></span></li>
        </ul>
        <a href="${PRO_CHECKOUT_URL}" class="btn btn-primary" id="buy-pro-btn" target="_blank" rel="noopener noreferrer">
          Buy Pro Lifetime &mdash; $39 USD &rarr;
        </a>
        <div class="guarantee-box">
          <span class="guarantee-icon">🎨</span>
          <div>
            <strong>Try it free first:</strong> The Community Edition colorizes unlimited photos at no cost, so you can see exactly how Dolce Colore performs on your own photos and computer before you buy Pro. Pro is a final-sale, one-time purchase. If something isn't working, email support@revisitedlabs.com and we'll help.
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- System Requirements -->
  <section style="margin-bottom:5rem">
    <h2 class="section-title">System Requirements</h2>
    <p class="section-desc">Engineered to deliver fluid performance on modern Windows and Mac hardware.</p>

    <div class="spec-grid">
      <div class="spec-card">
        <h4><span>🪟</span> Windows</h4>
        <ul>
          <li><strong>OS:</strong> Windows 10 (21H2+) or Windows 11 64-bit</li>
          <li><strong>Processor:</strong> Intel Core i5 / AMD Ryzen 5 or newer</li>
          <li><strong>GPU:</strong> DirectX 12 DirectML compatible GPU (NVIDIA GTX/RTX, AMD Radeon, Intel Arc/Iris)</li>
          <li><strong>RAM:</strong> 8 GB recommended (4 GB minimum)</li>
          <li><strong>Storage:</strong> 1.5 GB free disk space</li>
        </ul>
      </div>
      <div class="spec-card">
        <h4><span>🍎</span> macOS</h4>
        <ul>
          <li><strong>OS:</strong> macOS 12 (Monterey), 13 (Ventura), 14 (Sonoma), 15 (Sequoia)</li>
          <li><strong>Processor:</strong> Apple Silicon (M1, M2, M3, M4) or Intel x86_64</li>
          <li><strong>GPU:</strong> Metal Performance Shaders (MPS) hardware acceleration</li>
          <li><strong>RAM:</strong> 8 GB unified memory or higher</li>
          <li><strong>Storage:</strong> 1.5 GB free disk space</li>
        </ul>
      </div>
      <div class="spec-card">
        <h4><span>📦</span> Licensing &amp; Delivery</h4>
        <ul>
          <li><strong>Delivery:</strong> Instant digital license key and download link via email</li>
          <li><strong>Activation:</strong> one-time online check, then fully offline; no usage tracking</li>
          <li><strong>Seats:</strong> Valid for personal use across your desktop and laptop</li>
          <li><strong>Merchant:</strong> Revisited Labs &middot; Fast, secure checkout via LemonSqueezy</li>
        </ul>
      </div>
    </div>
  </section>

  <!-- FAQ Section -->
  <section style="margin-bottom:4rem">
    <h2 class="section-title">Frequently Asked Questions</h2>
    <p class="section-desc">Everything you need to know about purchasing, licensing, and running Dolce Colore.</p>

    <div class="faq-list">
      <div class="faq-card">
        <h3>Do my photos or videos ever get uploaded to a cloud server?</h3>
        <p>Never. Dolce Colore is a true native desktop application. All AI neural network inference runs 100% locally on your computer’s processor or GPU. Your private family photographs, clients' assets, and archives never leave your machine.</p>
      </div>
      <div class="faq-card">
        <h3>How does the licensing key work? Can I use it offline?</h3>
        <p>When you purchase via LemonSqueezy, you receive a license key by email. Enter it once while online to activate the app. The activation is stored on your device, so afterwards you can work fully offline, including in air-gapped environments; the app sends no usage telemetry.</p>
      </div>
      <div class="faq-card">
        <h3>What is your refund policy?</h3>
        <p>Dolce Colore Pro is a one-time digital purchase and all sales are final. That is why the full-featured <strong>Community Edition is free</strong>: download it and test it on your own photos and hardware before you decide to buy. If you hit a technical problem, contact us at <a href="mailto:support@revisitedlabs.com" style="color:var(--accent);text-decoration:underline">support@revisitedlabs.com</a> and we will work with you to fix it. This does not affect any rights you have under the consumer laws where you live.</p>
      </div>
      <div class="faq-card">
        <h3>Is there a recurring subscription fee?</h3>
        <p>No. Dolce Colore Pro is a one-time purchase of $39 USD. You own your license permanently with lifetime access to all v2.x updates. We believe professional creative tools should be owned, not rented.</p>
      </div>
      <div class="faq-card">
        <h3>How do I contact customer support?</h3>
        <p>You can reach our engineering team directly at <a href="mailto:support@revisitedlabs.com" style="color:var(--accent);text-decoration:underline">support@revisitedlabs.com</a>. We answer all inquiries within 24 hours.</p>
      </div>
    </div>
  </section>
  `,
});

const dolceDir = join(out, 'dolce-colore');
if (!existsSync(dolceDir)) mkdirSync(dolceDir, { recursive: true });
writeFileSync(join(dolceDir, 'index.html'), dolceHtml);
writeFileSync(join(out, 'dolce-colore.html'), dolceHtml);

// 5. Sitemap.xml & Robots.txt
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url><loc>https://revisitedlabs.com/</loc></url>
  <url><loc>https://revisitedlabs.com/about</loc></url>
  <url><loc>https://revisitedlabs.com/privacy</loc></url>
</urlset>
`;
writeFileSync(join(out, 'sitemap.xml'), sitemap);

const robots = `User-agent: *
Allow: /
Sitemap: https://revisitedlabs.com/sitemap.xml
`;
writeFileSync(join(out, 'robots.txt'), robots);

console.log('Revisited Labs site successfully built to dist/!');
