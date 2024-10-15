import fetch from 'node-fetch';

export default async function handler(req, res) {
  const { url } = req.query;

  if (!url) {
    return res.status(400).json({ error: 'URL is required' });
  }

  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const buffer = await response.buffer();
    res.setHeader('Content-Type', response.headers.get('content-type'));
    res.send(buffer);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Failed to fetch the image' });
  }
}
