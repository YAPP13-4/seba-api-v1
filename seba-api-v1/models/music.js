module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
    "music",
    {
      title: {
        type: DataTypes.STRING(100),
        allowNull: false
      },
      musician: {
        type: DataTypes.STRING(100),
        allowNull: false
      },
      musicianImg: {
        type: DataTypes.STRING(255),
        field: "musician_img"
      },
      description: {
        type: DataTypes.TEXT
      },
      artworkImg: {
        type: DataTypes.STRING(255),
        field: "artwork_img"
      },
      duration: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      streamUrl: {
        type: DataTypes.STRING(255),
        allowNull: false,
        field: "stream_url"
      },
      playCount: {
        type: DataTypes.INTEGER,
        field: "play_count"
      },
      createdAtSoundcloud: {
        type: DataTypes.DATE,
        field: "created_at_soundcloud"
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
