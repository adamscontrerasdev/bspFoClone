const { createServer } = require('http');
const { parse } = require('url');
const next = require('next');
const { createProxyMiddleware } = require('http-proxy-middleware');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
    const server = createServer((req, res) => {
        const parsedUrl = parse(req.url, true);

        if (parsedUrl.pathname === '/api/proxy') {
            const targetUrl = decodeURIComponent(parsedUrl.query.url);
            const proxyMiddleware = createProxyMiddleware({
                target: targetUrl,
                changeOrigin: true,
                pathRewrite: {
                    '^/api/proxy': '',
                },
                onProxyReq(proxyReq, req, res) {
                    proxyReq.setHeader('Origin', targetUrl);
                },
            });

            proxyMiddleware(req, res, (result) => {
                if (result instanceof Error) {
                    res.writeHead(500, { 'Content-Type': 'text/plain' });
                    res.end('Proxy error');
                }
            });
        } else {
            handle(req, res, parsedUrl);
        }
    });

    server.listen(3000, (err) => {
        if (err) throw err;
        console.log('> Ready on http://localhost:3000');
    });
});
