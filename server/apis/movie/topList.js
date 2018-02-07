import Debug from 'debug';
import { sequelize } from '../../models';
import redis from '../../redis';

const debug = Debug('Movie-Recommendation: api:controllers:movie:topList');
module.exports = async (req, res, next) => {

    try {
        let data = await redis.getValue('top-list');

        if (data) {
            return res.json({ data });
        }

        data = await sequelize.query(`
            SELECT *
            FROM
              (SELECT id,
                      title,
                      genres,
                      avg(rating) AS rating,
                      count(id) AS people
               FROM Movie
               INNER JOIN Rating ON Movie.id = Rating.MovieId
               GROUP BY Movie.id) AS result
            WHERE people > 20
            ORDER BY result.rating DESC
            LIMIT 18
        `, { type: sequelize.QueryTypes.SELECT});

        await redis.setValue('top-list', data, 300);

        return res.json({ data });

    } catch(err) {
        return next(err);
    }
};
