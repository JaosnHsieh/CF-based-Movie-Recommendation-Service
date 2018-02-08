import Promise from 'bluebird';
import redis from 'redis';
import config from 'config';

Promise.promisifyAll(redis.RedisClient.prototype);
Promise.promisifyAll(redis.Multi.prototype);

const redisConfig = config.get('redis');

const client = redis.createClient(redisConfig);

module.exports = {
    getValue: async (key) => {
        try {
            let value = await client.getAsync(key);
            console.log('value = %j', value);

            if(!value) {
                return Promise.resolve(null);
            }

            let valueObject = JSON.parse(value);
            return Promise.resolve(valueObject);
        } catch (err) {
            return Promise.reject(err);
        }
    },
    setValue: async (key, value, expireTime) => {
        try {
            let valueString = JSON.stringify(value);
            await client.setAsync(key, valueString);

            // expireTime: seconds
            if(expireTime) {
                await client.expireAsync(key, expireTime);
            }

            return Promise.resolve(value);
        } catch (err) {
            return Promise.reject(err);
        }
    },
    removeValue: async (key) => {
        try {
            await client.delAsync(key);
            return Promise.resolve(true);
        } catch (err) {
            return Promise.reject(err);
        }
    }
};
