const Sequelize = require('sequelize');

const promptSequelize = new Sequelize('prompt', process.env.MYSQL_ACCOUNT, process.env.MYSQL_PASSWORD, {
    host: 'localhost',
    port: 3306,
    dialect: 'mysql',
});

const blogSequelize = new Sequelize('blog', process.env.MYSQL_ACCOUNT, process.env.MYSQL_PASSWORD, {
    host: 'localhost',
    port: 3306,
    dialect: 'mysql',
});

promptSequelize
    .authenticate()
    .then(() => {
        console.log('Connection has been established successfully.');
    })
    .catch((err) => {
        console.error('Unable to connect to the database:', err);
    });

blogSequelize
    .authenticate()
    .then(() => {
        console.log('Connection has been established successfully.');
    })
    .catch((err) => {
        console.error('Unable to connect to the database:', err);
    });

module.exports = {
    promptSequelize,
    blogSequelize,
};
