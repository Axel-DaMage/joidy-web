'use client';

import { type ReactNode } from 'react';
import { I18nProvider } from '@/i18n';
import { SkipLink } from '@/components/SkipLink';

export function Providers({ children }: { children: ReactNode }) {
  return (
    <I18nProvider>
      <SkipLink />
      {children}
    </I18nProvider>
  );
}
