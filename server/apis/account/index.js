import express from 'express';
import verifyCode from './verifyCode';

let router = express.Router();

router.route('/verifyCode')
    .post(verifyCode);

module.exports = router;
