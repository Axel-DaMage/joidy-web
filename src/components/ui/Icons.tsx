import type { SVGProps } from 'react';

type IconProps = SVGProps<SVGSVGElement> & { size?: number };

function createIcon(children: React.ReactNode, viewBox = '0 0 24 24') {
  return ({ size = 20, className = '', ...props }: IconProps) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox={viewBox}
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      {...props}
    >
      {children}
    </svg>
  );
}

export const LockIcon = createIcon(<><rect x="3" y="11" width="18" height="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" /></>);

export const ServerIcon = createIcon(<><rect x="2" y="2" width="20" height="8" rx="2" ry="2" /><rect x="2" y="14" width="20" height="8" rx="2" ry="2" /><line x1="6" y1="6" x2="6.01" y2="6" /><line x1="6" y1="18" x2="6.01" y2="18" /></>);

export const DatabaseIcon = createIcon(<><ellipse cx="12" cy="5" rx="9" ry="3" /><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" /><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" /></>);

export const BrainIcon = createIcon(<><path d="M12 2a4 4 0 0 1 4 4c0 1.1-.4 2.1-1.1 2.8A4 4 0 0 1 16 13c1.3.5 2 1.5 2 3 0 2.2-1.8 4-4 4H8a4 4 0 0 1-4-4c0-1.5.7-2.5 2-3a4 4 0 0 1 1.1-4.2A4 4 0 0 1 8 6c0-2.2 1.8-4 4-4z" /><path d="M10 14h4" /><path d="M12 10v4" /></>);

export const PlantIcon = createIcon(<><path d="M12 22v-8" /><path d="M12 14c-3 0-5.5-2.5-5.5-5.5S9 3 12 3s5.5 2.5 5.5 5.5S15 14 12 14z" /><path d="M12 14c1.5 0 3-1 3-3" /><path d="M9 10c-1 0-2 .5-2 1.5" /></>);

export const GraphIcon = createIcon(<><circle cx="5" cy="5" r="2" /><circle cx="19" cy="5" r="2" /><circle cx="12" cy="19" r="2" /><line x1="5" y1="5" x2="19" y2="5" /><line x1="5" y1="5" x2="12" y2="19" /><line x1="19" y1="5" x2="12" y2="19" /></>);

export const RocketIcon = createIcon(<><path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" /><path d="M12 16.5C13.5 18 16 20 16 20s1.5-4 .5-6-4-4-4-4-4-1-6 .5c-2 1.5-2 4 0 5.5s4 2 5.5 0z" /><path d="M16 8c1.5-1.5 4-1 4-1s.5 2.5-1 4" /><circle cx="14" cy="14" r="1" /></>);

export const SearchIcon = createIcon(<><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></>);

export const SyncIcon = createIcon(<><path d="M21 2v6h-6" /><path d="M3 12a9 9 0 0 1 15-6.7L21 8" /><path d="M3 22v-6h6" /><path d="M21 12a9 9 0 0 1-15 6.7L3 16" /></>);

export const BookIcon = createIcon(<><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" /><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" /><line x1="8" y1="7" x2="16" y2="7" /><line x1="8" y1="11" x2="14" y2="11" /></>);

export const TargetIcon = createIcon(<><circle cx="12" cy="12" r="10" /><circle cx="12" cy="12" r="6" /><circle cx="12" cy="12" r="2" /></>);

export const ZapIcon = createIcon(<><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" /></>);

export const UsersIcon = createIcon(<><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></>);

export const CpuIcon = createIcon(<><rect x="4" y="4" width="16" height="16" rx="2" ry="2" /><rect x="9" y="9" width="6" height="6" /><line x1="9" y1="1" x2="9" y2="4" /><line x1="15" y1="1" x2="15" y2="4" /><line x1="9" y1="20" x2="9" y2="23" /><line x1="15" y1="20" x2="15" y2="23" /><line x1="20" y1="9" x2="23" y2="9" /><line x1="20" y1="14" x2="23" y2="14" /><line x1="1" y1="9" x2="4" y2="9" /><line x1="1" y1="14" x2="4" y2="14" /></>);

export const ClockIcon = createIcon(<><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></>);

export const ShieldIcon = createIcon(<><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></>);

export const LinkIcon = createIcon(<><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" /><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" /></>);
