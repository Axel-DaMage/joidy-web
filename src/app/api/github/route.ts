import { NextResponse } from 'next/server';
import { githubFetch, OUTAGE_TTL_MS } from '@/lib/github';

export const revalidate = 86400; // Cache for 24 hours (86400 seconds)

// Best-effort, per-instance fallback state. Module state is not shared
// across serverless instances or cold starts, but it still stops a burst of
// client requests from each triggering a new GitHub call during an outage.
let lastGood: { pull_request?: unknown }[] | null = null;
let outageUntil = 0;

export async function GET() {
  if (Date.now() < outageUntil) {
    if (lastGood) return NextResponse.json(lastGood);
    return NextResponse.json({ error: 'Failed to fetch issues' }, { status: 500 });
  }

  try {
    // Fetch up to 30 items to give us room to mix them
    const res = await githubFetch('https://api.github.com/repos/Axel-DaMage/joidy/issues?state=all&per_page=30', {
      next: { revalidate: 86400 },
    });

    if (!res.ok) {
      throw new Error(`GitHub API error: ${res.status}`);
    }

    const data = (await res.json()) as { pull_request?: unknown }[];

    // Separar Issues y PRs para forzar una mezcla equitativa si es posible
    const prs = data.filter((item) => !!item.pull_request);
    const issues = data.filter((item) => !item.pull_request);
    
    const mixed = [];
    const maxLength = Math.max(prs.length, issues.length);
    
    for (let i = 0; i < maxLength; i++) {
      if (issues[i]) mixed.push(issues[i]);
      if (prs[i]) mixed.push(prs[i]);
    }

    lastGood = mixed;
    return NextResponse.json(mixed);
  } catch (error) {
    console.error('Error fetching GitHub issues:', error);
    outageUntil = Date.now() + OUTAGE_TTL_MS;
    // Serve last-good data during the outage window instead of letting every
    // request re-hit GitHub.
    if (lastGood) return NextResponse.json(lastGood);
    return NextResponse.json({ error: 'Failed to fetch issues' }, { status: 500 });
  }
}
