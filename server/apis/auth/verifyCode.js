import Debug from 'debug';
import redis from '../../../redis';

const debug = Debug('Movie-Recommendation: api:controllers:account:verifyCode');
module.exports = async (req, res, next) => {

    try {
        const { email } = req.body;
        const redisVerifyCodeKey = `verifyCode-${email}`;

        if (!email) {
            throw new Error('10000');
        }

        const checkUser = await db.Member.findOne({ where: { email }});

        if (checkUser) {
            throw new Error('10002');
        }

        let verifyCode = await redis.getValue(redisVerifyCodeKey);
        if (!verifyCode) {
            verifyCode = Math.random().toString().slice(-6);
            await redis.setValue(redisVerifyCodeKey, verifyCode, 3600);
        }

        // send email

        return res.json();

    } catch(err) {
        return next(err);
    }
};
