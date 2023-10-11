const Admin = require('../model/admin');

function isLogin(req, res, next) {
    const token = req.headers.authorization;
    if (!token) {
        res.error(403, '暂无权限');
    } else {
        Admin.findOne({
            where: {
                token,
            },
        }).then((data) => {
            if (data) {
                next();
            } else {
                res.error(401, '登录失效');
            }
        }).catch((err) => {
            console.error(err);
        });
    }
}

module.exports = isLogin;
