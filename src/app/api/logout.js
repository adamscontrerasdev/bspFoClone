// src/app/api/logout.js
import { unsetAuthCookies } from 'next-firebase-auth';
import initAuth from '../../initAuth';

initAuth();

export default async function handler(req, res) {
    try {
        await unsetAuthCookies(req, res);
    } catch (e) {
        return res.status(500).json({ error: 'Unexpected error.' });
    }
    return res.status(200).json({ success: true });
}
