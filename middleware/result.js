function resultMiddleware(req, res, next) {
    res.error = function error(code, message, data) {
        const result = {
            message,
            data,
        };
        if (typeof code === 'number') {
            result.status = code;
        } else {
            result.code = code;
        }
        res.send(result);
    };
    res.success = function success(data, code = '200', message = 'success') {
        if (typeof data === 'number') {
            res.send({
                status: data,
                message: code,
                data: message,
            });
        } else {
            res.send({
                code,
                message,
                data,
            });
        }
    };
    next();
}

module.exports = resultMiddleware;
