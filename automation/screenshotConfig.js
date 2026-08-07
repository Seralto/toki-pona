/**
 * Screenshot Mode configuration.
 *
 * Enable by starting the dev server with:
 *   EXPO_PUBLIC_SCREENSHOT_MODE=true npx expo start --android
 *
 * Never set in production builds — the variable is absent so SCREENSHOT_MODE
 * evaluates to false and every override below is dead code.
 */
export const SCREENSHOT_MODE =
  process.env.EXPO_PUBLIC_SCREENSHOT_MODE === 'true';

// Fixed content shown when SCREENSHOT_MODE is active.
// All values must exist in the dictionary (tokipona-*.json).
export const FIXED_WORD      = 'pona';  // word of the day on Home
export const FIXED_SCORE     = 1250;    // quiz score shown on Home + Quiz
export const FIXED_STREAK    = 5;       // daily streak shown on Home

// Quiz: deterministic question — correct answer is always FIXED_QUIZ_WORD
export const FIXED_QUIZ_WORD    = 'toki';
export const FIXED_QUIZ_OPTIONS = ['moku', 'toki', 'pona', 'telo'];
