'use client';

import { type ReactNode } from 'react';
import { MotionConfig } from 'framer-motion';
import { I18nProvider } from '@/i18n';

export function Providers({ children }: { children: ReactNode }) {
  return (
    <MotionConfig reducedMotion="user">
      <I18nProvider>{children}</I18nProvider>
    </MotionConfig>
  );
}
