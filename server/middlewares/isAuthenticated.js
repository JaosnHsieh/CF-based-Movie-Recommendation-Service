module.exports = () => {

    return (req, res, next) => {

        const { method, path, session } = req;

        const isLogined = session && session.member;

        const shoudLoginedPath = [
            '/member/me',
            '/member/updatePw',
        ];

        if (shoudLoginedPath.indexOf(path) >= 0 && !isLogined) {
            return res.redirect('/auth/login');
        }

        return next();
    };
};
