/* eslint-disable no-unused-vars */

exports.routerFactory = ({
  requestAuthenticationMiddleware,
  requestValidationMiddleware,
  createUserRoute,
  loginUserRoute,
} = {}) => {
  return {
    /**
     * @param {{ app: import('express').Express() }} app
     */
    apiRouter: ({ app }) => {
      app.post('/user', createUserRoute);
      app.post('/user/login', loginUserRoute);
      app.use(requestAuthenticationMiddleware);
      app.use(requestValidationMiddleware);
      app.use((error, req, res, next) => {
        return res.status(500).send({ message: error.message });
      });
    },
  };
};
