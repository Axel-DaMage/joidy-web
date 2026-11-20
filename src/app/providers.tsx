"use client";

import { type ReactNode } from "react";
import { LazyMotion, MotionConfig, domAnimation } from "framer-motion";
import { I18nProvider } from "@/i18n";
import { SkipLink } from "@/components/SkipLink";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <MotionConfig reducedMotion="user">
      <I18nProvider>
        <LazyMotion features={domAnimation} strict>
          <SkipLink />
          {children}
        </LazyMotion>
      </I18nProvider>
    </MotionConfig>
  );
}
