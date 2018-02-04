import Debug from 'debug';
const debug = Debug('Movie-Recommendation: api:controllers:auth:login');
module.exports = async (req, res, next) => {

    try {
        const data = req.body;
        const member = {
            token: '',
        };

        req.session.member = member;

        debug('member = %j', member);

        return res.json(member);

    } catch(err) {
        return next(err);
    }
};
