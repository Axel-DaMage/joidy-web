import { NextResponse } from 'next/server';

export const revalidate = 86400; // Cache for 24 hours

export async function GET() {
  try {
    const res = await fetch('https://api.github.com/repos/Axel-DaMage/Joidy/releases/latest', {
      headers: {
        'Accept': 'application/vnd.github.v3+json',
      },
      next: { revalidate: 86400 },
    });

    if (!res.ok) {
      if (res.status === 404) {
         return NextResponse.json({ version: 'v0.1.0-alpha' });
      }
      throw new Error(`GitHub API error: ${res.status}`);
    }

    const data = await res.json();
    return NextResponse.json({ version: data.tag_name || 'v0.1.0-alpha' });
  } catch (error) {
    console.error('Error fetching GitHub release:', error);
    return NextResponse.json({ version: 'v0.1.0-alpha' }, { status: 500 });
  }
}
