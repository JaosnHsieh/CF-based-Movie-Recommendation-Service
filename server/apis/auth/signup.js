import Debug from 'debug';
import redis from '../../redis';
const debug = Debug('Movie-Recommendation: server:apis:auth:signup');
module.exports = async (req, res, next) => {

    try {
        const { verifyCode, email, password, confirmPassword } = req.body;
        const redisVerifyCodeKey = `verifyCode-${email}`;

        if (!email) {
            throw new Error('10000');
        }

        if (!password) {
            throw new Error('10003');
        }

        if (password !== confirmPassword) {
            throw new Error('10004');
        }


        const checkedVerifyCode = await redis.getValue(redisVerifyCodeKey);

        if (verifyCode !== checkedVerifyCode) {
            throw new Error('10005');
        }


        const checkUser = await db.Member.findOne({ where: { email }});

        if (checkUser) {
            throw new Error('10002');
        }



        const member = await db.Member.create({ email, password });

        await redis.removeValue(redisVerifyCodeKey);

        debug('signup member = %j', member);

        return res.json(member);

    } catch(err) {
        return next(err);
    }
};
