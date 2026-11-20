import { ImageResponse } from 'next/og';
import { SITE_NAME } from '@/lib/site';

export const alt = 'Joidy — Personal Knowledge Management System';
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#000000',
          border: '2px solid #1a1a1a',
        }}
      >
        <div
          style={{
            fontSize: 120,
            fontFamily: 'monospace',
            fontWeight: 300,
            letterSpacing: '-0.04em',
            color: '#ffffff',
          }}
        >
          {SITE_NAME.toUpperCase()}
        </div>
        <div
          style={{
            marginTop: 24,
            fontSize: 32,
            fontFamily: 'monospace',
            color: '#888888',
          }}
        >
          Where your notes grow with you
        </div>
        <div
          style={{
            position: 'absolute',
            bottom: 48,
            fontSize: 22,
            fontFamily: 'monospace',
            color: '#555555',
          }}
        >
          XP · Skill Trees · Knowledge Graphs · AI Insights
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
