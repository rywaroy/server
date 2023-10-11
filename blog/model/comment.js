const Sequelize = require('sequelize');
const { blogSequelize } = require('../../config/sequelize');

const Comment = blogSequelize.define('comment', {
    name: {
        type: Sequelize.TEXT,
    },
    content: {
        type: Sequelize.TEXT,
    },
    aid: {
        type: Sequelize.INTEGER,
    },
    createdAt: {
        type: Sequelize.DATE,
    },
    updatedAt: {
        type: Sequelize.DATE,
    },
});

module.exports = Comment;
