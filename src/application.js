const { loadEnvironment } = require('./infra/config/environment');
const { apiFactory } = require('./infra/api/api');
const { connectToMongoose } = require('./infra/db/mongoose');

const { PermissionFactory } = require('./domain/models/Permission');
const { UserFactory } = require('./domain/models/User');
const { HistoryFactory } = require('./domain/models/History');

const application = async () => {
  const { ENV } = loadEnvironment();

  const { startApi } = apiFactory({ ENV });
  const { mongooseConnection } = await connectToMongoose({ ENV });

  const { Permission } = PermissionFactory({ mongooseConnection });
  const { User } = UserFactory({ mongooseConnection });
  const { History } = HistoryFactory({ mongooseConnection });

  const { app, server } = await startApi();
};

application();
