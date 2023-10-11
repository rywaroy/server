const Sequelize = require('sequelize');
const { blogSequelize } = require('../../config/sequelize');

const Album = blogSequelize.define('album', {
    title: {
        type: Sequelize.TEXT,
    },
    img: {
        type: Sequelize.STRING,
    },
    state: {
        type: Sequelize.INTEGER,
        defaultValue: 1,
    },
    createdAt: {
        type: Sequelize.DATE,
    },
    updatedAt: {
        type: Sequelize.DATE,
    },
});

module.exports = Album;
