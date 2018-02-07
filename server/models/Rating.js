module.exports = (sequelize, DataTypes) => {
    const Rating = sequelize.define('Rating', {
        MemberId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            references: {
                model: 'Member',
            }
        },
        MovieId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            references: {
                model: 'Movie',
            }
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
        models.Rating.belongsTo(models.Member);
        models.Rating.belongsTo(models.Movie);
        models.Member.belongsToMany(models.Movie, {through: models.Rating, foreignKey: "MemberId" })
        models.Movie.belongsToMany(models.Member, {through: models.Rating, foreignKey: "MovieId" })
    }

    return Rating;
};
