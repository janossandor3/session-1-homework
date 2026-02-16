import React, { createContext, useContext, useState } from 'react'
import type { ReactNode } from 'react'
import en from './en.json'
import hu from './hu.json'

type Language = 'en' | 'hu'

interface I18nContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
}

const I18nContext = createContext<I18nContextType | undefined>(undefined)

const translations = { en, hu }

function getNestedValue(obj: Record<string, any>, path: string): string {
  let current: any = obj
  for (const prop of path.split('.')) {
    current = current?.[prop]
  }
  return (current as string) || path
}

export function I18nProvider({ children }: { children: ReactNode }): React.ReactElement {
  const [language, setLanguage] = useState<Language>(() => {
    const browserLang = navigator.language.startsWith('hu') ? 'hu' : 'en'
    return browserLang
  })

  const t = (key: string): string => {
    return getNestedValue(translations[language], key)
  }

  const value: I18nContextType = { language, setLanguage, t }
  return React.createElement(
    I18nContext.Provider,
    { value },
    children
  )
}

export function useI18n() {
  const context = useContext(I18nContext)
  if (!context) {
    throw new Error('useI18n must be used within I18nProvider')
  }
  return context
}
