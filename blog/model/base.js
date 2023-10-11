const Sequelize = require('sequelize');
const { blogSequelize } = require('../../config/sequelize');

const Base = blogSequelize.define('base', {
    word: {
        type: Sequelize.TEXT,
    },
    createdAt: {
        type: Sequelize.DATE,
    },
    updatedAt: {
        type: Sequelize.DATE,
    },
});

module.exports = Base;
