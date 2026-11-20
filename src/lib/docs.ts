export interface DocMeta {
  slug: string;
  title: string;
  description: string;
}

export const DOCS_INDEX: DocMeta[] = [
  { slug: 'getting-started', title: 'Getting Started', description: 'Quick start guide to run Joidy in minutes' },
  { slug: 'installation', title: 'Installation', description: 'Docker, curl, PowerShell, Homebrew, AUR, and the joidy CLI' },
  { slug: 'configuration', title: 'Configuration', description: 'Environment variables and configuration reference' },
  { slug: 'architecture', title: 'Architecture', description: 'System architecture, data flow, and component overview' },
  { slug: 'features', title: 'Features', description: 'Gamification, goals, mood, Pomodoro, streaks, and PWA' },
  { slug: 'integrations', title: 'Integrations', description: 'GitHub, Google Calendar, Gmail, Telegram, Obsidian, and more' },
  { slug: 'api-reference', title: 'API Reference', description: 'Complete REST API documentation' },
  { slug: 'operations', title: 'Operations', description: 'joidy CLI, backups, monitoring, and power management' },
  { slug: 'security', title: 'Security', description: 'Authentication model, hardening, and disclosure' },
];
