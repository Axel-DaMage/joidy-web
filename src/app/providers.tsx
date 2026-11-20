'use client';

import { type ReactNode } from 'react';
import { LazyMotion, domAnimation } from 'framer-motion';
import { I18nProvider } from '@/i18n';

export function Providers({ children }: { children: ReactNode }) {
  return (
    <I18nProvider>
      <LazyMotion features={domAnimation} strict>
        {children}
      </LazyMotion>
    </I18nProvider>
  );
}
