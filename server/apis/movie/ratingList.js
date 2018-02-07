import Debug from 'debug';
const debug = Debug('Movie-Recommendation: api:controllers:movie:ratingList');
module.exports = async (req, res, next) => {

    try {

        // const { id } = req.session && req.session.member || {};
        const id = 1;

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

        const pageData = {
        };

        return res.json({ data, pageData });

    } catch(err) {
        return next(err);
    }
};
