import Debug from 'debug';
const debug = Debug('Movie-Recommendation: api:controllers:member:updatepw');
module.exports = async (req, res, next) => {

    try {
        const member = req.session.member;

        const data = {
            id: member.id,
            oldPassword: '',
            newPassword: '',
            token: member.token
        };

        const result = {};

        debug('result = %j', result);

        return res.json(result);

    } catch(err) {
        return next(err);
    }
};
