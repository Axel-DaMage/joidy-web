'use client';

import { createContext, useContext, useCallback, useSyncExternalStore, type ReactNode } from 'react';
import type { Lang, Dict } from '@/types';
import es from './es.json';
import en from './en.json';

const dicts: Record<Lang, Dict> = { es, en };
const STORAGE_KEY = 'joidy-lang';
const listeners = new Set<() => void>();

function getStoredLang(): Lang {
  return localStorage.getItem(STORAGE_KEY) === 'en' ? 'en' : 'es';
}

function subscribe(callback: () => void) {
  listeners.add(callback);
  document.documentElement.lang = getStoredLang();
  return () => {
    listeners.delete(callback);
  };
}

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
  const lang = useSyncExternalStore(
    subscribe,
    getStoredLang,
    (): Lang => 'es',
  );

  const setLang = useCallback((l: Lang) => {
    localStorage.setItem(STORAGE_KEY, l);
    document.documentElement.lang = l;
    listeners.forEach((cb) => cb());
  }, []);

  return (
    <I18nContext.Provider value={{ lang, setLang, t: dicts[lang] }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  return useContext(I18nContext);
}
