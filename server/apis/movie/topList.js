import Debug from 'debug';
import getTopList from '../../libs/getTopList';

const debug = Debug('Movie-Recommendation: api:controllers:movie:topList');
module.exports = async (req, res, next) => {

    try {
        const data = await getTopList();

        return res.json({ data });

    } catch(err) {
        return next(err);
    }
};
