const Express = require('express');
const Cors = require('cors');

exports.apiFactory = ({ ENV }) => {
  return {
    startApi: () => {
      return new Promise((resolve, reject) => {
        const app = Express();
        app.use(Express.json({ limit: '1mb' }));
        app.use(Cors());
        const server = app.listen(ENV.PORT, (serverError) => {
          if (serverError) {
            return reject(new Error('Não foi possivel inicializar o servidor'));
          }
          console.info(`Servidor iniciado em ${ENV.PORT}`);
          return resolve({ app, server });
        });
      });
    },
  };
};
