const express = require('express');

const router = express.Router();
const isLogin = require('../middlewares/isLogin');
const Album = require('../model/album');
const AlbumGroup = require('../model/album_group');

router.post('/', isLogin, async (req, res) => {
    const { url, title } = req.body;
    await Album.create({
        title,
        img: url,
    });
    res.success(200, '添加成功');
});

router.delete('/:id', isLogin, async (req, res) => {
    const { id } = req.params;
    await Album.update(
        {
            state: 0,
        },
        {
            where: {
                id,
            },
        },
    );
    res.success(200, '删除成功');
});

router.get('/', async (req, res) => {
    const data = await Album.findAll({
        where: {
            state: 1,
        },
    });
    res.success(200, '获取成功', data);
});

router.post('/:id/group', isLogin, async (req, res) => {
    const { url } = req.body;
    const { id } = req.params;
    await AlbumGroup.create({
        url,
        album_id: id,
    });
    res.success(200, '添加成功');
});

router.delete('/group/:id', isLogin, async (req, res) => {
    const { id } = req.params;
    await AlbumGroup.destroy({
        where: {
            id,
        },
    });
    res.success(200, '删除成功');
});

router.get('/:id/group', async (req, res) => {
    const { id } = req.params;
    const data = await AlbumGroup.findAll({
        where: {
            album_id: id,
        },
    });
    res.success(200, '获取成功', data);
});

module.exports = router;
