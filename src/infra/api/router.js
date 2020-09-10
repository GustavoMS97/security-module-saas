/* eslint-disable no-unused-vars */

exports.routerFactory = ({ requestValidationModule, createUserRoute } = {}) => {
  return {
    /**
     * @param {{ app: import('express').Express() }} app
     */
    apiRouter: ({ app }) => {
      // app.use(requestValidationModule);
      app.post('/user', createUserRoute);
      app.use((error, req, res, next) => {
        return res.status(500).send({ message: error.message });
      });
    },
  };
};
