import Debug from 'debug';

const debug = Debug('Movie-Recommendation: api:controllers:auth:logout');

module.exports = (req, res, next) => {
    delete req.session.member;
    return res.redirect('/login');
};
