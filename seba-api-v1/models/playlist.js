module.exports = (sequelize, DataTypes) => {
  return sequelize.define('playlist', {
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  }, {
    timestamps: false,
  });
};
