const express = require('express');
const fs = require('fs');
const path = require('path');
const article = require('./article');
const admin = require('./admin');
const album = require('./album');
const base = require('./base');

const router = express.Router();

router.get('/admin', async (req, res) => {
    const htmlFile = await (new Promise((resolve, reject) => {
        fs.readFile(path.join(__dirname, '../', './admin/index.html'), (err, data) => {
            if (err) {
                reject(err);
            } else {
                resolve(data);
            }
        });
    }));
    res.type('text/html;charset=utf-8');
    res.send(htmlFile);
});

router.get('/', async (req, res, next) => {
    if (req.path.indexOf('api') > -1) {
        next();
    } else {
        const deviceAgent = req.headers['user-agent'].toLowerCase();
        const agentID = deviceAgent.match(/(iphone|ipod|ipad|android)/);
        const htmlFile = await (new Promise((resolve, reject) => {
            fs.readFile(path.join(__dirname, '../', `./${agentID ? 'mobile' : 'pc'}/index.html`), (err, data) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(data);
                }
            });
        }));
        res.type('text/html;charset=utf-8');
        res.send(htmlFile);
    }
});

router.get('*', async (req, res, next) => {
    if (res.statusCode === 404 && req.path.indexOf('api') === -1) {
        const deviceAgent = req.headers['user-agent'].toLowerCase();
        const agentID = deviceAgent.match(/(iphone|ipod|ipad|android)/);
        const htmlFile = await (new Promise((resolve, reject) => {
            fs.readFile(path.join(__dirname, '../', `./${agentID ? 'mobile' : 'pc'}/index.html`), (err, data) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(data);
                }
            });
        }));
        res.type('text/html;charset=utf-8');
        res.send(htmlFile);
    } else {
        next();
    }
});

function initBlogRouter(app) {
    app.use('/blog/api/article', article);
    app.use('/blog/api/admin', admin);
    app.use('/blog/api/album', album);
    app.use('/blog/api/base', base);
    app.use('/blog', router);
}

module.exports = initBlogRouter;
