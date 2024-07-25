const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/router/auth',
    createProxyMiddleware({
      target: 'https://time-to-clean-api.vercel.app',
      changeOrigin: true,
    })
  );
};