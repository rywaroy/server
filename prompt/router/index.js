const groupRouter = require('./group');
const promptRouter = require('./prompt');
const UserRouter = require('./user');
const ChatRouter = require('./chat');

function initRouter(app) {
    app.use('/prompt/api', groupRouter);
    app.use('/prompt/api', promptRouter);
    app.use('/prompt/api', UserRouter);
    app.use('/prompt/api', ChatRouter);
}

module.exports = initRouter;
