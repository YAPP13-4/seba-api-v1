const path = require('path');
const Sequelize = require('sequelize');
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];

const sequelize = new Sequelize(config.database, config.username, config.password, config);

const User = require('./user')(sequelize, Sequelize);
const Music = require('./music')(sequelize, Sequelize);
const Playlist = require('./playlist')(sequelize, Sequelize);
const Featured = require('./featured')(sequelize, Sequelize);
const Comment = require('./comment')(sequelize, Sequelize);

module.exports = {
        dataInit: (sequelize) => {
        Music.create({
            title: 'title',
            musician: 'musician',
            streamUrl: 'streamUrl',
            duration: 10,
        });
    }
};