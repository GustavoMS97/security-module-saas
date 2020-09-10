const jwt = require('jsonwebtoken');

exports.createTokenForUserFactory = ({ ENV } = {}) => {
  return {
    createTokenForUser: ({ id } = {}) => {
      const token = jwt.sign({ id }, ENV.AUTH_SECRET, {
        expiresIn: ENV.TOKEN_EXPIRATION,
        algorithm: 'HS256',
      });
      return { token: token };
    },
  };
};
