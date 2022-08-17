const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = app => {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'http://hoteler-react.damingerdai.com',
      changeOrigin: true
    })
  );
};
