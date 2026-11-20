'use client';

import { useI18n } from '@/i18n';

export function SkipLink() {
  const { t } = useI18n();

  return (
    <a
      href="#main-content"
      className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[100] focus:bg-white focus:text-black focus:px-4 focus:py-2 focus:font-mono focus:text-xs focus:tracking-wider"
    >
      {t.a11y.skipToContent}
    </a>
  );
}
