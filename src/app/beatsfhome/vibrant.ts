// utils/vibrant.ts

import Vibrant from 'node-vibrant';

export async function extractColors(imageUrl: string): Promise<string[]> {
    const palette = await Vibrant.from(imageUrl).getPalette();
    
    // Filtrar los swatches que no son undefined
    const colors = Object.values(palette)
        .map(sw => sw?.getHex()) // Usa el operador de encadenamiento opcional
        .filter(hex => hex !== undefined) as string[]; // Filtrar valores undefined y hacer un asertion de tipo

    return colors;
}

