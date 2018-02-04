import Debug from 'debug';
import qs from 'qs';
const debug = Debug('Movie-Recommendation: server:apis:auth:signup');
module.exports = async (req, res, next) => {

    try {
        const data = req.body;

        const member = {};

        debug('signup member = %j', member);

        return res.json(member);

    } catch(err) {
        return next(err);
    }
};
