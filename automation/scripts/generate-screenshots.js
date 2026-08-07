#!/usr/bin/env node
/**
 * npm run screenshots
 *
 * Prerequisites:
 *   1. Maestro installed: curl -Ls "https://get.maestro.mobile.dev" | bash
 *   2. Android emulator running with the app installed (development build).
 *   3. Expo dev server started with screenshot mode:
 *        EXPO_PUBLIC_SCREENSHOT_MODE=true npx expo start --android
 *
 * Output: automation/screenshots/playstore/{locale}/{screen}.png
 */

const { execSync } = require('child_process');
const fs           = require('fs');
const os           = require('os');
const path         = require('path');

// Maestro installs to ~/.maestro/bin — not always in PATH when spawned by Node.
const MAESTRO_BIN  = path.join(os.homedir(), '.maestro', 'bin');
const MAESTRO_TESTS = path.join(os.homedir(), '.maestro', 'tests');
const ENV = { ...process.env, PATH: `${MAESTRO_BIN}:${process.env.PATH}` };

const { SCREENS, LOCALES } = require('../screenshots/screens');

const AUTOMATION_DIR = path.resolve(__dirname, '..');
const FLOWS_DIR      = path.join(AUTOMATION_DIR, 'maestro', 'flows');
const OUTPUT_DIR     = path.join(AUTOMATION_DIR, 'screenshots', 'playstore');

// Map locale → language setup flow filename (without extension)
const LOCALE_FLOW = {
  'pt-BR': '_set-language-pt',
  'en-US': '_set-language-en',
  'es-ES': '_set-language-es',
};

function run(cmd) {
  execSync(cmd, { stdio: 'inherit', cwd: AUTOMATION_DIR, env: ENV });
}

function ensureDir(dir) {
  fs.mkdirSync(dir, { recursive: true });
}

// takeScreenshot saves to ~/.maestro/tests/<timestamp>/<flow>/takeScreenshot/<name>.png
// --output only affects test-report JSON, not the actual screenshot files.
// Strategy: touch a sentinel file before running, then find PNGs newer than it.
const SENTINEL = path.join(os.tmpdir(), '.maestro-screenshot-sentinel');

function maestroTest(flowFile) {
  fs.writeFileSync(SENTINEL, '');          // mark start time
  run(`maestro test "${flowFile}"`);
}

function findLatestScreenshot(name) {
  const result = execSync(
    `find "${MAESTRO_TESTS}" -name "${name}.png" -newer "${SENTINEL}" 2>/dev/null || true`,
    { env: ENV }
  ).toString().trim().split('\n').filter(Boolean);
  return result.length ? result[result.length - 1] : null;
}

// ── Preflight ────────────────────────────────────────────────────────────────

const maestroPath = path.join(MAESTRO_BIN, 'maestro');
if (!fs.existsSync(maestroPath)) {
  console.error(`\n❌  Maestro não encontrado em ${maestroPath}`);
  console.error('   Instale com: curl -Ls "https://get.maestro.mobile.dev" | bash\n');
  process.exit(1);
}

// ── Main ────────────────────────────────────────────────────────────────────

for (const locale of LOCALES) ensureDir(path.join(OUTPUT_DIR, locale));

let totalCaptures = 0;

for (const locale of LOCALES) {
  console.log(`\n🌍  ${locale}`);

  // Set language in the running app
  const langFlow = path.join(FLOWS_DIR, `${LOCALE_FLOW[locale]}.yaml`);
  maestroTest(langFlow);

  for (const screen of SCREENS) {
    const flowPath = path.join(FLOWS_DIR, `${screen.flowFile}.yaml`);
    const dst      = path.join(OUTPUT_DIR, locale, `${screen.outputName}.png`);

    console.log(`  📸  ${screen.outputName}  (${screen.label})`);
    maestroTest(flowPath);

    // Screenshots land in ~/.maestro/tests/<ts>/<flow>/takeScreenshot/<name>.png
    const src = findLatestScreenshot(screen.outputName);
    if (src) {
      fs.copyFileSync(src, dst);
      totalCaptures++;
    } else {
      console.warn(`  ⚠️   Screenshot not found for: ${screen.outputName}`);
    }
  }
}

console.log(`\n✅  Done — ${totalCaptures} screenshots in automation/screenshots/playstore/`);
