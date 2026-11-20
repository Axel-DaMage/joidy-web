// Shared helpers for upstream GitHub REST API calls from route handlers.
//
// - 5s timeout so a hung upstream can't tie up the function until the
//   platform timeout.
// - Explicit User-Agent, which GitHub requires for all API requests.
// - Optional GITHUB_TOKEN (see .env.example) raises the rate limit above the
//   unauthenticated 60 req/hr shared across Vercel egress IPs. The token is
//   only sent to GitHub — never logged or returned to clients.

const USER_AGENT = 'joidy-web (+https://github.com/Axel-DaMage/joidy-web)';
const UPSTREAM_TIMEOUT_MS = 5_000;

// How long routes should serve a cached fallback after an upstream failure
// before retrying GitHub, to avoid retry amplification during outages.
export const OUTAGE_TTL_MS = 60_000;

export function githubFetch(url: string, init: RequestInit = {}): Promise<Response> {
  const headers = new Headers(init.headers);
  headers.set('Accept', 'application/vnd.github.v3+json');
  headers.set('User-Agent', USER_AGENT);
  if (process.env.GITHUB_TOKEN) {
    headers.set('Authorization', `Bearer ${process.env.GITHUB_TOKEN}`);
  }
  return fetch(url, {
    ...init,
    headers,
    signal: AbortSignal.timeout(UPSTREAM_TIMEOUT_MS),
  });
}
