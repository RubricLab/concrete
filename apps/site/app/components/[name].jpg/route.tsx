import { ImageResponse } from 'next/og';

import { componentNames, parseState } from '@/lib/component-state';

export const runtime = 'edge';

export async function GET(request: Request, context: { params: Promise<Record<string, string>> }) {
  const name = (await context.params).name;
  if (!name || !componentNames.includes(name as (typeof componentNames)[number])) {
    return new Response('Not found', { status: 404 });
  }
  const url = new URL(request.url);
  const state = parseState(Object.fromEntries(url.searchParams));
  const content =
    name === 'button'
      ? state.label
      : name === 'input'
        ? state.value
        : name === 'badge'
          ? `${state.signal} · ${state.label}`
          : state.label;

  const image = new ImageResponse(
    <div
      style={{
        width: '100%',
        height: '100%',
        background: '#f7f8fa',
        color: '#0a0b0f',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        border: '1px solid #d7d9e0',
        borderRadius: '20px',
        fontFamily: 'Inter',
        fontSize: 42,
      }}
    >
      {name} · {content}
    </div>,
    { width: 1200, height: 630 }
  );

  return new Response(image.body, {
    headers: {
      'content-type': 'image/png',
      'cache-control': 'public, max-age=3600',
    },
  });
}
