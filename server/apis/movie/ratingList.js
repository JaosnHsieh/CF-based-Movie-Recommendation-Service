import Debug from 'debug';
const debug = Debug('Movie-Recommendation: api:controllers:movie:ratingList');
module.exports = async (req, res, next) => {

    try {
        const { id } = req.session.member;

        const data = await db.Rating.findAll({
            where: {
                MemberId: id
            },
            attributes: ["MovieId", "rating"],
            include: [{
                model: db.Movie,
                attributes: ["title"],
                required: true
            }],
            limit: 12
        });
        return res.json({ data });

    } catch(err) {
        return next(err);
    }
};
