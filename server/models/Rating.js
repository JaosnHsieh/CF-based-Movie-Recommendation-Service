module.exports = (sequelize, DataTypes) => {
    const Rating = sequelize.define('Rating', {
        MemberId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true
        },
        MovieId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true
        },
        rating: {
            type: DataTypes.FLOAT,
            allowNull: false,
            defaultValue: 0
        },
    }, {
        paranoid: false,
        comment: '排名資料表'
    });

    Rating.associate = models => {
        // have constraints problem
        // models.Rating.belongsTo(models.Member);
        models.Rating.belongsTo(models.Movie);
        models.Member.belongsToMany(models.Movie, {through: models.Rating, constraints: false});
        models.Movie.belongsToMany(models.Member, {through: models.Rating, constraints: false});
    }

    return Rating;
};
