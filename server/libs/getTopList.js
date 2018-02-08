import { sequelize } from '../models';
import redis from '../redis';

module.exports = async (skip = 0, limit = 18) => {
    try {
        const data = await sequelize.query(`
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
            LIMIT :skip, :limit
        `, {
              replacements: {
                skip,
                limit,
              },
              type: sequelize.QueryTypes.SELECT
        });

        return Promise.resolve(data);

    } catch (err) {
        return Promise.reject(err);
    }
};
