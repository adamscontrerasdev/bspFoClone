const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = {
  // Vercel maneja la salida de forma automática, no necesitas especificar 'distDir'
  images: {
    domains: ['lh3.googleusercontent.com'], // Mantener los dominios para las imágenes
  },
  async rewrites() {
    return [
      {
        source: '/api/proxy',
        destination: '/api/proxy', // Puedes mantener esta regla si es necesaria
      },
    ];
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Cross-Origin-Opener-Policy',
            value: 'same-origin', // Mantén los headers de seguridad si los necesitas
          },
          {
            key: 'Cross-Origin-Embedder-Policy',
            value: 'require-corp',
          },
        ],
      },
    ];
  },
};
