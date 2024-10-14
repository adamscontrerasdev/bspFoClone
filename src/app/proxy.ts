import { NextApiRequest, NextApiResponse } from 'next';
import fetch from 'node-fetch';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    const { url } = req.query;

    if (!url || typeof url !== 'string') {
        res.status(400).json({ error: 'URL is required' });
        return;
    }

    try {
        const response = await fetch(url);
        if (!response.ok) {
            res.status(response.status).json({ error: response.statusText });
            return;
        }
        const buffer = await response.buffer();
        res.setHeader('Content-Type', response.headers.get('content-type'));
        res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
        res.send(buffer);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch image' });
    }
};

export default handler;
