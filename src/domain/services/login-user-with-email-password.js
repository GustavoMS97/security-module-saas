exports.loginUserWithEmailAndPasswordFactory = ({ User, createTokenForUser } = {}) => {
  return {
    loginUserWithEmailAndPassword: async ({ login, password } = {}) => {
      try {
        const user = await User.findOne({ login, password });
        if (user) {
          const { token } = await createTokenForUser({ id: user._id });
          return { token };
        }
        return false;
      } catch (loginUserError) {
        console.log(loginUserError);
        throw new Error('Erro ao logar usuario com login e senha');
      }
    },
  };
};
