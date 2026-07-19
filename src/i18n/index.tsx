'use client';

import { createContext, useContext, useState, useCallback, type ReactNode } from 'react';
import type { Lang, Dict } from '@/types';
import es from './es.json';
import en from './en.json';

const dicts: Record<Lang, Dict> = { es, en };

interface I18nCtx {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: Dict;
}

const I18nContext = createContext<I18nCtx>({
  lang: 'es',
  setLang: () => {},
  t: es,
});

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>('es');
  const setLang = useCallback((l: Lang) => setLangState(l), []);
  return (
    <I18nContext.Provider value={{ lang, setLang, t: dicts[lang] }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  return useContext(I18nContext);
}
