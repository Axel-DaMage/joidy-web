import { MDXRemote } from 'next-mdx-remote/rsc';
import { notFound } from 'next/navigation';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import Link from 'next/link';
import rehypeSlug from 'rehype-slug';
import GithubSlugger from 'github-slugger';
import type { ComponentPropsWithoutRef } from 'react';

const DOCS_DIR = path.join(process.cwd(), 'docs');

interface DocPageProps {
  params: Promise<{ slug?: string[] }>;
}

const DOCS_INDEX = [
  { slug: 'getting-started', title: 'Getting Started', description: 'Quick start guide to run Joidy in minutes' },
  { slug: 'installation', title: 'Installation', description: 'Docker, curl, PowerShell, Homebrew, AUR, and the joidy CLI' },
  { slug: 'configuration', title: 'Configuration', description: 'Environment variables and configuration reference' },
  { slug: 'architecture', title: 'Architecture', description: 'System architecture, data flow, and component overview' },
  { slug: 'features', title: 'Features', description: 'Gamification, goals, mood, Pomodoro, streaks, and PWA' },
  { slug: 'integrations', title: 'Integrations', description: 'GitHub, Google Calendar, Gmail, Telegram, Obsidian, and more' },
  { slug: 'api-reference', title: 'API Reference', description: 'Complete REST API documentation' },
  { slug: 'operations', title: 'Operations', description: 'joidy CLI, backups, monitoring, and power management' },
  { slug: 'security', title: 'Security', description: 'Authentication model, hardening, and disclosure' },
  { slug: 'troubleshooting', title: 'Troubleshooting', description: 'Diagnose and fix common startup, API, vault, and AI issues' },
  { slug: 'faq', title: 'FAQ', description: 'Frequently asked questions about running Joidy' },
];

const SLUG_PATTERN = /^[a-z0-9-]+(\/[a-z0-9-]+)*$/;

async function getDocContent(slug: string) {
  if (!SLUG_PATTERN.test(slug)) {
    return null;
  }
  const filePath = path.join(DOCS_DIR, `${slug}.mdx`);
  
  if (!fs.existsSync(filePath)) {
    return null;
  }
  
  const fileContent = fs.readFileSync(filePath, 'utf-8');
  const { data, content } = matter(fileContent);
  
  return { frontmatter: data, content };
}

interface TocItem {
  depth: number;
  text: string;
  id: string;
}

// Reduce markdown heading content to its plain-text equivalent so
// TOC labels and slugs match what rehype-slug derives from rendered text.
// `_`/`__` are only emphasis at word boundaries (CommonMark) — intraword
// underscores in identifiers like OBSIDIAN_VAULT_PATH must be preserved.
function headingToText(raw: string): string {
  return raw
    .replace(/\[([^\]]*)\]\([^)]*\)/g, '$1')
    .replace(/`([^`]*)`/g, '$1')
    .replace(/\*\*([^*]+)\*\*/g, '$1')
    .replace(/\*([^*]+)\*/g, '$1')
    .replace(/(^|\s)__([^_]+)__(?=\s|$)/g, '$1$2')
    .replace(/(^|\s)_([^_]+)_(?=\s|$)/g, '$1$2')
    .replace(/~~([^~]+)~~/g, '$1')
    .trim();
}

function extractToc(content: string): TocItem[] {
  const slugger = new GithubSlugger();
  const items: TocItem[] = [];
  let inFence = false;
  for (const line of content.split('\n')) {
    if (/^\s*```/.test(line)) {
      inFence = !inFence;
      continue;
    }
    if (inFence) continue;
    const match = /^(#{2,4})\s+(.+)$/.exec(line);
    if (!match) continue;
    const text = headingToText(match[2]);
    items.push({ depth: match[1].length, text, id: slugger.slug(text) });
  }
  return items;
}

export async function generateStaticParams() {
  const params = DOCS_INDEX.map(doc => ({ slug: [doc.slug] }));
  params.push({ slug: [] }); // index page
  return params;
}

export async function generateMetadata({ params }: DocPageProps) {
  const resolvedParams = await params;
  const slugArray = resolvedParams.slug || [];
  
  if (slugArray.length === 0) {
    return {
      title: 'Documentation - Joidy',
      description: 'Complete guide to installing, configuring, and using Joidy.',
    };
  }
  
  const slug = slugArray.join('/');
  const doc = await getDocContent(slug);
  
  if (!doc) {
    return { title: 'Not Found - Joidy Docs' };
  }
  
  return {
    title: `${doc.frontmatter.title} - Joidy Docs`,
    description: doc.frontmatter.description,
  };
}

// Componentes MDX personalizados para dar estilos y colores
const mdxComponents = {
  table: (props: ComponentPropsWithoutRef<'table'>) => (
    <div className="not-prose overflow-x-auto my-8 rounded-lg border border-[#333] shadow-lg">
      <table className="w-full text-sm text-left border-collapse m-0" {...props} />
    </div>
  ),
  th: (props: ComponentPropsWithoutRef<'th'>) => (
    <th 
      className="px-6 py-4 bg-[#0a0a0a] border-b border-[#333] text-[#10b981] font-mono tracking-wider uppercase text-xs whitespace-nowrap" 
      {...props} 
    />
  ),
  td: (props: ComponentPropsWithoutRef<'td'>) => (
    <td className="px-6 py-4 border-b border-[#222] bg-[#111111] text-[#cccccc]" {...props} />
  ),
  code: (props: ComponentPropsWithoutRef<'code'>) => {
    // Verificamos si es un bloque de código (pre > code) o código en línea
    const isBlock = props.className?.includes('language-');
    if (isBlock) {
      return <code {...props} />;
    }
    return (
      <code 
        className="text-[#10b981]! bg-[#1a1a1a]! px-1.5 py-0.5 rounded font-mono text-[0.9em] border border-[#333] before:content-none after:content-none" 
        {...props} 
      />
    );
  },
  a: ({ href, ...props }: ComponentPropsWithoutRef<'a'>) => {
    if (href?.startsWith('/')) {
      return (
        <Link
          href={href}
          className="text-[#10b981] hover:text-[#34d399] transition-colors decoration-dashed underline-offset-4"
          {...props}
        />
      );
    }
    return (
      <a 
        className="text-[#10b981] hover:text-[#34d399] transition-colors decoration-dashed underline-offset-4" 
        href={href}
        {...props} 
      />
    );
  }
};

