function resultMiddleware(req, res, next) {
    res.error = function error(code, message, data) {
        res.send({
            code,
            status: Number(code),
            message,
            data,
        });
    };
    res.success = function success(data, code = '200', message = 'success') {
        res.send({
            code,
            status: Number(code),
            message,
            data,
        });
    };
    next();
}

module.exports = resultMiddleware;
