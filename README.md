# Toki Pona App

A free app for learning the Toki Pona language. Built with React Native + Expo (Android).

- **Play Store:** [com.seralto.tokipona](https://play.google.com/store/apps/details?id=com.seralto.tokipona)
- **Current version:** `2.1.0` (versionCode 26)

---

## Setup

```bash
cd toki-pona
npm install
npx expo start --android
```

---

## Scripts

| Command | Description |
|---|---|
| `npm start` | Start the Metro bundler |
| `npm run android` | Open on Android emulator/device |
| `npm run screenshots` | Generate Play Store screenshots via Maestro (see below) |

---

## Project structure

```
App.js              — root: global state, navigation, theme
themes.js           — color tokens for all themes
components/         — one file per screen
data/               — dictionaries and texts in PT, EN, ES (JSON)
assets/fonts/       — linja-pona (sitelen pona), registered as "sitelen-pona"
automation/         — screenshot generation (see automation/README.md)
```

---

## Key conventions

### Version
Source of truth: **`app.json`** (`version` + `versionCode`).
Always increment `versionCode` before publishing to the Play Store.

### Themes
All components consume color tokens via `th = themes[themeId]`.
Never use hardcoded colors — always use `th.background`, `th.text`, `th.accent`, etc.

### Fonts
- `sitelen-pona` → `linja-pona` font (loaded via `useFonts` in `Translator.js`)
- `useFonts` must be called **only once** in the tree (not per child component)

### Internationalization
Texts in `data/texts-{portuguese,english,spanish}.json`.
Thousands separator in scores: `.` for PT/ES, `,` for EN.

### Font scaling
`fontSizeId` (0–2) is stored in `AsyncStorage` and passed as a prop.
Offset `fo = fontSizeId * 2` is added to base font sizes.

---

## Build & publish

### Development workflow

```
1. Develop and test locally (npm run android)
2. Increment version/versionCode in app.json
3. eas build --profile production --platform android
4. eas submit --platform android --profile production
5. Install from the Play Store (Internal Testing tab) and validate
6. If OK → Play Console → promote the release to Production
7. If bugs found → fix, go back to step 2
```

Steps 3 and 4 can be combined with `--auto-submit`:
```bash
eas build --profile production --platform android --auto-submit
```

> **Important:** increment `versionCode` in `app.json` on every cycle —
> the Play Store rejects builds with a duplicate versionCode.

### Profiles (`eas.json`)

| Profile | Build type | Submit destination |
|---|---|---|
| `development` | Dev client (custom Expo Go) | — |
| `preview` | APK for direct distribution (no Play Store) | — |
| `production` | AAB for Play Store | Internal Testing (automatic with `--auto-submit`) |

Promoting from Internal Testing → Production is done directly in Play Console with no rebuild — the exact AAB that was tested goes to production.

---

## Automated screenshots (Play Store)

Requires Maestro installed and an emulator running. See `automation/README.md` for full instructions.

```bash
# Terminal 1 — dev server with fixed/deterministic data
EXPO_PUBLIC_SCREENSHOT_MODE=true npx expo start --android

# Terminal 2 — generate 21 images (3 locales × 7 screens)
npm run screenshots
# → automation/screenshots/playstore/{pt-BR,en-US,es-ES}/
```

> `automation/screenshots/playstore/` is listed in `.gitignore`.
