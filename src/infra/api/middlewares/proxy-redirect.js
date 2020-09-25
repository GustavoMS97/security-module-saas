/**
 * @param {{ proxy: import('http-proxy') }} param
 */
exports.proxyRedirectMiddlewareFactory = ({ proxy } = {}) => {
  return {
    proxyRedirectMiddleware: (req, res, next) => {
      proxy.web(req, res, { buffer: req.bodyStream }, next);
    },
  };
};
