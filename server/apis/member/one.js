import Debug from 'debug';
const debug = Debug('Movie-Recommendation: api:controllers:member:one');
module.exports = async (req, res, next) => {

    try {
        const { id } = req.session.member;

        let member = await db.Member.findById(id);

        debug('member = %j', member);

        return res.json(member);

    } catch(err) {
        return next(err);
    }
};
