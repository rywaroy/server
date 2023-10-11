const Sequelize = require('sequelize');
const { blogSequelize } = require('../../config/sequelize');

const Admin = blogSequelize.define('admin', {
    account: {
        type: Sequelize.STRING,
    },
    password: {
        type: Sequelize.STRING,
    },
    token: {
        type: Sequelize.STRING,
    },
    name: {
        type: Sequelize.STRING,
    },
    avatar: {
        type: Sequelize.STRING,
    },
    time: {
        type: Sequelize.DATE,
    },
    last_time: {
        type: Sequelize.DATE,
    },
    location: {
        type: Sequelize.STRING,
    },
    last_location: {
        type: Sequelize.STRING,
    },
    createdAt: {
        type: Sequelize.DATE,
    },
    updatedAt: {
        type: Sequelize.DATE,
    },
});

module.exports = Admin;
