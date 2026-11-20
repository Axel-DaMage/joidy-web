import type { ReactNode } from 'react';
import { DocsLayoutClient } from '@/components/DocsLayoutClient';
import { FooterVersion } from '@/components/FooterVersion';

export default function DocsLayout({ children }: { children: ReactNode }) {
  return (
    <DocsLayoutClient version={<FooterVersion />}>
      {children}
    </DocsLayoutClient>
  );
}
