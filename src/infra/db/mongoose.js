const mongoose = require('mongoose');

exports.connectToMongoose = async ({ ENV }) => {
  try {
    const mongooseConnection = await mongoose.connect(ENV.MONGO_DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      autoIndex: false,
    });
    mongooseConnection.Promise = global.Promise;
    mongooseConnection.set('useFindAndModify', true);

    return { mongooseConnection };
  } catch (mongooseConnectionError) {
    console.log(mongooseConnectionError);
    throw new Error('Erro ao se conectar com mongoose');
  }
};
