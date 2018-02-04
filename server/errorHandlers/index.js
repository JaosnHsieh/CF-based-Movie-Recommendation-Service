module.exports = function(app) {

    app.use(function(err, req, res, next) {
        let { data, status } = err.response ? err.response : err;
        if (typeof data === 'string'){
            data = { status, msg: data };
        }

        let errObject = {
            ...data, //include meesage & status code
        };

        console.log('-------------- ERROR --------------');
        console.log(errObject);
        console.log('-------------- ERROR --------------');

        res.status(errObject.Status || 500);

        return res.json(errObject);
    });

    return function(req, res, next) {
        return next();
    };
};
