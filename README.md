# CF-based-Movie-Recommendation-Service

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

- [redis](https://redis.io/)
- [mysql](https://www.mysql.com/)
- [node 7.2.0](https://nodejs.org/en/)

- Create your local config

Copy and update info for your setting (smtp, db).

```
cp config/default.json config/develop.json
```

- Import demo data

You can import `demo.sql` and use account to login.

```
admin@demo.gmail.com
pwd: admin
```

### Installing

```
npm install
```


## How to run the environment

### DEVELOPMENT
```
npm start
```

### PRODUCTION

```bash
npm run build
npm run prod
```

## Built With

* [Next.js](https://github.com/zeit/next.js/) - The react web framework used
* [Semantic UI React](http://react.semantic-ui.com) - UI toolkit
* [MovieLens dataset](http://grouplens.org/datasets/movielens/) - movie data

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details
