import auth from './auth';
import member from './member';
import movie from './movie';

module.exports = function(app) {

    app.use('/api/auth', auth);
    app.use('/api/member', member);
    app.use('/api/movie', movie);

    return function(req, res, next) {
        return next();
    };
};
