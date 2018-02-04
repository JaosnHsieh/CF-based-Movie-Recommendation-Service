import express from 'express';
import forgotpw from './forgotpw';
import login from './login';
import logout from './logout';
import resetpw from './resetpw';
import signup from './signup';

let router = express.Router();

router.route('/forgotpw')
    .post(forgotpw);

router.route('/login')
    .post(login);

router.route('/logout')
    .get(logout);

router.route('/resetpw')
    .patch(resetpw);

router.route('/signup')
    .post(signup);

module.exports = router;
