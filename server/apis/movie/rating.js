import Debug from 'debug';
const debug = Debug('Movie-Recommendation: api:controllers:movie:rating');
module.exports = async (req, res, next) => {

    try {
        const { id } = req.session && req.session.member;

        const { rating, MovieId } = req.body;

        const data = await db.Rating.create({
            MovieId,
            MemberId: id,
            rating,
        });

        return res.json({ data });

    } catch(err) {
        return next(err);
    }
};
