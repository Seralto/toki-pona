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
const path         = require('path');

const { SCREENS, LOCALES } = require('../screenshots/screens');

const AUTOMATION_DIR = path.resolve(__dirname, '..');
const FLOWS_DIR      = path.join(AUTOMATION_DIR, 'maestro', 'flows');
const OUTPUT_DIR     = path.join(AUTOMATION_DIR, 'screenshots', 'playstore');
const TMP_DIR        = path.join(AUTOMATION_DIR, '.tmp-screenshots');

// Map locale → language setup flow filename (without extension)
const LOCALE_FLOW = {
  'pt-BR': '_set-language-pt',
  'en-US': '_set-language-en',
  'es-ES': '_set-language-es',
};

function run(cmd) {
  execSync(cmd, { stdio: 'inherit', cwd: AUTOMATION_DIR });
}

function ensureDir(dir) {
  fs.mkdirSync(dir, { recursive: true });
}

function maestroTest(flowFile, outputDir) {
  run(`maestro test --output "${outputDir}" "${flowFile}"`);
}

// ── Main ────────────────────────────────────────────────────────────────────

ensureDir(TMP_DIR);
for (const locale of LOCALES) ensureDir(path.join(OUTPUT_DIR, locale));

let totalCaptures = 0;

for (const locale of LOCALES) {
  console.log(`\n🌍  ${locale}`);

  // Set language in the running app
  const langFlow = path.join(FLOWS_DIR, `${LOCALE_FLOW[locale]}.yaml`);
  maestroTest(langFlow, TMP_DIR);

  for (const screen of SCREENS) {
    const flowPath = path.join(FLOWS_DIR, `${screen.flowFile}.yaml`);
    const tmpOut   = path.join(TMP_DIR, locale);

    ensureDir(tmpOut);
    console.log(`  📸  ${screen.outputName}  (${screen.label})`);
    maestroTest(flowPath, tmpOut);

    // Move the captured PNG to the final location
    const src = path.join(tmpOut, `${screen.outputName}.png`);
    const dst = path.join(OUTPUT_DIR, locale, `${screen.outputName}.png`);
    if (fs.existsSync(src)) {
      fs.copyFileSync(src, dst);
      totalCaptures++;
    } else {
      console.warn(`  ⚠️   Screenshot not found: ${src}`);
    }
  }
}

// Cleanup temp directory
fs.rmSync(TMP_DIR, { recursive: true, force: true });

console.log(`\n✅  Done — ${totalCaptures} screenshots in automation/screenshots/playstore/`);
