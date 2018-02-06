import bodyParser from 'body-parser';
import cookieSession from 'cookie-session';
import isAuthenticated from './isAuthenticated.js';

module.exports = function(server) {
    server.use(bodyParser.json())
    server.use(bodyParser.urlencoded({ extended: false }));
    server.set('trust proxy', 1) // trust first proxy

    server.use(cookieSession({
        name: 'session',
        keys: ['Movie-Recommendation']
    }))

    server.use(isAuthenticated());

    return function(req, res, next) {
        return next();
    };
};
