import { NextResponse } from 'next/server';
import { LATEST_VERSION } from '@/lib/version';
import { githubFetch, OUTAGE_TTL_MS } from '@/lib/github';

export const revalidate = 86400; // Cache for 24 hours
const REPO = 'Axel-DaMage/joidy';

// Best-effort, per-instance fallback state. Module state is not shared
// across serverless instances or cold starts, but it still stops a burst of
// client requests from each triggering a new GitHub call during an outage.
let lastGoodVersion: string | null = null;
let outageUntil = 0;

function versionResponse(version: string, status = 200) {
  return NextResponse.json({ version }, { status });
}

export async function GET() {
  if (Date.now() < outageUntil) {
    if (lastGoodVersion) return versionResponse(lastGoodVersion);
    return versionResponse(LATEST_VERSION, 500);
  }

  try {
    const res = await githubFetch(`https://api.github.com/repos/${REPO}/releases/latest`, {
      next: { revalidate: 86400 },
    });

    if (res.ok) {
      const data = await res.json();
      const version = data.tag_name || LATEST_VERSION;
      lastGoodVersion = version;
      return versionResponse(version);
    }

    // 404 = no stable release yet (project ships beta tags) — fall back to latest tag
    if (res.status === 404) {
      const tagsRes = await githubFetch(`https://api.github.com/repos/${REPO}/tags?per_page=1`, {
        next: { revalidate: 86400 },
      });
      if (tagsRes.ok) {
        const tags = await tagsRes.json();
        if (Array.isArray(tags) && tags[0]?.name) {
          lastGoodVersion = tags[0].name;
          return versionResponse(tags[0].name);
        }
      }
      lastGoodVersion = LATEST_VERSION;
      return versionResponse(LATEST_VERSION);
    }

    // Graceful degradation: the footer falls back to the same constant,
    // so report 200 rather than a misleading 500 with a valid payload.
    console.error(`GitHub API error: ${res.status}`);
    return NextResponse.json({ version: LATEST_VERSION });
  } catch (error) {
    console.error('Error fetching GitHub release:', error);
    outageUntil = Date.now() + OUTAGE_TTL_MS;
    // Serve last-good data during the outage window instead of letting every
    // request re-hit GitHub.
    if (lastGoodVersion) return versionResponse(lastGoodVersion);
    return versionResponse(LATEST_VERSION, 500);
  }
}
