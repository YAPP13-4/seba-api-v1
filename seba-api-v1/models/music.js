module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
    'music',
    {
      id: {
        type: DataTypes.BIGINT,
        autoIncrement: true,
        primaryKey: true
      },
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
        field: 'musician_img'
      },
      description: {
        type: DataTypes.TEXT
      },
      lylic: {
        type: DataTypes.TEXT
      },
      artworkImg: {
        type: DataTypes.STRING(255),
        field: 'artwork_img'
      },
      duration: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      url: {
        type: DataTypes.STRING(255),
        allowNull: false,
        unique: true,
        field: 'url'
      },
      streamUrl: {
        type: DataTypes.STRING(255),
        allowNull: false,
        field: 'stream_url'
      },
      playCount: {
        type: DataTypes.INTEGER,
        field: 'play_count'
      },
      createdAtSoundcloud: {
        type: DataTypes.DATE,
        field: 'created_at_soundcloud'
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
    },
    {
      indexes: [
        // Create a unique index
        {
          unique: true,
          fields: ['url']
        }
      ]
    }
  );
};
