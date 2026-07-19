'use client';

import { useI18n } from '@/i18n';
import { Section } from '@/components/ui/Section';
import { NeofetchOutput } from '@/components/effects/NeofetchOutput';

export function TechStackSection() {
  const { t } = useI18n();
  return (
    <Section title={t.techStack.title}>
      <NeofetchOutput />
    </Section>
  );
}
