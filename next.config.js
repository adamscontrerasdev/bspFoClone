const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = {
    distDir: 'out',
    async rewrites() {
        return [
            {
                source: '/api/proxy',
                destination: '/api/proxy', // Matched parameters can be used in the destination
            },
        ];
    },
    async devServerMiddleware(devServer) {
        if (devServer) {
            devServer.app.use(
                '/api/proxy',
                createProxyMiddleware({
                    target: 'https://your-target-url.com',
                    changeOrigin: true,
                    pathRewrite: {
                        '^/api/proxy': '',
                    },
                })
            );
        }
    },
};
