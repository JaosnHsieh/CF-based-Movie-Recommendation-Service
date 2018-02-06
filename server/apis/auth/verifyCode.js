import Debug from 'debug';
import redis from '../../redis';
import mailer from '../../libs/mailer';

const debug = Debug('Movie-Recommendation: api:controllers:account:verifyCode');
module.exports = async (req, res, next) => {

    try {
        const { email } = req.body;
        const redisVerifyCodeKey = `verifyCode-${email}`;

        if (!email) {
            throw new Error('10000');
        }

        let verifyCode = await redis.getValue(redisVerifyCodeKey);

        if (!verifyCode) {
            verifyCode = Math.random().toString().slice(-6);
            await redis.setValue(redisVerifyCodeKey, verifyCode, 3600);
        }

        const mailOptions = {
            to: email,
            subject: 'CF Movie Recommendation: 您的信箱驗證碼',
            html: `
                您好，

                <p>您的信箱驗證碼為：${verifyCode}，提醒您原有操作還未結束，記得返回表單填寫<p>

                <p>若您沒有對本服務做相關操作，請忽略這封信，謝謝</p>

                CF based Movie Recommendation Service.
            `
        }

        const result = await mailer(mailOptions)

        return res.json(result);

    } catch(err) {
        return next(err);
    }
};
