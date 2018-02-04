import Debug from 'debug';

const debug = Debug('Movie-Recommendation: api:controllers:member:update');
module.exports = async (req, res, next) => {

    try {
        const data = req.body;
        const formatData = qs.stringify(data);
        const { data: member } = await apiServ.patch('/member', formatData);

        debug('updated member = %j', member);

        return res.json(member);

    } catch(err) {
        return next(err);
    }
};
