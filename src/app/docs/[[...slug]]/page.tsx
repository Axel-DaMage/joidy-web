import { MDXRemote } from 'next-mdx-remote/rsc';
import { notFound } from 'next/navigation';
import { readFile, readdir } from 'node:fs/promises';
import path from 'node:path';
import matter from 'gray-matter';
import Link from 'next/link';
import { isValidElement, type ComponentPropsWithoutRef, type ReactNode } from 'react';

const DOCS_DIR = path.join(process.cwd(), 'docs');

// Canonical doc slugs: one or more lowercase segments of letters, digits and dashes.
const SLUG_PATTERN = /^[a-z0-9-]+(\/[a-z0-9-]+)*$/;

// All docs are known at build time; unknown slugs must 404 without touching fs.
export const dynamicParams = false;

interface DocPageProps {
  params: Promise<{ slug?: string[] }>;
}

interface DocFrontmatter {
  title?: string;
  description?: string;
}

// Derive a human-readable title from the slug for docs that omit one in their
// frontmatter (`getting-started` -> "Getting Started").
function titleFromSlug(slug: string): string {
  const segment = slug.split('/').pop() ?? slug;
  return segment
    .split('-')
    .map(word => (word ? word[0].toUpperCase() + word.slice(1) : word))
    .join(' ');
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
];

async function getDocContent(slug: string) {
  // Reject anything outside the canonical slug shape (blocks `..`, `%2e`, etc.)
  if (!SLUG_PATTERN.test(slug)) {
    return null;
  }

  const filePath = path.resolve(DOCS_DIR, `${slug}.mdx`);

  // Defense-in-depth: the resolved path must stay inside DOCS_DIR.
  if (!filePath.startsWith(`${DOCS_DIR}${path.sep}`)) {
    return null;
  }

  let fileContent: string;
  try {
    fileContent = await readFile(filePath, 'utf-8');
  } catch (error) {
    // A missing file is just an unknown doc; anything else is a real failure.
    if ((error as NodeJS.ErrnoException).code === 'ENOENT') {
      return null;
    }
    throw error;
  }

  const { data, content } = matter(fileContent);
  const frontmatter = data as DocFrontmatter;

  return {
    content,
    // A doc without a frontmatter title falls back to the slug-derived one so
    // "undefined" can never reach the rendered heading or the page metadata.
    title: typeof frontmatter.title === 'string' ? frontmatter.title : titleFromSlug(slug),
    description:
      typeof frontmatter.description === 'string' ? frontmatter.description : undefined,
  };
}

export async function generateStaticParams() {
  // Register every .mdx file under docs/ so new docs are picked up automatically.
  // `index.mdx` is intentionally skipped: /docs renders the index page below.
  const docParams = (await readdir(DOCS_DIR))
    .filter(file => file.endsWith('.mdx'))
    .map(file => file.replace(/\.mdx$/, ''))
    .filter(slug => slug !== 'index' && SLUG_PATTERN.test(slug))
    .map(slug => ({ slug: [slug] }));

  docParams.push({ slug: [] }); // index page
  return docParams;
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
    title: `${doc.title} - Joidy Docs`,
    // Omit the description entirely when the doc does not declare one.
    ...(doc.description ? { description: doc.description } : {}),
  };
}

// Helper to extract plain text from React children
const extractText = (children: ReactNode): string => {
  if (typeof children === 'string') return children;
  if (typeof children === 'number') return String(children);
  if (Array.isArray(children)) return children.map(extractText).join('');
  if (isValidElement<{ children?: ReactNode }>(children)) return extractText(children.props.children);
  return '';
};

// Merge design classes with any className supplied through MDX props: the
// design classes always apply and incoming classes are appended after them.
const cn = (...classes: (string | undefined)[]) => classes.filter(Boolean).join(' ');

// Custom MDX components for styling and colors
const mdxComponents = {
  table: (props: ComponentPropsWithoutRef<'table'>) => (
    <div className="not-prose overflow-x-auto my-8 rounded-lg border border-[#333] shadow-lg">
      <table
        {...props}
        className={cn('w-full text-sm text-left border-collapse m-0', props.className)}
      />
    </div>
  ),
  th: (props: ComponentPropsWithoutRef<'th'>) => (
    <th
      {...props}
      className={cn('px-6 py-4 bg-[#0a0a0a] border-b border-[#333] text-[#10b981] font-mono tracking-wider uppercase text-xs whitespace-nowrap', props.className)}
    />
  ),
  td: (props: ComponentPropsWithoutRef<'td'>) => {
    // Extract the text recursively in case it is wrapped in other nodes
    const text = extractText(props.children).trim();
    let colorClass = "text-[#cccccc]";

    if (text === 'Yes') colorClass = "text-[#10b981] font-bold";
    if (text === 'No') colorClass = "text-[#ef4444]";

    return (
      <td
        {...props}
        className={cn('px-6 py-4 border-b border-[#222] bg-[#111111]', props.className, colorClass)}
      />
    )
  },
  code: (props: ComponentPropsWithoutRef<'code'>) => {
    // Check whether this is a code block (pre > code) or inline code
    const isBlock = props.className?.includes('language-');
    if (isBlock) {
      return <code {...props} />;
    }
    return (
      <code
        {...props}
        className={cn('!text-[#10b981] !bg-[#1a1a1a] px-1.5 py-0.5 rounded font-mono text-[0.9em] border border-[#333] before:content-none after:content-none', props.className)}
      />
    );
  },
  a: (props: ComponentPropsWithoutRef<'a'>) => (
    <a
      {...props}
      className={cn('text-[#10b981] hover:text-[#34d399] transition-colors decoration-dashed underline-offset-4', props.className)}
    />
  )
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
  
  return (
    <article className="prose prose-invert max-w-none">
      <header className="mb-8 pb-6 border-b border-[#1a1a1a]">
        <h1 className="font-mono text-3xl md:text-4xl tracking-[0.1em] text-white mb-4">
          {doc.title}
        </h1>
        {doc.description && (
          <p className="text-[#888888] text-lg leading-relaxed">
            {doc.description}
          </p>
        )}
      </header>
      <MDXRemote source={doc.content} components={mdxComponents} />
    </article>
  );
}