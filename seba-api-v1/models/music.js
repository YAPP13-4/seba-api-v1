module.exports = (sequelize, DataTypes) => {
  return sequelize.define('music', {
    title: {
      type: DataTypes.STRING(100)
    },
    url: {
      type: DataTypes.STRING(255)
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
