/*
 * 啟動方式: env NODE_ENV=${NODE_ENV} node tools/initRecommendationData.js
 ex env NODE_ENV=develop node tools/initRecommendationData.js
 */

require('babel-core/register');
require('babel-polyfill');
const models = require('../server/models/')
global.db = models.db;
const recommendations = require('../server/libs/recommendations')


recommendations.initData()
.then((result)=>{
    console.log('result', result);
    process.exit();
})
.catch((e)=>{
    console.error('error', e);
    process.exit();
});
