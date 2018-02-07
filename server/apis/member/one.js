import Debug from 'debug';
const debug = Debug('Movie-Recommendation: api:controllers:member:one');
module.exports = async (req, res, next) => {

    try {
        const { id } = req.session.member;
        const member = db.Member.findById(id);

        // const member = {
        //   account: 'ali.li@nownews.com',
        //   nickname: 'ali',
        //   birthday: '2017-01-01'
        // };

        debug('member = %j', member);

        return res.json(member);

    } catch(err) {
        return next(err);
    }
};
