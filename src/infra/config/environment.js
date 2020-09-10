const env = require('dotenv');
const joi = require('joi');

const ENV_MODE = Object.freeze({
  DEVELOPMENT: 'development',
  PRODUCTION: 'production',
  TEST: 'test',
});

exports.loadEnvironment = () => {
  const { parsed: rawEnvVars, error: envVarsLoadError } = env.config();
  if (envVarsLoadError) {
    throw envVarsLoadError;
  }

  const { value: envVars, error: envVarsValidationError } = joi
    .object()
    .keys({
      NODE_ENV: joi
        .string()
        .default(ENV_MODE.DEVELOPMENT)
        .valid(...Object.values(ENV_MODE)),
      API_SERVER_PORT: joi.number().port().required(),
      API_SECRET_KEY: joi.string().required(),
      MONGO_DB_URL: joi.string().required(),
      AUTH_SECRET: joi.string().required(),
      TOKEN_EXPIRATION: joi.number().required(),
    })
    .required()
    .validate(rawEnvVars);
  if (envVarsValidationError) {
    throw envVarsValidationError;
  }
  return { ENV: envVars };
};
