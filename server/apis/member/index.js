import express from 'express';
import one from './one';
import update from './update';
import updatepw from './updatepw';

let router = express.Router();

router.route('/')
    .get(one)
    .patch(update);

router.route('/updatepw')
    .patch(updatepw);

module.exports = router;
