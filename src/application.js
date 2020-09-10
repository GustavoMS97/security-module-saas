const { loadEnvironment } = require('./infra/config/environment');
const { apiFactory } = require('./infra/api/api');
const { connectToMongoose } = require('./infra/db/mongoose');

const { PermissionFactory } = require('./domain/models/Permission');
const { UserFactory } = require('./domain/models/User');
const { HistoryFactory } = require('./domain/models/History');
const { createUserRouteFactory } = require('./infra/api/routes/create-user');
const { routerFactory } = require('./infra/api/router');
const { createUserWithPermissionsFactory } = require('./domain/services/create-user-with-permissions');
const { requestAuthenticationMiddlewareFactory } = require('./infra/api/middlewares/request-authentication');
const { createTokenForUserFactory } = require('./domain/services/create-user-token');
const { loginUserWithEmailAndPasswordFactory } = require('./domain/services/login-user-with-email-password');
const { loginUserRouteFactory } = require('./infra/api/routes/login-user');

const application = async () => {
  try {
    const { ENV } = loadEnvironment();

    const { startApi } = apiFactory({ ENV });
    const { mongooseConnection } = await connectToMongoose({ ENV });

    const { Permission } = PermissionFactory({ mongooseConnection });
    const { User } = UserFactory({ mongooseConnection });
    const { History } = HistoryFactory({ mongooseConnection });

    const { requestAuthenticationMiddleware } = requestAuthenticationMiddlewareFactory({ ENV });

    const { createUserWithPermissions } = createUserWithPermissionsFactory({ User, Permission });
    const { createTokenForUser } = createTokenForUserFactory({ ENV });
    const { loginUserWithEmailAndPassword } = loginUserWithEmailAndPasswordFactory({ User, createTokenForUser });

    const { createUserRoute } = createUserRouteFactory({ createUserWithPermissions });
    const { loginUserRoute } = loginUserRouteFactory({ loginUserWithEmailAndPassword });

    const { app } = await startApi();

    const { apiRouter } = routerFactory({ createUserRoute, loginUserRoute, requestAuthenticationMiddleware });

    apiRouter({ app });
  } catch (applicationError) {
    console.log(applicationError);
  }
};

application();
