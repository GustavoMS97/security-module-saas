/**
 * @param {{ mongooseConnection: import('mongoose') }} param
 */
exports.UserFactory = ({ mongooseConnection } = {}) => {
  const UserSchema = new mongooseConnection.Schema({
    login: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, required: true },
    permissions: [
      {
        type: mongooseConnection.Schema.Types.ObjectId,
        ref: 'Permission',
      },
    ],
    is_client: {
      type: Boolean,
      default: false,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  });
  const User = mongooseConnection.model('User', UserSchema);

  return { User };
};
