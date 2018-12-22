module.exports = (sequelize, DataTypes) => {
  return sequelize.define('comment', {
    content: {
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
