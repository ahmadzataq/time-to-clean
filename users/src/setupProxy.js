const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api/admin',
    createProxyMiddleware({
      target: 'https://time-to-clean-api.up.railway.app',
      changeOrigin: true,
    })
  );
};
