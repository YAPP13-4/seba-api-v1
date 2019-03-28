module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
    'user',
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
        type: DataTypes.STRING(50),
        field: 'sns_facebook'
      },
      snsInstagram: {
        type: DataTypes.STRING(50),
        field: 'sns_instagram'
      },
      snsTwitter: {
        type: DataTypes.STRING(50),
        field: 'sns_twitter'
      },  
      snsKakao: {
        type: DataTypes.STRING(50),
        field: 'sns_kakao'
      },
      profileImg: {
        type: DataTypes.STRING(255),
        field: 'profile_img'
      },
      backgroundImg: {
        type: DataTypes.STRING(255),
        field: 'background_img'
      },
      description: {
        type: DataTypes.STRING(255)
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
