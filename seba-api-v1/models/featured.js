module.exports = (sequelize, DataTypes) => {
  return sequelize.define('featured', {
    type: {
      type: DataTypes.STRING(100)
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  }, {
    timestamps: false,
  });
};
