module.exports = {
  images: {
    domains: [
      'lh3.googleusercontent.com',
      'ep00.epimg.net',
      'lahiguera.net', // Asegúrate de incluir cualquier otro dominio que necesites
    ],
    unoptimized: true,
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Cross-Origin-Opener-Policy',
            value: 'same-origin',
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
