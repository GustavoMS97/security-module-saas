const joi = require('joi');

exports.createUserRouteFactory = ({ createUserWithPermissions } = {}) => {
  return {
    createUserRoute: async (req, res, next) => {
      try {
        const { value: reqBodyValues, error: envVarsValidationError } = joi
          .object()
          .keys({
            login: joi.string().required(),
            password: joi.string().required(),
            permissions: joi
              .array()
              .items(
                joi.object({
                  path: joi.string().required(),
                }),
              )
              .required(),
          })
          .required()
          .validate(req.body);
        if (envVarsValidationError) {
          throw envVarsValidationError;
        }
        const { login, password, permissions } = reqBodyValues;
        const user = await createUserWithPermissions({ login, password, permissions });
        return res.status(201).send(user);
      } catch (createUserApiError) {
        console.log(createUserApiError);
        next(createUserApiError);
      }
    },
  };
};
