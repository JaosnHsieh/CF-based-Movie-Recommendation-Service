import Debug from 'debug';
import { sequelize } from '../../models';
import redis from '../../redis';
import getTopList from '../../libs/getTopList';

const debug = Debug('Movie-Recommendation: api:controllers:movie:recommendList');
module.exports = async (req, res, next) => {

    try {
        const { page = 1 } = req.query;
        const { id } = req.session.member;
        const limit = 10
        const skip = (page - 1) * limit;

        const ratedList = await db.Rating.findAll({
            where: {
                MemberId: id
            },
            attributes: ["MovieId"]
        });

        const ratedIds = ratedList.map(movie => movie.MovieId);


        debug('ratedIds = %j', ratedIds);

        const topListItems = await getTopList(skip, limit);

        debug('topListItems = %j', topListItems);

        const data = topListItems.filter((movie)=>{
            return ratedIds.indexOf(movie.id) === -1;
        });

        return res.json({ data, page });

    } catch(err) {
        console.log(err, '!!');
        return next(err);
    }
};
