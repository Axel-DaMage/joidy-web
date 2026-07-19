import { MDXRemote } from 'next-mdx-remote/rsc';
import { notFound } from 'next/navigation';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import Link from 'next/link';

const DOCS_DIR = path.join(process.cwd(), 'docs');

interface DocPageProps {
  params: Promise<{ slug?: string[] }>;
}

const DOCS_INDEX = [
  { slug: 'getting-started', title: 'Getting Started', description: 'Quick start guide to run Joidy in minutes' },
  { slug: 'installation', title: 'Installation', description: 'Detailed installation instructions for Docker and manual setup' },
  { slug: 'configuration', title: 'Configuration', description: 'Environment variables and configuration reference' },
  { slug: 'architecture', title: 'Architecture', description: 'System architecture, data flow, and component overview' },
  { slug: 'api-reference', title: 'API Reference', description: 'Complete REST API documentation' },
];

async function getDocContent(slug: string) {
  const filePath = path.join(DOCS_DIR, `${slug}.mdx`);
  
  if (!fs.existsSync(filePath)) {
    return null;
  }
  
  const fileContent = fs.readFileSync(filePath, 'utf-8');
  const { data, content } = matter(fileContent);
  
  return { frontmatter: data, content };
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

// Función auxiliar para extraer texto de los children de React
const extractText = (children: any): string => {
  if (typeof children === 'string') return children;
  if (Array.isArray(children)) return children.map(extractText).join('');
  if (children?.props?.children) return extractText(children.props.children);
  return '';
};

// Componentes MDX personalizados para dar estilos y colores
const mdxComponents = {
  table: (props: any) => (
    <div className="not-prose overflow-x-auto my-8 rounded-lg border border-[#333] shadow-lg">
      <table className="w-full text-sm text-left border-collapse m-0" {...props} />
    </div>
  ),
  th: (props: any) => (
    <th 
      className="px-6 py-4 bg-[#0a0a0a] border-b border-[#333] text-[#10b981] font-mono tracking-wider uppercase text-xs whitespace-nowrap" 
      {...props} 
    />
  ),
  td: (props: any) => {
    // Extraemos el texto recursivamente por si viene envuelto en otros nodos
    const text = extractText(props.children).trim();
    let colorClass = "text-[#cccccc]";
    
    if (text === 'Yes') colorClass = "text-[#10b981] font-bold";
    if (text === 'No') colorClass = "text-[#ef4444]";

    return (
      <td className={`px-6 py-4 border-b border-[#222] bg-[#111111] ${colorClass}`} {...props} />
    )
  },
  code: (props: any) => {
    // Verificamos si es un bloque de código (pre > code) o código en línea
    const isBlock = props.className?.includes('language-');
    if (isBlock) {
      return <code {...props} />;
    }
    return (
      <code 
        className="!text-[#10b981] !bg-[#1a1a1a] px-1.5 py-0.5 rounded font-mono text-[0.9em] border border-[#333] before:content-none after:content-none" 
        {...props} 
      />
    );
  },
  a: (props: any) => (
    <a 
      className="text-[#10b981] hover:text-[#34d399] transition-colors decoration-dashed underline-offset-4" 
      {...props} 
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
              href="https://github.com/d4mag3/Joidy"
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-xs tracking-wider text-[#888888] hover:text-white border border-[#1a1a1a] hover:border-[#333333] px-4 py-2 transition-all"
            >
              GitHub Repository
            </Link>
            <Link
              href="https://github.com/d4mag3/Joidy/issues"
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-xs tracking-wider text-[#888888] hover:text-white border border-[#1a1a1a] hover:border-[#333333] px-4 py-2 transition-all"
            >
              Report Issue
            </Link>
            <Link
              href="https://github.com/d4mag3/Joidy/discussions"
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
          {doc.frontmatter.title}
        </h1>
        {doc.frontmatter.description && (
          <p className="text-[#888888] text-lg leading-relaxed">
            {doc.frontmatter.description}
          </p>
        )}
      </header>
      <MDXRemote source={doc.content} components={mdxComponents} />
    </article>
  );
}