import fetch from 'node-fetch';

export default async function handler(req, res) {
  const { url } = req.query;

  if (!url) {
    return res.status(400).json({ error: 'URL is required' });
  }

  try {
    // Controlador de aborto para manejar el tiempo de espera
    const controller = new AbortController();
    const timeout = setTimeout(() => {
      controller.abort(); // Abortamos la solicitud si tarda más de 5 segundos
    }, 5000); // Tiempo de espera en milisegundos (5 segundos)

    // Realizamos la solicitud con el controlador de aborto
    const response = await fetch(url, { signal: controller.signal });

    clearTimeout(timeout); // Limpiamos el timeout si la solicitud fue exitosa

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const buffer = await response.buffer();
    res.setHeader('Content-Type', response.headers.get('content-type'));
    res.send(buffer);
  } catch (error) {
    if (error.name === 'AbortError') {
      console.error('Request timed out');
      return res.status(504).json({ error: 'Request timed out' });
    } else {
      console.error(error);
      return res.status(500).json({ error: 'Failed to fetch the image' });
    }
  }
}
