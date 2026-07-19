import type { ReactNode } from 'react';

export function Container({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <div className={`mx-auto w-full max-w-5xl px-6 md:px-10 flex flex-col items-center ${className}`}>
      {children}
    </div>
  );
}
