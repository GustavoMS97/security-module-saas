exports.createUserWithPermissionsFactory = ({ User, Permission } = {}) => {
  return {
    createUserWithPermissions: async ({ login, password, permissions, is_client } = {}) => {
      try {
        const createdPermissions = [];
        let userToCreate = { login, password };
        if (permissions) {
          for (let i = 0; i < permissions.length; i++) {
            const permission = permissions[i];
            const createdPermission = await Permission.create(permission);
            createdPermissions.push(createdPermission);
          }
          userToCreate = { ...userToCreate, permissions: createdPermissions };
        } else if (is_client) {
          const createdPermission = await Permission.create({ path: '*' });
          userToCreate = { ...userToCreate, is_client, permissions: [createdPermission] };
        }
        const user = await User.create(userToCreate);
        return { user };
      } catch (error) {
        console.log(error);
        throw new Error('Nao foi possivel criar o usuário');
      }
    },
  };
};
