/**
 * Canonical UI language codes (must match keys in i18n/*.json and store/app langs).
 */
export const SUPPORTED_UI_LANGS = Object.freeze([
  'en',
  'fr',
  'zh-CN',
  'ko',
  'ru',
  'es',
  'zh-TW',
])

/**
 * Map browser / stored locale strings to a supported admin language.
 * Prevents T() falling back to raw keys (e.g. en-US, zh-Hans-CN).
 */
export function normalizeAppLang (raw) {
  if (!raw || typeof raw !== 'string') {
    return 'zh-CN'
  }
  if (SUPPORTED_UI_LANGS.includes(raw)) {
    return raw
  }
  const l = raw.trim().toLowerCase().replace(/_/g, '-')
  const exactLower = {
    'en': 'en',
    'en-us': 'en',
    'en-gb': 'en',
    'zh': 'zh-CN',
    'zh-cn': 'zh-CN',
    'zh-hans': 'zh-CN',
    'zh-tw': 'zh-TW',
    'zh-hk': 'zh-TW',
    'zh-hant': 'zh-TW',
    'fr': 'fr',
    'ko': 'ko',
    'ru': 'ru',
    'es': 'es',
  }
  if (exactLower[l]) {
    return exactLower[l]
  }
  if (l.startsWith('zh-tw') || l.startsWith('zh-hk') || l.startsWith('zh-hant')) {
    return 'zh-TW'
  }
  if (l.startsWith('zh')) {
    return 'zh-CN'
  }
  if (l.startsWith('en')) {
    return 'en'
  }
  for (const code of ['fr', 'ko', 'ru', 'es']) {
    if (l === code || l.startsWith(code + '-')) {
      return code
    }
  }
  return 'zh-CN'
}
