/* eslint-disable no-unused-vars */

exports.routerFactory = ({
  createUserRoute,
  loginUserRoute,
  requestAuthenticationMiddleware,
  requestValidationMiddleware,
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
      // app.get('/', (req, res) => {
      //   return res.redirect('/teste');
      // });
      app.use((error, req, res, next) => {
        return res.status(500).send({ message: error.message });
      });
    },
  };
};
