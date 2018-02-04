module.exports = (req, res, next) => {

    if (req.session.member) {
        return next();
    }

    return res.redirect('/')

};
