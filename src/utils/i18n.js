import en from '@/utils/i18n/en.json'
import fr from '@/utils/i18n/fr.json'
import zhCN from '@/utils/i18n/zh_CN.json'
import ko from '@/utils/i18n/ko.json'
import ru from '@/utils/i18n/ru.json'
import es from '@/utils/i18n/es.json'
import zhTW from '@/utils/i18n/zh_TW.json'
import { useAppStore } from '@/store/app'
import { normalizeAppLang } from '@/utils/i18n_locale'

const trans = {
  'en': en,
  'fr': fr,
  'zh-CN': zhCN,
  'ko': ko,
  'ru': ru,
  'es': es,
  'zh-TW': zhTW,
}

/**
 * @param {string} key - JSON message key
 * @param {Record<string, string|number>|undefined} params - Placeholders {param}
 * @param {number} num - Plural hint (>1 uses Other if set)
 */
export function T (key, params = undefined, num = 0) {
  const appStore = useAppStore()
  const lang = normalizeAppLang(appStore.setting?.lang)
  const tran = trans[lang]?.[key]
  if (!tran) {
    return key
  }
  const msg = num > 1 ? (tran.Other ? tran.Other : tran.One) : tran.One
  if (typeof msg !== 'string') {
    return key
  }
  const p = params && typeof params === 'object' ? params : {}
  return msg.replace(/{(\w+)}/g, function (match, name) {
    if (Object.prototype.hasOwnProperty.call(p, name)) {
      const v = p[name]
      return v !== undefined && v !== null ? String(v) : match
    }
    return match
  })
}
