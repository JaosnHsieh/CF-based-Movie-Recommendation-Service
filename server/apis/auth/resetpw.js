import Debug from 'debug';
const debug = Debug('Movie-Recommendation: api:controllers:auth:resetpw');
module.exports = async (req, res, next) => {

    try {
        const data = req.body;
        const result = {};

        debug('result = %j', result);

        return res.json(result);

    } catch(err) {
        return next(err);
    }
};
