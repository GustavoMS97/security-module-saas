const Proxy = require('http-proxy');

exports.proxyFactory = ({ ENV } = {}) => {
  return {
    startProxy: () => {
      const proxyServer = Proxy.createProxyServer({
        target: ENV.CLIENT_BASE_URL,
        changeOrigin: true,
        xfwd: true,
        proxyTimeou: 10 * 1000,
      });
      proxyServer.on('proxyReq', (proxyReq, req, res) => {
        try {
          if (req.body) {
            const bodyData = JSON.stringify(req.body);
            proxyReq.setHeader('Content-Type', 'application/json');
            proxyReq.setHeader('Content-Length', Buffer.byteLength(bodyData));
            proxyReq.setHeader('Authorization', req.headers.authorization);
            proxyReq.write(bodyData);
          }
        } catch (proxyReqError) {
          console.log(proxyReqError);
          return res.status(500).send({ message: 'Internal server error' });
        }
      });
      return { proxy: proxyServer };
    },
  };
};
