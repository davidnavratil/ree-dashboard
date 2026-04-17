import type { Dictionary } from './dictionaries/cs'

const dictionaries = {
  cs: () => import('./dictionaries/cs').then(m => m.default),
  en: () => import('./dictionaries/en').then(m => m.default),
}

export type Locale = keyof typeof dictionaries
export type { Dictionary }

export const locales: Locale[] = ['cs', 'en']
export const defaultLocale: Locale = 'cs'

export const hasLocale = (locale: string): locale is Locale =>
  locale in dictionaries

export const getDictionary = async (locale: Locale): Promise<Dictionary> =>
  dictionaries[locale]()
