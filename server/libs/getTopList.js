import { sequelize } from '../models';
import redis from '../redis';

module.exports = async () => {
    try {
        let data = await redis.getValue('top-list');

        if (data) {
            return Promise.resolve(data);
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


        return Promise.resolve(data);

    } catch (err) {
        return Promise.reject(err);
    }
};
