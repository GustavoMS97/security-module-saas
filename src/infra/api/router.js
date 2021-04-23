/* eslint-disable no-unused-vars */

exports.routerFactory = ({
  requestAuthenticationMiddleware,
  requestValidationMiddleware,
  proxyRedirectMiddleware,
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

      app.post('/testefb', async (req, res, next) => {
        try {
          console.log(req.signed_request);
          console.log(req.body.signed_request);
          return res.status(200).send();
        } catch (testefbError) {
          console.log('testefbError:', testefbError);
        }
      });

      app.use(requestAuthenticationMiddleware);
      app.use(requestValidationMiddleware);
      app.use(proxyRedirectMiddleware);
      app.use((error, req, res, next) => {
        return res.status(500).send({ message: error.message });
      });
    },
  };
};
