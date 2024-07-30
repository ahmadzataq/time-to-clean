const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/router/auth',
    createProxyMiddleware({
      target: 'http://zahid-server-be:3000',
      changeOrigin: true,
    })
  );
};