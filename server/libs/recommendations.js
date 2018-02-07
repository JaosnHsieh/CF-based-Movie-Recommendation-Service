import recommendations from 'node-recommendations';
import redis from '../redis';

const options = {
    correlation: 'distance'
  , redisClient: redis.getClient()
};
const r = recommendations.create('Recommend-Movies', options);

module.exports = {
    r,
    initData: () => {
        return new Promise(async (resolve, reject) => {
            try {
                const data = await db.Rating.findAll();
                let rating, person, memberId;

                for (i = 0; i <= 2; ++i) {
                    rating = result[i];
                    memberId = rating.MemberId;
                    person = await this.getPeopleById(memberId);
                    console.log('person', person);
                    result =person.addItem(rating.MovieId, rating.rating);
                }

                r.calculateItemsim((err, res) => {
                    if (err) {
                        return reject(err);
                    }
                    return resolve();
                });

            } catch (err) {
                return reject();

            }
        });
    },
    getPeopleById: (personId) => {
        return new Promise((resolve, reject) => {
            r.getPeopleByName(personId, (err, person) => {
                if (err)  {
                    return reject(err);
                }
                if (!person) {
                    person = r.addPeople(personId);
                }
                return resolve(person);
            });
        });
    },
    getRecommendedIds: (person) => {
        return new Promise((resolve, reject) => {
            person.getRecommendedItems((err, res) => {
                if (err)  {
                    return reject(err);
                }
                const result = Object.keys(res);
                return resolve(result);
            });
        });
    },
}

