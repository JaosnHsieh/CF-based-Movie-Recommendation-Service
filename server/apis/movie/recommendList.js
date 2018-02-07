import Debug from 'debug';
import { sequelize } from '../../models';
import redis from '../../redis';
import getTopList from '../../libs/getTopList';

const debug = Debug('Movie-Recommendation: api:controllers:movie:recommendList');
module.exports = async (req, res, next) => {

    try {
        const { id } = req.session.member;

        const ratedList = await db.Rating.findAll({
            where: {
                MemberId: id
            },
            attributes: ["MovieId"]
        });

        const ratedIds = ratedList.map(movie => movie.MovieId);


        debug('ratedIds = %j', ratedIds);

        // temp to do this
        const topListItems = await getTopList();

        // const recommendALLIds = topListItems.map(movie => movie.id);

        const data = topListItems.filter((movie)=>{
            return ratedIds.indexOf(movie.id) === -1;
        });

        // const finalIds = recommendIds.slice(0, 20);

        // debug('finalIds = %j', finalIds);

        // const data = await sequelize.query(`
        //     SELECT id,
        //         title,
        //         genres,
        //         avg(rating) AS rating,
        //         count(id) AS people
        //     FROM Movie
        //     INNER JOIN Rating ON Movie.id = Rating.MovieId
        //     WHERE id IN (:ids) GROUP BY Movie.id
        // `, {
        //     replacements: { ids: finalIds },
        //     type: sequelize.QueryTypes.SELECT
        // });

        return res.json({ data });

    } catch(err) {
        return next(err);
    }
};
