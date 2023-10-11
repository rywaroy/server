const express = require('express');

const router = express.Router();
const uuid = require('uuid');
const Admin = require('../model/admin');

router.post('/login', async (req, res) => {
    const { account, password } = req.body;
    if (!account || !password) {
        res.error(400, '请输入账号或密码');
        return;
    }
    const data = await Admin.findOne({
        where: {
            account,
            password,
        },
    });
    if (!data) {
        res.error(400, '账号或密码错误');
        return;
    }
    const token = uuid.v4();
    await Admin.update({
        token,
    }, {
        where: {
            id: data.id,
        },
    });
    data.token = token;
    res.success(200, '登录成功', data);
});
