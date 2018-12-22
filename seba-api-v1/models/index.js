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


db.User.hasMany(db.Music, { as: 'Musics' });

db.User.hasOne(db.Playlist, { foreignKey: 'user_id', sourceKey: 'id'});
db.Playlist.belongsTo(db.User, { foreignKey: 'user_id', targetKey: 'id'});

db.User.hasMany(db.Comment, { foreignKey: 'user_id', sourceKey: 'id' });
db.Comment.belongsTo(db.User, { foreignkey: 'user_id', targetKey: 'id'});

db.Music.belongsToMany(db.Playlist, { through: 'playlist_music'});
db.Playlist.belongsToMany(db.Music, { through: 'playlist_music'});

db.Music.hasMany(db.Featured, { foreignKey: 'music_id' , sourceKey: 'id'});
db.Featured.belongsTo(db.Music, { foreignKey: 'music_id' , targetKey: 'id'});

db.Music.hasMany(db.Comment, { foreignKey: 'music_id' , sourceKey: 'id'});
db.Comment.belongsTo(db.Music, { foreignKey: 'music_id' , targetKey: 'id'});

module.exports = db;