import Debug from 'debug';

const debug = Debug('Movie-Recommendation: api:controllers:movie:list');
module.exports = async (req, res, next) => {

    try {
        const data = [
          { id:1, title: '123', score: 123, date: new Date(), tags: ['Action'] },
          { id:2, title: '456', score: 456, date: new Date(), tags: ['Comedy', 'Romance'] },
          { id:3, title: '789', score: 789, date: new Date(), tags: ['Thriller'] },
          { id:4, title: '123', score: 123, date: new Date(), tags: ['Drama'] },
          { id:5, title: '456', score: 456, date: new Date(), tags: ['Fantasy'] },
          { id:6, title: '789', score: 789, date: new Date(), tags: ['Mystery'] },
        ];

        const pageData = {
        };

        return res.json({ data, pageData });

    } catch(err) {
        return next(err);
    }
};
