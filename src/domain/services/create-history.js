exports.createHistoryFactory = ({ History } = {}) => {
  return {
    createHistory: async ({ path, accessedAt, successful, user } = {}) => {
      try {
        await History.create({
          path,
          accessedAt,
          successful,
          user,
        });
      } catch (historyCreationError) {
        console.log(historyCreationError);
        throw new Error('Não foi possível criar o histórico da chamada.');
      }
    },
  };
};
