const path = require('path');
const Sequelize = require('sequelize');
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];
const db = {};

const sequelize = new Sequelize(config.database, config.username, config.password, config);

db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.User = require('./user')(sequelize, Sequelize);
db.Music = require('./music')(sequelize, Sequelize);
db.Playlist = require('./playlist')(sequelize, Sequelize);
db.Featured = require('./featured')(sequelize, Sequelize);
db.Comment = require('./comment')(sequelize, Sequelize);

db.User.hasMany(db.Music, {
  foreignKey: {
    name: 'userId',
    field: 'user_id'
  }
});
db.Music.belongsTo(db.User, {
  foreignKey: {
    name: 'userId',
    field: 'user_id'
  }
});

db.User.hasOne(db.Playlist, {
  foreignKey: {
    name: 'userId',
    field: 'user_id'
  }
});
db.Playlist.belongsTo(db.User, {
  foreignKey: {
    name: 'userId',
    field: 'user_id'
  }
});

db.User.hasMany(db.Comment, {
  foreignKey: {
    name: 'userId',
    field: 'user_id'
  }
});
db.Comment.belongsTo(db.User, {
  foreignKey: {
    name: 'userId',
    field: 'user_id'
  }
});

db.User.hasMany(db.Featured, {
  foreignKey: {
    name: 'userId',
    field: 'user_id'
  }
});
db.Featured.belongsTo(db.User, {
  foreignKey: {
    name: 'userId',
    field: 'user_id'
  }
});

db.Music.belongsToMany(db.Playlist, { through: 'playlist_music' });
db.Playlist.belongsToMany(db.Music, { through: 'playlist_music' });

db.Music.hasMany(db.Featured, {
  foreignKey: {
    name: 'musicId',
    field: 'music_id'
  }
});
db.Featured.belongsTo(db.Music, {
  foreignKey: {
    name: 'musicId',
    field: 'music_id'
  }
});

db.Music.hasMany(db.Comment, {
  foreignKey: {
    name: 'musicId',
    field: 'music_id'
  }
});
db.Comment.belongsTo(db.Music, {
  foreignKey: {
    name: 'musicId',
    field: 'music_id'
  }
});

module.exports = db;
