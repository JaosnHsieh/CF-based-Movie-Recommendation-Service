import Debug from 'debug';
const debug = Debug('Movie-Recommendation: api:controllers:movie:recommendList');
module.exports = async (req, res, next) => {

    try {
        const data = await db.Movie.findAll({
          limit: 12
        })

        const pageData = {
        };

        return res.json({ data, pageData });

    } catch(err) {
        return next(err);
    }
};
