import Debug from 'debug';
import checkPassword from '../../libs/checkPassword';
const debug = Debug('Movie-Recommendation: api:controllers:auth:login');
module.exports = async (req, res, next) => {

    try {
        const { email, password } = req.body;

        if (!email) {
            throw new Error('10000');
        }

        const member = await db.Member.findOne({ email });

        if (!member) {
            throw new Error('10001');
        }

        const isEuqaPassword = checkPassword(member.hashedPassword, password);

        if (!isEuqaPassword) {
            throw new Error('10001');
        }

        debug('member = %j', member);

        req.session.member = {
            id: member.id,
            email: member.email,
            nickname: member.nickname
        };

        return res.json(member);

    } catch(err) {
        return next(err);
    }
};
