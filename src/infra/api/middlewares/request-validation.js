exports.requestValidationMiddlewareFactory = ({ ENV, User, createHistory } = {}) => {
  const getUserPermissions = async ({ id }) => {
    const user = await User.findOne({ _id: id }).populate('permissions');
    if (!user) {
      throw new Error('Usuário referenciado no token não encontrado');
    }
    const { permissions } = user;
    return { permissions, user };
  };

  return {
    requestValidationMiddleware: (req, res, next) => {
      const id = req.data.id;
      if (!id) {
        return res.status(401).send({ error: 'No user identified' });
      }
      getUserPermissions({ id })
        .then(({ permissions, user }) => {
          const { method, url } = req;
          const hasSuperPermission = permissions.filter(({ path }) => path.includes('*'));
          if (Array.isArray(hasSuperPermission) && hasSuperPermission.length > 0) {
            createHistory({ path: url, method, accessedAt: new Date(), successful: true, user });
            return res.redirect(`${ENV.CLIENT_BASE_URL}${url}`);
          }
          const filteredUrl = permissions.filter(({ path }) => url.includes(path));
          if (Array.isArray(filteredUrl) && filteredUrl.length > 0) {
            createHistory({ path: url, method, accessedAt: new Date(), successful: true, user });
            return res.redirect(`${ENV.CLIENT_BASE_URL}${url}`);
          } else {
            createHistory({ path: url, method, accessedAt: new Date(), successful: false, user });
          }
          return res.status(401).send({ error: 'No permissions identified' });
        })
        .catch((validationError) => {
          return res.status(401).send({ error: validationError.message });
        });
    },
  };
};
