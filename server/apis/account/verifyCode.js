import Debug from 'debug';
const debug = Debug('Movie-Recommendation: api:controllers:account:verifyCode');
module.exports = async (req, res, next) => {

    try {
        const data = req.body;
        const result = {

        };
        return res.json(result);

    } catch(err) {
        return next(err);
    }
};
