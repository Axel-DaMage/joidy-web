import { NextResponse } from 'next/server';

export const revalidate = 86400; // Cache for 24 hours

const LATEST_VERSION = 'v1.1.0-beta.7';
const REPO = 'Axel-DaMage/joidy';
const GH_HEADERS = { 'Accept': 'application/vnd.github.v3+json' };

export async function GET() {
  try {
    const res = await fetch(`https://api.github.com/repos/${REPO}/releases/latest`, {
      headers: GH_HEADERS,
      next: { revalidate: 86400 },
    });

    if (res.ok) {
      const data = await res.json();
      return NextResponse.json({ version: data.tag_name || LATEST_VERSION });
    }

    // 404 = no stable release yet (project ships beta tags) — fall back to latest tag
    if (res.status === 404) {
      const tagsRes = await fetch(`https://api.github.com/repos/${REPO}/tags?per_page=1`, {
        headers: GH_HEADERS,
        next: { revalidate: 86400 },
      });
      if (tagsRes.ok) {
        const tags = await tagsRes.json();
        if (Array.isArray(tags) && tags[0]?.name) {
          return NextResponse.json({ version: tags[0].name });
        }
      }
      return NextResponse.json({ version: LATEST_VERSION });
    }

    // Graceful degradation: the footer falls back to the same constant,
    // so report 200 rather than a misleading 500 with a valid payload.
    console.error(`GitHub API error: ${res.status}`);
    return NextResponse.json({ version: LATEST_VERSION });
  } catch (error) {
    console.error('Error fetching GitHub release:', error);
    return NextResponse.json({ version: LATEST_VERSION });
  }
}
