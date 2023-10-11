const Sequelize = require('sequelize');
const { blogSequelize } = require('../../config/sequelize');

const Tag = blogSequelize.define('tag', {
    title: {
        type: Sequelize.STRING,
    },
    color: {
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

module.exports = Tag;
