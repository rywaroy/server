const express = require('express');
const xss = require('xss');
const isLogin = require('../middlewares/isLogin');
const Article = require('../model/article');
const Tag = require('../model/tag');
const Comment = require('../model/comment');

const router = express.Router();

// 获取文章标签
router.get('/tag', async (req, res) => {
    const list = await Tag.findAll({
        where: {
            state: 1,
        },
    });
    res.success(200, '获取成功', list);
});

// 添加文章标签
router.post('/tag', async (req, res) => {
    const { title, color } = req.body;
    if (!title || !color) {
        res.error(400, '请输入标题或颜色');
        return;
    }
    await Tag.create({
        title,
        color,
    });
    res.success(200, '添加成功');
});

// 删除文章标签
router.delete('/tag', isLogin, async (req, res) => {
    try {
        const { id } = req.body;
        if (!id) {
            res.error(400, '请输入标签id');
            return;
        }
        await Tag.update(
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
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

Article.belongsTo(Tag, {
    foreignKey: 'tagid',
});

// 获取文章列表
router.get('/', async (req, res) => {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const data = await Article.findAndCountAll({
        attributes: [
            'id',
            'title',
            'updatedAt',
            'intro',
            'top',
            'watch',
            'likes',
            'img',
            'createdAt',
        ],
        limit,
        offset: (page - 1) * limit,
        where: {
            state: 1,
        },
        order: [['top', 'DESC']],
        include: [
            {
                model: Tag,
                as: 'tag',
                attributes: ['title', 'color'],
            },
        ],
    });
    res.success(200, '获取成功', {
        list: data.rows,
        total: data.count,
    });
});

// 获取文章详情
router.get('/:id', async (req, res) => {
    const { id } = req.params;
    if (!id) {
        res.error(400, '请输入文章id');
        return;
    }
    const data = await Article.findByPk(id, {
        include: [
            {
                model: Tag,
                as: 'tag',
                attributes: ['title', 'color'],
            },
        ],
    });
    if (data) {
        await Article.update(
            {
                watch: ++data.watch,
            },
            {
                where: {
                    id,
                },
            },
        );
    }
    res.success(200, '获取成功', data);
});

// 删除文章
router.delete('/:id', isLogin, async (req, res) => {
    const { id } = req.params;
    if (!id) {
        res.error(400, '请输入文章id');
        return;
    }
    await Article.update(
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

// 添加文章
router.post('/', isLogin, async (req, res) => {
    const { title, intro, content, tagid } = req.body;
    await Article.create({
        title,
        intro,
        content,
        tagid,
    });
    res.success(200, '添加成功');
});

// 设置文章置顶
router.post('/top', isLogin, async (req, res) => {
    const { id, top } = req.body;
    if (!id) {
        res.error(400, '请输入标签id');
        return;
    }
    await Article.update(
        {
            top,
        },
        {
            where: {
                id,
            },
        },
    );
    res.success(200, '设置成功');
});

// 更新文章
router.patch('/:id', isLogin, async (req, res) => {
    const { id } = req.params;
    const { title, intro, content, tagid } = req.body;
    await Article.update(
        {
            title,
            intro,
            content,
            tagid,
        },
        {
            where: {
                id,
            },
        },
    );
    res.success(200, '更新成功');
});

function DataLength(fData) {
    let intLength = 0;
    for (let i = 0; i < fData.length; i++) {
        if (fData.charCodeAt(i) < 0 || fData.charCodeAt(i) > 255) {
            intLength += 2;
        } else {
            intLength += 1;
        }
    }
    return intLength;
}

// 添加文章评论
router.post('/:id/comment', async (req, res) => {
    const { id } = req.params;
    const name = xss(req.body.name) || '匿名';
    const content = xss(req.body.content);
    const ip = `${req.headers['x-forward-for'].substring(0, 10)}**`;
    if (DataLength(name) > 12 || DataLength(content) > 1000) {
        res.error(400, '字数超过限制');
        return;
    }
    await Comment.create({
        name: `${name} ${ip}`,
        content,
        aid: id,
    });
    res.success(200, '添加成功');
});

// 获取文章评论
router.get('/:id/comment', async (req, res) => {
    const { id } = req.params;
    const data = await Comment.findAll({
        where: {
            aid: id,
        },
    });
    res.success(200, '获取成功', data);
});

// 点赞
router.post('/:id/like', async (req, res) => {
    const { id } = req.params;
    const data = await Article.findByPk(id);
    if (data) {
        await Article.update(
            {
                likes: ++data.likes,
            },
            {
                where: {
                    id,
                },
            },
        );
    }
    res.success(200, '点赞成功成功');
});

module.exports = router;
