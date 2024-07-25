const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/router/auth',
    createProxyMiddleware({
      target: 'https://time-to-clean-api.up.railway.app',
      changeOrigin: true,
    })
  );
};