export default async function DocPage({ params }: DocPageProps) {
  const resolvedParams = await params;
  const slugArray = resolvedParams.slug || [];
  
  // Index page - no slug
  if (slugArray.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-6 md:px-10 py-10">
        <header className="mb-12 pb-8 border-b border-[#1a1a1a]">
          <h1 className="font-mono text-3xl md:text-4xl tracking-[0.1em] text-white mb-4">
            Documentation
          </h1>
          <p className="text-[#888888] text-lg leading-relaxed max-w-2xl">
            Complete guide to installing, configuring, and using Joidy.
          </p>
        </header>

        <div className="space-y-4">
          {DOCS_INDEX.map((doc) => (
            <Link
              key={doc.slug}
              href={`/docs/${doc.slug}`}
              className="block p-6 bg-[#0a0a0a] border border-[#1a1a1a] hover:border-[#333333] hover:bg-[#111111] transition-all"
            >
              <h2 className="font-mono text-lg tracking-[0.05em] text-white mb-2 hover:text-[#10b981] transition-colors">
                {doc.title}
              </h2>
              <p className="text-[#888888] text-sm leading-relaxed">
                {doc.description}
              </p>
            </Link>
          ))}
        </div>

        <div className="mt-12 pt-8 border-t border-[#1a1a1a]">
          <h3 className="font-mono text-sm tracking-wider text-[#555555] uppercase mb-4">
            Resources
          </h3>
          <div className="flex flex-wrap gap-3">
            <Link
              href="https://github.com/Axel-DaMage/joidy"
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-xs tracking-wider text-[#888888] hover:text-white border border-[#1a1a1a] hover:border-[#333333] px-4 py-2 transition-all"
            >
              GitHub Repository
            </Link>
            <Link
              href="https://github.com/Axel-DaMage/joidy/issues"
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-xs tracking-wider text-[#888888] hover:text-white border border-[#1a1a1a] hover:border-[#333333] px-4 py-2 transition-all"
            >
              Report Issue
            </Link>
            <Link
              href="https://github.com/Axel-DaMage/joidy/discussions"
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-xs tracking-wider text-[#888888] hover:text-white border border-[#1a1a1a] hover:border-[#333333] px-4 py-2 transition-all"
            >
              Discussions
            </Link>
          </div>
        </div>
      </div>
    );
  }
  
  // Doc page - has slug
  const slug = slugArray.join('/');
  const doc = await getDocContent(slug);
  
  if (!doc) {
    notFound();
  }
  
  const toc = extractToc(doc.content);
  const docIndex = DOCS_INDEX.findIndex((entry) => entry.slug === slug);
  const prevDoc = docIndex > 0 ? DOCS_INDEX[docIndex - 1] : null;
  const nextDoc =
    docIndex >= 0 && docIndex < DOCS_INDEX.length - 1
      ? DOCS_INDEX[docIndex + 1]
      : null;
  
  return (
    <article className="prose max-w-none">
      <header className="mb-8 pb-6 border-b border-[#1a1a1a]">
        <h1 className="font-mono text-3xl md:text-4xl tracking-[0.1em] text-white mb-4">
          {doc.frontmatter.title}
        </h1>
        {doc.frontmatter.description && (
          <p className="text-[#888888] text-lg leading-relaxed">
            {doc.frontmatter.description}
          </p>
        )}
      </header>
      {toc.length >= 4 && (
        <nav className="not-prose mb-10 rounded-lg border border-[#1a1a1a] bg-[#0a0a0a] p-5">
          <h2 className="font-mono text-[10px] tracking-widest text-[#555555] uppercase mb-3">
            On this page
          </h2>
          <ul className="space-y-1.5">
            {toc.map((item) => (
              <li
                key={item.id}
                style={{ paddingLeft: `${(item.depth - 2) * 1.25}rem` }}
              >
                <a
                  href={`#${item.id}`}
                  className="font-mono text-xs tracking-wider text-[#888888] hover:text-[#10b981] transition-colors"
                >
                  {item.text}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      )}
      <MDXRemote
        source={doc.content}
        options={{ mdxOptions: { rehypePlugins: [rehypeSlug] } }}
        components={mdxComponents}
      />
      {(prevDoc || nextDoc) && (
        <nav className="not-prose mt-12 pt-6 border-t border-[#1a1a1a] flex items-center justify-between gap-4">
          {prevDoc ? (
            <Link
              href={`/docs/${prevDoc.slug}`}
              className="font-mono text-xs tracking-wider text-[#888888] hover:text-[#10b981] transition-colors"
            >
              ← {prevDoc.title}
            </Link>
          ) : (
            <span />
          )}
          {nextDoc ? (
            <Link
              href={`/docs/${nextDoc.slug}`}
              className="font-mono text-xs tracking-wider text-[#888888] hover:text-[#10b981] transition-colors"
            >
              {nextDoc.title} →
            </Link>
          ) : (
            <span />
          )}
        </nav>
      )}
    </article>
  );
}