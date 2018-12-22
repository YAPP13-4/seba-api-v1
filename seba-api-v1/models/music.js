module.exports = (sequelize, DataTypes) => {
  return sequelize.define('music', {
    title: {
      type: DataTypes.STRING(100)
    },
    url: {
      type: DataTypes.STRING(255)
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
      field: 'created_at'
    },
  }, {
    timestamps: false,
  });
};
