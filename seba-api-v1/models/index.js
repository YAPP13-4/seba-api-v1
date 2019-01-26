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

db.User.hasMany(db.Music);

db.User.hasOne(db.Playlist);
db.Playlist.belongsTo(db.User);

db.User.hasMany(db.Comment);
db.Comment.belongsTo(db.User);

db.User.hasMany(db.Featured);
db.Featured.belongsTo(db.User);

db.Music.belongsToMany(db.Playlist, { through: 'playlist_music' });
db.Playlist.belongsToMany(db.Music, { through: 'playlist_music' });

db.Music.hasMany(db.Featured);
db.Featured.belongsTo(db.Music);

db.Music.hasMany(db.Comment);
db.Comment.belongsTo(db.Music);

module.exports = db;
