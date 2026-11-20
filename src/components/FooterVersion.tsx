import { LATEST_VERSION } from '@/lib/version';
import { githubFetch } from '@/lib/github';

const REPO = 'Axel-DaMage/joidy';

/**
 * Server-rendered latest release tag for the footer.
 * Mirrors /api/github/version: latest release, falling back to the newest
 * tag when only prereleases exist, then a hardcoded version.
 */
export async function FooterVersion() {
  let version = LATEST_VERSION;

  try {
    const res = await githubFetch(`https://api.github.com/repos/${REPO}/releases/latest`, {
      next: { revalidate: 86400 },
    });

    if (res.ok) {
      const data = (await res.json()) as { tag_name?: string } | null;
      if (typeof data?.tag_name === 'string' && data.tag_name) {
        version = data.tag_name;
      }
    } else if (res.status === 404) {
      // 404 = no stable release yet (project ships beta tags) — fall back to latest tag
      const tagsRes = await githubFetch(`https://api.github.com/repos/${REPO}/tags?per_page=1`, {
        next: { revalidate: 86400 },
      });
      if (tagsRes.ok) {
        const tags = (await tagsRes.json()) as { name?: string }[] | null;
        if (Array.isArray(tags) && typeof tags[0]?.name === 'string') {
          version = tags[0].name;
        }
      }
    }
  } catch {
    // Network/GitHub failure — keep the hardcoded fallback version
  }

  return <>{version}</>;
}
