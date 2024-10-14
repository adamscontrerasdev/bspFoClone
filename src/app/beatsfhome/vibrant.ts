// utils/vibrant.ts

import Vibrant from 'node-vibrant';

export async function extractColors(imageUrl: string): Promise<string[]> {
    const palette = await Vibrant.from(imageUrl).getPalette();
    const colors = Object.values(palette).map(sw => sw.getHex());
    return colors;
}
