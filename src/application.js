const { loadEnvironment } = require('./infra/config/environment');
const { apiFactory } = require('./infra/api/api');
const { connectToMongoose } = require('./infra/db/mongoose');

const { PermissionFactory } = require('./domain/models/Permission');
const { UserFactory } = require('./domain/models/User');
const { HistoryFactory } = require('./domain/models/History');
const { createUserRouteFactory } = require('./infra/api/routes/create-user');
const { routerFactory } = require('./infra/api/router');
const { createUserWithPermissionsFactory } = require('./domain/services/create-user-with-permissions');

const application = async () => {
  const { ENV } = loadEnvironment();

  const { startApi } = apiFactory({ ENV });
  const { mongooseConnection } = await connectToMongoose({ ENV });

  const { Permission } = PermissionFactory({ mongooseConnection });
  const { User } = UserFactory({ mongooseConnection });
  const { History } = HistoryFactory({ mongooseConnection });

  const { createUserWithPermissions } = createUserWithPermissionsFactory({ User, Permission });

  const { createUserRoute } = createUserRouteFactory({ createUserWithPermissions });

  const { app } = await startApi();

  const { apiRouter } = routerFactory({ requestValidationModule: undefined, createUserRoute });

  apiRouter({ app });
};

application();
