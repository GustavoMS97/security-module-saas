/* eslint-disable no-unused-vars */

exports.routerFactory = ({ requestValidationModule } = {}) => {
  return {
    /**
     * @param {{ app: import('express').Express() }} app
     */
    apiRouter: ({ app }) => {
      app.use((error, req, res, next) => {
        app.use(requestValidationModule);
        return res.catch(error);
      });
    },
  };
};
