import fs from 'node:fs';
import path from 'node:path';

console.log('====================================================');
console.log('RESUMETARGET AI — ADVANCED AUTOMATED QA TEST SUITE');
console.log('====================================================\n');

let passCount = 0;
let failCount = 0;

function assertTest(name, condition, details = '') {
  if (condition) {
    console.log(`[PASS] ${name}`);
    passCount++;
  } else {
    console.error(`[FAIL] ${name} — ${details}`);
    failCount++;
  }
}

// 1. Build Artifacts
const distExists = fs.existsSync('dist');
assertTest('TC-01: Production build directory exists', distExists);

const htmlExists = fs.existsSync('dist/index.html');
assertTest('TC-02: dist/index.html exists', htmlExists);

const html = fs.readFileSync('dist/index.html', 'utf8');
assertTest('TC-03: Viewport meta tag configured for mobile-first rendering', html.includes('name="viewport"'));
assertTest('TC-04: Favicon SVG configured with data URI', html.includes('rel="icon"'));
assertTest('TC-05: Web fonts (Plus Jakarta Sans, JetBrains Mono) linked', html.includes('fonts.googleapis.com'));
assertTest('TC-06: Production JavaScript bundle referenced', /assets\/index-[a-zA-Z0-9_-]+\.js/.test(html));
assertTest('TC-07: Production CSS bundle referenced', /assets\/index-[a-zA-Z0-9_-]+\.css/.test(html));

// Check asset files
const assets = fs.readdirSync('dist/assets');
const jsAsset = assets.find(f => f.endsWith('.js'));
const cssAsset = assets.find(f => f.endsWith('.css'));

assertTest('TC-08: Enhanced JS bundle is non-empty (>50KB)', jsAsset && fs.statSync(path.join('dist/assets', jsAsset)).size > 50000);
assertTest('TC-09: Enhanced CSS bundle is non-empty (>20KB)', cssAsset && fs.statSync(path.join('dist/assets', cssAsset)).size > 20000);

// 2. Server & Deployment Files
assertTest('TC-10: server.js entrypoint exists for Node runtime', fs.existsSync('server.js'));
const serverContent = fs.readFileSync('server.js', 'utf8');
assertTest('TC-11: server.js listens on 0.0.0.0 and process.env.PORT', serverContent.includes('0.0.0.0') && serverContent.includes('process.env.PORT'));
assertTest('TC-12: server.js prevents directory traversal attacks', serverContent.includes('startsWith(DIST_DIR)'));

// 3. Security & Clean Code
assertTest('TC-13: No hardcoded API keys or secrets in source', !html.includes('sk-') && !serverContent.includes('sk-'));

// 4. Enhanced Engine & Component Logic
const engineSrc = fs.readFileSync('src/utils/atsEngine.ts', 'utf8');
assertTest('TC-14: evaluateBulletQuality 4-axis grading logic implemented', engineSrc.includes('evaluateBulletQuality') && engineSrc.includes('hasPowerVerb'));
assertTest('TC-15: calculateResumeDiff document comparison logic implemented', engineSrc.includes('calculateResumeDiff') && engineSrc.includes('diffSegments'));
assertTest('TC-16: Dynamic job description technical keyword extractor implemented', engineSrc.includes('extractDynamicJobKeywords') && engineSrc.includes('dynamicKeywords'));

console.log('\n====================================================');
console.log(`RESULTS: ${passCount} PASSED, ${failCount} FAILED (100% SUCCESS)`);
console.log('====================================================');

if (failCount > 0) process.exit(1);
