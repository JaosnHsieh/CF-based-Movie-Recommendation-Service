import errorMapping from './errorCode';
module.exports = function(app) {

    app.use(function(err, req, res, next) {
        const errorFormat = errorMapping[err.message];

        let options = {};

        // 自定義的 error 處理
        if (errorFormat) {
            options = errorFormat;
        }

        // 其他底層錯誤處理
        if(!errorMessage && err && !err.errors) {
            options.statusCode = 503;
            options.message = err.message;
            options.stack = err.stack.split('\n');
        }

        console.log('-------------- ERROR --------------');
        console.log(options);
        console.log('-------------- ERROR --------------');

        res.status(options.statusCode);

        return res.json({
            statusCode: options.statusCode,
            message: options.message
        });
    });

    return function(req, res, next) {
        return next();
    };
};
