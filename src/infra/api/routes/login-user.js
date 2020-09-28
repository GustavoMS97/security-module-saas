const joi = require('joi');

exports.loginUserRouteFactory = ({ loginUserWithEmailAndPassword } = {}) => {
  return {
    loginUserRoute: async (req, res, next) => {
      try {
        const { value: reqBodyValues, error: envVarsValidationError } = joi
          .object()
          .keys({
            login: joi.string().required(),
            password: joi.string().required(),
          })
          .required()
          .validate(req.body);
        if (envVarsValidationError) {
          throw envVarsValidationError;
        }
        const { login, password } = reqBodyValues;
        const { token } = await loginUserWithEmailAndPassword({ login, password });
        if (token) {
          return res.status(200).send({ token: `Bearer ${token}` });
        }
        return res.status(401).send({ error: 'Not allowed' });
      } catch (loginUserApiError) {
        console.log(loginUserApiError);
        next(loginUserApiError);
      }
    },
  };
};
