import fetch from 'node-fetch';

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const url = searchParams.get('url');

  if (!url) {
    return new Response(JSON.stringify({ error: 'URL is required' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const buffer = await response.buffer();
    return new Response(buffer, {
      status: 200,
      headers: { 'Content-Type': response.headers.get('content-type') },
    });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: 'Failed to fetch the image' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
