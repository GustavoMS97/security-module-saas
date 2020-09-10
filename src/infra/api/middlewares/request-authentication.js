const jwt = require('jsonwebtoken');

exports.requestAuthenticationMiddlewareFactory = ({ ENV } = {}) => {
  return {
    requestAuthenticationMiddleware: (req, res, next) => {
      const authHeader = req.headers.authorization;
      if (!authHeader) {
        return res.status(401).send({ error: 'No token provided.' });
      }
      const parts = authHeader.split(' ');
      if (!parts.length === 2) {
        return res.status(401).send({ error: 'Token error' });
      }
      const [scheme, token] = parts;
      if (!/^Bearer$/i.test(scheme)) {
        return res.status(401).send({ error: 'Token malformatted' });
      }
      new Promise((resolve, reject) => {
        jwt.verify(token, ENV.AUTH_SECRET, { algorithms: ['HS256'] }, (err, decoded) => {
          if (err) {
            reject(err);
          }
          req.data = decoded;
          resolve();
        });
      })
        .then(() => {
          return next();
        })
        .catch((err) => {
          next(err);
        });
    },
  };
};
