const Sequelize = require('sequelize');
const { blogSequelize } = require('../../config/sequelize');

const AlbumGroup = blogSequelize.define('album_group', {
    album_id: {
        type: Sequelize.INTEGER,
    },
    url: {
        type: Sequelize.STRING,
    },
    createdAt: {
        type: Sequelize.DATE,
    },
    updatedAt: {
        type: Sequelize.DATE,
    },
});

module.exports = AlbumGroup;
