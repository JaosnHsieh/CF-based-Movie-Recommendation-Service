import express from 'express';
import list from './list';

let router = express.Router();

router.route('/')
    .get(list)

module.exports = router;
