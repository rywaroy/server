const express = require('express');

const router = express.Router();
const Base = require('../model/base');
const isLogin = require('../middlewares/isLogin');

router.post('/content', isLogin, async (req, res) => {
    const { word } = req.body;
    await Base.update({
        word,
    }, {
        where: {
            id: 1,
        },
    });
    res.success(200, '获取成功');
});

router.get('/content', async (req, res) => {
    const data = await Base.findAll();
    res.success(200, '获取成功', data[0]);
});

module.exports = router;
