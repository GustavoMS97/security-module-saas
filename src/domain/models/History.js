/**
 * @param {{ mongooseConnection: import('mongoose') }} param
 */
exports.HistoryFactory = ({ mongooseConnection } = {}) => {
  const HistorySchema = new mongooseConnection.Schema({
    path: { type: String, required: true },
    accessedAt: { type: Date, required: true },
    user: {
      type: mongooseConnection.Schema.Types.ObjectId,
      ref: 'User',
    },
    successful: {
      type: Boolean,
      required: true,
    },
  });
  const History = mongooseConnection.model('History', HistorySchema);

  return { History };
};
