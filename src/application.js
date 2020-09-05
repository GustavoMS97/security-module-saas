const { loadEnvironment } = require('./infra/config/environment');
const { apiFactory } = require('./infra/api/api');

const application = async () => {
  const { ENV } = loadEnvironment();

  const { startApi } = apiFactory({ ENV });
  const { app, server } = await startApi();
};

application();
