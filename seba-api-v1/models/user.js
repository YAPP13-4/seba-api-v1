module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
    "user",
    {
      id: {
        type: DataTypes.BIGINT,
        autoIncrement: true,
        primaryKey: true
      },
      name: {
        type: DataTypes.STRING(20)
      },
      email: {
        type: DataTypes.STRING(100)
      },
      snsFacebook: {
        type: DataTypes.STRING(50)
      },
      snsInstagram: {
        type: DataTypes.STRING(50)
      },
      snsTwitter: {
        type: DataTypes.STRING(50)
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
        field: "created_at"
      }
    },
    {
      timestamps: false
    }
  );
};
