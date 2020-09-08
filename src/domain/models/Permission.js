/**
 * @param {{ mongooseConnection: import('mongoose') }} param
 */
exports.PermissionFactory = ({ mongooseConnection } = {}) => {
  const PermissionSchema = new mongooseConnection.Schema({
    path: { type: String, required: true },
    method: { type: String, required: true },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  });
  const Permission = mongooseConnection.model('Permission', PermissionSchema);

  return { Permission };
};
