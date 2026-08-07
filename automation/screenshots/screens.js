/**
 * Source of truth for Play Store screenshot automation.
 *
 * Each entry maps to one Maestro flow file:
 *   flowFile  → automation/maestro/flows/{flowFile}.yaml
 *   outputName → final filename inside playstore/{locale}/
 *
 * To add a new screen:
 *   1. Add an entry here.
 *   2. Create the corresponding .yaml flow in maestro/flows/.
 *   3. Re-run: npm run screenshots
 */

/** @type {Array<{ outputName: string, flowFile: string, label: string }>} */
const SCREENS = [
  {
    outputName: '01-home',
    flowFile:   '01-home',
    label:      'Home — word of the day + quiz score',
  },
  {
    outputName: '02-translator',
    flowFile:   '02-translator',
    label:      'Translator — words typed in',
  },
  {
    outputName: '03-dictionary',
    flowFile:   '03-dictionary',
    label:      'Dictionary — full word list',
  },
  {
    outputName: '04-grammar',
    flowFile:   '04-grammar',
    label:      'Grammar — lesson content',
  },
  {
    outputName: '05-sentences',
    flowFile:   '05-sentences',
    label:      'Sentences — example phrases',
  },
  {
    outputName: '06-quiz',
    flowFile:   '06-quiz',
    label:      'Quiz — active question',
  },
  {
    outputName: '07-settings',
    flowFile:   '07-settings',
    label:      'Settings — appearance options',
  },
];

/** Locales to capture. Each needs a _set-language-{locale}.yaml flow. */
const LOCALES = ['pt-BR', 'en-US', 'es-ES'];

module.exports = { SCREENS, LOCALES };
