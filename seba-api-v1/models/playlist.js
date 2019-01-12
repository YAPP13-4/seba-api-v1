module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
    'playlist',
    {
      id: {
        type: DataTypes.BIGINT,
        autoIncrement: true,
        primaryKey: true
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
        field: 'created_at'
      }
    },
    {
      timestamps: false
    }
  );
};
