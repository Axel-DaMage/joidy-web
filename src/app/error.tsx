'use client';

import Link from 'next/link';
import { useI18n } from '@/i18n';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Container } from '@/components/ui/Container';

export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const { t } = useI18n();

  return (
    <>
      <Header />
      <main className="flex-1 flex items-center min-h-screen pt-14">
        <Container>
          <div className="w-full max-w-lg border border-[#1a1a1a] bg-[#0a0a0a] p-8 md:p-12 text-center">
            <p className="font-mono text-6xl md:text-7xl font-light text-[#ef4444] mb-6">
              !
            </p>
            <h1 className="font-mono text-xl tracking-[0.1em] text-white mb-3">
              {t.error.title}
            </h1>
            <p className="font-mono text-sm text-[#888888] leading-relaxed mb-8">
              {t.error.description}
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <button
                onClick={reset}
                className="font-mono text-xs tracking-wider uppercase text-black bg-white hover:bg-[#cccccc] px-5 py-2.5 transition-colors"
              >
                {t.error.retry}
              </button>
              <Link
                href="/"
                className="font-mono text-xs tracking-wider uppercase text-[#888888] hover:text-white border border-[#1a1a1a] hover:border-[#333333] px-5 py-2.5 transition-colors"
              >
                {t.error.backHome}
              </Link>
            </div>
          </div>
        </Container>
      </main>
      <Footer />
    </>
  );
}
