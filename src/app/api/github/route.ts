import { NextResponse } from 'next/server';

export const revalidate = 86400; // Cache for 24 hours (86400 seconds)

export async function GET() {
  try {
    // Fetch up to 30 items to give us room to mix them
    const res = await fetch('https://api.github.com/repos/Axel-DaMage/Joidy/issues?state=all&per_page=30', {
      headers: {
        'Accept': 'application/vnd.github.v3+json',
      },
      next: { revalidate: 86400 },
    });

    if (!res.ok) {
      throw new Error(`GitHub API error: ${res.status}`);
    }

    const data = await res.json();
    
    // Separar Issues y PRs para forzar una mezcla equitativa si es posible
    const prs = data.filter((item: any) => !!item.pull_request);
    const issues = data.filter((item: any) => !item.pull_request);
    
    const mixed = [];
    const maxLength = Math.max(prs.length, issues.length);
    
    for (let i = 0; i < maxLength; i++) {
      if (issues[i]) mixed.push(issues[i]);
      if (prs[i]) mixed.push(prs[i]);
    }

    return NextResponse.json(mixed);
  } catch (error) {
    console.error('Error fetching GitHub issues:', error);
    return NextResponse.json({ error: 'Failed to fetch issues' }, { status: 500 });
  }
}
