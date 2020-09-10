exports.createUserWithPermissionsFactory = ({ User, Permission } = {}) => {
  return {
    createUserWithPermissions: async ({ login, password, permissions } = {}) => {
      try {
        const createdPermissions = [];
        for (let i = 0; i < permissions.length; i++) {
          const permission = permissions[i];
          const createdPermission = await Permission.create(permission);
          createdPermissions.push(createdPermission);
        }
        const user = await User.create({ login, password, permissions: createdPermissions });
        return { user };
      } catch (error) {
        console.log(error);
        throw new Error('Nao foi possivel criar o usuário');
      }
    },
  };
};
