import express from 'express';
import rating from './rating';
import ratingList from './ratingList';
import recommendList from './recommendList';
import topList from './topList';

let router = express.Router();

router.route('/top')
    .get(topList);

router.route('/rating')
    .get(ratingList)
    .post(rating);

router.route('/recommend')
    .get(recommendList);
module.exports = router;
