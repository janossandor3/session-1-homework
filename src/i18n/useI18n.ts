import React, { createContext, useContext } from 'react'
import type { ReactNode } from 'react'
import en from './en.json'
import hu from './hu.json'

interface I18nContextType {
  readonly localized: (key: string) => string
}

const I18nContext = createContext<I18nContextType | undefined>(undefined)
const translations = { en, hu }
const language = navigator.language.startsWith('hu') ? 'hu' : 'en'

function getNestedValue(obj: Record<string, any>, path: string): string {
  let current: any = obj
  for (const prop of path.split('.')) {
    current = current?.[prop]
  }
  return (current as string) || path
}

function localized(key: string): string {
    return getNestedValue(translations[language], key)
}

export function I18nProvider({ children }: { children: ReactNode }): React.ReactElement {
  return React.createElement(
    I18nContext.Provider,
    { value: { localized } },
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
