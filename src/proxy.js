const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'https://localhost:8080', // Replace with your ASP.NET API URL
      changeOrigin: true,
    })
  );
};