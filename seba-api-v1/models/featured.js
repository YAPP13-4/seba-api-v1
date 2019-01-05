module.exports = (sequelize, DataTypes) => {
  return sequelize.define('featured', {
    type: {
      type: DataTypes.STRING(100)
    },
    time: {
      type: DataTypes.INTEGER
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
