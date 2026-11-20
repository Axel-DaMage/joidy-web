'use client';

import {
  createContext,
  useContext,
  useCallback,
  useEffect,
  useSyncExternalStore,
  type ReactNode,
} from 'react';
import type { Lang, Dict } from '@/types';
import es from './es.json';
import en from './en.json';

const dicts: Record<Lang, Dict> = { es, en };
const STORAGE_KEY = 'joidy-lang';
const listeners = new Set<() => void>();

// In-memory fallback so language switching still works when localStorage
// is unavailable (private mode, storage disabled/blocked).
let memoryLang: Lang | null = null;

function isLang(value: unknown): value is Lang {
  return value === 'en' || value === 'es';
}

function getStoredLang(): Lang {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (isLang(stored)) return stored;
  } catch {
    // localStorage unavailable — fall through to the in-memory value.
  }
  return memoryLang ?? 'es';
}

function subscribe(callback: () => void) {
  listeners.add(callback);
  // The 'storage' event only fires in other tabs; same-tab updates go
  // through setLang -> listeners above.
  const onStorage = (event: StorageEvent) => {
    if (event.key !== STORAGE_KEY) return;
    if (event.newValue !== null && !isLang(event.newValue)) return;
    callback();
  };
  window.addEventListener('storage', onStorage);
  return () => {
    listeners.delete(callback);
    window.removeEventListener('storage', onStorage);
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

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const setLang = useCallback((l: Lang) => {
    memoryLang = l;
    try {
      localStorage.setItem(STORAGE_KEY, l);
    } catch {
      // Storage unavailable — keep the in-memory value only.
    }
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
