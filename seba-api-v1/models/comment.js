module.exports = (sequelize, DataTypes) => {
  return sequelize.define('comment', {
    content: {
      type: DataTypes.STRING(255)
    },
    selectedTime: {
      type: DataTypes.INTEGER,
      field: 'selected_time'
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
